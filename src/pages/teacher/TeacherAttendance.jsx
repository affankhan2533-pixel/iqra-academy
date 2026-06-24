import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Calendar, UserCheck, Check, Save } from 'lucide-react';

const TeacherAttendance = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loadingBatches, setLoadingBatches] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState({}); // studentId -> status

  // Fetch teacher's batches
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await api.get('/teacher/batches');
        setBatches(res.data);
        if (res.data.length > 0) {
          setSelectedBatchId(res.data[0]._id);
        }
      } catch (error) {
        toast.error('Failed to load assigned batches');
      } finally {
        setLoadingBatches(false);
      }
    };
    fetchBatches();
  }, []);

  // Update students checklist whenever batch changes
  useEffect(() => {
    if (!selectedBatchId) return;

    const selectedBatch = batches.find((b) => b._id === selectedBatchId);
    if (selectedBatch) {
      setStudents(selectedBatch.students || []);
      
      // Initialize all student attendance statuses as 'Present' by default
      const defaultRecords = {};
      (selectedBatch.students || []).forEach((student) => {
        defaultRecords[student._id] = 'Present';
      });
      setAttendanceRecords(defaultRecords);
    }
  }, [selectedBatchId, batches]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAllPresent = () => {
    const updated = {};
    students.forEach((student) => {
      updated[student._id] = 'Present';
    });
    setAttendanceRecords(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (students.length === 0) return toast.error('No students in selected batch');

    // Structure records payload: [{ studentId, status }]
    const records = Object.keys(attendanceRecords).map((studentId) => ({
      studentId,
      status: attendanceRecords[studentId]
    }));

    try {
      await api.post('/teacher/attendance', {
        batchId: selectedBatchId,
        date,
        attendanceRecords: records
      });
      toast.success('Attendance records saved successfully');
    } catch (error) {
      toast.error('Failed to save attendance logs');
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div>
        <h2 className="font-display font-extrabold text-2xl text-white">Mark Attendance</h2>
        <p className="text-sm text-text-muted">Take daily attendance rolls for your assigned batches.</p>
      </div>

      {loadingBatches ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-accent"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Select Batch</label>
              <select
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
              >
                {batches.map((b) => (
                  <option key={b._id} value={b._id} className="bg-[#0A0E27]">
                    {b.name} ({b.course?.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleMarkAllPresent}
                className="w-full py-2.5 bg-white/5 border border-white/10 hover:border-brand-accent/40 rounded-xl text-sm font-semibold text-white transition-all duration-200"
              >
                Reset All to Present
              </button>
            </div>
          </div>

          {/* Student attendance Checklist sheet */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-xs font-semibold uppercase tracking-wider text-white">
                      <th className="p-4">Roll No</th>
                      <th className="p-4">Student Name</th>
                      <th className="p-4 text-center">Present</th>
                      <th className="p-4 text-center">Absent</th>
                      <th className="p-4 text-center">Late</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-text-muted divide-y divide-white/5">
                    {students.length > 0 ? (
                      students.map((student) => {
                        const currentStatus = attendanceRecords[student._id] || 'Present';
                        return (
                          <tr key={student._id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-mono font-medium text-white">{student.rollNo}</td>
                            <td className="p-4 text-white font-semibold">{student.user?.name}</td>
                            
                            {/* Present Button option */}
                            <td className="p-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleStatusChange(student._id, 'Present')}
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center mx-auto transition-all ${
                                  currentStatus === 'Present'
                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                    : 'border-white/10 hover:border-white/20'
                                }`}
                              >
                                {currentStatus === 'Present' && <Check className="w-4 h-4" />}
                              </button>
                            </td>

                            {/* Absent Button option */}
                            <td className="p-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleStatusChange(student._id, 'Absent')}
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center mx-auto transition-all ${
                                  currentStatus === 'Absent'
                                    ? 'bg-red-500/20 border-red-500 text-red-400'
                                    : 'border-white/10 hover:border-white/20'
                                }`}
                              >
                                {currentStatus === 'Absent' && <Check className="w-4 h-4" />}
                              </button>
                            </td>

                            {/* Late Button option */}
                            <td className="p-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleStatusChange(student._id, 'Late')}
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center mx-auto transition-all ${
                                  currentStatus === 'Late'
                                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                                    : 'border-white/10 hover:border-white/20'
                                }`}
                              >
                                {currentStatus === 'Late' && <Check className="w-4 h-4" />}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-text-muted">
                          No students enrolled in this batch.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl flex items-center justify-center gap-2 w-full sm:w-fit self-end shadow-md hover:scale-[1.01] transition-transform"
            >
              <Save className="w-4 h-4" />
              Save Attendance Sheet
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TeacherAttendance;
