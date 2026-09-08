import React from 'react';
import { X, Calendar, Instagram, Heart, Edit2, Award, Clock, BookOpen, ShieldCheck } from 'lucide-react';
import { Student } from '../types';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
  onEdit: (student: Student) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onEdit,
}) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner */}
        <div className={`relative h-28 ${student.avatarBg} p-4 flex justify-between items-start text-white`}>
          <div className="bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            KARTU ANGGOTA KELAS
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 pt-0 relative">
          {/* Avatar floating */}
          <div className="-mt-12 mb-4 flex items-end justify-between">
            <div className="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-lg border-2 border-white">
              <div
                className={`w-full h-full rounded-2xl ${student.avatarBg} text-white flex items-center justify-center text-4xl`}
              >
                {student.avatarEmoji}
              </div>
            </div>

            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
              NIS #{String(student.id).padStart(4, '0')}
            </span>
          </div>

          {/* Name & Role */}
          <div className="mb-4">
            <h2 className="text-2xl font-black text-slate-900 leading-tight">
              {student.name}
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm font-semibold text-slate-500">
                Panggilan: &ldquo;{student.nickname}&rdquo;
              </span>
              <span>•</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {student.role}
              </span>
            </div>
          </div>

          {/* Quote Card */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Motto & Kutipan Favorit
            </span>
            <p className="text-sm font-medium text-slate-700 italic">
              &ldquo;{student.quote}&rdquo;
            </p>
          </div>

          {/* Attributes Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block mb-0.5">Jadwal Piket</span>
              <span className="font-bold text-slate-800 text-sm flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Hari {student.piketDay}</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block mb-0.5">Tanggal Lahir</span>
              <span className="font-bold text-slate-800 text-sm">{student.birthDate}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block mb-0.5">Hobi & Minat</span>
              <span className="font-bold text-slate-800 truncate block">{student.hobby}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 font-semibold block mb-0.5">Media Sosial</span>
              <a
                href={`https://instagram.com/${student.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-indigo-600 hover:underline flex items-center space-x-1 truncate"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{student.instagram}</span>
              </a>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(student);
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Biodata</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
