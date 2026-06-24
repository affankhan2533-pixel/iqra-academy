import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Plus, X, Bell, Calendar, Send } from 'lucide-react';

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targets, setTargets] = useState(['student', 'teacher']);

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get('/admin/announcements');
      setAnnouncements(res.data);
    } catch (error) {
      toast.error('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleTargetToggle = (role) => {
    if (targets.includes(role)) {
      setTargets(targets.filter((r) => r !== role));
    } else {
      setTargets([...targets, role]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || targets.length === 0) {
      return toast.error('Please complete title, content, and select at least one target role');
    }

    try {
      await api.post('/admin/announcements', {
        title,
        content,
        targetRole: targets
      });
      toast.success('Announcement published successfully');
      setModalOpen(false);
      setTitle('');
      setContent('');
      setTargets(['student', 'teacher']);
      fetchAnnouncements();
    } catch (error) {
      toast.error('Failed to publish announcement');
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-white">Announcements</h2>
          <p className="text-sm text-text-muted">Broadcast notices and update students & teachers boards.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-accent text-brand-primary font-bold text-xs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      {/* Announcements Feed List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-accent"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {announcements.length > 0 ? (
            announcements.map((item) => (
              <div key={item._id} className="glass rounded-2xl p-6 border border-white/5 flex flex-col gap-3 relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-brand-accent/10 text-brand-accent">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">{item.title}</h3>
                      <div className="flex items-center gap-2.5 mt-0.5 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>By: {item.postedBy?.name || 'Admin'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Target role badges */}
                  <div className="flex flex-wrap gap-1">
                    {item.targetRole.map((role) => (
                      <span key={role} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-muted text-[10px] uppercase font-bold tracking-wider">
                        {role}s
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-text-muted leading-relaxed mt-2 pl-12">
                  {item.content}
                </p>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-text-muted">No announcements posted yet.</div>
          )}
        </div>
      )}

      {/* Creation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md glass rounded-3xl border border-white/10 p-6 flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="font-display font-bold text-lg text-white">Create Announcement</h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Test series starting"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Content Notice</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="4"
                  placeholder="Details of the announcement..."
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none resize-none"
                  required
                />
              </div>

              {/* Target Roles selection */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Target Roles</label>
                <div className="flex gap-3 mt-1">
                  {['student', 'teacher'].map((role) => {
                    const isChecked = targets.includes(role);
                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => handleTargetToggle(role)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 capitalize ${
                          isChecked
                            ? 'bg-brand-accent/20 border-brand-accent text-brand-accent'
                            : 'bg-brand-secondary/40 border-white/10 text-text-muted'
                        }`}
                      >
                        {role}s
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl mt-2 flex items-center justify-center gap-2"
              >
                Send Broadcast
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
