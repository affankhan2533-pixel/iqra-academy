import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { ClipboardList, Clock, CheckCircle } from 'lucide-react';

const StudentAssignments = () => {
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const res = await api.get('/student/dashboard'); // dashboard payload has full homework list
        setHomework(res.data.homework || []);
      } catch (error) {
        toast.error('Failed to load homework details');
      } finally {
        setLoading(false);
      }
    };
    fetchHomework();
  }, []);

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
        <h2 className="font-display font-extrabold text-2xl text-white">My Homework Tasks</h2>
        <p className="text-sm text-text-muted">Download and complete tasks uploaded by batch teachers.</p>
      </div>

      <div className="flex flex-col gap-4">
        {homework.length > 0 ? (
          homework.map((task) => (
            <div key={task._id} className="glass rounded-2xl p-6 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-brand-accent/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent shrink-0">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display font-bold text-lg text-white">{task.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed max-w-2xl">{task.description}</p>
                  <span className="text-[10px] text-brand-accent font-medium mt-1">Uploaded by: {task.uploadedBy?.name}</span>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0 pl-14 sm:pl-0">
                <span className="text-xs text-red-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <span className="text-[10px] text-text-muted">Submit hand-written rolls to faculty.</span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center text-text-muted glass rounded-2xl border border-white/5">
            No pending homework assignments tasks.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignments;
