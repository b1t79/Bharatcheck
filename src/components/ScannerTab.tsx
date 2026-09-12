import React, { useState, useRef } from 'react';
import {
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  MessageSquare,
  Scale,
  Activity,
  Layers,
  Search,
  RefreshCw,
  Eye,
  Info,
  Download,
  ShieldAlert,
  RotateCcw,
  ScanLine,
  Sliders,
  Edit3
} from 'lucide-react';
import { InspectionRecord, ExtractedEntities } from '../types';
import { generateAndDownloadInspectionPDF } from '../utils/pdfExport';
import { PreprocessedImageModal } from './PreprocessedImageModal';
import { ExtractedTextModal } from './ExtractedTextModal';

interface ScannerTabProps {
  currentRecord: InspectionRecord | null;
  setCurrentRecord: (record: InspectionRecord | null) => void;
  onSaveRecord: (record: InspectionRecord) => void;
  onOpenReportModal: () => void;
  onSendToNLP: (prompt: string) => void;
}

// Fast client-side image downscaler to reduce 5MB-15MB phone camera photos
// to crisp, optimized payloads (~250KB) for instant upload and accurate AI vision reading
const optimizeImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const raw = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 1600;
        let w = img.width;
        let h = img.height;
        if (w > MAX_DIM || h > MAX_DIM) {
          if (w > h) {
            h = Math.round((h * MAX_DIM) / w);
            w = MAX_DIM;
          } else {
            w = Math.round((w * MAX_DIM) / h);
            h = MAX_DIM;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.88));
        } else {
          resolve(raw);
        }
      };
      img.onerror = () => resolve(raw);
      img.src = raw;
    };
    reader.readAsDataURL(file);
  });
};

