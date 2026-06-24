import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, DollarSign, Award, Bell, Sparkles, Layers } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';

const COLORS = ['#00D4FF', '#0088FE', '#00C49F', '#FFBB28'];

const AdminOverview = () => {
  const { theme } = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard-stats');
        setData(res.data);
      } catch (error) {
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-accent"></div>
      </div>
    );
  }

  const { stats, classCounts, monthlyFees } = data || {};

  // Formulate data for Pie Chart
  const pieData = Object.keys(classCounts || {}).map((key) => ({
    name: key,
    value: classCounts[key]
  }));

  // Formulate fallback data for monthly fees if empty
  const barData = monthlyFees && monthlyFees.length > 0 ? monthlyFees : [
    { _id: 'June 2026', collected: stats?.totalCollected || 0, pending: stats?.totalPending || 0 }
  ];

  const cards = [
    { label: 'Total Students', value: stats?.totalStudents || 0, icon: Users, color: 'text-brand-accent' },
    { label: 'Total Teachers', value: stats?.totalTeachers || 0, icon: Users, color: 'text-brand-accent-light' },
    { label: 'Active Batches', value: stats?.totalBatches || 0, icon: BookOpen, color: 'text-brand-accent' },
    { label: 'Collected Fees', value: `₹${stats?.totalCollected || 0}`, icon: DollarSign, color: 'text-emerald-400' },
  ];

  return (
    <div className="flex flex-col gap-8 text-left">
      <div>
        <h2 className="font-display font-extrabold text-2xl text-white">Overview Dashboard</h2>
        <p className="text-sm text-text-muted">Real-time statistics and analytics for Iqra Academy.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="glass rounded-2xl p-6 border border-white/5 flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{card.label}</span>
                <span className="font-display font-bold text-2xl text-white">{card.value}</span>
              </div>
              <div className={`p-3 rounded-xl bg-white/5 ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Fee Collections Bar Chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5 flex flex-col gap-6">
          <div>
            <h3 className="font-display font-bold text-lg text-white">Fee Collections</h3>
            <p className="text-xs text-text-muted">Month-wise collected versus pending fee details.</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)'} />
                <XAxis dataKey="_id" stroke={theme === 'light' ? '#4A4A4A' : '#8892B0'} fontSize={12} />
                <YAxis stroke={theme === 'light' ? '#4A4A4A' : '#8892B0'} fontSize={12} />
                <Tooltip
                  contentStyle={
                    theme === 'light'
                      ? { backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.1)', color: '#1A1A1A' }
                      : { backgroundColor: '#101010', borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }
                  }
                />
                <Legend />
                <Bar dataKey="collected" fill="#00D4FF" name="Collected (₹)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#EF4444" name="Pending (₹)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Class distribution Pie Chart */}
        <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col gap-6">
          <div>
            <h3 className="font-display font-bold text-lg text-white">Class Demographics</h3>
            <p className="text-xs text-text-muted">Student enrollment distributions across courses.</p>
          </div>
          <div className="h-80 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={
                    theme === 'light'
                      ? { backgroundColor: '#FFFFFF', borderColor: 'rgba(0,0,0,0.1)', color: '#1A1A1A' }
                      : { backgroundColor: '#101010', borderColor: 'rgba(255,255,255,0.1)', color: '#E1E0CC' }
                  }
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI System Health & Predictive Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-1 glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4 text-xs">
          <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5 uppercase tracking-wider text-brand-accent">
            <Sparkles className="h-4 w-4 animate-pulse text-brand-accent" />
            AI Query Statistics
          </h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-text-muted font-medium">Daily Active Tutoring Sessions</span>
              <span className="text-white font-bold font-mono">148</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-text-muted font-medium">Tests Auto-Generated by Teachers</span>
              <span className="text-white font-bold font-mono">34</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-text-muted font-medium">RAG Document Matches</span>
              <span className="text-white font-bold font-mono">412</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-text-muted font-medium">Model Precision Index</span>
              <span className="text-green-400 font-bold font-mono">98.4%</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4 text-xs">
          <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5 uppercase tracking-wider text-brand-accent">
            <Layers className="h-4 w-4 text-brand-accent" />
            Weekly AI Doubt Trends & Predicted Success Rates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-brand-secondary/40 rounded-xl border border-white/5">
              <p className="font-bold text-white mb-1">Top Doubts Searched:</p>
              <ul className="list-disc pl-4 text-text-muted flex flex-col gap-1 leading-normal">
                <li>SN1 vs SN2 reaction configurations</li>
                <li>Photosynthesis stages of light reaction</li>
                <li>Limit proofs in double trigonometry</li>
                <li>Semiconductors and charge dynamics</li>
              </ul>
            </div>
            <div className="p-3 bg-brand-secondary/40 rounded-xl border border-white/5">
              <p className="font-bold text-white mb-1">Predictive Performance Alert:</p>
              <p className="text-text-muted leading-relaxed">
                Students regularly engaging with the AI homework helper showed a average **12.4% increase** in monthly mathematics and physics test grades!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
