import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { X, Printer, User, Phone, MapPin, BookOpen, DollarSign, Edit2, Check, Landmark, GraduationCap } from 'lucide-react';

const StudentDetailModal = ({ isOpen, onClose, student: initialStudent, onUpdate }) => {
  const [student, setStudent] = useState(initialStudent);
  const [isEditingFees, setIsEditingFees] = useState(false);
  const [totalFee, setTotalFee] = useState('');
  const [paidFee, setPaidFee] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialStudent) {
      setStudent(initialStudent);
      setTotalFee(initialStudent.totalFee || 0);
      setPaidFee(initialStudent.paidFee || 0);
    }
  }, [initialStudent]);

  if (!isOpen || !student) return null;

  const handleSaveFees = async () => {
    setSaving(true);
    try {
      const payload = {
        name: student.user?.name,
        email: student.user?.email,
        rollNo: student.rollNo,
        class: student.class,
        batch: student.batch?._id || null,
        parentName: student.parentName,
        parentContact: student.parentContact,
        address: student.address,
        totalFee: Number(totalFee),
        paidFee: Number(paidFee)
      };

      const res = await api.put(`/admin/students/${student._id}`, payload);
      toast.success('Fees updated successfully');
      
      // Update local state with returned student details (populated from DB)
      // Note: we can reconstruct batch or wait for parent refresh
      const updatedStudent = {
        ...student,
        totalFee: Number(totalFee),
        paidFee: Number(paidFee),
        remainingFee: Number(totalFee) - Number(paidFee),
        feeStatus: Number(totalFee) - Number(paidFee) <= 0 ? 'Paid' : 'Pending'
      };
      
      setStudent(updatedStudent);
      setIsEditingFees(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update fees');
    } finally {
      setSaving(false);
    }
  };

  const remainingFee = (Number(totalFee) - Number(paidFee)) || 0;
  const statusBadge = student.feeStatus === 'Paid'
    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="w-full max-w-2xl glass rounded-3xl border border-white/10 p-6 flex flex-col gap-6 max-h-[90vh] overflow-y-auto animate-fadeIn relative text-left">
        
        {/* Style tag for print layout optimization */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            /* Hide all regular page elements */
            body {
              visibility: hidden !important;
              background: white !important;
            }
            #root {
              visibility: hidden !important;
            }
            /* Make the printable ledger visible and format it */
            .print-area {
              visibility: visible !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              height: auto !important;
              background: white !important;
              color: black !important;
              padding: 24px !important;
              margin: 0 !important;
            }
            .print-area * {
              visibility: visible !important;
              color: black !important;
              background: transparent !important;
              border-color: #ddd !important;
            }
            /* Override flex/grid borders and padding inside printable zone */
            .print-area div {
              border-color: #ddd !important;
            }
            /* Override layout parents to prevent height clipping */
            .fixed, .absolute, .relative, div, main, body, html {
              position: static !important;
              overflow: visible !important;
              max-height: none !important;
              height: auto !important;
              border: none !important;
              box-shadow: none !important;
            }
            .no-print {
              display: none !important;
            }
            .print-badge {
              border: 1px solid black !important;
              background: transparent !important;
              color: black !important;
            }
          }
        `}} />

        {/* Header (hidden in print) */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3 no-print">
          <h3 className="font-display font-extrabold text-xl text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-brand-accent" />
            Student Details Ledger
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/50 text-white hover:text-brand-accent transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-text-muted hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Print & View Area */}
        <div className="print-area flex flex-col gap-6">
          {/* Institution Header for Print Only */}
          <div className="hidden print:flex flex-col items-center justify-center border-b border-gray-300 pb-4 text-center">
            <h1 className="text-2xl font-black tracking-wider text-black">IQRA ACADEMY</h1>
            <p className="text-sm text-gray-600">Room No. 309, Building 5-B, PMGP Colony, Dharavi, Mumbai</p>
            <p className="text-xs text-gray-500">Email: contact@iqraacademy.com | Contact: +91 9876543210</p>
            <h2 className="text-md font-bold mt-4 px-4 py-1 border border-black uppercase tracking-widest">Fee Ledger & Student Statement</h2>
          </div>

          {/* Student Profile Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-brand-accent uppercase tracking-wider no-print">Student Profile</h4>
              <div className="flex flex-col gap-2 bg-brand-secondary/20 print:bg-transparent border border-white/5 print:border-none p-4 rounded-2xl">
                <div className="flex justify-between items-center text-sm border-b border-white/5 print:border-gray-200 pb-2">
                  <span className="text-text-muted print:text-gray-600 font-medium flex items-center gap-1.5">
                    <User className="w-4 h-4 text-brand-accent print:text-black shrink-0" /> Name:
                  </span>
                  <span className="text-white print:text-black font-semibold">{student.user?.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/5 print:border-gray-200 pb-2">
                  <span className="text-text-muted print:text-gray-600 font-medium">Roll Number:</span>
                  <span className="text-white print:text-black font-mono font-medium">{student.rollNo}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/5 print:border-gray-200 pb-2">
                  <span className="text-text-muted print:text-gray-600 font-medium">Class:</span>
                  <span className="text-white print:text-black font-semibold">{student.class}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-muted print:text-gray-600 font-medium flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-brand-accent print:text-black shrink-0" /> Batch:
                  </span>
                  <span className="text-white print:text-black font-semibold">
                    {student.batch?.name || <span className="text-red-400 print:text-black italic">Unassigned</span>}
                  </span>
                </div>
              </div>
            </div>

            {/* Parent Details */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-brand-accent uppercase tracking-wider no-print">Parent / Guardian & Address</h4>
              <div className="flex flex-col gap-2 bg-brand-secondary/20 print:bg-transparent border border-white/5 print:border-none p-4 rounded-2xl">
                <div className="flex justify-between items-center text-sm border-b border-white/5 print:border-gray-200 pb-2">
                  <span className="text-text-muted print:text-gray-600 font-medium">Parent Name:</span>
                  <span className="text-white print:text-black font-semibold">{student.parentName}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/5 print:border-gray-200 pb-2">
                  <span className="text-text-muted print:text-gray-600 font-medium flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-brand-accent print:text-black shrink-0" /> Contact No:
                  </span>
                  <span className="text-white print:text-black font-mono">{student.parentContact}</span>
                </div>
                <div className="flex flex-col gap-1 text-sm mt-1">
                  <span className="text-text-muted print:text-gray-600 font-medium flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-accent print:text-black shrink-0" /> Address:
                  </span>
                  <span className="text-white print:text-black text-xs leading-relaxed mt-0.5 whitespace-pre-line pl-5 font-medium">
                    {student.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Statement Ledger Card */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-white/5 print:border-gray-300 pb-1.5">
              <h4 className="text-xs font-bold text-brand-accent print:text-black uppercase tracking-wider">Fee Account Details</h4>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold print-badge ${statusBadge}`}>
                {student.feeStatus || 'Pending'}
              </span>
            </div>

            <div className="bg-brand-secondary/30 print:bg-transparent border border-white/5 print:border border-gray-300 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              
              {/* Total Fee Block */}
              <div className="flex flex-col gap-1 border-r border-white/5 print:border-gray-200 last:border-none pr-4 md:border-r print:md:border-gray-200">
                <span className="text-xs font-medium text-text-muted print:text-gray-600 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-brand-accent print:text-black" /> Total Fee Payable
                </span>
                {isEditingFees ? (
                  <input
                    type="number"
                    value={totalFee}
                    onChange={(e) => setTotalFee(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 bg-brand-primary border border-white/10 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    placeholder="Total Fee"
                  />
                ) : (
                  <span className="text-xl font-extrabold text-white print:text-black mt-1">
                    ₹{student.totalFee || 0}
                  </span>
                )}
              </div>

              {/* Paid Fee Block */}
              <div className="flex flex-col gap-1 border-r border-white/5 print:border-gray-200 last:border-none pr-4 md:border-r print:md:border-gray-200">
                <span className="text-xs font-medium text-text-muted print:text-gray-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400 print:text-black" /> Amount Paid
                </span>
                {isEditingFees ? (
                  <input
                    type="number"
                    value={paidFee}
                    onChange={(e) => setPaidFee(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 bg-brand-primary border border-white/10 rounded-xl text-sm text-white focus:border-brand-accent outline-none"
                    placeholder="Paid Fee"
                  />
                ) : (
                  <span className="text-xl font-extrabold text-emerald-400 print:text-black mt-1">
                    ₹{student.paidFee || 0}
                  </span>
                )}
              </div>

              {/* Remaining Fee Block */}
              <div className="flex flex-col gap-1 pr-4">
                <span className="text-xs font-medium text-text-muted print:text-gray-600 flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-amber-400 print:text-black" /> Remaining Dues
                </span>
                <span className={`text-xl font-extrabold mt-1 ${remainingFee > 0 ? 'text-amber-400' : 'text-emerald-400'} print:text-black`}>
                  ₹{isEditingFees ? remainingFee : (student.remainingFee || 0)}
                </span>
              </div>

              {/* Manual Editing Trigger (Admin role check - hidden in print) */}
              <div className="absolute top-4 right-4 no-print">
                {isEditingFees ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveFees}
                      disabled={saving}
                      className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-brand-primary transition-all text-xs font-bold flex items-center gap-1"
                      title="Save Fees"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setTotalFee(student.totalFee || 0);
                        setPaidFee(student.paidFee || 0);
                        setIsEditingFees(false);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditingFees(true)}
                    className="p-1.5 rounded-lg bg-brand-accent/10 border border-brand-accent/20 text-brand-accent hover:bg-brand-accent hover:text-brand-primary transition-all flex items-center gap-1 text-[11px] font-bold"
                    title="Edit Fees Manually"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit Fees
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Receipt declaration block for printing */}
          <div className="hidden print:flex flex-col gap-10 mt-12 text-sm">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <p className="border-t border-black w-48 text-center pt-1 font-bold">Student/Parent Signature</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="border-t border-black w-48 text-center pt-1 font-bold">Authorized Signatory</p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-4 text-center text-xs text-gray-500 mt-6">
              Thank you for choosing Iqra Academy for academic excellence. This is a computer-generated invoice statement.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