export const ScannerTab: React.FC<ScannerTabProps> = ({
  currentRecord,
  setCurrentRecord,
  onSaveRecord,
  onOpenReportModal,
  onSendToNLP,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [correctionSuccessMsg, setCorrectionSuccessMsg] = useState<string | null>(null);
  const [showPreprocessedModal, setShowPreprocessedModal] = useState(false);
  const [showExtractedModal, setShowExtractedModal] = useState(false);
  const [isApplyingCorrection, setIsApplyingCorrection] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setAnalysisError(null);
    try {
      const optimized = await optimizeImage(file);
      setSelectedImage(optimized);
    } catch (err) {
      console.warn('Image optimization error:', err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setAnalysisError(null);
    try {
      const optimized = await optimizeImage(file);
      setSelectedImage(optimized);
    } catch (err) {
      console.warn('Image drop optimization error:', err);
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setAnalysisError(null);
    try {
      const payload: any = {
        imageBase64: selectedImage,
        mimeType: 'image/jpeg',
      };
      if (uploadedFileName && !uploadedFileName.toLowerCase().includes('image') && !uploadedFileName.toLowerCase().includes('whatsapp')) {
        payload.productHint = uploadedFileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      }

      const res = await fetch('/api/analyze-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Inspection audit failed with HTTP ${res.status}. Please check image clarity.`);
      }
      const data: InspectionRecord = await res.json();
      if (selectedImage) {
        data.imageSrc = selectedImage;
      }
      setCurrentRecord(data);
      onSaveRecord(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setAnalysisError(err?.message || 'Failed to complete packaging compliance audit. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyCorrections = async (correctedEntities: ExtractedEntities, correctedRawText: string) => {
    setIsApplyingCorrection(true);
    setAnalysisError(null);
    try {
      const payload = {
        isManualCorrection: true,
        manualEntities: correctedEntities,
        manualRawText: correctedRawText,
        imageBase64: selectedImage || currentRecord?.imageSrc || undefined,
        productHint: correctedEntities.commonName || undefined,
      };

      const res = await fetch('/api/analyze-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to re-execute compliance audit with corrected parameters.');
      }

      const updatedRecord: InspectionRecord = await res.json();
      if (selectedImage || currentRecord?.imageSrc) {
        updatedRecord.imageSrc = selectedImage || currentRecord?.imageSrc;
      }
      updatedRecord.isManuallyEdited = true;
      updatedRecord.rawExtractedText = correctedRawText;
      setCurrentRecord(updatedRecord);
      onSaveRecord(updatedRecord);
      setShowExtractedModal(false);
      setCorrectionSuccessMsg('Statutory parameters successfully updated and regulatory audit re-calculated.');
      setTimeout(() => setCorrectionSuccessMsg(null), 5000);
    } catch (err: any) {
      console.error('Error applying corrections:', err);
      setAnalysisError(err?.message || 'Error updating record with manual corrections.');
    } finally {
      setIsApplyingCorrection(false);
    }
  };

  const handleDirectDownloadPDF = async () => {
    if (!currentRecord) return;
    try {
      setIsDownloadingPDF(true);
      await generateAndDownloadInspectionPDF(currentRecord, currentRecord.imageSrc || selectedImage || undefined);
    } catch (err) {
      console.error('Direct PDF download error:', err);
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  const handleResetScan = () => {
    setCurrentRecord(null);
    setSelectedImage(null);
    setUploadedFileName('');
    setAnalysisError(null);
    setCorrectionSuccessMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const statusBg = currentRecord
    ? currentRecord.complianceStatus === 'COMPLIANT'
      ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400'
      : currentRecord.complianceStatus === 'NON_COMPLIANT'
      ? 'border-rose-500/30 bg-rose-950/20 text-rose-400'
      : 'border-amber-500/30 bg-amber-950/20 text-amber-400'
    : '';

  return (
    <div className="space-y-6">
      {/* Upload and Inspection Execution Section */}
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Upload className="w-4 h-4 text-blue-400" />
            <span>Upload Product Packaging Label for Regulatory Compliance Audit</span>
          </h2>
          {uploadedFileName && (
            <span className="text-xs text-slate-400 font-mono truncate max-w-xs bg-slate-950/60 px-2.5 py-0.5 rounded border border-slate-800">
              {uploadedFileName}
            </span>
          )}
        </div>

        {correctionSuccessMsg && (
          <div className="mb-4 p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{correctionSuccessMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setCorrectionSuccessMsg(null)}
              className="text-emerald-400 hover:text-emerald-200 text-xs font-bold px-2 py-0.5 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {analysisError && (
          <div className="mb-4 p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{analysisError}</span>
            </div>
            <button
              type="button"
              onClick={() => setAnalysisError(null)}
              className="text-rose-400 hover:text-rose-200 text-xs font-bold px-2 py-0.5 rounded cursor-pointer shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700/80 hover:border-blue-500/60 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-950/40 group relative"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
          />
          {selectedImage ? (
            <div className="flex flex-col items-center gap-2">
              <img
                src={selectedImage}
                alt="Uploaded packaging"
                className="max-h-56 rounded-lg object-contain border border-slate-800 shadow-md"
              />
              <p className="text-xs text-blue-400 font-medium mt-1">
                Click or drag to replace image
              </p>
            </div>
          ) : (
            <div className="space-y-2 py-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Click to browse or drop product label image
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Supports high-resolution JPG, PNG (Front, Back &amp; Nutritional display panels)
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Gemini 3.8 Flash Multimodal Pipeline Ready</span>
          </div>

          <button
            type="button"
            onClick={handleRunAnalysis}
            disabled={isAnalyzing || !selectedImage}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isAnalyzing || !selectedImage
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
            }`}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing with Gemini 3.8 Flash...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Execute Gemini Compliance Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Primary Inspection Result Area */}
      {!currentRecord ? (
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner">
            <ScanLine className="w-7 h-7 animate-pulse" />
          </div>
          <div className="max-w-md space-y-1">
            <h3 className="text-base font-semibold text-slate-200">Awaiting Packaging Label Scan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload any product packaging label image above to initiate real-time automated LMPC Rule 6, Rule 9 numeral height, and FSSAI 2020 regulatory compliance inspection.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Primary Inspection Result Header Banner */}
          <div className={`border rounded-xl p-5 sm:p-6 ${statusBg} transition-all space-y-4 shadow-sm`}>
            {/* Top row: Status, Scan Reference, and New Scan Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  {currentRecord.complianceStatus === 'COMPLIANT' ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  ) : currentRecord.complianceStatus === 'NON_COMPLIANT' ? (
                    <XCircle className="w-7 h-7 text-rose-400" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-amber-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                      {currentRecord.complianceStatus === 'COMPLIANT'
                        ? 'STATUTORY COMPLIANCE CONFIRMED'
                        : currentRecord.complianceStatus === 'NON_COMPLIANT'
                        ? 'NON-COMPLIANT VIOLATION DETECTED'
                        : 'COMPLIANCE WARNING & ADVISORY'}
                    </h2>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-black/40 border border-current">
                      Ref: {currentRecord.scanId}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetScan}
                className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                title="Reset analysis and scan a new label"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>New Scan</span>
              </button>
            </div>

            {/* Middle row: Full-width description & Gemini AI Audit Note */}
            <div className="space-y-2.5 w-full">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {currentRecord.complianceStatus === 'COMPLIANT'
                  ? 'All mandatory Legal Metrology Rules 2011 declarations, Rule 9 font height dimensions, and FSSAI 2020 Atwater scientific caloric bounds are verified.'
                  : `Identified ${currentRecord.totalFailures} non-compliance flag${currentRecord.totalFailures === 1 ? '' : 's'} under Legal Metrology Act, 2009 (Section 36) and FSSAI Regulations 2020.`}
              </p>

              {currentRecord.aiInsights && (
                <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                  <span className="font-semibold text-blue-400 mr-2 font-mono">Gemini AI Audit Note:</span>
                  {currentRecord.aiInsights}
                </div>
              )}
            </div>

            {/* Bottom Toolbar: Inspection Transparency & Reporting actions */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              {/* Transparency & Editing Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowPreprocessedModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-blue-500/40 text-xs font-semibold text-blue-300 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  title="View computer vision pre-processed image with contrast and edge filters"
                >
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  <span>View Pre-Processed Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowExtractedModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  title="View complete verbatim extracted text"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>View Extracted Text</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowExtractedModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 text-xs font-bold text-blue-200 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  title="Edit falsely extracted values and re-run regulatory audit"
                >
                  <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Edit Manually</span>
                </button>
              </div>

              {/* PDF Export & Query Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleDirectDownloadPDF}
                  disabled={isDownloadingPDF}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  title="Download official PDF report with embedded packaging label image"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isDownloadingPDF ? 'Generating PDF...' : 'Download PDF Report'}</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenReportModal}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>View Certificate</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onSendToNLP(
                      `Explain the statutory violations found on ${currentRecord?.productName || 'this commodity'} and calculate Section 36 penalties.`
                    )
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Query in NLP</span>
                </button>
              </div>
            </div>
          </div>

      {/* Critical Flagged Violations Card OR Compliant Certificate Banner */}
      {currentRecord.violations && currentRecord.violations.length > 0 ? (
        <div
          className={`border rounded-xl p-4.5 space-y-3 ${
            currentRecord.complianceStatus === 'NON_COMPLIANT'
              ? 'bg-rose-950/30 border-rose-500/40'
              : 'bg-amber-950/30 border-amber-500/40'
          }`}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div
              className={`flex items-center gap-2 font-bold text-xs ${
                currentRecord.complianceStatus === 'NON_COMPLIANT'
                  ? 'text-rose-400'
                  : 'text-amber-400'
              }`}
            >
              {currentRecord.complianceStatus === 'NON_COMPLIANT' ? (
                <ShieldAlert className="w-4 h-4 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0" />
              )}
              <span>
                {currentRecord.complianceStatus === 'NON_COMPLIANT'
                  ? `FLAGGED STATUTORY, NUTRITIONAL & REGULATORY VIOLATIONS (${currentRecord.violations.length})`
                  : `STATUTORY ADVISORIES & UNDECLARED MANDATORY PARAMETERS (${currentRecord.violations.length})`}
              </span>
            </div>
            <button
              type="button"
              onClick={handleDirectDownloadPDF}
              disabled={isDownloadingPDF}
              className={`text-[11px] font-semibold flex items-center gap-1 cursor-pointer underline underline-offset-2 ${
                currentRecord.complianceStatus === 'NON_COMPLIANT'
                  ? 'text-rose-300 hover:text-white'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              <Download className="w-3 h-3" />
              <span>Download Official PDF Report</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {currentRecord.violations.map((v, i) => {
              const isWarning = v.toLowerCase().includes('warning') || v.toLowerCase().includes('advisory');
              return (
                <div
                  key={i}
                  className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                    isWarning
                      ? 'bg-amber-950/40 border-amber-900/60 text-amber-200/90'
                      : 'bg-rose-950/40 border-rose-900/60 text-rose-200/90'
                  }`}
                >
                  <span className={`font-bold leading-none mt-0.5 ${isWarning ? 'text-amber-400' : 'text-rose-400'}`}>
                    •
                  </span>
                  <span className="leading-relaxed">{v}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-4.5 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>ALL STATUTORY, NUTRITIONAL &amp; FSSAI REQUIREMENTS SATISFIED (0 VIOLATIONS)</span>
            </div>
            <button
              type="button"
              onClick={handleDirectDownloadPDF}
              disabled={isDownloadingPDF}
              className="text-[11px] font-semibold text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer underline underline-offset-2"
            >
              <Download className="w-3 h-3" />
              <span>Download Official Compliance Certificate</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-emerald-200/90 pt-1">
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/60 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>14-Digit FSSAI License Number(s) Verified</span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/60 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>LMPC 2011 Rule 6 Mandatory Inscriptions Present</span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/60 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Atwater Energetic &amp; Macronutrient Integrity Valid</span>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            LMPC Rule 6 Deficiencies
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span
              className={`text-2xl font-bold font-mono ${
                currentRecord.lmpcReport?.some((r) => r.status === 'fail')
                  ? 'text-rose-400'
                  : currentRecord.lmpcReport?.some(
                      (r) =>
                        r.status === 'warning' ||
                        !r.foundValue ||
                        r.foundValue.toLowerCase().startsWith('not declared') ||
                        r.foundValue.toLowerCase().startsWith('not detected')
                    )
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {
                (currentRecord.lmpcReport || []).filter(
                  (r) =>
                    r.status === 'fail' ||
                    r.status === 'warning' ||
                    !r.foundValue ||
                    r.foundValue.toLowerCase().startsWith('not declared') ||
                    r.foundValue.toLowerCase().startsWith('not detected')
                ).length
              }
            </span>
            <span className="text-[11px] text-slate-500">issues/warnings (of 9 rules)</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Rule 9 Font Height
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-2xl font-bold font-mono ${currentRecord.fontAudit.isCompliant ? 'text-emerald-400' : 'text-rose-400'}`}>
              {currentRecord.fontAudit.estimatedNetQtyFontMm} mm
            </span>
            <span className="text-[11px] text-slate-500">req. ≥{currentRecord.fontAudit.requiredFontHeightMm}mm</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Atwater Caloric Variance
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-2xl font-bold font-mono ${currentRecord.scientificAudit.variancePct > 15 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {currentRecord.scientificAudit.variancePct}%
            </span>
            <span className="text-[11px] text-slate-500">max 15% tol.</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            FSSAI License Status
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xs font-mono font-bold text-slate-200 truncate">
              {currentRecord.entities.fssaiLicense || 'Not detected'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">14 digits</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Legal Metrology (Packaged Commodities) Rules, 2011 Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200">
              PART I: Legal Metrology (Packaged Commodities) Rules, 2011 Audit
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Rule 6 Mandatory Declarations</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/40 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-4">Statutory Declaration</th>
                <th className="py-2.5 px-4">Governing Clause</th>
                <th className="py-2.5 px-4">Mandatory?</th>
                <th className="py-2.5 px-4">Extracted Value</th>
                <th className="py-2.5 px-4 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {currentRecord.lmpcReport.map((item) => {
                const isValUndeclared =
                  !item.foundValue ||
                  item.foundValue.trim() === '' ||
                  item.foundValue.toLowerCase().startsWith('not declared') ||
                  item.foundValue.toLowerCase().startsWith('not detected') ||
                  item.foundValue.toLowerCase().startsWith('missing') ||
                  item.foundValue.toLowerCase() === 'none' ||
                  item.foundValue.toLowerCase() === 'n/a';

                const isStatusPass = item.status === 'pass' && !isValUndeclared;
                const isStatusWarning = item.status === 'warning' || isValUndeclared;

                return (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-4 font-medium text-slate-200">
                      {item.name}
                    </td>
                    <td className="py-2.5 px-4 text-slate-400 font-mono text-[11px]">
                      {item.lawRef}
                    </td>
                    <td className="py-2.5 px-4 text-slate-400">
                      {item.mandatory ? (
                        <span className="text-amber-400 font-medium">Yes</span>
                      ) : (
                        'No'
                      )}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-300 max-w-xs truncate">
                      {item.foundValue}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      {isStatusPass ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> PASS
                        </span>
                      ) : isStatusWarning ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <AlertTriangle className="w-3 h-3" /> WARNING
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <XCircle className="w-3 h-3" /> FAIL
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Rule 9 Font Height & Caloric Scientific Audit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Rule 9 Font Audit */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>PART II: Rule 9 Font Height &amp; Legibility</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">LMPC Rule 9 Table 1</span>
          </div>

          <div className="mt-3.5 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                  Package Net Qty
                </span>
                <span className="text-sm font-bold text-slate-200 font-mono mt-0.5 block">
                  {currentRecord.entities.netQuantity || '50g'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                  Mandatory Min
                </span>
                <span className="text-sm font-bold text-amber-400 font-mono mt-0.5 block">
                  {currentRecord.fontAudit.requiredFontHeightMm} mm
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                  Measured Height
                </span>
                <span className={`text-sm font-bold font-mono mt-0.5 block ${currentRecord.fontAudit.isCompliant ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {currentRecord.fontAudit.estimatedNetQtyFontMm} mm
                </span>
              </div>
            </div>

            <div className="space-y-2 mt-2">
              {currentRecord.fontAudit.fontIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                    issue.status === 'pass'
                      ? 'border-emerald-500/20 bg-emerald-950/10 text-emerald-300'
                      : 'border-rose-500/20 bg-rose-950/10 text-rose-300'
                  }`}
                >
                  {issue.status === 'pass' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  )}
                  <div>
                    <span className="font-bold">{issue.field}:</span> {issue.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Atwater Scientific Caloric Audit */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>PART III: Atwater Mathematical Caloric Audit</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">4P + 4C + 9F + 2Fib</span>
          </div>

          <div className="mt-3.5 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                  Declared Energy
                </span>
                <span className="text-sm font-bold text-slate-200 font-mono mt-0.5 block">
                  {currentRecord.scientificAudit.declaredKcal ?? 'N/A'} kcal
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                  Calculated Atwater
                </span>
                <span className="text-sm font-bold text-blue-400 font-mono mt-0.5 block">
                  {currentRecord.scientificAudit.calculatedKcal} kcal
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                  Variance
                </span>
                <span className={`text-sm font-bold font-mono mt-0.5 block ${currentRecord.scientificAudit.variancePct > 15 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {currentRecord.scientificAudit.variancePct}%
                </span>
              </div>
            </div>

            {currentRecord.scientificAudit.discrepancies.length > 0 ? (
              <div className="space-y-2 mt-2">
                {currentRecord.scientificAudit.discrepancies.map((disc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-rose-500/20 bg-rose-950/15 text-xs text-rose-300 flex items-start gap-2.5"
                  >
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                    <div>
                      <span className="font-bold">{disc.type} ({disc.severity}):</span> {disc.detail}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-950/15 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mathematical energy calculation strictly conforms within the 15% statutory tolerance limit.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3: FSSAI 2020 Nutritional Declarations & Ingredients */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              PART IV: FSSAI 2020 Nutritional Facts &amp; Ingredients Audit
            </h3>
            <p className="text-xs text-slate-400">
              Values declared per 100g / 100ml as mandated under FSSAI Labelling and Display Regulations, 2020
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
            Serving: {currentRecord.entities.servingSize || 'Per 100g'}
          </span>
        </div>

        {/* Nutritional Metric Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Energy</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{currentRecord.entities.energy}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Protein</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{currentRecord.entities.protein}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Carbohydrates</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{currentRecord.entities.carbohydrates}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Total Sugars</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{currentRecord.entities.totalSugar}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Added Sugars</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{currentRecord.entities.addedSugar}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Total Fat</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{currentRecord.entities.totalFat}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Saturated Fat</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{currentRecord.entities.saturatedFat}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Trans Fat</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{currentRecord.entities.transFat}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Sodium</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{currentRecord.entities.sodium}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Dietary Fiber</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{currentRecord.entities.dietaryFiber || 'N/A'}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Cholesterol</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{currentRecord.entities.cholesterol}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">FSSAI Lic.</span>
            <span className="text-sm font-bold text-blue-400 font-mono">{currentRecord.entities.fssaiLicense}</span>
          </div>
        </div>

        {/* Ingredients Text Box */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Verbatim Ingredients Declaration (FSSAI Reg 2.2)
          </span>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            {currentRecord.entities.ingredients || 'Not detected on packaging.'}
          </p>
        </div>

        {/* OCR Extracted Text Quick Bar */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-semibold text-slate-200 block">
                Packaging Label OCR Transcript &amp; Parameters
              </span>
              <span className="text-[11px] text-slate-400">
                {currentRecord.rawExtractedText
                  ? `${currentRecord.rawExtractedText.length} characters transcribed from packaging panels`
                  : 'Verbatim parameters extracted'}
                {currentRecord.isManuallyEdited && ' • Verified & Manually Corrected'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowExtractedModal(true)}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Extracted Text</span>
            </button>
            <button
              type="button"
              onClick={() => setShowExtractedModal(true)}
              className="px-2.5 py-1 rounded bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-xs font-semibold text-blue-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Manually</span>
            </button>
          </div>
        </div>

        {/* Additives and Allergens Warning Flags */}
        {currentRecord.additives && currentRecord.additives.length > 0 && (
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Detected Food Additives &amp; Allergen Profile
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {currentRecord.additives.map((add, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs ${
                    add.risk === 'high'
                      ? 'border-rose-500/30 bg-rose-950/10 text-rose-300'
                      : add.risk === 'moderate'
                      ? 'border-amber-500/30 bg-amber-950/10 text-amber-300'
                      : 'border-slate-800 bg-slate-950 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{add.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase bg-black/40">
                      {add.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{add.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )}

  {/* Modals for Pre-Processed Image Inspection and Extracted Text Review / Manual Correction */}
  <PreprocessedImageModal
    isOpen={showPreprocessedModal}
    onClose={() => setShowPreprocessedModal(false)}
    originalImageSrc={selectedImage || currentRecord?.imageSrc || null}
    productName={currentRecord?.productName || uploadedFileName || 'Packaging Label'}
  />

  <ExtractedTextModal
    isOpen={showExtractedModal}
    onClose={() => setShowExtractedModal(false)}
    record={currentRecord}
    onApplyCorrections={handleApplyCorrections}
    isApplying={isApplyingCorrection}
  />
</div>
);
};
