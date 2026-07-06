import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

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
