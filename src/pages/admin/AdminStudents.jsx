import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { Search, Plus, Edit2, Trash2, X, Download, FileSpreadsheet } from 'lucide-react';
import StudentDetailModal from '../../components/StudentDetailModal';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('');

  // Modal control states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [studentClass, setStudentClass] = useState('SSC');
  const [batchId, setBatchId] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [address, setAddress] = useState('');
  const [feeStatus, setFeeStatus] = useState('Pending');
  const [totalFee, setTotalFee] = useState('0');
  const [paidFee, setPaidFee] = useState('0');

  // Detail Modal states
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null);

  const fetchData = async () => {
    try {
      const [studentsRes, batchesRes] = await Promise.all([
        api.get('/admin/students'),
        api.get('/admin/batches')
      ]);
      setStudents(studentsRes.data);
      setBatches(batchesRes.data);
    } catch (error) {
      toast.error('Failed to load students/batches data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingStudent(null);
    setName('');
    setEmail('');
    setPassword('');
    setRollNo('');
    setStudentClass('SSC');
    setBatchId('');
    setParentName('');
    setParentContact('');
    setAddress('');
    setFeeStatus('Pending');
    setTotalFee('0');
    setPaidFee('0');
    setModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setName(student.user?.name || '');
    setEmail(student.user?.email || '');
    setPassword(''); // leave blank if no password change
    setRollNo(student.rollNo);
    setStudentClass(student.class);
    setBatchId(student.batch?._id || '');
    setParentName(student.parentName);
    setParentContact(student.parentContact);
    setAddress(student.address);
    setFeeStatus(student.feeStatus);
    setTotalFee(student.totalFee !== undefined ? student.totalFee.toString() : '0');
    setPaidFee(student.paidFee !== undefined ? student.paidFee.toString() : '0');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !rollNo || !parentName || !parentContact || !address) {
      return toast.error('Please complete all required fields');
    }

    const payload = {
      name,
      email,
      rollNo,
      class: studentClass,
      batch: batchId || null,
      parentName,
      parentContact,
      address,
      feeStatus,
      totalFee: Number(totalFee),
      paidFee: Number(paidFee)
    };

    if (password) payload.password = password;

    try {
      if (editingStudent) {
        await api.put(`/admin/students/${editingStudent._id}`, payload);
        toast.success('Student updated successfully');
      } else {
        await api.post('/admin/students', payload);
        toast.success('Student added successfully');
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save student');
    }
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student and their login credentials?')) return;
    try {
      await api.delete(`/admin/students/${studentId}`);
      toast.success('Student deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  // Export to Excel using SheetJS
  const handleExportExcel = () => {
    const exportData = filteredStudents.map((s, idx) => ({
      'S.No': idx + 1,
      'Roll Number': s.rollNo,
      'Name': s.user?.name,
      'Email': s.user?.email,
      'Class': s.class,
      'Batch Name': s.batch?.name || 'N/A',
      'Parent Name': s.parentName,
      'Parent Contact': s.parentContact,
      'Address': s.address,
      'Fee Status': s.feeStatus,
      'Total Fee': s.totalFee || 0,
      'Paid Fee': s.paidFee || 0,
      'Remaining Fee': s.remainingFee || 0
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students List');
    XLSX.writeFile(workbook, 'Iqra_Academy_Students_List.xlsx');
    toast.success('Excel export complete!');
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter ? s.class === classFilter : true;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-white">Manage Students</h2>
          <p className="text-sm text-text-muted">Register, edit, and view all student profiles.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/50 text-white font-semibold text-xs transition-all duration-200 flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            Export Excel
          </button>
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-brand-accent text-brand-primary font-bold text-xs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(0,212,255,0.2)]"
          >
            <Plus className="w-4 h-4" />
            Add Student
          </button>
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

      {/* Students Data Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
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
                  <th className="p-4">Batch</th>
                  <th className="p-4">Parent Details</th>
                  <th className="p-4">Fee Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-text-muted divide-y divide-white/5">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s) => (
                    <tr key={s._id} className="hover:bg-white/5 transition-colors">
                      <td 
                        className="p-4 font-mono font-medium text-white cursor-pointer hover:text-brand-accent transition-colors"
                        onClick={() => {
                          setSelectedStudentForDetail(s);
                          setDetailModalOpen(true);
                        }}
                      >
                        {s.rollNo}
                      </td>
                      <td className="p-4 text-white">
                        <div 
                          className="flex flex-col cursor-pointer hover:text-brand-accent transition-colors group"
                          onClick={() => {
                            setSelectedStudentForDetail(s);
                            setDetailModalOpen(true);
                          }}
                        >
                          <span className="font-semibold">{s.user?.name}</span>
                          <span className="text-xs text-text-muted group-hover:text-white/80 transition-colors">{s.user?.email}</span>
                        </div>
                      </td>
                      <td className="p-4">{s.class}</td>
                      <td className="p-4">{s.batch?.name || <span className="text-red-400">Unassigned</span>}</td>
                      <td className="p-4">
                        <div className="flex flex-col text-xs">
                          <span>{s.parentName}</span>
                          <span>{s.parentContact}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold w-max ${
                              s.feeStatus === 'Paid'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : s.feeStatus === 'Pending'
                                ? 'bg-amber-500/10 text-amber-400'
                                : 'bg-red-500/10 text-red-400'
                            }`}
                          >
                            {s.feeStatus || 'Pending'}
                          </span>
                          <span className="text-[11px] text-text-muted font-medium">
                            Paid: ₹{(s.paidFee || 0).toLocaleString()} / ₹{(s.totalFee || 0).toLocaleString()}
                          </span>
                          {(s.remainingFee || 0) > 0 && (
                            <span className="text-[10px] text-amber-400 font-mono font-semibold">
                              Due: ₹{s.remainingFee.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(s)}
                            className="p-1.5 rounded-lg hover:bg-brand-accent/20 text-brand-accent transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(s._id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-text-muted">
                      No student records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CRUD Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl glass rounded-3xl border border-white/10 p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-fadeIn text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-display font-bold text-lg text-white">
                {editingStudent ? 'Edit Student Details' : 'Add New Student'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={editingStudent ? '•••••• (Leave blank for no change)' : '••••••'}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required={!editingStudent}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Roll Number</label>
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Class</label>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  >
                    <option value="SSC" className="bg-[#0A0E27]">SSC (Class 10)</option>
                    <option value="XI Science" className="bg-[#0A0E27]">XI Science</option>
                    <option value="XII Science" className="bg-[#0A0E27]">XII Science</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Batch Allocation</label>
                  <select
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  >
                    <option value="" className="bg-[#0A0E27]">No Batch Allocated</option>
                    {batches.map((b) => (
                      <option key={b._id} value={b._id} className="bg-[#0A0E27]">
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Fee Status</label>
                  <select
                    value={feeStatus}
                    onChange={(e) => setFeeStatus(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  >
                    <option value="Pending" className="bg-[#0A0E27]">Pending</option>
                    <option value="Paid" className="bg-[#0A0E27]">Paid</option>
                    <option value="Overdue" className="bg-[#0A0E27]">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Total Fee (₹)</label>
                  <input
                    type="number"
                    value={totalFee}
                    onChange={(e) => setTotalFee(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    placeholder="e.g. 50000"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Paid Fee (₹)</label>
                  <input
                    type="number"
                    value={paidFee}
                    onChange={(e) => setPaidFee(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    placeholder="e.g. 20000"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl text-xs">
                <span className="text-text-muted font-medium">Auto-Calculated Remaining Balance:</span>
                <span className={`font-mono font-bold text-sm ${(Number(totalFee) - Number(paidFee)) > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  ₹{(Number(totalFee) - Number(paidFee) || 0).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Parent Name</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Parent Contact</label>
                  <input
                    type="text"
                    value={parentContact}
                    onChange={(e) => setParentContact(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Residential Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="2"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl mt-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                {editingStudent ? 'Save Details' : 'Create Student Profile'}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Student Detail Modal */}
      <StudentDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        student={selectedStudentForDetail}
        onUpdate={fetchData}
      />
    </div>
  );
};

export default AdminStudents;
