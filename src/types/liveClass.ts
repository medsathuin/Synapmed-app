export interface LivePoll {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  timeSecondsLeft: number;
  totalVotes: number;
  votesDistribution: number[]; // e.g. [62, 14, 18, 6] percentages
  userVotedOption?: number;
  explanation: string;
}

export interface LiveChatMessage {
  id: string;
  sender: string;
  role: 'student' | 'faculty' | 'moderator';
  text: string;
  timestamp: string;
  isPinned?: boolean;
  isDoubt?: boolean;
}

export interface LiveDoubt {
  id: string;
  studentName: string;
  studentAvatar?: string;
  question: string;
  timestamp: string;
  isHandRaised: boolean;
  status: 'pending' | 'answering_live' | 'resolved';
}

export interface LiveClassSession {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  faculty: string;
  facultyTitle: string;
  facultyAvatar: string;
  timing: string;
  dateStr: string;
  status: 'live' | 'upcoming' | 'recorded';
  viewerCount: number;
  thumbnail: string;
  streamPoster: string;
  durationMinutes: number;
  batchName: string;
  recentGuidelineTag?: string;
  // Study materials & DPP
  classNotesPdfUrl: string;
  classNotesPages: number;
  lectureSlidesPdfUrl: string;
  modulePdfUrl: string;
  modulePdfTitle: string;
  dppId: string;
  dppTitle: string;
  dppQuestionCount: number;
  dppPdfUrl: string;
  dppVideoSolutionDurationMin: number;
  // Offline download status
  isDownloaded?: boolean;
  downloadQuality?: '360p' | '720p' | '1080p';
  downloadSizeMb?: number;
  // Attendance & Reminders
  isAttended?: boolean;
  attendanceMinutes?: number;
  reminderSet?: boolean;
  // Interactive poll
  activePoll?: LivePoll;
}

export interface DoubtEngineTicket {
  id: string;
  subject: string;
  topic: string;
  questionText: string;
  imageUrl?: string;
  status: 'answered' | 'processing';
  aiAnswer: string;
  facultyVideoSolutionUrl?: string;
  facultyName: string;
  createdAt: string;
  responseType: 'text_and_video' | 'instant_ai';
}

export interface UploadedUserNote {
  id: string;
  title: string;
  subject: string;
  pageCount: number;
  fileSizeMb: number;
  uploadedAt: string;
  tags: string[];
}

export interface BatchInfo {
  id: string;
  name: string;
  targetExam: string;
  facultyLead: string;
  enrolledStudentsCount: number;
  totalClasses: number;
  completedClasses: number;
  attendancePercentage: number;
  telegramLink: string;
}
