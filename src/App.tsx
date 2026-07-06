import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ScholarshipBanner from "./components/ScholarshipBanner";
import HeroSection from "./components/HeroSection";
import AIChatbot from "./components/AIChatbot";
import Footer from "./components/Footer";
import DashboardView from "./components/DashboardView";
import LoginPortal from "./components/LoginPortal";
import AcademicHub from "./components/AcademicHub";
import CourseSection from "./components/CourseSection";
import SucceedBentoAndStats from "./components/SucceedBentoAndStats";
import LuxuryLoadingOverlay from "./components/LuxuryLoadingOverlay";
import { 
  AboutSection, 
  FacultySection, 
  StudentSuccessSection, 
  GallerySection, 
  LatestNewsSection, 
  FAQSection, 
  ContactSection 
} from "./components/InfoAndSupport";
import { X, Sparkles, AlertCircle } from "lucide-react";
import { toppersData } from "./data";
import TopperDetailView from "./components/TopperDetailView";

export default function App() {
  const [currentView, setView] = useState<string>("home");
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [isOpeningSplash, setIsOpeningSplash] = useState<boolean>(true);
  const [selectedTopperId, setSelectedTopperId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Auto-terminate the high-end splash screen on mount to transition into the home view
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpeningSplash(false);
    }, 2500); // Elegant 2.5s opening time animation
    return () => clearTimeout(timer);
  }, []);

  // Luxurious page transition router function
  const handleSetView = (newView: string) => {
    if (newView === currentView) return;
    setIsPageLoading(true);
    setTimeout(() => {
      setView(newView);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
         setIsPageLoading(false);
      }, 500); // fade out duration
    }, 1000); // loading state display duration
  };

  // Authenticated Workspace State
  const [userRole, setUserRole] = useState<"student" | "teacher" | "admin" | null>(() => {
    return (localStorage.getItem("sk_user_role") as any) || null;
  });
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem("sk_user_name") || null;
  });

  const handleLoginSuccess = (role: "student" | "teacher" | "admin", name: string) => {
    setUserRole(role);
    setUserName(name);
    localStorage.setItem("sk_user_role", role);
    localStorage.setItem("sk_user_name", name);
    handleSetView("dashboard");
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName(null);
    localStorage.removeItem("sk_user_role");
    localStorage.removeItem("sk_user_name");
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Admission Form Modal state
  const [isAdmissionOpen, setIsAdmissionOpen] = useState<boolean>(false);
  const [admissionCourse, setAdmissionCourse] = useState<string>("Class 12 Science");
  const [admissionStudentName, setAdmissionStudentName] = useState<string>("");
  const [admissionPhone, setAdmissionPhone] = useState<string>("");
  const [admissionEmail, setAdmissionEmail] = useState<string>("");
  const [admissionStatus, setAdmissionStatus] = useState<string>("");

  // Sync Dark Mode state class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleOpenEnrollForm = (courseName: string) => {
    setAdmissionCourse(courseName);
    setIsAdmissionOpen(true);
    setAdmissionStatus("");
  };

  const handleAdmissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admissionStudentName || !admissionPhone) return;

    try {
      // Post to mock report sheets so admin can instantly view
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "Admission",
          student: admissionStudentName,
          details: `Enrolled in ${admissionCourse}. Contact Phone: ${admissionPhone}. Email: ${admissionEmail || "N/A"}`,
          status: "Processed"
        })
      });

      if (response.ok) {
        setAdmissionStatus("✓ Direct Admission requested successfully! Your profile has been logged inside our Admin Sheets database.");
        setAdmissionStudentName("");
        setAdmissionPhone("");
        setAdmissionEmail("");
        
        // Auto redirect to Student portal dashboard after 3 seconds so they can see things
        setTimeout(() => {
          setIsAdmissionOpen(false);
          handleSetView("dashboard");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setAdmissionStatus("Error registering admission.");
    }
  };

  // Main Page Router Logic
  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <div className="space-y-16">
            <HeroSection 
              setView={handleSetView} 
              onOpenAdmissionForm={() => handleOpenEnrollForm("Class 12 Science")} 
            />
            <CourseSection onEnrollClick={handleOpenEnrollForm} />
            <SucceedBentoAndStats 
              onExploreAllFeatures={() => handleSetView("materials")} 
              onEnrollClick={() => handleOpenEnrollForm("Class 12 Science")}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AboutSection />
              <div className="border-t border-slate-200/50 dark:border-slate-800/50 my-16" />
              <FAQSection />
            </div>
          </div>
        );

      case "about":
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AboutSection />
          </div>
        );

      case "courses":
        return <CourseSection onEnrollClick={handleOpenEnrollForm} />;

      case "materials":
        return <AcademicHub initialTab="materials" />;

      case "notes":
        return <AcademicHub initialTab="notes" />;

      case "tests":
        return <AcademicHub initialTab="tests" />;

      case "videos":
        return <AcademicHub initialTab="videos" />;

      case "faculty":
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <FacultySection />
          </div>
        );

      case "gallery":
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <GallerySection />
          </div>
        );

      case "success":
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <StudentSuccessSection onTopperClick={(id) => { setSelectedTopperId(id); handleSetView("topper-detail"); }} />
          </div>
        );

      case "topper-detail": {
        const topper = toppersData.find((t) => t.id === selectedTopperId) || toppersData[0];
        return <TopperDetailView topper={topper} onBack={() => handleSetView("success")} />;
      }

      case "contact":
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ContactSection />
          </div>
        );

      case "dashboard":
        if (!userRole) {
          return <LoginPortal onLoginSuccess={handleLoginSuccess} setView={handleSetView} />;
        }
        return (
          <DashboardView 
            userRole={userRole} 
            userName={userName} 
            onLogout={handleLogout} 
          />
        );

      case "login":
        return <LoginPortal onLoginSuccess={handleLoginSuccess} setView={handleSetView} />;

      default:
        return (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-amber-500 mb-4" />
            <h3 className="text-lg font-bold">Page Not Found</h3>
            <button onClick={() => handleSetView("home")} className="mt-4 px-4 py-2 bg-primary text-slate-950 font-bold rounded-lg hover:bg-yellow-400">
              Return Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      
      {/* Scholarship Headline announcement */}
      <ScholarshipBanner onRegisterClick={() => handleOpenEnrollForm("OSET Scholarship Test")} />

      {/* Sticky Top Navbar */}
      <Navbar
        currentView={currentView}
        setView={handleSetView}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        searchQuery={searchQuery}
        setSearchQuery={(query) => {
          setSearchQuery(query);
          // Auto route to notes query if user initiates quick search in navbar
          if (query && currentView !== "notes" && currentView !== "materials") {
            handleSetView("notes");
          }
        }}
        onEnrollClick={() => handleOpenEnrollForm("Class 12 Science")}
      />

      {/* Main View Router Content Wrapper */}
      <main className="flex-1 pb-16">
        {renderView()}
      </main>

      {/* Interactive Floating AI counselor & WhatsApp widgets */}
      <AIChatbot />

      {/* High-end footer */}
      <Footer setView={handleSetView} />

      {/* Luxury Loading Page Transitions & Initial Splash */}
      {(isPageLoading || isOpeningSplash) && <LuxuryLoadingOverlay />}

      {/* ======================================================= */}
      {/* DIRECT ADMISSION FORM MODAL VIEW                         */}
      {/* ======================================================= */}
      {isAdmissionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-[460px] glass-panel-heavy rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl animate-revealUp">
            
            {/* Close */}
            <button 
              onClick={() => setIsAdmissionOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 flex items-center justify-center text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-5 pr-6">
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200/50 dark:bg-amber-950/30 dark:text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase mb-1.5">
                <Sparkles className="w-3 h-3 text-amber-500" /> BRIGHTPATH ADMISSIONS 2025
              </span>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">Register Direct Enrollment Profile</h4>
              <p className="text-xs text-slate-500 mt-1">Submit student credentials. Our senior counseling board will reach you for interview setup.</p>
            </div>

            {admissionStatus && (
              <div className="p-3.5 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                {admissionStatus}
              </div>
            )}

            <form onSubmit={handleAdmissionSubmit} className="space-y-4">
              <div>
                <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Target Course Program</label>
                <select
                  value={admissionCourse}
                  onChange={(e) => setAdmissionCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                >
                  <option value="Class 12 Science">Class 12 Science</option>
                  <option value="Class 12 Commerce">Class 12 Commerce</option>
                  <option value="Class 11 Science">Class 11 Science</option>
                  <option value="Class 11 Commerce">Class 11 Commerce</option>
                  <option value="Class 10 Foundation">Class 10 Foundation</option>
                  <option value="Class 9 Foundation">Class 9 Foundation</option>
                  <option value="Class 8 Foundation">Class 8 Foundation</option>
                  <option value="OSET Scholarship Test">OSET Scholarship Test (Oly/NTSE)</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Student Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Verma"
                  value={admissionStudentName}
                  onChange={(e) => setAdmissionStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Callback Phone</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={admissionPhone}
                    onChange={(e) => setAdmissionPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. student@gmail.com"
                    value={admissionEmail}
                    onChange={(e) => setAdmissionEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-950 dark:bg-primary text-white dark:text-slate-950 hover:bg-slate-900 dark:hover:bg-yellow-400 font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Submit Admission Enrollment Form
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
