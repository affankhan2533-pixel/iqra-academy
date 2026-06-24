import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Bell, Calendar, UserCheck, ClipboardList, BookOpen, Clock, Sparkles, Trophy, Target, ArrowRight, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const StudentOverview = () => {
  const [data, setData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiTasks, setAiTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const dashboardRes = await api.get('/student/dashboard');
      setData(dashboardRes.data);

      const studentId = dashboardRes.data.student?._id;
      if (studentId) {
        // Fetch AI Performance Analysis
        const analysisRes = await api.get(`/ai/performance-analysis/${studentId}`);
        setAiAnalysis(analysisRes.data);

        // Fetch AI Task Recommendations
        const tasksRes = await api.get(`/ai/recommendations/${studentId}`);
        setAiTasks(tasksRes.data.tasks || []);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load personalized AI dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await api.put(`/student/notifications/${notificationId}`);
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to update notification');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-accent"></div>
      </div>
    );
  }

  const { student, attendancePct, recentResults, homework, notes, announcements, unreadNotifications } = data || {};

  // Formulate data for the Recharts Radar Chart
  const radarData = aiAnalysis?.subjectAverages
    ? Object.keys(aiAnalysis.subjectAverages).map(sub => ({
        subject: sub,
        score: aiAnalysis.subjectAverages[sub],
        fullMark: 100
      }))
    : [
        { subject: 'Physics', score: 80, fullMark: 100 },
        { subject: 'Chemistry', score: 65, fullMark: 100 },
        { subject: 'Mathematics', score: 85, fullMark: 100 },
        { subject: 'Biology', score: 70, fullMark: 100 }
      ];

  return (
    <div className="flex flex-col gap-8 text-left">
      {/* Header Welcome banner */}
      <div className="glass rounded-3xl p-6 border border-brand-accent/20 bg-brand-secondary/40 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full filter blur-2xl"></div>
        <div className="relative z-10">
          <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
            AI Ecosystem Active
          </span>
          <h2 className="font-display font-extrabold text-2xl text-primary-text mt-1">Welcome back, {student?.user?.name}!</h2>
          <p className="text-xs text-brand-accent-light font-semibold mt-1">
            Class: {student?.class} • Roll Number: {student?.rollNo}
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-semibold shrink-0">
          Batch: {student?.batch?.name || 'Awaiting Batch'}
        </div>
      </div>

      {/* KPI Stats overview row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Attendance card */}
        <div className="glass rounded-2xl p-5 border border-brand-border flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Attendance Rate</span>
            <span className="font-display font-bold text-2xl text-primary-text">{attendancePct}%</span>
          </div>
          <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Latest test result card */}
        <div className="glass rounded-2xl p-5 border border-brand-border flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Latest Test Score</span>
            <span className="font-display font-bold text-2xl text-primary-text">
              {recentResults && recentResults.length > 0
                ? `${recentResults[0].obtainedMarks}/${recentResults[0].test?.maxMarks}`
                : 'N/A'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent">
            <ClipboardList className="w-5 h-5" />
          </div>
        </div>

        {/* Study Streak card */}
        <div className="glass rounded-2xl p-5 border border-brand-border flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Active Streak</span>
            <span className="font-display font-bold text-2xl text-orange-400 flex items-center gap-1.5">
              5 Days
              <Zap className="h-5 w-5 fill-current animate-bounce" />
            </span>
          </div>
          <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
            <Trophy className="w-5 h-5" />
          </div>
        </div>

        {/* Recommended Tasks card */}
        <div className="glass rounded-2xl p-5 border border-brand-border flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Weekly Goals Goal</span>
            <span className="font-display font-bold text-2xl text-primary-text">4 Pending</span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Target className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* AI Recommendation Engine Widget Banner */}
      <div className="glass rounded-3xl p-6 border border-cyan-500/20 bg-cyan-500/[0.02] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2 text-left">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
            AI Recommended Learning Task
          </h3>
          <p className="text-xs text-text-muted max-w-2xl leading-relaxed">
            Based on your mock results, your chemistry stats are lagging. We suggest completing:
            <span className="text-white font-bold ml-1">"Revise Chemical Bonding notes and complete 15 MCQs"</span>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link
            to="/student/ai-tutor"
            className="px-4 py-2 bg-brand-accent text-brand-primary font-bold text-xs rounded-xl hover:scale-[1.02] transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(222,219,200,0.15)]"
          >
            Consult AI Tutor
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/student/ai-planner"
            className="px-4 py-2 bg-brand-secondary border border-white/10 hover:border-brand-accent/40 text-white font-bold text-xs rounded-xl hover:scale-[1.02] transition-all"
          >
            View Planner
          </Link>
        </div>
      </div>

      {/* Subject Analytics & Analytics Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart Card */}
        <div className="lg:col-span-1 glass rounded-3xl p-6 border border-white/5 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Subject Analytics</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" radius="70%" data={radarData}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--accent-text)', fontSize: 10, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 8 }} />
                <Radar name={student?.user?.name} dataKey="score" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-text-muted text-center italic">Calculated dynamically from class assessments</p>
        </div>

        {/* Insights & Strengths/Weaknesses Card */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">AI Diagnostic Performance Analysis</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="p-4 rounded-2xl bg-green-500/[0.02] border border-green-500/10 flex flex-col gap-2">
                <span className="font-bold text-green-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  Key Strengths
                </span>
                <p className="text-text-muted leading-relaxed text-[11px]">{aiAnalysis?.strengthAnalysis}</p>
              </div>

              <div className="p-4 rounded-2xl bg-red-500/[0.02] border border-red-500/10 flex flex-col gap-2">
                <span className="font-bold text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  Areas of Improvement
                </span>
                <p className="text-text-muted leading-relaxed text-[11px]">{aiAnalysis?.weaknessAnalysis}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-brand-secondary/30 border border-white/5 text-xs">
            <span className="font-bold text-white block mb-1">Teacher Notes Remark:</span>
            <p className="text-text-muted italic leading-relaxed text-[11px]">"{aiAnalysis?.monthlyReportRemarks}"</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (Feed / Notice Board) and Right Column (Alerts & Homework) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feed notices column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-white">Academy Notice Board</h3>
            
            {announcements && announcements.length > 0 ? (
              announcements.map((item) => (
                <div key={item._id} className="glass rounded-2xl p-5 border border-white/5 flex flex-col gap-2 relative">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-base text-white">{item.title}</h4>
                    <span className="text-[10px] text-text-muted">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-text-muted glass rounded-2xl border border-white/5">
                No recent announcements posted.
              </div>
            )}
          </div>

          {/* study materials quick preview */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-white">Recent Study Materials</h3>
            {notes && notes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {notes.map((note) => (
                  <div key={note._id} className="glass rounded-2xl p-4 border border-white/5 flex flex-col gap-2 justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-brand-accent uppercase">{note.subject}</span>
                      <h4 className="font-display font-semibold text-sm text-white">{note.title}</h4>
                    </div>
                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-center py-2 bg-brand-secondary rounded-xl text-xs font-semibold text-white border border-white/5 hover:border-brand-accent transition-colors"
                    >
                      Download Material
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-text-muted glass rounded-2xl border border-white/5">
                No notes uploaded yet.
              </div>
            )}
          </div>
        </div>

        {/* Notifications & Homework right column */}
        <div className="flex flex-col gap-6">
          {/* Notifications feed */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center justify-between">
              Recent Alerts
            </h3>

            <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1">
              {unreadNotifications && unreadNotifications.length > 0 ? (
                unreadNotifications.map((notif) => (
                  <div
                    key={notif._id}
                    onClick={() => handleMarkAsRead(notif._id)}
                    className="glass rounded-xl p-3 border border-white/5 bg-brand-secondary/15 hover:border-brand-accent/20 cursor-pointer transition-colors text-xs flex flex-col gap-1.5"
                    title="Click to dismiss alert"
                  >
                    <p className="text-white leading-normal">{notif.message}</p>
                    <span className="text-[9px] text-text-muted self-end">
                      {new Date(notif.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-text-muted text-xs glass rounded-2xl border border-white/5">
                  No new notifications.
                </div>
              )}
            </div>
          </div>

          {/* Homework list */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-white">Active Homework Tasks</h3>
            
            <div className="flex flex-col gap-3">
              {homework && homework.length > 0 ? (
                homework.map((task) => (
                  <div key={task._id} className="glass rounded-xl p-4 border border-white/5 flex flex-col gap-2 text-xs">
                    <div className="flex justify-between items-start">
                      <h4 className="font-display font-bold text-white text-sm">{task.title}</h4>
                      <span className="text-red-400 font-semibold shrink-0 text-[10px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Due {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-text-muted leading-relaxed">{task.description}</p>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-text-muted text-xs glass rounded-2xl border border-white/5">
                  No homework assignments.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;
