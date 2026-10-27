import { BatchItem, TeacherProfile, StudentEnrollment, CouponCode, TransactionRecord, AppDeveloperSettings } from '../types/roles';

export const FOUNDER_INFO = {
  name: 'Rathod Sathyapal',
  title: 'Founder, Lead Educator & Cardiologist',
  email: 'rathodsathunayak@gmail.com',
  mission: 'Personal medical PG mentorship and comprehensive clinical concept lectures created directly by Dr. Rathod Sathyapal. 100% independent, self-built, doctor-guided medical education.',
  avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
  qualification: 'MD Medicine, DM Cardiology • Founder & Lead Faculty',
  experience: 'Medical PG Clinical Educator & Mentorship'
};

export const INITIAL_BATCHES: BatchItem[] = [
  {
    id: 'batch-super-100',
    name: 'Super 100 Live Clinical PG Batch (2026-2027)',
    targetExam: 'NEET-PG',
    price: 8999,
    originalPrice: 14999,
    startDate: '2026-06-15',
    validityDate: '2027-04-30',
    posterUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    assignedTeachers: ['Dr. Rathod Sathyapal (Founder)'],
    enrolledStudentsCount: 240,
    totalLectures: 240,
    completedLectures: 168,
    status: 'active',
    batchCode: 'SUPER100'
  },
  {
    id: 'batch-rapid-rev',
    name: 'Fast-Track Rapid Revision Batch 3.0',
    targetExam: 'INI-CET',
    price: 4999,
    originalPrice: 8999,
    startDate: '2026-08-01',
    validityDate: '2026-12-31',
    posterUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    assignedTeachers: ['Dr. Rathod Sathyapal (Founder)'],
    enrolledStudentsCount: 185,
    totalLectures: 120,
    completedLectures: 88,
    status: 'active',
    batchCode: 'RAPID30'
  },
  {
    id: 'batch-foundation-2027',
    name: 'Next-Gen Foundation MBBS 19-Subject Batch (2027-2028)',
    targetExam: 'NEET-PG',
    price: 11999,
    originalPrice: 19999,
    startDate: '2026-11-01',
    validityDate: '2028-03-31',
    posterUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    assignedTeachers: ['Dr. Rathod Sathyapal (Founder)'],
    enrolledStudentsCount: 95,
    totalLectures: 320,
    completedLectures: 12,
    status: 'upcoming',
    batchCode: 'FOUNDATION27'
  }
];

export const INITIAL_TEACHERS: TeacherProfile[] = [
  {
    id: 'teacher-founder',
    name: 'Dr. Rathod Sathyapal (Founder)',
    email: 'rathodsathunayak@gmail.com',
    subject: 'Clinical Medicine, Cardiology & Complete 19-Subject Mentorship',
    qualification: 'MD General Medicine, DM Cardiology • Founder & Lead Faculty',
    experienceYears: 15,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    assignedBatches: ['Super 100 Live Clinical PG Batch', 'Fast-Track Rapid Revision Batch 3.0', 'Next-Gen Foundation MBBS 19-Subject Batch'],
    totalClassesTaken: 268,
    rating: 4.99,
    status: 'active'
  }
];

