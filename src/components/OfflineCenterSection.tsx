import React from "react";
import { 
  MapPin, 
  Tv, 
  Award, 
  BookOpen, 
  Users, 
  CheckSquare, 
  Sparkles, 
  Clock,
  ShieldCheck,
  Flame,
  CheckCircle2
} from "lucide-react";

interface OfflineCenterSectionProps {
  onOpenAdmissionForm?: (courseName: string) => void;
}

export default function OfflineCenterSection({ onOpenAdmissionForm }: OfflineCenterSectionProps) {
  const offlineBenefits = [
    {
      icon: <Tv className="w-5 h-5 text-amber-500" />,
      title: "Smart Classroom Tech",
      desc: "Equipped with ultra-bright Interactive smart-touch digital boards making geometric, physics & chemistry reactions highly interactive and visible."
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-500" />,
      title: "Peer-to-Peer Interaction",
      desc: "Learn in a healthy, competitive physical environment. Friendly peer rivalry pushes standard boundaries and maximizes performance."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-blue-500" />,
      title: "Silent Reading Library",
      desc: "Access our air-conditioned high-focus library pre-stocked with advanced reference books (HC Verma, Irodov, RD Sharma, MS Chouhan)."
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-500" />,
      title: "Dedicated Doubt Counters",
      desc: "Post-class instant help. Faculty members sit face-to-face with individual students to solve worksheet problems step-by-step."
    }
  ];

  const infrastructureDetails = [
    {
      label: "Classroom Capacity",
      value: "Max 35 Students per batch to ensure full personal attention & direct eye contact."
    },
    {
      label: "Study Material Desk",
      value: "Instant physical printing & dispatch of daily practice workbooks (DPPs) with detailed answers."
    },
    {
      label: "Strict Attendance Logs",
      value: "Biometric attendance tracking with SMS integration to parents within 10 minutes of class start."
    },
    {
      label: "Weekly Board Simul",
      value: "Physical pen-and-paper mock tests checked with precise examiner guidelines and margin notes."
    }
  ];

  return (
    <section className="py-16 bg-[#0c0c0e] border-y border-slate-900 font-sans relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-black uppercase tracking-widest font-mono">
            <Sparkles className="w-3.5 h-3.5" /> Premium Infrastructure
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Our Physical <span className="gold-white-gradient">Offline Centers & Facilities</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
            While our online portal offers ultimate flexibility, our physical offline classrooms are designed to maximize concentration, academic discipline, and direct peer collaboration under expert supervision.
          </p>
        </div>

        {/* Bento Grid Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Visual Highlight Card */}
          <div className="lg:col-span-5 relative rounded-3xl p-8 bg-slate-950 border border-slate-800 flex flex-col justify-between overflow-hidden group shadow-2xl">
            {/* Glowing accent */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-all" />
            
            <div className="space-y-6">
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Focus & Discipline Defined</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Our offline learning model removes all home distractions. Under the strict watch of experienced mentors, students undergo rigorous timed study sessions and complete interactive paper assignments.
                </p>
              </div>

              {/* Bullet checklist */}
              <ul className="space-y-3.5 pt-2">
                <li className="flex items-start gap-3 text-xs text-slate-300 font-semibold">
                  <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Interactive sessions without screen fatigue</span>
                </li>
                <li className="flex items-start gap-3 text-xs text-slate-300 font-semibold">
                  <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Real physical evaluator grading & marks analytics</span>
                </li>
                <li className="flex items-start gap-3 text-xs text-slate-300 font-semibold">
                  <CheckCircle2 className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Strict personal mentoring with direct query response</span>
                </li>
              </ul>
            </div>

            {/* Quick center location block */}
            <div className="mt-8 pt-6 border-t border-slate-900 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] text-slate-500 font-mono font-bold block uppercase">VISIT CENTRAL CAMPUS</span>
                <span className="text-xs font-bold text-slate-200">Sector 15-A, Sterling Towers, New Delhi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Benefits 4-grid bento */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {offlineBenefits.map((benefit, i) => (
              <div 
                key={i}
                className="p-6 rounded-3xl bg-slate-950/40 border border-slate-900 hover:border-slate-800 transition-colors text-left flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{benefit.title}</h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Highlight Stats / Details Strip */}
        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {infrastructureDetails.map((infra, idx) => (
            <div key={idx} className="space-y-2 border-l-2 border-amber-500/20 pl-4">
              <span className="text-[10px] font-bold font-mono tracking-wider uppercase text-amber-500">{infra.label}</span>
              <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                {infra.value}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              if (onOpenAdmissionForm) {
                onOpenAdmissionForm("Class 12 Science");
              } else {
                alert("Walk-In counseling is active! Fill our entry ticket form for a free physical center seat trial.");
              }
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm tracking-wide uppercase transition-all shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-98 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" /> Schedule Physical Center Tour Today
          </button>
          <p className="text-[10px] font-mono text-slate-500 mt-3 uppercase tracking-wider">
            No entry fees required • Personalized counselor assigned instantly
          </p>
        </div>

      </div>
    </section>
  );
}
