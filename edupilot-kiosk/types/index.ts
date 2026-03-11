export interface Student {
  id: string;
  name: string;
  parent_phone: string; // stored as "010-XXXX-XXXX"
  student_phone?: string;
  school?: string;
  grade?: string;
  status: 'Active' | 'Paused';
}

export interface ClassSession {
  id: string;
  class_code: string; // e.g., "DM103-3"
  subject_name: string; // e.g., "파이썬-2"
  day_of_week: string; // e.g., "토요일"
  start_time: string; // e.g., "16:00"
  classroom?: string;
  teacher_name?: string;
}

export interface Enrollment {
  student_id: string;
  class_id: string;
}

export interface AttendanceLog {
  id: string;
  student_id: string;
  class_id: string;
  check_in_time: string; // ISO string
  method: 'Kiosk' | 'Manual';
  notification_sent: boolean;
}

export interface Profile {
  id: string; // UUID from auth.users
  full_name: string;
  role: 'admin' | 'staff';
  created_at: string;
}

export interface Class {
  day_of_week: string;
  classroom: string;
  start_time: string;
  end_time: string;
  subject_name: string;
  teacher_name: string;
  students: string[];
  capacity: number;
  current_students: number;
}
