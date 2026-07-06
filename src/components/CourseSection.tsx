import React, { useState } from "react";
import { 
  BookOpen, 
  Book, 
  FlaskConical, 
  TrendingUp, 
  Calculator, 
  Compass, 
  Briefcase,
  Layers, 
  CheckCircle2, 
  X 
} from "lucide-react";

interface CourseSectionProps {
  onEnrollClick: (courseName: string) => void;
}

export default function CourseSection({ onEnrollClick }: CourseSectionProps) {
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  const coursesList = [
    {
      id: "c8",
      className: "Class 8",
      subTitle: "All Subjects",
      subjects: "Maths, Science, Social Science, English, Hindi",
      icon: Book,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-100 dark:border-purple-900/40",
      description: "Thorough foundation building in mathematics, logic, and comprehensive science topics. Syncs completely with NCERT and CBSE boards.",
      highlights: ["Experienced home-style guides", "Weekly assessment sheets", "Doubt clarification desks"]
    },
    {
      id: "c9",
      className: "Class 9",
      subTitle: "All Subjects",
      subjects: "Maths, Science, Social Science, English, Hindi",
      icon: Compass,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
      borderColor: "border-amber-100 dark:border-amber-900/40",
      description: "Critical logic-building year bridging to board preparations. Focuses on advanced mathematics and physics concepts.",
      highlights: ["Olympiad preparation guide", "Daily revision exercises", "Continuous mock worksheets"]
    },
    {
      id: "c10",
      className: "Class 10",
      subTitle: "All Subjects",
      subjects: "Maths, Science, Social Science, English, Hindi",
      icon: Layers,
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30",
      borderColor: "border-rose-100 dark:border-rose-900/40",
      description: "Prestige CBSE Board preparatory course featuring full mock boards, paper-writing workshops, and quick revision formulas.",
      highlights: ["10+ Years solved board papers", "Subjective paper grading", "Confidence boosting seminars"]
    },
    {
      id: "c11s",
      className: "Class 11",
      stream: "Science",
      subTitle: "Science Stream",
      subjects: "Physics, Chemistry, Maths, Biology, English",
      icon: FlaskConical,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
      borderColor: "border-amber-100 dark:border-amber-900/40",
      description: "Highly focused preparation for school exams, plus core grounding for national entrance exams like JEE Advanced and NEET.",
      highlights: ["Interactive physics labs support", "Organic chemistry formula lists", "Bi-weekly assessment sheets"]
    },
    {
      id: "c11c",
      className: "Class 11",
      stream: "Commerce",
      subTitle: "Commerce Stream",
      subjects: "Accounts, Business Studies, Economics, English, Maths",
      icon: TrendingUp,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30",
      borderColor: "border-indigo-100 dark:border-indigo-900/40",
      description: "Introduction to business systems, analytical accountancy, macro-economics models, and ledger entries.",
      highlights: ["CA and FCA educators", "Real-world commercial case analysis", "Taxation core fundamentals"]
    },
    {
      id: "c12s",
      className: "Class 12",
      stream: "Science",
      subTitle: "Science Stream",
      subjects: "Physics, Chemistry, Maths, Biology, English",
      icon: Calculator,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
      borderColor: "border-emerald-100 dark:border-emerald-900/40",
      description: "Aggressive, robust preparation for the 12th board exams and intensive Mock testing for JEE Advanced / NEET selections.",
      highlights: ["JEE/NEET comprehensive series", "Mock-exam grading inside 24 hours", "One-on-one personal tracking dashboards"]
    },
    {
      id: "c12c",
      className: "Class 12",
      stream: "Commerce",
      subTitle: "Commerce Stream",
      subjects: "Accounts, Business Studies, Economics, English, Maths",
      icon: Briefcase,
      color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30",
      borderColor: "border-cyan-100 dark:border-cyan-900/40",
      description: "Advanced corporate auditing, company ledger balance sheets, economic statistics, and CUET exam synchronization.",
      highlights: ["FCA guided session series", "Comprehensive business practice mocks", "CUET test platform registration"]
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with "View All Courses" text on the right as shown in the image */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              <span className="gold-white-gradient">Our Courses (Class 8 to 12)</span>
            </h2>
          </div>
          <button 
            onClick={() => {
              alert("Displaying all active premium curriculum pathways. Select any class card to view specific syllabus layouts!");
            }}
            className="text-amber-600 hover:text-amber-700 dark:text-amber-400 font-bold text-sm inline-flex items-center gap-1 cursor-pointer hover:underline"
          >
            View All Courses →
          </button>
        </div>

        {/* Course Cards horizontal scroll on mobile / clean responsive grid on desktop */}
        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide lg:grid lg:grid-cols-7 lg:overflow-x-visible">
          {coursesList.map((course) => {
            const Icon = course.icon;
            return (
              <div 
                key={course.id} 
                className={`min-w-[240px] flex-shrink-0 lg:min-w-0 bg-white dark:bg-slate-950 rounded-2xl p-5 border ${course.borderColor} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {/* Styled Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${course.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Stream */}
                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                    {course.className}
                  </h3>
                  {course.stream && (
                    <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 block mt-0.5">
                      {course.stream}
                    </span>
                  )}
                  
                  {/* Subtitle */}
                  <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-2">
                    {course.subTitle}
                  </p>

                  {/* Subjects exact list */}
                  <p className="text-xs text-slate-500 dark:text-slate-300 mt-2 font-medium leading-relaxed">
                    {course.subjects}
                  </p>
                </div>

                {/* View Details Button matching image */}
                <div className="mt-5">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-extrabold text-xs transition-all cursor-pointer text-center"
                  >
                    View Details
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Course Details Modal (highly interactive) */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 animate-revealUp">
            
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {selectedCourse.className} {selectedCourse.stream ? `— ${selectedCourse.stream}` : ""}
                </h3>
                <span className="text-xs font-semibold text-slate-400 uppercase mt-0.5 block">
                  {selectedCourse.subTitle} Syllabus
                </span>
              </div>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider mb-1">Overview</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  {selectedCourse.description}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider mb-1">Academic Subjects covered</span>
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {selectedCourse.subjects}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider mb-2">Program Features</span>
                <ul className="space-y-2">
                  {selectedCourse.highlights.map((h: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="flex-1 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  onEnrollClick(`${selectedCourse.className} ${selectedCourse.stream || ""}`);
                }}
                className="flex-1 py-3 bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-md hover:bg-amber-600 transition-all cursor-pointer"
              >
                Enroll in Course
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
