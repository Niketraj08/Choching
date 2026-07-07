import React from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Youtube, Send } from "lucide-react";
import skLogo from "../assets/images/sk_coaching_logo_1783335954863.jpg";

interface FooterProps {
  setView: (view: string) => void;
}

export default function Footer({ setView }: FooterProps) {
  const handleLink = (view: string) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleLink("home")}>
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-950 p-0.5 border border-amber-500/40 shadow-md overflow-hidden shrink-0">
                <img 
                  src={skLogo} 
                  alt="SK Coaching Logo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg" 
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-black text-base text-white leading-none tracking-tight">
                  SK <span className="text-amber-500">COACHING</span>
                </span>
                <span className="text-[9px] font-bold font-mono text-slate-500 uppercase tracking-widest mt-0.5 leading-none">
                  Unlock Your Potential
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              We are committed to provide quality education and help students achieve academic excellence.
            </p>
            {/* Social Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-400 text-slate-400 hover:text-white flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-600 text-slate-400 hover:text-white flex items-center justify-center transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-500 text-slate-400 hover:text-white flex items-center justify-center transition-all">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleLink("home")} className="hover:text-blue-500 transition-colors">Home</button></li>
              <li><button onClick={() => handleLink("about")} className="hover:text-blue-500 transition-colors">About Us</button></li>
              <li><button onClick={() => handleLink("courses")} className="hover:text-blue-500 transition-colors">Courses</button></li>
              <li><button onClick={() => handleLink("materials")} className="hover:text-blue-500 transition-colors">Study Material</button></li>
              <li><button onClick={() => handleLink("tests")} className="hover:text-blue-500 transition-colors">Test Series</button></li>
              <li><button onClick={() => handleLink("contact")} className="hover:text-blue-500 transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Column 3: Courses */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Courses</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleLink("courses")} className="hover:text-blue-500 transition-colors">Class 8</button></li>
              <li><button onClick={() => handleLink("courses")} className="hover:text-blue-500 transition-colors">Class 9</button></li>
              <li><button onClick={() => handleLink("courses")} className="hover:text-blue-500 transition-colors">Class 10</button></li>
              <li><button onClick={() => handleLink("courses")} className="hover:text-blue-500 transition-colors">Class 11 Science</button></li>
              <li><button onClick={() => handleLink("courses")} className="hover:text-blue-500 transition-colors">Class 11 Commerce</button></li>
              <li><button onClick={() => handleLink("courses")} className="hover:text-blue-500 transition-colors">Class 12 Science</button></li>
              <li><button onClick={() => handleLink("courses")} className="hover:text-blue-500 transition-colors">Class 12 Commerce</button></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleLink("notes")} className="hover:text-blue-500 transition-colors">Notes</button></li>
              <li><button onClick={() => handleLink("videos")} className="hover:text-blue-500 transition-colors">Video Lectures</button></li>
              <li><button onClick={() => handleLink("materials")} className="hover:text-blue-500 transition-colors">Practice Material</button></li>
              <li><button onClick={() => handleLink("materials")} className="hover:text-blue-500 transition-colors">Previous Papers</button></li>
              <li><button onClick={() => handleLink("materials")} className="hover:text-blue-500 transition-colors">Question Bank</button></li>
              <li><button onClick={() => handleLink("materials")} className="hover:text-blue-500 transition-colors">Study Planner</button></li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:info@skcoaching.edu" className="hover:text-white transition-colors">info@skcoaching.edu</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>123 Education Street, New Delhi, India - 110001</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© 2025 SK Coaching Institute. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>

    </footer>
  );
}