export const INITIAL_STUDENTS: StudentEnrollment[] = [
  {
    id: 'stud-101',
    name: 'Dr. Rohan Mehra',
    email: 'rohan.mehra@medcollege.in',
    phone: '+91 98765 43210',
    batchIds: ['Super 100 Live Clinical PG Batch'],
    joinedDate: '2026-07-01',
    targetExam: 'NEET-PG',
    attendancePercent: 94,
    testsAttempted: 38,
    status: 'active',
    activeDevices: ['Desktop Chrome (Win 11)', 'Synapse Med Mobile App (Pixel 8)']
  },
  {
    id: 'stud-102',
    name: 'Dr. Ananya Swaminathan',
    email: 'ananya.s@aiimsalumni.org',
    phone: '+91 98451 23456',
    batchIds: ['Super 100 Live Clinical PG Batch', 'Fast-Track Rapid Revision Batch 3.0'],
    joinedDate: '2026-06-20',
    targetExam: 'INI-CET',
    attendancePercent: 98,
    testsAttempted: 52,
    status: 'active',
    activeDevices: ['Desktop Chrome (Win 11)', 'Synapse Med Mobile App (Pixel 8)']
  },
  {
    id: 'stud-103',
    name: 'Dr. Karthik Sundaram',
    email: 'karthik.sundaram@hospital.gov.in',
    phone: '+91 99112 33445',
    batchIds: ['Super 100 Live Clinical PG Batch'],
    joinedDate: '2026-07-15',
    targetExam: 'NEET-PG',
    attendancePercent: 82,
    testsAttempted: 24,
    status: 'active',
    activeDevices: ['Desktop Chrome (Win 11)', 'Synapse Med Mobile App (Pixel 8)']
  },
  {
    id: 'stud-104',
    name: 'Dr. Sneha Reddy',
    email: 'sneha.reddy@pgaspirant.in',
    phone: '+91 98888 77766',
    batchIds: ['Fast-Track Rapid Revision Batch 3.0'],
    joinedDate: '2026-08-10',
    targetExam: 'FMGE',
    attendancePercent: 91,
    testsAttempted: 31,
    status: 'active',
    activeDevices: ['Desktop Chrome (Win 11)', 'Synapse Med Mobile App (Pixel 8)']
  }
];

export const INITIAL_COUPONS: CouponCode[] = [
  {
    id: 'cpn-1',
    code: 'SATHYAPAL',
    discountType: 'percentage',
    discountValue: 25,
    validTill: '2026-12-31',
    usedCount: 120,
    maxUsage: 500,
    status: 'active'
  },
  {
    id: 'cpn-2',
    code: 'RATHODSIR',
    discountType: 'percentage',
    discountValue: 20,
    validTill: '2026-12-31',
    usedCount: 88,
    maxUsage: 350,
    status: 'active'
  },
  {
    id: 'cpn-3',
    code: 'DOCTOR100',
    discountType: 'flat',
    discountValue: 1500,
    validTill: '2026-11-15',
    usedCount: 45,
    maxUsage: 200,
    status: 'active'
  },
  {
    id: 'cpn-4',
    code: 'NEETPG2026',
    discountType: 'percentage',
    discountValue: 15,
    validTill: '2026-10-31',
    usedCount: 32,
    maxUsage: 100,
    status: 'active'
  }
];

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx-90124',
    studentName: 'Dr. Rohan Mehra',
    studentPhone: '+91 98765 43210',
    batchName: 'Super 100 Live Clinical PG Batch',
    amount: 7199,
    paymentGateway: 'UPI',
    status: 'successful',
    transactionDate: 'Today, 10:14 AM',
    invoiceNumber: 'INV-2026-09412'
  },
  {
    id: 'tx-90123',
    studentName: 'Dr. Ananya Swaminathan',
    studentPhone: '+91 98451 23456',
    batchName: 'Fast-Track Rapid Revision Batch 3.0',
    amount: 4249,
    paymentGateway: 'Card',
    status: 'successful',
    transactionDate: 'Today, 09:30 AM',
    invoiceNumber: 'INV-2026-09411'
  },
  {
    id: 'tx-90122',
    studentName: 'Dr. Karthik Sundaram',
    studentPhone: '+91 99112 33445',
    batchName: 'Super 100 Live Clinical PG Batch',
    amount: 8999,
    paymentGateway: 'Razorpay',
    status: 'successful',
    transactionDate: 'Yesterday, 04:50 PM',
    invoiceNumber: 'INV-2026-09410'
  },
  {
    id: 'tx-90121',
    studentName: 'Dr. Sneha Reddy',
    studentPhone: '+91 98888 77766',
    batchName: 'Super 100 Live Clinical PG Batch',
    amount: 8999,
    paymentGateway: 'NetBanking',
    status: 'refunded',
    transactionDate: 'Yesterday, 02:15 PM',
    invoiceNumber: 'INV-2026-09409'
  }
];

export const INITIAL_DEVELOPER_SETTINGS: AppDeveloperSettings = {
  appVersion: 'v4.3.0 (Production Build)',
  minSupportedVersion: 'v4.1.0',
  drmVideoEncryption: true,
  maintenanceMode: false,
  cdnStorageUsedGb: 120,
  cdnStorageTotalGb: 1000,
  serverStatus: 'Optimal'
};
