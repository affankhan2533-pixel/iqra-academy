import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, FileText, CheckCircle, GraduationCap, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import WordsPullUpMultiStyle from '../../components/animations/WordsPullUpMultiStyle';

const Admissions = () => {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [contact, setContact] = useState('');
  const [targetClass, setTargetClass] = useState('SSC');
  const [subjects, setSubjects] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { step: '1', title: 'Submit Inquiry', desc: 'Fill the online admissions inquiry form below or visit Dharavi branch.' },
    { step: '2', title: 'Counseling & Discussion', desc: 'Our head faculty meets with parent & student to discuss career path & batch availability.' },
    { step: '3', title: 'Enrollment & Batch Allocation', desc: 'Complete fee formalities and get batch timings and study materials allocated.' }
  ];

  const handleSubjectChange = (subject) => {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter((s) => s !== subject));
    } else {
      setSubjects([...subjects, subject]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName || !contact || !parentName) {
      return toast.error('Please complete Name, Parent Name, and Contact Number');
    }

    setSubmitted(true);
    toast.success('Admissions inquiry submitted successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16 text-left">
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <WordsPullUpMultiStyle
          segments={[
            { text: 'Admissions Policy &', className: 'font-sans font-extrabold text-primary-text text-4xl md:text-5xl tracking-tight' },
            { text: 'Process', className: 'font-serif italic text-primary font-normal text-4xl md:text-5xl tracking-tight' }
          ]}
          className="justify-start gap-y-2"
        />
        <p className="text-base md:text-lg text-primary-text/80 leading-relaxed font-sans mt-2">
          A transparent, step-by-step enrollment pathway for Class 10th and Junior College Science.
        </p>
      </div>

      {/* Step by Step Admissions Flow */}
      <div className="flex flex-col gap-8">
        <h2 className="font-sans font-extrabold text-2xl text-primary-text">How To Enroll</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((s, index) => (
            <div
              key={s.step}
              className="bg-bg-about rounded-[2rem] p-8 border border-brand-border flex gap-4 items-start relative shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-sans font-extrabold flex items-center justify-center text-lg shrink-0">
                {s.step}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-sans font-bold text-primary-text text-base">{s.title}</h3>
                <p className="text-xs text-primary-text/70 leading-relaxed">{s.desc}</p>
              </div>
              {index < 2 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-primary-text/10 z-10">
                  <ChevronRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Checklist and Inquiry Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Checklist */}
        <div className="flex flex-col gap-6">
          <h2 className="font-sans font-extrabold text-2xl text-primary-text flex items-center gap-3">
            <ClipboardList className="w-6 h-6 text-primary" />
            Admissions Checklist
          </h2>
          <p className="text-sm text-primary-text/70 leading-relaxed">
            Please bring photocopy records of these documents for the enrollment meeting:
          </p>

          <div className="flex flex-col gap-4 mt-2">
            {[
              { title: 'Academic Record Transcripts', detail: 'Photocopy of previous class final marksheet (Class 9 for SSC, Class 10 Board for XI/XII Sci).' },
              { title: 'Identity Proof Verification', detail: 'Photocopy of Aadhar Card of Student and Parent.' },
              { title: 'Recent Photographs', detail: 'Three passport-size color photographs of the student.' },
              { title: 'School Leaving Certificate', detail: 'School leaving certificate or College transfer certificate copy (where applicable).' }
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start border-b border-brand-border pb-4 last:border-b-0">
                <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-sm text-primary-text">{item.title}</span>
                  <span className="text-xs text-primary-text/70 mt-0.5 leading-relaxed">{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admissions Inquiry Form */}
        <div className="bg-bg-features rounded-[2rem] p-8 border border-brand-border relative shadow-xl">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
              <CheckCircle className="w-16 h-16 text-primary animate-bounce" />
              <h3 className="font-sans font-bold text-xl text-primary-text">Application Received!</h3>
              <p className="text-sm text-primary-text/70 max-w-xs leading-relaxed">
                Thank you for applying to Iqra Academy. Our academic head will review and coordinate an enrollment session with you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h3 className="font-sans font-bold text-xl text-primary-text flex items-center gap-2 mb-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                Admissions Inquiry Form
              </h3>

              {/* Student Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-primary-text/60 uppercase tracking-wider pl-1">
                  Student Full Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full px-4 py-3 bg-brand-primary border border-brand-border rounded-xl text-sm text-primary-text placeholder-primary-text/30 focus:border-primary outline-none transition-all duration-300"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Parent Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-primary-text/60 uppercase tracking-wider pl-1">
                    Parent/Guardian Name
                  </label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Ramesh Sharma"
                    className="w-full px-4 py-3 bg-brand-primary border border-brand-border rounded-xl text-sm text-primary-text placeholder-primary-text/30 focus:border-primary outline-none transition-all duration-300"
                    required
                  />
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-primary-text/60 uppercase tracking-wider pl-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full px-4 py-3 bg-brand-primary border border-brand-border rounded-xl text-sm text-primary-text placeholder-primary-text/30 focus:border-primary outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Target Class Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-primary-text/60 uppercase tracking-wider pl-1">
                  Seeking Admission In
                </label>
                <select
                  value={targetClass}
                  onChange={(e) => setTargetClass(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-primary border border-brand-border rounded-xl text-sm text-primary-text focus:border-primary outline-none transition-all duration-300"
                >
                  <option value="SSC" className="bg-bg-features text-primary-text">SSC (Class 10)</option>
                  <option value="XI Science" className="bg-bg-features text-primary-text">XI Science</option>
                  <option value="XII Science" className="bg-bg-features text-primary-text">XII Science</option>
                </select>
              </div>

              {/* Subjects of Interest */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-primary-text/60 uppercase tracking-wider pl-1">
                  Subjects of Interest
                </label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {['Mathematics', 'Physics', 'Chemistry', 'Biology'].map((subject) => {
                    const isChecked = subjects.includes(subject);
                    return (
                      <button
                        type="button"
                        key={subject}
                        onClick={() => handleSubjectChange(subject)}
                        className={`py-2 px-4 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                          isChecked
                            ? 'bg-primary/20 border-primary text-primary'
                            : 'bg-brand-primary border-brand-border text-primary-text/70 hover:border-primary/20'
                        }`}
                      >
                        {subject}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary text-brand-button-text font-extrabold text-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 shadow-md mt-2 cursor-pointer"
              >
                Submit Admissions Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admissions;
