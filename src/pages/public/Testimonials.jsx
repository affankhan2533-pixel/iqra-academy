import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquareQuote } from 'lucide-react';
import WordsPullUpMultiStyle from '../../components/animations/WordsPullUpMultiStyle';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The personalized attention at Iqra Academy completely changed my perspective on Physics. Prof. Shakeel explained equations with experiments which helped me score 95% in my boards.",
      author: "Aditya Patil",
      role: "Class XII Science Student",
      stars: 5
    },
    {
      quote: "As a parent, I was worried about my daughter's Class 10 math prep. The regular tests and constant WhatsApp progress reports from Prof. Anis gave us confidence. She scored 94% in Algebra!",
      author: "Mohammad Khan",
      role: "Parent of Sana Khan (SSC)",
      stars: 5
    },
    {
      quote: "The small batch sizes make a huge difference. You can ask doubts immediately without hesitation. Dr. Fatima's biology diagram notebooks were the best guides I had.",
      author: "Sara Dsouza",
      role: "Class XII Science Student",
      stars: 5
    },
    {
      quote: "Foundations taught in Class 11 Science really helped me with college examinations later on. The study materials provided are extremely concise and board-aligned.",
      author: "Zainab Qureshi",
      role: "Class XI Science Alumna",
      stars: 5
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16 text-left">
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <WordsPullUpMultiStyle
          segments={[
            { text: 'Student & Parent', className: 'font-sans font-extrabold text-primary-text text-4xl md:text-5xl tracking-tight' },
            { text: 'Reviews', className: 'font-serif italic text-primary font-normal text-4xl md:text-5xl tracking-tight' }
          ]}
          className="justify-start gap-y-2"
        />
        <p className="text-base md:text-lg text-primary-text/80 leading-relaxed font-sans mt-2">
          Hear from the students and parents who have experienced the Iqra Academy mentorship first-hand.
        </p>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((test, index) => (
          <motion.div
            key={test.author}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-bg-features rounded-[2rem] p-8 border border-brand-border flex flex-col justify-between hover:border-primary/40 transition-all duration-300 relative group shadow-lg"
          >
            {/* Quote Icon Background decoration */}
            <div className="absolute top-6 right-6 text-primary/5 group-hover:text-primary/10 transition-colors">
              <MessageSquareQuote className="w-16 h-16" />
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(test.stars)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-sm md:text-base text-primary-text/80 leading-relaxed italic">
                "{test.quote}"
              </p>
            </div>

            {/* Author Profile */}
            <div className="flex flex-col border-t border-brand-border mt-8 pt-4">
              <span className="font-sans font-bold text-primary-text text-base">
                {test.author}
              </span>
              <span className="text-xs text-primary-text/60 font-semibold mt-0.5">
                {test.role}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
