import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw } from 'lucide-react';
import { Student } from '../types';

interface EditStudentModalProps {
  student: Student | null;
  onClose: () => void;
  onSave: (updated: Student) => void;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({
  student,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Student | null>(null);

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    }
  }, [student]);

  if (!student || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const emojiOptions = ['👨‍✈️', '👩‍💼', '📝', '💻', '🪙', '📊', '🧹', '🎨', '⚽', '📦', '📸', '🎓', '📚', '🚀', '💡', '🎵', '🌿', '⚡'];
  const bgColors = [
    { label: 'Biru', value: 'bg-blue-500' },
    { label: 'Hijau Emerald', value: 'bg-emerald-500' },
    { label: 'Ungu', value: 'bg-purple-500' },
    { label: 'Indigo', value: 'bg-indigo-500' },
    { label: 'Amber / Emas', value: 'bg-amber-500' },
    { label: 'Mawar', value: 'bg-rose-500' },
    { label: 'Teal', value: 'bg-teal-500' },
    { label: 'Pink', value: 'bg-pink-500' },
    { label: 'Oranye', value: 'bg-orange-500' },
    { label: 'Sian', value: 'bg-cyan-500' },
    { label: 'Sky', value: 'bg-sky-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Edit Biodata Siswa
            </h3>
            <p className="text-xs text-slate-500">
              Ubah data profil #{String(formData.id).padStart(2, '0')} - {formData.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Avatar and Color selector */}
          <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div
              className={`w-14 h-14 rounded-2xl ${formData.avatarBg} text-white flex items-center justify-center text-2xl shrink-0 shadow-xs`}
            >
              {formData.avatarEmoji}
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Pilih Avatar Emoji
                </label>
                <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto p-1 bg-white rounded-lg border border-slate-200">
                  {emojiOptions.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setFormData({ ...formData, avatarEmoji: emoji })}
                      className={`w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 ${
                        formData.avatarEmoji === emoji ? 'bg-indigo-100 ring-1 ring-indigo-500' : ''
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Name & Nickname */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Panggilan
              </label>
              <input
                type="text"
                required
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Role & Role Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Jabatan di Kelas
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Kategori Jabatan
              </label>
              <select
                value={formData.roleCategory}
                onChange={(e) =>
                  setFormData({ ...formData, roleCategory: e.target.value as 'inti' | 'anggota' })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="inti">Pengurus Inti</option>
                <option value="anggota">Seksi / Anggota</option>
              </select>
            </div>
          </div>

          {/* Piket Day & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Hari Piket
              </label>
              <select
                value={formData.piketDay}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    piketDay: e.target.value as 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat',
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Jenis Kelamin
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value as 'L' | 'P' })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="L">Laki-laki (L)</option>
                <option value="P">Perempuan (P)</option>
              </select>
            </div>
          </div>

          {/* Quote */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Kutipan / Motto Pribadi
            </label>
            <textarea
              rows={2}
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Hobby & Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Hobi & Minat
              </label>
              <input
                type="text"
                value={formData.hobby}
                onChange={(e) => setFormData({ ...formData, hobby: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Instagram
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="@username"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
