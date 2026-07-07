import React, { useState } from "react";
import { 
  ChevronLeft, 
  MapPin, 
  Sparkles, 
  Clock, 
  BookOpen, 
  ShieldCheck, 
  Building, 
  PhoneCall, 
  Calendar, 
  DollarSign, 
  Users, 
  Flame, 
  CheckCircle, 
  Award,
  Video
} from "lucide-react";

interface OfflineCenterDetailViewProps {
  onBack: () => void;
  onOpenAdmissionForm: (courseName: string) => void;
}

export default function OfflineCenterDetailView({ onBack, onOpenAdmissionForm }: OfflineCenterDetailViewProps) {
  // Booking visit states
  const [visitorName, setVisitorName] = useState<string>("");
  const [visitorPhone, setVisitorPhone] = useState<string>("");
  const [visitorEmail, setVisitorEmail] = useState<string>("");
  const [selectedCenter, setSelectedCenter] = useState<string>("Delhi Central Campus");
  const [preferredClass, setPreferredClass] = useState<string>("Class 12 Science");
  const [visitDate, setVisitDate] = useState<string>("");
  const [bookingStatus, setBookingStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const physicalCenters = [
    {
      name: "Delhi Central Campus",
      address: "Sector 15-A, Sterling Towers, New Delhi - 110001",
      phone: "+91 98765 43210",
      email: "delhi.center@skcoaching.edu",
      timing: "08:00 AM - 08:00 PM (Monday to Sunday)",
      landmark: "Opposite Sector 15 Metro Station block B",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Patna Boring Road Campus",
      address: "4th Floor, Heera Enclave, Boring Road Crossing, Patna - 800001",
      phone: "+91 98765 43211",
      email: "patna.boring@skcoaching.edu",
      timing: "08:00 AM - 08:00 PM (Monday to Sunday)",
      landmark: "Beside SBI Main Branch",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Noida Sector 62 Campus",
      address: "block C-56, Stellar IT Park, Noida - 201301",
      phone: "+91 98765 43212",
      email: "noida.sec62@skcoaching.edu",
      timing: "08:30 AM - 07:30 PM (Monday to Sunday)",
      landmark: "Inside Stellar IT Park IT Hub",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Patna Kankarbagh Campus",
      address: "Shalimar Complex, Near Shivaji Park, Kankarbagh, Patna - 800020",
      phone: "+91 98765 43213",
      email: "patna.kankarbagh@skcoaching.edu",
      timing: "08:00 AM - 08:00 PM (Monday to Sunday)",
      landmark: "Opposite Shivaji Park Gate No. 2",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const premiumFeatures = [
    {
      icon: <Building className="w-5 h-5 text-amber-500" />,
      title: "Hi-Tech Digital Classrooms",
      desc: "Our lecture rooms are equipped with dual-lens interactive digital displays, high-definition sound systems, and anti-glare viewing surfaces to prevent eye strains."
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-500" />,
      title: "Micro Batch Size (Max 35)",
      desc: "Unlike standard institutes with 150+ students packed in huge auditoriums, we strictly limit batch sizes to 35 to facilitate individual monitoring and direct eye contact."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-blue-500" />,
      title: "Pre-Stocked Air-Conditioned Library",
      desc: "A completely noise-free, fully climate-controlled reference library open 14 hours a day. Pre-stocked with elite international study resources and books."
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-500" />,
      title: "Dedicated On-Desk Doubt Solving",
      desc: "Our faculty mentors sit at dedicated post-class doubt solving cabins from 12 PM to 8 PM. No query goes unsolved before you step back home."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-rose-500" />,
      title: "Biometric Parent SMS Alerts",
      desc: "Strict automated biometric check-in/check-out loops. Instantly logs entry/exit timing and shoots dynamic SMS verification updates directly to parents' mobile phones."
    },
    {
      icon: <Flame className="w-5 h-5 text-cyan-500" />,
      title: "Daily Practice Workbooks (DPPs)",
      desc: "Students receive printed physical workbooks daily. Worksheets are physically evaluated, graded, and uploaded onto the student Progression Tracker."
    }
  ];

  const routines = [
    { time: "08:00 AM - 11:30 AM", session: "Morning Core Lectures", detail: "Concept heavy sessions with physical board demonstration, active quizzes and live problem solving models." },
    { time: "11:30 AM - 01:00 PM", session: "Structured DPP Solving", detail: "Supervised self-solving period where students crack daily practice paper worksheets inside the silent library." },
    { time: "01:00 PM - 02:00 PM", session: "Lunch & Peer Discussion", detail: "Healthy physical environment to talk and discuss formulas, exam strategies, and share tips with peers." },
    { time: "02:00 PM - 05:30 PM", session: "Afternoon Specialized Batches", detail: "Syllabus advancement lectures tailored to specific academic levels, Boards, JEE Main/Advanced and NEET." },
    { time: "05:30 PM - 08:00 PM", session: "Face-to-Face Doubt Solving", detail: "Dedicated direct support desk. Faculty provides personalized step-by-step help for physical sheet queries." }
  ];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorPhone || !visitDate) return;

    setIsLoading(true);
    setBookingStatus("");

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "Center Tour",
          student: visitorName,
          details: `Booked Physical Visit at [${selectedCenter}] on ${visitDate} for ${preferredClass}. Callback Phone: ${visitorPhone}. Email: ${visitorEmail || "N/A"}.`,
          status: "Processed"
        })
      });

      if (response.ok) {
        setBookingStatus("✓ Appointment successfully scheduled! A specialized senior counselor has been blocked for your arrival. We have synchronized this tour directly to our Live Administrative Logs.");
        setVisitorName("");
        setVisitorPhone("");
        setVisitorEmail("");
        setVisitDate("");
      } else {
        setBookingStatus("Error processing booking. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setBookingStatus("Error logging tour booking onto the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans text-slate-800 dark:text-slate-100 min-h-screen bg-[#070708]">
      
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden py-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-slate-950 border-b border-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back button */}
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition-all mb-8 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-amber-500" /> Back to Home Page
          </button>

          <div className="text-center md:text-left max-w-4xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 text-xs font-black uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Elite Offline Academies
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
              SK Coaching <span className="gold-white-gradient">Physical Learning Centers</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed font-semibold">
              Experience the pinnacle of classroom education with direct access to distinguished ex-IIT faculty, hyper-focused physical study setups, face-to-face doubt cells, and full-spectrum educational discipline.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Section 1: Core Physical Benefits Bento */}
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3.5xl font-black text-white tracking-tight">
            Crafted for <span className="gold-white-gradient">Pure Focus & Academic Success</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
            Our physical campuses are architecturally planned to completely eradicate standard household distractions, helping students learn in an immersive competitive atmosphere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {premiumFeatures.map((feat, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-3xl bg-slate-950 border border-slate-900/60 hover:border-slate-800 transition-all flex flex-col justify-between text-left relative overflow-hidden group shadow-xl hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#111115] border border-slate-800 flex items-center justify-center shrink-0">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">{feat.title}</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Locations Grid */}
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-12" id="centers-directory">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
            <Building className="w-3.5 h-3.5" /> Find a center near you
          </span>
          <h2 className="text-2xl md:text-3.5xl font-black text-white tracking-tight">
            Our Premium <span className="gold-white-gradient">Academic Locations</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
            Walk-in to any of our physical branches to take free physical counseling, consult senior guides, and explore high-fidelity classrooms firsthand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {physicalCenters.map((center, index) => (
            <div 
              key={index} 
              className="rounded-3xl border border-slate-900 bg-slate-950 overflow-hidden flex flex-col sm:flex-row items-stretch shadow-2xl group hover:border-slate-800 transition-all"
            >
              <div className="sm:w-[40%] relative min-h-[200px]">
                <img 
                  src={center.image} 
                  alt={center.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent" />
              </div>
              
              <div className="p-6 sm:w-[60%] flex flex-col justify-between text-left space-y-4">
                <div>
                  <span className="inline-flex px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[9px] font-mono font-bold uppercase tracking-wider mb-2">
                    ACTIVE BRANCH
                  </span>
                  <h3 className="text-lg font-black text-white">{center.name}</h3>
                  
                  <div className="space-y-2 mt-3.5 text-xs text-slate-400">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{center.address}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 italic font-medium ml-6">
                      Landmark: {center.landmark}
                    </p>
                    <p className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="font-mono text-[11px] font-semibold text-slate-300">{center.phone}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{center.timing}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900/80 flex items-center gap-3">
                  <a 
                    href={`tel:${center.phone.replace(/\s+/g, '')}`} 
                    className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[11px] font-extrabold text-white text-center transition-all cursor-pointer"
                  >
                    Call Center
                  </a>
                  <button 
                    onClick={() => {
                      setSelectedCenter(center.name);
                      const formElement = document.getElementById("booking-appointment-form");
                      if (formElement) {
                        formElement.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-extrabold text-center transition-all cursor-pointer"
                  >
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: Study Plan Routine & Fees Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          
          {/* Daily Schedule Structure */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-slate-950 border border-slate-900/60 p-6 md:p-8 text-left shadow-2xl">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider font-mono mb-2">
                <Clock className="w-3 h-3" /> The Daily Routine
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white">Offline Campus Academic Schedule</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-semibold">
                Our structural calendar allocates dedicated lecture blocks, library practice sessions, and personalized doubt sessions.
              </p>

              <div className="space-y-4 mt-6">
                {routines.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-[#0c0c0e] border border-slate-900/80 hover:border-slate-800 transition-colors">
                    <div className="w-24 shrink-0 font-mono text-[11px] font-bold text-amber-400 flex items-center bg-amber-500/5 px-2.5 py-1 rounded-xl justify-center h-fit border border-amber-500/10">
                      {item.time}
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs md:text-sm font-extrabold text-white">{item.session}</h5>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fee Schedules & Scholarships */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-slate-950 border border-slate-900/60 p-6 md:p-8 text-left shadow-2xl">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider font-mono">
                <DollarSign className="w-3 h-3" /> transparent Fee details
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white">Programs Fee Schedule</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                Transparent and flexible premium pricing plans. Take our OSET Scholarship Entrance Test to claim up to 50% tuition concessions.
              </p>

              {/* Fee Cards */}
              <div className="space-y-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-slate-900 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-black text-white uppercase tracking-wider">Class 11 & 12 Science</h5>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Physics, Chemistry, Maths / Biology, DPP, Tests</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-amber-400 block">₹95,000<span className="text-[10px] text-slate-500 font-bold">/Year</span></span>
                    <span className="text-[9px] text-slate-400 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded block mt-0.5">OSET Waiver Applicable</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-slate-900 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-black text-white uppercase tracking-wider">Class 11 & 12 Commerce</h5>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Accountancy, Economics, Business Studies, DPP, Tests</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-amber-400 block">₹75,000<span className="text-[10px] text-slate-500 font-bold">/Year</span></span>
                    <span className="text-[9px] text-slate-400 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded block mt-0.5">OSET Waiver Applicable</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-slate-900 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-black text-white uppercase tracking-wider">Class 8 to 10 Foundation</h5>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Science, Maths, Mental Ability, Olympiad Prep</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-amber-400 block">₹55,000<span className="text-[10px] text-slate-500 font-bold">/Year</span></span>
                    <span className="text-[9px] text-slate-400 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded block mt-0.5">OSET Waiver Applicable</span>
                  </div>
                </div>
              </div>

              {/* Installments & Payment info */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-xs">
                <p className="text-amber-400 font-extrabold flex items-center gap-1.5 mb-1">
                  <Award className="w-4 h-4 shrink-0" /> Flexible Installment Schemes
                </p>
                <p className="text-slate-400 leading-relaxed font-semibold">
                  Fees can be submitted in 3 easy, zero-interest installments. High scores on our Sunday OSET Scholarship Exam grant direct tuition fee discounts immediately.
                </p>
              </div>
            </div>

            <button 
              onClick={() => onOpenAdmissionForm("OSET Scholarship Test")}
              className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              Apply for OSET Scholarship Test Now
            </button>
          </div>

        </div>

        {/* Section 4: Interactive counselor / visit appointment booking form */}
        <div className="max-w-2xl mx-auto" id="booking-appointment-form">
          <div className="glass-panel-heavy rounded-3xl p-6 md:p-8 border border-slate-800/80 bg-slate-950 text-left shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase mb-2">
                <Calendar className="w-3.5 h-3.5 text-amber-500" /> Book Campus Tour Appointment
              </span>
              <h3 className="text-xl font-black text-white">Schedule Physical Counselor Visit</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter details below to generate your direct walk-in counseling pass ticket. Our center director will welcome you personally.
              </p>
            </div>

            {bookingStatus && (
              <div className="p-4 mb-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold leading-relaxed">
                {bookingStatus}
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Student / Parent Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Priyanshu Kumar"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c0c0e] border border-slate-900 hover:border-slate-800 focus:border-amber-500/50 outline-none rounded-xl text-xs text-white font-medium transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Contact Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c0c0e] border border-slate-900 hover:border-slate-800 focus:border-amber-500/50 outline-none rounded-xl text-xs text-white font-medium transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g. student@example.com"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0c0c0e] border border-slate-900 hover:border-slate-800 focus:border-amber-500/50 outline-none rounded-xl text-xs text-white font-medium transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Preferred Location</label>
                  <select
                    value={selectedCenter}
                    onChange={(e) => setSelectedCenter(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c0c0e] border border-slate-900 hover:border-slate-800 focus:border-amber-500/50 outline-none rounded-xl text-xs text-slate-200 font-medium transition-colors cursor-pointer"
                  >
                    <option value="Delhi Central Campus">Delhi Central Campus</option>
                    <option value="Patna Boring Road Campus">Patna Boring Road Campus</option>
                    <option value="Noida Sector 62 Campus">Noida Sector 62 Campus</option>
                    <option value="Patna Kankarbagh Campus">Patna Kankarbagh Campus</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Target Class Program</label>
                  <select
                    value={preferredClass}
                    onChange={(e) => setPreferredClass(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0c0c0e] border border-slate-900 hover:border-slate-800 focus:border-amber-500/50 outline-none rounded-xl text-xs text-slate-200 font-medium transition-colors cursor-pointer"
                  >
                    <option value="Class 12 Science">Class 12 Science</option>
                    <option value="Class 12 Commerce">Class 12 Commerce</option>
                    <option value="Class 11 Science">Class 11 Science</option>
                    <option value="Class 11 Commerce">Class 11 Commerce</option>
                    <option value="Class 10 Foundation">Class 10 Foundation</option>
                    <option value="Class 9 Foundation">Class 9 Foundation</option>
                    <option value="Class 8 Foundation">Class 8 Foundation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Scheduled Visit Date</label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0c0c0e] border border-slate-900 hover:border-slate-800 focus:border-amber-500/50 outline-none rounded-xl text-xs text-slate-200 font-medium transition-colors cursor-pointer"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/10 active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Generating Admission Entry Ticket..." : "Register Physical Visit Pass Ticket"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
