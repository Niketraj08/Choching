import { Router, Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { 
  readDb, 
  writeDb, 
  mockBookings, 
  mockReports, 
  mockTasks, 
  Booking, 
  ReportRow, 
  StudentTask 
} from "./db";

const router = Router();

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

// -------------------------------------------------------------
// Authentication Route
// -------------------------------------------------------------
router.post("/auth/login", (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  
  if (!username || !password || !role) {
    res.status(400).json({ error: "Please enter both username and password." });
    return;
  }

  const cleanUser = username.trim().toLowerCase();
  
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
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);
    finalName = `${username} (${formattedRole})`;
  }

  // Create login audit trail report row
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

// -------------------------------------------------------------
// Gemini AI Counselor Chat Route
// -------------------------------------------------------------
router.post("/chat", async (req: Request, res: Response) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "Invalid messages format. Expected array of message objects." });
    return;
  }

  const userQuery = messages[messages.length - 1]?.content || "";

  if (!process.env.GEMINI_API_KEY) {
    // English-first fallback responses matching SK Coaching standards
    const simulatedAnswers: { [key: string]: string } = {
      default: "Welcome to SK Coaching Institute Support! How can I assist you with offline admissions, course details (Class 8-12 Science & Commerce), note downloads, or test preparation today?",
      admission: "Admissions for the upcoming 2026-27 batch are open! We are offering special scholarships for Offline Programs up to 50% off tuition fees through our OSET Scholarship Test. Fill in the quick inquiry form to schedule your tour.",
      scholarship: "Our Offline Scholarship Admission Test (OSET) is conducted physical-center wide. The test pattern covers general science, mathematics, and analytical reasoning. Students scoring above 90% receive absolute fee concessions.",
      courses: "We provide physical classes for Grade 8 to 12. Science Stream (Physics, Chemistry, Maths, Biology) and Commerce Stream (Accountancy, Economics, Business Studies) are taught by distinguished faculty including ex-IITians and senior teachers.",
      faculty: "Our faculty list includes elite academic mentors like Er. Sumit Pandey (M.Tech, IIT Roorkee), Dr. Vandana Joshi, and many retired professors. They conduct face-to-face doubt sessions daily.",
      test: "We run a structured weekly physical test series on Sundays. Students write on offline papers under Board-simulated examination settings, which are physically evaluated and graded within 48 hours."
    };

    let answer = simulatedAnswers.default;
    const lowerQuery = userQuery.toLowerCase();
    if (lowerQuery.includes("admission") || lowerQuery.includes("enroll") || lowerQuery.includes("apply") || lowerQuery.includes("join")) {
      answer = simulatedAnswers.admission;
    } else if (lowerQuery.includes("scholarship") || lowerQuery.includes("discount") || lowerQuery.includes("fee waiver") || lowerQuery.includes("oset")) {
      answer = simulatedAnswers.scholarship;
    } else if (lowerQuery.includes("course") || lowerQuery.includes("class") || lowerQuery.includes("subject") || lowerQuery.includes("syllabus")) {
      answer = simulatedAnswers.courses;
    } else if (lowerQuery.includes("faculty") || lowerQuery.includes("teacher") || lowerQuery.includes("mentor") || lowerQuery.includes("sir")) {
      answer = simulatedAnswers.faculty;
    } else if (lowerQuery.includes("test") || lowerQuery.includes("quiz") || lowerQuery.includes("exam") || lowerQuery.includes("result") || lowerQuery.includes("score")) {
      answer = simulatedAnswers.test;
    }

    setTimeout(() => {
      res.json({ content: answer });
    }, 600);
    return;
  }

  try {
    const ai = getAiClient();
    const contextPrompt = `
      You are Apex, the highly professional, empathetic, and expert AI tutor and support counselor for SK Coaching Institute (premium training institute for Class 8 to 12 Science and Commerce).
      Answer the user's inquiry elegantly, concisely, and in proper English with high educational expertise.
      Encourage them, and outline why SK Coaching is the absolute best option (e.g., world-class teachers like ex-IITians, high-fidelity physical center infrastructures, real-time sync with Google Sheets simulator, and daily doubt help).
      User query: ${userQuery}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contextPrompt,
    });

    const aiText = response.text || "I am here to guide you with any questions regarding your syllabus or physical class admissions!";
    res.json({ content: aiText });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    res.json({ 
      content: "Thank you for reaching out to SK Coaching! I'm currently working with high student traffic. Let me guide you: admissions are open, physical center tours can be booked, and our direct helpline is admissions@skcoaching.edu." 
    });
  }
});

// -------------------------------------------------------------
// Bookings Endpoints
// -------------------------------------------------------------
router.get("/bookings", (req: Request, res: Response) => {
  res.json(mockBookings);
});

router.post("/bookings", (req: Request, res: Response) => {
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

// -------------------------------------------------------------
// Reports Logs Endpoints (Google Sheets Simulator)
// -------------------------------------------------------------
router.get("/reports", (req: Request, res: Response) => {
  res.json(mockReports);
});

router.post("/reports", (req: Request, res: Response) => {
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

// -------------------------------------------------------------
// Tasks Endpoints (Daily Assignments Checklists)
// -------------------------------------------------------------
router.get("/tasks", (req: Request, res: Response) => {
  res.json(mockTasks);
});

router.post("/tasks", (req: Request, res: Response) => {
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

router.patch("/tasks/:id", (req: Request, res: Response) => {
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

// -------------------------------------------------------------
// Students Database Endpoints
// -------------------------------------------------------------
router.get("/students", (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.students);
});

router.post("/students", (req: Request, res: Response) => {
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

router.put("/students/:id", (req: Request, res: Response) => {
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

router.delete("/students/:id", (req: Request, res: Response) => {
  const db = readDb();
  const { id } = req.params;
  const student = db.students.find(s => s.id === id);
  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  db.students = db.students.filter(s => s.id !== id);
  writeDb(db);

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

// -------------------------------------------------------------
// Teachers/Faculty Database Endpoints
// -------------------------------------------------------------
router.get("/teachers", (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.teachers);
});

router.post("/teachers", (req: Request, res: Response) => {
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
    email: email || `${name.toLowerCase().replace(/\s+/g, '')}@skcoaching.edu`,
    activeBatches: activeBatches || "All Batches"
  };

  db.teachers.push(newTeacher);
  writeDb(db);

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

router.put("/teachers/:id", (req: Request, res: Response) => {
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

router.delete("/teachers/:id", (req: Request, res: Response) => {
  const db = readDb();
  const { id } = req.params;
  const teacher = db.teachers.find(t => t.id === id);
  if (!teacher) {
    res.status(404).json({ error: "Teacher not found" });
    return;
  }

  db.teachers = db.teachers.filter(t => t.id !== id);
  writeDb(db);

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

// -------------------------------------------------------------
// Performance/Scores Database Endpoints
// -------------------------------------------------------------
router.get("/performance", (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.performanceData);
});

router.post("/performance", (req: Request, res: Response) => {
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

router.put("/performance/:id", (req: Request, res: Response) => {
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

router.delete("/performance/:id", (req: Request, res: Response) => {
  const db = readDb();
  const { id } = req.params;
  const perf = db.performanceData.find(p => p.id === id);
  if (!perf) {
    res.status(404).json({ error: "Performance record not found" });
    return;
  }

  db.performanceData = db.performanceData.filter(p => p.id !== id);
  writeDb(db);

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

export default router;
