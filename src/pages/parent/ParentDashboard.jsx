import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Home, User, UserCheck, ClipboardList, BookOpen, Clock, AlertCircle, DollarSign, Bell } from 'lucide-react';

const ParentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParentDashboard = async () => {
      try {
        const res = await api.get('/parent/dashboard');
        setData(res.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load parent dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchParentDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-accent"></div>
      </div>
    );
  }

  const { student, attendancePct, attendanceLogs, recentResults, homework, announcements, fees, aiAnalysis } = data || {};

  return (
    <div className="flex flex-col gap-8 text-left">
      {/* Welcome & Student Profile summary */}
      <div className="glass rounded-3xl p-6 border border-brand-accent/20 bg-brand-secondary/40 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full filter blur-2xl"></div>
        <div className="flex items-center gap-4 relative z-10">
          <img
            src={student?.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
            alt="Student avatar"
            className="w-16 h-16 rounded-full border border-white/10 object-cover"
          />
          <div>
            <span className="text-[9px] bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
              Child's Portal Profile
            </span>
            <h2 className="font-display font-extrabold text-2xl text-white mt-1">Parent Dashboard: {student?.user?.name}</h2>
            <p className="text-xs text-text-muted mt-1 leading-none">
              Class: {student?.class} • Roll Number: {student?.rollNo} • Batch: {student?.batch?.name}
            </p>
          </div>
        </div>

        <Link
          to="/parent/report"
          className="px-4 py-2 bg-brand-accent text-brand-primary font-bold text-xs rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          View Monthly Performance Report
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Attendance Rate</span>
            <span className="font-display font-bold text-2xl text-white">{attendancePct}%</span>
          </div>
          <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Recent Marks Avg</span>
            <span className="font-display font-bold text-2xl text-white">
              {recentResults && recentResults.length > 0
                ? `${Math.round(recentResults.reduce((acc, r) => acc + r.percentage, 0) / recentResults.length)}%`
                : 'N/A'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent">
            <ClipboardList className="w-5 h-5" />
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Fee Status</span>
            <span className={`font-display font-bold text-lg px-2.5 py-0.5 rounded-full ${student?.feeStatus === 'Paid'
                ? 'bg-green-500/10 text-green-400'
                : student?.feeStatus === 'Overdue'
                  ? 'bg-red-500/10 text-red-400 animate-pulse'
                  : 'bg-yellow-500/10 text-yellow-400'
              }`}>
              {student?.feeStatus}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Homework Status</span>
            <span className="font-display font-bold text-2xl text-white">{homework?.length || 0} Pending</span>
          </div>
          <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* AI Performance Quick Glance widget */}
      <div className="glass rounded-3xl p-6 border border-cyan-500/10 bg-cyan-500/[0.01] flex flex-col gap-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <AlertCircle className="h-4.5 w-4.5 text-cyan-400" />
          AI Performance Summary & Insights
        </h3>
        <p className="text-xs text-text-muted leading-relaxed">
          The AI analysis suggests that <strong className="text-white">{student?.user?.name}</strong> is strong in <span className="text-brand-accent font-semibold">{aiAnalysis?.strongSubjects.join(', ')}</span>. However, additional attention should be given to <span className="text-red-400 font-semibold">{aiAnalysis?.weakSubjects.join(', ')}</span> to improve grades in chemistry/genetics mock papers.
        </p>
        <div className="p-3 bg-brand-secondary/40 rounded-xl border border-white/5 text-[11px] text-text-muted">
          <strong>Daily recommended target:</strong> {aiAnalysis?.personalizedStudyPlan.split('\n')[0].replace('- ', '')}
        </div>
      </div>

      {/* Main split layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Test history & Homework list */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Test results */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-white">Academic Test Results</h3>
            {recentResults && recentResults.length > 0 ? (
              <div className="flex flex-col gap-3">
                {recentResults.map((res) => (
                  <div key={res._id} className="glass rounded-xl p-4 border border-white/5 flex items-center justify-between text-xs">
                    <div className="text-left">
                      <p className="font-bold text-white text-sm">{res.test?.name}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">Subject: {res.test?.subject} • Date: {new Date(res.test?.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <div className="text-left sm:text-right">
                        <p className="text-white font-bold text-sm">{res.obtainedMarks}/{res.test?.maxMarks}</p>
                        <p className="text-[9px] text-text-muted">Rank #{res.rank} • Grade {res.grade}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${res.percentage >= 75 ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                        {res.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-text-muted glass rounded-2xl border border-white/5">
                No recent tests recorded.
              </div>
            )}
          </div>

          {/* Homework lists */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-white">Assigned Homework & Assignments</h3>
            {homework && homework.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {homework.map((task) => (
                  <div key={task._id} className="glass rounded-xl p-4 border border-white/5 flex flex-col gap-2 justify-between text-xs">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-white text-sm leading-tight">{task.title}</h4>
                        <span className="text-[9px] text-red-400 shrink-0 font-mono">Due {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <p className="text-text-muted mt-1 leading-normal">{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-text-muted glass rounded-2xl border border-white/5">
                No active assignments for this student.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Attendance log history, notice alerts */}
        <div className="flex flex-col gap-6">
          {/* Recent announcements */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-white">Coaching Announcements</h3>
            <div className="flex flex-col gap-3">
              {announcements && announcements.length > 0 ? (
                announcements.map((ann) => (
                  <div key={ann._id} className="glass rounded-xl p-3 border border-white/5 text-xs flex flex-col gap-1">
                    <h4 className="font-bold text-white">{ann.title}</h4>
                    <p className="text-text-muted leading-relaxed text-[11px]">{ann.content}</p>
                    <span className="text-[9px] text-text-muted mt-1 self-end">{new Date(ann.date).toLocaleDateString()}</span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-text-muted glass rounded-2xl border border-white/5">
                  No announcements active.
                </div>
              )}
            </div>
          </div>

          {/* Attendance Log History */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-white">Recent Attendance Logs</h3>
            <div className="flex flex-col gap-2 bg-brand-secondary/25 border border-white/5 rounded-2xl p-4 max-h-[300px] overflow-y-auto">
              {attendanceLogs && attendanceLogs.length > 0 ? (
                attendanceLogs.map((log) => (
                  <div key={log._id} className="flex justify-between items-center text-xs py-1.5 border-b border-white/5 last:border-b-0">
                    <span className="text-text-muted font-semibold">{new Date(log.date).toLocaleDateString()}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.status === 'Present'
                        ? 'bg-green-500/15 text-green-400'
                        : log.status === 'Late'
                          ? 'bg-yellow-500/15 text-yellow-400'
                          : 'bg-red-500/15 text-red-400'
                      }`}>
                      {log.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-text-muted text-xs">
                  No attendance logs logged yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
