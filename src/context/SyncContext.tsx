import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, onSnapshot, getDocs, deleteDoc } from 'firebase/firestore';
import { auth, db, signInWithGoogle, logOut, handleFirestoreError, OperationType, testConnection } from '../firebase/config';
import { 
  TargetExam, 
  UserBookmark, 
  UserNote, 
  MagicModuleItem, 
  TestAttemptResult, 
  QuestionComment,
  StudyPlanDay
} from '../types';
import { 
  LiveClassSession, 
  DoubtEngineTicket, 
  UploadedUserNote 
} from '../types/liveClass';
import { 
  MOCK_LIVE_CLASSES, 
  MOCK_DOUBT_ENGINE_TICKETS, 
  MOCK_UPLOADED_NOTES 
} from '../data/mockLiveClasses';

interface SyncContextType {
  currentUser: User | null;
  isCloudSyncActive: boolean;
  syncStatus: 'synced' | 'syncing' | 'offline';
  targetExam: TargetExam;
  setTargetExam: (exam: TargetExam) => void;
  userName: string;
  setUserName: (name: string) => void;
  streakCount: number;
  studyMinutesToday: number;
  totalQuestionsSolved: number;
  
  // In-app Notifications
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  
  // Bookmarks
  bookmarks: UserBookmark[];
  toggleBookmark: (item: Omit<UserBookmark, 'id' | 'savedAt'>) => Promise<void>;
  isBookmarked: (itemId: string) => boolean;

  // Notes
  notes: UserNote[];
  saveNote: (targetType: 'question' | 'video', targetId: string, targetTitle: string, subject: string, content: string, videoTimestampSec?: number) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
  getNoteForTarget: (targetId: string) => UserNote | undefined;

  // Magic Module (Auto-collected mistakes)
  magicModuleItems: MagicModuleItem[];
  recordQuestionAttempt: (questionId: string, subject: string, topic: string, stem: string, isCorrect: boolean, reason?: 'Concept Gap' | 'Silly Mistake' | 'Misread Question' | 'Time Pressure') => Promise<void>;
  clearMasteredMistakes: () => Promise<void>;

  // Test Attempts
  testAttempts: TestAttemptResult[];
  saveTestAttempt: (attempt: TestAttemptResult) => Promise<void>;

  // Offline video downloads
  downloadedVideoIds: string[];
  toggleVideoDownload: (videoId: string) => void;
  isDownloadActive: boolean;

  // Comments / Discussion
  comments: Record<string, QuestionComment[]>;
  postComment: (questionId: string, text: string, role?: 'Student' | 'Resident Doctor' | 'AI Medical Mentor' | 'Faculty') => Promise<void>;
  upvoteComment: (questionId: string, commentId: string) => Promise<void>;

  // Live Classes & Batches
  liveClasses: LiveClassSession[];
  addLiveLecture: (lecture: LiveClassSession) => void;
  endAndPublishLiveLecture: (classId: string) => void;
  toggleLiveClassReminder: (classId: string) => void;
  recordClassAttendance: (classId: string, minutes: number) => void;
  downloadedLiveClasses: Record<string, { quality: '360p' | '720p' | '1080p'; sizeMb: number }>;
  downloadLiveClass: (classId: string, quality: '360p' | '720p' | '1080p') => void;
  deleteLiveClassDownload: (classId: string) => void;
  
  // Uploaded User Notes
  uploadedUserNotes: UploadedUserNote[];
  addUploadedNote: (title: string, subject: string, pageCount: number, fileSizeMb: number) => Promise<void>;
  deleteUploadedNote: (uploadId: string) => Promise<void>;

  // Doubt Engine & Saarthi AI
  doubtTickets: DoubtEngineTicket[];
  submitDoubtTicket: (subject: string, topic: string, questionText: string, imageUrl?: string) => Promise<void>;

  // Active Devices
  activeDevices: string[];
  currentDevice: string;
  switchDevice: (deviceName: string) => void;

