import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Plus, X, Bookmark, FileText, Download } from 'lucide-react';

const TeacherNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [noteClass, setNoteClass] = useState('SSC');
  const [fileUrl, setFileUrl] = useState('');
  const [description, setDescription] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await api.get('/teacher/notes');
      setNotes(res.data);
    } catch (error) {
      toast.error('Failed to load study notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !subject || !fileUrl) {
      return toast.error('Please complete title, subject, and notes link');
    }

    try {
      await api.post('/teacher/notes', {
        title,
        subject,
        class: noteClass,
        fileUrl,
        description
      });
      toast.success('Study notes uploaded successfully!');
      setModalOpen(false);
      setTitle('');
      setFileUrl('');
      setDescription('');
      fetchNotes();
    } catch (error) {
      toast.error('Failed to upload notes');
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-white">Study Materials</h2>
          <p className="text-sm text-text-muted">Upload and review PDFs, revision sheets, and notes.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-accent text-brand-primary font-bold text-xs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Upload Notes
        </button>
      </div>

      {/* Uploaded Notes list */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-accent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note._id} className="glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-brand-accent/20 transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase bg-brand-accent/20 border border-brand-accent/30 text-brand-accent px-2 py-0.5 rounded-md">
                      {note.class}
                    </span>
                    <span className="text-xs text-text-muted font-mono">{note.subject}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-accent" />
                    {note.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {note.description || 'No description provided.'}
                  </p>
                </div>

                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 py-2.5 rounded-xl bg-brand-secondary border border-white/10 hover:border-brand-accent/50 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-accent hover:text-brand-primary transition-all duration-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Notes
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-text-muted">No notes uploaded yet.</div>
          )}
        </div>
      )}

      {/* Notes Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md glass rounded-3xl border border-white/10 p-6 flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="font-display font-bold text-lg text-white">Upload Study Notes</h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Notes Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Chemical Bonding Handout"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  >
                    <option value="Physics" className="bg-[#0A0E27]">Physics</option>
                    <option value="Chemistry" className="bg-[#0A0E27]">Chemistry</option>
                    <option value="Mathematics" className="bg-[#0A0E27]">Mathematics</option>
                    <option value="Biology" className="bg-[#0A0E27]">Biology</option>
                    <option value="Science" className="bg-[#0A0E27]">Science</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Target Course</label>
                  <select
                    value={noteClass}
                    onChange={(e) => setNoteClass(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  >
                    <option value="SSC" className="bg-[#0A0E27]">SSC (Class 10)</option>
                    <option value="XI Science" className="bg-[#0A0E27]">XI Science</option>
                    <option value="XII Science" className="bg-[#0A0E27]">XII Science</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Document File link / URL</label>
                <input
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="https://drive.google.com/.../file.pdf"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Short Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="2"
                  placeholder="Topic and chapter guide notes details..."
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none resize-none"
                />
              </div>

              <button type="submit" className="w-full py-3 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl mt-2">
                Publish Document
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherNotes;
