import fs from "fs";
import path from "path";

// Setup mock database file utility
export const dbPath = path.join(process.cwd(), "mock-db.json");

export interface DbSchema {
  students: any[];
  teachers: any[];
  performanceData: any[];
}

export interface Booking {
  id: string;
  studentName: string;
  course: string;
  subject: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

export interface ReportRow {
  timestamp: string;
  category: string;
  student: string;
  details: string;
  status: string;
}

export interface StudentTask {
  id: string;
  title: string;
  deadline: string;
  status: "Pending" | "Completed";
  priority: "High" | "Medium" | "Low";
}

export function readDb(): DbSchema {
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

export function writeDb(data: DbSchema) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving mock-db.json:", err);
  }
}

// In-memory data store for coaching session bookings, reports (simulating sheets), and tasks
export const mockBookings: Booking[] = [
  { id: "1", studentName: "Aarav Sharma", course: "Class 12 Science", subject: "Physics", date: "2026-07-08", time: "16:00", status: "Scheduled" },
  { id: "2", studentName: "Ananya Iyer", course: "Class 11 Science", subject: "Maths", date: "2026-07-09", time: "15:30", status: "Scheduled" },
  { id: "3", studentName: "Rohan Patel", course: "Class 12 Commerce", subject: "Accountancy", date: "2026-07-10", time: "17:00", status: "Scheduled" }
];

export const mockReports: ReportRow[] = [
  { timestamp: "2026-07-06 10:15", category: "Admission", student: "Rahul Verma", details: "Enrolled in Class 10 Foundation Course", status: "Processed" },
  { timestamp: "2026-07-05 14:30", category: "Fee Payment", student: "Meera Sen", details: "Paid Class 12 Science term fee: ₹45,000", status: "Verified" },
  { timestamp: "2026-07-05 09:00", category: "Test Score", student: "Kunal Das", details: "Weekly Physics Test Score: 96%", status: "Reported" }
];

export const mockTasks: StudentTask[] = [
  { id: "1", title: "Complete Physics Chapter 3 Practice Sheet", deadline: "2026-07-09", status: "Pending", priority: "High" },
  { id: "2", title: "Attempt Chemistry Chapter 4 MCQ Test", deadline: "2026-07-11", status: "Pending", priority: "Medium" },
  { id: "3", title: "Submit Class 12 Commerce Accountancy Assignment", deadline: "2026-07-08", status: "Pending", priority: "High" }
];
