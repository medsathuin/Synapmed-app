import { 
  BatchInfo,
  LiveClassSession, 
  LiveChatMessage,
  LiveDoubt,
  DoubtEngineTicket, 
  UploadedUserNote 
} from '../types/liveClass';

export const CURRENT_BATCH: BatchInfo = {
  id: 'batch-neet-pg-2026',
  name: 'Clinical PG Master Batch (2026-2027) • Dr. Rathod Sathyapal',
  targetExam: 'NEET-PG',
  facultyLead: 'Dr. Rathod Sathyapal (Founder & Lead Medical Faculty)',
  enrolledStudentsCount: 240,
  totalClasses: 240,
  completedClasses: 168,
  attendancePercentage: 96,
  telegramLink: 'https://t.me/DrRathodSathyapal_Official'
};

export const MOCK_LIVE_CLASSES: LiveClassSession[] = [
  {
    id: 'live-session-01',
    title: 'Septic Shock & Hemodynamic Profiling: Arterial Line & Noradrenaline Titration',
    subject: 'Medicine',
    chapter: 'Critical Care & Surviving Sepsis Campaign Guidelines',
    timing: 'Today, 7:00 PM - 9:30 PM',
    dateStr: 'Today',
    status: 'live',
    viewerCount: 215,
    durationMinutes: 120,
    batchName: 'Super 100 Live Clinical PG Batch',
    faculty: 'Dr. Rathod Sathyapal (Founder)',
    facultyTitle: 'MD Medicine, DM Cardiology • Founder & Lead Faculty',
    facultyAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    streamPoster: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    recentGuidelineTag: 'Surviving Sepsis Campaign 2024 International Guidelines',
    classNotesPdfUrl: '/notes/sepsis-hemodynamics-dr-rathod.pdf',
    classNotesPages: 16,
    lectureSlidesPdfUrl: '/slides/sepsis-bundle-2026.pdf',
    modulePdfUrl: '/modules/critical-care-medicine-module.pdf',
    modulePdfTitle: 'Intensive Care Medicine Complete Module (Dr. Rathod Sathyapal)',
    dppId: 'dpp-sepsis-01',
    dppTitle: 'DPP #42: Sepsis Biomarkers & Hemodynamics (20 Clinical MCQs)',
    dppQuestionCount: 20,
    dppPdfUrl: '/dpp/dpp-42-sepsis.pdf',
    dppVideoSolutionDurationMin: 18,
    isDownloaded: false,
    activePoll: {
      id: 'poll-01',
      question: 'In septic shock refractory to norepinephrine (0.25 mcg/kg/min), which second-line vasopressor is first recommended?',
      options: [
        'Epinephrine infusion',
        'Vasopressin (0.03 units/min)',
        'Dopamine infusion',
        'Phenylephrine bolus'
      ],
      correctOption: 1,
      timeSecondsLeft: 45,
      totalVotes: 188,
      votesDistribution: [8, 82, 6, 4],
      userVotedOption: 1,
      explanation: 'Surviving Sepsis Campaign recommends adding vasopressin (up to 0.03 units/min) instead of escalating norepinephrine alone to reduce catecholamine dosage.'
    }
  },
  {
    id: 'live-session-02',
    title: 'Obstructive Jaundice & Whipple Pancreaticoduodenectomy Surgical Anatomy',
    subject: 'Surgery',
    chapter: 'Hepatobiliary & Pancreatic Surgery',
    timing: 'Tomorrow, 7:00 PM - 9:15 PM',
    dateStr: 'Tomorrow',
    status: 'upcoming',
    viewerCount: 0,
    durationMinutes: 135,
    batchName: 'Super 100 Live Clinical PG Batch',
    faculty: 'Dr. Rathod Sathyapal (Founder)',
    facultyTitle: 'MD Medicine, DM Cardiology • Founder & Lead Faculty',
    facultyAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    streamPoster: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    recentGuidelineTag: 'NCCN 2025 Pancreatic Adenocarcinoma Resectability Criteria',
    classNotesPdfUrl: '/notes/whipple-calot-dr-rathod.pdf',
    classNotesPages: 14,
    lectureSlidesPdfUrl: '/slides/hpb-surgery-mastery.pdf',
    modulePdfUrl: '/modules/hpb-surgery-module.pdf',
    modulePdfTitle: 'Surgical Gastroenterology Comprehensive Module',
    dppId: 'dpp-jaundice-02',
    dppTitle: 'DPP #43: Biliary Anatomy, ERCP & Whipple Procedure (15 MCQs)',
    dppQuestionCount: 15,
    dppPdfUrl: '/dpp/dpp-43-biliary.pdf',
    dppVideoSolutionDurationMin: 15,
    isDownloaded: false
  },
  {
    id: 'live-session-03',
    title: 'Acute Leukemia & Flow Cytometry Immunophenotyping Masterclass',
    subject: 'Pathology',
    chapter: 'Hematopathology & WHO 2024 Classification',
    timing: 'Yesterday, 7:00 PM',
    dateStr: 'Yesterday',
    status: 'recorded',
    viewerCount: 228,
    durationMinutes: 110,
    batchName: 'Super 100 Live Clinical PG Batch',
    faculty: 'Dr. Rathod Sathyapal (Founder)',
    facultyTitle: 'MD Medicine, DM Cardiology • Founder & Lead Faculty',
    facultyAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    streamPoster: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    recentGuidelineTag: '5th Edition WHO Classification of Hematolymphoid Tumours',
    classNotesPdfUrl: '/notes/flow-cytometry-dr-rathod.pdf',
    classNotesPages: 22,
    lectureSlidesPdfUrl: '/slides/acute-leukemia-mastery.pdf',
    modulePdfUrl: '/modules/hematopathology-module.pdf',
    modulePdfTitle: 'Hematology & Bone Marrow Pathology Complete Module',
    dppId: 'dpp-leukemia-03',
    dppTitle: 'DPP #41: Leukemia Smears & Flow Cytometry Gating (25 MCQs)',
    dppQuestionCount: 25,
    dppPdfUrl: '/dpp/dpp-41-leukemia.pdf',
    dppVideoSolutionDurationMin: 22,
    isDownloaded: true,
    downloadQuality: '1080p',
    downloadSizeMb: 540
  },
  {
    id: 'live-session-04',
    title: 'Antiarrhythmic Drug Classes & Channelopathies (Long QT, Brugada, CPVT)',
    subject: 'Pharmacology',
    chapter: 'Vaughan Williams Classification & Sudden Cardiac Death',
    timing: '2 days ago',
    dateStr: '2 days ago',
    status: 'recorded',
    viewerCount: 204,
    durationMinutes: 98,
    batchName: 'Super 100 Live Clinical PG Batch',
    faculty: 'Dr. Rathod Sathyapal (Founder)',
    facultyTitle: 'MD Medicine, DM Cardiology • Founder & Lead Faculty',
    facultyAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    streamPoster: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    recentGuidelineTag: 'HRS/EHRA/APHRS 2024 Expert Consensus on Inherited Arrhythmias',
    classNotesPdfUrl: '/notes/antiarrhythmic-dr-rathod.pdf',
    classNotesPages: 18,
    lectureSlidesPdfUrl: '/slides/antiarrhythmics-2026.pdf',
    modulePdfUrl: '/modules/cardiovascular-pharmacology.pdf',
    modulePdfTitle: 'Autonomic & Cardiovascular Pharmacology Module',
    dppId: 'dpp-antiarrhythmics-04',
    dppTitle: 'DPP #40: Antiarrhythmics & ECG Channelopathies (20 MCQs)',
    dppQuestionCount: 20,
    dppPdfUrl: '/dpp/dpp-40-arrhythmia.pdf',
    dppVideoSolutionDurationMin: 16,
    isDownloaded: false
  },
  {
    id: 'live-session-05',
    title: 'Severe Preeclampsia, Eclampsia & Magnesium Sulfate Zuspan Regimen',
    subject: 'Obstetrics & Gynaecology',
    chapter: 'Hypertensive Disorders of Pregnancy & HELLP Syndrome',
    timing: '3 days ago',
    dateStr: '3 days ago',
    status: 'recorded',
    viewerCount: 218,
    durationMinutes: 105,
    batchName: 'Super 100 Live Clinical PG Batch',
    faculty: 'Dr. Rathod Sathyapal (Founder)',
    facultyTitle: 'MD Medicine, DM Cardiology • Founder & Lead Faculty',
    facultyAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
    streamPoster: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    recentGuidelineTag: 'ACOG Practice Bulletin #222 Updated Gestational Hypertension',
    classNotesPdfUrl: '/notes/preeclampsia-dr-rathod.pdf',
    classNotesPages: 20,
    lectureSlidesPdfUrl: '/slides/preeclampsia-protocols.pdf',
    modulePdfUrl: '/modules/obstetrics-emergencies.pdf',
    modulePdfTitle: 'Obstetric Complications & High-Risk Pregnancy Module',
    dppId: 'dpp-preeclampsia-05',
    dppTitle: 'DPP #39: Hypertensive Disorders in Pregnancy (18 MCQs)',
    dppQuestionCount: 18,
    dppPdfUrl: '/dpp/dpp-39-preeclampsia.pdf',
    dppVideoSolutionDurationMin: 20,
    isDownloaded: true,
    downloadQuality: '720p',
    downloadSizeMb: 380
  }
];

