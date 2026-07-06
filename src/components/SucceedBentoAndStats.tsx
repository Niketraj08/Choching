import React from "react";
import { 
  FileText, 
  Play, 
  CheckSquare, 
  HelpCircle, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  BookOpen, 
  Star, 
  ChevronRight, 
  Award, 
  Users, 
  BookOpenCheck,
  Quote,
  Smartphone,
  PhoneCall
} from "lucide-react";

interface SucceedBentoAndStatsProps {
  onExploreAllFeatures: () => void;
  onEnrollClick: () => void;
}

export default function SucceedBentoAndStats({ onExploreAllFeatures, onEnrollClick }: SucceedBentoAndStatsProps) {
  
  // Bento features grid
  const bentoFeatures = [
    {
      title: "Notes",
      desc: "Chapter wise notes in PDF format",
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
      icon: FileText
    },
    {
      title: "Video Lectures",
      desc: "Recorded & Live classes",
      color: "text-red-600 bg-red-50 dark:bg-red-950/30",
      icon: Play
    },
    {
      title: "Test Series",
      desc: "Chapter, Weekly & Full Syllabus Tests",
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
      icon: Calendar
    },
    {
      title: "Practice Material",
      desc: "Assignments, Practice Sheets, Question Bank",
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30",
      icon: CheckSquare
    },
    {
      title: "Previous Papers",
      desc: "Previous Year Question Papers",
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30",
      icon: BookOpen
    },
    {
      title: "Performance",
      desc: "Track your progress and performance",
      color: "text-teal-600 bg-teal-50 dark:bg-teal-950/30",
      icon: TrendingUp
    },
    {
      title: "Doubt Support",
      desc: "Ask doubts anytime from teachers",
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30",
      icon: HelpCircle
    },
    {
      title: "Study Planner",
      desc: "Smart study plan & reminders",
      color: "text-amber-500 bg-amber-500/10 dark:bg-amber-950/30",
      icon: BookOpenCheck
    }
  ];

  // Stats list
  const statsList = [
    { value: "10+", label: "Years of Excellence", icon: Award },
    { value: "25K+", label: "Students Enrolled", icon: Users },
    { value: "150+", label: "Expert Faculty", icon: GraduationCapIcon },
    { value: "98%", label: "Success Rate", icon: TrendingUp },
    { value: "500+", label: "Tests Conducted", icon: BookOpenCheck },
    { value: "15K+", label: "Notes Available", icon: FileText }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Ananya Sharma",
      class: "Class 10",
      quote: "The faculty and study material are amazing. This is the best institute for Classes 8-12.",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
    },
    {
      name: "Rohit Verma",
      class: "Class 12 Science",
      quote: "Regular tests and doubt sessions helped me improve my scores a lot.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
    },
    {
      name: "Priya Patel",
      class: "Class 11 Commerce",
      quote: "Best guidance, best notes, best teachers. Highly recommended!",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
    }
  ];

  // Top Rankers exactly from image
  const topRankers = [
    {
      rank: 1,
      name: "Arjun Singh",
      score: "AIR 245",
      exam: "JEE Advanced",
      class: "Class 12 Science",
      color: "from-yellow-400 to-amber-500",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
    },
    {
      rank: 2,
      name: "Sneha Gupta",
      score: "AIR 812",
      exam: "JEE Advanced",
      class: "Class 12 Science",
      color: "from-slate-300 to-slate-400",
      badgeColor: "bg-slate-100 text-slate-800 dark:bg-slate-900/50 dark:text-slate-300",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    },
    {
      rank: 3,
      name: "Karan Mehta",
      score: "98.6%",
      exam: "CBSE Board",
      class: "Class 10",
      color: "from-amber-600 to-amber-700",
      badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-400",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <div className="font-sans space-y-16">
      
      {/* 1. "Everything You Need To Succeed" Bento Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Title Card */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 flex flex-col justify-between border border-slate-100 dark:border-slate-800">
            <div className="space-y-4">
              <h3 className="text-3xl font-black leading-none">
                <span className="gold-white-gradient font-sans">Everything You <br /> Need To Succeed</span>
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                We provide all the resources and support you need to achieve your goals.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={onExploreAllFeatures}
                className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Explore All Features
              </button>
            </div>
          </div>

          {/* Right 8-Item Features Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {bentoFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Spectacular Hybrid Offline & Online Learning Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400 text-xs font-black uppercase tracking-widest font-mono">
            Dual Mode Academy
          </span>
          <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            पढ़ाई सिर्फ ऑनलाइन ही नहीं, <span className="gold-white-gradient">ऑफ़लाइन भी!</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
            SK Coaching delivers the absolute best of both worlds. Connect digitally from anywhere, or visit our state-of-the-art offline classroom centers for authentic educational discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card A: OFFLINE SEVA */}
          <div className="relative rounded-3xl p-8 bg-gradient-to-tr from-amber-500/5 to-amber-600/10 dark:from-slate-950 dark:to-amber-950/20 border border-amber-500/30 dark:border-amber-500/15 shadow-xl flex flex-col justify-between overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-lg shadow-amber-500/20">
                  OFF
                </div>
                <div>
                  <span className="text-[10px] font-bold font-mono tracking-widest text-amber-600 dark:text-amber-400 uppercase block">Smart Classroom Centers</span>
                  <h4 className="text-xl font-black text-slate-950 dark:text-white">SK OFFLINE SEVA (ऑफ़लाइन कोचिंग)</h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                Experience high-energy face-to-face mentorship in our specialized centers designed to reinforce traditional discipline with smart touch-boards.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-amber-500/10 text-left">
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">Smart Touch Classrooms</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Physical smart screens with interactive lesson charts.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-amber-500/10 text-left">
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">Face-To-Face Doubt Support</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Solve daily workbook doubts directly with IITian faculty.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-amber-500/10 text-left">
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">Physical Paper Evaluators</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Simulate board conditions with real paper evaluation sheets.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-amber-500/10 text-left">
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">Weekly PTM Meetups</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Direct administrative meetups with parents for deep tracking.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-500/15">
              <button
                onClick={() => alert("Visiting Offline Centers counseling is active! Direct query registered. Walk in today for admission discount.")}
                className="w-full py-3 px-5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-md shadow-amber-500/10 hover:bg-amber-600 transition-colors"
              >
                Join Offline Batch Seva
              </button>
            </div>
          </div>

          {/* Card B: ONLINE PORTAL */}
          <div className="relative rounded-3xl p-8 bg-gradient-to-tr from-blue-500/5 to-indigo-600/10 dark:from-slate-950 dark:to-indigo-950/20 border border-blue-500/25 dark:border-blue-500/15 shadow-xl flex flex-col justify-between overflow-hidden group hover:border-blue-500/35 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/20">
                  ON
                </div>
                <div>
                  <span className="text-[10px] font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block">Elite Digital Suite</span>
                  <h4 className="text-xl font-black text-slate-950 dark:text-white">SK ONLINE STUDY PORTAL</h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                Connect and excel from the comfort of your home with our ultra-optimized software panel offering interactive mock exams.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-blue-500/10 text-left">
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">Live Interactive Lectures</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">High-fidelity live stream rooms with chat channels.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-blue-500/10 text-left">
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">24/7 AI Support Advisor</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Ask questions and get instant conceptual responses.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-blue-500/10 text-left">
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">Chapter PDFs & Assignments</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Download formula booklets and assignments on any mobile device.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-blue-500/10 text-left">
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">Digital Mock Simulator</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Computer-based online tests with analytical graphs.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-500/15">
              <button
                onClick={onEnrollClick}
                className="w-full py-3 px-5 rounded-xl bg-blue-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-md shadow-blue-500/10 hover:bg-blue-700 transition-colors"
              >
                Launch Online Study Portal
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Premium Dark Gold Counter/Statistics Bar */}
      <section className="bg-slate-950 border-y border-amber-500/25 py-10 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center divide-x divide-slate-800">
            {statsList.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center p-2">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{stat.value}</h3>
                  <p className="text-[10px] font-bold uppercase text-amber-400 tracking-wider mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Testimonials ("What Our Students Say") & Rankers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-16">
        
        {/* Testimonials Block */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black tracking-tight">
              <span className="gold-white-gradient">What Our Students Say</span>
            </h3>
            <button 
              onClick={() => alert("Displaying all verified alumni success feedbacks!")}
              className="text-amber-600 hover:text-amber-700 dark:text-amber-400 font-bold text-xs hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-amber-500/20 dark:text-amber-500/10 shrink-0" />
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic font-semibold leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-50 dark:border-slate-900">
                  <img 
                    src={item.photo} 
                    alt={item.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-100 dark:border-slate-800 shadow-sm"
                  />
                  <div>
                    <h5 className="text-xs font-black text-slate-900 dark:text-white">{item.name}</h5>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{item.class}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Our Top Rankers block precisely from the image */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black tracking-tight">
              <span className="gold-white-gradient">Our Top Rankers</span>
            </h3>
            <button 
              onClick={() => alert("Displaying active national qualifiers dashboard!")}
              className="text-amber-500 hover:text-amber-400 dark:text-amber-400 font-bold text-xs hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topRankers.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800/80 p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow"
              >
                {/* Ribbon badge for rank 1st, 2nd, 3rd */}
                <div className={`absolute top-4 left-4 w-7 h-7 rounded-full bg-gradient-to-tr ${item.color} text-white flex items-center justify-center font-black text-xs shadow-md z-10`}>
                  {item.rank}
                </div>

                {/* Profile Avatar */}
                <div className="relative mb-4">
                  <div className={`absolute -inset-1 rounded-full bg-gradient-to-tr ${item.color} opacity-40 blur-sm group-hover:opacity-75 transition-opacity`} />
                  <img 
                    src={item.photo} 
                    alt={item.name} 
                    className="w-20 h-20 rounded-full object-cover relative border-2 border-white dark:border-slate-900 shadow-md"
                  />
                </div>

                {/* Score badge from the image */}
                <h4 className="text-xl font-black text-amber-500 dark:text-amber-400 tracking-tight">
                  {item.score}
                </h4>

                {/* Exam Sub-title */}
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase mt-1 ${item.badgeColor}`}>
                  {item.exam}
                </span>

                {/* Student Name */}
                <h5 className="text-sm font-black text-slate-900 dark:text-white mt-4">
                  {item.name}
                </h5>

                {/* Class */}
                <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                  {item.class}
                </span>

              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 5. CTA Banner exactly from the image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-slate-900 dark:bg-slate-950 border border-amber-500/30 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Dynamic lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          
          <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              <span className="gold-white-gradient font-sans">Ready to Start Your Success Journey?</span>
            </h3>
            <p className="text-sm text-amber-400 font-semibold">
              Join thousands of students who trust SK Coaching for their bright future.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full md:w-auto shrink-0 justify-center">
            <button
              onClick={onEnrollClick}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer text-center"
            >
              Enroll Now
            </button>
            <button
              onClick={() => alert("Our Direct Counseling helpline +91 98765 43210 is active! Feel free to call us anytime.")}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer text-center inline-flex items-center gap-2 justify-center"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Talk to Counselor
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

// Inline GraduationCapIcon representation
function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.91a2 2 0 0 0 1.66 0z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}
