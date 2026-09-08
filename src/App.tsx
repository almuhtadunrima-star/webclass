import React, { useState, useEffect } from 'react';
import {
  DEFAULT_CLASS_INFO,
  DEFAULT_STUDENTS,
  DEFAULT_SCHEDULES,
  DEFAULT_MADING,
} from './data/defaultData';
import { Student, ClassInfo, MadingItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StudentCard } from './components/StudentCard';
import { StudentDetailModal } from './components/StudentDetailModal';
import { EditStudentModal } from './components/EditStudentModal';
import { EditClassModal } from './components/EditClassModal';
import { OrgChart } from './components/OrgChart';
import { PiketSchedule } from './components/PiketSchedule';
import { MadingBoard } from './components/MadingBoard';
import { Users, Sparkles, RotateCcw, Heart, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'anggota' | 'struktur' | 'piket' | 'mading'>('anggota');

  // Load class info from localStorage
  const [classInfo, setClassInfo] = useState<ClassInfo>(() => {
    try {
      const saved = localStorage.getItem('class_info_11');
      return saved ? JSON.parse(saved) : DEFAULT_CLASS_INFO;
    } catch {
      return DEFAULT_CLASS_INFO;
    }
  });

  // Load 11 students from localStorage
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('class_students_11');
      return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  });

  // Load mading items from localStorage
  const [madingItems, setMadingItems] = useState<MadingItem[]>(() => {
    try {
      const saved = localStorage.getItem('class_mading_11');
      return saved ? JSON.parse(saved) : DEFAULT_MADING;
    } catch {
      return DEFAULT_MADING;
    }
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'inti' | 'anggota'>('all');

  // Modals
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isEditClassOpen, setIsEditClassOpen] = useState(false);

  // Sync to localStorage
  const handleSaveClassInfo = (newInfo: ClassInfo) => {
    setClassInfo(newInfo);
    localStorage.setItem('class_info_11', JSON.stringify(newInfo));
  };

  const handleSaveStudent = (updatedStudent: Student) => {
    const updatedList = students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s));
    setStudents(updatedList);
    localStorage.setItem('class_students_11', JSON.stringify(updatedList));

    // Update opened detail modal if it's the same student
    if (selectedStudentDetail?.id === updatedStudent.id) {
      setSelectedStudentDetail(updatedStudent);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan seluruh data profil 11 siswa dan kelas ke pengaturan awal?')) {
      setStudents(DEFAULT_STUDENTS);
      setClassInfo(DEFAULT_CLASS_INFO);
      setMadingItems(DEFAULT_MADING);
      localStorage.removeItem('class_students_11');
      localStorage.removeItem('class_info_11');
      localStorage.removeItem('class_mading_11');
      localStorage.removeItem('class_piket_completed');
    }
  };

  const handleAddMading = (item: MadingItem) => {
    const updated = [item, ...madingItems];
    setMadingItems(updated);
    localStorage.setItem('class_mading_11', JSON.stringify(updated));
  };

  const handleDeleteMading = (id: string) => {
    const updated = madingItems.filter((item) => item.id !== id);
    setMadingItems(updated);
    localStorage.setItem('class_mading_11', JSON.stringify(updated));
  };

  // Filtered students list
  const filteredStudents = students.filter((s) => {
    const matchesFilter =
      selectedFilter === 'all'
        ? true
        : selectedFilter === 'inti'
        ? s.roleCategory === 'inti'
        : s.roleCategory === 'anggota';

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesFilter;

    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.nickname.toLowerCase().includes(q) ||
      s.role.toLowerCase().includes(q) ||
      s.hobby.toLowerCase().includes(q) ||
      s.piketDay.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        classInfo={classInfo}
        onEditClassInfo={() => setIsEditClassOpen(true)}
      />

      <main className="flex-1">
        {/* TAB 1: 11 ANGGOTA KELAS */}
        {activeTab === 'anggota' && (
          <div>
            <HeroSection
              classInfo={classInfo}
              students={students}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Daftar 11 Siswa
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Menampilkan {filteredStudents.length} dari 11 anggota kelas
                  </p>
                </div>

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    Tampilkan Semua Siswa
                  </button>
                )}
              </div>

              {filteredStudents.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">
                    Tidak Ditemukan
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Tidak ada siswa yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
                  >
                    Reset Pencarian
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredStudents.map((student, idx) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      index={idx}
                      onViewDetail={(st) => setSelectedStudentDetail(st)}
                      onEdit={(st) => setEditingStudent(st)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: STRUKTUR ORGANISASI */}
        {activeTab === 'struktur' && (
          <OrgChart
            students={students}
            classInfo={classInfo}
            onSelectStudent={(st) => setSelectedStudentDetail(st)}
          />
        )}

        {/* TAB 3: JADWAL PIKET & MAPEL */}
        {activeTab === 'piket' && (
          <PiketSchedule
            students={students}
            schedules={DEFAULT_SCHEDULES}
            onSelectStudent={(st) => setSelectedStudentDetail(st)}
          />
        )}

        {/* TAB 4: MADING & INFO */}
        {activeTab === 'mading' && (
          <MadingBoard
            madingItems={madingItems}
            students={students}
            onAddMading={handleAddMading}
            onDeleteMading={handleDeleteMading}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xs">
              11
            </div>
            <span className="font-semibold text-slate-700">
              {classInfo.className} • 11 Anggota Siswa
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleResetToDefault}
              className="inline-flex items-center space-x-1 text-slate-400 hover:text-slate-700 transition-colors"
              title="Kembalikan nama & data siswa ke default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data Contoh</span>
            </button>
            <span>•</span>
            <span className="text-slate-400">
              Dibuat untuk kelas kompak & berprestasi
            </span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <StudentDetailModal
        student={selectedStudentDetail}
        onClose={() => setSelectedStudentDetail(null)}
        onEdit={(st) => {
          setSelectedStudentDetail(null);
          setEditingStudent(st);
        }}
      />

      <EditStudentModal
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={handleSaveStudent}
      />

      <EditClassModal
        classInfo={classInfo}
        isOpen={isEditClassOpen}
        onClose={() => setIsEditClassOpen(false)}
        onSave={handleSaveClassInfo}
        onReset={() => setClassInfo(DEFAULT_CLASS_INFO)}
      />
    </div>
  );
}
