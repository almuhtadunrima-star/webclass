import React from 'react';
import { Users, Network, CalendarClock, MessageSquare, Edit3, Sparkles } from 'lucide-react';
import { ClassInfo } from '../types';

interface NavbarProps {
  activeTab: 'anggota' | 'struktur' | 'piket' | 'mading';
  setActiveTab: (tab: 'anggota' | 'struktur' | 'piket' | 'mading') => void;
  classInfo: ClassInfo;
  onEditClassInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  classInfo,
  onEditClassInfo,
}) => {
  const tabs = [
    { id: 'anggota' as const, label: '11 Anggota Kelas', icon: Users },
    { id: 'struktur' as const, label: 'Struktur Organisasi', icon: Network },
    { id: 'piket' as const, label: 'Jadwal & Piket', icon: CalendarClock },
    { id: 'mading' as const, label: 'Mading & Info', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand / Class Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('anggota')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm shadow-indigo-200">
              11
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                  {classInfo.className}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  11 Siswa
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-[200px] sm:max-w-xs">
                {classInfo.schoolName} • {classInfo.academicYear}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Edit info */}
          <div className="flex items-center space-x-2">
            <button
              id="btn-edit-class"
              onClick={onEditClassInfo}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-300/80 transition-colors"
              title="Ubah identitas kelas"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Ubah Info Kelas</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2.5 space-x-1.5 border-t border-slate-100 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
