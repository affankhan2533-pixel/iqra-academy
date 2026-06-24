import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { Search, Plus, Edit2, Trash2, X, FileSpreadsheet } from 'lucide-react';

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal control states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [qualifications, setQualifications] = useState('');

  const fetchData = async () => {
    try {
      const res = await api.get('/admin/teachers');
      setTeachers(res.data);
    } catch (error) {
      toast.error('Failed to load teachers data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingTeacher(null);
    setName('');
    setEmail('');
    setPassword('');
    setSubjects([]);
    setQualifications('');
    setModalOpen(true);
  };

  const openEditModal = (teacher) => {
    setEditingTeacher(teacher);
    setName(teacher.user?.name || '');
    setEmail(teacher.user?.email || '');
    setPassword('');
    setSubjects(teacher.subjects);
    setQualifications(teacher.qualifications);
    setModalOpen(true);
  };

  const handleSubjectToggle = (subject) => {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter((s) => s !== subject));
    } else {
      setSubjects([...subjects, subject]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !qualifications || subjects.length === 0) {
      return toast.error('Please complete all required fields and select at least one subject');
    }

    const payload = {
      name,
      email,
      subjects,
      qualifications
    };

    if (password) payload.password = password;

    try {
      if (editingTeacher) {
        await api.put(`/admin/teachers/${editingTeacher._id}`, payload);
        toast.success('Teacher updated successfully');
      } else {
        await api.post('/admin/teachers', payload);
        toast.success('Teacher added successfully');
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save teacher');
    }
  };

  const handleDelete = async (teacherId) => {
    if (!window.confirm('Are you sure you want to delete this teacher and their login credentials?')) return;
    try {
      await api.delete(`/admin/teachers/${teacherId}`);
      toast.success('Teacher deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete teacher');
    }
  };

  const handleExportExcel = () => {
    const exportData = filteredTeachers.map((t, idx) => ({
      'S.No': idx + 1,
      'Name': t.user?.name,
      'Email': t.user?.email,
      'Subjects Taught': t.subjects.join(', '),
      'Qualifications': t.qualifications,
      'Joining Date': new Date(t.joiningDate).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Teachers List');
    XLSX.writeFile(workbook, 'Iqra_Academy_Teachers_List.xlsx');
    toast.success('Excel export complete!');
  };

  const filteredTeachers = teachers.filter((t) =>
    t.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subjects?.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-white">Manage Teachers</h2>
          <p className="text-sm text-text-muted">Register, edit, and view all faculty profile records.</p>
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
            Add Teacher
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by teacher name or subjects..."
          className="w-full pl-11 pr-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white placeholder-text-muted focus:border-brand-accent focus:bg-brand-secondary/80 outline-none transition-all duration-300"
        />
      </div>

      {/* Teachers Data Table */}
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
                  <th className="p-4">Faculty Name</th>
                  <th className="p-4">Subjects Taught</th>
                  <th className="p-4">Qualifications</th>
                  <th className="p-4">Joining Date</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-text-muted divide-y divide-white/5">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((t) => (
                    <tr key={t._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white">
                        <div className="flex flex-col">
                          <span className="font-semibold">{t.user?.name}</span>
                          <span className="text-xs text-text-muted">{t.user?.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1.5">
                          {t.subjects.map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">{t.qualifications}</td>
                      <td className="p-4">{new Date(t.joiningDate).toLocaleDateString()}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(t)}
                            className="p-1.5 rounded-lg hover:bg-brand-accent/20 text-brand-accent transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(t._id)}
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
                    <td colSpan="5" className="p-8 text-center text-text-muted">
                      No teacher records found.
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
          <div className="w-full max-w-xl glass rounded-3xl border border-white/10 p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-fadeIn text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="font-display font-bold text-lg text-white">
                {editingTeacher ? 'Edit Teacher Details' : 'Add New Teacher'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Faculty Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={editingTeacher ? '•••••• (Leave blank for no change)' : '••••••'}
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required={!editingTeacher}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Qualifications</label>
                <input
                  type="text"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  placeholder="e.g. M.Sc. in Physics, 8+ Years Exp"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              {/* Subjects Checklist Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Subjects Taught</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Science'].map((subject) => {
                    const isChecked = subjects.includes(subject);
                    return (
                      <button
                        type="button"
                        key={subject}
                        onClick={() => handleSubjectToggle(subject)}
                        className={`py-2 px-4 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                          isChecked
                            ? 'bg-brand-accent/20 border-brand-accent text-brand-accent'
                            : 'bg-brand-secondary/40 border-white/10 text-text-muted hover:border-white/20'
                        }`}
                      >
                        {subject}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl mt-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                {editingTeacher ? 'Save Details' : 'Create Teacher Profile'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeachers;
