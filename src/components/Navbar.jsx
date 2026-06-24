import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard, GraduationCap, ChevronDown } from 'lucide-react';
import GSAPMagnetic from './animations/GSAPMagnetic';

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const getDashboardPath = () => {
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'teacher') return '/teacher';
    if (user?.role === 'student') return '/student';
    if (user?.role === 'parent') return '/parent';
    return '/';
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-6xl z-50 px-4 flex justify-center">
      {/* Floating Pill Bar */}
      <div className="glass rounded-full px-6 py-2.5 flex items-center justify-between w-full shadow-2xl relative">
        
        {/* Brand Logo */}
        <GSAPMagnetic strength={0.15}>
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <GraduationCap className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-sans font-extrabold text-sm tracking-wider text-primary">
              IQRA ACADEMY
            </span>
          </Link>
        </GSAPMagnetic>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className="text-[11px] font-bold text-primary-text/80 hover:text-primary transition-all uppercase tracking-widest"
          >
            Home
          </Link>

          {/* About Us Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredDropdown('about')}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <button className="flex items-center gap-1 text-[11px] font-bold text-primary-text/80 hover:text-primary transition-all uppercase tracking-widest cursor-pointer py-1">
              <span>About Us</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${hoveredDropdown === 'about' ? 'rotate-180' : ''}`} />
            </button>
            {hoveredDropdown === 'about' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-52 z-50">
                <div className="bg-bg-about border border-brand-border rounded-2xl p-2.5 shadow-2xl flex flex-col gap-1">
                  <Link to="/about" className="px-3 py-2 text-[10px] font-bold tracking-wider uppercase text-primary-text/70 hover:text-primary hover:bg-brand-primary rounded-xl transition-all">Story & Pillars</Link>
                  <Link to="/faculty" className="px-3 py-2 text-[10px] font-bold tracking-wider uppercase text-primary-text/70 hover:text-primary hover:bg-brand-primary rounded-xl transition-all">Faculty Profiles</Link>
                  <Link to="/gallery" className="px-3 py-2 text-[10px] font-bold tracking-wider uppercase text-primary-text/70 hover:text-primary hover:bg-brand-primary rounded-xl transition-all">Academy Gallery</Link>
                  <Link to="/testimonials" className="px-3 py-2 text-[10px] font-bold tracking-wider uppercase text-primary-text/70 hover:text-primary hover:bg-brand-primary rounded-xl transition-all">Student Reviews</Link>
                </div>
              </div>
            )}
          </div>

          {/* Academics Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredDropdown('academics')}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <button className="flex items-center gap-1 text-[11px] font-bold text-primary-text/80 hover:text-primary transition-all uppercase tracking-widest cursor-pointer py-1">
              <span>Academics</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${hoveredDropdown === 'academics' ? 'rotate-180' : ''}`} />
            </button>
            {hoveredDropdown === 'academics' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-52 z-50">
                <div className="bg-bg-about border border-brand-border rounded-2xl p-2.5 shadow-2xl flex flex-col gap-1">
                  <Link to="/courses" className="px-3 py-2 text-[10px] font-bold tracking-wider uppercase text-primary-text/70 hover:text-primary hover:bg-brand-primary rounded-xl transition-all">Courses Offered</Link>
                  <Link to="/results" className="px-3 py-2 text-[10px] font-bold tracking-wider uppercase text-primary-text/70 hover:text-primary hover:bg-brand-primary rounded-xl transition-all">Student Results</Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/admissions"
            className="text-[11px] font-bold text-primary-text/80 hover:text-primary transition-all uppercase tracking-widest"
          >
            Admissions
          </Link>
          <Link
            to="/contact"
            className="text-[11px] font-bold text-primary-text/80 hover:text-primary transition-all uppercase tracking-widest"
          >
            Contact
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <GSAPMagnetic strength={0.35}>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-primary-text/5 text-primary/80 hover:text-primary transition-all duration-200 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </GSAPMagnetic>

          {token && user ? (
            <div className="flex items-center gap-2">
              <Link
                to={getDashboardPath()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold tracking-wider uppercase text-primary hover:bg-primary hover:text-brand-button-text transition-all duration-300"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Portal
              </Link>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-full hover:bg-red-500/10 text-red-400/80 hover:text-red-400 transition-colors duration-200 cursor-pointer"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="whitespace-nowrap px-5 py-2 rounded-full bg-primary text-brand-button-text font-extrabold text-[10px] tracking-wider uppercase hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
            >
              Login / Portal
            </Link>
          )}
        </div>

        {/* Mobile Toggle Buttons */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <GSAPMagnetic strength={0.35}>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-primary-text/5 text-primary/80 hover:text-primary cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </GSAPMagnetic>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-full hover:bg-primary-text/5 text-primary cursor-pointer"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-16 left-4 right-4 bg-bg-card border border-brand-border rounded-[2rem] p-5 flex flex-col gap-2 shadow-2xl animate-fadeIn z-50">
          {[
            { label: 'Home', path: '/' },
            { label: 'Story & Pillars', path: '/about' },
            { label: 'Courses Offered', path: '/courses' },
            { label: 'Faculty Profiles', path: '/faculty' },
            { label: 'Student Results', path: '/results' },
            { label: 'Academy Gallery', path: '/gallery' },
            { label: 'Student Reviews', path: '/testimonials' },
            { label: 'Admissions Policy', path: '/admissions' },
            { label: 'Contact Us', path: '/contact' }
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-primary-text/5 text-[10px] font-bold tracking-wider uppercase text-primary-text/80 hover:text-primary transition-all text-left"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-brand-border flex items-center justify-between">
            {token && user ? (
              <div className="flex w-full gap-2">
                <Link
                  to={getDashboardPath()}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold tracking-wider uppercase text-primary hover:bg-primary hover:text-brand-button-text transition-all"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard Portal
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 rounded-full bg-primary text-brand-button-text font-extrabold text-[10px] tracking-wider uppercase shadow-md"
              >
                Login / Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
