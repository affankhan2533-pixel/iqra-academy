import React, { useState } from 'react';
import { Target, Eye, ShieldCheck, HeartHandshake, MapPin, X } from 'lucide-react';
import WordsPullUpMultiStyle from '../../components/animations/WordsPullUpMultiStyle';
import ScrollRevealText from '../../components/animations/ScrollRevealText';
import GSAPEntrance from '../../components/animations/GSAPEntrance';
import afzalIdrisiImg from '../../assets/afzal_idrisi.png';
import asifShaikhImg from '../../assets/asif_shaikh.png';

const About = () => {
  const [showSpotlight, setShowSpotlight] = useState(false);
  const values = [
    {
      title: 'Academic Focus',
      desc: 'Deep conceptual explanations in Science and Mathematics, laying the groundwork for high performance in board exams.',
      icon: ShieldCheck
    },
    {
      title: 'Empowerment & Support',
      desc: 'Located in Dharavi, we strive to make world-class education accessible and affordable to all deserving students.',
      icon: HeartHandshake
    },
    {
      title: 'Individual Attention',
      desc: 'Small classes enable our professors to adapt speed, track weak points, and resolve queries instantly.',
      icon: Eye
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-20 text-left">
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <WordsPullUpMultiStyle
          segments={[
            { text: 'About', className: 'font-sans font-extrabold text-primary-text text-4xl md:text-5xl tracking-tight' },
            { text: 'Iqra Academy', className: 'font-serif italic text-primary font-normal text-4xl md:text-5xl tracking-tight' }
          ]}
          className="justify-start gap-y-2"
        />
        <p className="text-base md:text-lg text-primary-text/80 leading-relaxed font-sans mt-2">
          Providing a launchpad for Class 10 (SSC), 11th and 12th Science students in Dharavi, Mumbai since inception.
        </p>
      </div>

      {/* Main Info Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-6">
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-primary-text">
            Our Story & Commitment
          </h2>
          <div className="text-sm text-primary-text/80 leading-relaxed flex flex-col gap-6">
            <p>
              <ScrollRevealText
                text="Iqra Academy was founded with a singular, powerful vision: to provide premium, outcome-oriented educational coaching to students in the heart of Dharavi, Mumbai. We understand that Class 10th and junior college science classes are the ultimate defining years of a student's academic path."
                className="inline text-sm md:text-base"
              />
            </p>
            <p>
              <ScrollRevealText
                text="By focusing on core concepts in Physics, Chemistry, Mathematics, and Biology, and conducting systematic testing cycles, we help students build the self-assurance needed to excel. Our coaching combines rigorous study sheets, individual mentoring sessions, and frequent parent-teacher updates to build a holistic learning ecosystem."
                className="inline text-sm md:text-base"
              />
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-primary mt-2">
            <MapPin className="w-5 h-5 shrink-0" />
            <span className="tracking-wide">PMGP Colony, Dharavi, Mumbai</span>
          </div>
        </div>

        {/* Visual Card showing Mission & Vision */}
        <div className="flex flex-col gap-6 bg-bg-about border border-brand-border p-8 rounded-[2rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-2xl pointer-events-none"></div>
          
          <div className="flex gap-4 items-start relative z-10">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-primary-text mb-2">Our Mission</h3>
              <p className="text-sm text-primary-text/70 leading-relaxed">
                To simplify science and mathematics education, helping students build analytical capabilities and clear their board exams with top ranks.
              </p>
            </div>
          </div>

          <hr className="border-brand-border my-2" />

          <div className="flex gap-4 items-start relative z-10">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-primary-text mb-2">Our Vision</h3>
              <p className="text-sm text-primary-text/70 leading-relaxed">
                To become the premier coaching hub in Mumbai, recognized for cultivating future engineers, medical professionals, and innovators.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founders Section */}
      <div className="flex flex-col gap-12 border-t border-brand-border pt-20">
        <div className="flex flex-col gap-3">
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-primary-text">
            Meet Our Founders
          </h2>
          <p className="text-sm text-primary-text/60">
            The visionary leaders behind Iqra Academy's academic excellence and values.
          </p>
        </div>

        <GSAPEntrance className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {/* Founder 1: Afzal Idrisi */}
          <div className="bg-bg-features rounded-[2rem] overflow-hidden border border-brand-border flex flex-col sm:flex-row hover:border-primary/30 hover:shadow-xl transition-all duration-300">
            <div className="sm:w-1/3 h-52 sm:h-auto relative">
              <img
                src={afzalIdrisiImg}
                alt="Afzal Idrisi"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:w-2/3 flex flex-col justify-between gap-4">
              <div>
                <h3 className="font-sans font-extrabold text-lg text-primary-text">Afzal Idrisi</h3>
                <span className="text-xs font-semibold text-primary uppercase font-mono tracking-wider mt-1 block">
                  Co-Founder & Chemistry Mentor
                </span>
                <p className="text-xs text-primary-text/70 leading-relaxed mt-3">
                  Co-founder of IQRA Academy and a passionate Chemistry Mentor with over a decade of teaching expertise. He specializes in turning chemistry from a weakness into a strength for students.
                </p>
                <button
                  onClick={() => setShowSpotlight(true)}
                  className="mt-4 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs transition-colors duration-300 cursor-pointer"
                >
                  Read Spotlight Q&A
                </button>
              </div>
            </div>
          </div>

          {/* Founder 2: Asif Shaikh */}
          <div className="bg-bg-features rounded-[2rem] overflow-hidden border border-brand-border flex flex-col sm:flex-row hover:border-primary/30 hover:shadow-xl transition-all duration-300">
            <div className="sm:w-1/3 h-52 sm:h-auto relative">
              <img
                src={asifShaikhImg}
                alt="Asif Shaikh"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:w-2/3 flex flex-col justify-between gap-4">
              <div>
                <h3 className="font-sans font-extrabold text-lg text-primary-text">Asif Shaikh</h3>
                <span className="text-xs font-semibold text-primary uppercase font-mono tracking-wider mt-1 block">
                  Co-Founder & Manager
                </span>
                <p className="text-xs text-primary-text/70 leading-relaxed mt-3">
                  An experienced administrator managing school operations and growth. Asif directs our strategic scaling, parent dashboard integrations, and digital learning platforms.
                </p>
              </div>
            </div>
          </div>
        </GSAPEntrance>
      </div>

      {/* Core Values Section */}
      <div className="flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-primary-text">
            Our Core Pillars
          </h2>
          <p className="text-sm text-primary-text/60">
            The foundation of our teaching philosophy at Iqra Academy
          </p>
        </div>

        <GSAPEntrance className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="bg-bg-features rounded-[2rem] p-8 border border-brand-border hover:border-primary/30 transition-all duration-300 flex flex-col gap-4 text-left group shadow-lg"
              >
                <div className="p-3 rounded-2xl bg-brand-primary w-fit text-primary border border-brand-border group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-bold text-lg text-primary-text">{v.title}</h3>
                <p className="text-sm text-primary-text/70 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </GSAPEntrance>
      </div>

      {/* Spotlight Q&A Modal */}
      {showSpotlight && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSpotlight(false)}
        >
          <div 
            className="bg-bg-features max-w-2xl w-full rounded-[2rem] border border-brand-border overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-brand-border flex justify-between items-center bg-bg-about shrink-0">
              <div className="flex items-center gap-4">
                <img 
                  src={afzalIdrisiImg} 
                  alt="Afzal Idrisi" 
                  className="w-12 h-12 rounded-full object-cover border border-primary/30"
                />
                <div>
                  <h3 className="font-sans font-bold text-lg text-primary-text">Afzal Idrisi</h3>
                  <p className="text-xs text-primary">Co-Founder & Chemistry Mentor</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSpotlight(false)}
                className="p-2 rounded-full hover:bg-primary-text/10 text-primary-text/70 hover:text-primary-text transition-colors cursor-pointer"
                aria-label="Close spotlight"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 md:p-8 flex flex-col gap-6 text-left">
              
              {/* Q1 */}
              <div className="flex flex-col gap-2">
                <h4 className="font-sans font-bold text-sm text-primary uppercase tracking-wider">
                  What's the most memorable thing you've learned this year?
                </h4>
                <p className="text-sm text-primary-text/80 italic pl-3 border-l-2 border-primary/30 leading-relaxed font-sans">
                  "One of the most impactful lessons I learned this year was from my students, who taught me that with confidence and diligent practice, one can overcome setbacks and achieve remarkable success."
                </p>
              </div>

              <hr className="border-brand-border" />

              {/* Q2 */}
              <div className="flex flex-col gap-2">
                <h4 className="font-sans font-bold text-sm text-primary uppercase tracking-wider">
                  Who was your favourite teacher growing up, and how did they impact your life?
                </h4>
                <p className="text-sm text-primary-text/80 italic pl-3 border-l-2 border-primary/30 leading-relaxed font-sans">
                  "During my time in college, Mr. Majid Sir was my favorite teacher. Despite being the topper at NYPER University and having numerous opportunities in top organizations, he chose the noble profession of teaching. His decision to prioritize education over personal fame left a lasting impression on me, inspiring me to value humility and success. It also ignited a passion within me to pursue a career as a dedicated educator."
                </p>
              </div>

              <hr className="border-brand-border" />

              {/* Q3 */}
              <div className="flex flex-col gap-2">
                <h4 className="font-sans font-bold text-sm text-primary uppercase tracking-wider">
                  What sparked your interest in chemistry?
                </h4>
                <p className="text-sm text-primary-text/80 italic pl-3 border-l-2 border-primary/30 leading-relaxed font-sans">
                  "Few are aware that I was once an underachieving student in Chemistry, witnessing the struggles many students faced in the subject. This ignited my curiosity and determination to turn my weakness into a strength. Over the past decade, I have successfully imparted my knowledge and expertise in Chemistry to others."
                </p>
              </div>

              <hr className="border-brand-border" />

              {/* Q4 */}
              <div className="flex flex-col gap-2">
                <h4 className="font-sans font-bold text-sm text-primary uppercase tracking-wider">
                  If you had unlimited resources, how would you make a positive impact on the world?
                </h4>
                <p className="text-sm text-primary-text/80 italic pl-3 border-l-2 border-primary/30 leading-relaxed font-sans">
                  "My utmost desire is to provide education to every student in need and make a positive difference in the world."
                </p>
              </div>

              <hr className="border-brand-border" />

              {/* Social Media */}
              <div className="flex items-center gap-4 mt-2 shrink-0">
                <span className="text-xs text-primary-text/60 font-semibold uppercase tracking-wider">Connect:</span>
                <a 
                  href="https://www.instagram.com/afzalomycin/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4.5 h-4.5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>@afzalomycin</span>
                </a>
                <a 
                  href="https://www.instagram.com/the_iqra_academy/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4.5 h-4.5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>@the_iqra_academy</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
