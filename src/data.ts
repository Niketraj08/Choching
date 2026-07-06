import { 
  Course, 
  Note, 
  StudyMaterial, 
  OnlineTest, 
  VideoLecture, 
  FacultyMember, 
  Topper, 
  GalleryItem, 
  NewsItem, 
  FaqItem, 
  LeaderboardUser 
} from "./types";

export const coursesData: Course[] = [
  {
    id: "c8",
    className: "Class 8 Foundation",
    subjects: ["Mathematics", "Science (Phy/Chem/Bio)", "English", "Social Science"],
    duration: "1 Year",
    fees: "₹22,000 / year",
    faculty: ["Dr. S. K. Sen", "Prof. R. Mathur"],
    description: "Strengthening the core conceptual foundations of basic mathematics, scientific reasoning, and analytical thinking, aligned with NTSE & Olympiad prep.",
    highlights: ["Olympiad Training Modules", "Weekly Personal Progress Counseling", "Comprehensive Skill Workbooks", "Interactive Science Lab Sessions"]
  },
  {
    id: "c9",
    className: "Class 9 Foundation",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Social Studies"],
    duration: "1 Year",
    fees: "₹24,000 / year",
    faculty: ["Er. Alok Verma", "Dr. Megha Sen"],
    description: "The gateway to secondary excellence. Advanced curriculum designed to transition students seamlessly into board examinations and future competitive setups.",
    highlights: ["Advanced Mathematics Prep", "Foundation Course for JEE/NEET", "Custom Chapter Notes & Sheets", "Fortnightly Evaluation Tests"]
  },
  {
    id: "c10",
    className: "Class 10 Board Pro",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Social Studies"],
    duration: "1 Year",
    fees: "₹26,000 / year",
    faculty: ["Er. Alok Verma", "Prof. R. Mathur", "Dr. Megha Sen"],
    description: "Targeting Board Excellence. Rigorous assessment schedules, board-simulated paper evaluation, stress management, and 100% conceptual clarity.",
    highlights: ["Board Mock Exams Series", "Previous 10 Years Solved Papers", "Personal Student Mentorship Panels", "Scholarship Opportunities"]
  },
  {
    id: "c11s",
    className: "Class 11 Science Elite",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English Core"],
    duration: "1 Year (Board + JEE/NEET Prep)",
    fees: "₹28,000 / year",
    faculty: ["Er. Alok Verma (IIT Kanpur)", "Dr. S. K. Sen", "Prof. R. Mathur"],
    description: "Highly rigorous specialized course covering standard school board topics alongside integrated concepts for IIT-JEE & NEET competitive exams.",
    highlights: ["Integrated Board + JEE/NEET Modules", "Daily Practice Sheets (DPP)", "Custom Formula Cheat sheets", "Individual Doubt Clearance Desks"]
  },
  {
    id: "c11c",
    className: "Class 11 Commerce Elite",
    subjects: ["Accountancy", "Business Studies", "Economics", "Applied Mathematics", "English Core"],
    duration: "1 Year",
    fees: "₹25,000 / year",
    faculty: ["CA Rajeev Mehta", "Dr. Shalini Vyas"],
    description: "Developing robust professional skills. Strong emphasis on financial modeling, business structures, accounting concepts, and economic trends.",
    highlights: ["Case-Study Oriented Classes", "Interactive Financial Literacy Seminars", "Expert CA-crafted assignments", "Career Guidance Masterclasses"]
  },
  {
    id: "c12s",
    className: "Class 12 Science Premium",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English Core"],
    duration: "1 Year (Board + JEE/NEET Final Revision)",
    fees: "₹29,000 / year",
    faculty: ["Er. Alok Verma (IIT Kanpur)", "Dr. S. K. Sen", "Prof. R. Mathur"],
    description: "The pinnacle of preparation. Full Class 12 board preparation coupled with target-oriented revisions, mock testing, and strategy formulation for JEE/NEET.",
    highlights: ["Full Syllabus Revisions", "15+ All-India Mock Tests", "Micro-topic analysis reports", "One-on-one strategy planning with Toppers"]
  },
  {
    id: "c12c",
    className: "Class 12 Commerce Premium",
    subjects: ["Accountancy", "Business Studies", "Economics", "Applied Mathematics", "English Core"],
    duration: "1 Year",
    fees: "₹27,000 / year",
    faculty: ["CA Rajeev Mehta", "Dr. Shalini Vyas"],
    description: "Mastering professional principles. Preparation for high-score board outcomes and fundamental training for CA Foundation and CUET exams.",
    highlights: ["CUET & CA Foundation Bridge Modules", "Full Board Simulator Practice", "Dynamic Economics Project Support", "Corporate Guest Lectures"]
  }
];

