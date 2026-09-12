import React, { useState } from 'react';
import { X, Printer, Download, CheckCircle2, AlertTriangle, ShieldAlert, FileText, Image as ImageIcon } from 'lucide-react';
import { InspectionRecord } from '../types';
import { generateAndDownloadInspectionPDF } from '../utils/pdfExport';

interface InspectionReportModalProps {
  record: InspectionRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InspectionReportModal: React.FC<InspectionReportModalProps> = ({
  record,
  isOpen,
  onClose,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen || !record) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      await generateAndDownloadInspectionPDF(record, record.imageSrc);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Toolbar */}
        <div className="px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono text-blue-400">
              OFFICIAL STATUTORY INSPECTION CERTIFICATE
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">{record.scanId}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Generating PDF...' : 'Download PDF Report'}</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print View</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div className="p-8 overflow-y-auto bg-slate-950 text-slate-100 font-sans space-y-6 print:p-0 print:bg-white print:text-black">
          {/* Official Government Header */}
          <div className="text-center border-b border-slate-800 pb-5 space-y-1">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold font-mono">
              Government of India • Ministry of Consumer Affairs, Food &amp; Public Distribution
            </p>
            <h1 className="text-base font-bold text-slate-100 tracking-tight">
              DEPARTMENT OF LEGAL METROLOGY &amp; FOOD SAFETY AUTHORITY OF INDIA
            </h1>
            <p className="text-xs text-blue-400 font-mono font-bold">
              OFFICIAL STATUTORY PACKAGING INSPECTION &amp; VIOLATION AUDIT RECORD
            </p>
          </div>

