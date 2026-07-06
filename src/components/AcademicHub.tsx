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
  HelpCircle
} from "lucide-react";
import { Note, StudyMaterial, OnlineTest, VideoLecture } from "../types";
import { notesData, studyMaterialsData, onlineTestsData, videoLecturesData } from "../data";

interface AcademicHubProps {
  initialTab?: "notes" | "materials" | "tests" | "videos";
}

export default function AcademicHub({ initialTab = "notes" }: AcademicHubProps) {
  const [activeTab, setActiveTab] = useState<"notes" | "materials" | "tests" | "videos">(initialTab);
  
  // Note specific states
  const [noteSearch, setNoteSearch] = useState("");
  const [selectedNoteSubject, setSelectedNoteSubject] = useState("All");

  // Material specific states
  const [selectedMaterialType, setSelectedMaterialType] = useState("All");

  // Video specific states
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Test taking simulator states
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [testScore, setTestScore] = useState<{ correct: number; total: number; score: number } | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});

  const simulatedQuestions = [
    { q: "What is the force between two static charges in vacuum?", options: ["Coulomb Force", "Lorentz Force", "Kepler Force", "Euler Force"], ans: 0 },
    { q: "If dy/dx = cos(x), what is the function y?", options: ["sin(x) + C", "-sin(x) + C", "cos(x) + C", "-cos(x) + C"], ans: 0 },
    { q: "Which of the following is NOT an accounting convention?", options: ["Consistency", "Full Disclosure", "Materiality", "Inflation Adjusting"], ans: 3 },
  ];

  const handleDownloadNote = (title: string) => {
    alert(`📥 Downloading premium chapter notes: "${title}" as PDF...\nPerfect for board exam preparation!`);
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
                    onClick={() => handleDownloadNote(note.title)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
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
                    onClick={() => alert(`Downloading "${mat.title}" workbook (${mat.fileSize}) for exam practice...`)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    <Download className="w-4 h-4" />
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
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">BrightPath Mock Exam Suite Simulator</h4>
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
                    title="BrightPath Lecture Video Player"
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

    </div>
  );
}
