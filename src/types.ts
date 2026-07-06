export interface Course {
  id: string;
  className: string;
  subjects: string[];
  duration: string;
  fees: string;
  faculty: string[];
  description: string;
  highlights: string[];
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  classCategory: string;
  pdfUrl: string;
  views: number;
  downloads: number;
  uploadedAt: string;
  isLatest: boolean;
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: "Assignment" | "Practice Sheet" | "Sample Paper" | "Question Bank" | "Previous Year Paper" | "Important Questions";
  subject: string;
  className: string;
  fileSize: string;
}

export interface OnlineTest {
  id: string;
  title: string;
  type: "Mock Test" | "Chapter Test" | "Weekly Test" | "Full Syllabus Test";
  subject: string;
  className: string;
  durationMinutes: number;
  totalQuestions: number;
  marks: number;
}

export interface VideoLecture {
  id: string;
  title: string;
  className: string;
  subject: string;
  chapter: string;
  youtubeId: string; // fallback embedded video URL placeholder
  duration: string;
  instructor: string;
  type: "Recorded" | "Live";
}

export interface FacultyMember {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  specialization: string;
  photo: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface Topper {
  id: string;
  name: string;
  score: string;
  rank: string;
  exam: string;
  class: string;
  successStory: string;
  parentReview?: string;
  photo: string;
  biography?: string;
  prepStrategy?: string[];
  dailyRoutine?: string;
  studyHours?: string;
  favoriteSubject?: string;
  mentorMessage?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Campus" | "Events" | "Functions" | "Seminars" | "Award Ceremony";
  imageUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: "Announcement" | "Exam Update" | "Admission Open" | "Holiday Notice" | "Results";
  content: string;
  publishedAt: string;
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestResult {
  id: string;
  testTitle: string;
  score: number;
  totalMarks: number;
  percentage: number;
  rank: number;
  accuracy: number;
  date: string;
  subject: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  classCategory: string;
  accuracy: string;
}

export interface Booking {
  id: string;
  studentName: string;
  course: string;
  subject: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

export interface StudentTask {
  id: string;
  title: string;
  deadline: string;
  status: "Pending" | "Completed";
  priority: "High" | "Medium" | "Low";
}
