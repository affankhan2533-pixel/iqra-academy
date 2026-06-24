import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Route Protection and Layouts
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './components/PublicLayout';
import PortalLayout from './components/PortalLayout';
import Loader from './components/Loader';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Courses from './pages/public/Courses';
import Faculty from './pages/public/Faculty';
import Results from './pages/public/Results';
import Gallery from './pages/public/Gallery';
import Testimonials from './pages/public/Testimonials';
import Contact from './pages/public/Contact';
import Admissions from './pages/public/Admissions';
import Login from './pages/Login';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminStudents from './pages/admin/AdminStudents';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminBatches from './pages/admin/AdminBatches';
import AdminFees from './pages/admin/AdminFees';
import AdminStudentFeesSummary from './pages/admin/AdminStudentFeesSummary';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';

// Admin AI Pages
import AdminAiKnowledge from './pages/admin/AdminAiKnowledge';

// Teacher AI Pages
import TeacherAiTestGen from './pages/teacher/TeacherAiTestGen';

// Student AI Pages
import StudentAiTutor from './pages/student/StudentAiTutor';
import StudentAiHomework from './pages/student/StudentAiHomework';
import StudentAiPlanner from './pages/student/StudentAiPlanner';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ParentReport from './pages/parent/ParentReport';
import ParentFeedback from './pages/parent/ParentFeedback';

// Teacher Pages
import TeacherOverview from './pages/teacher/TeacherOverview';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherResults from './pages/teacher/TeacherResults';
import TeacherAssignments from './pages/teacher/TeacherAssignments';
import TeacherNotes from './pages/teacher/TeacherNotes';

// Student Pages
import StudentOverview from './pages/student/StudentOverview';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentResults from './pages/student/StudentResults';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentNotes from './pages/student/StudentNotes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          {/* Global Premium Screen Entrance Animation */}
          <Loader />

          <Routes>
            {/* 1. PUBLIC WEBSITE ROUTES */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="courses" element={<Courses />} />
              <Route path="faculty" element={<Faculty />} />
              <Route path="results" element={<Results />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="contact" element={<Contact />} />
              <Route path="admissions" element={<Admissions />} />
            </Route>

            {/* 2. AUTHENTICATION ROUTE */}
            <Route path="/login" element={<Login />} />

            {/* 3. ADMIN PORTAL ROUTE (PROTECTED) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <PortalLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminOverview />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="batches" element={<AdminBatches />} />
              <Route path="fees" element={<AdminFees />} />
              <Route path="student-fees-summary" element={<AdminStudentFeesSummary />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="ai-knowledge" element={<AdminAiKnowledge />} />
            </Route>

            {/* 4. TEACHER PORTAL ROUTE (PROTECTED) */}
            <Route
              path="/teacher"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <PortalLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<TeacherOverview />} />
              <Route path="attendance" element={<TeacherAttendance />} />
              <Route path="results" element={<TeacherResults />} />
              <Route path="assignments" element={<TeacherAssignments />} />
              <Route path="notes" element={<TeacherNotes />} />
              <Route path="ai-test-gen" element={<TeacherAiTestGen />} />
            </Route>

            {/* 5. STUDENT PORTAL ROUTE (PROTECTED) */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <PortalLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<StudentOverview />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="results" element={<StudentResults />} />
              <Route path="assignments" element={<StudentAssignments />} />
              <Route path="notes" element={<StudentNotes />} />
              <Route path="ai-tutor" element={<StudentAiTutor />} />
              <Route path="ai-homework" element={<StudentAiHomework />} />
              <Route path="ai-planner" element={<StudentAiPlanner />} />
            </Route>

            {/* 6. PARENT PORTAL ROUTE (PROTECTED) */}
            <Route
              path="/parent"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <PortalLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ParentDashboard />} />
              <Route path="report" element={<ParentReport />} />
              <Route path="feedback" element={<ParentFeedback />} />
            </Route>

            {/* FALLBACK REDIRECT */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Toast Notification Container */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1A1F4B',
                color: '#fff',
                border: '1px solid rgba(0, 212, 255, 0.25)',
                borderRadius: '16px',
                fontSize: '14px'
              }
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