          {/* Inspection Metadata Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Inspection Reference</span>
              <span className="font-mono font-bold text-slate-200">{record.scanId}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Audit Date &amp; Time</span>
              <span className="font-mono text-slate-300">{record.timestamp}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Governing Act</span>
              <span className="text-slate-300">Legal Metrology Act, 2009 &amp; FSSAI 2020</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Compliance Verdict</span>
              <span
                className={`font-bold font-mono uppercase ${
                  record.complianceStatus === 'COMPLIANT'
                    ? 'text-emerald-400'
                    : record.complianceStatus === 'NON_COMPLIANT'
                    ? 'text-rose-400'
                    : 'text-amber-400'
                }`}
              >
                {record.complianceStatus}
              </span>
            </div>
          </div>

          {/* Evidentiary Image & Product Particulars */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            {/* Left: Uploaded packaging image */}
            <div className="md:col-span-4 bg-slate-950 border border-slate-800 rounded-lg p-2.5 flex flex-col items-center justify-center min-h-[160px]">
              {record.imageSrc ? (
                <div className="space-y-2 w-full flex flex-col items-center">
                  <div className="relative max-h-56 overflow-hidden rounded border border-slate-800 flex items-center justify-center bg-black/40">
                    <img
                      src={record.imageSrc}
                      alt="Uploaded packaging label artifact"
                      className="max-h-52 w-auto object-contain rounded"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                    <ImageIcon className="w-3 h-3 text-blue-400" />
                    <span>Uploaded Packaging Artifact Attached</span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 space-y-1 text-slate-500">
                  <ImageIcon className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-xs font-mono">Digital Label Scan Recorded</p>
                  <p className="text-[10px] text-slate-600">(Included in PDF certification)</p>
                </div>
              )}
            </div>

            {/* Right: Product Particulars */}
            <div className="md:col-span-8 flex flex-col justify-between text-xs space-y-2">
              <div className="space-y-1.5">
                <div>
                  <strong className="text-slate-400">Commodity Name:</strong>{' '}
                  <span className="text-slate-100 font-semibold">{record.productName}</span>
                </div>
                <div>
                  <strong className="text-slate-400">Declared Brand:</strong>{' '}
                  <span className="text-slate-200">{record.brand}</span>
                </div>
                <div>
                  <strong className="text-slate-400">Manufacturer &amp; Address:</strong>{' '}
                  <span className="text-slate-200">{record.mfgName}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] text-slate-300 pt-1">
                  <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Declared MRP</span>
                    <strong>{record.mrp}</strong>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Net Quantity</span>
                    <strong>{record.netQty}</strong>
                  </div>
                  <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">FSSAI License</span>
                    <strong className={record.entities.fssaiLicense?.includes('Not') ? 'text-rose-400' : 'text-slate-200'}>
                      {record.entities.fssaiLicense}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Instant Download Action Banner */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Official PDF includes complete audit tables and embedded image.</span>
                </span>
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Download .PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* CRITICAL STATUTORY VIOLATIONS / ADVISORIES HIGHLIGHT BOX */}
          {record.violations && record.violations.length > 0 && (
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                record.complianceStatus === 'NON_COMPLIANT'
                  ? 'bg-rose-950/30 border-rose-500/40'
                  : 'bg-amber-950/30 border-amber-500/40'
              }`}
            >
              <div
                className={`flex items-center gap-2 font-bold text-xs ${
                  record.complianceStatus === 'NON_COMPLIANT' ? 'text-rose-400' : 'text-amber-400'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>
                  {record.complianceStatus === 'NON_COMPLIANT'
                    ? `CRITICAL STATUTORY VIOLATIONS & NUTRITIONAL ERRORS (${record.violations.length} FLAGGED)`
                    : `STATUTORY WARNINGS & UNDECLARED PARAMETERS (${record.violations.length} FLAGGED)`}
                </span>
              </div>
              <ul className="space-y-1.5 text-xs pl-2">
                {record.violations.map((v, i) => {
                  const isWarn = v.toLowerCase().includes('warning') || v.toLowerCase().includes('advisory');
                  return (
                    <li key={i} className={`flex items-start gap-2 leading-relaxed ${isWarn ? 'text-amber-200/90' : 'text-rose-200/90'}`}>
                      <span className={`font-bold ${isWarn ? 'text-amber-400' : 'text-rose-400'}`}>•</span>
                      <span>{v}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* PART I: LMPC 2011 Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              PART I: Legal Metrology (Packaged Commodities) Rules, 2011 Audit (Rule 6 Declarations)
            </h3>
            <table className="w-full text-left text-xs border border-slate-800">
              <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase">
                <tr>
                  <th className="p-2 border-b border-slate-800">Declaration Item</th>
                  <th className="p-2 border-b border-slate-800">Statutory Clause</th>
                  <th className="p-2 border-b border-slate-800">Found Value</th>
                  <th className="p-2 border-b border-slate-800 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-[11px]">
                {record.lmpcReport.map((item) => {
                  const isValUndeclared =
                    !item.foundValue ||
                    item.foundValue.trim() === '' ||
                    item.foundValue.toLowerCase().startsWith('not declared') ||
                    item.foundValue.toLowerCase().startsWith('not detected') ||
                    item.foundValue.toLowerCase().startsWith('missing') ||
                    item.foundValue.toLowerCase() === 'none' ||
                    item.foundValue.toLowerCase() === 'n/a';

                  const isPass = item.status === 'pass' && !isValUndeclared;
                  const isWarning = item.status === 'warning' || isValUndeclared;

                  return (
                    <tr key={item.id}>
                      <td className="p-2 text-slate-200 font-medium">{item.name}</td>
                      <td className="p-2 text-slate-400 font-mono">{item.lawRef}</td>
                      <td className="p-2 text-slate-300 font-mono">{item.foundValue}</td>
                      <td className="p-2 text-right">
                        {isPass ? (
                          <span className="text-emerald-400 font-bold">PASS</span>
                        ) : isWarning ? (
                          <span className="text-amber-400 font-bold">WARNING</span>
                        ) : (
                          <span className="text-rose-400 font-bold">FAIL</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PART II: Rule 9 Font Height Audit */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              PART II: Rule 9 Font Height &amp; Readability Audit
            </h3>
            <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">Required Minimum</span>
                <span className="font-bold text-amber-400">{record.fontAudit.requiredFontHeightMm} mm</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Estimated Measured</span>
                <span className="font-bold text-slate-200">{record.fontAudit.estimatedNetQtyFontMm} mm</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Rule 9 Status</span>
                <span className={`font-bold ${record.fontAudit.isCompliant ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {record.fontAudit.isCompliant ? 'PASS' : 'FAIL'}
                </span>
              </div>
            </div>
          </div>

          {/* PART III: Atwater Energy Verification */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              PART III: FSSAI 2020 &amp; Atwater Caloric Integrity
            </h3>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
              <p>
                <strong>Declared Energy:</strong> {record.scientificAudit.declaredKcal ?? 'N/A'} kcal |{' '}
                <strong>Calculated Atwater (4P+4C+9F):</strong> {record.scientificAudit.calculatedKcal} kcal |{' '}
                <strong>Variance:</strong> {record.scientificAudit.variancePct}% (FSSAI max 15% tolerance)
              </p>
            </div>
          </div>

          {/* PART IV: Statutory Notice Under Section 36 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-2 leading-relaxed">
            <strong className="text-slate-300 block uppercase tracking-wider text-[11px]">
              PART IV: Statutory Notice &amp; Legal Provisions
            </strong>
            <p>
              This electronic document constitutes an official digital compliance record under the{' '}
              <strong className="text-slate-200">Legal Metrology Act, 2009</strong> and the{' '}
              <strong className="text-slate-200">Legal Metrology (Packaged Commodities) Rules, 2011</strong>.
              Failure to comply with mandatory declarations, font specifications (Rule 9), or MRP declarations is
              punishable under <strong className="text-amber-400">Section 36 of the Legal Metrology Act, 2009</strong> with
              statutory penalties up to ₹25,000 for a first offence, extending to ₹1,00,000 or imprisonment for subsequent
              compounded offences.
            </p>
            <div className="pt-3 flex justify-between items-center text-[10px] font-mono border-t border-slate-800">
              <span>Inspecting Officer ID: LM-OFFICER-SIH26034</span>
              <span>DIGITALLY SIGNED &amp; SEALED • GOV.IN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

