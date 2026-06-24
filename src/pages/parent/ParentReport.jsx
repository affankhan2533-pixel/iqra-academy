import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { ClipboardList, Download, Printer, User, UserCheck, ShieldCheck, AlertTriangle, Calendar, Award } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ParentReport = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const res = await api.get('/parent/report');
        setData(res.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load performance report details');
      } finally {
        setLoading(false);
      }
    };
    fetchReportData();
  }, []);

  const downloadPDF = () => {
    const reportElement = document.getElementById('report-card-container');
    if (!reportElement) return;

    const loadingToast = toast.loading('Compiling report card PDF...');
    
    // Dynamic import of html2canvas and jspdf
    Promise.all([
      import('html2canvas'),
      import('jspdf')
    ]).then(([html2canvasModule, jsPDFModule]) => {
      const html2canvas = html2canvasModule.default;
      const jsPDF = jsPDFModule.default;

      html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#000000',
        logging: false
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width
        const pageHeight = 295; // A4 height
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`${student?.user?.name.replace(/\s+/g, '_')}_performance_report.pdf`);
        toast.dismiss(loadingToast);
        toast.success('PDF report downloaded successfully!');
      }).catch((err) => {
        console.error(err);
        toast.dismiss(loadingToast);
        toast.error('Error rendering canvas to image');
      });
    }).catch((err) => {
      console.error(err);
      toast.dismiss(loadingToast);
      toast.error('Failed to load PDF libraries');
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-accent"></div>
      </div>
    );
  }

  const { student, attendance, results, fees, aiAnalysis } = data || {};

  // Formulate data for the Recharts Bar Chart
  const barData = aiAnalysis?.subjectAverages
    ? Object.keys(aiAnalysis.subjectAverages).map(sub => ({
        subject: sub,
        Percentage: aiAnalysis.subjectAverages[sub]
      }))
    : [
        { subject: 'Physics', Percentage: 80 },
        { subject: 'Chemistry', Percentage: 65 },
        { subject: 'Mathematics', Percentage: 85 },
        { subject: 'Biology', Percentage: 70 }
      ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Action panel */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4 text-left">
        <div>
          <h2 className="text-xl font-extrabold text-white">Academic Performance Report</h2>
          <p className="text-xs text-text-muted">Generate and download standard monthly report cards for student profile</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadPDF}
            className="px-4 py-2.5 bg-brand-accent text-brand-primary font-bold text-xs rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(222,219,200,0.15)]"
          >
            <Download className="h-4 w-4" />
            Download PDF Report
          </button>
        </div>
      </div>

      {/* Report Container (targeted by PDF generator) */}
      <div
        id="report-card-container"
        className="dark glass rounded-3xl p-8 border border-white/10 bg-black flex flex-col gap-8 text-left relative overflow-hidden"
      >
        {/* Header Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold tracking-wider text-brand-accent uppercase">Coaching Report Card</span>
            <h1 className="font-display font-extrabold text-3xl text-white">HI-FI CLASSES</h1>
            <p className="text-xs text-text-muted">Premium Coaching for Class 10, 11 & 12 Science</p>
          </div>
          <div className="text-left sm:text-right text-xs text-text-muted">
            <p className="text-white font-semibold">Report Period: June 2026</p>
            <p>Generated: {new Date().toLocaleDateString()}</p>
            <p>Portal ID: {student?.rollNo}</p>
          </div>
        </div>

        {/* Student metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-brand-secondary/30 p-5 rounded-2xl border border-white/5">
          <div>
            <span className="text-[10px] text-text-muted uppercase font-bold block">Student Name</span>
            <span className="text-sm font-semibold text-white mt-1 block">{student?.user?.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-text-muted uppercase font-bold block">Roll Number</span>
            <span className="text-sm font-semibold text-white mt-1 block">{student?.rollNo}</span>
          </div>
          <div>
            <span className="text-[10px] text-text-muted uppercase font-bold block">Enrolled Class</span>
            <span className="text-sm font-semibold text-white mt-1 block">{student?.class}</span>
          </div>
          <div>
            <span className="text-[10px] text-text-muted uppercase font-bold block">Batch Section</span>
            <span className="text-sm font-semibold text-white mt-1 block">{student?.batch?.name}</span>
          </div>
        </div>

        {/* Attendance Rates & Overview Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl border border-white/5 bg-brand-secondary/20 flex flex-col justify-between">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Attendance Percentage</span>
            <div className="flex items-baseline gap-1.5 my-3">
              <span className="text-4xl font-extrabold text-white">{attendance?.attendancePct}%</span>
              <span className="text-[10px] text-text-muted">Rate</span>
            </div>
            <div className="flex justify-between text-[10px] text-text-muted border-t border-white/5 pt-2">
              <span>Present: {attendance?.presentDays}</span>
              <span>Absent: {attendance?.absentDays}</span>
              <span>Late: {attendance?.lateDays}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-brand-secondary/20 flex flex-col justify-between">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Average Test Score</span>
            <div className="flex items-baseline gap-1.5 my-3">
              <span className="text-4xl font-extrabold text-brand-accent">
                {results && results.length > 0
                  ? `${Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length)}%`
                  : 'N/A'}
              </span>
              <span className="text-[10px] text-text-muted">Score</span>
            </div>
            <span className="text-[9px] text-text-muted block border-t border-white/5 pt-2">
              Aggregate of {results?.length || 0} monthly examinations
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-brand-secondary/20 flex flex-col justify-between">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Fee Account Status</span>
            <div className="flex items-baseline gap-1.5 my-3">
              <span className={`text-2xl font-extrabold ${student?.feeStatus === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                {student?.feeStatus}
              </span>
            </div>
            <span className="text-[9px] text-text-muted block border-t border-white/5 pt-2">
              June 2026 tuition payments
            </span>
          </div>
        </div>

        {/* Charts & Subject performance bar chart */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Subject-wise Performance Breakdown</h3>
          <div className="h-64 bg-brand-secondary/15 border border-white/5 rounded-2xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="subject" stroke="rgba(225, 224, 204, 0.4)" tick={{ fill: 'rgba(225, 224, 204, 0.6)', fontSize: 10 }} />
                <YAxis stroke="rgba(225, 224, 204, 0.4)" tick={{ fill: 'rgba(225, 224, 204, 0.6)', fontSize: 10 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#101010', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Bar dataKey="Percentage" fill="#DEDBC8" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Result Table history */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Monthly Exams Records</h3>
          <div className="overflow-x-auto border border-white/5 rounded-2xl">
            <table className="w-full text-xs text-left text-text-muted">
              <thead className="bg-brand-secondary/40 text-[10px] text-white uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4 font-bold">Exam Name</th>
                  <th className="p-4 font-bold">Subject</th>
                  <th className="p-4 font-bold">Marks</th>
                  <th className="p-4 font-bold">Percentage</th>
                  <th className="p-4 font-bold">Grade</th>
                  <th className="p-4 font-bold">Rank</th>
                </tr>
              </thead>
              <tbody>
                {results && results.length > 0 ? (
                  results.map((res) => (
                    <tr key={res._id} className="border-b border-white/5 hover:bg-white/[0.01]">
                      <td className="p-4 font-semibold text-white">{res.test?.name}</td>
                      <td className="p-4">{res.test?.subject}</td>
                      <td className="p-4">{res.obtainedMarks} / {res.test?.maxMarks}</td>
                      <td className="p-4 font-bold text-brand-accent">{res.percentage}%</td>
                      <td className="p-4">{res.grade}</td>
                      <td className="p-4">#{res.rank}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-text-muted">No test results listed.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Remarks & AI diagnostic suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6">
          <div className="p-5 rounded-2xl bg-brand-secondary/20 border border-white/5 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-accent" />
              Teacher Performance Remarks
            </h4>
            <p className="text-[11px] text-text-muted leading-relaxed italic">
              "{aiAnalysis?.monthlyReportRemarks}"
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cyan-500/[0.01] border border-cyan-500/10 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Award className="h-4 w-4 animate-pulse" />
              AI Performance Analysis & Recommendations
            </h4>
            <div className="flex flex-col gap-1 text-[11px] text-text-muted leading-relaxed">
              <p><strong>Strengths:</strong> {aiAnalysis?.strengthAnalysis}</p>
              <p className="mt-1"><strong>Areas to Improve:</strong> {aiAnalysis?.weaknessAnalysis}</p>
              <p className="mt-1 font-mono text-[9px] bg-brand-secondary/50 p-2 rounded border border-white/5 text-cyan-300">
                <strong>Recommended Study Plan:</strong><br />
                {aiAnalysis?.personalizedStudyPlan}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentReport;
