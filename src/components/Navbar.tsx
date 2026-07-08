import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Menu, 
  X, 
  Search, 
  Sun, 
  Moon, 
  GraduationCap, 
  Phone, 
  Calendar, 
  User, 
  ChevronDown, 
  Award, 
  BookMarked,
  Sparkles,
  HelpCircle,
  Home,
  Info,
  PlayCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import skLogo from "../assets/images/sk_coaching_logo_1783335954863.jpg";

export function SKCoachingLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-950 p-0.5 shadow-md border border-amber-500/40 overflow-hidden shrink-0">
        <img 
          src={skLogo} 
          alt="SK Coaching Logo" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-lg animate-fade-in" 
        />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-sans font-black text-sm sm:text-base tracking-tight text-slate-900 dark:text-white leading-none">
          SK <span className="text-amber-500">COACHING</span>
        </span>
        <span className="text-[7.5px] sm:text-[9px] font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5 leading-none">
          Unlock Your Potential
        </span>
      </div>
    </div>
  );
}

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onEnrollClick?: () => void;
}

export default function Navbar({
  currentView,
  setView,
  isDarkMode,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
  onEnrollClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [mobileMaterialsOpen, setMobileMaterialsOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = [
    { label: "Home", view: "home" },
    { label: "About Us", view: "about" },
    { label: "Courses", view: "courses" },
    { label: "Study Material", view: "materials" },
    { label: "Test Series", view: "tests" },
    { label: "Contact Us", view: "contact" },
  ];

  const handleNav = (view: string) => {
    setView(view);
    setIsOpen(false);
    setShowMegaMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div 
            onClick={() => handleNav("home")}
            className="cursor-pointer"
          >
            <SKCoachingLogo />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5">
            {menuItems.map((item) => {
              if (item.view === "materials") {
                // We render Study Material with a potential micro-dropdown for neatness
                return (
                  <div 
                    key={item.view}
                    className="relative"
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                  >
                    <button
                      onClick={() => handleNav(item.view)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-all duration-200 ${
                        currentView === item.view || currentView === "notes" || currentView === "videos"
                          ? "text-amber-500 dark:text-amber-400 font-bold"
                          : "text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400"
                      }`}
                    >
                      {item.label} <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {showMegaMenu && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] pt-1.5 z-50">
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl animate-revealUp space-y-1">
                          <button 
                            onClick={() => handleNav("materials")} 
                            className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors"
                          >
                            <BookMarked className="w-4 h-4 text-amber-500" />
                            <div>
                              <span className="text-xs font-bold text-slate-800 dark:text-white block">Syllabus Sheets</span>
                              <span className="text-[10px] text-slate-400 block">Sample & Practice Papers</span>
                            </div>
                          </button>
                          <button 
                            onClick={() => handleNav("notes")} 
                            className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors"
                          >
                            <BookOpen className="w-4 h-4 text-emerald-500" />
                            <div>
                              <span className="text-xs font-bold text-slate-800 dark:text-white block">Chapterwise Notes</span>
                              <span className="text-[10px] text-slate-400 block">Download Premium PDFs</span>
                            </div>
                          </button>
                          <button 
                            onClick={() => handleNav("videos")} 
                            className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors"
                          >
                            <Calendar className="w-4 h-4 text-red-500" />
                            <div>
                              <span className="text-xs font-bold text-slate-800 dark:text-white block">Video Lectures</span>
                              <span className="text-[10px] text-slate-400 block">Live & Recorded Masterclasses</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === item.view
                      ? "text-amber-500 dark:text-amber-400 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Quick Controls & Portal Action Buttons matching image */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Box */}
            <div className="relative">
              <div className={`flex items-center transition-all duration-300 ${isSearchExpanded ? "w-48" : "w-10"} h-10 rounded-full bg-slate-50 dark:bg-slate-800 px-3 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden`}>
                <Search 
                  className="w-4 h-4 text-slate-400 cursor-pointer min-w-4" 
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)} 
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`ml-2 text-xs bg-transparent outline-none text-slate-800 dark:text-white w-full transition-all duration-300 ${isSearchExpanded ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            </div>

            {/* Premium Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <Sun className="w-4.5 h-4.5 text-amber-500" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-slate-600" />
              )}
            </button>

            {/* Login Button (Outline style) */}
            <button
              onClick={() => handleNav("dashboard")}
              className="px-5 py-2.5 rounded-xl border border-amber-500/30 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs hover:bg-amber-500/5 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              Login
            </button>

            {/* Enroll Now (Solid Gold) */}
            <button
              onClick={onEnrollClick}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/15 active:scale-98 transition-all cursor-pointer"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle in Mobile Header */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            <button
              onClick={() => handleNav("dashboard")}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 cursor-pointer"
              title="Student Portal"
            >
              <User className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
              aria-expanded={isOpen}
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Slide-in Drawer with backdrop blur */}
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with higher z-index above sticky header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm lg:hidden"
          />

          {/* Slide-in Drawer with even higher z-index */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[300px] sm:max-w-[340px] bg-white dark:bg-slate-950 shadow-2xl flex flex-col lg:hidden border-l border-slate-200 dark:border-slate-800"
            style={{ backgroundColor: isDarkMode ? "#09090b" : "#ffffff" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/60 shrink-0">
                <SKCoachingLogo />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body - Scrollable */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                {/* Search Box inside Drawer */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase block px-1">Quick Search</span>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search courses, notes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Navigation Links List */}
                <div className="space-y-5">
                  {/* Category 1: Academic Hub */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase block px-1">
                      Academic Resources
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      <button
                        onClick={() => { handleNav("notes"); setIsOpen(false); }}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-all ${
                          currentView === "notes"
                            ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-500/20"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4.5 h-4.5 text-emerald-500" />
                        </div>
                        <div className="text-left">
                          <span className="block text-slate-900 dark:text-white font-extrabold text-xs">Chapterwise Notes</span>
                          <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">Download Premium PDFs</span>
                        </div>
                      </button>

                      <button
                        onClick={() => { handleNav("materials"); setIsOpen(false); }}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-all ${
                          currentView === "materials"
                            ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-500/20"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                          <BookMarked className="w-4.5 h-4.5 text-amber-500" />
                        </div>
                        <div className="text-left">
                          <span className="block text-slate-900 dark:text-white font-extrabold text-xs">Syllabus Sheets</span>
                          <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">Syllabus & Practice Papers</span>
                        </div>
                      </button>

                      <button
                        onClick={() => { handleNav("videos"); setIsOpen(false); }}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-all ${
                          currentView === "videos"
                            ? "bg-red-500/10 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-500/20"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                          <PlayCircle className="w-4.5 h-4.5 text-red-500" />
                        </div>
                        <div className="text-left">
                          <span className="block text-slate-900 dark:text-white font-extrabold text-xs">Video Lectures</span>
                          <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">Recorded & Live Classes</span>
                        </div>
                      </button>

                      <button
                        onClick={() => { handleNav("tests"); setIsOpen(false); }}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-all ${
                          currentView === "tests"
                            ? "bg-purple-500/10 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-500/20"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                          <Award className="w-4.5 h-4.5 text-purple-500" />
                        </div>
                        <div className="text-left">
                          <span className="block text-slate-900 dark:text-white font-extrabold text-xs">Test Series</span>
                          <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">Quizzes & Mock Exams</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Category 2: Institution Links */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase block px-1">
                      Quick Links
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => { handleNav("home"); setIsOpen(false); }}
                        className={`flex flex-col items-start gap-1 p-2.5 rounded-xl transition-all border ${
                          currentView === "home"
                            ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-500/20"
                            : "bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Home className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-xs font-extrabold mt-1">Home</span>
                      </button>

                      <button
                        onClick={() => { handleNav("courses"); setIsOpen(false); }}
                        className={`flex flex-col items-start gap-1 p-2.5 rounded-xl transition-all border ${
                          currentView === "courses"
                            ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-500/20"
                            : "bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <GraduationCap className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-xs font-extrabold mt-1">Courses</span>
                      </button>

                      <button
                        onClick={() => { handleNav("about"); setIsOpen(false); }}
                        className={`flex flex-col items-start gap-1 p-2.5 rounded-xl transition-all border ${
                          currentView === "about"
                            ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-500/20"
                            : "bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Info className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-xs font-extrabold mt-1">About Us</span>
                      </button>

                      <button
                        onClick={() => { handleNav("contact"); setIsOpen(false); }}
                        className={`flex flex-col items-start gap-1 p-2.5 rounded-xl transition-all border ${
                          currentView === "contact"
                            ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-500/20"
                            : "bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Phone className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-xs font-extrabold mt-1">Contact Us</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div 
                className="p-5 border-t border-slate-100 dark:border-slate-800/60 space-y-3 shrink-0"
                style={{ backgroundColor: isDarkMode ? "#0d0d11" : "#f8fafc" }}
              >
                <button
                  onClick={() => { handleNav("dashboard"); setIsOpen(false); }}
                  className="w-full py-3.5 rounded-xl border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold text-center cursor-pointer hover:bg-amber-500/5 transition-colors"
                >
                  Student Portal Login
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onEnrollClick) onEnrollClick();
                  }}
                  className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold text-center cursor-pointer hover:bg-amber-600 shadow-md shadow-amber-500/10 active:scale-98 transition-all"
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
