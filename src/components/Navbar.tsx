import React, { useState } from "react";
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
  HelpCircle
} from "lucide-react";

import skLogo from "../assets/images/sk_coaching_logo_1783335954863.jpg";

export function SKCoachingLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-950 p-0.5 shadow-md border border-amber-500/40 overflow-hidden shrink-0">
        <img 
          src={skLogo} 
          alt="SK Coaching Logo" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-lg animate-fade-in" 
        />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-sans font-black text-base tracking-tight text-slate-900 dark:text-white leading-none">
          SK <span className="text-amber-500">COACHING</span>
        </span>
        <span className="text-[9px] font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5 leading-none">
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
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

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
              if (item.view === "materials" || item.view === "tests") {
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
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] mt-2 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl animate-revealUp">
                        <div className="space-y-1">
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
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNav("dashboard")}
              className="p-1.5 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 cursor-pointer"
              title="Student Portal"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 px-4 space-y-2 shadow-xl animate-fade-in max-h-[85vh] overflow-y-auto">
          {/* Quick Search */}
          <div className="relative mb-2">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none text-slate-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {menuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={`p-3 rounded-xl text-left text-xs font-bold transition-all ${
                  currentView === item.view
                    ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                    : "bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNav("dashboard")}
              className="w-full py-2.5 rounded-xl border border-amber-500/30 text-amber-600 text-xs font-bold text-center cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={onEnrollClick}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold text-center cursor-pointer"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
