import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Plus, X, Calendar, BookOpen, Send } from 'lucide-react';

const TeacherAssignments = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [batchId, setBatchId] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await api.get('/teacher/batches');
        setBatches(res.data);
        if (res.data.length > 0) {
          setBatchId(res.data[0]._id);
        }
      } catch (error) {
        toast.error('Failed to load assigned batches');
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !batchId || !dueDate) {
      return toast.error('Please complete all required fields');
    }

    try {
      await api.post('/teacher/assignments', {
        title,
        description,
        batchId,
        dueDate
      });
      toast.success('Homework task uploaded successfully!');
      setModalOpen(false);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      toast.error('Failed to upload assignment task');
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-white">Homework & Assignments</h2>
          <p className="text-sm text-text-muted">Upload and review homework logs for student batches.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-accent text-brand-primary font-bold text-xs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Assignment
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-accent"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 mt-4">
          <h3 className="font-display font-bold text-lg text-white">Assigned Classes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <div key={batch._id} className="glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-brand-accent/20 transition-all">
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">
                    {batch.course?.name}
                  </span>
                  <h4 className="font-display font-bold text-lg text-white">{batch.name}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Check students homework status or upload new tasks for this batch schedule.
                  </p>
                </div>
                
                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5 text-xs text-text-muted font-semibold">
                  <BookOpen className="w-4 h-4 text-brand-accent" />
                  <span>Interactive Studies</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Creation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md glass rounded-3xl border border-white/10 p-6 flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="font-display font-bold text-lg text-white">Raise Assignment</h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Assignment Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Vectors Exercise Sheet"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Target Batch</label>
                <select
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                >
                  {batches.map((b) => (
                    <option key={b._id} value={b._id} className="bg-[#0A0E27]">
                      {b.name} ({b.course?.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Description Instructions</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  placeholder="Instructions for students..."
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl mt-2 flex items-center justify-center gap-2"
              >
                Upload & Notify Batch
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;
