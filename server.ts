import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Setup mock database file utility
const dbPath = path.join(process.cwd(), "mock-db.json");

interface DbSchema {
  students: any[];
  teachers: any[];
  performanceData: any[];
}

function readDb(): DbSchema {
  try {
    if (fs.existsSync(dbPath)) {
      const fileData = fs.readFileSync(dbPath, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading mock-db.json, using fallback schema:", err);
  }
  return { students: [], teachers: [], performanceData: [] };
}

function writeDb(data: DbSchema) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving mock-db.json:", err);
  }
}


// Setup dirname/filename for ES module support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini API initialization
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined in environment variables. AI Chat support will fall back to smart simulated assistance.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// In-memory data store for coaching session bookings, reports (simulating sheets), and tasks
interface Booking {
  id: string;
  studentName: string;
  course: string;
  subject: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

interface ReportRow {
  timestamp: string;
  category: string;
  student: string;
  details: string;
  status: string;
}

interface StudentTask {
  id: string;
  title: string;
  deadline: string;
  status: "Pending" | "Completed";
  priority: "High" | "Medium" | "Low";
}

const mockBookings: Booking[] = [
  { id: "1", studentName: "Aarav Sharma", course: "Class 12 Science", subject: "Physics", date: "2026-07-08", time: "16:00", status: "Scheduled" },
  { id: "2", studentName: "Ananya Iyer", course: "Class 11 Science", subject: "Maths", date: "2026-07-09", time: "15:30", status: "Scheduled" },
  { id: "3", studentName: "Rohan Patel", course: "Class 12 Commerce", subject: "Accountancy", date: "2026-07-10", time: "17:00", status: "Scheduled" }
];

const mockReports: ReportRow[] = [
  { timestamp: "2026-07-06 10:15", category: "Admission", student: "Rahul Verma", details: "Enrolled in Class 10 Foundation Course", status: "Processed" },
  { timestamp: "2026-07-05 14:30", category: "Fee Payment", student: "Meera Sen", details: "Paid Class 12 Science term fee: ₹45,000", status: "Verified" },
  { timestamp: "2026-07-05 09:00", category: "Test Score", student: "Kunal Das", details: "Weekly Physics Test Score: 96%", status: "Reported" }
];

const mockTasks: StudentTask[] = [
  { id: "1", title: "Complete Physics Chapter 3 Practice Sheet", deadline: "2026-07-09", status: "Pending", priority: "High" },
  { id: "2", title: "Attempt Chemistry Chapter 4 MCQ Test", deadline: "2026-07-11", status: "Pending", priority: "Medium" },
  { id: "3", title: "Submit Class 12 Commerce Accountancy Assignment", deadline: "2026-07-08", status: "Pending", priority: "High" }
];

// --- API Endpoints ---

// Login Authentication Endpoint
app.post("/api/auth/login", (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  
  if (!username || !password || !role) {
    res.status(400).json({ error: "Please enter both username and password." });
    return;
  }

  const cleanUser = username.trim().toLowerCase();
  
  // Real verification check on backend
  if (password !== "password") {
    res.status(401).json({ error: "Invalid credentials. Use 'password' for demo access." });
    return;
  }

  let finalName = username;
  if (cleanUser === "student") {
    finalName = "Aarav Sharma (Student)";
  } else if (cleanUser === "teacher") {
    finalName = "Er. Alok Verma (IIT Kanpur - HOD)";
  } else if (cleanUser === "admin") {
    finalName = "Prof. Alok Verma (Director / Founder)";
  } else {
    // Custom formatted name
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);
    finalName = `${username} (${formattedRole})`;
  }

  // Create a server-side log in our Reports system for live admin dashboard view
  const loginLog: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: "Security",
    student: finalName,
    details: `Successful session established as ${role.toUpperCase()} from web portal.`,
    status: "Authenticated"
  };
  mockReports.unshift(loginLog);

  res.json({
    success: true,
    role,
    username: finalName,
    token: `sk-session-${role}-${Date.now()}`
  });
});