export const notesData: Note[] = [
  {
    id: "n1",
    title: "Electrostatics: Detailed Formulas and Concepts",
    subject: "Physics",
    chapter: "Chapter 1: Electric Charges and Fields",
    classCategory: "Class 12 Science",
    pdfUrl: "#",
    views: 1240,
    downloads: 948,
    uploadedAt: "2026-06-15",
    isLatest: true
  },
  {
    id: "n2",
    title: "Chemical Kinetics & Reaction Mechanisms",
    subject: "Chemistry",
    chapter: "Chapter 4: Chemical Kinetics",
    classCategory: "Class 12 Science",
    pdfUrl: "#",
    views: 840,
    downloads: 612,
    uploadedAt: "2026-06-20",
    isLatest: true
  },
  {
    id: "n3",
    title: "Linear Equations in Two Variables: Solved Proofs",
    subject: "Mathematics",
    chapter: "Chapter 3: Pair of Linear Equations",
    classCategory: "Class 10",
    pdfUrl: "#",
    views: 1980,
    downloads: 1420,
    uploadedAt: "2026-05-10",
    isLatest: false
  },
  {
    id: "n4",
    title: "Financial Statements of a Joint Stock Company",
    subject: "Accountancy",
    chapter: "Chapter 3: Company Financials",
    classCategory: "Class 12 Commerce",
    pdfUrl: "#",
    views: 720,
    downloads: 512,
    uploadedAt: "2026-06-25",
    isLatest: true
  },
  {
    id: "n5",
    title: "National Income & Related Aggregates",
    subject: "Economics",
    chapter: "Chapter 1: Macroeconomics Intro",
    classCategory: "Class 12 Commerce",
    pdfUrl: "#",
    views: 1120,
    downloads: 870,
    uploadedAt: "2026-05-28",
    isLatest: false
  },
  {
    id: "n6",
    title: "Cell Division & Genetics Foundations",
    subject: "Biology",
    chapter: "Chapter 5: Principles of Inheritance",
    classCategory: "Class 11 Science",
    pdfUrl: "#",
    views: 640,
    downloads: 410,
    uploadedAt: "2026-06-12",
    isLatest: false
  }
];

export const studyMaterialsData: StudyMaterial[] = [
  {
    id: "sm1",
    title: "Integration Micro-Topics Exercise",
    type: "Assignment",
    subject: "Mathematics",
    className: "Class 12 Science",
    fileSize: "2.4 MB"
  },
  {
    id: "sm2",
    title: "Optics Concepts & Lens Formula Booster",
    type: "Practice Sheet",
    subject: "Physics",
    className: "Class 12 Science",
    fileSize: "1.8 MB"
  },
  {
    id: "sm3",
    title: "CBSE Official Sample Paper Mock Draft",
    type: "Sample Paper",
    subject: "Science",
    className: "Class 10",
    fileSize: "3.1 MB"
  },
  {
    id: "sm4",
    title: "Partnership Accounting Master Question Bank",
    type: "Question Bank",
    subject: "Accountancy",
    className: "Class 12 Commerce",
    fileSize: "4.2 MB"
  },
  {
    id: "sm5",
    title: "All India Board Papers (2018-2025)",
    type: "Previous Year Paper",
    subject: "Physics",
    className: "Class 12 Science",
    fileSize: "12.5 MB"
  },
  {
    id: "sm6",
    title: "Top 50 Most Repeated Board Economics Questions",
    type: "Important Questions",
    subject: "Economics",
    className: "Class 12 Commerce",
    fileSize: "1.5 MB"
  }
];

