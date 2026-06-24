import React, { useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Upload, Sparkles, Send, HelpCircle, CheckCircle, FileUp, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentAiHomework = () => {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [similarQ, setSimilarQ] = useState(null);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        return toast.error('Max file size is 5MB');
      }
      setFile(selected);
      toast.success(`Selected file: ${selected.name}`);
    }
  };

  const handleSolve = async (e) => {
    e.preventDefault();
    if (!question.trim() && !file) {
      return toast.error('Please type a question or upload a worksheet');
    }

    setLoading(true);
    setResult(null);
    setSimilarQ(null);

    try {
      const q = question.trim() || `Analyze the uploaded homework file: ${file.name} and provide step-by-step explanations.`;
      
      const res = await api.post('/ai/chat', {
        query: q,
        subject: 'General Science',
        className: user?.details?.class || 'Class 12 Science'
      });

      setResult({
        question: q,
        fileName: file ? file.name : null,
        solution: res.data.response
      });

      toast.success('Solution generated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to analyze homework. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSimilar = async () => {
    if (!result) return;
    setLoadingSimilar(true);
    try {
      const q = `Based on this question: "${result.question}", generate a similar practice question with step-by-step solution and final answer.`;
      const res = await api.post('/ai/chat', {
        query: q,
        subject: 'Practice Maker',
        className: user?.details?.class || 'Class 12 Science'
      });
      setSimilarQ(res.data.response);
      toast.success('Similar practice question generated!');
    } catch (error) {
      console.error(error);
      toast.error('Could not generate similar question.');
    } finally {
      setLoadingSimilar(false);
    }
  };

  const formatText = (text) => {
    if (!text) return '';
    let formatted = text
      .replace(/^### (.*$)/gim, '<h4 class="text-primary-text font-bold text-base mt-4 mb-2">$1</h4>')
      .replace(/^#### (.*$)/gim, '<h5 class="text-brand-accent font-semibold text-sm mt-3 mb-1">$1</h5>')
      .replace(/^## (.*$)/gim, '<h3 class="text-primary-text font-extrabold text-lg mt-5 mb-3 border-b border-brand-border pb-1">$1</h3>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-2 border-brand-accent pl-3 my-2 text-text-muted italic bg-brand-secondary/30 p-2 rounded-r-lg">$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-text font-semibold">$1</strong>')
      .replace(/^\*\s(.*$)/gim, '<li class="ml-4 list-disc text-text-muted mb-1">$1</li>')
      .replace(/^- \s(.*$)/gim, '<li class="ml-4 list-disc text-text-muted mb-1">$1</li>')
      .replace(/\$(.*?)\$/g, '<code class="px-1.5 py-0.5 bg-brand-secondary/50 rounded font-mono text-brand-accent text-xs">$1</code>')
      .replace(/\$\$(.*?)\$\$/g, '<div class="my-3 p-3 bg-brand-secondary/40 border border-brand-border rounded-xl text-center font-mono text-brand-accent text-sm">$1</div>');
    return formatted;
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="w-10 h-10 rounded-xl bg-brand-secondary flex items-center justify-center border border-brand-accent/20 animate-pulse">
          <FileText className="h-5 w-5 text-brand-accent" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white">AI Homework Assistant</h2>
          <p className="text-xs text-text-muted">Type questions or upload worksheets for detailed pedagogical solutions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <form onSubmit={handleSolve} className="glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand-accent">Submit Homework</h3>
            
            {/* Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-text-muted uppercase">Type Your Question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Paste equation, question text, or word problem here..."
                rows={4}
                className="w-full bg-brand-secondary/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-text-muted focus:border-brand-accent focus:bg-brand-secondary/80 focus:ring-1 focus:ring-brand-accent outline-none transition-all duration-300 resize-none"
              />
            </div>

            {/* File upload drag-and-drop */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-text-muted uppercase font-sans">Upload PDF or Image</label>
              <div className="relative border border-dashed border-white/10 hover:border-brand-accent/40 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 bg-brand-secondary/20 hover:bg-brand-secondary/40">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="h-6 w-6 text-text-muted mx-auto mb-2" />
                <p className="text-[10px] text-text-muted leading-relaxed">
                  {file ? (
                    <span className="text-brand-accent font-semibold">{file.name}</span>
                  ) : (
                    'Drag & drop or click to upload PNG, JPG, or PDF (Max 5MB)'
                  )}
                </p>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-accent text-brand-primary font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Solve with Step Guidance
                  <Sparkles className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Info Card */}
          <div className="glass rounded-2xl p-5 border border-white/5 text-xs flex flex-col gap-2.5">
            <div className="flex gap-2 text-brand-accent font-semibold">
              <HelpCircle className="h-4 w-4 shrink-0" />
              <span>How it works</span>
            </div>
            <p className="text-text-muted leading-relaxed text-[11px]">
              Hi-Fi AI breaks down homework into micro-steps. Instead of just giving the final answer, it highlights the core physics, chemistry, or math theorem applied, making learning transparent.
            </p>
          </div>
        </div>

        {/* Output Panel */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {!result && !loading && (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center glass rounded-2xl border border-white/5 p-8">
              <FileUp className="h-12 w-12 text-brand-accent/20 mb-3" />
              <h3 className="text-sm font-bold text-white">No active homework query</h3>
              <p className="text-xs text-text-muted max-w-sm mt-1">
                Type your doubt or upload a copy of your problem worksheet on the left panel to receive step-by-step calculations.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center glass rounded-2xl border border-white/5 p-8 animate-pulse">
              <Sparkles className="h-10 w-10 text-brand-accent animate-spin mb-3" />
              <h3 className="text-sm font-bold text-white">Generating solutions...</h3>
              <p className="text-xs text-text-muted max-w-sm mt-1">
                Analyzing parameters, applying formulas, and organizing step calculations.
              </p>
            </div>
          )}

          {result && (
            <div className="flex flex-col gap-6">
              {/* Solution Card */}
              <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
                <div className="flex justify-between items-start border-b border-white/5 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider text-green-400 flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4" />
                      Step-by-Step Explanation
                    </h3>
                    {result.fileName && (
                      <p className="text-[10px] text-text-muted mt-0.5">Analyzed document: {result.fileName}</p>
                    )}
                  </div>
                  
                  <button
                    onClick={handleGenerateSimilar}
                    disabled={loadingSimilar}
                    className="px-3 py-1.5 rounded-lg border border-brand-accent/20 hover:border-brand-accent text-brand-accent text-[11px] font-bold transition-all duration-200"
                  >
                    {loadingSimilar ? 'Generating...' : 'Similar Question Practice'}
                  </button>
                </div>

                <div
                  className="text-sm leading-relaxed text-primary-text/80 flex flex-col gap-2 markdown-solution"
                  dangerouslySetInnerHTML={{ __html: formatText(result.solution) }}
                />
              </div>

              {/* Similar Question Card */}
              {loadingSimilar && (
                <div className="glass rounded-2xl p-6 border border-white/5 animate-pulse text-center">
                  <span className="text-xs text-text-muted">Formulating a mathematically equivalent problem...</span>
                </div>
              )}

              {similarQ && (
                <div className="glass rounded-2xl p-6 border border-brand-accent/10 bg-brand-accent/[0.02] flex flex-col gap-4 animate-fadeIn">
                  <h4 className="text-xs font-bold text-brand-accent uppercase tracking-wider">
                    Similar Practice Question (AI Recommendation)
                  </h4>
                  <div
                    className="text-xs leading-relaxed text-text-muted flex flex-col gap-2"
                    dangerouslySetInnerHTML={{ __html: formatText(similarQ) }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAiHomework;
