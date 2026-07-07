import React, { useState } from "react";
import { 
  Compass, 
  Eye, 
  Target, 
  Linkedin, 
  Mail, 
  Sparkles, 
  Award, 
  CheckCircle, 
  Star, 
  Phone, 
  MapPin, 
  Calendar, 
  ChevronDown, 
  ArrowRight,
  MessageCircle,
  HelpCircle
} from "lucide-react";
import { FacultyMember, Topper, GalleryItem, NewsItem, FaqItem } from "../types";
import { facultyData, toppersData, galleryData, newsData, faqsData } from "../data";

// ==========================================
// 1. ABOUT INSTITUTE COMPONENT
// ==========================================
export function AboutSection() {
  const whyUs = [
    { title: "IIT/IISc Core Faculty", desc: "Trained exclusively by elite educators who have cracked premier competitive benchmarks." },
    { title: "Micro-Topic Analytics", desc: "Weekly mock tests are reviewed on a granular level to trace and strengthen student weak points." },
    { title: "AI-Powered Doubt Support", desc: "Our 24/7 server-side chatbot resolves complex numerical or conceptual doubts instantly." },
    { title: "Holistic Counseling", desc: "Individual mental wellness and stress-free strategy development sessions with director." }
  ];

  return (
    <div className="space-y-16 py-10">
      
      {/* Intro & Director */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 dark:bg-primary/20 dark:text-amber-300 dark:border-primary/20 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> ESTABLISHED 2011
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="gold-white-gradient">Nurturing Elite Academic Minds For A Decade</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            SK Coaching Institute has served as a sanctuary of premier educational growth for over a decade. Founded with a vision to bypass mindless memorization, we focus on crystalline conceptual understanding, analytical thinking, and mental rigor through our dual approach: offline physical classrooms and online dynamic portals.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            We provide comprehensive smart physical classroom instruction, offline practice workbooks, face-to-face evaluation, as well as an exhaustive online simulation portal for board & competitive exams.
          </p>
        </div>

        {/* Director Message Card */}
        <div className="lg:col-span-5">
          <div className="glass-panel-heavy rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-amber-500/10 blur-xl" />
            
            <span className="text-[10px] font-bold text-primary dark:text-amber-400 font-mono tracking-widest uppercase block mb-3">DIRECTOR'S MESSAGE</span>
            <blockquote className="text-xs italic text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-4">
              "True coaching is not about filling a vessel; it is about kindling a flame. At SK Coaching, we nurture a student's inner inquisitiveness, turning daunting academic challenges into rewarding milestones of scientific growth."
            </blockquote>
            
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-primary/20">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" 
                  alt="Director" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">Prof. Alok Verma</h5>
                <span className="text-[9px] text-slate-400 font-mono block">Director & Founder, SK Coaching Institute</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-amber-50 to-amber-100/20 dark:from-slate-800/40 dark:to-amber-950/20 border border-amber-100/50 dark:border-slate-850">
          <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center mb-4 shadow-md shadow-primary/25">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">Our Mission</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            To deliver unmatched, structured preparatory support that empowers students from Class 8 to 12 to crack competitive landmarks and achieve flawless Board scores, without inducing mental stress.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-tr from-cyan-50 to-cyan-100/40 dark:from-slate-800/40 dark:to-cyan-950/10 border border-cyan-100/40 dark:border-slate-850">
          <div className="w-9 h-9 rounded-xl bg-accent text-white flex items-center justify-center mb-4 shadow-md shadow-accent/25">
            <Eye className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">Our Vision</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            To build a world-class model of synchronized, accessible, and high-fidelity secondary education where digital assistance and veteran classroom counseling merge to make every child a lifelong analytical champion.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="space-y-8 pt-6">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-xl font-extrabold tracking-tight">
            <span className="gold-white-gradient">Why Modern Toppers Choose SK Coaching</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">Four columns of strategic differences that define our results.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((w, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-primary block mb-2">0{idx + 1}</span>
              <h5 className="text-xs font-bold text-slate-800 dark:text-white mb-1.5">{w.title}</h5>
              <p className="text-xs text-slate-500 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ==========================================
// 2. FACULTY PORTFOLIO SECTION
// ==========================================
export function FacultySection() {
  return (
    <div className="space-y-10 py-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200/50 dark:bg-primary/20 dark:text-amber-300 dark:border-primary/20 text-xs font-bold uppercase tracking-wider">
          Veteran Mentors
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight">
          <span className="gold-white-gradient">Learn From The Elite Mind Creators</span>
        </h3>
        <p className="text-xs text-slate-500">Every single educator holds IIT, JNU, IISc or CA credentials with unmatched board experience.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {facultyData.map((f) => (
          <div 
            key={f.id} 
            className="glass-panel rounded-2xl border border-slate-200/50 dark:border-slate-800/80 overflow-hidden flex flex-col justify-between hover-gold-glow"
          >
            <div>
              {/* Photo Box */}
              <div className="aspect-square w-full bg-slate-100 relative overflow-hidden">
                <img 
                  src={f.photo} 
                  alt={f.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-103" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-sm font-bold text-white">{f.name}</h4>
                  <span className="text-[10px] text-slate-300 font-mono block">{f.qualification}</span>
                </div>
              </div>

              {/* Mentoring Info */}
              <div className="p-5 space-y-2.5">
                <div>
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">Specialization</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white block leading-snug">{f.specialization}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">Experience</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block">{f.experience} training boards</span>
                </div>
              </div>
            </div>

            {/* Socials / Direct Query */}
            <div className="p-5 pt-0 flex justify-between items-center border-t border-slate-100 dark:border-slate-800/60">
              <span className="text-[10px] text-slate-400 font-medium">Faculty Member</span>
              <div className="flex items-center gap-2">
                <a 
                  href={`mailto:${f.socials.email}`} 
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-300 flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => alert(`Direct counseling channel open with ${f.name}! You can message them in your Student Portal.`)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 font-bold text-[10px] uppercase transition-colors cursor-pointer"
                >
                  Ask Doubt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. STUDENT SUCCESS SECTION
// ==========================================
export function StudentSuccessSection({ onTopperClick }: { onTopperClick?: (id: string) => void }) {
  return (
    <div className="space-y-12 py-10">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200/50 dark:bg-primary/20 dark:text-amber-300 dark:border-primary/20 text-xs font-bold uppercase tracking-wider">
          SK Coaching Laurels
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight">
          <span className="gold-white-gradient">Our Board & CUET Super Toppers</span>
        </h3>
        <p className="text-xs text-slate-500">Real success stories. Meet the students who achieved perfect conceptual performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {toppersData.map((t) => (
          <div 
            key={t.id} 
            className="glass-panel rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Photo & Scores */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-primary/20 bg-slate-100">
                  <img src={t.photo} alt={t.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{t.name}</h4>
                  <span className="text-[10px] text-slate-500 font-medium block">{t.class}</span>
                  <span className="inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold font-mono bg-emerald-100 text-emerald-700 mt-1 uppercase">
                    {t.score}
                  </span>
                </div>
              </div>

              {/* Story */}
              <div className="space-y-3">
                <div>
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">SUCCESS STORY</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                    "{t.successStory}"
                  </p>
                </div>

                {t.parentReview && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <span className="text-[9px] font-mono text-indigo-500 block uppercase">PARENT REVIEWS</span>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      "{t.parentReview}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>Exam Cracked:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{t.exam}</span>
              </div>
              <button
                onClick={() => onTopperClick && onTopperClick(t.id)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md active:scale-98"
              >
                <Eye className="w-3.5 h-3.5" /> View Biography & Strategy
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ==========================================
// 4. CAMPUS GALLERY COMPONENT
// ==========================================
export function GallerySection() {
  const [filter, setFilter] = useState<string>("All");

  const filteredItems = galleryData.filter((g) => filter === "All" || g.category === filter);

  return (
    <div className="space-y-8 py-10">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-primary uppercase block">VISUAL EXPERIENCE</span>
          <h3 className="text-2xl font-extrabold tracking-tight">
            <span className="gold-white-gradient">SK Coaching Campus & Celebrations</span>
          </h3>
        </div>

        {/* Filter categories */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          {["All", "Campus", "Events", "Seminars", "Award Ceremony"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold shrink-0 transition-all ${
                filter === cat
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((g) => (
          <div 
            key={g.id} 
            className="group rounded-2xl overflow-hidden glass-panel border border-slate-200/50 dark:border-slate-800 shadow-sm relative aspect-4/3 cursor-pointer"
          >
            <img 
              src={g.imageUrl} 
              alt={g.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity" />
            
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-primary block">
                {g.category}
              </span>
              <h5 className="text-[11px] font-bold tracking-tight block mt-0.5 line-clamp-1">
                {g.title}
              </h5>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ==========================================
// 5. LATEST NEWS & BILLBOARD
// ==========================================
export function LatestNewsSection() {
  return (
    <div className="space-y-10 py-10">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200/50 dark:bg-primary/20 dark:text-amber-300 dark:border-primary/20 text-xs font-bold uppercase tracking-wider">
          Bulletins
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight">
          <span className="gold-white-gradient">Announcements & Board Updates</span>
        </h3>
        <p className="text-xs text-slate-500">Live academic calendar notices and result declarations at SK Coaching.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsData.map((item) => (
          <div 
            key={item.id} 
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {item.category}
                </span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded bg-rose-500 text-white text-[8px] font-bold tracking-widest uppercase animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {item.content}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Published At: {item.publishedAt}</span>
              <button 
                onClick={() => alert(`Opening official document bulletin: "${item.title}"...`)}
                className="text-primary font-bold flex items-center gap-1 hover:underline"
              >
                Read Document <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ==========================================
// 6. BEAUTIFUL ACCORDION FAQ
// ==========================================
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-8 py-10 max-w-4xl mx-auto">
      
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200/50 dark:bg-primary/20 dark:text-amber-300 dark:border-primary/20 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" /> Doubts Solved
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight">
          <span className="gold-white-gradient">Frequently Asked Questions</span>
        </h3>
        <p className="text-xs text-slate-500">Find answers regarding admission tests, scholarships, and hybrid models.</p>
      </div>

      <div className="space-y-3.5">
        {faqsData.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className="rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-800 dark:text-white flex items-center justify-between transition-colors hover:bg-slate-50 dark:hover:bg-slate-850"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : "text-slate-400"}`} />
              </button>
              
              {isOpen && (
                <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 animate-revealUp">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

// ==========================================
// 7. CONTACT & MAP COMPONENT
// ==========================================
export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", course: "Class 12 Science" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    
    // Simulate real log report sheets sync
    fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "Admission Query",
        student: form.name,
        details: `Submitted contact form. Subject of interest: ${form.course}. Callback phone: ${form.phone}`,
        status: "Processed"
      })
    });

    setStatus("✓ Thank you! Our administrative counselor is syncing this callback request. We will reach you within 2 hours.");
    setForm({ name: "", email: "", phone: "", message: "", course: "Class 12 Science" });
    setTimeout(() => setStatus(""), 5000);
  };

  return (
    <div className="space-y-12 py-10">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-2xl font-extrabold tracking-tight">
          <span className="gold-white-gradient">Connect With Our Helpline</span>
        </h3>
        <p className="text-xs text-slate-500">Visit our physical campus or submit a virtual callback prompt. Counselors are available 24/7.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Callback form left side */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800">
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">Request A Direct Callback Panel</h4>
          
          {status && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Student Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Verma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                  required
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Phone / Callback</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. rahul@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Desired Program</label>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium"
                >
                  <option value="Class 12 Science">Class 12 Science (Boards + JEE)</option>
                  <option value="Class 12 Commerce">Class 12 Commerce</option>
                  <option value="Class 11 Science">Class 11 Science</option>
                  <option value="Class 11 Commerce">Class 11 Commerce</option>
                  <option value="Class 10 Foundation">Class 10 Foundation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Specific inquiry / notes</label>
              <textarea
                rows={3}
                placeholder="Ask us anything about scholarship, seat availability or stream selection details..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none outline-none rounded-xl text-xs text-slate-800 dark:text-white font-medium resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
            >
              Submit Callback Request
            </button>
          </form>
        </div>

        {/* Address details & Map mock right side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Campus Details</h4>
            
            <div className="flex gap-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <span className="font-bold text-slate-800 dark:text-white block">SK Coaching Central Campus</span>
                <span className="block">45, Sterling Towers, Sector 15-A, Metro Hub Square, New Delhi, Pin-110015</span>
              </div>
            </div>

            <div className="flex gap-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <span className="font-bold text-slate-800 dark:text-white block">Helpline Contacts</span>
                <span className="block">+91 98765 43210</span>
                <span className="block">support@skcoaching.edu</span>
              </div>
            </div>

            {/* Direct WhatsApp chat button */}
            <div className="pt-2">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                Chat Now with counselors on WhatsApp
              </a>
            </div>
          </div>

          {/* Interactive Mock Google Map placeholder */}
          <div className="relative h-44 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 flex flex-col items-center justify-center p-4 text-center">
            {/* Aesthetic coordinate styling */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
            <MapPin className="w-8 h-8 text-rose-500 animate-bounce relative z-10" />
            <h5 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 relative z-10 mt-2">Map Interface View (New Delhi Central Center)</h5>
            <span className="text-[9px] text-slate-400 font-mono block">Latitude: 28.6139° N, Longitude: 77.2090° E</span>
          </div>
        </div>

      </div>

    </div>
  );
}
