import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  Check,
  Atom,
  Binary,
  Dna,
  FlaskConical,
  Plus,
  Minus,
  HelpCircle,
  LineChart,
  BookMarked,
  Award,
  BookOpen
} from 'lucide-react';
import WordsPullUp from '../../components/animations/WordsPullUp';

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { number: '500+', label: 'Students Mentored' },
    { number: '95%', label: 'Success Rate' },
    { number: 'Small Batch', label: 'Learning' },
    { number: 'Personalized', label: 'Attention' }
  ];

  const coursesList = [
    {
      title: 'SSC (Class 10)',
      target: 'Class 10th Board Exams',
      description: 'Strengthen core academic frameworks for Mathematics and Science, ensuring top performance in board exams.',
      features: [
        'Board examination mock tests',
        'Regular formula revision drills',
        'Detailed solved worksheets'
      ]
    },
    {
      title: 'XI Science',
      target: 'Class 11th Science',
      description: 'Laying deep foundations for junior college, simplifying complex concepts in physical sciences and math.',
      features: [
        'Core concepts simplification',
        'Formula derivation workshops',
        'Regular chapter-wise tests'
      ]
    },
    {
      title: 'XII Science',
      target: 'Class 12th Board & Entrance',
      description: 'A comprehensive board preparation program coupled with foundation modules for engineering & medical entrance.',
      features: [
        'Complete textbook coverage',
        'Previous board paper solutions',
        'Weekly full mock examinations'
      ]
    }
  ];

  const pillarsList = [
    {
      title: 'Specialized Educators',
      desc: 'Deep conceptual mentoring by teachers who specialize in SSC boards and junior college physics, chemistry, math, and biology.',
      icon: Award
    },
    {
      title: 'Weekly Test Cycles',
      desc: 'Formative testing cycles modeled after actual board examinations, complete with performance reviews.',
      icon: LineChart
    },
    {
      title: 'Progress Dashboards',
      desc: 'Total transparency for parents and students to monitor growth charts, notes, and homework records.',
      icon: BookOpen
    },
    {
      title: 'Board-Ready Study Kits',
      desc: 'Handcrafted formula sheets, revision summaries, and structured worksheet logs designed for direct application.',
      icon: BookMarked
    }
  ];

  const faqList = [
    {
      question: 'What classes and boards do you coach?',
      answer: 'We provide focused academic coaching for SSC (Class 10th Maharashtra State Board) and Junior College Science (Class 11 & 12 / HSE Maharashtra Board).'
    },
    {
      question: 'What subjects are covered under your science curriculum?',
      answer: 'Our science stream covers Physics, Chemistry, Mathematics, and Biology comprehensively, including theory, derivations, and numerical problem workshops.'
    },
    {
      question: 'How often are exams conducted, and can parents track results?',
      answer: 'We conduct weekly chapter-wise tests and monthly full-length mock board examinations. Parents can log in to the Parents Portal to check report cards and real-time attendance graphs.'
    },
    {
      question: 'Do you offer doubt-solving sessions or personal mentoring?',
      answer: 'Yes. Apart from scheduled classes, we run regular doubt-solving counters and offer personalized 1-on-1 mentoring slots for students who need extra conceptual guidance.'
    },
    {
      question: 'Where is the academy located and how do I inquire about fees?',
      answer: 'We are located in Dharavi, Mumbai: Room No. 309, Building 5-B, PMGP Colony, Dharavi. For batch availability, fee structures, and installment plans, you can submit the Admissions Inquiry Form or drop by the branch.'
    }
  ];

  return (
    <div className="relative bg-brand-primary min-h-screen flex flex-col gap-24 overflow-x-hidden">
      {/* 1. HERO SECTION WITH VIDEO BACKGROUND */}
      <section className="dark relative overflow-hidden bg-black min-h-screen flex flex-col justify-end px-8 py-16 md:px-16 md:py-24 lg:px-24 lg:py-28 shadow-2xl w-full">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <video
            src="/istockphoto-1340913953-640_adpp_is.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.02] transform-gpu"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-0 noise-overlay opacity-[0.04] mix-blend-overlay" />
        </div>

        {/* Floating Science & Math SVGs */}
        <div className="absolute inset-0 pointer-events-none hidden md:block z-10">
          {/* Physics Atom */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute top-24 left-[12%] text-[#DEDBC8]/15"
          >
            <Atom className="w-16 h-16" />
          </motion.div>

          {/* Math/Binary Formula */}
          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, 8, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute top-36 right-[15%] text-[#DEDBC8]/10"
          >
            <Binary className="w-14 h-14" />
          </motion.div>

          {/* Chemistry Flask */}
          <motion.div
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
            className="absolute bottom-24 left-[18%] text-[#DEDBC8]/10"
          >
            <FlaskConical className="w-12 h-12" />
          </motion.div>

          {/* Biology DNA */}
          <motion.div
            animate={{
              y: [0, 12, 0],
              rotate: [0, 30, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute bottom-28 right-[18%] text-[#DEDBC8]/15"
          >
            <Dna className="w-14 h-14" />
          </motion.div>
        </div>

        <div className="w-full flex flex-col justify-end relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
            {/* Bottom-Left Title Column */}
            <div className="lg:col-span-7 text-left flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DEDBC8]/10 border border-[#DEDBC8]/20 text-[#DEDBC8] text-xs font-semibold uppercase tracking-wider w-fit"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DEDBC8]" />
                Academic Excellence in Dharavi
              </motion.div>

              {/* Premium WordsPullUp for Hero Title */}
              <WordsPullUp
                text="Iqra Academy"
                className="font-sans font-extrabold text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.0]"
                showAsterisk={true}
              />
            </div>

            {/* Bottom-Right Description & CTA Column */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left lg:pb-3">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm font-sans"
              >
                An outcome-oriented coaching institute in Dharavi, Mumbai, dedicated to empowering SSC, XI Science, and XII Science students with deep conceptual analysis.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <Link
                  to="/admissions"
                  className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-primary text-brand-button-text font-extrabold text-xs tracking-wider uppercase overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
                >
                  <span>Book Free Demo</span>
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-black/10 group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
                <Link
                  to="/courses"
                  className="text-xs text-white/75 hover:text-primary font-bold tracking-wider uppercase transition-colors"
                >
                  Explore Courses
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Premium Integrated Statistics grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.5,
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-6 border-t border-white/10 w-full text-left"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="flex flex-col"
              >
                <span className="font-sans font-extrabold text-xl md:text-2xl text-[#DEDBC8]">
                  {stat.number}
                </span>
                <span className="text-[10px] text-white/50 mt-0.5 font-medium tracking-wide uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. CENTERED MOODY STATEMENT SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center flex flex-col gap-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-sans font-medium text-3xl md:text-5xl text-primary-text leading-normal tracking-tight"
        >
          We are <span className="font-serif italic text-primary">Iqra Academy</span>, a <span className="font-serif italic text-primary">premium coaching hub</span> in Dharavi. We build skills in <span className="font-serif italic text-primary">conceptual physics</span>, chemistry, mathematics, and <span className="font-serif italic text-primary">biological sciences</span>.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base text-primary-text/60 max-w-2xl mx-auto leading-relaxed"
        >
          Over the past several years, we have worked with hundreds of students across SSC, XI Science, and XII Science, helping them achieve outstanding academic results and master complex board and entrance concepts.
        </motion.p>
      </section>

      {/* 3. STUDIO-GRADE FEATURES/COURSES GRID */}
      <section className="pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-left flex flex-col gap-3"
        >
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-primary-text tracking-tight">
            Curriculum-grade programs for future scholars.
          </h2>
          <p className="text-sm text-primary-text/60 uppercase tracking-widest font-mono">
            Built for pure understanding. Powered by science.
          </p>
        </motion.div>

        {/* 4-Column Row Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
          {/* Column 1: Tall Visual Canvas Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="dark relative rounded-[2rem] overflow-hidden border border-brand-border min-h-[350px] lg:min-h-0 flex flex-col justify-end p-8 bg-black shadow-lg group"
          >
            <img
              src="/astronaut_canvas.png"
              alt="Creative canvas illustration"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 noise-overlay opacity-[0.03] mix-blend-overlay" />
            <span className="relative z-10 text-xs font-semibold text-[#DEDBC8] uppercase tracking-widest font-mono">
              Creative canvas
            </span>
            <h3 className="relative z-10 font-serif italic text-2xl text-white mt-1">
              Your learning canvas.
            </h3>
          </motion.div>

          {/* Columns 2-4: Course Cards */}
          {coursesList.map((course, idx) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1 + (idx + 1) * 0.15 }}
              className="bg-bg-features rounded-[2rem] p-8 border border-brand-border hover:border-primary/30 transition-all duration-300 flex flex-col justify-between shadow-lg text-left"
            >
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider font-mono">
                    {course.target}
                  </span>
                  <h3 className="font-sans font-extrabold text-xl text-primary-text mt-1">
                    {course.title}
                  </h3>
                </div>

                <p className="text-xs text-primary-text/70 leading-relaxed font-sans">
                  {course.description}
                </p>

                <ul className="flex flex-col gap-2.5 pt-2 border-t border-brand-border">
                  {course.features.map((feat) => (
                    <li key={feat} className="text-xs text-primary-text/70 flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-normal">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/admissions"
                className="mt-8 text-xs font-bold text-primary-text hover:text-primary flex items-center gap-1.5 transition-colors font-mono tracking-wider uppercase"
              >
                <span>Enroll / Inquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. KEY ACADEMIC PILLARS (Why Iqra Academy) */}
      <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-12 w-full border-t border-brand-border">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-left flex flex-col gap-3"
        >
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-primary-text tracking-tight">
            Why Scholars Excel at Iqra.
          </h2>
          <p className="text-sm text-primary-text/60 uppercase tracking-widest font-mono">
            Structured for excellence. Engineered for growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
          {pillarsList.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-bg-features rounded-[2rem] p-8 border border-brand-border hover:border-primary/30 transition-all duration-300 flex flex-col gap-4 text-left shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-sans font-bold text-primary-text text-base">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-primary-text/70 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. TEACHING METHODOLOGY — HOW WE TEACH */}
      <section className="py-24 px-6 max-w-6xl mx-auto flex flex-col gap-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col gap-3"
        >
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-primary-text tracking-tight">
            Our Teaching Methodology
          </h2>
          <p className="text-sm text-primary-text/60 uppercase tracking-widest font-mono">
            A proven 3-step framework for academic mastery
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line - desktop only */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

          {[
            {
              step: '01',
              title: 'Concept Foundation',
              desc: 'Every chapter begins with a deep-dive into fundamentals. Our faculty builds the "why" before the "how", ensuring students grasp the core logic behind every formula and theorem.',
              color: 'text-emerald-400'
            },
            {
              step: '02',
              title: 'Practice & Drilling',
              desc: 'Structured worksheet packs, timed numerical sets, and progressively harder problem banks condition students for exam-speed accuracy. We drill until patterns become reflexive.',
              color: 'text-cyan-400'
            },
            {
              step: '03',
              title: 'Testing & Feedback',
              desc: 'Weekly chapter tests and monthly mock boards simulate real examination conditions. Detailed performance analysis highlights weak areas and drives focused revision cycles.',
              color: 'text-amber-400'
            }
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center gap-4"
            >
              <div className="w-20 h-20 rounded-full bg-bg-features border-2 border-brand-border flex items-center justify-center shadow-lg">
                <span className={`font-sans font-extrabold text-2xl ${item.color}`}>{item.step}</span>
              </div>
              <h3 className="font-sans font-bold text-lg text-primary-text">{item.title}</h3>
              <p className="text-xs text-primary-text/70 leading-relaxed max-w-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. SUBJECTS WE COVER — VISUAL ICON GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-12 w-full border-t border-brand-border">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-left flex flex-col gap-3"
        >
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-primary-text tracking-tight">
            Subjects We Master
          </h2>
          <p className="text-sm text-primary-text/60 uppercase tracking-widest font-mono">
            Deep expertise across core science and mathematics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {[
            { name: 'Physics', icon: Atom, topics: ['Mechanics & Motion', 'Electromagnetism', 'Optics & Waves', 'Thermodynamics'], color: 'text-cyan-400', borderColor: 'hover:border-cyan-400/30' },
            { name: 'Chemistry', icon: FlaskConical, topics: ['Organic Chemistry', 'Inorganic Reactions', 'Physical Chemistry', 'Periodic Table Mastery'], color: 'text-emerald-400', borderColor: 'hover:border-emerald-400/30' },
            { name: 'Mathematics', icon: Binary, topics: ['Algebra & Calculus', 'Coordinate Geometry', 'Trigonometry', 'Statistics & Probability'], color: 'text-amber-400', borderColor: 'hover:border-amber-400/30' },
            { name: 'Biology', icon: Dna, topics: ['Cell Biology & Genetics', 'Human Physiology', 'Plant Biology', 'Ecology & Evolution'], color: 'text-rose-400', borderColor: 'hover:border-rose-400/30' }
          ].map((subject, idx) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`bg-bg-features rounded-[2rem] p-8 border border-brand-border ${subject.borderColor} transition-all duration-300 flex flex-col gap-5 text-left shadow-lg group`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-black/50 border border-brand-border ${subject.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`font-sans font-extrabold text-xl ${subject.color}`}>
                  {subject.name}
                </h3>
                <ul className="flex flex-col gap-2">
                  {subject.topics.map((topic) => (
                    <li key={topic} className="text-xs text-primary-text/70 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-primary/50 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6.5. AI-POWERED ECOSYSTEM SHOWCASE */}
      <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-12 w-full border-t border-brand-border text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3"
        >
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-primary-text tracking-tight">
            Hi-Fi AI Learning Ecosystem
          </h2>
          <p className="text-sm text-primary-text/60 uppercase tracking-widest font-mono">
            Intelligent classrooms. Predictive diagnostics. Connected parents.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-[2rem] p-8 border border-cyan-500/10 bg-cyan-500/[0.01] hover:border-cyan-500/30 transition-all duration-300 flex flex-col gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <h3 className="font-sans font-bold text-primary-text text-lg">AI Classroom Tutor</h3>
            <p className="text-xs text-primary-text/70 leading-relaxed font-sans">
              A 24/7 personal doubts assistant that guides students step-by-step through physics numericals, chemistry reactions, and math derivations. Responds with experienced mentoring language.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-[2rem] p-8 border border-orange-500/10 bg-orange-500/[0.01] hover:border-orange-500/30 transition-all duration-300 flex flex-col gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <LineChart className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-primary-text text-lg">Predictive Diagnostics</h3>
            <p className="text-xs text-primary-text/70 leading-relaxed font-sans">
              Our AI Performance Analyzer evaluates weekly test grades, homework completions, and attendance files to predict weak chapters and generate custom revision calendars.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-[2rem] p-8 border border-brand-accent/20 bg-brand-accent/[0.01] hover:border-brand-accent transition-all duration-300 flex flex-col gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0">
              <BookMarked className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-primary-text text-lg">Parent Report Cards</h3>
            <p className="text-xs text-primary-text/70 leading-relaxed font-sans">
              Bridges student progress with parents through downloadable monthly PDF reports containing attendance trend sheets, teacher feedback remarks, and personalized home study plan indexes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. TESTIMONIALS HIGHLIGHT SECTION */}
      <section className="py-24 px-6 max-w-6xl mx-auto flex flex-col gap-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col gap-3"
        >
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-primary-text tracking-tight">
            What Our Students Say
          </h2>
          <p className="text-sm text-primary-text/60 uppercase tracking-widest font-mono">
            Real voices. Real results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Pranav Deshmukh',
              class: 'XII Science — 2026',
              quote: 'Iqra Academy transformed my understanding of Physics. The formula derivation workshops and weekly mock tests gave me the confidence to score 92% in my boards.',
              initials: 'PD'
            },
            {
              name: 'Ayesha Khan',
              class: 'SSC — 2025',
              quote: 'The teachers here truly care about each student. The small batch sizes meant I could ask questions freely and my math scores jumped from 65% to 89% in just one term.',
              initials: 'AK'
            },
            {
              name: 'Rohit Sharma',
              class: 'XI Science — 2026',
              quote: 'Coming from a Hindi medium school, I struggled with science concepts. The step-by-step approach at Iqra made complex chemistry topics feel intuitive and approachable.',
              initials: 'RS'
            }
          ].map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="bg-bg-features rounded-[2rem] p-8 border border-brand-border hover:border-primary/20 transition-all duration-300 flex flex-col gap-6 text-left shadow-lg relative overflow-hidden"
            >
              {/* Decorative quote mark */}
              <div className="absolute top-4 right-6 text-6xl font-serif text-primary/10 leading-none select-none pointer-events-none">"</div>

              <p className="text-sm text-primary-text/80 leading-relaxed font-sans italic relative z-10">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary font-sans font-extrabold text-sm flex items-center justify-center shrink-0">
                  {testimonial.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-sm text-primary-text">{testimonial.name}</span>
                  <span className="text-[10px] text-primary-text/50 uppercase tracking-wider">{testimonial.class}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary-text/60 hover:text-primary tracking-wider uppercase transition-colors"
          >
            <span>Read more student reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </section>

      {/* 8. CALL TO ACTION ENROLLMENT BANNER */}
      <section className="px-6 max-w-7xl mx-auto w-full pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] overflow-hidden bg-bg-about border border-brand-border p-12 md:p-16 lg:p-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl"
        >
          {/* Decorative noise overlay */}
          <div className="absolute inset-0 noise-overlay opacity-[0.03] mix-blend-overlay pointer-events-none" />

          <div className="flex flex-col gap-4 relative z-10 max-w-xl">
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-primary-text tracking-tight leading-tight">
              Ready to build your <span className="font-serif italic text-primary">academic future</span>?
            </h2>
            <p className="text-sm text-primary-text/70 leading-relaxed">
              Join Iqra Academy in Dharavi, Mumbai. Limited seats available for SSC, XI Science, and XII Science batches. Book a free counseling session or visit our branch today.
            </p>
            <p className="text-xs text-primary-text/50 font-mono mt-1">
              📍 Room No. 309, Building 5-B, PMGP Colony, Dharavi, Mumbai - 400017
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10 shrink-0">
            <Link
              to="/admissions"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-primary text-brand-button-text font-extrabold text-xs tracking-wider uppercase overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
            >
              <span>Apply Now</span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black/10 group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-brand-border text-primary-text/80 hover:text-primary hover:border-primary/30 font-bold text-xs tracking-wider uppercase transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 9. INTERACTIVE FAQ ACCORDION SECTION */}
      <section className="pb-32 px-6 max-w-4xl mx-auto flex flex-col gap-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col gap-3"
        >
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-primary-text tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-primary-text/60 uppercase tracking-widest font-mono">
            Got queries? We have answers.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqList.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-bg-features border border-brand-border rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left text-primary-text hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="font-sans font-bold text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0 transition-transform duration-300">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-primary-text/80 leading-relaxed border-t border-brand-border">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
