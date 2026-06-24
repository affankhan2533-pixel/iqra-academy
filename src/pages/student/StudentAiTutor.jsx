import React, { useState, useRef, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import { GraduationCap, Send, Bot, User, BookOpen, Calculator, Sparkles, MessageSquare } from 'lucide-react';

const StudentAiTutor = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Welcome to **Hi-Fi Classes AI Study Assistant**, **${user?.name}**! 🎓\n\nI am your custom coaching mentor specialized in:\n- **Physics** (Mechanics, Waves, Electrostatics, Semiconductors)\n- **Chemistry** (Physical, Organic, Inorganic, Thermodynamics)\n- **Mathematics** (Algebra, Calculus, Probability, Trigonometry)\n- **Biology** (Cell Biology, Physiology, Genetics, Evolution)\n\nAsk me any doubt, request a chapter summary, or write down a numerical problem for a step-by-step solution. Let's study smart! 🚀`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSubject, setActiveSubject] = useState('Physics');
  const chatEndRef = useRef(null);

  const presets = {
    Physics: [
      "Explain Newton's Laws of Motion with derivations",
      "Give me important Class 12 Electrostatics questions",
      "Derive the formula for parallel plate capacitor"
    ],
    Chemistry: [
      "Explain Organic Chemistry SN1 vs SN2 in simple language",
      "What is the difference between resonance and inductive effects?",
      "Explain the key principles of Chemical Bonding"
    ],
    Mathematics: [
      "Prove that [1-cos(2x)]/[sin(2x)] = tan(x)",
      "Explain how to solve limits and derivatives in Calculus",
      "Provide a step-by-step guide for Matrix determinants"
    ],
    Biology: [
      "Explain light and dark reactions in Photosynthesis",
      "Explain DNA replication and transcription",
      "Give me revision notes on Cell Biology and Genetics"
    ]
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    // Append student message
    const userMsg = { sender: 'user', text: queryText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const className = user?.details?.class || 'Class 12 Science';
      const res = await api.post('/ai/chat', {
        query: queryText,
        subject: activeSubject,
        className
      });

      setMessages(prev => [...prev, { sender: 'ai', text: res.data.response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "⚠️ *Unable to reach the AI coaching engine. Please check your internet connection or check back later!*"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Convert simple markdown-like text to styled HTML
  const formatText = (text) => {
    if (!text) return '';
    let formatted = text
      // Headers
      .replace(/^### (.*$)/gim, '<h4 class="text-primary-text font-bold text-base mt-4 mb-2">$1</h4>')
      .replace(/^#### (.*$)/gim, '<h5 class="text-brand-accent font-semibold text-sm mt-3 mb-1">$1</h5>')
      .replace(/^## (.*$)/gim, '<h3 class="text-primary-text font-extrabold text-lg mt-5 mb-3 border-b border-brand-border pb-1">$1</h3>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-2 border-brand-accent pl-3 my-2 text-text-muted italic bg-brand-secondary/30 p-2 rounded-r-lg">$1</blockquote>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-text font-semibold">$1</strong>')
      // Bullet items
      .replace(/^\*\s(.*$)/gim, '<li class="ml-4 list-disc text-text-muted mb-1">$1</li>')
      .replace(/^-\s(.*$)/gim, '<li class="ml-4 list-disc text-text-muted mb-1">$1</li>')
      // Inline math/code
      .replace(/\$(.*?)\$/g, '<code class="px-1.5 py-0.5 bg-brand-secondary/50 rounded font-mono text-brand-accent text-xs">$1</code>')
      // Multi-line math
      .replace(/\$\$(.*?)\$\$/g, '<div class="my-3 p-3 bg-brand-secondary/40 border border-brand-border rounded-xl text-center font-mono text-brand-accent text-sm">$1</div>')
      // Tables
      .replace(/\|/g, ' &nbsp;│&nbsp; ');

    return formatted;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto gap-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-secondary flex items-center justify-center border border-brand-accent/20">
            <GraduationCap className="h-5 w-5 text-brand-accent" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">AI Study Tutor</h2>
            <p className="text-xs text-text-muted">Personalized experienced coaching guidance for Class 10 - 12 Science</p>
          </div>
        </div>

        <div className="flex bg-brand-secondary/50 rounded-xl p-1 border border-white/5 gap-1">
          {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map((subject) => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeSubject === subject
                  ? 'bg-brand-accent text-brand-primary'
                  : 'text-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Presets Sidebar */}
        <div className="w-full lg:w-72 flex flex-col gap-4 shrink-0">
          <div className="glass rounded-2xl p-5 border border-white/5 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-accent" />
              Suggested Doubts ({activeSubject})
            </h3>
            <p className="text-xs text-text-muted mb-2">Click on any question to instantly consult the tutor:</p>
            <div className="flex flex-col gap-2.5">
              {presets[activeSubject].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(preset)}
                  disabled={loading}
                  className="w-full text-left text-xs bg-brand-secondary/30 border border-white/5 hover:border-brand-accent/30 hover:bg-brand-secondary/60 p-3 rounded-xl text-text-muted hover:text-white transition-all duration-200 leading-normal"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5 border border-white/5 flex-1 hidden lg:flex flex-col gap-3 justify-center text-center">
            <Bot className="h-10 w-10 text-brand-accent/50 mx-auto animate-pulse" />
            <h4 className="text-xs font-bold text-white mt-1">Stuck on a problem?</h4>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Our AI is configured with detailed board paper keys, derivations, calculations, and coaching guides to explain complex science topics.
            </p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-grow flex flex-col glass rounded-2xl border border-white/5 overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 scroll-smooth">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-4 max-w-[85%] ${
                  msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center border ${
                    msg.sender === 'user'
                      ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent'
                      : 'bg-brand-secondary border-white/5 text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                {/* Message Body */}
                <div
                  className={`rounded-2xl p-4 text-sm leading-relaxed border ${
                    msg.sender === 'user'
                      ? 'bg-brand-accent text-brand-primary border-brand-accent/10 font-medium'
                      : 'bg-brand-secondary/40 text-text-muted border-white/5'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-line">{msg.text}</p>
                  ) : (
                    <div
                      className="whitespace-pre-wrap flex flex-col gap-1 text-primary-text/80 markdown-chat"
                      dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                    />
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-4 self-start max-w-[80%]">
                <div className="w-9 h-9 rounded-full bg-brand-secondary border border-white/5 text-white flex items-center justify-center">
                  <Bot className="h-4 w-4 animate-spin text-brand-accent" />
                </div>
                <div className="rounded-2xl p-4 bg-brand-secondary/40 text-text-muted border border-white/5 flex items-center gap-2">
                  <span className="text-xs">Thinking like a teacher...</span>
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 bg-brand-accent rounded-full animate-bounce delay-100" />
                    <span className="h-1.5 w-1.5 bg-brand-accent rounded-full animate-bounce delay-200" />
                    <span className="h-1.5 w-1.5 bg-brand-accent rounded-full animate-bounce delay-300" />
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/5 bg-black/50 flex gap-3 items-center">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask a doubt in ${activeSubject} (e.g. Solve a calculus proof or explain a mechanism)...`}
              className="flex-grow bg-brand-secondary/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted focus:border-brand-accent focus:bg-brand-secondary/80 focus:ring-1 focus:ring-brand-accent outline-none transition-all duration-300 resize-none h-11 scrollbar-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="w-11 h-11 rounded-xl bg-brand-accent text-brand-primary flex items-center justify-center shrink-0 hover:scale-[1.05] active:scale-[0.95] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAiTutor;
