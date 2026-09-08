import React from 'react';
import { Calendar, Instagram, Heart, Edit2, Eye, Award } from 'lucide-react';
import { Student } from '../types';

interface StudentCardProps {
  student: Student;
  index: number;
  onViewDetail: (student: Student) => void;
  onEdit: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  index,
  onViewDetail,
  onEdit,
}) => {
  const isInti = student.roleCategory === 'inti';

  const roleColorClasses = (() => {
    if (student.role.includes('Ketua Kelas')) {
      return 'bg-blue-50 text-blue-700 border-blue-200/80';
    }
    if (student.role.includes('Wakil')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    }
    if (student.role.includes('Sekretaris')) {
      return 'bg-purple-50 text-purple-700 border-purple-200/80';
    }
    if (student.role.includes('Bendahara')) {
      return 'bg-amber-50 text-amber-800 border-amber-200/80';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  })();

  const piketColor = {
    Senin: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Selasa: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Rabu: 'bg-amber-50 text-amber-700 border-amber-200',
    Kamis: 'bg-purple-50 text-purple-700 border-purple-200',
    Jumat: 'bg-rose-50 text-rose-700 border-rose-200',
  }[student.piketDay] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div
      id={`student-card-${student.id}`}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Banner Accent */}
      <div className={`h-2 w-full ${student.avatarBg}`} />

      <div className="p-5 flex-1 flex flex-col">
        {/* Header with Number & Piket badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-xs font-black border border-slate-200">
            #{String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex items-center space-x-1.5">
            <span
              className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${piketColor}`}
            >
              <Calendar className="w-3 h-3" />
              <span>{student.piketDay}</span>
            </span>
          </div>
        </div>

        {/* Avatar and Basic Info */}
        <div className="flex items-start space-x-3.5 mb-4">
          <div
            className={`w-14 h-14 rounded-2xl ${student.avatarBg} text-white flex items-center justify-center text-2xl shadow-xs shrink-0 select-none`}
          >
            {student.avatarEmoji}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                {student.name}
              </h3>
              <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium">
                &ldquo;{student.nickname}&rdquo;
              </span>
            </div>

            <div className="mt-1.5">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${roleColorClasses}`}
              >
                {student.role}
              </span>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mb-4 bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex-1">
          <p className="text-xs text-slate-600 italic line-clamp-2 leading-relaxed">
            &ldquo;{student.quote}&rdquo;
          </p>
        </div>

        {/* Details: Hobby & Instagram */}
        <div className="space-y-1.5 text-xs text-slate-500 pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Hobi:</span>
            <span className="font-semibold text-slate-700 truncate max-w-[170px]">{student.hobby}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Sosmed:</span>
            <a
              href={`https://instagram.com/${student.instagram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline flex items-center space-x-1 truncate max-w-[170px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Instagram className="w-3 h-3" />
              <span>{student.instagram}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 py-3 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => onViewDetail(student)}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Lihat Profil</span>
        </button>

        <button
          onClick={() => onEdit(student)}
          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-slate-200 transition-colors"
          title="Ubah data anggota"
        >
          <Edit2 className="w-3 h-3 text-slate-500" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};