export const INITIAL_LIVE_CHAT_MESSAGES: LiveChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'Dr. Rathod Sathyapal (Founder)',
    role: 'faculty',
    text: 'Welcome doctors to tonight\'s clinical rounds! Keep your whiteboard open. We are breaking down septic shock and arterial pressure curves.',
    timestamp: '7:01 PM',
    isPinned: true
  },
  {
    id: 'msg-2',
    sender: 'Dr. Rohan Mehra',
    role: 'student',
    text: 'Good evening Sir! Audio and 1080p feed crystal clear.',
    timestamp: '7:02 PM'
  },
  {
    id: 'msg-3',
    sender: 'Dr. Ananya S',
    role: 'student',
    text: 'Sir, passive leg raise testing vs stroke volume variation - which is more accurate in spontaneously breathing patients?',
    timestamp: '7:05 PM',
    isDoubt: true
  },
  {
    id: 'msg-4',
    sender: 'Dr. Rathod Sathyapal (Founder)',
    role: 'faculty',
    text: 'Excellent question Ananya! Passive leg raise creates an autologous 300mL fluid bolus and works regardless of arrhythmias or spontaneous breathing, unlike PPV/SVV which requires controlled mandatory ventilation!',
    timestamp: '7:07 PM'
  }
];

export const INITIAL_LIVE_DOUBTS: LiveDoubt[] = [
  {
    id: 'dbt-live-1',
    studentName: 'Dr. Ananya Swaminathan',
    studentAvatar: 'https://images.unsplash.com/photo-1594824813589-b875151e33aa?auto=format&fit=crop&w=100&q=80',
    question: 'Why is passive leg raise preferred over stroke volume variation in spontaneous breathing?',
    timestamp: '7:05 PM',
    isHandRaised: true,
    status: 'answering_live'
  },
  {
    id: 'dbt-live-2',
    studentName: 'Dr. Karthik Sundaram',
    studentAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=100&q=80',
    question: 'At what noradrenaline dose should we add hydrocortisone 200mg/day?',
    timestamp: '7:14 PM',
    isHandRaised: false,
    status: 'pending'
  }
];

