import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, BookOpen, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import WordsPullUpMultiStyle from '../../components/animations/WordsPullUpMultiStyle';

const Courses = () => {
  const coursesList = [
    {
      title: 'SSC (Class 10)',
      target: 'Class 10th Board Exams',
      description: 'Strengthen core academic frameworks for Mathematics and Science, ensuring top performance in board exams.',
      subjects: ['Mathematics (Algebra & Geometry)', 'Science (Physics, Chemistry & Biology)'],
      duration: '1 Year',
      schedule: '3 Days a week (Alternate days)',
      features: [
        'Board examination mock drill tests',
        'Regular formula revision drills',
        'Detailed solved worksheet booklets',
        'Parent performance review meetups'
      ]
    },
    {
      title: 'XI Science',
      target: 'Class 11th Science',
      description: 'Laying deep foundations for junior college, simplifying complex concepts in physical sciences and math.',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
      duration: '1 Year',
      schedule: '4 Days a week',
      features: [
        'Core concepts simplification',
        'Formula derivation workshops',
        'Regular chapter-wise tests',
        'Practical experiment conceptual support'
      ]
    },
    {
      title: 'XII Science',
      target: 'Class 12th Board & Entrance',
      description: 'A comprehensive board preparation program coupled with foundation modules for engineering & medical entrance.',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
      duration: '1 Year',
      schedule: 'Daily classes (Morning batches available)',
      features: [
        'Complete textbook coverage',
        'Previous 10 years board paper solutions',
        'Weekly full-length mock examinations',
        'Personalised crash courses near board dates'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16 text-left">
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <WordsPullUpMultiStyle
          segments={[
            { text: 'Academic', className: 'font-sans font-extrabold text-primary-text text-4xl md:text-5xl tracking-tight' },
            { text: 'Courses', className: 'font-serif italic text-primary font-normal text-4xl md:text-5xl tracking-tight' }
          ]}
          className="justify-start gap-y-2"
        />
        <p className="text-base md:text-lg text-primary-text/80 leading-relaxed font-sans mt-2">
          Expertly designed curricula targeting board standards and scientific foundations.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {coursesList.map((course, index) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-bg-features rounded-[2rem] p-8 border border-brand-border flex flex-col justify-between hover:border-primary/40 hover:shadow-2xl transition-all duration-300 relative group"
          >
            <div>
              {/* Course Title */}
              <div className="flex flex-col gap-1.5 mb-6">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  {course.target}
                </span>
                <h2 className="font-sans font-extrabold text-2xl text-primary-text">
                  {course.title}
                </h2>
              </div>

              <p className="text-sm text-primary-text/70 mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Course Details Block */}
              <div className="flex flex-col gap-3 py-4 border-y border-brand-border mb-6 text-xs text-primary-text/60 font-medium">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>Duration: {course.duration}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <span>Schedule: {course.schedule}</span>
                </div>
              </div>

              {/* Subjects Covered */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-primary-text uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  Subjects Covered
                </h3>
                <ul className="flex flex-col gap-2">
                  {course.subjects.map((sub) => (
                    <li key={sub} className="text-sm text-primary-text flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-[7px]" />
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-primary-text uppercase tracking-wider mb-3">
                  Course Features
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {course.features.map((feat) => (
                    <li key={feat} className="text-xs text-primary-text/70 flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-normal">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Button */}
            <Link
              to="/admissions"
              className="w-full py-3.5 rounded-2xl bg-brand-primary border border-brand-border hover:border-primary/40 text-center font-bold text-sm text-primary-text hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <span>Enroll / Inquire</span>
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
