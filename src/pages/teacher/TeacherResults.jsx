import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Plus, X, Award, FileText, ClipboardList, Check, Save } from 'lucide-react';

const TeacherResults = () => {
  const [batches, setBatches] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal control states
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [marksModalOpen, setMarksModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  // New Test Form states
  const [testName, setTestName] = useState('');
  const [testSubject, setTestSubject] = useState('');
  const [testClass, setTestClass] = useState('SSC');
  const [batchId, setBatchId] = useState('');
  const [testDate, setTestDate] = useState('');
  const [maxMarks, setMaxMarks] = useState('50');

  // Student Marks Form states (studentId -> obtainedMarks, remarks)
  const [marksRecords, setMarksRecords] = useState({});
  const [remarksRecords, setRemarksRecords] = useState({});
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    try {
      const [batchesRes, testsRes] = await Promise.all([
        api.get('/teacher/batches'),
        api.get('/teacher/tests')
      ]);
      setBatches(batchesRes.data);
      setTests(testsRes.data);
      if (batchesRes.data.length > 0) {
        setBatchId(batchesRes.data[0]._id);
        setTestSubject(batchesRes.data[0].course?.subjects[0] || 'Mathematics');
      }
    } catch (error) {
      toast.error('Failed to load tests/batches data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update subject automatically depending on class selection
  const handleBatchSelectChange = (e) => {
    const selectedId = e.target.value;
    setBatchId(selectedId);
    const selected = batches.find((b) => b._id === selectedId);
    if (selected) {
      setTestClass(selected.course?.name === 'SSC (Class 10)' ? 'SSC' : selected.course?.name || 'SSC');
      setTestSubject(selected.course?.subjects[0] || 'Mathematics');
    }
  };

  const handleCreateTest = async (e) => {
    e.preventDefault();
    if (!testName || !testSubject || !testDate || !maxMarks) {
      return toast.error('Please complete all required fields');
    }

    try {
      await api.post('/teacher/tests', {
        name: testName,
        subject: testSubject,
        class: testClass,
        batchId,
        date: testDate,
        maxMarks: Number(maxMarks)
      });
      toast.success('Monthly test raised successfully');
      setTestModalOpen(false);
      setTestName('');
      fetchData();
    } catch (error) {
      toast.error('Failed to create test record');
    }
  };

  const openMarksUploadModal = async (test) => {
    setSelectedTest(test);
    setStudents(test.batch?.students || []);
    
    // Fetch existing results for this test if any
    try {
      const res = await api.get(`/teacher/results/${test._id}`);
      const obtained = {};
      const remarks = {};
      
      // Populate already uploaded marks
      res.data.forEach((r) => {
        const sId = r.student?._id || r.student;
        if (sId) {
          obtained[sId] = r.obtainedMarks;
          remarks[sId] = r.remarks;
        }
      });

      // Fill in defaults for others
      (test.batch?.students || []).forEach((student) => {
        const studentId = typeof student === 'string' ? student : student?._id;
        if (studentId) {
          if (obtained[studentId] === undefined) {
            obtained[studentId] = '';
            remarks[studentId] = '';
          }
        }
      });

      setMarksRecords(obtained);
      setRemarksRecords(remarks);
      setMarksModalOpen(true);
    } catch (error) {
      toast.error('Failed to fetch existing marks');
    }
  };

  const handleMarksChange = (studentId, value) => {
    setMarksRecords((prev) => ({
      ...prev,
      [studentId]: value
    }));
  };

  const handleRemarksChange = (studentId, value) => {
    setRemarksRecords((prev) => ({
      ...prev,
      [studentId]: value
    }));
  };

  const handleSaveMarks = async (e) => {
    e.preventDefault();
    
    try {
      // Structure records: [{ studentId, obtainedMarks, remarks }]
      const records = Object.keys(marksRecords)
        .filter((studentId) => studentId && studentId !== 'undefined')
        .map((studentId) => {
          const marksVal = marksRecords[studentId];
          if (marksVal === '' || isNaN(marksVal)) {
            throw new Error('Marks must be numeric value for all students');
          }
          if (Number(marksVal) > selectedTest.maxMarks) {
            throw new Error(`Obtained marks cannot exceed Max Marks (${selectedTest.maxMarks})`);
          }
          return {
            studentId,
            obtainedMarks: Number(marksVal),
            remarks: remarksRecords[studentId] || ''
          };
        });

      await api.post('/teacher/results', {
        testId: selectedTest._id,
        marksRecords: records
      });
      toast.success('Marks and grades updated successfully');
      setMarksModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.message || 'Failed to save test marks');
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-white">Tests & Marks Portal</h2>
          <p className="text-sm text-text-muted">Create monthly assessments and enter student result sheets.</p>
        </div>
        <button
          onClick={() => setTestModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-accent text-brand-primary font-bold text-xs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Test
        </button>
      </div>

      {/* Test List Table */}
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
                  <th className="p-4">Test Name</th>
                  <th className="p-4">Class</th>
                  <th className="p-4">Batch</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Max Marks</th>
                  <th className="p-4">Test Date</th>
                  <th className="p-4 text-center">Marks Sheet</th>
                </tr>
              </thead>
              <tbody className="text-sm text-text-muted divide-y divide-white/5">
                {tests.length > 0 ? (
                  tests.map((test) => (
                    <tr key={test._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white font-semibold">{test.name}</td>
                      <td className="p-4">{test.class}</td>
                      <td className="p-4">{test.batch?.name}</td>
                      <td className="p-4 text-white">{test.subject}</td>
                      <td className="p-4 font-mono">{test.maxMarks}</td>
                      <td className="p-4">{new Date(test.date).toLocaleDateString()}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => openMarksUploadModal(test)}
                          className="px-3 py-1.5 rounded-lg bg-brand-accent/20 border border-brand-accent/30 text-brand-accent hover:bg-brand-accent hover:text-brand-primary text-xs font-bold transition-all flex items-center gap-1.5 mx-auto"
                        >
                          <ClipboardList className="w-3.5 h-3.5" />
                          Update Scores
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center">No assessments created.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Test Creation Modal */}
      {testModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md glass rounded-3xl border border-white/10 p-6 flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="font-display font-bold text-lg text-white">Create Test</h3>
              <button onClick={() => setTestModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Test Title</label>
                <input
                  type="text"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="e.g. Unit Test 1"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Batch</label>
                <select
                  value={batchId}
                  onChange={handleBatchSelectChange}
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                >
                  {batches.map((b) => (
                    <option key={b._id} value={b._id} className="bg-[#0A0E27]">
                      {b.name} ({b.course?.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Subject</label>
                  <select
                    value={testSubject}
                    onChange={(e) => setTestSubject(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  >
                    {batches.find((b) => b._id === batchId)?.course?.subjects.map((sub) => (
                      <option key={sub} value={sub} className="bg-[#0A0E27]">{sub}</option>
                    )) || <option value="Mathematics" className="bg-[#0A0E27]">Mathematics</option>}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Max Marks</label>
                  <input
                    type="number"
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Test Date</label>
                <input
                  type="date"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <button type="submit" className="w-full py-3 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl mt-2">
                Raise Assessment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Marks Upload Modal Form */}
      {marksModalOpen && selectedTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl glass rounded-3xl border border-white/10 p-6 flex flex-col gap-4 text-left max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex flex-col">
                <h3 className="font-display font-bold text-lg text-white">Upload Test Scores</h3>
                <span className="text-xs text-text-muted">{selectedTest.name} • Max Marks: {selectedTest.maxMarks}</span>
              </div>
              <button onClick={() => setMarksModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveMarks} className="flex flex-col gap-5">
              <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-3 pr-2">
                {students.map((student) => {
                  const studentId = typeof student === 'string' ? student : student?._id;
                  const studentName = (typeof student === 'object' && student?.user?.name) ? student.user.name : `Student (${studentId?.substring(studentId.length - 4) || 'Unknown'})`;
                  const studentRoll = (typeof student === 'object' && student?.rollNo) ? student.rollNo : 'N/A';
                  
                  return (
                    <div key={studentId} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-brand-secondary/20 p-4 rounded-xl border border-white/5">
                      <div className="flex flex-col shrink-0">
                        <span className="text-sm font-semibold text-white">{studentName}</span>
                        <span className="text-[10px] font-mono text-text-muted">Roll: {studentRoll}</span>
                      </div>

                      <div className="flex gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-muted shrink-0">Marks:</span>
                          <input
                            type="number"
                            value={marksRecords[studentId] ?? ''}
                            onChange={(e) => handleMarksChange(studentId, e.target.value)}
                            placeholder="Obtained"
                            max={selectedTest.maxMarks}
                            className="w-20 px-3 py-1.5 bg-brand-secondary border border-white/10 rounded-lg text-sm text-white focus:border-brand-accent outline-none text-center"
                            required
                          />
                        </div>
                        <input
                          type="text"
                          value={remarksRecords[studentId] ?? ''}
                          onChange={(e) => handleRemarksChange(studentId, e.target.value)}
                          placeholder="Teacher Remarks (optional)"
                          className="flex-grow sm:w-48 px-3 py-1.5 bg-brand-secondary border border-white/10 rounded-lg text-xs text-white focus:border-brand-accent outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Marks & Compute Grades
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherResults;
