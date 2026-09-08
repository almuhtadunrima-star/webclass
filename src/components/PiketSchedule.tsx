import React, { useState, useEffect } from 'react';
import { Calendar, CheckSquare, Clock, BookOpen, User, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Student, DaySchedule } from '../types';

interface PiketScheduleProps {
  students: Student[];
  schedules: DaySchedule[];
  onSelectStudent: (student: Student) => void;
}

export const PiketSchedule: React.FC<PiketScheduleProps> = ({
  students,
  schedules,
  onSelectStudent,
}) => {
  const [subTab, setSubTab] = useState<'piket' | 'pelajaran'>('piket');

  // Determine current day in Indonesian
  const dayNamesIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const todayName = dayNamesIndo[new Date().getDay()];

  // Piket tasks checklist state stored in localStorage
  const defaultTasks = [
    'Menyapu & mengepel lantai kelas',
    'Menghapus & merapikan papan tulis',
    'Merapikan meja guru & menyediakan spidol',
    'Membuang tempat sampah ke TPS sekolah',
  ];

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('class_piket_completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      localStorage.setItem('class_piket_completed', JSON.stringify(updated));
      return updated;
    });
  };

  const days: ('Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat')[] = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header & Sub-tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Jadwal Rutin Kelas
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Pembagian piket 11 siswa dan jadwal mata pelajaran mingguan
          </p>
        </div>

        <div className="flex items-center p-1 bg-slate-200/70 rounded-xl">
          <button
            onClick={() => setSubTab('piket')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              subTab === 'piket'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Jadwal Piket (11 Siswa)</span>
          </button>
          <button
            onClick={() => setSubTab('pelajaran')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              subTab === 'pelajaran'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Jadwal Pelajaran</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: JADWAL PIKET */}
      {subTab === 'piket' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {days.map((day) => {
              const dayStudents = students.filter((s) => s.piketDay === day);
              const isToday = todayName === day;

              return (
                <div
                  key={day}
                  className={`flex flex-col justify-between rounded-2xl border transition-all duration-200 ${
                    isToday
                      ? 'bg-indigo-50/40 border-indigo-400 ring-2 ring-indigo-500/20 shadow-md'
                      : 'bg-white border-slate-200 shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <div className="p-4">
                    {/* Day Title & Today badge */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-extrabold text-base text-slate-900">{day}</h3>
                      {isToday ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white tracking-wide uppercase">
                          Hari Ini
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-400">
                          {dayStudents.length} Siswa
                        </span>
                      )}
                    </div>

                    {/* Students Assigned */}
                    <div className="space-y-2 mb-4">
                      {dayStudents.map((st) => (
                        <div
                          key={st.id}
                          onClick={() => onSelectStudent(st)}
                          className="cursor-pointer group flex items-center space-x-2.5 p-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-colors"
                        >
                          <div
                            className={`w-7 h-7 rounded-lg ${st.avatarBg} text-white flex items-center justify-center text-xs shrink-0`}
                          >
                            {st.avatarEmoji}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-600">
                              {st.name}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate">{st.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Checklist duties footer */}
                  <div className="p-3 bg-slate-50/80 border-t border-slate-100 rounded-b-2xl">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Tugas Petugas:
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Sapu & Pel Lantai</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Hapus Papan Tulis</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Rapikan Meja & Spidol</span>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Today's Piket Duty Tracker */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-indigo-600" />
                  <span>Ceklist Kebersihan Kelas Harian ({todayName})</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Petugas piket hari ini dimohon untuk menandai tugas yang sudah dilaksanakan.
                </p>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Tersimpan di browser lokal
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {defaultTasks.map((task, idx) => {
                const taskId = `${todayName}-task-${idx}`;
                const isChecked = !!completedTasks[taskId];

                return (
                  <label
                    key={taskId}
                    className={`flex items-start space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleTask(taskId)}
                      className="mt-0.5 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                    />
                    <span className={`text-xs font-semibold ${isChecked ? 'line-through opacity-80' : ''}`}>
                      {task}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: JADWAL PELAJARAN */}
      {subTab === 'pelajaran' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {schedules.map((sched) => {
            const isToday = todayName === sched.day;

            return (
              <div
                key={sched.day}
                className={`bg-white rounded-2xl border transition-all ${
                  isToday
                    ? 'border-indigo-400 ring-2 ring-indigo-500/20 shadow-md'
                    : 'border-slate-200 shadow-2xs'
                } overflow-hidden`}
              >
                <div
                  className={`p-3 text-center border-b ${
                    isToday
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <h3 className="font-extrabold text-sm">{sched.day}</h3>
                  {isToday && (
                    <span className="text-[10px] font-bold text-indigo-100 block">
                      Hari Ini
                    </span>
                  )}
                </div>

                <div className="divide-y divide-slate-100">
                  {sched.subjects.map((subj, idx) => (
                    <div key={idx} className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{subj.time}</span>
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-slate-100 text-slate-600">
                          {subj.code}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">
                        {subj.subject}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {subj.teacher}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
