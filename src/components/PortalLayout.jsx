import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  GraduationCap,
  Users,
  BookOpen,
  DollarSign,
  ClipboardList,
  Bell,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Home,
  UserCheck,
  FileText,
  Bookmark,
  Landmark
} from 'lucide-react';

const PortalLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getSidebarLinks = () => {
    const role = user?.role;
    if (role === 'admin') {
      return [
        { label: 'Overview', path: '/admin', icon: Home },
        { label: 'Manage Students', path: '/admin/students', icon: Users },
        { label: 'Manage Teachers', path: '/admin/teachers', icon: Users },
        { label: 'Courses & Batches', path: '/admin/batches', icon: BookOpen },
        { label: 'Fee Management', path: '/admin/fees', icon: DollarSign },
        { label: 'Student Fees Ledger', path: '/admin/student-fees-summary', icon: Landmark },
        { label: 'Announcements', path: '/admin/announcements', icon: Bell },
        { label: 'AI Knowledge Base', path: '/admin/ai-knowledge', icon: Bookmark },
      ];
    }
    if (role === 'teacher') {
      return [
        { label: 'Overview', path: '/teacher', icon: Home },
        { label: 'Mark Attendance', path: '/teacher/attendance', icon: UserCheck },
        { label: 'Tests & Results', path: '/teacher/results', icon: ClipboardList },
        { label: 'Assignments', path: '/teacher/assignments', icon: FileText },
        { label: 'Study Materials', path: '/teacher/notes', icon: Bookmark },
        { label: 'AI Test Generator', path: '/teacher/ai-test-gen', icon: BookOpen },
      ];
    }
    if (role === 'student') {
      return [
        { label: 'Overview', path: '/student', icon: Home },
        { label: 'My Attendance', path: '/student/attendance', icon: UserCheck },
        { label: 'Test Results', path: '/student/results', icon: ClipboardList },
        { label: 'Homework', path: '/student/assignments', icon: FileText },
        { label: 'Study Notes', path: '/student/notes', icon: Bookmark },
        { label: 'AI Study Tutor', path: '/student/ai-tutor', icon: GraduationCap },
        { label: 'AI Homework Helper', path: '/student/ai-homework', icon: FileText },
        { label: 'AI Study Planner', path: '/student/ai-planner', icon: BookOpen },
      ];
    }
    if (role === 'parent') {
      return [
        { label: 'Overview', path: '/parent', icon: Home },
        { label: 'Performance Report', path: '/parent/report', icon: ClipboardList },
        { label: 'Teacher Feedback', path: '/parent/feedback', icon: Bell },
      ];
    }
    return [];
  };

  const links = getSidebarLinks();

  return (
    <div className="flex h-screen bg-brand-primary overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-bg-about border-r border-brand-border h-full">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-brand-border">
          <Link to="/" className="flex items-center gap-2 group">
            <GraduationCap className="h-7 w-7 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-sans font-extrabold text-lg tracking-tight text-primary">
              IQRA ACADEMY
            </span>
          </Link>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-primary-text/60 hover:bg-primary-text/5 hover:text-primary-text border border-transparent'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-brand-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-sm">
          <div className="w-64 bg-bg-about border-r border-brand-border h-full flex flex-col animate-slideIn">
            <div className="p-6 border-b border-brand-border flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <GraduationCap className="h-7 w-7 text-primary" />
                <span className="font-sans font-extrabold text-lg tracking-tight text-primary">
                  IQRA
                </span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-primary-text/10"
              >
                <X className="h-5 w-5 text-primary-text" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-primary-text/60 hover:bg-primary-text/5 hover:text-primary-text border border-transparent'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-brand-border">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-brand-primary border-b border-brand-border px-6 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-primary-text/10"
            >
              <Menu className="h-5 w-5 text-primary-text" />
            </button>
            <h1 className="font-sans font-extrabold text-lg text-primary-text capitalize hidden sm:block">
              {user?.role} Portal
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-primary-text/10 transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-500" />
              )}
            </button>

            {/* Profile Brief Info */}
            <div className="flex items-center gap-3 pl-4 border-l border-brand-border">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                alt={user?.name}
                className="h-8 w-8 rounded-full object-cover border border-brand-border"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-primary-text leading-tight">{user?.name}</p>
                <p className="text-xs text-primary-text/60 capitalize leading-none">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic page content wrapper */}
        <main className="flex-grow p-6 overflow-y-auto bg-brand-primary">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
