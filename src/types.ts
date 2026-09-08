export interface Student {
  id: number;
  name: string;
  nickname: string;
  role: string;
  roleCategory: 'inti' | 'anggota';
  gender: 'L' | 'P';
  avatarBg: string;
  avatarEmoji: string;
  quote: string;
  hobby: string;
  birthDate: string;
  instagram: string;
  piketDay: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
}

export interface ClassInfo {
  className: string;
  schoolName: string;
  academicYear: string;
  homeroomTeacher: string;
  motto: string;
}

export interface SubjectItem {
  time: string;
  subject: string;
  teacher: string;
  code: string;
}

export interface DaySchedule {
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  subjects: SubjectItem[];
}

export interface MadingItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: 'Pengumuman' | 'Tugas' | 'Catatan' | 'Prestasi';
  color: string;
  pinned?: boolean;
}