export const onlineTestsData: OnlineTest[] = [
  {
    id: "t1",
    title: "Full Syllabus JEE Mains Practice Exam 1",
    type: "Mock Test",
    subject: "PCM (Phys/Chem/Math)",
    className: "Class 12 Science",
    durationMinutes: 180,
    totalQuestions: 75,
    marks: 300
  },
  {
    id: "t2",
    title: "Electrostatics & Capacitance Chapter Test",
    type: "Chapter Test",
    subject: "Physics",
    className: "Class 12 Science",
    durationMinutes: 45,
    totalQuestions: 25,
    marks: 100
  },
  {
    id: "t3",
    title: "Class 10 Board Pattern Weekly Exam",
    type: "Weekly Test",
    subject: "Mathematics",
    className: "Class 10",
    durationMinutes: 90,
    totalQuestions: 40,
    marks: 120
  },
  {
    id: "t4",
    title: "Macroeconomics Semester Term Test",
    type: "Full Syllabus Test",
    subject: "Economics",
    className: "Class 12 Commerce",
    durationMinutes: 120,
    totalQuestions: 50,
    marks: 100
  }
];

export const videoLecturesData: VideoLecture[] = [
  {
    id: "v1",
    title: "Calculus Fundamentals: Limits, Derivatives & Application",
    className: "Class 12 Science",
    subject: "Mathematics",
    chapter: "Chapter 5: Continuity & Differentiability",
    youtubeId: "W9eZ0WbB52w", // Example standard helpful educational video code placeholder
    duration: "52 mins",
    instructor: "Prof. R. Mathur",
    type: "Recorded"
  },
  {
    id: "v2",
    title: "Electromagnetic Induction: Faraday's and Lenz's Law",
    className: "Class 12 Science",
    subject: "Physics",
    chapter: "Chapter 6: Electromagnetic Induction",
    youtubeId: "v_D_u8nL3I4",
    duration: "45 mins",
    instructor: "Er. Alok Verma",
    type: "Live"
  },
  {
    id: "v3",
    title: "Debit, Credit & Double Entry Principles for Beginners",
    className: "Class 11 Commerce",
    subject: "Accountancy",
    chapter: "Chapter 2: Ledger Posting",
    youtubeId: "1pMAn6g7R-k",
    duration: "38 mins",
    instructor: "CA Rajeev Mehta",
    type: "Recorded"
  },
  {
    id: "v4",
    title: "Class 10 Chemical Reactions & Balanced Equations Practice",
    className: "Class 10",
    subject: "Chemistry",
    chapter: "Chapter 1: Chemical Reactions",
    youtubeId: "g6f_p77vEGA",
    duration: "1 hr 15 mins",
    instructor: "Dr. Megha Sen",
    type: "Live"
  }
];

