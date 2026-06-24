import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import WordsPullUpMultiStyle from '../../components/animations/WordsPullUpMultiStyle';

const Faculty = () => {
  const professors = [
    {
      name: 'Prof. Shakeel Ahmed',
      role: 'Head of Physical Sciences',
      subjects: ['Physics', 'Chemistry'],
      qualifications: 'M.Sc. in Physics',
      experience: '8+ Years teaching junior college students',
      bio: 'Prof. Shakeel specializes in breaking down Newtonian physics mechanics and thermodynamics into simple, understandable concepts. His interactive lectures utilize real-world examples to help students excel in examinations.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300'
    },
    {
      name: 'Prof. Anis Kazi',
      role: 'Senior Mathematics Professor',
      subjects: ['Mathematics (Algebra, Geometry, Calculus)'],
      qualifications: 'B.Tech, VJTI Mumbai',
      experience: '6+ Years teaching board and entrance math',
      bio: 'An alumnus of VJTI, Prof. Anis has a passion for equations and geometric logic. He teaches short calculation methods, helps students overcome mathematics anxiety, and designs standard worksheets for boards prep.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300'
    },
    {
      name: 'Dr. Fatima Shaikh',
      role: 'Head of Biological Sciences',
      subjects: ['Biology', 'Science'],
      qualifications: 'Ph.D. in Botany, MBBS Foundation',
      experience: '5+ Years teaching biology, biotechnology & physiology',
      bio: 'Dr. Fatima Shaikh brings a biological research mindset to the classroom. She excels at explaining physiology diagrams and taxonomy, helping SSC and XI/XII Science students achieve high scores in biology theory.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16 text-left">
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <WordsPullUpMultiStyle
          segments={[
            { text: 'Expert', className: 'font-sans font-extrabold text-primary-text text-4xl md:text-5xl tracking-tight' },
            { text: 'Faculty', className: 'font-serif italic text-primary font-normal text-4xl md:text-5xl tracking-tight' }
          ]}
          className="justify-start gap-y-2"
        />
        <p className="text-base md:text-lg text-primary-text/80 leading-relaxed font-sans mt-2">
          Meet the experienced educators dedicated to student excellence.
        </p>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {professors.map((prof, index) => (
          <motion.div
            key={prof.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-bg-features rounded-[2rem] overflow-hidden border border-brand-border flex flex-col hover:border-primary/40 hover:shadow-2xl transition-all duration-300"
          >
            {/* Avatar Image container */}
            <div className="h-64 relative overflow-hidden group">
              <img
                src={prof.avatar}
                alt={prof.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
              
              {/* Overlay Role */}
              <div className="absolute bottom-4 left-6">
                <span className="text-xs font-semibold bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-lg font-sans">
                  {prof.role}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="font-sans font-extrabold text-xl text-primary-text mb-1">
                    {prof.name}
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-mono uppercase tracking-wider">
                    <span>{prof.subjects.join(' & ')}</span>
                  </div>
                </div>

                <p className="text-xs text-primary-text/70 leading-relaxed font-sans">
                  {prof.bio}
                </p>
              </div>

              {/* Badges details */}
              <div className="flex flex-col gap-2 mt-6 pt-4 border-t border-brand-border text-xs text-primary-text/60 font-medium">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                  <span>{prof.qualifications}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary shrink-0" />
                  <span>{prof.experience}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
