import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Calendar, UserCheck, XCircle, Clock } from 'lucide-react';

const StudentAttendance = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get('/student/attendance');
        setData(res.data);
      } catch (error) {
        toast.error('Failed to load attendance logs');
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-accent"></div>
      </div>
    );
  }

  const { attendancePct, stats, logs } = data || {};

  const cards = [
    { label: 'Attendance Rate', value: `${attendancePct}%`, icon: UserCheck, color: 'text-brand-accent' },
    { label: 'Total lectures', value: stats?.totalDays || 0, icon: Calendar, color: 'text-white' },
    { label: 'Lectures Present', value: stats?.presentDays || 0, icon: UserCheck, color: 'text-emerald-400' },
    { label: 'Lectures Absent', value: stats?.absentDays || 0, icon: XCircle, color: 'text-red-400' },
  ];

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div>
        <h2 className="font-display font-extrabold text-2xl text-white">My Attendance Logs</h2>
        <p className="text-sm text-text-muted">Review your lecture attendance statistics and detailed daily records.</p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{card.label}</span>
                <span className="font-display font-bold text-xl text-white">{card.value}</span>
              </div>
              <div className={`p-2.5 rounded-xl bg-white/5 ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Logs Table */}
      <div className="glass rounded-2xl border border-white/5 overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-xs font-semibold uppercase tracking-wider text-white">
                <th className="p-4">Lecture Date</th>
                <th className="p-4">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-text-muted divide-y divide-white/5">
              {logs && logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-white font-medium">
                      {new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          log.status === 'Present'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : log.status === 'Absent'
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {log.status === 'Late' && <Clock className="w-3 h-3" />}
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="p-8 text-center">No attendance logs available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
