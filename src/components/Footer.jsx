import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Information */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-[#DEDBC8]" />
            <span className="font-display font-extrabold text-xl tracking-tight text-[#DEDBC8]">
              IQRA ACADEMY
            </span>
          </Link>
          <p className="text-sm text-[#E1E0CC]/70 leading-relaxed">
            Empowering students of SSC, XI Science, and XII Science to achieve academic excellence through expert mentorship, customized study tracks, and constant assessments.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://www.instagram.com/the_iqra_academy/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-[#DEDBC8]/20 text-[#E1E0CC]/70 hover:text-[#DEDBC8] transition-all duration-300 border border-white/5 hover:border-[#DEDBC8]/20"
              aria-label="Instagram Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-display font-bold text-[#DEDBC8] text-base mb-6 tracking-wide uppercase">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'About Us', path: '/about' },
              { label: 'Courses Available', path: '/courses' },
              { label: 'Faculty Profiles', path: '/faculty' },
              { label: 'Top Performers & Results', path: '/results' },
              { label: 'Admissions & Inquiries', path: '/admissions' },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-sm text-[#E1E0CC]/70 hover:text-[#DEDBC8] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display font-bold text-[#DEDBC8] text-base mb-2 tracking-wide uppercase">
            Get In Touch
          </h3>
          <div className="flex gap-3 text-sm text-[#E1E0CC]/70 leading-relaxed">
            <MapPin className="h-5 w-5 text-[#DEDBC8] shrink-0 mt-0.5" />
            <span>
              Room No. 309, Building 5-B, PMGP Colony, Dharavi, Mumbai, Maharashtra 400017
            </span>
          </div>
          <div className="flex gap-3 text-sm text-[#E1E0CC]/70 items-center">
            <Phone className="h-5 w-5 text-[#DEDBC8] shrink-0" />
            <a href="tel:+919876543210" className="hover:text-[#DEDBC8] transition-colors">
              +91 98765 43210
            </a>
          </div>
          <div className="flex gap-3 text-sm text-[#E1E0CC]/70 items-center">
            <Mail className="h-5 w-5 text-[#DEDBC8] shrink-0" />
            <a href="mailto:write.iqraacademy@gmail.com" className="hover:text-[#DEDBC8] transition-colors">
              write.iqraacademy@gmail.com
            </a>
          </div>
        </div>

        {/* Map Preview */}
        <div>
          <h3 className="font-display font-bold text-[#DEDBC8] text-base mb-6 tracking-wide uppercase">
            Our Location
          </h3>
          <div className="rounded-2xl overflow-hidden border border-white/10 h-36 relative group shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5031174987635!2d72.85303667597148!3d19.041639953050965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8d9c5b20677%3A0xe10cd29be59e1966!2sDharavi%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717904000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map Location of Iqra Academy Dharavi"
            ></iframe>
            <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-colors duration-300"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#E1E0CC]/50">
          &copy; {new Date().getFullYear()} Iqra Academy. All rights reserved.
        </p>
        <p className="text-xs text-[#E1E0CC]/50">
          Premium coaching for Class 10 (SSC), XI & XII Science in Dharavi, Mumbai.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
