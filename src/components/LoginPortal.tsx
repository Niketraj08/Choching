import React, { useState } from "react";
import { 
  Lock, 
  User, 
  GraduationCap, 
  ShieldAlert, 
  LogIn, 
  Sparkles, 
  Award, 
  CheckCircle,
  ArrowRight,
  Tv
} from "lucide-react";
import logoImg from "../assets/images/sk_coaching_logo_1783335954863.jpg";

interface LoginPortalProps {
  onLoginSuccess: (role: "student" | "teacher" | "admin", username: string) => void;
  setView: (view: string) => void;
}

export default function LoginPortal({ onLoginSuccess, setView }: LoginPortalProps) {
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "admin">("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleQuickDemoLogin = async (role: "student" | "teacher" | "admin") => {
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: role, password: "password", role })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        onLoginSuccess(data.role, data.username);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Unable to connect to SK Coaching authorization server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role: selectedRole })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        onLoginSuccess(data.role, data.username);
      } else {
        setError(data.error || "Authentication failed. Incorrect password.");
      }
    } catch (err) {
      setError("Connection to secure backend server refused.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
      
      {/* Brand Icon & Heading */}
      <div className="text-center mb-10 space-y-3">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-slate-950 p-1 border-2 border-primary shadow-2xl overflow-hidden mx-auto transition-transform hover:scale-105">
            <img 
              src={logoImg} 
              alt="SK Coaching Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-primary text-slate-950 text-[9px] font-bold font-mono tracking-widest px-2.5 py-0.5 rounded-full uppercase border border-slate-950">
            ELITE
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight">
            <span className="gold-white-gradient">SK COACHING PORTAL</span>
          </h2>
          <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">
            Sovereign Academic Portal & Workspaces
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Role Tab Selector */}
        <div className="grid grid-cols-3 bg-slate-100 dark:bg-slate-900 p-1">
          <button
            onClick={() => {
              setSelectedRole("student");
              setError("");
            }}
            className={`py-3.5 rounded-2xl text-xs font-extrabold transition-all flex flex-col items-center gap-1 cursor-pointer ${
              selectedRole === "student"
                ? "bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-md"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${selectedRole === "student" ? "text-primary" : ""}`} />
            <span>Student Portal</span>
          </button>

          <button
            onClick={() => {
              setSelectedRole("teacher");
              setError("");
            }}
            className={`py-3.5 rounded-2xl text-xs font-extrabold transition-all flex flex-col items-center gap-1 cursor-pointer ${
              selectedRole === "teacher"
                ? "bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-md"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Tv className={`w-4 h-4 ${selectedRole === "teacher" ? "text-primary" : ""}`} />
            <span>Teacher Space</span>
          </button>

          <button
            onClick={() => {
              setSelectedRole("admin");
              setError("");
            }}
            className={`py-3.5 rounded-2xl text-xs font-extrabold transition-all flex flex-col items-center gap-1 cursor-pointer ${
              selectedRole === "admin"
                ? "bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-md"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <ShieldAlert className={`w-4 h-4 ${selectedRole === "admin" ? "text-primary" : ""}`} />
            <span>Admin Panel</span>
          </button>
        </div>

        {/* Credentials Form Box */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              {selectedRole === "student" && "🎓 Student Authentication"}
              {selectedRole === "teacher" && "👨‍🏫 Academic Mentor Log In"}
              {selectedRole === "admin" && "👑 Executive System Access"}
            </h3>
            <p className="text-xs text-slate-500">
              Provide authorization credentials or use the rapid quick access shortcuts below.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl border border-red-100 dark:border-red-900/30 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                Username ID
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={`e.g. ${selectedRole}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white font-medium outline-none focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                Access Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white font-medium outline-none focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white dark:bg-primary dark:text-slate-950 dark:hover:bg-yellow-400 font-extrabold text-xs tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent dark:border-white dark:border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Establish Secure Session</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Access Grid */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-900 space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-center">
              ⚡ Demo Credentials Quick Access
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleQuickDemoLogin("student")}
                className="p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 rounded-xl text-[11px] font-extrabold text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800 transition-all text-left flex flex-col justify-between"
              >
                <span className="text-primary text-[9px] uppercase tracking-wider block font-mono">1-CLICK</span>
                <span className="block mt-1">Student Portal</span>
              </button>

              <button
                onClick={() => handleQuickDemoLogin("teacher")}
                className="p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 rounded-xl text-[11px] font-extrabold text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800 transition-all text-left flex flex-col justify-between"
              >
                <span className="text-yellow-600 text-[9px] uppercase tracking-wider block font-mono">1-CLICK</span>
                <span className="block mt-1">Teacher Space</span>
              </button>

              <button
                onClick={() => handleQuickDemoLogin("admin")}
                className="p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 rounded-xl text-[11px] font-extrabold text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800 transition-all text-left flex flex-col justify-between"
              >
                <span className="text-amber-600 text-[9px] uppercase tracking-wider block font-mono">1-CLICK</span>
                <span className="block mt-1">Admin Panel</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      <div className="mt-8 text-center text-[11px] text-slate-400 font-medium">
        <span>Protected by SK Coaching Security Protocols. Back to </span>
        <button 
          onClick={() => setView("home")} 
          className="text-amber-800 dark:text-primary font-bold hover:underline"
        >
          Institutional Home Page
        </button>
      </div>

    </div>
  );
}
