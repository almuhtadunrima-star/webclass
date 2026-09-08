import React from 'react';
import { Award, UserCheck, Shield, ChevronDown, Sparkles } from 'lucide-react';
import { Student, ClassInfo } from '../types';

interface OrgChartProps {
  students: Student[];
  classInfo: ClassInfo;
  onSelectStudent: (student: Student) => void;
}

export const OrgChart: React.FC<OrgChartProps> = ({
  students,
  classInfo,
  onSelectStudent,
}) => {
  const ketua = students.find((s) => s.role.toLowerCase().includes('ketua kelas') && !s.role.toLowerCase().includes('wakil'));
  const wakil = students.find((s) => s.role.toLowerCase().includes('wakil'));
  const sekretarisList = students.filter((s) => s.role.toLowerCase().includes('sekretaris'));
  const bendaharaList = students.filter((s) => s.role.toLowerCase().includes('bendahara'));
  const seksiList = students.filter((s) => s.roleCategory === 'anggota');

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 mb-2">
          <Shield className="w-3.5 h-3.5" />
          <span>Bagan Kepengurusan</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Struktur Organisasi Kelas
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Bagan hierarki dan pembagian tugas 11 anggota kelas {classInfo.className}
        </p>
      </div>

      <div className="space-y-8">
        {/* Tier 0: Wali Kelas */}
        <div className="flex justify-center">
          <div className="relative group p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-white rounded-2xl border-2 border-amber-300 shadow-sm text-center max-w-xs w-full">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-200 text-amber-900 mb-2">
              Pembina / Wali Kelas
            </span>
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-xs mb-2">
              👩‍🏫
            </div>
            <h4 className="font-bold text-slate-900 text-base">{classInfo.homeroomTeacher}</h4>
            <p className="text-xs text-slate-500 mt-0.5">Penasihat & Pembimbing Kelas</p>
          </div>
        </div>

        {/* Connector Line */}
        <div className="flex justify-center -my-4">
          <div className="w-0.5 h-8 bg-slate-300" />
        </div>

        {/* Tier 1: Pimpinan Kelas (Ketua & Wakil) */}
        <div>
          <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Pimpinan Kelas
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {ketua && (
              <div
                onClick={() => onSelectStudent(ketua)}
                className="cursor-pointer group p-4 bg-white rounded-2xl border-2 border-blue-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all flex items-center space-x-3"
              >
                <div className={`w-12 h-12 rounded-xl ${ketua.avatarBg} text-white flex items-center justify-center text-xl shrink-0`}>
                  {ketua.avatarEmoji}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 mb-1">
                    {ketua.role}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                    {ketua.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">&ldquo;{ketua.nickname}&rdquo;</p>
                </div>
              </div>
            )}

            {wakil && (
              <div
                onClick={() => onSelectStudent(wakil)}
                className="cursor-pointer group p-4 bg-white rounded-2xl border-2 border-emerald-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all flex items-center space-x-3"
              >
                <div className={`w-12 h-12 rounded-xl ${wakil.avatarBg} text-white flex items-center justify-center text-xl shrink-0`}>
                  {wakil.avatarEmoji}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 mb-1">
                    {wakil.role}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors truncate">
                    {wakil.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">&ldquo;{wakil.nickname}&rdquo;</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tier 2: Sekretaris & Bendahara */}
        <div>
          <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Administrasi & Keuangan
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {sekretarisList.map((sek) => (
              <div
                key={sek.id}
                onClick={() => onSelectStudent(sek)}
                className="cursor-pointer group p-3.5 bg-white rounded-xl border border-purple-200 hover:border-purple-400 shadow-xs hover:shadow-sm transition-all flex items-center space-x-3"
              >
                <div className={`w-10 h-10 rounded-lg ${sek.avatarBg} text-white flex items-center justify-center text-lg shrink-0`}>
                  {sek.avatarEmoji}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                    {sek.role}
                  </span>
                  <h5 className="font-bold text-slate-900 text-xs truncate group-hover:text-purple-600 transition-colors mt-0.5">
                    {sek.name}
                  </h5>
                  <p className="text-[11px] text-slate-500">&ldquo;{sek.nickname}&rdquo;</p>
                </div>
              </div>
            ))}

            {bendaharaList.map((ben) => (
              <div
                key={ben.id}
                onClick={() => onSelectStudent(ben)}
                className="cursor-pointer group p-3.5 bg-white rounded-xl border border-amber-200 hover:border-amber-400 shadow-xs hover:shadow-sm transition-all flex items-center space-x-3"
              >
                <div className={`w-10 h-10 rounded-lg ${ben.avatarBg} text-white flex items-center justify-center text-lg shrink-0`}>
                  {ben.avatarEmoji}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    {ben.role}
                  </span>
                  <h5 className="font-bold text-slate-900 text-xs truncate group-hover:text-amber-700 transition-colors mt-0.5">
                    {ben.name}
                  </h5>
                  <p className="text-[11px] text-slate-500">&ldquo;{ben.nickname}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3: Seksi Bidang / Anggota Pelaksana */}
        <div>
          <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Seksi Bidang & Tim Operasional
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
            {seksiList.map((seksi) => (
              <div
                key={seksi.id}
                onClick={() => onSelectStudent(seksi)}
                className="cursor-pointer group p-3.5 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div className="flex items-start space-x-2.5 mb-2">
                  <div className={`w-9 h-9 rounded-lg ${seksi.avatarBg} text-white flex items-center justify-center text-base shrink-0`}>
                    {seksi.avatarEmoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 leading-none">
                      {seksi.role}
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs truncate group-hover:text-indigo-600 transition-colors mt-1">
                      {seksi.name}
                    </h5>
                    <p className="text-[11px] text-slate-500">&ldquo;{seksi.nickname}&rdquo;</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Piket: {seksi.piketDay}</span>
                  <span className="text-indigo-600 font-medium group-hover:underline">Detail &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