  // Auth actions
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  triggerDemoSync: () => void;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'synapse_med_';

export const SyncProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCloudSyncActive, setIsCloudSyncActive] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');

  // In-app non-blocking Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4500);
  };
  
  // State variables with local storage initializers
  const [targetExam, setTargetExamState] = useState<TargetExam>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'targetExam') as TargetExam) || 'NEET-PG';
  });

  const [userName, setUserNameState] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'userName') || 'Dr. Sathu Nayak';
  });

  const [streakCount, setStreakCount] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'streak');
    return saved ? parseInt(saved, 10) : 14;
  });

  const [studyMinutesToday, setStudyMinutesToday] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'studyMinutes');
    return saved ? parseInt(saved, 10) : 185;
  });

  const [totalQuestionsSolved, setTotalQuestionsSolved] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'totalQ');
    return saved ? parseInt(saved, 10) : 480;
  });

  const [bookmarks, setBookmarks] = useState<UserBookmark[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'bookmarks');
    return saved ? JSON.parse(saved) : [
      { id: 'bm-1', itemType: 'question', itemId: 'mcq-001', title: 'Inferior STEMI & Right Ventricular Infarction', subject: 'General Medicine', savedAt: new Date().toISOString() },
      { id: 'bm-2', itemType: 'pearl', itemId: 'pearl-001', title: 'Lateral Medullary vs Lateral Pontine Syndromes', subject: 'Anatomy', savedAt: new Date().toISOString() },
      { id: 'bm-3', itemType: 'treasure', itemId: 'tr-02', title: 'Coffee Bean Sign in Sigmoid Volvulus', subject: 'Radiology', savedAt: new Date().toISOString() }
    ];
  });

  const [notes, setNotes] = useState<UserNote[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'notes');
    return saved ? JSON.parse(saved) : [
      {
        id: 'note-1',
        targetType: 'question',
        targetId: 'mcq-001',
        targetTitle: 'Right Ventricular Infarction Management',
        subject: 'General Medicine',
        content: 'Remember: In RVMI, blood pressure drops drastically if nitrates are given. Always ask for lead V4R! Fluid is the primary inotropic drive.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'note-2',
        targetType: 'video',
        targetId: 'vid-anat-01',
        targetTitle: 'Circle of Willis & Stroke Syndromes',
        subject: 'Anatomy',
        content: 'Posterior communicating artery aneurysm compresses CN 3 -> causes early pupil dilation before external ophthalmoplegia (parasympathetic fibers on periphery of nerve).',
        videoTimestampSec: 1680,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  });

  const [magicModuleItems, setMagicModuleItems] = useState<MagicModuleItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'magicModule');
    return saved ? JSON.parse(saved) : [
      {
        questionId: 'mcq-004',
        subject: 'Anatomy',
        topic: 'Neuroanatomy',
        stem: 'Wallenberg syndrome vs AICA syndrome localization: absent gag reflex and vocal cord paralysis vs facial nerve palsy.',
        timesWrong: 2,
        correctStreak: 1,
        isMastered: false,
        box: 2,
        nextReviewDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        addedAt: new Date().toISOString(),
        reasonForMistake: 'Concept Gap'
      },
      {
        questionId: 'mcq-005',
        subject: 'Pharmacology',
        topic: 'Antimicrobials',
        stem: 'Metallo-beta-lactamase (NDM-1) resistance: Aztreonam resistance mechanism and synergy with Avibactam.',
        timesWrong: 3,
        correctStreak: 0,
        isMastered: false,
        box: 1,
        nextReviewDate: new Date().toISOString().split('T')[0],
        addedAt: new Date().toISOString(),
        reasonForMistake: 'Misread Question'
      }
    ];
  });

  const [testAttempts, setTestAttempts] = useState<TestAttemptResult[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'testAttempts');
    return saved ? JSON.parse(saved) : [
      {
        attemptId: 'att-1',
        testId: 'gt-129',
        testTitle: 'Grand Test 129: Full Syllabus Simulation',
        date: '2026-10-24',
        score: 564,
        maxScore: 800,
        correctCount: 148,
        incorrectCount: 36,
        unattemptedCount: 16,
        accuracy: 80.4,
        percentile: 96.8,
        allIndiaRank: 2840,
        stateRank: 194,
        totalParticipants: 94100,
        totalTimeTakenSec: 9640,
        avgTimePerQSec: 52,
        subjectWiseBreakdown: [
          { subject: 'General Medicine', total: 32, correct: 28, incorrect: 4, accuracy: 87.5 },
          { subject: 'General Surgery', total: 28, correct: 22, incorrect: 6, accuracy: 78.5 },
          { subject: 'Obstetrics & Gynaecology', total: 24, correct: 20, incorrect: 4, accuracy: 83.3 },
          { subject: 'Pathology', total: 20, correct: 14, incorrect: 6, accuracy: 70.0 },
          { subject: 'Pharmacology', total: 20, correct: 13, incorrect: 7, accuracy: 65.0 },
          { subject: 'Anatomy', total: 16, correct: 11, incorrect: 5, accuracy: 68.7 }
        ],
        timeManagementBreakdown: [
          { quadrant: 'Quick & Correct', count: 104 },
          { quadrant: 'Patient & Correct', count: 44 },
          { quadrant: 'Hurried & Wrong', count: 18 },
          { quadrant: 'Overthinking & Wrong', count: 18 }
        ],
        weakAreas: ['Pharmacology (Antimicrobial Resistance)', 'Anatomy (Brainstem Syndromes)', 'Biochemistry (Inborn Errors)'],
        userAnswers: {}
      }
    ];
  });

  const [downloadedVideoIds, setDownloadedVideoIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'downloads');
    return saved ? JSON.parse(saved) : ['vid-anat-01', 'vid-med-01'];
  });

  const [comments, setComments] = useState<Record<string, QuestionComment[]>>({
    'mcq-001': [
      {
        id: 'c-1',
        questionId: 'mcq-001',
        authorName: 'Dr. Priya Singhania',
        authorRole: 'Resident Doctor',
        text: 'Crucial point about V4R: always order right-sided leads in inferior wall MI! I saw a patient in ED crash when sublingual sorbitrate was administered without checking V4R. Preload collapse is terrifying.',
        upvotes: 42,
        createdAt: '2 days ago'
      },
      {
        id: 'c-2',
        questionId: 'mcq-001',
        authorName: 'Synapse AI Medical Mentor',
        authorRole: 'AI Medical Mentor',
        isAiResponse: true,
        text: 'High-Yield Clinical Takeaway: The right ventricle is thin-walled and acts like a compliant bellows. Its output depends almost entirely on end-diastolic venous return (preload). Nitroglycerin causes widespread venodilation -> preload drops -> RV stroke volume zeroes out -> LV receives no blood -> catastrophic hypotension. First line: Rapid normal saline 500 mL boluses!',
        upvotes: 89,
        createdAt: '1 day ago'
      }
    ],
    'mcq-002': [
      {
        id: 'c-3',
        questionId: 'mcq-002',
        authorName: 'Dr. Abhishek Banerjee',
        authorRole: 'Student',
        text: 'The distinction between Sigmoid and Cecal volvulus is tested almost every year: Sigmoid coffee bean points to RUQ and gets sigmoidoscope; Cecal bird of prey points to LUQ and gets emergency laparotomy!',
        upvotes: 35,
        createdAt: '3 days ago'
      }
    ]
  });

  // Live Classes state
  const [liveClasses, setLiveClasses] = useState<LiveClassSession[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'liveClasses');
    return saved ? JSON.parse(saved) : MOCK_LIVE_CLASSES;
  });

  const [downloadedLiveClasses, setDownloadedLiveClasses] = useState<Record<string, { quality: '360p' | '720p' | '1080p'; sizeMb: number }>>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'dlLiveClasses');
    return saved ? JSON.parse(saved) : {
      'rec-path-01': { quality: '1080p', sizeMb: 680 },
      'rec-pharm-01': { quality: '720p', sizeMb: 420 }
    };
  });

  const [uploadedUserNotes, setUploadedUserNotes] = useState<UploadedUserNote[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'upNotes');
    return saved ? JSON.parse(saved) : MOCK_UPLOADED_NOTES;
  });

  const [doubtTickets, setDoubtTickets] = useState<DoubtEngineTicket[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + 'doubtTickets');
    return saved ? JSON.parse(saved) : MOCK_DOUBT_ENGINE_TICKETS;
  });

  const [activeDevices, setActiveDevices] = useState<string[]>([
    'MacBook Pro 16" (Current)',
    'iPad Pro 12.9" App',
    'Pixel 9 Pro Mobile App'
  ]);
  const [currentDevice, setCurrentDevice] = useState<string>('MacBook Pro 16" (Current)');

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'targetExam', targetExam);
  }, [targetExam]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'userName', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'streak', streakCount.toString());
  }, [streakCount]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'studyMinutes', studyMinutesToday.toString());
  }, [studyMinutesToday]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'totalQ', totalQuestionsSolved.toString());
  }, [totalQuestionsSolved]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'magicModule', JSON.stringify(magicModuleItems));
  }, [magicModuleItems]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'testAttempts', JSON.stringify(testAttempts));
  }, [testAttempts]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'downloads', JSON.stringify(downloadedVideoIds));
  }, [downloadedVideoIds]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'liveClasses', JSON.stringify(liveClasses));
  }, [liveClasses]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'dlLiveClasses', JSON.stringify(downloadedLiveClasses));
  }, [downloadedLiveClasses]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'upNotes', JSON.stringify(uploadedUserNotes));
  }, [uploadedUserNotes]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'doubtTickets', JSON.stringify(doubtTickets));
  }, [doubtTickets]);

  // Auth & Cloud Sync listener
  useEffect(() => {
    // Initial connectivity check
    testConnection().then(online => {
      if (online) {
        setSyncStatus('synced');
      } else {
        setSyncStatus('offline');
      }
    });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setIsCloudSyncActive(true);
        setSyncStatus('syncing');
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            if (data.targetExam) setTargetExamState(data.targetExam);
            if (data.name) setUserNameState(data.name);
            if (data.currentStreak) setStreakCount(data.currentStreak);
          } else {
            // First time cloud sync: seed user document
            await setDoc(userDocRef, {
              userId: user.uid,
              name: user.displayName || userName,
              email: user.email || '',
              targetExam: targetExam,
              currentStreak: streakCount,
              bestStreak: streakCount,
              totalQuestionsSolved: totalQuestionsSolved,
              totalMinutesWatched: studyMinutesToday,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
          }
          setSyncStatus('synced');
        } catch (err) {
          console.warn('Firestore initial sync notice:', err);
          setSyncStatus('synced');
        }
      } else {
        setIsCloudSyncActive(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const setTargetExam = (exam: TargetExam) => {
    setTargetExamState(exam);
    if (currentUser) {
      setDoc(doc(db, 'users', currentUser.uid), { targetExam: exam }, { merge: true }).catch(e => {
        handleFirestoreError(e, OperationType.UPDATE, `users/${currentUser.uid}`);
      });
    }
  };

  const setUserName = (name: string) => {
    setUserNameState(name);
    if (currentUser) {
      setDoc(doc(db, 'users', currentUser.uid), { name }, { merge: true }).catch(e => {
        handleFirestoreError(e, OperationType.UPDATE, `users/${currentUser.uid}`);
      });
    }
  };

  const toggleBookmark = async (item: Omit<UserBookmark, 'id' | 'savedAt'>) => {
    setSyncStatus('syncing');
    const existingIndex = bookmarks.findIndex(b => b.itemId === item.itemId);
    let updated: UserBookmark[];
    if (existingIndex >= 0) {
      const removedId = bookmarks[existingIndex].id;
      updated = bookmarks.filter((_, i) => i !== existingIndex);
      if (currentUser) {
        try {
          await deleteDoc(doc(db, `users/${currentUser.uid}/bookmarks`, removedId));
        } catch (err) {
          console.warn('Bookmark removal cloud sync notice:', err);
        }
      }
    } else {
      const newBm: UserBookmark = {
        ...item,
        id: 'bm-' + Date.now(),
        savedAt: new Date().toISOString()
      };
      updated = [newBm, ...bookmarks];
      if (currentUser) {
        try {
          await setDoc(doc(db, `users/${currentUser.uid}/bookmarks`, newBm.id), {
            bookmarkId: newBm.id,
            userId: currentUser.uid,
            itemType: newBm.itemType,
            itemId: newBm.itemId,
            title: newBm.title,
            subject: newBm.subject,
            tag: newBm.tag || 'High-Yield',
            createdAt: newBm.savedAt
          });
        } catch (err) {
          console.warn('Bookmark add cloud sync notice:', err);
        }
      }
    }
    setBookmarks(updated);
    setSyncStatus('synced');
  };

  const isBookmarked = (itemId: string) => {
    return bookmarks.some(b => b.itemId === itemId);
  };

  const saveNote = async (
    targetType: 'question' | 'video',
    targetId: string,
    targetTitle: string,
    subject: string,
    content: string,
    videoTimestampSec?: number
  ) => {
    setSyncStatus('syncing');
    const existingIndex = notes.findIndex(n => n.targetId === targetId);
    let updated: UserNote[];
    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      const updatedNote: UserNote = {
        ...notes[existingIndex],
        content,
        updatedAt: now,
        videoTimestampSec: videoTimestampSec !== undefined ? videoTimestampSec : notes[existingIndex].videoTimestampSec
      };
      updated = [...notes];
      updated[existingIndex] = updatedNote;
      if (currentUser) {
        try {
          await setDoc(doc(db, `users/${currentUser.uid}/notes`, updatedNote.id), {
            noteId: updatedNote.id,
            userId: currentUser.uid,
            targetType,
            targetId,
            subject,
            title: targetTitle,
            content,
            timestampSec: updatedNote.videoTimestampSec || 0,
            updatedAt: now
          }, { merge: true });
        } catch (err) {
          console.warn('Note update sync notice:', err);
        }
      }
    } else {
      const newNote: UserNote = {
        id: 'note-' + Date.now(),
        targetType,
        targetId,
        targetTitle,
        subject,
        content,
        videoTimestampSec,
        createdAt: now,
        updatedAt: now
      };
      updated = [newNote, ...notes];
      if (currentUser) {
        try {
          await setDoc(doc(db, `users/${currentUser.uid}/notes`, newNote.id), {
            noteId: newNote.id,
            userId: currentUser.uid,
            targetType,
            targetId,
            subject,
            title: targetTitle,
            content,
            timestampSec: videoTimestampSec || 0,
            createdAt: now,
            updatedAt: now
          });
        } catch (err) {
          console.warn('Note create sync notice:', err);
        }
      }
    }
    setNotes(updated);
    setSyncStatus('synced');
  };

  const deleteNote = async (noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
    if (currentUser) {
      try {
        await deleteDoc(doc(db, `users/${currentUser.uid}/notes`, noteId));
      } catch (err) {
        console.warn('Note delete sync notice:', err);
      }
    }
  };

  const getNoteForTarget = (targetId: string) => {
    return notes.find(n => n.targetId === targetId);
  };

  // Magic Module (Auto-collected mistakes)
  const recordQuestionAttempt = async (
    questionId: string,
    subject: string,
    topic: string,
    stem: string,
    isCorrect: boolean,
    reason?: 'Concept Gap' | 'Silly Mistake' | 'Misread Question' | 'Time Pressure'
  ) => {
    setTotalQuestionsSolved(prev => prev + 1);

    if (isCorrect) {
      // If already in magic module, increment correct streak
      setMagicModuleItems(prev => {
        return prev.map(item => {
          if (item.questionId === questionId) {
            const newStreak = item.correctStreak + 1;
            const newBox = Math.min(5, item.box + 1) as 1 | 2 | 3 | 4 | 5;
            const isMastered = newStreak >= 2;
            return {
              ...item,
              correctStreak: newStreak,
              box: newBox,
              isMastered,
              nextReviewDate: new Date(Date.now() + 86400000 * Math.pow(2, newBox)).toISOString().split('T')[0]
            };
          }
          return item;
        });
      });
    } else {
      // Auto-collect mistake into Magic Module
      setMagicModuleItems(prev => {
        const existing = prev.find(item => item.questionId === questionId);
        if (existing) {
          return prev.map(item => {
            if (item.questionId === questionId) {
              return {
                ...item,
                timesWrong: item.timesWrong + 1,
                correctStreak: 0,
                isMastered: false,
                box: 1, // Demote back to box 1 on mistake!
                reasonForMistake: reason || item.reasonForMistake,
                nextReviewDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
              };
            }
            return item;
          });
        } else {
          const newItem: MagicModuleItem = {
            questionId,
            subject,
            topic,
            stem: stem.slice(0, 180) + '...',
            timesWrong: 1,
            correctStreak: 0,
            isMastered: false,
            box: 1,
            nextReviewDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            addedAt: new Date().toISOString(),
            reasonForMistake: reason || 'Concept Gap'
          };
          return [newItem, ...prev];
        }
      });
    }
  };

  const clearMasteredMistakes = async () => {
    setMagicModuleItems(prev => prev.filter(item => !item.isMastered));
  };

  // Test Attempt
  const saveTestAttempt = async (attempt: TestAttemptResult) => {
    setSyncStatus('syncing');
    setTestAttempts(prev => [attempt, ...prev]);
    if (currentUser) {
      try {
        await setDoc(doc(db, `users/${currentUser.uid}/testAttempts`, attempt.attemptId), {
          attemptId: attempt.attemptId,
          userId: currentUser.uid,
          testId: attempt.testId,
          testTitle: attempt.testTitle,
          testType: 'Grand Test',
          totalQuestions: attempt.correctCount + attempt.incorrectCount + attempt.unattemptedCount,
          correctCount: attempt.correctCount,
          incorrectCount: attempt.incorrectCount,
          unattemptedCount: attempt.unattemptedCount,
          accuracyPercentage: attempt.accuracy,
          score: attempt.score,
          percentile: attempt.percentile,
          allIndiaRank: attempt.allIndiaRank,
          stateRank: attempt.stateRank,
          totalTimeSeconds: attempt.totalTimeTakenSec,
          avgTimePerQSeconds: attempt.avgTimePerQSec,
          completedAt: attempt.date
        });
      } catch (err) {
        console.warn('Test attempt cloud save notice:', err);
      }
    }
    setSyncStatus('synced');
  };

  // Download video toggle
  const toggleVideoDownload = (videoId: string) => {
    setDownloadedVideoIds(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      } else {
        return [...prev, videoId];
      }
    });
  };

  // Post Discussion comment
  const postComment = async (
    questionId: string,
    text: string,
    role: 'Student' | 'Resident Doctor' | 'AI Medical Mentor' | 'Faculty' = 'Student'
  ) => {
    const newComment: QuestionComment = {
      id: 'comm-' + Date.now(),
      questionId,
      authorName: userName,
      authorRole: role,
      text,
      upvotes: 0,
      createdAt: 'Just now'
    };

    setComments(prev => ({
      ...prev,
      [questionId]: [...(prev[questionId] || []), newComment]
    }));

    // If student asked a question, generate an instant AI Medical Mentor clinical analysis
    if (role === 'Student' && (text.includes('why') || text.includes('how') || text.includes('?') || text.includes('confused') || text.includes('doubt'))) {
      setTimeout(() => {
        const aiResponse: QuestionComment = {
          id: 'ai-comm-' + Date.now(),
          questionId,
          authorName: 'Synapse AI Medical Mentor',
          authorRole: 'AI Medical Mentor',
          isAiResponse: true,
          text: `Great clinical doubt! Here is the physiological core: In medical entrance examinations, examiners frequently set distractors that seem plausible in secondary conditions. Notice how the question specifically emphasizes hemodynamics and clinical urgency. Always eliminate options that violate fundamental physiology (like lowering preload in preload-dependent RV states). Keep this pearl bookmarked!`,
          upvotes: 12,
          createdAt: 'Just now'
        };
        setComments(current => ({
          ...current,
          [questionId]: [...(current[questionId] || []), aiResponse]
        }));
      }, 1200);
    }
  };

  const upvoteComment = async (questionId: string, commentId: string) => {
    setComments(prev => {
      const qComments = prev[questionId] || [];
      return {
        ...prev,
        [questionId]: qComments.map(c => c.id === commentId ? { ...c, upvotes: c.upvotes + 1 } : c)
      };
    });
  };

  // Live Class Actions
  const addLiveLecture = (lecture: LiveClassSession) => {
    setLiveClasses(prev => [lecture, ...prev]);
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'liveClasses', JSON.stringify([lecture, ...liveClasses]));
  };

  const endAndPublishLiveLecture = (classId: string) => {
    setLiveClasses(prev => prev.map(c => c.id === classId ? {
      ...c,
      status: 'recorded',
      timing: 'Recorded • Held earlier today',
      viewerCount: Math.max(c.viewerCount, 18400)
    } : c));
  };

  const toggleLiveClassReminder = (classId: string) => {
    setLiveClasses(prev => prev.map(c => c.id === classId ? { ...c, reminderSet: !c.reminderSet } : c));
  };

  const recordClassAttendance = (classId: string, minutes: number) => {
    setLiveClasses(prev => prev.map(c => c.id === classId ? { ...c, isAttended: true, attendanceMinutes: Math.max(c.attendanceMinutes || 0, minutes) } : c));
    setStudyMinutesToday(prev => prev + minutes);
  };

  const downloadLiveClass = (classId: string, quality: '360p' | '720p' | '1080p' = '720p') => {
    const size = quality === '1080p' ? 680 : quality === '720p' ? 420 : 210;
    setDownloadedLiveClasses(prev => ({
      ...prev,
      [classId]: { quality, sizeMb: size }
    }));
  };

  const deleteLiveClassDownload = (classId: string) => {
    setDownloadedLiveClasses(prev => {
      const copy = { ...prev };
      delete copy[classId];
      return copy;
    });
  };

  const addUploadedNote = async (title: string, subject: string, pageCount: number, fileSizeMb: number) => {
    const newNote: UploadedUserNote = {
      id: 'up-' + Date.now(),
      title,
      subject,
      pageCount,
      fileSizeMb,
      uploadedAt: new Date().toISOString().split('T')[0],
      tags: [subject, 'Custom PDF', 'My Notes']
    };
    setUploadedUserNotes(prev => [newNote, ...prev]);
    if (currentUser) {
      try {
        await setDoc(doc(db, `users/${currentUser.uid}/uploadedNotes`, newNote.id), {
          uploadId: newNote.id,
          userId: currentUser.uid,
          title,
          subject,
          fileSizeMb,
          pageCount,
          uploadedAt: newNote.uploadedAt
        });
      } catch (err) {
        console.warn('Note upload cloud sync notice:', err);
      }
    }
  };

  const deleteUploadedNote = async (uploadId: string) => {
    setUploadedUserNotes(prev => prev.filter(n => n.id !== uploadId));
    if (currentUser) {
      try {
        await deleteDoc(doc(db, `users/${currentUser.uid}/uploadedNotes`, uploadId));
      } catch (err) {
        console.warn('Note delete cloud notice:', err);
      }
    }
  };

  const submitDoubtTicket = async (subject: string, topic: string, questionText: string, imageUrl?: string) => {
    setSyncStatus('syncing');
    const newTicket: DoubtEngineTicket = {
      id: 'dbt-' + Date.now(),
      subject,
      topic,
      questionText,
      imageUrl,
      status: 'answered',
      aiAnswer: `[Saarthi AI Analysis]: In ${subject}, this clinical hallmark depends directly on hemodynamic autoregulation and pathophysiology. A detailed faculty video walkthrough has been synchronized into today's batch doubt session!`,
      facultyName: 'Dr. Amitav Sen (Clinical Mentor)',
      createdAt: 'Just now',
      responseType: 'text_and_video',
      facultyVideoSolutionUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
    };
    setDoubtTickets(prev => [newTicket, ...prev]);
    setSyncStatus('synced');
  };

  const switchDevice = (deviceName: string) => {
    setCurrentDevice(deviceName);
    setSyncStatus('syncing');
    setTimeout(() => setSyncStatus('synced'), 600);
  };

  const loginWithGoogle = async () => {
    try {
      setSyncStatus('syncing');
      await signInWithGoogle();
    } catch (err) {
      console.error('Google login failed:', err);
    }
  };

  const logout = async () => {
    await logOut();
    setCurrentUser(null);
    setIsCloudSyncActive(false);
  };

  const triggerDemoSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
    }, 800);
  };

  return (
    <SyncContext.Provider
      value={{
        currentUser,
        isCloudSyncActive,
        syncStatus,
        targetExam,
        setTargetExam,
        userName,
        setUserName,
        streakCount,
        studyMinutesToday,
        totalQuestionsSolved,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        notes,
        saveNote,
        deleteNote,
        getNoteForTarget,
        magicModuleItems,
        recordQuestionAttempt,
        clearMasteredMistakes,
        testAttempts,
        saveTestAttempt,
        downloadedVideoIds,
        toggleVideoDownload,
        isDownloadActive: downloadedVideoIds.length > 0,
        comments,
        postComment,
        upvoteComment,
        liveClasses,
        addLiveLecture,
        endAndPublishLiveLecture,
        toggleLiveClassReminder,
        recordClassAttendance,
        downloadedLiveClasses,
        downloadLiveClass,
        deleteLiveClassDownload,
        uploadedUserNotes,
        addUploadedNote,
        deleteUploadedNote,
        doubtTickets,
        submitDoubtTicket,
        activeDevices,
        currentDevice,
        switchDevice,
        loginWithGoogle,
        logout,
        triggerDemoSync,
        toast,
        showToast
      }}
    >
      {toast && (
        <div className="fixed top-4 right-4 z-[9999] max-w-sm sm:max-w-md bg-slate-900/95 backdrop-blur-md border border-indigo-500/40 text-white shadow-2xl shadow-indigo-950/90 rounded-xl p-3 sm:p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-3">
          <div className={`p-1.5 rounded-lg shrink-0 ${toast.type === 'warning' ? 'bg-amber-500/20 text-amber-400' : toast.type === 'info' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            <span className="text-base font-bold">✓</span>
          </div>
          <div className="flex-1 text-xs">
            <div className="font-semibold text-slate-200">
              {toast.type === 'warning' ? 'Attention' : toast.type === 'info' ? 'Update' : 'Success'}
            </div>
            <p className="text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 text-xs transition"
          >
            ✕
          </button>
        </div>
      )}
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => {
  const ctx = useContext(SyncContext);
  if (!ctx) throw new Error('useSync must be used within SyncProvider');
  return ctx;
};
