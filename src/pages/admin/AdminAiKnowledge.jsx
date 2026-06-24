import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { BookOpen, Plus, Sparkles, Trash2, Database, Upload, Link2 } from 'lucide-react';

const AdminAiKnowledge = () => {
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [className, setClassName] = useState('XII Science');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchKnowledge = async () => {
    try {
      // In our DB notes act as study materials and knowledge base articles
      const res = await api.get('/student/notes');
      setKnowledgeList(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load AI knowledge base details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const handleAddKnowledge = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return toast.error('Please specify title and context summary');
    }

    setAdding(true);
    try {
      // Create notes in student notes collection (acts as RAG source)
      await api.post('/teacher/notes', {
        title,
        subject,
        class: className,
        fileUrl: fileUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        description
      });

      toast.success('RAG Knowledge Article added successfully!');
      setTitle('');
      setDescription('');
      setFileUrl('');
      fetchKnowledge();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add knowledge base entry');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 text-left">
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="w-10 h-10 rounded-xl bg-brand-secondary flex items-center justify-center border border-brand-accent/20">
          <Database className="h-5 w-5 text-brand-accent" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white">AI Knowledge Base & RAG Indexer</h2>
          <p className="text-xs text-text-muted">Manage institute study notes, reference articles, and URLs searchable by the AI Tutor</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Add Knowledge Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleAddKnowledge} className="glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand-accent flex items-center gap-1.5">
              <Plus className="h-4.5 w-4.5" />
              Index New Material
            </h3>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Adding materials here embeds details into the student RAG retrieval loop. The AI will cite these links and summaries during doubts tutoring.
            </p>

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Article Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Laws of Thermodynamics Summary"
                className="w-full bg-brand-secondary/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-text-muted focus:border-brand-accent outline-none"
                required
              />
            </div>

            {/* Grid class & subject */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-muted uppercase">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-brand-secondary/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-accent outline-none"
                >
                  {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'].map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-muted uppercase">Class Target</label>
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full bg-brand-secondary/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-accent outline-none"
                >
                  {['SSC', 'XI Science', 'XII Science'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Document PDF URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase flex items-center gap-1">
                <Link2 className="h-3 w-3" /> Document Reference Link (PDF URL)
              </label>
              <input
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://example.com/notes.pdf"
                className="w-full bg-brand-secondary/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-text-muted focus:border-brand-accent outline-none"
              />
            </div>

            {/* Context Summary / Details */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Context Content / Summary</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write full text details, key theorems or chemical formulas. The AI matches user doubts against this text..."
                rows={5}
                className="w-full bg-brand-secondary/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-text-muted focus:border-brand-accent outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={adding}
              className="py-3 rounded-xl bg-brand-accent text-brand-primary font-bold text-xs hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 mt-2"
            >
              {adding ? (
                <div className="h-4 w-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Index and Store PDF Notes
                  <Sparkles className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Knowledge Base List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Database className="h-4 w-4 text-brand-accent" />
            Indexed Knowledge Source Docs ({knowledgeList.length})
          </h3>

          {loading ? (
            <div className="py-20 text-center animate-pulse text-xs text-text-muted">Loading indexed nodes...</div>
          ) : knowledgeList.length === 0 ? (
            <div className="py-20 text-center text-xs text-text-muted glass rounded-2xl border border-white/5">
              No knowledge base nodes found. Add one on the left panel!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {knowledgeList.map((node) => (
                <div key={node._id} className="glass rounded-2xl p-5 border border-white/5 flex flex-col justify-between text-xs gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                        {node.subject} • {node.class}
                      </span>
                      <span className="text-[9px] text-text-muted">By: Teacher/Admin</span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{node.title}</h4>
                    <p className="text-text-muted leading-relaxed text-[11px] line-clamp-3">
                      {node.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                    <a
                      href={node.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow py-2 text-center bg-brand-secondary rounded-xl text-[10px] font-bold text-white border border-white/5 hover:border-brand-accent transition-colors"
                    >
                      View Source File
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAiKnowledge;
