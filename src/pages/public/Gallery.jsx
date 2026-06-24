import React from 'react';
import { motion } from 'framer-motion';
import WordsPullUpMultiStyle from '../../components/animations/WordsPullUpMultiStyle';

const Gallery = () => {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
      title: 'Active Study Sessions',
      category: 'Classroom'
    },
    {
      url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600',
      title: 'Science Practicals Foundation',
      category: 'Lab Work'
    },
    {
      url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600',
      title: 'Systematic Monthly Mock Exam',
      category: 'Assessments'
    },
    {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
      title: 'Computer Assisted Concept Explanation',
      category: 'Technology'
    },
    {
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
      title: 'Interactive Group Discussions',
      category: 'Mentorship'
    },
    {
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
      title: 'Annual Board Topper Ceremony',
      category: 'Celebrations'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16 text-left">
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <WordsPullUpMultiStyle
          segments={[
            { text: 'Academy', className: 'font-sans font-extrabold text-primary-text text-4xl md:text-5xl tracking-tight' },
            { text: 'Gallery', className: 'font-serif italic text-primary font-normal text-4xl md:text-5xl tracking-tight' }
          ]}
          className="justify-start gap-y-2"
        />
        <p className="text-base md:text-lg text-primary-text/80 leading-relaxed font-sans mt-2">
          A glimpse into life at Iqra Academy — lessons, experiments, exams, and celebrations.
        </p>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <motion.div
            key={image.url}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-bg-features rounded-[2rem] overflow-hidden border border-brand-border group shadow-2xl flex flex-col h-[320px] hover:border-primary/40 transition-all duration-300"
          >
            {/* Image Container */}
            <div className="flex-grow relative overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-semibold uppercase bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-lg tracking-wider font-mono">
                  {image.category}
                </span>
              </div>
              
              {/* Image Info */}
              <div className="absolute bottom-4 left-6 right-6">
                <h3 className="font-sans font-extrabold text-lg text-white">
                  {image.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
