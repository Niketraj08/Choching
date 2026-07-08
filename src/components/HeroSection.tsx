import React from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Download, 
  BookOpen, 
  Laptop, 
  FileText, 
  CheckCircle, 
  HelpCircle, 
  TrendingUp, 
  GraduationCap 
} from "lucide-react";

interface HeroSectionProps {
  setView: (view: string) => void;
  onOpenAdmissionForm: () => void;
}

export default function HeroSection({ setView, onOpenAdmissionForm }: HeroSectionProps) {
  const featuresList = [
    {
      title: "Expert Faculty",
      desc: "Best Teachers",
      color: "bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
      icon: GraduationCap,
    },
    {
      title: "Smart Classes",
      desc: "Live + Recorded",
      color: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
      icon: Laptop,
    },
    {
      title: "Study Material",
      desc: "Notes & PDFs",
      color: "bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
      icon: FileText,
    },
    {
      title: "Test Series",
      desc: "Mock & Chapter Tests",
      color: "bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",
      icon: CheckCircle,
    },
    {
      title: "Doubt Support",
      desc: "24x7 Assistance",
      color: "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
      icon: HelpCircle,
    },
    {
      title: "Performance",
      desc: "Track & Improve",
      color: "bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/40 pt-12 pb-20 font-sans">
      {/* Decorative vector background matching the image's dynamic shapes */}
      <div className="absolute top-0 right-0 w-[45%] h-[85%] bg-gradient-to-bl from-amber-500/10 via-amber-400/5 to-transparent rounded-bl-[150px] -z-10 hidden lg:block" />
      <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content block */}
          <div className="lg:col-span-7 space-y-6 md:space-y-7 text-center lg:text-left">
            
            {/* Custom styled gold/amber pill-badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold tracking-wide uppercase mx-auto lg:mx-0 shadow-sm shadow-amber-500/10">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Building Future, Creating Excellence</span>
            </div>

            {/* Massive Bold Headline with gold-white-gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              <span className="gold-white-gradient">The Best Place To <br /> Learn & Grow</span> <br />
              <span className="text-slate-900 dark:text-white">For </span>
              <span className="text-amber-500 dark:text-amber-400">Classes 8 to 12</span>
            </h1>

            {/* Exact paragraph description */}
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Expert faculty, smart learning, detailed notes, daily practice, weekly tests and a complete path to success.
            </p>

            {/* Offline Seva v Online Padhai Hybrid badge card */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/35 dark:border-amber-500/20 text-left max-w-xl mx-auto lg:mx-0 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0">
                  OFFLINE + ONLINE
                </span>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    पढ़ाई सिर्फ ऑनलाइन ही नहीं, ऑफ़लाइन भी!
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-300 mt-1 leading-relaxed font-semibold">
                    SK Coaching introduces high-fidelity physical classrooms with smart touch boards, face-to-face mentorship, and physical paper evaluation alongside our elite digital suite.
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons styled exactly to the theme */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setView("courses")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/20 active:scale-98 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore Courses <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => {
                  alert("Your SK Coaching Prospectus & Brochure is preparing for download! Check your downloads folder in a moment.");
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 font-extrabold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Download Brochure <Download className="w-4 h-4" />
              </button>
            </div>

            {/* 10K+ Trust elements with custom avatars row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <div className="flex -space-x-3.5">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Student" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Student" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="Student" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Student" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100" alt="Student" />
              </div>
              <div className="text-center sm:text-left">
                <span className="text-amber-500 dark:text-amber-400 font-extrabold text-base block">10K+</span>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Students Trust Us</span>
              </div>
            </div>

          </div>

          {/* Hero Right Content block - Students frame & Admission card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none flex items-center justify-center h-[380px] md:h-[450px]">
              
              {/* Main Visual background circle matching the amber arc in the image */}
              <div className="absolute w-[360px] h-[360px] md:w-[420px] md:h-[420px] rounded-full bg-amber-500 overflow-hidden shadow-2xl flex items-end justify-center">
                {/* Chalk board sketches representation overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                <div className="absolute top-10 left-10 w-24 h-24 rounded-full border border-dashed border-white/20 animate-spin-slow" />
                
                {/* Real student image with transparent-feeling beautiful placement */}
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500" 
                  alt="SK Coaching Students" 
                  referrerPolicy="no-referrer"
                  className="w-[85%] h-[85%] object-cover object-top rounded-t-full relative z-10 brightness-105 saturate-110"
                />
              </div>

              {/* Admission Floating Card precisely styled from the image */}
              <div className="absolute -bottom-6 right-2 md:-right-4 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-center w-[200px] z-20 hover:scale-105 transition-transform duration-300">
                <span className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-wider block">Admissions Open</span>
                <span className="text-xl font-black text-amber-500 dark:text-amber-400 block mt-1">2025-26</span>
                
                <button
                  onClick={onOpenAdmissionForm}
                  className="mt-4 w-full py-2.5 bg-slate-900 dark:bg-amber-400 text-amber-400 dark:text-slate-900 hover:bg-slate-850 dark:hover:bg-amber-500 font-extrabold text-xs rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  Apply Now
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* 6-Column Features Ribbon precisely styled from the image */}
        <div className="mt-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-5 shadow-lg shadow-slate-100/50 dark:shadow-none">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 divide-y md:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
            {featuresList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center text-center p-3 transition-colors ${
                    idx >= 2 ? "pt-4 md:pt-3" : ""
                  } ${
                    idx % 2 !== 0 ? "border-t border-slate-100 dark:border-slate-800 md:border-t-0" : ""
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold mt-0.5">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
