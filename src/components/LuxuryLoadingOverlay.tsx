import React from "react";
import { Sparkles } from "lucide-react";
import skCoachingLogo from "../assets/images/sk_coaching_logo_1783335954863.jpg";

export default function LuxuryLoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white animate-fade-in">
      {/* Background glow meshes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative flex flex-col items-center text-center px-4 max-w-sm">
        {/* Animated Gold Ring Logo Frame */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-200 opacity-70 blur-md animate-spin" style={{ animationDuration: '6s' }} />
          <div className="relative w-20 h-20 rounded-2xl bg-slate-950 p-1 border border-amber-500/60 flex items-center justify-center overflow-hidden">
            <img 
              src={skCoachingLogo} 
              alt="SK Coaching Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Brand Header */}
        <h3 className="text-xl font-black tracking-widest text-white uppercase font-sans">
          SK COACHING
        </h3>
        <p className="text-[10px] font-bold text-amber-400 tracking-[0.3em] uppercase font-mono mt-1.5 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> PREMIER ACADEMICS
        </p>

        {/* High-end loading bar */}
        <div className="w-48 h-1 rounded-full bg-slate-800 overflow-hidden mt-8 mb-3 relative">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-full animate-loadingBar w-full" />
        </div>
        
        <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase animate-pulse">
          Synchronizing Elite System...
        </span>
      </div>
    </div>
  );
}
