import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Search, Plus, DollarSign, X, Check, FileText } from 'lucide-react';

const AdminFees = () => {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal control states
  const [billModalOpen, setBillModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Form states (Creating fee requirement)
  const [studentId, setStudentId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [month, setMonth] = useState('June 2026');

  const fetchData = async () => {
    try {
      const [feesRes, studentsRes] = await Promise.all([
        api.get('/admin/fees'),
        api.get('/admin/students')
      ]);
      setFees(feesRes.data);
      setStudents(studentsRes.data);
      if (studentsRes.data.length > 0) {
        setStudentId(studentsRes.data[0]._id);
      }
    } catch (error) {
      toast.error('Failed to load fee information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openBillModal = () => {
    setAmount('');
    setDueDate('');
    setMonth('June 2026');
    setBillModalOpen(true);
  };

  const handleCreateBill = async (e) => {
    e.preventDefault();
    if (!studentId || !amount || !dueDate) {
      return toast.error('Please complete all required fields');
    }

    try {
      await api.post('/admin/fees', {
        studentId,
        amount: Number(amount),
        dueDate,
        month
      });
      toast.success('Fee bill raised successfully');
      setBillModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to create fee bill');
    }
  };

  const handleCollectFee = async (feeId) => {
    if (!window.confirm('Collect payment for this record?')) return;

    try {
      await api.put(`/admin/fees/${feeId}`, {
        status: 'Paid',
        paidDate: new Date()
      });
      toast.success('Payment recorded successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to update payment');
    }
  };

  const openReceiptModal = (fee) => {
    setSelectedReceipt(fee);
    setReceiptModalOpen(true);
  };

  const filteredFees = fees.filter((f) =>
    f.student?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.student?.rollNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.month?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-white">Fee Management</h2>
          <p className="text-sm text-text-muted">Track collections, raised invoices, and record student dues payments.</p>
        </div>
        <button
          onClick={openBillModal}
          className="px-4 py-2.5 rounded-xl bg-brand-accent text-brand-primary font-bold text-xs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Raise Invoices
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by student name, roll number, or month..."
          className="w-full pl-11 pr-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white placeholder-text-muted focus:border-brand-accent outline-none"
        />
      </div>

      {/* Fees logs table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[45vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-accent"></div>
        </div>
      ) : (
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5 text-xs font-semibold uppercase tracking-wider text-white">
                  <th className="p-4">Student</th>
                  <th className="p-4">Roll No</th>
                  <th className="p-4">Month</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-text-muted divide-y divide-white/5">
                {filteredFees.length > 0 ? (
                  filteredFees.map((f) => (
                    <tr key={f._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white font-semibold">{f.student?.user?.name}</td>
                      <td className="p-4 font-mono">{f.student?.rollNo}</td>
                      <td className="p-4">{f.month}</td>
                      <td className="p-4 text-white font-semibold">₹{f.amount}</td>
                      <td className="p-4">{new Date(f.dueDate).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            f.status === 'Paid'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : f.status === 'Pending'
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {f.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          {f.status !== 'Paid' ? (
                            <button
                              onClick={() => handleCollectFee(f._id)}
                              className="px-2.5 py-1 rounded bg-brand-accent/20 border border-brand-accent/30 text-brand-accent hover:bg-brand-accent hover:text-brand-primary text-xs font-bold transition-all"
                            >
                              Collect Payment
                            </button>
                          ) : (
                            <button
                              onClick={() => openReceiptModal(f)}
                              className="p-1.5 rounded hover:bg-white/10 text-white flex items-center gap-1.5 text-xs font-medium"
                              title="View Receipt"
                            >
                              <FileText className="w-4 h-4 text-brand-accent" />
                              Receipt
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center">No fee billing records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bill Raising Modal */}
      {billModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md glass rounded-3xl border border-white/10 p-6 flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="font-display font-bold text-lg text-white">Raise Invoice</h3>
              <button onClick={() => setBillModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleCreateBill} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Select Student</label>
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                >
                  {students.map((s) => (
                    <option key={s._id} value={s._id} className="bg-[#0A0E27]">
                      {s.user?.name} ({s.rollNo})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Fee Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="4000"
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  />
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
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Billing Month</label>
                <input
                  type="text"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="June 2026"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <button type="submit" className="w-full py-3 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl mt-2">
                Raise Bill
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Receipt Modal Display */}
      {receiptModalOpen && selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md glass rounded-3xl border border-white/10 p-6 flex flex-col gap-5 text-left animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-brand-accent" />
                Fee Payment Receipt
              </h3>
              <button onClick={() => setReceiptModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Receipt details details */}
            <div className="flex flex-col gap-4 bg-brand-secondary/30 border border-white/5 p-5 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Receipt Number:</span>
                <span className="text-xs font-mono text-white font-semibold">{selectedReceipt.receiptNo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Student Name:</span>
                <span className="text-xs text-white font-semibold">{selectedReceipt.student?.user?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Standard:</span>
                <span className="text-xs font-mono text-white">{selectedReceipt.student?.rollNo}</span>
              </div>
              <hr className="border-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Billing Cycle:</span>
                <span className="text-xs text-white">{selectedReceipt.month}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Paid Date:</span>
                <span className="text-xs text-white">
                  {selectedReceipt.paidDate ? new Date(selectedReceipt.paidDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-brand-accent/20 pt-3">
                <span className="text-sm font-bold text-white">Amount Paid:</span>
                <span className="text-sm font-extrabold text-brand-accent">₹{selectedReceipt.amount}</span>
              </div>
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="w-full py-3 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl"
            >
              Print Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFees;