export const facultyData: FacultyMember[] = [
  {
    id: "f1",
    name: "Er. Alok Verma",
    qualification: "B.Tech, IIT Kanpur (JEE Top 500 Ranker)",
    experience: "12+ Years",
    specialization: "Physics & Advanced Mechanics for JEE/NEET",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", // Placeholder but beautiful portrait
    socials: {
      linkedin: "https://linkedin.com/in/alok-verma-physics",
      email: "alok.verma@skcoaching.edu"
    }
  },
  {
    id: "f2",
    name: "Dr. S. K. Sen",
    qualification: "Ph.D. in Organic Chemistry, IISc Bangalore",
    experience: "15+ Years",
    specialization: "Chemistry (Organic & Physical) for Boards & Competitive Exams",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    socials: {
      linkedin: "https://linkedin.com/in/sk-sen-chemistry",
      email: "sk.sen@skcoaching.edu"
    }
  },
  {
    id: "f3",
    name: "Prof. R. Mathur",
    qualification: "M.Sc. in Applied Mathematics, Delhi University",
    experience: "10+ Years",
    specialization: "Mathematics & Analytical Thinking",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    socials: {
      linkedin: "https://linkedin.com/in/r-mathur-maths",
      email: "r.mathur@skcoaching.edu"
    }
  },
  {
    id: "f4",
    name: "CA Rajeev Mehta",
    qualification: "FCA, All India Rank 18 (Chartered Accountant)",
    experience: "9+ Years",
    specialization: "Accountancy, Taxation & Corporate Auditing",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    socials: {
      linkedin: "https://linkedin.com/in/rajeev-mehta-ca",
      email: "rajeev.mehta@skcoaching.edu"
    }
  },
  {
    id: "f5",
    name: "Dr. Shalini Vyas",
    qualification: "Ph.D. in Economics, JNU Delhi",
    experience: "8+ Years",
    specialization: "Macroeconomics, Indian Economy & CUET Strategy",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    socials: {
      linkedin: "https://linkedin.com/in/shalini-vyas-economics",
      email: "shalini.vyas@skcoaching.edu"
    }
  }
];

