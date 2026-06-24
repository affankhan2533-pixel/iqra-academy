import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import api from '../utils/api';
import { GraduationCap, Mail, Lock, ArrowRight, User, Sparkles, BookOpen, UserCheck, HelpCircle, Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();

  // Common Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);

  // Student Fields
  const [rollNo, setRollNo] = useState('');
  const [studentClass, setStudentClass] = useState('SSC');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [address, setAddress] = useState('');

  // Parent Fields
  const [studentRollNo, setStudentRollNo] = useState('');

  // Teacher Fields
  const [subjects, setSubjects] = useState('');
  const [qualifications, setQualifications] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('Please enter email and password');
    }

    setLoading(true);
    try {
      if (isRegisterMode) {
        // Prepare role-specific profile payload
        let profileData = {};
        if (role === 'student') {
          profileData = { rollNo, class: studentClass, parentName, parentContact, address };
        } else if (role === 'teacher') {
          profileData = { subjects: subjects.split(',').map(s => s.trim()), qualifications };
        } else if (role === 'parent') {
          profileData = { studentRollNo };
        }

        // Call Register API
        await api.post('/auth/register', {
          name,
          email,
          password,
          role,
          profileData
        });

        // Auto Log In after registration
        const loggedUser = await login(email, password);
        toast.success(`Account created! Welcome, ${loggedUser.name}!`);

        // Redirect based on role
        if (loggedUser.role === 'admin') navigate('/admin');
        else if (loggedUser.role === 'teacher') navigate('/teacher');
        else if (loggedUser.role === 'student') navigate('/student');
        else if (loggedUser.role === 'parent') navigate('/parent');
      } else {
        // Log In Mode
        const user = await login(email, password);
        toast.success(`Welcome back, ${user.name}!`);
        
        // Redirect based on role
        if (user.role === 'admin') navigate('/admin');
        else if (user.role === 'teacher') navigate('/teacher');
        else if (user.role === 'student') navigate('/student');
        else if (user.role === 'parent') navigate('/parent');
        else navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error(error || 'Action failed. Please verify credentials or details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary flex items-center justify-center p-6 relative overflow-y-auto">
      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          type="button"
          className="p-2.5 rounded-full bg-brand-secondary/40 border border-brand-border text-brand-accent hover:bg-brand-secondary/80 transition-all duration-200 cursor-pointer shadow-md"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Background glowing circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-accent/5 filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-accent-light/5 filter blur-3xl"></div>

      <div className="w-full max-w-lg glass rounded-3xl p-8 relative z-10 border border-brand-border my-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-secondary border border-brand-accent/30 flex items-center justify-center glow-cyan shadow-[0_0_20px_rgba(0,212,255,0.1)]">
            <GraduationCap className="h-8 w-8 text-brand-accent" />
          </div>
          <h2 className="font-display font-extrabold text-2xl tracking-tight text-brand-accent mt-4">
            {isRegisterMode ? 'Create Account' : 'Portal Log In'}
          </h2>
          <p className="text-xs text-text-muted">
            {isRegisterMode ? 'Sign up for Hi-Fi Classes Portal access' : 'Access your Iqra Academy dashboard'}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-brand-secondary/60 p-1 rounded-2xl border border-brand-border mb-6">
          <button
            type="button"
            onClick={() => setIsRegisterMode(false)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
              !isRegisterMode
                ? 'bg-brand-accent text-brand-primary shadow-lg font-extrabold'
                : 'text-text-muted hover:text-brand-accent'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegisterMode(true)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
              isRegisterMode
                ? 'bg-brand-accent text-brand-primary shadow-lg font-extrabold'
                : 'text-text-muted hover:text-brand-accent'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          {/* Name Field (Only in Register Mode) */}
          {isRegisterMode && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider pl-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-brand-secondary/60 border border-brand-border rounded-2xl text-xs text-brand-accent placeholder-text-muted focus:border-brand-accent focus:bg-brand-secondary outline-none transition-all"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider pl-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 bg-brand-secondary/60 border border-brand-border rounded-2xl text-xs text-brand-accent placeholder-text-muted focus:border-brand-accent focus:bg-brand-secondary outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider pl-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-brand-secondary/60 border border-brand-border rounded-2xl text-xs text-brand-accent placeholder-text-muted focus:border-brand-accent focus:bg-brand-secondary outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Role Dropdown & Role Specific Fields (Only in Register Mode) */}
          {isRegisterMode && (
            <div className="flex flex-col gap-4 border-t border-brand-border pt-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider pl-1">
                  Choose Portal Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-brand-secondary/60 border border-brand-border rounded-2xl px-4 py-3 text-xs text-brand-accent focus:border-brand-accent outline-none"
                >
                  <option value="student" className="bg-brand-primary text-brand-accent">Student</option>
                  <option value="parent" className="bg-brand-primary text-brand-accent">Parent</option>
                  <option value="teacher" className="bg-brand-primary text-brand-accent">Teacher</option>
                </select>
              </div>

              {/* Student Role Fields */}
              {role === 'student' && (
                <div className="flex flex-col gap-3.5 bg-brand-secondary/40 p-4 rounded-2xl border border-brand-border animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-text-muted uppercase">Class</label>
                      <select
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        className="bg-brand-secondary/60 border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-accent focus:border-brand-accent outline-none"
                      >
                        <option value="SSC" className="bg-brand-primary text-brand-accent">SSC (Class 10)</option>
                        <option value="XI Science" className="bg-brand-primary text-brand-accent">XI Science</option>
                        <option value="XII Science" className="bg-brand-primary text-brand-accent">XII Science</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-text-muted uppercase">Roll Number</label>
                      <input
                        type="text"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        placeholder="e.g. XIS-204"
                        className="bg-brand-secondary/60 border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-accent outline-none focus:border-brand-accent"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-text-muted uppercase">Parent Name</label>
                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Father/Mother Name"
                      className="bg-brand-secondary/60 border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-accent outline-none focus:border-brand-accent"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-text-muted uppercase">Parent Contact Phone</label>
                    <input
                      type="tel"
                      value={parentContact}
                      onChange={(e) => setParentContact(e.target.value)}
                      placeholder="e.g. 9876543219"
                      className="bg-brand-secondary/60 border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-accent outline-none focus:border-brand-accent"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-text-muted uppercase">Address Details</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Dharavi, Mumbai, Maharashtra 400017"
                      className="bg-brand-secondary/60 border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-accent outline-none focus:border-brand-accent"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Parent Role Fields */}
              {role === 'parent' && (
                <div className="flex flex-col gap-3 bg-brand-secondary/40 p-4 rounded-2xl border border-brand-border animate-fadeIn">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-text-muted uppercase">Student Roll Number</label>
                    <input
                      type="text"
                      value={studentRollNo}
                      onChange={(e) => setStudentRollNo(e.target.value)}
                      placeholder="Enter child's Roll Number (e.g. XIIS-301)"
                      className="bg-brand-secondary/60 border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-accent outline-none focus:border-brand-accent font-mono"
                      required
                    />
                  </div>
                  <p className="text-[9px] text-brand-accent flex items-start gap-1 leading-normal">
                    <HelpCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>Provide the exact Roll Number issued to your child. This maps your dashboard to their test grades and attendance logs.</span>
                  </p>
                </div>
              )}

              {/* Teacher Role Fields */}
              {role === 'teacher' && (
                <div className="flex flex-col gap-3 bg-brand-secondary/40 p-4 rounded-2xl border border-brand-border animate-fadeIn">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-text-muted uppercase">Subjects (Comma separated)</label>
                    <input
                      type="text"
                      value={subjects}
                      onChange={(e) => setSubjects(e.target.value)}
                      placeholder="Physics, Chemistry"
                      className="bg-brand-secondary/60 border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-accent outline-none focus:border-brand-accent"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-text-muted uppercase">Qualifications</label>
                    <input
                      type="text"
                      value={qualifications}
                      onChange={(e) => setQualifications(e.target.value)}
                      placeholder="M.Sc. in Physics, B.Ed."
                      className="bg-brand-secondary/60 border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-accent outline-none focus:border-brand-accent"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-2xl bg-brand-accent text-brand-primary font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(222,219,200,0.1)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {isRegisterMode ? 'Register & Log In' : 'Sign In to Dashboard'}
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode Link */}
        <div className="mt-5 text-center text-xs">
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            type="button"
            className="text-brand-accent hover:text-brand-accent-light font-semibold transition-colors cursor-pointer"
          >
            {isRegisterMode ? 'Already have an account? Sign in' : 'New to Iqra Academy? Create an account'}
          </button>
        </div>

        {/* Info Box */}
        {!isRegisterMode && (
          <div className="mt-6 pt-5 border-t border-brand-border text-center text-[10px] text-text-muted flex flex-col gap-1 leading-normal font-sans">
            <p className="font-semibold text-brand-accent">Test credentials — make sure backend &amp; MongoDB are running:</p>
            <div className="grid grid-cols-2 gap-2 mt-1.5 font-mono text-[9px] bg-brand-secondary/50 p-3 rounded-xl border border-brand-border text-left">
              <div>Admin: <span className="text-brand-accent block font-medium">admin@iqra.com</span></div>
              <div>Password: <span className="text-brand-accent block font-medium">adminpassword</span></div>
              <div className="border-t border-brand-border pt-1 mt-1">Teacher: <span className="text-brand-accent block font-medium">shakeel@iqra.com</span></div>
              <div className="border-t border-brand-border pt-1 mt-1">Password: <span className="text-brand-accent block font-medium">teacherpassword</span></div>
              <div className="border-t border-brand-border pt-1 mt-1">Student: <span className="text-brand-accent block font-medium">amit@student.com</span></div>
              <div className="border-t border-brand-border pt-1 mt-1">Password: <span className="text-brand-accent block font-medium">studentpassword</span></div>
              <div className="border-t border-brand-border pt-1 mt-1">Parent: <span className="text-brand-accent block font-medium">ramesh@parent.com</span></div>
              <div className="border-t border-brand-border pt-1 mt-1">Password: <span className="text-brand-accent block font-medium">parentpassword</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
