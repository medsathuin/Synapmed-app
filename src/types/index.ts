export type TargetExam = 'NEET-PG' | 'INI-CET' | 'FMGE';

export interface SubjectInfo {
  id: string;
  name: string;
  shortName: string;
  category: 'Pre-Clinical' | 'Para-Clinical' | 'Clinical';
  color: string;
  icon: string;
  totalHours: number;
  totalMCQs: number;
  highYieldWeightage: number; // Percentage in NEET-PG/INICET
  chapters: string[];
}

export type VideoType = 'concept' | 'revision' | 'rapid_revision' | 'clinical_case';

export interface VideoLecture {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  topic: string;
  durationMinutes: number;
  type: VideoType;
  faculty: string;
  thumbnail: string;
  videoUrl?: string;
  has3DModel?: boolean;
  modelType?: 'circle_of_willis' | 'cardiac_anatomy' | 'brachial_plexus' | 'nephron' | 'cranial_nerves';
  clinicalScenario?: string;
  recentGuidelineUpdate?: string; // e.g. "AHA 2025 Heart Failure Update" or "Gold 2026 COPD"
  highYieldPoints: string[];
  chaptersList: { title: string; timeSec: number }[];
  isDownloaded?: boolean;
}

export interface MCQOption {
  id: string;
  text: string;
  explanation?: string;
}

export interface MCQ {
  id: string;
  subject: string;
  chapter: string;
  topic: string;
  stem: string;
  imageUrl?: string;
  imageCaption?: string;
  options: MCQOption[];
  correctOptionId: string;
  detailedExplanation: string;
  highYieldSummary: string;
  isHighYield: boolean;
  isClinicalVignette: boolean;
  isImageBased: boolean;
  examSource?: 'NEET-PG' | 'INI-CET' | 'FMGE';
  examYear?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  peerAccuracy: number; // e.g. 64% answered correctly
  guidelineReference?: string;
  pearlId?: string;
  schemaId?: string;
}

export interface Pearl {
  id: string;
  pearlNumber: number;
  subject: string;
  topic: string;
  title: string;
  keyPoints: string[];
  mnemonic?: string;
  clinicalSignificance: string;
  buzzwords: string[];
  isBookmarked?: boolean;
}

export interface Treasure {
  id: string;
  title: string;
  subject: string;
  topic: string;
  imageUrl: string;
  imageType: 'Radiology' | 'Histopathology' | 'Clinical Sign' | 'Gross Pathology' | 'ECG';
  buzzword: string;
  description: string;
  classicAssociations: string[];
  examPoints: string[];
}

export interface SchemaDiagram {
  id: string;
  title: string;
  subject: string;
  category: 'Diagnostic Flowchart' | 'Pathophysiology Map' | 'Treatment Protocol' | 'Classification Matrix';
  description: string;
  steps: {
    stepNumber: number;
    title: string;
    condition?: string;
    actionOrFinding: string;
    highYieldPearl?: string;
  }[];
  summaryTakeaway: string;
}

export type TestCategory = 'Grand Test' | 'Subject Test' | 'Mini Mock' | 'Daily Quiz' | 'Previous Year' | 'Custom Module';

export interface TestSeriesItem {
  id: string;
  title: string;
  category: TestCategory;
  subject?: string;
  questionCount: number;
  durationMinutes: number;
  totalMarks: number;
  examFormat: 'NEET-PG' | 'INI-CET' | 'FMGE';
  participantsCount: number; // Pan-India mock
  avgScore: number;
  topScore: number;
  status: 'Live' | 'Available' | 'Completed';
  questions: MCQ[];
}

export interface TestAttemptResult {
  attemptId: string;
  testId: string;
  testTitle: string;
  date: string;
  score: number;
  maxScore: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracy: number;
  percentile: number;
  allIndiaRank: number;
  stateRank: number;
  totalParticipants: number;
  totalTimeTakenSec: number;
  avgTimePerQSec: number;
  subjectWiseBreakdown: {
    subject: string;
    total: number;
    correct: number;
    incorrect: number;
    accuracy: number;
  }[];
  timeManagementBreakdown: {
    quadrant: 'Quick & Correct' | 'Patient & Correct' | 'Hurried & Wrong' | 'Overthinking & Wrong';
    count: number;
  }[];
  weakAreas: string[];
  userAnswers: { [questionId: string]: string }; // questionId -> optionId
}

export interface MagicModuleItem {
  questionId: string;
  subject: string;
  topic: string;
  stem: string;
  timesWrong: number;
  correctStreak: number;
  isMastered: boolean;
  box: 1 | 2 | 3 | 4 | 5; // Spaced repetition Leitner box
  nextReviewDate: string;
  addedAt: string;
  reasonForMistake?: 'Concept Gap' | 'Silly Mistake' | 'Misread Question' | 'Time Pressure';
}

export interface UserNote {
  id: string;
  targetType: 'question' | 'video';
  targetId: string;
  targetTitle: string;
  subject: string;
  content: string;
  videoTimestampSec?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserBookmark {
  id: string;
  itemType: 'question' | 'pearl' | 'treasure' | 'video';
  itemId: string;
  title: string;
  subject: string;
  tag?: string;
  savedAt: string;
}

export interface QuestionComment {
  id: string;
  questionId: string;
  authorName: string;
  authorRole: 'Student' | 'Resident Doctor' | 'AI Medical Mentor' | 'Faculty';
  authorAvatar?: string;
  text: string;
  upvotes: number;
  createdAt: string;
  isAiResponse?: boolean;
}

export interface StudyPlanDay {
  dayNumber: number;
  date: string;
  subjects: {
    subject: string;
    targetHours: number;
    recommendedVideos: number;
    recommendedMCQs: number;
    isCompleted: boolean;
  }[];
}