export const toppersData: Topper[] = [
  {
    id: "t1",
    name: "Tushar Agrawal",
    score: "99.8% (CBSE Class 12)",
    rank: "AIR 45 (JEE Advanced)",
    exam: "CBSE & JEE Advanced 2025",
    class: "Class 12 Science",
    successStory: "SK Coaching turned complex formulas into an engaging process. The personal strategy sheet with Alok sir helped me focus exactly on weak areas.",
    parentReview: "SK Coaching is not just about classes; they supported my son mentally and spiritually. He was calm throughout his board exams.",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    biography: "Tushar Agrawal is an exceptionally focused student who joined SK Coaching in Class 11. Hailing from a modest background, Tushar demonstrated a natural affinity for Physics and Calculus. Over the course of two years, he maintained a strict study discipline, balancing school boards and competitive preparation under the guided direction of Er. Alok Verma.",
    prepStrategy: [
      "Rigorous Practice: Solved at least 30 advanced Physics and Math problems daily.",
      "Mock Simulations: Took full-length 3-hour tests every Sunday morning to build mental endurance.",
      "Concept Mapping: Made custom formula and theorem posters for immediate visual reinforcement.",
      "Doubt Log: Maintained a dedicated logbook for incorrect questions to revise before exams."
    ],
    dailyRoutine: "Woke up at 5:30 AM. Studied Physics for 2 hours while fresh. Attended school, followed by SK Coaching interactive sessions from 4:00 PM to 8:00 PM. Dedicated nights to chemistry memorization and active problem-solving before wrapping up by 10:30 PM.",
    studyHours: "6-8 Hours of focused self-study daily (excluding lectures)",
    favoriteSubject: "Physics (Advanced Mechanics & Electromagnetism)",
    mentorMessage: "Alok Sir's constant phrase 'Conceptual clarity is your strongest armor' kept me grounded even when solving the most daunting multi-concept problems."
  },
  {
    id: "t2",
    name: "Priya Sharma",
    score: "98.4% (Class 12 Commerce)",
    rank: "AIR 12 (CUET General/Maths)",
    exam: "Class 12 Boards & CUET",
    class: "Class 12 Commerce",
    successStory: "The detailed partnership ledger sessions with Rajeev Sir cleared all questions in Class 12 Accountancy, making Boards simple.",
    parentReview: "Stellar performance! The faculty spent continuous late nights solving doubt boards. Highly recommend SK Coaching for Commerce.",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    biography: "Priya Sharma is a brilliant Commerce topper known for her analytical agility and structured approach. Priya joined SK Commerce Academy with a vision to pursue high-finance. Her outstanding performance in CUET and Accountancy boards is a testament to her precise methodology and constant doubt-solving with CA Rajeev Mehta.",
    prepStrategy: [
      "Case Study Analysis: Mastered legal and business framework formats using real-world enterprise models.",
      "Accountancy Drills: Repeatedly solved ledger adjustments, balance sheets, and cash flow formulas.",
      "CUET Revision Sheets: Solved daily speed-drills on applied quantitative math and logical reasoning.",
      "Peer Mentorship: Engaged in study groups to explain complex economics theories to peers."
    ],
    dailyRoutine: "Dedicated mornings to reading business studies and macroeconomic journals. Attended CA-led seminars and practice groups. Practiced 3 structural Accountancy questions daily. Followed a strict 7-hour sleep schedule to stay productive.",
    studyHours: "5-7 Hours daily",
    favoriteSubject: "Accountancy (Corporate Financial Statements)",
    mentorMessage: "Rajeev Sir trained us to read ledger books like stories. Once I understood the logic of double-entry, I never had to memorize any entry again!"
  },
  {
    id: "t3",
    name: "Amit Patel",
    score: "97.6% (CBSE Class 10)",
    rank: "Olympiad Level-2 Gold Medal",
    exam: "Class 10 Boards & NTSE",
    class: "Class 10",
    successStory: "Foundation modules at SK Coaching for Class 9 and 10 was the best choice! I completed the NCERT curriculum 4 months in advance.",
    parentReview: "We did not need a second tutor or home coaching because SK Coaching's structured portal takes care of everything.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    biography: "Amit Patel represents the brilliant foundation wing of SK Coaching. Amit enrolled in our Class 9 Integrated Foundation program, excelling in Olympiads and state-level science tests. His journey reflects our focus on building analytical foundations early rather than forcing learning too late.",
    prepStrategy: [
      "Early Completion: Finished Class 10 boards syllabus early to focus entirely on advanced NTSE reasoning.",
      "Mental Aptitude Training: Practiced non-verbal reasoning and pattern analysis 1 hour daily.",
      "Weekly Quizzes: Participated in SK Coaching's live leaderboard drills to benchmark speed.",
      "Active Recitation: Summarized scientific chapters into audio notes to review during transit."
    ],
    dailyRoutine: "Balanced school activities with 3 hours of intensive coaching-directed research. Explored interactive chemistry lab simulations. Solved quantitative brain teasers before bed to relax and stimulate cognitive speed.",
    studyHours: "4-5 Hours daily",
    favoriteSubject: "Mathematics (Geometry & Number Theory)",
    mentorMessage: "Mathur Sir made geometry feel like an interactive puzzle game. It taught me to love the process of solving, which automatically improved my scores."
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: "SK Coaching Modern Interactive Classroom",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g2",
    title: "Annual Merit Felicitation Award Ceremony",
    category: "Award Ceremony",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g3",
    title: "Annual STEM & Robotics Seminar 2025",
    category: "Seminars",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g4",
    title: "Parent-Teacher Comprehensive Interactive Meet",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600"
  }
];

