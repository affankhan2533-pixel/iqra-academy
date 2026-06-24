import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Send, User, Award, ShieldAlert, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const ParentFeedback = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Prof. Shakeel Ahmed',
      role: 'Physics Faculty',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150',
      message: `Dear Parent, your child is performing exceptionally well in Physics derivations. They are attentive and participate in numerical solving. Keep encouraging them to maintain this consistency!`,
      date: '2026-06-08',
      type: 'Positive'
    },
    {
      id: 2,
      sender: 'Prof. Anis Kazi',
      role: 'Mathematics Faculty',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
      message: `Math test scores are good, but there is some room for improvement in solving complex matrices and determinants. I have recommended supplementary sheets. Please make sure they complete them.`,
      date: '2026-06-07',
      type: 'General'
    },
    {
      id: 3,
      sender: 'Dr. Fatima Shaikh',
      role: 'Biology Faculty',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
      message: `Your child was late for the Monday biology session. Since plant physiology is a critical board topic, they must not miss the initial lecture discussions. Please check.`,
      date: '2026-06-05',
      type: 'Alert'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(messages[0].sender);
  const [chatHistory, setChatHistory] = useState([
    { sender: 'teacher', text: "Hello! I am Prof. Shakeel. How can I help you regarding your child's Physics performance?", date: '10:15 AM' }
  ]);

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add parent message to chat history
    const newMsg = { sender: 'parent', text: inputText, date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatHistory(prev => [...prev, newMsg]);
    setInputText('');

    toast.success('Message sent to faculty successfully!');

    // Simulate teacher reply
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'teacher',
          text: `Thank you for your response. I will review this with the student in our next session and guide them accordingly.`,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 text-left">
      {/* Title */}
      <div>
        <h2 className="font-display font-extrabold text-2xl text-white">Teacher Feedback & Notices</h2>
        <p className="text-sm text-text-muted">Review regular comments from coaching faculty and reply to subject teachers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* Left Column: Messages Feed list */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Faculty Remarks Feed</h3>
          
          <div className="flex flex-col gap-4">
            {messages.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTeacher(item.sender)}
                className={`glass rounded-2xl p-5 border cursor-pointer transition-all duration-300 ${
                  selectedTeacher === item.sender
                    ? 'border-brand-accent/30 bg-brand-secondary/40'
                    : 'border-white/5 bg-brand-secondary/10 hover:border-brand-accent/15'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.sender}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.sender}</h4>
                      <p className="text-[10px] text-text-muted">{item.role}</p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    item.type === 'Positive'
                      ? 'bg-green-500/10 text-green-400'
                      : item.type === 'Alert'
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {item.type}
                  </span>
                </div>

                <p className="text-xs text-text-muted leading-relaxed mt-4">
                  "{item.message}"
                </p>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5 text-[9px] text-text-muted">
                  <span>Date: {item.date}</span>
                  <span className="text-brand-accent font-semibold">Click to reply</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chat Dialog Box */}
        <div className="lg:col-span-2 flex flex-col gap-4 h-full min-h-[400px]">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Consult Faculty: {selectedTeacher.split(' ')[1]}</h3>
          
          <div className="flex-1 flex flex-col glass rounded-2xl border border-white/5 bg-brand-secondary/10 overflow-hidden min-h-[350px]">
            {/* Chat Header */}
            <div className="p-4 bg-brand-secondary/40 border-b border-white/5 flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shrink-0"></span>
              <p className="text-xs text-white font-bold leading-none">{selectedTeacher}</p>
            </div>

            {/* Chat messages scrollable */}
            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4 text-xs">
              {chatHistory.map((ch, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[80%] ${ch.sender === 'parent' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <div className={`p-3 rounded-xl leading-normal border ${
                    ch.sender === 'parent'
                      ? 'bg-brand-accent text-brand-primary border-brand-accent/10 font-semibold'
                      : 'bg-brand-secondary/60 text-text-muted border-white/5'
                  }`}>
                    {ch.text}
                  </div>
                  <span className="text-[8px] text-text-muted mt-1 px-1">{ch.date}</span>
                </div>
              ))}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendReply} className="p-3 border-t border-white/5 bg-black/40 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Send reply to ${selectedTeacher.split(' ')[1]}...`}
                className="flex-grow bg-brand-secondary/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-text-muted focus:border-brand-accent outline-none"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-lg bg-brand-accent text-brand-primary flex items-center justify-center shrink-0 hover:scale-[1.05] active:scale-[0.95] transition-all"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentFeedback;
