import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, Users, BookOpen } from 'lucide-react';

const AdminBatches = () => {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('batches');

  // Modal control states
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingBatch, setEditingBatch] = useState(null);

  // Course Form states
  const [courseName, setCourseName] = useState('');
  const [courseSubjects, setCourseSubjects] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('1 Year');
  const [courseFee, setCourseFee] = useState('');

  // Batch Form states
  const [batchName, setBatchName] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);
  const [batchSchedule, setBatchSchedule] = useState('');
  const [batchRoom, setBatchRoom] = useState('Room 309');

  const fetchData = async () => {
    try {
      const [batchesRes, coursesRes, teachersRes] = await Promise.all([
        api.get('/admin/batches'),
        api.get('/admin/courses'),
        api.get('/admin/teachers')
      ]);
      setBatches(batchesRes.data);
      setCourses(coursesRes.data);
      setTeachers(teachersRes.data);
    } catch (error) {
      toast.error('Failed to load courses or batches data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Course Handlers
  const openCourseAddModal = () => {
    setEditingCourse(null);
    setCourseName('');
    setCourseSubjects('');
    setCourseDescription('');
    setCourseDuration('1 Year');
    setCourseFee('');
    setCourseModalOpen(true);
  };

  const openCourseEditModal = (course) => {
    setEditingCourse(course);
    setCourseName(course.name);
    setCourseSubjects(course.subjects.join(', '));
    setCourseDescription(course.description || '');
    setCourseDuration(course.duration);
    setCourseFee(course.fee);
    setCourseModalOpen(true);
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !courseSubjects || !courseFee) {
      return toast.error('Please complete all required fields');
    }

    const payload = {
      name: courseName,
      subjects: courseSubjects.split(',').map((s) => s.trim()),
      description: courseDescription,
      duration: courseDuration,
      fee: Number(courseFee)
    };

    try {
      if (editingCourse) {
        await api.put(`/admin/courses/${editingCourse._id}`, payload);
        toast.success('Course updated successfully');
      } else {
        await api.post('/admin/courses', payload);
        toast.success('Course created successfully');
      }
      setCourseModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to save course');
    }
  };

  const handleCourseDelete = async (courseId) => {
    if (!window.confirm('Delete this course? Note: This does not delete assigned batches.')) return;
    try {
      await api.delete(`/admin/courses/${courseId}`);
      toast.success('Course deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  // Batch Handlers
  const openBatchAddModal = () => {
    setEditingBatch(null);
    setBatchName('');
    setSelectedCourseId(courses[0]?._id || '');
    setSelectedTeacherIds([]);
    setBatchSchedule('');
    setBatchRoom('Room 309');
    setBatchModalOpen(true);
  };

  const openBatchEditModal = (batch) => {
    setEditingBatch(batch);
    setBatchName(batch.name);
    setSelectedCourseId(batch.course?._id || '');
    setSelectedTeacherIds(batch.teachers.map((t) => t._id));
    setBatchSchedule(batch.schedule);
    setBatchRoom(batch.room);
    setBatchModalOpen(true);
  };

  const handleTeacherToggle = (teacherId) => {
    if (selectedTeacherIds.includes(teacherId)) {
      setSelectedTeacherIds(selectedTeacherIds.filter((id) => id !== teacherId));
    } else {
      setSelectedTeacherIds([...selectedTeacherIds, teacherId]);
    }
  };

  const handleBatchSubmit = async (e) => {
    e.preventDefault();
    if (!batchName || !selectedCourseId || !batchSchedule) {
      return toast.error('Please complete batch name and schedule');
    }

    const payload = {
      name: batchName,
      course: selectedCourseId,
      teachers: selectedTeacherIds,
      schedule: batchSchedule,
      room: batchRoom
    };

    try {
      if (editingBatch) {
        await api.put(`/admin/batches/${editingBatch._id}`, payload);
        toast.success('Batch updated successfully');
      } else {
        await api.post('/admin/batches', payload);
        toast.success('Batch created successfully');
      }
      setBatchModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to save batch');
    }
  };

  const handleBatchDelete = async (batchId) => {
    if (!window.confirm('Delete this batch? Assigned students will be set to no batch.')) return;
    try {
      await api.delete(`/admin/batches/${batchId}`);
      toast.success('Batch deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete batch');
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        {/* Navigation Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('batches')}
            className={`font-display font-bold text-lg pb-1.5 border-b-2 transition-all ${
              activeTab === 'batches' ? 'text-brand-accent border-brand-accent' : 'text-text-muted border-transparent'
            }`}
          >
            Manage Batches
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`font-display font-bold text-lg pb-1.5 border-b-2 transition-all ${
              activeTab === 'courses' ? 'text-brand-accent border-brand-accent' : 'text-text-muted border-transparent'
            }`}
          >
            Manage Courses
          </button>
        </div>

        <button
          onClick={activeTab === 'batches' ? openBatchAddModal : openCourseAddModal}
          className="px-4 py-2.5 rounded-xl bg-brand-accent text-brand-primary font-bold text-xs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {activeTab === 'batches' ? 'Add Batch' : 'Add Course'}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-accent"></div>
        </div>
      ) : activeTab === 'batches' ? (
        /* Batches View List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.length > 0 ? (
            batches.map((batch) => (
              <div key={batch._id} className="glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-brand-accent/30 transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">
                      {batch.course?.name}
                    </span>
                    <div className="flex gap-1.5">
                      <button onClick={() => openBatchEditModal(batch)} className="p-1 rounded hover:bg-white/10 text-white">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleBatchDelete(batch._id)} className="p-1 rounded hover:bg-red-500/20 text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">{batch.name}</h3>
                  <div className="flex flex-col gap-1 text-xs text-text-muted font-medium">
                    <span>🕒 {batch.schedule}</span>
                    <span>📍 Room: {batch.room}</span>
                  </div>
                  
                  {/* Instructor brief */}
                  <div className="mt-2 text-xs">
                    <span className="font-bold text-white block mb-1">Instructors:</span>
                    <div className="flex flex-wrap gap-1">
                      {batch.teachers?.length > 0 ? (
                        batch.teachers.map((t) => (
                          <span key={t._id} className="px-2 py-0.5 rounded bg-brand-secondary border border-white/5 text-white text-[10px]">
                            {t.user?.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-red-400">No teachers assigned</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5 text-xs text-text-muted font-semibold">
                  <Users className="w-4 h-4 text-brand-accent" />
                  <span>{batch.students?.length || 0} Students enrolled</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-text-muted">No batches created yet.</div>
          )}
        </div>
      ) : (
        /* Courses View List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="glass rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-brand-accent/30 transition-all">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 font-mono">
                      ₹{course.fee}
                    </span>
                    <div className="flex gap-1.5">
                      <button onClick={() => openCourseEditModal(course)} className="p-1 rounded hover:bg-white/10 text-white">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleCourseDelete(course._id)} className="p-1 rounded hover:bg-red-500/20 text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">{course.name}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{course.description || 'No description provided.'}</p>
                  
                  <div className="mt-2 text-xs">
                    <span className="font-bold text-white block mb-1">Subjects Covered:</span>
                    <div className="flex flex-wrap gap-1">
                      {course.subjects.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5 text-xs text-text-muted font-semibold">
                  <BookOpen className="w-4 h-4 text-brand-accent" />
                  <span>Duration: {course.duration}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-text-muted">No courses created yet.</div>
          )}
        </div>
      )}

      {/* Course CRUD Modal */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md glass rounded-3xl border border-white/10 p-6 flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="font-display font-bold text-lg text-white">
                {editingCourse ? 'Edit Course Details' : 'Add New Course'}
              </h3>
              <button onClick={() => setCourseModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleCourseSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Course Name</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g. XI Science"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Subjects (Comma separated)</label>
                <input
                  type="text"
                  value={courseSubjects}
                  onChange={(e) => setCourseSubjects(e.target.value)}
                  placeholder="Physics, Chemistry, Mathematics"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Duration</label>
                  <input
                    type="text"
                    value={courseDuration}
                    onChange={(e) => setCourseDuration(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Fee (₹)</label>
                  <input
                    type="number"
                    value={courseFee}
                    onChange={(e) => setCourseFee(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Description</label>
                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  rows="2"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none resize-none"
                />
              </div>

              <button type="submit" className="w-full py-3 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl mt-2">
                Save Course
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Batch CRUD Modal */}
      {batchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md glass rounded-3xl border border-white/10 p-6 flex flex-col gap-4 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="font-display font-bold text-lg text-white">
                {editingBatch ? 'Edit Batch Details' : 'Create New Batch'}
              </h3>
              <button onClick={() => setBatchModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleBatchSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Batch Name</label>
                <input
                  type="text"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  placeholder="e.g. XII Sci 2026 Batch A"
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Associated Course</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                  required
                >
                  {courses.map((c) => (
                    <option key={c._id} value={c._id} className="bg-[#0A0E27]">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Schedule</label>
                  <input
                    type="text"
                    value={batchSchedule}
                    onChange={(e) => setBatchSchedule(e.target.value)}
                    placeholder="Mon-Fri 4-7 PM"
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Room</label>
                  <input
                    type="text"
                    value={batchRoom}
                    onChange={(e) => setBatchRoom(e.target.value)}
                    className="px-4 py-2.5 bg-brand-secondary/40 border border-white/5 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    required
                  />
                </div>
              </div>

              {/* Teachers Checklist Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-1">Assign Teachers</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {teachers.map((t) => {
                    const isChecked = selectedTeacherIds.includes(t._id);
                    return (
                      <button
                        type="button"
                        key={t._id}
                        onClick={() => handleTeacherToggle(t._id)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-200 text-left ${
                          isChecked
                            ? 'bg-brand-accent/20 border-brand-accent text-brand-accent'
                            : 'bg-brand-secondary/40 border-white/10 text-text-muted'
                        }`}
                      >
                        {t.user?.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-brand-accent text-brand-primary font-bold text-sm rounded-xl mt-2">
                Save Batch
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBatches;
