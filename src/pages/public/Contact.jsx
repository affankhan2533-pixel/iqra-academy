import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import WordsPullUpMultiStyle from '../../components/animations/WordsPullUpMultiStyle';
import api from '../../utils/api';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      return toast.error('Please fill in Name, Phone, and Message');
    }

    try {
      setLoading(true);
      const res = await api.post('/contact', {
        name,
        email,
        phone,
        message
      });
      if (res.data.success) {
        setSubmitted(true);
        toast.success('Inquiry submitted successfully! We will contact you shortly.');
      } else {
        toast.error(res.data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      const errorMsg = error.response?.data?.message || 'Failed to submit inquiry. Please try again later.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-16 text-left">
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <WordsPullUpMultiStyle
          segments={[
            { text: 'Contact', className: 'font-sans font-extrabold text-primary-text text-4xl md:text-5xl tracking-tight' },
            { text: 'Us', className: 'font-serif italic text-primary font-normal text-4xl md:text-5xl tracking-tight' }
          ]}
          className="justify-start gap-y-2"
        />
        <p className="text-base md:text-lg text-primary-text/80 leading-relaxed font-sans mt-2">
          Have questions or want to enroll? Reach out to our team at Dharavi, Mumbai.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Information Column */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-sans font-extrabold text-2xl text-primary-text">
              Get In Touch Immediately
            </h2>
            <p className="text-sm text-primary-text/70 leading-relaxed">
              We respond to phone inquiries and Instagram direct messages almost immediately during operating hours. Drop by the academy or submit the contact form.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-bg-about border border-brand-border text-primary shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-primary-text text-base">Our Address</span>
                <span className="text-sm text-primary-text/70 mt-1 leading-relaxed">
                  Room No. 309, Building 5-B, PMGP Colony, Dharavi, Mumbai, Maharashtra 400017
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-bg-about border border-brand-border text-primary shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-primary-text text-base">Phone Call</span>
                <a href="tel:+919876543210" className="text-sm text-primary-text/70 hover:text-primary transition-colors mt-1">
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-bg-about border border-brand-border text-primary shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-primary-text text-base">Email</span>
                <a href="mailto:write.iqraacademy@gmail.com" className="text-sm text-primary-text/70 hover:text-primary transition-colors mt-1">
                  write.iqraacademy@gmail.com
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-bg-about border border-brand-border text-primary shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-primary-text text-base">Instagram Handle</span>
                <a
                  href="https://www.instagram.com/the_iqra_academy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-text/70 hover:text-primary transition-colors mt-1 break-all"
                >
                  https://www.instagram.com/the_iqra_academy/
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="bg-bg-features rounded-[2rem] p-8 border border-brand-border relative overflow-hidden shadow-xl">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
              <CheckCircle className="w-16 h-16 text-primary animate-bounce" />
              <h3 className="font-sans font-bold text-xl text-primary-text">Thank You!</h3>
              <p className="text-sm text-primary-text/70 max-w-xs leading-relaxed">
                Your message has been sent successfully. One of our counselors will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h3 className="font-sans font-bold text-xl text-primary-text mb-2">Send Us a Message</h3>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-primary-text/60 uppercase tracking-wider pl-1">
                  Student/Parent Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-brand-primary border border-brand-border rounded-xl text-sm text-primary-text placeholder-primary-text/30 focus:border-primary outline-none transition-all duration-300"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-primary-text/60 uppercase tracking-wider pl-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-brand-primary border border-brand-border rounded-xl text-sm text-primary-text placeholder-primary-text/30 focus:border-primary outline-none transition-all duration-300"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-primary-text/60 uppercase tracking-wider pl-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full px-4 py-3 bg-brand-primary border border-brand-border rounded-xl text-sm text-primary-text placeholder-primary-text/30 focus:border-primary outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-primary-text/60 uppercase tracking-wider pl-1">
                  Your Message / Inquiry Detail
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  placeholder="I want to inquire about XII Science batches and fee structures..."
                  className="w-full px-4 py-3 bg-brand-primary border border-brand-border rounded-xl text-sm text-primary-text placeholder-primary-text/30 focus:border-primary outline-none transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl bg-primary text-brand-button-text font-extrabold text-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
