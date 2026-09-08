import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, UserCheck, Search, Filter } from 'lucide-react';
import { ClassInfo, Student } from '../types';

interface HeroSectionProps {
  classInfo: ClassInfo;
  students: Student[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedFilter: 'all' | 'inti' | 'anggota';
  setSelectedFilter: (f: 'all' | 'inti' | 'anggota') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  classInfo,
  students,
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
}) => {
  const maleCount = students.filter((s) => s.gender === 'L').length;
  const femaleCount = students.filter((s) => s.gender === 'P').length;
  const intiCount = students.filter((s) => s.roleCategory === 'inti').length;

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Komunitas & Profil Kelas Resmi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Keluarga Besar {classInfo.className}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed font-medium">
              &ldquo;{classInfo.motto}&rdquo;
            </p>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-slate-500 pt-1">
              <span>Wali Kelas: <strong className="text-slate-800">{classInfo.homeroomTeacher}</strong></span>
              <span>•</span>
              <span>Tahun Ajaran: <strong className="text-slate-800">{classInfo.academicYear}</strong></span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="px-3 py-2 text-center rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-xl sm:text-2xl font-black text-indigo-600">{students.length}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Siswa</div>
            </div>
            <div className="px-3 py-2 text-center rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-xl sm:text-2xl font-black text-slate-800">{intiCount}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pengurus Inti</div>
            </div>
            <div className="px-3 py-2 text-center rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-xl sm:text-2xl font-black text-sky-600">{maleCount} : {femaleCount}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">L / P</div>
            </div>
            <div className="px-3 py-2 text-center rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-xl sm:text-2xl font-black text-emerald-600">100%</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Kekompakan</div>
            </div>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-200/60">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="search-student-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, panggilan, jabatan, atau hobi..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
              >
                Reset
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
            <button
              id="filter-all"
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Semua (11)
            </button>
            <button
              id="filter-inti"
              onClick={() => setSelectedFilter('inti')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'inti'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Pengurus Inti ({intiCount})
            </button>
            <button
              id="filter-anggota"
              onClick={() => setSelectedFilter('anggota')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'anggota'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Seksi / Anggota ({students.length - intiCount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
