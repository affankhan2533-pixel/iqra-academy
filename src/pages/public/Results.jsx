import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, TrendingUp } from 'lucide-react';
import WordsPullUpMultiStyle from '../../components/animations/WordsPullUpMultiStyle';

const Results = () => {
  const toppers = [
    {
      name: 'Aditya Patil',
      class: 'XI Science',
      percentage: '92.0%',
      subject: 'Physics Topper',
      remarks: 'Scored 23/25 in Physics Unit Assessment'
    },
    {
      name: 'Pranav Joshi',
      class: 'XII Science',
      percentage: '92.0%',
      subject: 'Math Topper',
      remarks: 'Scored 92/100 in Mathematics Board Mock Test'
    },
    {
      name: 'Amit Sharma',
      class: 'SSC (Class 10)',
      percentage: '92.0%',
      subject: 'Algebra Topper',
      remarks: 'Scored 46/50 in Chapter 1 Evaluation'
    }
  ];

  const statistics = [
    { label: 'Board Examination Pass Rate', value: '100%', icon: Trophy },
    { label: 'Students with Distinction (Distinction/A+)', value: '88%', icon: Star },
    { label: 'Average Score Improvement', value: '+18%', icon: TrendingUp }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16 text-left">
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <WordsPullUpMultiStyle
          segments={[
            { text: 'Academic', className: 'font-sans font-extrabold text-primary-text text-4xl md:text-5xl tracking-tight' },
            { text: 'Results', className: 'font-serif italic text-primary font-normal text-4xl md:text-5xl tracking-tight' }
          ]}
          className="justify-start gap-y-2"
        />
        <p className="text-base md:text-lg text-primary-text/80 leading-relaxed font-sans mt-2">
          Our track record of success, showcasing top performers and score improvements.
        </p>
      </div>

      {/* Top Performers Grid */}
      <div className="flex flex-col gap-8">
        <h2 className="font-sans font-extrabold text-2xl text-primary-text flex items-center gap-3">
          <Award className="w-7 h-7 text-primary animate-pulse" />
          Unit Test Toppers — June 2026
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {toppers.map((topper, index) => (
            <motion.div
              key={topper.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-features rounded-[2rem] p-6 border border-brand-border flex items-center gap-5 hover:border-primary/40 transition-all duration-300 shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl border border-brand-border bg-brand-primary flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-extrabold text-primary font-sans">
                  {topper.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {topper.subject} ({topper.percentage})
                </span>
                <h3 className="font-sans font-bold text-lg text-primary-text">
                  {topper.name}
                </h3>
                <span className="text-xs text-primary-text/60">
                  {topper.class} • {topper.remarks}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Success Metrics statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {statistics.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-features rounded-[2rem] p-8 border border-brand-border flex flex-col gap-4 items-center text-center relative overflow-hidden group shadow-lg"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-xl group-hover:bg-primary/10 transition-colors duration-300"></div>
              
              <div className="p-4 rounded-2xl bg-brand-primary border border-brand-border text-primary w-fit mb-2">
                <Icon className="w-8 h-8" />
              </div>
              <span className="font-sans font-extrabold text-4xl text-primary-text tracking-tight">
                {stat.value}
              </span>
              <p className="text-sm text-primary-text/70 font-semibold max-w-xs leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Results;
