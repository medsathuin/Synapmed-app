import { TestSeriesItem, MCQ } from '../types';
import { MOCK_MCQS } from './mockQBank';

// Generate mock test library
export const MOCK_TESTS: TestSeriesItem[] = [
  {
    id: 'gt-live-pan-india',
    title: 'All-India National Grand Mock Test (Pan-India GT 2026)',
    category: 'Grand Test',
    questionCount: 200,
    durationMinutes: 210, // 3 hours 30 mins
    totalMarks: 800,
    examFormat: 'NEET-PG',
    participantsCount: 124850,
    avgScore: 432,
    topScore: 748,
    status: 'Live',
    questions: MOCK_MCQS
  },
  {
    id: 'gt-130',
    title: 'Grand Test 130: Full Syllabus High-Yield Simulation',
    category: 'Grand Test',
    questionCount: 200,
    durationMinutes: 210,
    totalMarks: 800,
    examFormat: 'NEET-PG',
    participantsCount: 88200,
    avgScore: 418,
    topScore: 732,
    status: 'Available',
    questions: MOCK_MCQS
  },
  {
    id: 'gt-129',
    title: 'Grand Test 129: Image-Based & Clinical Vignette Focus',
    category: 'Grand Test',
    questionCount: 200,
    durationMinutes: 210,
    totalMarks: 800,
    examFormat: 'NEET-PG',
    participantsCount: 94100,
    avgScore: 405,
    topScore: 720,
    status: 'Available',
    questions: MOCK_MCQS
  },
  {
    id: 'gt-128',
    title: 'Grand Test 128: Recent Trends & Controversies',
    category: 'Grand Test',
    questionCount: 200,
    durationMinutes: 210,
    totalMarks: 800,
    examFormat: 'NEET-PG',
    participantsCount: 79500,
    avgScore: 398,
    topScore: 712,
    status: 'Available',
    questions: MOCK_MCQS
  },
  {
    id: 'st-medicine',
    title: 'Subject Test: General Medicine & ECG Intensive',
    category: 'Subject Test',
    subject: 'General Medicine',
    questionCount: 100,
    durationMinutes: 90,
    totalMarks: 400,
    examFormat: 'NEET-PG',
    participantsCount: 42300,
    avgScore: 228,
    topScore: 384,
    status: 'Available',
    questions: MOCK_MCQS.filter(q => q.subject === 'General Medicine' || q.subject === 'Pathology')
  },
  {
    id: 'st-surgery',
    title: 'Subject Test: General Surgery & Trauma (ATLS 11th Ed)',
    category: 'Subject Test',
    subject: 'General Surgery',
    questionCount: 100,
    durationMinutes: 90,
    totalMarks: 400,
    examFormat: 'NEET-PG',
    participantsCount: 38100,
    avgScore: 216,
    topScore: 376,
    status: 'Available',
    questions: MOCK_MCQS.filter(q => q.subject === 'General Surgery')
  },
  {
    id: 'st-anatomy',
    title: 'Subject Test: Anatomy & Neurovascular Pathways',
    category: 'Subject Test',
    subject: 'Anatomy',
    questionCount: 75,
    durationMinutes: 65,
    totalMarks: 300,
    examFormat: 'NEET-PG',
    participantsCount: 31200,
    avgScore: 168,
    topScore: 288,
    status: 'Available',
    questions: MOCK_MCQS.filter(q => q.subject === 'Anatomy')
  },
  {
    id: 'pyq-neet-2024',
    title: 'Previous Year Paper: NEET-PG 2024 Official Recall Paper',
    category: 'Previous Year',
    questionCount: 200,
    durationMinutes: 210,
    totalMarks: 800,
    examFormat: 'NEET-PG',
    participantsCount: 112000,
    avgScore: 442,
    topScore: 760,
    status: 'Available',
    questions: MOCK_MCQS
  },
  {
    id: 'pyq-inicet-2024',
    title: 'Previous Year Paper: INI-CET Nov 2024 AIIMS/JIPMER/PGI',
    category: 'Previous Year',
    questionCount: 200,
    durationMinutes: 180,
    totalMarks: 200,
    examFormat: 'INI-CET',
    participantsCount: 65000,
    avgScore: 114,
    topScore: 186,
    status: 'Available',
    questions: MOCK_MCQS
  },
  {
    id: 'daily-quiz-today',
    title: 'Question of the Day & 10-Minute Daily Booster',
    category: 'Daily Quiz',
    questionCount: 10,
    durationMinutes: 12,
    totalMarks: 40,
    examFormat: 'NEET-PG',
    participantsCount: 54000,
    avgScore: 28,
    topScore: 40,
    status: 'Live',
    questions: MOCK_MCQS.slice(0, 5)
  }
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Dr. Rohan Mehra', state: 'Delhi NCR', score: 748, percentile: 99.99, accuracy: 96.5, timePerQ: '42s', targetExam: 'NEET-PG' },
  { rank: 2, name: 'Dr. Ananya Swaminathan', state: 'Tamil Nadu', score: 742, percentile: 99.98, accuracy: 95.8, timePerQ: '45s', targetExam: 'INI-CET' },
  { rank: 3, name: 'Dr. Karthik Sundaram', state: 'Karnataka', score: 736, percentile: 99.95, accuracy: 94.7, timePerQ: '48s', targetExam: 'NEET-PG' },
  { rank: 4, name: 'Dr. Priya Singhania', state: 'Maharashtra', score: 730, percentile: 99.92, accuracy: 94.2, timePerQ: '51s', targetExam: 'NEET-PG' },
  { rank: 5, name: 'Dr. Abhishek Banerjee', state: 'West Bengal', score: 724, percentile: 99.88, accuracy: 93.5, timePerQ: '44s', targetExam: 'INI-CET' },
  { rank: 6, name: 'Dr. Sneha Reddy', state: 'Telangana', score: 718, percentile: 99.82, accuracy: 93.0, timePerQ: '49s', targetExam: 'NEET-PG' },
  { rank: 7, name: 'Dr. Vikram Malhotra', state: 'Punjab', score: 712, percentile: 99.75, accuracy: 92.4, timePerQ: '53s', targetExam: 'FMGE' },
  { rank: 8, name: 'Dr. Pooja Nair', state: 'Kerala', score: 708, percentile: 99.69, accuracy: 91.8, timePerQ: '47s', targetExam: 'NEET-PG' },
  { rank: 9, name: 'Dr. Tanmay Joshi', state: 'Gujarat', score: 702, percentile: 99.60, accuracy: 91.2, timePerQ: '50s', targetExam: 'INI-CET' },
  { rank: 10, name: 'Dr. Divya Aggarwal', state: 'Uttar Pradesh', score: 696, percentile: 99.52, accuracy: 90.7, timePerQ: '52s', targetExam: 'NEET-PG' }
];
