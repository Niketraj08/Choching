import React, { useState } from "react";
import { 
  BookOpen, 
  FileText, 
  Award, 
  Play, 
  Download, 
  Search, 
  ExternalLink, 
  Clock, 
  ChevronRight, 
  Sparkles,
  Bookmark,
  Calendar,
  Layers,
  ListFilter,
  CheckCircle,
  HelpCircle,
  Brain,
  Trophy,
  RefreshCw,
  Check,
  X,
  Volume2,
  VolumeX
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Note, StudyMaterial, OnlineTest, VideoLecture } from "../types";
import { notesData, studyMaterialsData, onlineTestsData, videoLecturesData } from "../data";
import { downloadStudyMaterialPDF, downloadNotePDF } from "../lib/pdfGenerator";
import { playSuccessSound, playFailureSound } from "../lib/sound";

interface AcademicHubProps {
  initialTab?: "notes" | "materials" | "tests" | "videos" | "quiz";
}

export default function AcademicHub({ initialTab = "notes" }: AcademicHubProps) {
  const [activeTab, setActiveTab] = useState<"notes" | "materials" | "tests" | "videos" | "quiz">(initialTab);
  
  // Note specific states
  const [noteSearch, setNoteSearch] = useState("");
  const [selectedNoteSubject, setSelectedNoteSubject] = useState("All");
  const [downloadingNoteId, setDownloadingNoteId] = useState<string | null>(null);

  // Material specific states
  const [selectedMaterialType, setSelectedMaterialType] = useState("All");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (mat: StudyMaterial) => {
    setDownloadingId(mat.id);
    setTimeout(() => {
      downloadStudyMaterialPDF(mat);
      setDownloadingId(null);
    }, 800);
  };

  // Video specific states
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Test taking simulator states
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [testScore, setTestScore] = useState<{ correct: number; total: number; score: number } | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});

  // Mini Quiz States
  const [selectedQuizTopicId, setSelectedQuizTopicId] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizIsFinished, setQuizIsFinished] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);

  const quizTopics = [
    {
      id: "physics",
      title: "Electromagnetism & Optics",
      subject: "Physics",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500",
      description: "Evaluate your understanding of Coulomb's Law, speed of light, Faraday's induction, refractive indexes, and vision correction lenses.",
      difficulty: "Medium",
      questions: [
        {
          id: 1,
          question: "When a glass rod is rubbed with silk, what type of charge does it acquire?",
          options: ["Positive charge", "Negative charge", "No charge", "An unpredictable charge"],
          correctIndex: 0,
          explanation: "By convention, a glass rod rubbed with silk becomes positively charged because it loses valence electrons to the silk material."
        },
        {
          id: 2,
          question: "The refractive index of water is 1.33. What is the approximate speed of light in water? (Speed of light in vacuum c = 3 x 10^8 m/s)",
          options: ["3.0 x 10^8 m/s", "2.25 x 10^8 m/s", "1.5 x 10^8 m/s", "2.0 x 10^8 m/s"],
          correctIndex: 1,
          explanation: "Speed of light in a medium is calculated by v = c / n. Therefore, speed = (3 x 10^8) / 1.33 ≈ 2.25 x 10^8 m/s."
        },
        {
          id: 3,
          question: "According to Faraday's Law of Electromagnetic Induction, the induced electromotive force (EMF) is directly proportional to:",
          options: ["Rate of change of magnetic flux", "Total magnetic flux in the system", "Area of the coil", "Internal resistance of the conductor"],
          correctIndex: 0,
          explanation: "Faraday's law states that the induced electromotive force in any closed circuit is equal to the negative rate of change of the magnetic flux through the circuit."
        },
        {
          id: 4,
          question: "Which lens is used to correct myopia (nearsightedness)?",
          options: ["Convex lens", "Concave lens", "Bifocal lens", "Cylindrical lens"],
          correctIndex: 1,
          explanation: "Myopia occurs when the eyeball is too long. A concave (diverging) lens is used to disperse light rays before they hit the eye, moving the focal point back onto the retina."
        },
        {
          id: 5,
          question: "The unit of electric potential is the Volt. One Volt is equivalent to which of the following?",
          options: ["1 Joule / Coulomb", "1 Joule * Coulomb", "1 Newton / Coulomb", "1 Newton * Meter"],
          correctIndex: 0,
          explanation: "Electric potential is work done per unit charge. Therefore, 1 Volt = 1 Joule of work done per 1 Coulomb of charge."
        }
      ]
    },
    {
      id: "chemistry",
      title: "Organic Compounds & Reactions",
      subject: "Chemistry",
      icon: "🧪",
      color: "from-emerald-500 to-teal-500",
      description: "Test your skills on natural gas components, fragrant esters, acidic strength gradients, hybridization, and hydrocarbon synthesis reactions.",
      difficulty: "Hard",
      questions: [
        {
          id: 1,
          question: "What is the primary component of natural gas?",
          options: ["Ethane", "Methane", "Propane", "Butane"],
          correctIndex: 1,
          explanation: "Methane (CH4) is a simple one-carbon alkane and constitutes about 70-90% of natural gas."
        },
        {
          id: 2,
          question: "The functional group responsible for the pleasant fruity smell of flowers and fruits is:",
          options: ["Carboxylic acid", "Ester", "Ether", "Ketone"],
          correctIndex: 1,
          explanation: "Esters (-COOR) are known for their distinct pleasant, sweet, and fruity fragrances, and are widely used in perfumes, essential oils, and synthetic food flavorings."
        },
        {
          id: 3,
          question: "Which of the following displays the correct order of increasing acidic strength?",
          options: ["HCOOH < CH3COOH < ClCH2COOH", "CH3COOH < HCOOH < ClCH2COOH", "ClCH2COOH < HCOOH < CH3COOH", "CH3COOH < ClCH2COOH < HCOOH"],
          correctIndex: 1,
          explanation: "ClCH2COOH is the strongest due to the electron-withdrawing -I effect of Chlorine stabilizing the carboxylate ion. CH3COOH is weaker than HCOOH due to the electron-donating +I effect of the methyl group."
        },
        {
          id: 4,
          question: "What is the hybridization of carbon atoms in ethyne (C2H2)?",
          options: ["sp3", "sp2", "sp", "dsp2"],
          correctIndex: 2,
          explanation: "In ethyne (acetylene), each carbon forms a triple bond with the other carbon and a single bond with a hydrogen. This linear arrangement requires sp hybridization."
        },
        {
          id: 5,
          question: "Which organic reaction is used to convert an alkyl halide to an alkane containing twice the number of carbon atoms?",
          options: ["Wurtz Reaction", "Friedel-Crafts Reaction", "Aldol Condensation", "Clemmensen Reduction"],
          correctIndex: 0,
          explanation: "The Wurtz reaction couples two alkyl halide molecules using sodium metal in dry ether to synthesize symmetrical higher alkanes."
        }
      ]
    },
    {
      id: "math",
      title: "Calculus & Probability",
      subject: "Mathematics",
      icon: "📐",
      color: "from-amber-500 to-orange-500",
      description: "Solve problems involving derivatives of variable powers, sine function integrals, dice rolling probabilities, limits, and sphere volume rates.",
      difficulty: "Medium",
      questions: [
        {
          id: 1,
          question: "What is the derivative of x^x with respect to x?",
          options: ["x * x^(x-1)", "x^x * (1 + ln x)", "x^x * ln x", "e^x * (1 + ln x)"],
          correctIndex: 1,
          explanation: "Using logarithmic differentiation, let y = x^x, so ln y = x * ln x. Differentiating gives (1/y) * dy/dx = 1 * ln x + x * (1/x) = 1 + ln x. Thus dy/dx = x^x * (1 + ln x)."
        },
        {
          id: 2,
          question: "The value of the definite integral of sin(x) evaluated from 0 to π is:",
          options: ["0", "1", "2", "-2"],
          correctIndex: 2,
          explanation: "The integral of sin(x) is -cos(x). Evaluating from 0 to π: -cos(π) - (-cos(0)) = -(-1) - (-1) = 1 + 1 = 2."
        },
        {
          id: 3,
          question: "If two fair six-sided dice are rolled simultaneously, what is the probability that the sum of the numbers is 7?",
          options: ["1/6", "1/12", "5/36", "1/4"],
          correctIndex: 0,
          explanation: "There are 36 total outcomes. Favorable outcomes for a sum of 7 are (1,6), (2,5), (3,4), (4,3), (5,2), and (6,1) — 6 outcomes. Probability = 6/36 = 1/6."
        },
        {
          id: 4,
          question: "What is the limit as x approaches 0 of sin(x)/x?",
          options: ["0", "1", "Infinity", "Does not exist"],
          correctIndex: 1,
          explanation: "lim (x->0) sin(x)/x is a fundamental trigonometric limit. It can be proved using the squeeze theorem or L'Hopital's Rule (cos(0)/1 = 1)."
        },
        {
          id: 5,
          question: "What is the rate of change of the volume of a sphere of radius r with respect to its radius?",
          options: ["4 * pi * r", "4 * pi * r^2", "(4/3) * pi * r^2", "8 * pi * r"],
          correctIndex: 1,
          explanation: "Volume V = (4/3) * pi * r^3. The rate of change with respect to r is dV/dr = 4 * pi * r^2, which represents the surface area of the sphere."
        }
      ]
    },
    {
      id: "commerce",
      title: "Accountancy & Economics",
      subject: "Commerce",
      icon: "📊",
      color: "from-rose-500 to-pink-500",
      description: "Master accounting balance principles, intangible assets, market price GDP definitions, and Giffen goods supply and demand behavior.",
      difficulty: "Easy",
      questions: [
        {
          id: 1,
          question: "According to the Dual Aspect Concept in accounting, Assets are always equal to:",
          options: ["Capital - Liabilities", "Capital + Liabilities", "Revenue - Expenses", "Liabilities - Capital"],
          correctIndex: 1,
          explanation: "The accounting equation states that a business's assets are financed by either the owner's capital or external creditors' liabilities (Assets = Capital + Liabilities)."
        },
        {
          id: 2,
          question: "Which of the following is classified as an intangible asset?",
          options: ["Industrial Machinery", "Goodwill", "Trade Debtors", "Cash at Bank"],
          correctIndex: 1,
          explanation: "An intangible asset is an asset that is not physical in nature. Goodwill, brand reputation, patents, and trademarks are prime examples."
        },
        {
          id: 3,
          question: "When the market price of a Giffen good falls, its consumer demand generally:",
          options: ["Increases", "Decreases", "Remains constant", "First increases then decreases"],
          correctIndex: 1,
          explanation: "Giffen goods are highly inferior products. When their price falls, the income effect offsets the substitution effect, and demand actually decreases."
        },
        {
          id: 4,
          question: "The relationship between Price and Demand for regular normal goods is represented by a:",
          options: ["Downward sloping curve", "Upward sloping curve", "Vertical straight line", "Horizontal straight line"],
          correctIndex: 0,
          explanation: "The Law of Demand dictates an inverse relationship between price and quantity demanded, leading to a downward-sloping demand curve."
        },
        {
          id: 5,
          question: "What is the definition of 'Gross Domestic Product' (GDP) at market prices?",
          options: ["Value of intermediate goods produced", "Total market value of final goods and services produced within national boundaries in a year", "Total income of citizens residing abroad", "Value of exports minus imports only"],
          correctIndex: 1,
          explanation: "GDP measures the total monetary value of all final goods and services produced within a country's domestic territory during a specific financial year."
        }
      ]
    }
  ];

  const simulatedQuestions = [
    { q: "What is the force between two static charges in vacuum?", options: ["Coulomb Force", "Lorentz Force", "Kepler Force", "Euler Force"], ans: 0 },
    { q: "If dy/dx = cos(x), what is the function y?", options: ["sin(x) + C", "-sin(x) + C", "cos(x) + C", "-cos(x) + C"], ans: 0 },
    { q: "Which of the following is NOT an accounting convention?", options: ["Consistency", "Full Disclosure", "Materiality", "Inflation Adjusting"], ans: 3 },
  ];

  const handleDownloadNote = (note: Note) => {
    setDownloadingNoteId(note.id);
    setTimeout(() => {
      downloadNotePDF(note);
      setDownloadingNoteId(null);
    }, 800);
  };

  const handleStartTest = (testId: string) => {
    setActiveTestId(testId);
    setTestScore(null);
    setSelectedAnswers({});
  };

  const handleSelectAnswer = (qIdx: number, oIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitTest = () => {
    let correct = 0;
    simulatedQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.ans) correct++;
    });
    setTestScore({
      correct,
      total: simulatedQuestions.length,
      score: Math.round((correct / simulatedQuestions.length) * 100)
    });
  };

  const handleFinishQuiz = () => {
    setQuizIsFinished(true);
    if (isSoundEnabled) {
      if (quizScore >= 3) {
        playSuccessSound();
      } else {
        playFailureSound();
      }
    }
  };

  // Filtered Notes
  const filteredNotes = notesData.filter((note) => {
    const matchSearch = note.title.toLowerCase().includes(noteSearch.toLowerCase()) || 
                        note.chapter.toLowerCase().includes(noteSearch.toLowerCase());
    const matchSubject = selectedNoteSubject === "All" || note.subject === selectedNoteSubject;
    return matchSearch && matchSubject;
  });

  // Filtered Materials
  const filteredMaterials = studyMaterialsData.filter((mat) => {
    return selectedMaterialType === "All" || mat.type === selectedMaterialType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title & Hub Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block">ACADEMIC HUB</span>
          <h2 className="text-3xl font-extrabold tracking-tight">
            <span className="gold-white-gradient">Study & Practice Portal</span>
          </h2>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shrink-0 transition-all ${
              activeTab === "notes"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            Class Notes
          </button>

          <button
            onClick={() => setActiveTab("materials")}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shrink-0 transition-all ${
              activeTab === "materials"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-secondary" />
            Study Materials
          </button>

          <button
            onClick={() => setActiveTab("tests")}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shrink-0 transition-all ${
              activeTab === "tests"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-accent" />
            Mock Tests
          </button>

          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shrink-0 transition-all ${
              activeTab === "videos"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <Play className="w-3.5 h-3.5 text-emerald-500" />
            Video Lectures
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shrink-0 transition-all ${
              activeTab === "quiz"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            Daily Mini Quiz
          </button>
        </div>
      </div>

      {/* ======================================= */}
      {/* 1. CLASS NOTES SECTION                  */}
      {/* ======================================= */}
      {activeTab === "notes" && (
        <div className="space-y-6">
          
          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search notes, chapters, formulas..."
                value={noteSearch}
                onChange={(e) => setNoteSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-white font-medium"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              {["All", "Physics", "Chemistry", "Mathematics", "Accountancy", "Economics"].map((subj) => (
                <button
                  key={subj}
                  onClick={() => setSelectedNoteSubject(subj)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedNoteSubject === subj
                      ? "bg-primary text-slate-950 font-extrabold"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div 
                key={note.id} 
                className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800/80 shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200/50 dark:bg-primary/20 dark:text-amber-300 dark:border-primary/20 uppercase">
                      {note.subject}
                    </span>
                    {note.isLatest && (
                      <span className="inline-flex px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-bold tracking-wider uppercase animate-pulse">
                        NEW UPLOAD
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                    {note.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 block mt-1 font-medium">{note.chapter}</span>
                  <span className="text-[10px] text-slate-500 font-mono block mt-2">{note.classCategory}</span>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-[10px] text-slate-400 font-mono">
                    <span className="block">{note.views} Views</span>
                    <span className="block">{note.downloads} Downloads</span>
                  </div>

                  <button
                    disabled={downloadingNoteId !== null}
                    onClick={() => handleDownloadNote(note)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 dark:bg-white dark:hover:bg-slate-105 dark:text-slate-950 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {downloadingNoteId === note.id ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    {downloadingNoteId === note.id ? "Preparing PDF..." : "Download PDF"}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================================= */}
      {/* 2. STUDY MATERIALS SECTION              */}
      {/* ======================================= */}
      {activeTab === "materials" && (
        <div className="space-y-6">
          
          {/* Sub-Filters */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full sm:w-max overflow-x-auto">
            {["All", "Assignment", "Practice Sheet", "Sample Paper", "Question Bank", "Previous Year Paper", "Important Questions"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMaterialType(type)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  selectedMaterialType === type
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                {type}s
              </button>
            ))}
          </div>

          {/* Materials Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaterials.map((mat) => (
              <div 
                key={mat.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs flex items-center justify-between hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary/15 to-secondary/5 text-secondary flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-secondary uppercase tracking-wider block">{mat.type}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block mt-0.5">{mat.title}</span>
                    <span className="text-[10px] text-slate-400 block font-medium">{mat.subject} — {mat.className}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-slate-400">{mat.fileSize}</span>
                  <button
                    disabled={downloadingId !== null}
                    onClick={() => handleDownload(mat)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 transition-all flex items-center gap-1.5"
                    title="Download Formatted PDF"
                  >
                    {downloadingId === mat.id ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                    ) : (
                      <Download className="w-4 h-4 hover:text-amber-500 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================================= */}
      {/* 3. ONLINE TEST SERIES SECTION           */}
      {/* ======================================= */}
      {activeTab === "tests" && (
        <div className="space-y-6">
          
          {!activeTestId ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {onlineTestsData.map((test) => (
                <div 
                  key={test.id}
                  className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-accent/10 text-accent uppercase font-mono">
                        {test.type}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-medium">Marks: {test.marks}</span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {test.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">{test.subject} — {test.className}</p>
                    
                    <div className="mt-3.5 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                      <div>• Duration: {test.durationMinutes} minutes</div>
                      <div>• Total: {test.totalQuestions} MCQs</div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => handleStartTest(test.id)}
                      className="w-full py-2 rounded-xl bg-accent hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer"
                    >
                      Start Mock Exam Challenge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Active test taking simulation
            <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800/80 animate-revealUp">
              
              {/* Exam Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">SK Coaching Mock Exam Suite Simulator</h4>
                  <span className="text-xs text-slate-400 block mt-0.5">Attempt the questions below to evaluate your core chemistry and mathematics.</span>
                </div>
                <button
                  onClick={() => setActiveTestId(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold"
                >
                  Exit Test
                </button>
              </div>

              {/* Questions list */}
              <div className="space-y-6">
                {simulatedQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-850">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-white mb-3">Q{qIdx + 1}. {q.q}</h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedAnswers[qIdx] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectAnswer(qIdx, oIdx)}
                            className={`p-3.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                              isSelected
                                ? "bg-amber-100 dark:bg-primary/10 border-primary text-amber-800 dark:text-amber-300"
                                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Score output or submit */}
              {testScore ? (
                <div className="mt-8 p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 text-center animate-revealUp">
                  <span className="text-2xl font-extrabold text-emerald-600 block">Your Score: {testScore.score}%</span>
                  <p className="text-xs text-slate-500 mt-1">You answered {testScore.correct} out of {testScore.total} questions correctly.</p>
                  
                  <div className="mt-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleStartTest(activeTestId!)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
                    >
                      Retry Challenge
                    </button>
                    <button
                      onClick={() => setActiveTestId(null)}
                      className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold transition-all"
                    >
                      Back to test list
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={handleSubmitTest}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-yellow-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    Submit Answers & Get Instant Score Card
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* ======================================= */}
      {/* 4. VIDEO LECTURES SECTION               */}
      {/* ======================================= */}
      {activeTab === "videos" && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Visual mock video player or playlist item active */}
            <div className="lg:col-span-8">
              <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between">
                
                {playingVideoId ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1`}
                    title="SK Coaching Lecture Video Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  // Overlay mock dashboard
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4 border border-primary/30 animate-pulse">
                      <Play className="w-8 h-8 fill-primary" />
                    </div>
                    <h4 className="text-base font-extrabold text-white">Select a Video Lecture to Stream</h4>
                    <p className="text-xs text-slate-400 max-w-sm mt-1">Access the chapter play lists on the right side panel. Recorded and hybrid live streams covering Class 8-12 Science & Commerce.</p>
                  </div>
                )}

              </div>
            </div>

            {/* Playlist Sidebar right */}
            <div className="lg:col-span-4 space-y-3 max-h-[460px] overflow-y-auto">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">Active Chapter Playlists</span>
              
              {videoLecturesData.map((lecture) => (
                <div
                  key={lecture.id}
                  onClick={() => setPlayingVideoId(lecture.youtubeId)}
                  className={`p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                    playingVideoId === lecture.youtubeId
                      ? "bg-primary/5 border-primary"
                      : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold uppercase font-mono bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                      {lecture.type}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">{lecture.duration}</span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-800 dark:text-white mt-1.5 leading-snug">
                    {lecture.title}
                  </h5>
                  <span className="text-[10px] text-slate-500 font-medium block mt-1">{lecture.instructor} — {lecture.className}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ======================================= */}
      {/* 5. DAILY MINI QUIZ SECTION              */}
      {/* ======================================= */}
      {activeTab === "quiz" && (
        <div className="space-y-6">
          {!selectedQuizTopicId ? (
            // Topic Selection Screen
            <div className="space-y-6 animate-revealUp">
              <div className="text-center max-w-2xl mx-auto space-y-2 py-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3 border border-amber-500/20 shadow-xs">
                  <Brain className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Select a Topic to Challenge Yourself</h3>
                <p className="text-xs text-slate-500">
                  Perfect your knowledge with our daily 5-question immediate feedback quizzes. Complete to earn performance badges and identify key formula improvements!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-amber-500/40 dark:hover:border-amber-400/40 transition-all duration-300 shadow-xs group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{topic.icon}</span>
                          <div>
                            <span className="text-[10px] font-bold font-mono text-slate-400 block uppercase tracking-wider">{topic.subject}</span>
                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                              {topic.title}
                            </h4>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider font-mono uppercase ${
                          topic.difficulty === "Easy" 
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : topic.difficulty === "Medium"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400"
                        }`}>
                          {topic.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">{topic.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">5 High-Yield Questions</span>
                      <button
                        onClick={() => {
                          setSelectedQuizTopicId(topic.id);
                          setCurrentQuestionIdx(0);
                          setSelectedOptionIdx(null);
                          setQuizScore(0);
                          setQuizIsFinished(false);
                          setShowExplanation(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-amber-500 dark:hover:bg-amber-400 dark:hover:text-slate-950 hover:text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
                      >
                        Start Quick Quiz
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Active Quiz Screen
            (() => {
              const currentTopic = quizTopics.find(t => t.id === selectedQuizTopicId)!;
              const currentQuestion = currentTopic.questions[currentQuestionIdx];

              return (
                <div className="max-w-2xl mx-auto animate-revealUp">
                  <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    
                    {/* Top Progress bar and topic title */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-850 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{currentTopic.icon}</span>
                        <div>
                          <span className="text-[9px] font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block">{currentTopic.subject}</span>
                          <h4 className="text-xs font-extrabold text-slate-800 dark:text-white leading-none">{currentTopic.title}</h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                          className="text-xs font-bold text-slate-500 hover:text-amber-500 transition-colors flex items-center gap-1.5 cursor-pointer"
                          title={isSoundEnabled ? "Mute quiz sound effects" : "Unmute quiz sound effects"}
                        >
                          {isSoundEnabled ? (
                            <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                          ) : (
                            <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          <span className="sr-only sm:not-sr-only text-[10px] tracking-wide uppercase font-mono">
                            {isSoundEnabled ? "Sound On" : "Muted"}
                          </span>
                        </button>
                        <span className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:inline" />
                        <button
                          onClick={() => setSelectedQuizTopicId(null)}
                          className="text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          Exit Quiz
                        </button>
                      </div>
                    </div>

                    {!quizIsFinished ? (
                      // Live Question
                      <div className="space-y-6">
                        {/* Progress Meter */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold">
                            <span>QUESTION {currentQuestionIdx + 1} OF 5</span>
                            <span>Score: {quizScore}/5</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${((currentQuestionIdx + 1) / 5) * 100}%` }}
                              transition={{ duration: 0.3 }}
                              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                            />
                          </div>
                        </div>

                        {/* Question Text */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850">
                          <h5 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider mb-1">Challenge Concept</h5>
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-relaxed">
                            {currentQuestion.question}
                          </h4>
                        </div>

                        {/* Options List */}
                        <div className="grid grid-cols-1 gap-2.5">
                          {currentQuestion.options.map((option, oIdx) => {
                            const isSelected = selectedOptionIdx === oIdx;
                            const isCorrect = currentQuestion.correctIndex === oIdx;
                            const hasAnswered = selectedOptionIdx !== null;

                            let btnStyle = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850/50";
                            
                            if (hasAnswered) {
                              if (isCorrect) {
                                // Correct option is highlighted green
                                btnStyle = "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-800 dark:text-emerald-400 font-bold";
                              } else if (isSelected) {
                                // Selected incorrect option is highlighted red
                                btnStyle = "bg-rose-50 dark:bg-rose-950/20 border-rose-500 text-rose-800 dark:text-rose-400 font-bold";
                              } else {
                                // Other unselected options are slightly dimmed
                                btnStyle = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={hasAnswered}
                                onClick={() => {
                                  setSelectedOptionIdx(oIdx);
                                  setShowExplanation(true);
                                  if (oIdx === currentQuestion.correctIndex) {
                                    setQuizScore(prev => prev + 1);
                                  }
                                }}
                                className={`w-full p-4 rounded-xl text-left text-xs font-semibold border flex items-center justify-between transition-all duration-200 cursor-pointer ${btnStyle}`}
                              >
                                <span>{option}</span>
                                {hasAnswered && isCorrect && (
                                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shrink-0">
                                    ✓
                                  </span>
                                )}
                                {hasAnswered && isSelected && !isCorrect && (
                                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] shrink-0">
                                    ✕
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Interactive Feedback & Concept Explanation Box */}
                        <AnimatePresence>
                          {showExplanation && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className={`p-4 rounded-xl border ${
                                selectedOptionIdx === currentQuestion.correctIndex
                                  ? "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-500/20 text-slate-800 dark:text-slate-200"
                                  : "bg-rose-50/50 dark:bg-rose-950/10 border-rose-500/20 text-slate-800 dark:text-slate-200"
                              } space-y-2`}>
                                <div className="flex items-center gap-1.5 font-bold text-xs">
                                  {selectedOptionIdx === currentQuestion.correctIndex ? (
                                    <>
                                      <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
                                      <span className="text-emerald-700 dark:text-emerald-400">Excellent! Correct Answer</span>
                                    </>
                                  ) : (
                                    <>
                                      <HelpCircle className="w-4.5 h-4.5 text-rose-500" />
                                      <span className="text-rose-700 dark:text-rose-400">Incorrect. Let's learn the concept!</span>
                                    </>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                                  <span className="font-bold block text-slate-700 dark:text-slate-100 mb-0.5">Conceptual Insight:</span>
                                  {currentQuestion.explanation}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Actions Row */}
                        {showExplanation && (
                          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button
                              onClick={() => {
                                if (currentQuestionIdx < 4) {
                                  setCurrentQuestionIdx(prev => prev + 1);
                                  setSelectedOptionIdx(null);
                                  setShowExplanation(false);
                                } else {
                                  handleFinishQuiz();
                                }
                              }}
                              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10 active:scale-98 transition-all"
                            >
                              {currentQuestionIdx < 4 ? "Next Question" : "See Final Score Card"}
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Final Results Summary Card
                      <div className="text-center space-y-6 py-4 animate-revealUp">
                        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="56"
                              cy="56"
                              r="48"
                              className="stroke-slate-100 dark:stroke-slate-800 fill-none"
                              strokeWidth="8"
                            />
                            <motion.circle
                              cx="56"
                              cy="56"
                              r="48"
                              className="stroke-amber-500 fill-none"
                              strokeWidth="8"
                              strokeDasharray={2 * Math.PI * 48}
                              initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                              animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - quizScore / 5) }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-extrabold text-slate-800 dark:text-white leading-none">{Math.round((quizScore / 5) * 100)}%</span>
                            <span className="text-[10px] text-slate-400 font-bold font-mono tracking-wider mt-1">{quizScore}/5 CORRECT</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                            {quizScore === 5 ? (
                              <span className="text-emerald-500 flex items-center justify-center gap-1.5">
                                <Trophy className="w-5 h-5 text-amber-500 animate-bounce" /> Complete Master!
                              </span>
                            ) : quizScore >= 4 ? (
                              <span className="text-amber-500 flex items-center justify-center gap-1.5">
                                <Award className="w-5 h-5 text-amber-500" /> Outstanding Elite!
                              </span>
                            ) : quizScore >= 3 ? (
                              <span className="text-blue-500">Determined Learner!</span>
                            ) : (
                              <span className="text-slate-500">Keep Practicing!</span>
                            )}
                          </h4>
                          <p className="text-xs text-slate-500 max-w-sm mx-auto">
                            {quizScore === 5 
                              ? "Flawless score! Your conceptual foundation in this chapter is exceptionally strong. Keep up this momentum!"
                              : quizScore >= 4
                              ? "Superb effort! You have a firm grasp of the core variables and formula mechanics. Review the 1 missed concept to master."
                              : quizScore >= 3
                              ? "Good start. You scored above average, but there are vital formula derivations worth checking in our syllabus materials."
                              : "Every mistake is a step forward. Access our chapter notes and watch our recorded physics/chemistry streams to clarify these doubts."
                            }
                          </p>
                        </div>

                        {/* Performance Badging */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 rounded-full text-[10px] font-bold font-mono text-amber-800 dark:text-amber-300">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          BADGE: {
                            quizScore === 5 ? "GRAND MASTER EXAMINEE" 
                            : quizScore >= 4 ? "EXPERT ACADEMIC BOARD"
                            : quizScore >= 3 ? "CORE CONSTRUCTOR"
                            : "DETERMINED SCHOLAR"
                          }
                        </div>

                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center gap-3">
                          <button
                            onClick={() => {
                              setCurrentQuestionIdx(0);
                              setSelectedOptionIdx(null);
                              setQuizScore(0);
                              setQuizIsFinished(false);
                              setShowExplanation(false);
                            }}
                            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-lg text-xs font-bold hover:bg-slate-850 dark:hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-98"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Retry Topic
                          </button>
                          <button
                            onClick={() => setSelectedQuizTopicId(null)}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                          >
                            Explore Other Topics
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}

    </div>
  );
}
