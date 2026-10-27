export type AppUserRole = 'student' | 'teacher' | 'admin';

export interface BatchItem {
  id: string;
  name: string;
  targetExam: 'NEET-PG' | 'INI-CET' | 'FMGE';
  price: number;
  originalPrice: number;
  startDate: string;
  validityDate: string;
  posterUrl: string;
  assignedTeachers: string[];
  enrolledStudentsCount: number;
  totalLectures: number;
  completedLectures: number;
  status: 'active' | 'upcoming' | 'completed';
  batchCode: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  subject: string;
  qualification: string;
  experienceYears: number;
  avatarUrl: string;
  assignedBatches: string[];
  totalClassesTaken: number;
  rating: number;
  status: 'active' | 'on_leave';
}

export interface StudentEnrollment {
  id: string;
  name: string;
  phone: string;
  email: string;
  targetExam: string;
  batchIds: string[];
  joinedDate: string;
  attendancePercent: number;
  testsAttempted: number;
  status: 'active' | 'banned';
  activeDevices: string[];
}

export interface CouponCode {
  id: string;
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  validTill: string;
  usedCount: number;
  maxUsage: number;
  status: 'active' | 'expired';
}

export interface TransactionRecord {
  id: string;
  studentName: string;
  studentPhone: string;
  batchName: string;
  amount: number;
  paymentGateway: 'Razorpay' | 'UPI' | 'Card' | 'NetBanking';
  status: 'successful' | 'refunded' | 'failed';
  transactionDate: string;
  invoiceNumber: string;
}

export interface AppDeveloperSettings {
  appVersion: string;
  minSupportedVersion: string;
  drmVideoEncryption: boolean;
  maintenanceMode: boolean;
  cdnStorageUsedGb: number;
  cdnStorageTotalGb: number;
  serverStatus: 'Optimal' | 'High Traffic' | 'Maintenance';
}
