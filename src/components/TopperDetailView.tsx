import React from "react";
import { 
  ArrowLeft, 
  Award, 
  BookOpen, 
  Clock, 
  Quote, 
  GraduationCap, 
  CheckSquare, 
  Star, 
  Heart 
} from "lucide-react";
import { Topper } from "../types";

interface TopperDetailViewProps {
  topper: Topper;
  onBack: () => void;
}

export default function TopperDetailView({ topper, onBack }: TopperDetailViewProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans animate-revealUp">
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-500 hover:border-amber-500/50 transition-all cursor-pointer mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Super Toppers
      </button>

      {/* Profile Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Card: Portrait & Quick Stats */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          {/* Decorative glowing amber accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -z-10" />

          <div className="flex flex-col items-center text-center">
            {/* Large Avatar frame with glow */}
            <div className="relative mb-5 group">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 opacity-70 blur-xs group-hover:opacity-100 transition-opacity" />
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-950 bg-slate-100 shadow-lg">
                <img 
                  src={topper.photo} 
                  alt={topper.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <span className="absolute -bottom-1 right-2 bg-amber-500 text-slate-950 p-2 rounded-full shadow-lg border-2 border-white dark:border-slate-950">
                <Award className="w-5 h-5" />
              </span>
            </div>

            {/* Title / Labels */}
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{topper.name}</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 font-mono">{topper.class}</p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-black font-mono tracking-wider uppercase bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/40">
                {topper.score}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black font-mono tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/40">
                {topper.rank}
              </span>
            </div>

            {/* Key stats cards */}
            <div className="w-full mt-6 grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 text-left">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Target Exam</span>
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mt-0.5">{topper.exam}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 text-left">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Coaching Program</span>
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mt-0.5">SK Elite Classroom</span>
              </div>
            </div>

            {/* Parent testimonial precisely included */}
            {topper.parentReview && (
              <div className="w-full mt-6 p-4 rounded-2xl bg-gradient-to-tr from-amber-500/5 to-amber-400/10 border border-amber-200/20 dark:border-amber-500/10 text-left relative">
                <span className="absolute top-3 right-3 text-amber-500/20">
                  <Heart className="w-5 h-5 fill-amber-500/20" />
                </span>
                <span className="text-[10px] font-black font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Parent Testimonial</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 italic leading-relaxed font-semibold">
                  "{topper.parentReview}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Content: Bio, Strategy & Daily Routine */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section: Biography */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-md">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3 mb-4">
              <GraduationCap className="w-5 h-5 text-amber-500" /> Complete Biography & Journey
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
              {topper.biography || "Loading biography details..."}
            </p>
          </div>

          {/* Bento: Study Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Study Hours Card */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-wider block">Focused Self Study</span>
                <span className="text-sm font-black text-slate-800 dark:text-white block mt-0.5">{topper.studyHours || "6 Hours daily"}</span>
              </div>
            </div>

            {/* Favorite Subject Card */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-wider block">Favorite Domain</span>
                <span className="text-sm font-black text-slate-800 dark:text-white block mt-0.5">{topper.favoriteSubject || "Mathematics"}</span>
              </div>
            </div>

          </div>

          {/* Section: Preparation Strategy */}
          {topper.prepStrategy && topper.prepStrategy.length > 0 && (
            <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-md">
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3 mb-4">
                <Star className="w-5 h-5 text-amber-500" /> My Secret Preparation Strategy
              </h3>
              <ul className="space-y-3">
                {topper.prepStrategy.map((strat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                    <CheckSquare className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{strat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section: Daily Routine */}
          {topper.dailyRoutine && (
            <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-md">
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3 mb-4">
                <Clock className="w-5 h-5 text-amber-500" /> A Day In My Life Routine
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                {topper.dailyRoutine}
              </p>
            </div>
          )}

          {/* Section: Words of Gratitude */}
          {topper.mentorMessage && (
            <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-6 border border-slate-800/80 shadow-lg relative overflow-hidden">
              <span className="absolute -bottom-4 right-2 text-slate-800/40 font-serif text-8xl pointer-events-none select-none">
                ”
              </span>
              <div className="relative flex gap-3">
                <Quote className="w-8 h-8 text-amber-500 shrink-0" />
                <div>
                  <span className="text-[10px] font-black font-mono text-amber-400 uppercase tracking-widest block mb-2">Message to Aspiring Students</span>
                  <p className="text-xs text-slate-200 italic leading-relaxed font-semibold">
                    "{topper.mentorMessage}"
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
