import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Compass, CheckCircle, Sparkles, TrendingUp, Calendar, Trophy, Send, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentAiPlanner = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  
  // Counselor Form State
  const [favoriteSubjects, setFavoriteSubjects] = useState('');
  const [performance, setPerformance] = useState('Average');
  const [interests, setInterests] = useState('');
  const [goals, setGoals] = useState('');
  const [loadingCounsel, setLoadingCounsel] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  // Load daily recommendations
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const studentId = user?.details?._id;
        if (studentId) {
          const res = await api.get(`/ai/recommendations/${studentId}`);
          setTasks(res.data.tasks || []);
        }
      } catch (error) {
        console.error('Failed to load daily recommendations:', error);
      } finally {
        setLoadingTasks(false);
      }
    };
    fetchTasks();
  }, [user]);

  const handleCounselSubmit = async (e) => {
    e.preventDefault();
    if (!favoriteSubjects || !interests || !goals) {
      return toast.error('Please fill in all the counseling fields');
    }

    setLoadingCounsel(true);
    setRoadmap(null);
    try {
      const res = await api.post('/ai/career-counsel', {
        favoriteSubjects,
        performance,
        interests,
        goals
      });
      setRoadmap(res.data.roadmap);
      toast.success('Career consultation report generated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to consult AI counselor.');
    } finally {
      setLoadingCounsel(false);
    }
  };

  const toggleTaskCompleted = (id) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    toast.success('Task status updated! Keep up the study streak!');
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

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="w-10 h-10 rounded-xl bg-brand-secondary flex items-center justify-center border border-brand-accent/20">
          <Compass className="h-5 w-5 text-brand-accent" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white">AI Study Planner & Career Counselor</h2>
          <p className="text-xs text-text-muted">Personalized daily preparation recommendations and educational roadmap design</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* Left column: Study planner (Daily Tasks, Streaks) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Daily Tasks Dashboard */}
          <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-accent" />
                AI Daily Tasks
              </h3>
              <span className="text-[10px] bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded font-mono">
                {tasks.filter(t => t.completed).length}/{tasks.length} Done
              </span>
            </div>

            {loadingTasks ? (
              <div className="py-6 text-center animate-pulse text-xs text-text-muted">Loading daily tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="py-6 text-center text-xs text-text-muted">No daily tasks available. Run performance test.</div>
            ) : (
              <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTaskCompleted(task.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                      task.completed
                        ? 'bg-green-500/[0.03] border-green-500/20 opacity-70'
                        : 'bg-brand-secondary/20 border-white/5 hover:border-brand-accent/20 hover:bg-brand-secondary/40'
                    }`}
                  >
                    <CheckCircle
                      className={`h-5 w-5 shrink-0 mt-0.5 transition-colors duration-200 ${
                        task.completed ? 'text-green-500' : 'text-text-muted hover:text-white'
                      }`}
                    />
                    <div className="text-left flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2">
                        <p className={`text-xs font-semibold ${task.completed ? 'line-through text-text-muted' : 'text-white'}`}>
                          {task.title}
                        </p>
                        <span className="text-[9px] bg-white/5 text-text-muted px-1.5 py-0.5 rounded">
                          {task.duration}
                        </span>
                      </div>
                      <p className="text-[10px] text-text-muted mt-1 leading-normal truncate">{task.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Study Streak & Streak Goal */}
          <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4 text-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-left flex items-center gap-2">
              <Trophy className="h-4 w-4 text-brand-accent" />
              Study Streak Dashboard
            </h3>
            <div className="flex justify-center items-baseline gap-1.5 my-3">
              <span className="text-4xl font-extrabold text-brand-accent">5</span>
              <span className="text-xs text-text-muted font-bold uppercase">Days Active</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-accent w-[71%] rounded-full" />
            </div>
            <p className="text-[10px] text-text-muted leading-relaxed">
              You are on a **5-day streak**! Keep completing tasks daily to secure your weekly review badge. 🎯
            </p>
          </div>
        </div>

        {/* Right column: AI Career Counselor */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-accent" />
              AI Career Consultation
            </h3>
            <p className="text-xs text-text-muted">
              Not sure which entrance exam (JEE, NEET, etc.) or courses to target? Input your details to receive college, skill and career paths.
            </p>

            <form onSubmit={handleCounselSubmit} className="flex flex-col gap-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Favorite Subjects</label>
                  <input
                    type="text"
                    value={favoriteSubjects}
                    onChange={(e) => setFavoriteSubjects(e.target.value)}
                    placeholder="e.g. Physics, Calculus, Coding"
                    className="w-full bg-brand-secondary/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-text-muted focus:border-brand-accent outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Academic Performance</label>
                  <select
                    value={performance}
                    onChange={(e) => setPerformance(e.target.value)}
                    className="w-full bg-brand-secondary/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-accent outline-none"
                  >
                    <option value="Excellent">Excellent (&gt;90%)</option>
                    <option value="Good">Good (75% - 90%)</option>
                    <option value="Average">Average (60% - 75%)</option>
                    <option value="Need Improvement">Need Improvement (&lt;60%)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-muted uppercase">Your General Interests</label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g. Solving logic puzzles, robotics, writing, biology labs"
                  className="w-full bg-brand-secondary/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-text-muted focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-muted uppercase">Your Career Goals</label>
                <input
                  type="text"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="e.g. Software engineer at top tech firm, research scientist, Doctor"
                  className="w-full bg-brand-secondary/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-text-muted focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loadingCounsel}
                className="py-3 rounded-xl bg-brand-accent text-brand-primary font-bold text-xs hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loadingCounsel ? (
                  <div className="h-4 w-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Analyze Profile & Generate Roadmap
                    <Compass className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Consultation Output */}
          {roadmap && (
            <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4 animate-fadeIn">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2 flex items-center gap-2">
                <Award className="h-4 w-4 text-brand-accent" />
                AI Career Roadmap & Suggestions
              </h3>
              <div
                className="text-xs leading-relaxed text-text-muted flex flex-col gap-2 markdown-roadmap"
                dangerouslySetInnerHTML={{ __html: formatText(roadmap) }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAiPlanner;