export const MOCK_DOUBT_ENGINE_TICKETS: DoubtEngineTicket[] = [
  {
    id: 'dbt-101',
    subject: 'Medicine',
    topic: 'ECG in Wellens Syndrome',
    questionText: 'Respected Dr. Rathod Sir, why is urgent coronary angiography indicated in Wellens Syndrome even when cardiac troponin I is normal or only minimally elevated?',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=500&q=80',
    status: 'answered',
    createdAt: 'Today, 2:15 PM',
    aiAnswer: 'Wellens syndrome indicates critical proximal LAD stenosis (>85-90%). T-wave inversions represent reperfusion injury after transient ischemia. Biomarkers are often normal because massive necrosis has not yet occurred.',
    facultyVideoSolutionUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    facultyName: 'Dr. Rathod Sathyapal (Founder)',
    responseType: 'text_and_video'
  },
  {
    id: 'dbt-102',
    subject: 'Pharmacology',
    topic: 'Digoxin Toxicity & Hypokalemia',
    questionText: 'Why does hypokalemia accentuate digoxin toxicity while hyperkalemia prevents digoxin binding?',
    status: 'answered',
    createdAt: 'Yesterday, 8:45 PM',
    aiAnswer: 'Digoxin and potassium compete for the alpha subunit of myocardial Na+/K+ ATPase. In hypokalemia, digoxin binds with higher affinity, exacerbating toxicity.',
    facultyVideoSolutionUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    facultyName: 'Dr. Rathod Sathyapal (Founder)',
    responseType: 'text_and_video'
  }
];

export const MOCK_UPLOADED_NOTES: UploadedUserNote[] = [
  {
    id: 'unote-01',
    title: 'My Handwritten High-Yield Pediatric Cardiology Mnemonics',
    subject: 'Paediatrics',
    pageCount: 8,
    fileSizeMb: 4.8,
    uploadedAt: 'Oct 24, 2026',
    tags: ['Tetralogy of Fallot', 'Cyanotic Spells', 'Dr. Rathod Sathyapal Lectures']
  },
  {
    id: 'unote-02',
    title: 'Pharmacology High-Yield Antimicrobial Tables & IDSA Guidelines',
    subject: 'Pharmacology',
    pageCount: 14,
    fileSizeMb: 6.2,
    uploadedAt: 'Oct 26, 2026',
    tags: ['Beta Lactamase', 'CRE', 'Dr. Rathod Sathyapal Masterclass']
  }
];
