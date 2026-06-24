import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { BookOpen, Users, Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';

const TeacherOverview = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await api.get('/teacher/batches');
        setBatches(res.data);
      } catch (error) {
        toast.error('Failed to load assigned batches');
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-accent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 text-left">
      <div>
        <h2 className="font-display font-extrabold text-2xl text-white">Teacher Dashboard</h2>
        <p className="text-sm text-text-muted">Manage your assigned batches and student logs.</p>
      </div>

      {/* AI test generator shortcut banner */}
      <div className="glass rounded-3xl p-6 border border-brand-accent/20 bg-brand-accent/[0.02] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-1.5 text-left">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-accent animate-pulse" />
            AI Test Generator Utilities
          </h3>
          <p className="text-xs text-text-muted max-w-xl leading-relaxed">
            Instantly formulate Physics, Chemistry, Math, and Biology quiz sets, board pattern tests, or numerical challenges using advanced coaching prompts.
          </p>
        </div>
        <Link
          to="/teacher/ai-test-gen"
          className="px-4 py-2.5 bg-brand-accent text-brand-primary font-bold text-xs rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 shrink-0 shadow-[0_0_20px_rgba(222,219,200,0.15)]"
        >
          Open AI Test Creator
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-display font-bold text-lg text-white">My Assigned Batches</h3>

        {batches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <div key={batch._id} className="glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-brand-accent/30 transition-all">
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">
                    {batch.course?.name}
                  </span>
                  <h4 className="font-display font-bold text-lg text-white">{batch.name}</h4>
                  
                  <div className="flex flex-col gap-1.5 mt-2 text-xs text-text-muted font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-accent shrink-0" />
                      <span>{batch.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                      <span>{batch.room}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5 text-xs text-text-muted font-semibold">
                  <Users className="w-4 h-4 text-brand-accent" />
                  <span>{batch.students?.length || 0} Students Allocated</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-text-muted glass rounded-2xl border border-white/5">
            You are not currently assigned to any batches. Contact administration.
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherOverview;