// API Chat Endpoint (with fallback logic)
app.post("/api/chat", async (req: Request, res: Response) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "Invalid messages format. Expected array of message objects." });
    return;
  }

  const userQuery = messages[messages.length - 1]?.content || "";

  // Check if Gemini API Key is available
  if (!process.env.GEMINI_API_KEY) {
    // Elegant fallback simulation
    const simulatedAnswers: { [key: string]: string } = {
      default: "Welcome to Apex Coaching Institute Support! How can I assist you with admissions, course selection (Class 8-12 Science/Commerce), note downloads, or test preparation today?",
      admission: "Admissions for the 2026-27 session are currently open! We offer a direct 20% scholarship through our online Mock Scholarship Test. You can register via the Admission tab on our website or contact our helpline at +91 98765 43210.",
      scholarship: "Our Scholarship Test is scheduled every Sunday online. It covers basic Maths, Science, and Logical Reasoning. Scores above 90% get up to a 50% waiver on tuition fees!",
      courses: "We offer top-tier specialized classroom and hybrid courses for Class 8, 9, 10 (Foundation & Olympiads), as well as dedicated Science (Physics, Chemistry, Maths, Biology) and Commerce (Accountancy, Business Studies, Economics) streams for Class 11 and 12.",
      faculty: "Our faculty comprises IIT graduates, Ph.D. scholars, and highly experienced educators with 10+ years of training students for Boards, JEE, and NEET.",
      test: "Our Online Test Series has Mock Tests, weekly Chapter Tests, and Full Syllabus Tests, complete with direct performance analysis and immediate result scoreboards in the Student Dashboard."
    };

    let answer = simulatedAnswers.default;
    const lowerQuery = userQuery.toLowerCase();
    if (lowerQuery.includes("admission") || lowerQuery.includes("enroll") || lowerQuery.includes("apply")) {
      answer = simulatedAnswers.admission;
    } else if (lowerQuery.includes("scholarship") || lowerQuery.includes("discount") || lowerQuery.includes("fee waiver")) {
      answer = simulatedAnswers.scholarship;
    } else if (lowerQuery.includes("course") || lowerQuery.includes("class") || lowerQuery.includes("subject")) {
      answer = simulatedAnswers.courses;
    } else if (lowerQuery.includes("faculty") || lowerQuery.includes("teacher") || lowerQuery.includes("director")) {
      answer = simulatedAnswers.faculty;
    } else if (lowerQuery.includes("test") || lowerQuery.includes("quiz") || lowerQuery.includes("exam") || lowerQuery.includes("result")) {
      answer = simulatedAnswers.test;
    }

    setTimeout(() => {
      res.json({ content: answer });
    }, 600);
    return;
  }

  try {
    const ai = getAiClient();
    // Structure a clean context prompt for the coaching institute
    const contextPrompt = `
      You are Apex, the highly professional, empathetic, and expert AI tutor and support counselor for Apex Coaching Institute (premium training institute for Class 8 to 12 Science and Commerce).
      Answer the user's inquiry elegantly, concisely, and with high educational expertise. 
      Encourage them about exams, and outline why Apex is the absolute best option (e.g., world-class teachers, real-time dashboards, individual doubt solving, stellar results, and robust digital materials).
      User query: ${userQuery}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contextPrompt,
    });

    const aiText = response.text || "I am here to guide you with any question regarding your syllabus or admissions!";
    res.json({ content: aiText });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    res.json({ 
      content: "Thank you for reaching out to Apex Institute! I'm currently working with high student traffic. Let me guide you: admissions are open, notes are downloadable, and our direct support is active at admissions@apexcoaching.edu." 
    });
  }
});

// Bookings endpoints
app.get("/api/bookings", (req: Request, res: Response) => {
  res.json(mockBookings);
});

app.post("/api/bookings", (req: Request, res: Response) => {
  const { studentName, course, subject, date, time } = req.body;
  if (!studentName || !course || !subject || !date || !time) {
    res.status(400).json({ error: "Missing required booking details." });
    return;
  }
  const newBooking: Booking = {
    id: String(mockBookings.length + 1),
    studentName,
    course,
    subject,
    date,
    time,
    status: "Scheduled"
  };
  mockBookings.push(newBooking);

  // Auto-generate administrative report entry for this booking
  const newReport: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: "Session Booking",
    student: studentName,
    details: `Booked ${subject} doubt session on ${date} at ${time}`,
    status: "Processed"
  };
  mockReports.unshift(newReport);

  res.status(201).json(newBooking);
});

// Reports (Google Sheet integration simulation) endpoints
app.get("/api/reports", (req: Request, res: Response) => {
  res.json(mockReports);
});

app.post("/api/reports", (req: Request, res: Response) => {
  const { category, student, details, status } = req.body;
  const newRow: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: category || "General",
    student: student || "Anonymous",
    details: details || "",
    status: status || "Processed"
  };
  mockReports.unshift(newRow);
  res.status(201).json(newRow);
});

// Tasks (Google Tasks sync simulation) endpoints
app.get("/api/tasks", (req: Request, res: Response) => {
  res.json(mockTasks);
});

app.post("/api/tasks", (req: Request, res: Response) => {
  const { title, deadline, priority } = req.body;
  if (!title || !deadline) {
    res.status(400).json({ error: "Title and deadline are required." });
    return;
  }
  const newTask: StudentTask = {
    id: String(mockTasks.length + 1),
    title,
    deadline,
    status: "Pending",
    priority: priority || "Medium"
  };
  mockTasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch("/api/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = mockTasks.find((t) => t.id === id);
  if (task) {
    if (status) task.status = status;
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// --- CRUD API for Students ---
app.get("/api/students", (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.students);
});

app.post("/api/students", (req: Request, res: Response) => {
  const db = readDb();
  const { name, email, course, batch, attendance, enrollmentDate } = req.body;
  
  if (!name || !email) {
    res.status(400).json({ error: "Name and Email are required." });
    return;
  }

  const newStudent = {
    id: `student-${Date.now()}`,
    name,
    email,
    course: course || "Class 12 Science",
    batch: batch || "Batch A",
    attendance: Number(attendance) || 100,
    enrollmentDate: enrollmentDate || new Date().toISOString().substring(0, 10)
  };

  db.students.push(newStudent);
  writeDb(db);

  // Auto-log to mockReports
  const logRow: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: "Student CRUD",
    student: name,
    details: `Added new student record: ${course} (${batch})`,
    status: "Processed"
  };
  mockReports.unshift(logRow);

  res.status(201).json(newStudent);
});

app.put("/api/students/:id", (req: Request, res: Response) => {
  const db = readDb();
  const { id } = req.params;
  const index = db.students.findIndex(s => s.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  const { name, email, course, batch, attendance, enrollmentDate } = req.body;
  db.students[index] = {
    ...db.students[index],
    name: name || db.students[index].name,
    email: email || db.students[index].email,
    course: course || db.students[index].course,
    batch: batch || db.students[index].batch,
    attendance: attendance !== undefined ? Number(attendance) : db.students[index].attendance,
    enrollmentDate: enrollmentDate || db.students[index].enrollmentDate
  };

  writeDb(db);

  // Auto-log to mockReports
  const logRow: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: "Student CRUD",
    student: db.students[index].name,
    details: `Updated student record.`,
    status: "Processed"
  };
  mockReports.unshift(logRow);

  res.json(db.students[index]);
});

app.delete("/api/students/:id", (req: Request, res: Response) => {
  const db = readDb();
  const { id } = req.params;
  const student = db.students.find(s => s.id === id);
  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  db.students = db.students.filter(s => s.id !== id);
  writeDb(db);

  // Auto-log to mockReports
  const logRow: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: "Student CRUD",
    student: student.name,
    details: `Deleted student record from database.`,
    status: "Processed"
  };
  mockReports.unshift(logRow);

  res.json({ success: true });
});

// --- CRUD API for Teachers ---
app.get("/api/teachers", (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.teachers);
});

app.post("/api/teachers", (req: Request, res: Response) => {
  const db = readDb();
  const { name, qualification, experience, specialization, email, activeBatches } = req.body;
  
  if (!name || !specialization) {
    res.status(400).json({ error: "Name and Specialization are required." });
    return;
  }

  const newTeacher = {
    id: `teacher-${Date.now()}`,
    name,
    qualification: qualification || "B.Tech/M.Sc",
    experience: experience || "5 Years",
    specialization,
    email: email || `${name.toLowerCase().replace(/\s+/g, '')}@apexcoaching.edu`,
    activeBatches: activeBatches || "All Batches"
  };

  db.teachers.push(newTeacher);
  writeDb(db);

  // Auto-log to mockReports
  const logRow: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: "Teacher CRUD",
    student: name,
    details: `Recruited new faculty: ${specialization}`,
    status: "Processed"
  };
  mockReports.unshift(logRow);

  res.status(201).json(newTeacher);
});

app.put("/api/teachers/:id", (req: Request, res: Response) => {
  const db = readDb();
  const { id } = req.params;
  const index = db.teachers.findIndex(t => t.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Teacher not found" });
    return;
  }

  const { name, qualification, experience, specialization, email, activeBatches } = req.body;
  db.teachers[index] = {
    ...db.teachers[index],
    name: name || db.teachers[index].name,
    qualification: qualification || db.teachers[index].qualification,
    experience: experience || db.teachers[index].experience,
    specialization: specialization || db.teachers[index].specialization,
    email: email || db.teachers[index].email,
    activeBatches: activeBatches || db.teachers[index].activeBatches
  };

  writeDb(db);

  // Auto-log to mockReports
  const logRow: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: "Teacher CRUD",
    student: db.teachers[index].name,
    details: `Updated faculty member details.`,
    status: "Processed"
  };
  mockReports.unshift(logRow);

  res.json(db.teachers[index]);
});

app.delete("/api/teachers/:id", (req: Request, res: Response) => {
  const db = readDb();
  const { id } = req.params;
  const teacher = db.teachers.find(t => t.id === id);
  if (!teacher) {
    res.status(404).json({ error: "Teacher not found" });
    return;
  }

  db.teachers = db.teachers.filter(t => t.id !== id);
  writeDb(db);

  // Auto-log to mockReports
  const logRow: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: "Teacher CRUD",
    student: teacher.name,
    details: `Deleted faculty record from system database.`,
    status: "Processed"
  };
  mockReports.unshift(logRow);

  res.json({ success: true });
});

// --- CRUD API for Performance/Results ---
app.get("/api/performance", (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.performanceData);
});

app.post("/api/performance", (req: Request, res: Response) => {
  const db = readDb();
  const { studentId, studentName, testTitle, score, totalMarks, percentage, accuracy, rank, date, subject } = req.body;
  
  if (!studentName || !testTitle || score === undefined) {
    res.status(400).json({ error: "Student Name, Test Title, and Score are required." });
    return;
  }

  const newPerf = {
    id: `performance-${Date.now()}`,
    studentId: studentId || `student-${Date.now()}`,
    studentName,
    testTitle,
    score: Number(score),
    totalMarks: Number(totalMarks) || 100,
    percentage: percentage !== undefined ? Number(percentage) : Math.round((Number(score) / (Number(totalMarks) || 100)) * 100),
    accuracy: accuracy !== undefined ? Number(accuracy) : Math.round((Number(score) / (Number(totalMarks) || 100)) * 100),
    rank: Number(rank) || 1,
    date: date || new Date().toISOString().substring(0, 10),
    subject: subject || "Physics"
  };

  db.performanceData.unshift(newPerf);
  writeDb(db);

  // Auto-log to mockReports
  const logRow: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: "Test Score",
    student: studentName,
    details: `${testTitle} Score: ${score}/${totalMarks || 100} (${newPerf.percentage}%)`,
    status: "Reported"
  };
  mockReports.unshift(logRow);

  res.status(201).json(newPerf);
});

app.put("/api/performance/:id", (req: Request, res: Response) => {
  const db = readDb();
  const { id } = req.params;
  const index = db.performanceData.findIndex(p => p.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Performance record not found" });
    return;
  }

  const { studentName, testTitle, score, totalMarks, percentage, accuracy, rank, date, subject } = req.body;
  db.performanceData[index] = {
    ...db.performanceData[index],
    studentName: studentName || db.performanceData[index].studentName,
    testTitle: testTitle || db.performanceData[index].testTitle,
    score: score !== undefined ? Number(score) : db.performanceData[index].score,
    totalMarks: totalMarks !== undefined ? Number(totalMarks) : db.performanceData[index].totalMarks,
    percentage: percentage !== undefined ? Number(percentage) : db.performanceData[index].percentage,
    accuracy: accuracy !== undefined ? Number(accuracy) : db.performanceData[index].accuracy,
    rank: rank !== undefined ? Number(rank) : db.performanceData[index].rank,
    date: date || db.performanceData[index].date,
    subject: subject || db.performanceData[index].subject
  };

  if ((score !== undefined || totalMarks !== undefined) && percentage === undefined) {
    const s = db.performanceData[index].score;
    const tm = db.performanceData[index].totalMarks;
    db.performanceData[index].percentage = Math.round((s / tm) * 100);
    db.performanceData[index].accuracy = Math.round((s / tm) * 100);
  }

  writeDb(db);

  // Auto-log to mockReports
  const logRow: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: "Test Score",
    student: db.performanceData[index].studentName,
    details: `Updated test score for: ${db.performanceData[index].testTitle}`,
    status: "Reported"
  };
  mockReports.unshift(logRow);

  res.json(db.performanceData[index]);
});

app.delete("/api/performance/:id", (req: Request, res: Response) => {
  const db = readDb();
  const { id } = req.params;
  const perf = db.performanceData.find(p => p.id === id);
  if (!perf) {
    res.status(404).json({ error: "Performance record not found" });
    return;
  }

  db.performanceData = db.performanceData.filter(p => p.id !== id);
  writeDb(db);

  // Auto-log to mockReports
  const logRow: ReportRow = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    category: "Test Score",
    student: perf.studentName,
    details: `Deleted test score record: ${perf.testTitle}`,
    status: "Processed"
  };
  mockReports.unshift(logRow);

  res.json({ success: true });
});

// --- Vite Dev Server Middleware Integration ---
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  import("vite").then(async (viteModule) => {
    const vite = await viteModule.createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Coaching server running on http://0.0.0.0:${PORT}`);
});
