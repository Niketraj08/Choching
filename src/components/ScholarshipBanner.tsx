import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Clock } from "lucide-react";

interface ScholarshipBannerProps {
  onRegisterClick: () => void;
}

export default function ScholarshipBanner({ onRegisterClick }: ScholarshipBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 14, minutes: 22, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white overflow-hidden py-3 px-4 shadow-inner border-b border-white/10">
      {/* Absolute Decorative Glow Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_40%)]" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left relative z-10">
        
        {/* Core Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <span className="inline-flex items-center gap-1 bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase animate-pulse">
            <Sparkles className="w-3 h-3" /> Scholarship
          </span>
          <p className="text-xs sm:text-sm font-medium text-slate-200">
            Secure up to <span className="text-cyan-300 font-bold">50% Scholarship</span> for Class 8-12 Academic Year 2026-27.
          </p>
        </div>

        {/* Dynamic Ticking Clock Countdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-indigo-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-mono text-[11px] uppercase tracking-wider text-indigo-200 font-medium">Closes in:</span>
            <span className="font-mono font-bold text-white tracking-wider">
              {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
            </span>
          </div>

          <button
            onClick={onRegisterClick}
            className="group flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs transition-all duration-200 shadow-md shadow-cyan-400/10 active:scale-95 cursor-pointer"
          >
            Register Test
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
