import React, { useState } from 'react';
import { MessageSquare, Plus, Trash2, Pin, Calendar, User, Sparkles, AlertCircle } from 'lucide-react';
import { MadingItem, Student } from '../types';

interface MadingBoardProps {
  madingItems: MadingItem[];
  students: Student[];
  onAddMading: (item: MadingItem) => void;
  onDeleteMading: (id: string) => void;
}

export const MadingBoard: React.FC<MadingBoardProps> = ({
  madingItems,
  students,
  onAddMading,
  onDeleteMading,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(students[0]?.name || 'Anggota Kelas');
  const [category, setCategory] = useState<'Pengumuman' | 'Tugas' | 'Catatan' | 'Prestasi'>('Pengumuman');
  const [color, setColor] = useState('blue');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newItem: MadingItem = {
      id: `mading-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      author,
      date: 'Baru saja',
      category,
      color,
      pinned: false,
    };

    onAddMading(newItem);
    setTitle('');
    setContent('');
    setShowAddForm(false);
  };

  const colorStyles: Record<string, { bg: string; border: string; badge: string }> = {
    blue: {
      bg: 'bg-blue-50/70',
      border: 'border-blue-200',
      badge: 'bg-blue-100 text-blue-800',
    },
    amber: {
      bg: 'bg-amber-50/70',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-800',
    },
    emerald: {
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-800',
    },
    purple: {
      bg: 'bg-purple-50/70',
      border: 'border-purple-200',
      badge: 'bg-purple-100 text-purple-800',
    },
    rose: {
      bg: 'bg-rose-50/70',
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-800',
    },
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Mading & Papan Informasi Kelas
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Pengumuman, tugas, catatan, dan pesan kenangan 11 anggota kelas
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Batal Menulis' : 'Tempel Catatan Baru'}</span>
        </button>
      </div>

      {/* Add Note Form Modal / Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-5 sm:p-6 bg-white rounded-2xl border-2 border-indigo-200 shadow-lg animate-in fade-in duration-150 space-y-4"
        >
          <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Tulis Pengumuman atau Pesan Baru</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Judul Catatan
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Info Tugas Fisika / Uang Kas..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Pengirim / Penulis
              </label>
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {students.map((st) => (
                  <option key={st.id} value={`${st.name} (${st.role})`}>
                    {st.name} ({st.role})
                  </option>
                ))}
                <option value="Wali Kelas">Wali Kelas</option>
                <option value="Perwakilan Kelas">Perwakilan Kelas</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as 'Pengumuman' | 'Tugas' | 'Catatan' | 'Prestasi')
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Pengumuman">Pengumuman</option>
                <option value="Tugas">Tugas</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Catatan">Catatan / Kenangan</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Warna Kertas
              </label>
              <div className="flex space-x-2 pt-1">
                {(['blue', 'amber', 'emerald', 'purple', 'rose'] as const).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      c === 'blue'
                        ? 'bg-blue-300'
                        : c === 'amber'
                        ? 'bg-amber-300'
                        : c === 'emerald'
                        ? 'bg-emerald-300'
                        : c === 'purple'
                        ? 'bg-purple-300'
                        : 'bg-rose-300'
                    } ${color === c ? 'scale-110 border-slate-900 ring-2 ring-indigo-500/40' : 'border-white'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Isi Catatan / Pesan
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan pesan yang ingin disampaikan kepada seluruh 11 teman sekelas..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
            >
              Publikasikan ke Mading
            </button>
          </div>
        </form>
      )}

      {/* Mading Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {madingItems.map((item) => {
          const style = colorStyles[item.color] || colorStyles.blue;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border ${style.border} ${style.bg} flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all relative group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${style.badge}`}>
                    {item.category}
                  </span>

                  <div className="flex items-center space-x-1">
                    {item.pinned && (
                      <span className="p-1 rounded-full bg-slate-200/60 text-slate-600" title="Disematkan">
                        <Pin className="w-3.5 h-3.5 fill-current" />
                      </span>
                    )}
                    <button
                      onClick={() => onDeleteMading(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition-all"
                      title="Hapus catatan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line mb-4">
                  {item.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700 truncate max-w-[180px]">
                  {item.author}
                </span>
                <span>{item.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
