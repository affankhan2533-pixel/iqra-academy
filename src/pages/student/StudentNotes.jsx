import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Bookmark, FileText, Download, Sparkles, X, CheckCircle, HelpCircle } from 'lucide-react';

const StudentNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // AI Notes Summarizer State
  const [selectedNote, setSelectedNote] = useState(null);
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/student/notes');
        setNotes(res.data);
      } catch (error) {
        toast.error('Failed to load study notes');
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleAiSummarize = async (note) => {
    setSelectedNote(note);
    setLoadingSummary(true);
    setSummary('');

    try {
      const res = await api.post('/ai/summarize', {
        fileName: note.title,
        textContent: `${note.title}. Subject: ${note.subject}. Course Level: ${note.class}. Description: ${note.description}`
      });
      setSummary(res.data.summary);
      toast.success('AI Study Summary generated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate AI notes summary');
      setSelectedNote(null);
    } finally {
      setLoadingSummary(false);
    }
  };

  const formatText = (text) => {
    if (!text) return '';
    let formatted = text
      .replace(/^### (.*$)/gim, '<h4 class="text-primary-text font-bold text-base mt-4 mb-2">$1</h4>')
      .replace(/^#### (.*$)/gim, '<h5 class="text-brand-accent font-semibold text-sm mt-3 mb-1">$1</h5>')
      .replace(/^## (.*$)/gim, '<h3 class="text-primary-text font-extrabold text-lg mt-5 mb-3 border-b border-brand-border pb-1">$1</h3>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-2 border-brand-accent pl-3 my-2 text-text-muted bg-brand-secondary/30 p-2 rounded-r-lg">$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-text font-semibold">$1</strong>')
      .replace(/^\*\s(.*$)/gim, '<li class="ml-4 list-disc text-text-muted mb-1">$1</li>')
      .replace(/^- \s(.*$)/gim, '<li class="ml-4 list-disc text-text-muted mb-1">$1</li>')
      .replace(/\$(.*?)\$/g, '<code class="px-1.5 py-0.5 bg-brand-secondary/50 rounded font-mono text-brand-accent text-xs">$1</code>')
      .replace(/\$\$(.*?)\$\$/g, '<div class="my-3 p-3 bg-brand-secondary/40 border border-brand-border rounded-xl text-center font-mono text-brand-accent text-sm">$1</div>');
    return formatted;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-accent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div>
        <h2 className="font-display font-extrabold text-2xl text-white">My Study Materials</h2>
        <p className="text-sm text-text-muted">Download revision sheets and handouts uploaded by teachers, or summarize them with AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-brand-accent/20 transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase bg-brand-accent/20 border border-brand-accent/30 text-brand-accent px-2 py-0.5 rounded-md">
                    {note.subject}
                  </span>
                  <span className="text-xs text-text-muted">By: {note.uploadedBy?.name}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-accent" />
                  {note.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {note.description || 'No description provided.'}
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                <button
                  onClick={() => handleAiSummarize(note)}
                  className="w-full py-2.5 rounded-xl bg-brand-accent text-brand-primary font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(222,219,200,0.15)]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Summarize with AI
                </button>
                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-brand-secondary border border-white/10 hover:border-brand-accent/50 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-secondary/80 transition-all duration-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF Notes
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-text-muted glass rounded-2xl border border-white/5">
            No study materials uploaded for your class yet.
          </div>
        )}
      </div>

      {/* AI Summary Modal Overlay */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl glass border border-white/10 rounded-3xl flex flex-col max-h-[85vh] shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden animate-fadeIn text-left">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-brand-accent animate-pulse" />
                <div>
                  <h3 className="font-display font-bold text-base text-white">AI Notes Summarizer</h3>
                  <p className="text-[10px] text-text-muted mt-0.5">Summary for: {selectedNote.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="p-1 rounded-xl bg-brand-secondary/60 hover:bg-brand-secondary border border-white/10 text-white hover:text-brand-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Summary */}
            <div className="flex-grow p-6 overflow-y-auto bg-brand-primary">
              {loadingSummary ? (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                  <Sparkles className="h-8 w-8 text-brand-accent animate-spin" />
                  <p className="text-sm font-semibold text-white">Structuring revision materials...</p>
                  <p className="text-xs text-text-muted">Formulating definitions, extraction formulas, and bullet keys.</p>
                </div>
              ) : (
                <div
                  className="text-sm leading-relaxed text-primary-text/80 flex flex-col gap-2 markdown-summary-modal"
                  dangerouslySetInnerHTML={{ __html: formatText(summary) }}
                />
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 bg-brand-secondary/40 flex justify-end">
              <button
                onClick={() => setSelectedNote(null)}
                className="px-5 py-2.5 bg-brand-secondary border border-white/10 hover:border-brand-accent/30 text-white hover:text-white font-bold text-xs rounded-xl transition-all"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentNotes;
