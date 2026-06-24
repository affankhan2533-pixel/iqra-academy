import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Search, Printer, DollarSign, CheckCircle, AlertTriangle, Eye, Edit2 } from 'lucide-react';
import StudentDetailModal from '../../components/StudentDetailModal';

const AdminStudentFeesSummary = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('');

  // Details Modal controls
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/admin/students');
      setStudents(res.data);
    } catch (error) {
      toast.error('Failed to load students fee summary data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate dynamic stats
  let totalExpected = 0;
  let totalCollected = 0;
  let totalOutstanding = 0;

  students.forEach((s) => {
    totalExpected += s.totalFee || 0;
    totalCollected += s.paidFee || 0;
    totalOutstanding += s.remainingFee || 0;
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter ? s.class === classFilter : true;
    return matchesSearch && matchesClass;
  });

  const handleOpenDetails = (student) => {
    setSelectedStudent(student);
    setDetailModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-white">Student Fees Summary</h2>
          <p className="text-sm text-text-muted">Monitor fees structures, payments, and outstanding balances across classes.</p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Expected</span>
            <span className="font-display font-bold text-2xl text-white">₹{totalExpected.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-brand-accent">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Collected</span>
            <span className="font-display font-bold text-2xl text-emerald-400">₹{totalCollected.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Outstanding Dues</span>
            <span className="font-display font-bold text-2xl text-amber-400">₹{totalOutstanding.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name or roll number..."
            className="w-full pl-11 pr-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white placeholder-text-muted focus:border-brand-accent focus:bg-brand-secondary/80 outline-none transition-all duration-300"
          />
        </div>
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none transition-all duration-300"
        >
          <option value="" className="bg-[#0A0E27] text-white">All Classes</option>
          <option value="SSC" className="bg-[#0A0E27] text-white">SSC (Class 10)</option>
          <option value="XI Science" className="bg-[#0A0E27] text-white">XI Science</option>
          <option value="XII Science" className="bg-[#0A0E27] text-white">XII Science</option>
        </select>
      </div>

      {/* Fees List Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[35vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-accent"></div>
        </div>
      ) : (
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5 text-xs font-semibold uppercase tracking-wider text-white">
                  <th className="p-4">Roll No</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Class</th>
                  <th className="p-4">Total Fee</th>
                  <th className="p-4">Paid Fee</th>
                  <th className="p-4">Remaining Fee</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-text-muted divide-y divide-white/5">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s) => (
                    <tr key={s._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono font-medium text-white">{s.rollNo}</td>
                      <td 
                        className="p-4 text-white font-semibold cursor-pointer hover:text-brand-accent transition-colors"
                        onClick={() => handleOpenDetails(s)}
                      >
                        {s.user?.name}
                      </td>
                      <td className="p-4">{s.class}</td>
                      <td className="p-4 text-white font-mono">₹{(s.totalFee || 0).toLocaleString()}</td>
                      <td className="p-4 text-emerald-400 font-semibold font-mono">₹{(s.paidFee || 0).toLocaleString()}</td>
                      <td className="p-4 text-amber-400 font-semibold font-mono">₹{(s.remainingFee || 0).toLocaleString()}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            s.feeStatus === 'Paid'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {s.feeStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenDetails(s)}
                            className="p-1.5 rounded-lg bg-brand-accent/10 border border-brand-accent/20 text-brand-accent hover:bg-brand-accent hover:text-brand-primary transition-all flex items-center gap-1 text-xs font-semibold"
                            title="View / Print Statement"
                          >
                            <Eye className="w-4 h-4" />
                            View Ledger
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-text-muted">
                      No student records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Ledger & Print Modal */}
      <StudentDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        student={selectedStudent}
        onUpdate={fetchData}
      />
    </div>
  );
};

export default AdminStudentFeesSummary;
