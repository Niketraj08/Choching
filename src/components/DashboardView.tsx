import React, { useState, useEffect } from "react";
import { 
  User, 
  Calendar as CalendarIcon, 
  CheckSquare, 
  Database, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Clock, 
  Plus, 
  Check, 
  Trash, 
  Send, 
  Search, 
  FileText, 
  Download, 
  Sparkles, 
  UserCheck, 
  FileCheck, 
  Sliders, 
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Booking, StudentTask, TestResult, LeaderboardUser } from "../types";
import { leaderboardUsers, mockTestHistory } from "../data";

interface DashboardViewProps {
  userRole?: "student" | "teacher" | "admin" | null;
  userName?: string | null;
  onLogout?: () => void;
}

export default function DashboardView({ userRole, userName, onLogout }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<"student" | "teacher" | "admin">(userRole || "student");
  
  React.useEffect(() => {
    if (userRole) {
      setActiveTab(userRole);
    }
  }, [userRole]);
  
  // Dashboard Sub-views inside Student Tab
  const [studentSubTab, setStudentSubTab] = useState<"overview" | "book" | "tasks" | "results">("overview");

  // Server-synced states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tasks, setTasks] = useState<StudentTask[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  // Local input states
  const [bookingDate, setBookingDate] = useState("2026-07-08");
  const [bookingTime, setBookingTime] = useState("16:00");
  const [bookingSubject, setBookingSubject] = useState("Physics");
  const [bookingCourse, setBookingCourse] = useState("Class 12 Science");
  const [bookingMessage, setBookingMessage] = useState("");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("2026-07-12");
  const [newTaskPriority, setNewTaskPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const [searchReportQuery, setSearchReportQuery] = useState("");

  // Loading triggers
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isTaskLoading, setIsTaskLoading] = useState(false);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [bookingsRes, tasksRes, reportsRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/tasks"),
        fetch("/api/reports")
      ]);

      if (bookingsRes.ok) setBookings(await bookingsRes.json());
      if (tasksRes.ok) setTasks(await tasksRes.json());
      if (reportsRes.ok) setReports(await reportsRes.json());
    } catch (err) {
      console.error("Error synchronizing data with BrightPath backend:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Handle Coaching Session booking
  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: "Aarav Sharma", // Simulated logged in student
          course: bookingCourse,
          subject: bookingSubject,
          date: bookingDate,
          time: bookingTime
        })
      });

      if (response.ok) {
        setBookingMessage("✓ Your coaching session is booked successfully and synchronized to BrightPath Google Calendar simulation.");
        setBookingDate("2026-07-08");
        setBookingTime("16:00");
        fetchData(); // reload
      } else {
        setBookingMessage("Error submitting booking, please verify inputs.");
      }
    } catch (err) {
      console.error(err);
      setBookingMessage("System error booking session.");
    } finally {
      setIsBookingLoading(false);
      setTimeout(() => setBookingMessage(""), 4000);
    }
  };

  // Handle student deadline tasks toggle
  const handleToggleTask = async (taskId: string, currentStatus: "Pending" | "Completed") => {
    const nextStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      if (response.ok) {
        setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, status: nextStatus } : t));
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle task submission (teacher publishes or student adds)
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setIsTaskLoading(true);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTaskTitle.trim(),
          deadline: newTaskDeadline,
          priority: newTaskPriority
        })
      });

      if (response.ok) {
        setNewTaskTitle("");
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTaskLoading(false);
    }
  };

  // Filter administrative reports
  const filteredReports = reports.filter((rep) => {
    const query = searchReportQuery.toLowerCase();
    return (
      rep.student.toLowerCase().includes(query) ||
      rep.category.toLowerCase().includes(query) ||
      rep.details.toLowerCase().includes(query)
    );
  });

  // Calculate high-level stats
  const pendingTasksCount = tasks.filter((t) => t.status === "Pending").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Dashboard Mode Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-8 pb-5 border-b border-slate-200/50 dark:border-slate-800/50">
        <div>
          <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block">
            {activeTab === "student" && "🎓 ELITE STUDENT PORTAL"}
            {activeTab === "teacher" && "👨‍🏫 ACADEMIC TEACHER WORKSPACE"}
            {activeTab === "admin" && "🛡️ EXECUTIVE SYSTEM ADMIN PANEL"}
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight">
            <span className="gold-white-gradient">BrightPath Coaching Portal</span>
          </h2>
          {userName && (
            <p className="text-xs text-slate-500 font-medium mt-1">
              Authorized Session: <strong className="text-slate-800 dark:text-slate-200">{userName}</strong>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onLogout && (
            <button
              onClick={onLogout}
              className="px-4.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary text-xs font-extrabold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              Sign Out & Change Workspace
            </button>
          )}
        </div>
      </div>

      {/* ======================================= */}
      {/* 1. STUDENT PORTAL SUB-PAGE VIEW         */}
      {/* ======================================= */}
      {activeTab === "student" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Student Left Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <div className="p-4 rounded-xl glass-panel-heavy mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold font-sans">
                  AS
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">Aarav Sharma</h4>
                  <span className="text-[10px] font-mono font-medium text-slate-400 block uppercase">Class 12 Science (Batch A)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStudentSubTab("overview")}
              className={`w-full px-4 py-3 rounded-xl text-left text-xs font-bold flex items-center gap-2.5 transition-all ${
                studentSubTab === "overview"
                  ? "bg-primary text-slate-950 font-extrabold"
                  : "glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Academic Overview
            </button>

            <button
              onClick={() => setStudentSubTab("book")}
              className={`w-full px-4 py-3 rounded-xl text-left text-xs font-bold flex items-center gap-2.5 transition-all ${
                studentSubTab === "book"
                  ? "bg-primary text-slate-950 font-extrabold"
                  : "glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              Book Doubt Session
            </button>

            <button
              onClick={() => setStudentSubTab("tasks")}
              className={`w-full px-4 py-3 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all ${
                studentSubTab === "tasks"
                  ? "bg-primary text-slate-950 font-extrabold"
                  : "glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <CheckSquare className="w-4 h-4" />
                Syllabus Tasks
              </span>
              {pendingTasksCount > 0 && (
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${studentSubTab === "tasks" ? "bg-slate-950 text-primary" : "bg-primary text-slate-950"}`}>
                  {pendingTasksCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setStudentSubTab("results")}
              className={`w-full px-4 py-3 rounded-xl text-left text-xs font-bold flex items-center gap-2.5 transition-all ${
                studentSubTab === "results"
                  ? "bg-primary text-slate-950 font-extrabold"
                  : "glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              <Award className="w-4 h-4" />
              Scores & Analysis
            </button>
          </div>

          {/* Student Sub-tab Main Frame */}
          <div className="lg:col-span-9">
            
            {/* Overview subview */}
            {studentSubTab === "overview" && (
              <div className="space-y-6">
                
                {/* Micro Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl glass-panel border border-slate-200 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold font-mono text-slate-400 block uppercase tracking-widest">Attendance</span>
                    <h5 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">94.8%</h5>
                    <span className="text-[9px] text-emerald-500 font-mono font-medium block mt-0.5">✓ Target threshold met</span>
                  </div>
                  
                  <div className="p-4 rounded-xl glass-panel border border-slate-200 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold font-mono text-slate-400 block uppercase tracking-widest">Solved Tests</span>
                    <h5 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">12 Exams</h5>
                    <span className="text-[9px] text-indigo-500 font-mono font-medium block mt-0.5">Av. Score: 87%</span>
                  </div>

                  <div className="p-4 rounded-xl glass-panel border border-slate-200 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold font-mono text-slate-400 block uppercase tracking-widest">Pending Tasks</span>
                    <h5 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">{pendingTasksCount} Items</h5>
                    <span className="text-[9px] text-amber-500 font-mono font-medium block mt-0.5">Due this week</span>
                  </div>

                  <div className="p-4 rounded-xl glass-panel border border-slate-200 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold font-mono text-slate-400 block uppercase tracking-widest">Leader Rank</span>
                    <h5 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">#4 Batch</h5>
                    <span className="text-[9px] text-amber-500 font-mono font-medium block mt-0.5">BrightPath Top Tier</span>
                  </div>
                </div>

                {/* Performance overview chart (SVG) */}
                <div className="p-5 rounded-2xl glass-panel border border-slate-200/60 dark:border-slate-800/60">
                  <h4 className="text-sm font-extrabold tracking-tight mb-4">
                    <span className="gold-white-gradient">BrightPath Score Progression Index</span>
                  </h4>
                  
                  {/* Beautiful SVG graph for visual excellence */}
                  <div className="h-44 w-full relative">
                    <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M 10 110 Q 110 70 210 90 T 410 40 L 490 50 L 490 150 L 10 150 Z" 
                        fill="url(#chartGrad)" 
                      />
                      <path 
                        d="M 10 110 Q 110 70 210 90 T 410 40 L 490 50" 
                        fill="none" 
                        stroke="#d4af37" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                      />
                      <circle cx="10" cy="110" r="5" fill="#d4af37" stroke="white" strokeWidth="2" />
                      <circle cx="110" cy="70" r="5" fill="#d4af37" stroke="white" strokeWidth="2" />
                      <circle cx="210" cy="90" r="5" fill="#d4af37" stroke="white" strokeWidth="2" />
                      <circle cx="310" cy="65" r="5" fill="#d4af37" stroke="white" strokeWidth="2" />
                      <circle cx="410" cy="40" r="5" fill="#d4af37" stroke="white" strokeWidth="2" />
                      <circle cx="490" cy="50" r="5" fill="#f59e0b" stroke="white" strokeWidth="2" />
                    </svg>

                    <div className="absolute top-2 right-4 flex gap-4 text-[10px] font-mono">
                      <div className="flex items-center gap-1.5 text-amber-500">
                        <span className="w-2 h-2 rounded-full bg-amber-500 block" /> Weekly Tests
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-slate-500 block" /> Target Path
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2 px-1">
                    <span>Test 1: Mechanics</span>
                    <span>Test 2: Optics</span>
                    <span>Test 3: Calculus</span>
                    <span>Test 4: Electrostatics</span>
                    <span>Test 5: Kinetics</span>
                  </div>
                </div>

                {/* Upcoming Live or Booked Classes list */}
                <div className="p-5 rounded-2xl glass-panel-heavy border border-slate-200/50 dark:border-slate-800/50">
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-3">Your Booked Doubt Sessions (Google Calendar Synced)</h4>
                  
                  {bookings.length === 0 ? (
                    <p className="text-xs text-slate-500">No session booked yet. Head to the 'Book Doubt Session' tab to secure individual tutoring.</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((b) => (
                        <div key={b.id} className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
                              {b.subject[0]}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-800 dark:text-white block">{b.subject} Doubt clearing</span>
                              <span className="text-[10px] text-slate-400 block font-medium">Session with senior counselor</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-right">
                            <div>
                              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">{b.date}</span>
                              <span className="text-[10px] font-mono text-slate-400 block">{b.time} (IST)</span>
                            </div>
                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                              {b.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Book sessions with actual Calendar Selection interface */}
            {studentSubTab === "book" && (
              <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <div className="mb-4">
                  <h4 className="text-base font-extrabold tracking-tight">
                    <span className="gold-white-gradient">Secure Doubt Support & Mentoring</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">Book individual doubt-clearing sessions directly. Synchronized automatically to the student academic schedule & Google Calendar tracker.</p>
                </div>

                {bookingMessage && (
                  <div className="p-3.5 mb-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 text-xs font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{bookingMessage}</span>
                  </div>
                )}

                <form onSubmit={handleBookSession} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Select Subject</label>
                      <select
                        value={bookingSubject}
                        onChange={(e) => setBookingSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                      >
                        <option value="Physics">Physics (Er. Alok Verma)</option>
                        <option value="Chemistry">Chemistry (Dr. S. K. Sen)</option>
                        <option value="Mathematics">Mathematics (Prof. R. Mathur)</option>
                        <option value="Accountancy">Accountancy (CA Rajeev Mehta)</option>
                        <option value="Economics">Economics (Dr. Shalini Vyas)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Class Stream</label>
                      <select
                        value={bookingCourse}
                        onChange={(e) => setBookingCourse(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                      >
                        <option value="Class 12 Science">Class 12 Science</option>
                        <option value="Class 12 Commerce">Class 12 Commerce</option>
                        <option value="Class 11 Science">Class 11 Science</option>
                        <option value="Class 11 Commerce">Class 11 Commerce</option>
                        <option value="Class 10 Foundation">Class 10 Foundation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Session Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Preferred Time slot</label>
                      <input
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isBookingLoading}
                    className="w-full py-3.5 rounded-xl bg-primary hover:bg-yellow-400 text-slate-950 font-extrabold text-xs shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                  >
                    {isBookingLoading ? "Booking in Google Calendar..." : "Confirm Doubt Session Reservation"}
                  </button>
                </form>
              </div>
            )}

            {/* Syllabus Deadline synchronization (simulating Google Tasks sync) */}
            {studentSubTab === "tasks" && (
              <div className="space-y-6">
                
                <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-extrabold tracking-tight">
                        <span className="gold-white-gradient">Active Academic Milestones (Google Tasks Synced)</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">Toggle checkboxes when completed. These deadlines synchronize directly to help track your board timeline.</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold">
                      {pendingTasksCount} Pending
                    </span>
                  </div>

                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div 
                        key={task.id}
                        className={`flex items-center justify-between p-3.5 rounded-xl transition-all border ${
                          task.status === "Completed"
                            ? "bg-slate-50/50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800 opacity-60"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleTask(task.id, task.status)}
                            className={`w-5.5 h-5.5 rounded-lg border flex items-center justify-center transition-all ${
                              task.status === "Completed"
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "border-slate-300 hover:border-primary"
                            }`}
                          >
                            {task.status === "Completed" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                          
                          <div>
                            <span className={`text-xs font-bold block ${task.status === "Completed" ? "line-through text-slate-400" : "text-slate-800 dark:text-white"}`}>
                              {task.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium block">Deadline: {task.deadline}</span>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          task.priority === "High"
                            ? "bg-rose-100 text-rose-600 dark:bg-rose-950/40"
                            : task.priority === "Medium"
                            ? "bg-amber-100 text-amber-600 dark:bg-amber-950/40"
                            : "bg-amber-100 text-amber-600 dark:bg-amber-950/40"
                        }`}>
                          {task.priority} Priority
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit new task custom panel */}
                <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Schedule New Private Milestone</h5>
                  
                  <form onSubmit={handleAddTask} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-6">
                      <input
                        type="text"
                        placeholder="Task / homework title (e.g., Chemistry notes reading)"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                        required
                      />
                    </div>
                    
                    <div className="sm:col-span-3">
                      <input
                        type="date"
                        value={newTaskDeadline}
                        onChange={(e) => setNewTaskDeadline(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <select
                        value={newTaskPriority}
                        onChange={(e: any) => setNewTaskPriority(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="sm:col-span-1">
                      <button
                        type="submit"
                        disabled={isTaskLoading}
                        className="w-full h-10 bg-primary hover:bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center shadow-md cursor-pointer"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            )}

            {/* Results score panel & Leaderboard analysis */}
            {studentSubTab === "results" && (
              <div className="space-y-6">
                
                {/* Score listing */}
                <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-sm font-extrabold tracking-tight mb-4">
                    <span className="gold-white-gradient">Board Simulator Tests - High Fidelity Scores</span>
                  </h4>
                  
                  <div className="space-y-3">
                    {mockTestHistory.map((h) => (
                      <div key={h.id} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <span className="text-[9px] font-mono font-bold text-primary dark:text-amber-400 uppercase tracking-widest">{h.subject}</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-white block mt-0.5">{h.testTitle}</span>
                          <span className="text-[10px] text-slate-400 block font-medium">Attempted on: {h.date}</span>
                        </div>

                        <div className="flex items-center gap-5">
                          <div className="text-right">
                            <span className="text-sm font-bold text-slate-800 dark:text-white block">{h.score} / {h.totalMarks}</span>
                            <span className="text-[10px] text-slate-400 block">Marks scored</span>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-extrabold text-emerald-500 block">{h.percentage}%</span>
                            <span className="text-[10px] text-slate-400 block">Accuracy {h.accuracy}%</span>
                          </div>

                          <div className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg text-center">
                            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 block">Rank #{h.rank}</span>
                            <span className="text-[8px] text-slate-400 font-mono uppercase">All India</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Batch Leaderboard */}
                <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                  <div className="mb-4">
                    <h4 className="text-sm font-extrabold tracking-tight flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-500 animate-bounce" />
                      <span className="gold-white-gradient">BrightPath Competitive Batch Leaderboard</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">Top performing students across all programs based on weekly evaluation points.</p>
                  </div>

                  <div className="space-y-2">
                    {leaderboardUsers.map((user) => (
                      <div 
                        key={user.rank} 
                        className={`p-3 rounded-xl flex items-center justify-between transition-all ${
                          user.rank === 4 
                            ? "bg-primary/5 dark:bg-primary/10 border border-primary/20" 
                            : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            user.rank === 1 
                              ? "bg-amber-100 text-amber-600 font-mono" 
                              : user.rank === 2 
                              ? "bg-slate-200 text-slate-700" 
                              : user.rank === 3 
                              ? "bg-orange-100 text-orange-600" 
                              : "bg-slate-100 text-slate-500"
                          }`}>
                            {user.rank}
                          </span>
                          
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-white block">
                              {user.name} {user.rank === 4 && <span className="text-[9px] text-primary font-bold uppercase tracking-wider ml-1">(YOU)</span>}
                            </span>
                            <span className="text-[9px] text-slate-400 block font-medium">{user.classCategory}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-right">
                          <div>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">{user.points} pts</span>
                            <span className="text-[9px] text-slate-400 block font-mono">Accuracy {user.accuracy}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* 2. TEACHER WORKSPACE VIEW                */}
      {/* ======================================= */}
      {activeTab === "teacher" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Quick stats */}
            <div className="p-4 rounded-xl bg-gradient-to-tr from-amber-50 to-amber-100/40 dark:from-slate-800 dark:to-amber-950/20 border border-amber-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">LECTURES ASSIGNED</span>
              <h5 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">18 Hours / week</h5>
              <span className="text-[9px] text-slate-400 block mt-0.5">Physical + Live hybrid streams</span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-tr from-amber-50 to-amber-100/40 dark:from-slate-800 dark:to-amber-950/20 border border-amber-200/50 dark:border-slate-800">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">PENDING EVALUATIONS</span>
              <h5 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">24 Papers</h5>
              <span className="text-[9px] text-slate-400 block mt-0.5">Physics Chapter 3 Homework Sheets</span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-tr from-emerald-50 to-emerald-100/40 dark:from-slate-800 dark:to-emerald-950/20 border border-emerald-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">STUDENTS ENROLLED</span>
              <h5 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">340 active</h5>
              <span className="text-[9px] text-emerald-500 block mt-0.5">Average batch attendance: 92%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Publish Deadline Module */}
            <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                <CheckSquare className="text-primary w-4 h-4" />
                Publish Global Student Deadline
              </h4>
              <p className="text-xs text-slate-500 mb-4">Add homework, practice papers, or assignment milestones. These sync instantly to all student profiles.</p>

              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Task / Homework Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Complete Chemistry Redox Reaction Sheet"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium animate-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Deadline Date</label>
                    <input
                      type="date"
                      value={newTaskDeadline}
                      onChange={(e) => setNewTaskDeadline(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Milestone Priority</label>
                    <select
                      value={newTaskPriority}
                      onChange={(e: any) => setNewTaskPriority(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isTaskLoading}
                  className="w-full py-3.5 bg-primary hover:bg-yellow-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  {isTaskLoading ? "Publishing Task..." : "Publish Task to Student Dashboard"}
                </button>
              </form>
            </div>

            {/* List published tasks */}
            <div className="lg:col-span-7 glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-3">Published Active Milestones Checklist</h4>
              
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-white block">{task.title}</span>
                      <span className="text-[10px] text-slate-400 block font-medium">Due: {task.deadline}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${task.status === "Completed" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}>
                        {task.status}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{task.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* 3. ADMIN PANEL VIEW                      */}
      {/* ======================================= */}
      {activeTab === "admin" && (
        <div className="space-y-6">
          
          {/* Header information about Sheet database */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 text-white border border-slate-800 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.05),transparent_50%)]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-primary/20 text-primary border border-primary/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase mb-1.5">
                  <Database className="w-3 h-3" /> Live Google Sheets Simulator
                </span>
                <h4 className="text-base font-extrabold">Coaching Administration Sheets Database</h4>
                <p className="text-xs text-slate-300 mt-0.5">Every student submission, course registration, mock result, and booking logs directly into this database for instant financial and educational analytics.</p>
              </div>

              {/* Download simulated spreadsheet report */}
              <button
                onClick={() => {
                  alert("Preparing BrightPath Coaching administrative report CSV download with student lists, calendar reservations, and payment logs... Enjoy!");
                }}
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-yellow-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 active:scale-95 cursor-pointer shadow-md shadow-black/10 transition-all"
              >
                <Download className="w-4 h-4 text-slate-950" />
                Export Sheets Report (.CSV)
              </button>
            </div>
          </div>

          {/* Search report logs */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Live Synchronized Report Rows</h4>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by Student or Action..."
                  value={searchReportQuery}
                  onChange={(e) => setSearchReportQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-slate-800 dark:text-white font-medium"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono">
                    <th className="pb-3 font-semibold">Timestamp</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Student Name</th>
                    <th className="pb-3 font-semibold">Transaction / Details</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredReports.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                      <td className="py-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">{row.timestamp}</td>
                      <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {row.category}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">{row.student}</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300 font-medium">{row.details}</td>
                      <td className="py-3 text-right">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredReports.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        <AlertCircle className="w-5 h-5 mx-auto mb-2 text-slate-300" />
                        No reports matching your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