export const newsData: NewsItem[] = [
  {
    id: "n1",
    title: "Class 12 CBSE Board Examination Revisions Announced",
    category: "Exam Update",
    content: "The Ministry of Education has released a revised schedule for the Class 12 board examinations. Our curriculum and mock schedules have been synchronized with the latest timetable.",
    publishedAt: "2026-07-04",
    badge: "Important"
  },
  {
    id: "n2",
    title: "Admissions Open for Crash Revision Batches (Class 10 & 12)",
    category: "Admission Open",
    content: "Limited seats available for the ultra-intensive 3-month board prep program. Includes full syllabus mock series, direct counseling, and comprehensive formulas booklets.",
    publishedAt: "2026-07-02",
    badge: "Open Now"
  },
  {
    id: "n3",
    title: "SK Coaching Merit Scholarship Test on Sunday, July 12",
    category: "Announcement",
    content: "Attempt our All-India online/offline scholarship assessment. Secure up to 50% tuition waiver for the Class 11 and 12 Science/Commerce batches.",
    publishedAt: "2026-07-01"
  },
  {
    id: "n4",
    title: "National Talent Search Examination (NTSE) Mock Schedule",
    category: "Exam Update",
    content: "SK Coaching Foundation students are instructed to download their Chapterwise Practice Sheets for NTSE Stage-1 preparation from the dashboard.",
    publishedAt: "2026-06-28"
  }
];

export const faqsData: FaqItem[] = [
  {
    question: "What streams and classes are offered at SK Coaching?",
    answer: "We offer top-tier specialized training for students from Class 8 to Class 10 (Foundation, NTSE, and Olympiads) and Class 11 & Class 12 specializing in Science (Physics, Chemistry, Mathematics, Biology) and Commerce (Accountancy, Business Studies, Economics, Applied Mathematics)."
  },
  {
    question: "How do I secure a scholarship at SK Coaching?",
    answer: "Students can take the Online Scholarship Entrance Test (OSET) conducted every Sunday. Depending on your percentage and evaluation score, you can secure up to a 50% discount on the comprehensive tuition fees."
  },
  {
    question: "Do you offer offline-classroom learning and hybrid-live packages?",
    answer: "Yes, we support both offline physical classes at our state-of-the-art campus, as well as a complete digital hybrid learning portal where students can stream premium live classes, download PDF sheets, and take online mock tests."
  },
  {
    question: "How are student progress reports managed?",
    answer: "All student progress data, including daily attendance, weekly test performance, and homework submissions, is securely logged and integrated directly into the Student Dashboard. Automated reports can also be downloaded and printed."
  },
  {
    question: "What is the teacher-to-student ratio at SK Coaching?",
    answer: "We believe in high-density focused support. Our teacher-to-student ratio is strictly maintained at 1:20 for specialized batches, allowing individual doubt-clearing sessions."
  }
];

export const leaderboardUsers: LeaderboardUser[] = [
  { rank: 1, name: "Tushar Agrawal", points: 2950, classCategory: "Class 12 Science", accuracy: "98.4%" },
  { rank: 2, name: "Priya Sharma", points: 2840, classCategory: "Class 12 Commerce", accuracy: "97.1%" },
  { rank: 3, name: "Amit Patel", points: 2710, classCategory: "Class 10", accuracy: "96.5%" },
  { rank: 4, name: "Riya Kapoor", points: 2600, classCategory: "Class 11 Science", accuracy: "95.0%" },
  { rank: 5, name: "Kunal Sen", points: 2540, classCategory: "Class 12 Science", accuracy: "94.2%" },
  { rank: 6, name: "Meera Das", points: 2490, classCategory: "Class 11 Commerce", accuracy: "93.8%" }
];

export const mockTestHistory = [
  { id: "th1", testTitle: "Electrostatics Mini Test", score: 88, totalMarks: 100, percentage: 88, rank: 5, accuracy: 92, date: "2026-06-25", subject: "Physics" },
  { id: "th2", testTitle: "Calculus Limits Practice Test", score: 95, totalMarks: 120, percentage: 79.1, rank: 3, accuracy: 88, date: "2026-06-18", subject: "Mathematics" },
  { id: "th3", testTitle: "Chemical Reactions Fundamentals", score: 45, totalMarks: 50, percentage: 90, rank: 2, accuracy: 95, date: "2026-06-10", subject: "Chemistry" }
];
