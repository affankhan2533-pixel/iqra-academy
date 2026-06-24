import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import { Award, Download, FileText, Star, Calendar } from 'lucide-react';

const StudentResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get('/student/results');
        setResults(res.data);
      } catch (error) {
        toast.error('Failed to load test results');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  // PDF Report Card Generator using jsPDF native API (for clean crisp text)
  const handleDownloadReportCard = (result) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const test = result.test || {};
    const studentName = results[0]?.student?.user?.name || 'Student';
    const rollNo = results[0]?.student?.rollNo || 'N/A';
    const studentClass = results[0]?.student?.class || 'N/A';

    // 1. Border Frame
    doc.setDrawColor(16, 16, 16); // Brand primary color border (Charcoal)
    doc.setLineWidth(1);
    doc.rect(5, 5, 200, 287); // Page border
    doc.rect(6, 6, 198, 285); // Double page border

    // 2. Header Box
    doc.setFillColor(16, 16, 16);
    doc.rect(10, 10, 190, 35, 'F');

    // Title text inside Header Box
    doc.setTextColor(222, 219, 200); // Warm Cream (#DEDBC8)
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('IQRA ACADEMY', 105, 22, { align: 'center' });

    doc.setTextColor(225, 224, 204); // Warm Cream Text
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('PMGP Colony, Dharavi, Mumbai, Maharashtra 400017', 105, 28, { align: 'center' });
    doc.setFont('Helvetica', 'bolditalic');
    doc.text('ACADEMIC REPORT CARD', 105, 36, { align: 'center' });

    // 3. Student details details section
    doc.setTextColor(16, 16, 16);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('STUDENT INFORMATION', 12, 60);
    doc.setDrawColor(222, 219, 200);
    doc.setLineWidth(0.5);
    doc.line(12, 62, 198, 62);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Student Name:`, 12, 70);
    doc.setFont('Helvetica', 'bold');
    doc.text(`${studentName}`, 42, 70);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Roll Number:`, 125, 70);
    doc.setFont('Helvetica', 'bold');
    doc.text(`${rollNo}`, 155, 70);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Class/Course:`, 12, 77);
    doc.setFont('Helvetica', 'bold');
    doc.text(`${studentClass}`, 42, 77);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Evaluation Date:`, 125, 77);
    doc.setFont('Helvetica', 'bold');
    doc.text(`${new Date(test.date).toLocaleDateString()}`, 155, 77);

    // 4. Assessment Performance Table Header
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('ASSESSMENT PERFORMANCE', 12, 95);
    doc.line(12, 97, 198, 97);

    // Table headers draw
    doc.setFillColor(33, 33, 33); // Charcoal features bg
    doc.rect(12, 102, 186, 10, 'F');
    doc.setTextColor(222, 219, 200); // Warm Cream text
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Subject / Test Title', 15, 108);
    doc.text('Max Marks', 90, 108, { align: 'center' });
    doc.text('Marks Obtained', 125, 108, { align: 'center' });
    doc.text('Percentage', 155, 108, { align: 'center' });
    doc.text('Grade', 185, 108, { align: 'center' });

    // Table rows draw
    doc.setDrawColor(229, 228, 231);
    doc.setLineWidth(0.3);
    doc.rect(12, 102, 186, 25); // Outline
    doc.line(12, 112, 198, 112); // Split header

    doc.setTextColor(16, 16, 16);
    doc.setFont('Helvetica', 'bold');
    doc.text(`${test.subject || 'N/A'} - ${test.name || 'N/A'}`, 15, 120);

    doc.setFont('Helvetica', 'normal');
    doc.text(`${test.maxMarks || '0'}`, 90, 120, { align: 'center' });
    doc.setFont('Helvetica', 'bold');
    doc.text(`${result.obtainedMarks || '0'}`, 125, 120, { align: 'center' });
    doc.text(`${result.percentage || '0'}%`, 155, 120, { align: 'center' });
    
    // Colored grade
    doc.setTextColor(16, 120, 80); // dark emerald-like green
    doc.text(`${result.grade || 'F'}`, 185, 120, { align: 'center' });

    // 5. Remarks & Mentorship feedback
    doc.setTextColor(16, 16, 16);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('FACULTY REMARKS & FEEDBACK', 12, 145);
    doc.setDrawColor(222, 219, 200);
    doc.line(12, 147, 198, 147);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Tutor Comments:`, 12, 155);
    doc.setFont('Helvetica', 'italic');
    doc.text(`"${result.remarks || 'No remarks provided. Good work.'}"`, 45, 155);

    doc.setFont('Helvetica', 'normal');
    doc.text(`Class Rank:`, 12, 163);
    doc.setFont('Helvetica', 'bold');
    doc.text(`#${result.rank || 'N/A'} in batch`, 45, 163);

    // 6. Signature blocks
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Class Teacher Signature', 30, 230);
    doc.line(20, 225, 75, 225);

    doc.text('Academy Director Signature', 145, 230);
    doc.line(135, 225, 190, 225);

    // Footer copyright
    doc.setFontSize(8);
    doc.setTextColor(136, 146, 176);
    doc.text('This is an official document of Iqra Academy Education Management System (EMS).', 105, 275, { align: 'center' });

    // Trigger download
    doc.save(`Iqra_Academy_ReportCard_${studentName.replace(' ', '_')}_${test.name.replace(' ', '_')}.pdf`);
    toast.success('Report Card PDF downloaded successfully!');
  };

  return (
    <div className="flex flex-col gap-6 text-left relative min-h-[70vh]">
      <div>
        <h2 className="font-display font-extrabold text-2xl text-white">My Test Results</h2>
        <p className="text-sm text-text-muted">Track your academic marks and download formal PDF report cards.</p>
      </div>

      {/* Results details cards / table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-accent"></div>
        </div>
      ) : (
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5 text-xs font-semibold uppercase tracking-wider text-white">
                  <th className="p-4">Test Name</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Marks Obtained</th>
                  <th className="p-4">Percentage</th>
                  <th className="p-4">Grade</th>
                  <th className="p-4">Batch Rank</th>
                  <th className="p-4 text-center">Report Card</th>
                </tr>
              </thead>
              <tbody className="text-sm text-text-muted divide-y divide-white/5">
                {results.length > 0 ? (
                  results.map((r) => (
                    <tr key={r._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white font-semibold">{r.test?.name}</td>
                      <td className="p-4 font-medium text-brand-accent">{r.test?.subject}</td>
                      <td className="p-4 text-white font-bold">
                        {r.obtainedMarks} / {r.test?.maxMarks}
                      </td>
                      <td className="p-4">{r.percentage}%</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-bold ${
                            r.grade === 'A+' || r.grade === 'A'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                              : 'bg-brand-secondary text-white'
                          }`}
                        >
                          {r.grade}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-white">Rank #{r.rank}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDownloadReportCard(r)}
                          className="px-2.5 py-1.5 rounded-lg bg-brand-accent text-brand-primary hover:bg-brand-accent-light font-bold text-xs transition-all flex items-center gap-1.5 mx-auto"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center">No assessments completed.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentResults;
