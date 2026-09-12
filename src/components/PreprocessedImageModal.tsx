import React, { useState, useEffect } from 'react';
import {
  X,
  Sliders,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Eye,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  generatePreprocessedImage,
  PreprocessingFilterMode
} from '../utils/imagePreprocessing';

interface PreprocessedImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalImageSrc: string | null;
  productName?: string;
}

export const PreprocessedImageModal: React.FC<PreprocessedImageModalProps> = ({
  isOpen,
  onClose,
  originalImageSrc,
  productName = 'Packaged Commodity'
}) => {
  const [filterMode, setFilterMode] = useState<PreprocessingFilterMode>('ocr-contrast');
  const [viewMode, setViewMode] = useState<'preprocessed' | 'original' | 'side-by-side'>('side-by-side');
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    if (!originalImageSrc || !isOpen) return;

    let isMounted = true;
    setIsProcessing(true);
    generatePreprocessedImage(originalImageSrc, filterMode)
      .then((res) => {
        if (isMounted) {
          setProcessedSrc(res);
          setIsProcessing(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setProcessedSrc(originalImageSrc);
          setIsProcessing(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [originalImageSrc, filterMode, isOpen]);

  if (!isOpen || !originalImageSrc) return null;

  const handleDownloadProcessed = () => {
    const srcToDownload = processedSrc || originalImageSrc;
    const link = document.createElement('a');
    link.href = srcToDownload;
    link.download = `Preprocessed_OCR_${productName.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Computer Vision Pre-Processed Packaging Image</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                  OCR Vision Pipeline
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Enhanced contrast and edge sharpening for Rule 9 numeral height and FSSAI text verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadProcessed}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download processed high-contrast image"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Export Image</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="px-5 py-2.5 bg-slate-950/50 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-3 text-xs">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-500 font-semibold px-2">View:</span>
            <button
              type="button"
              onClick={() => setViewMode('side-by-side')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'side-by-side'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Side-by-Side
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preprocessed')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'preprocessed'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pre-Processed
            </button>
            <button
              type="button"
              onClick={() => setViewMode('original')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'original'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Original Upload
            </button>
          </div>

          {/* Filter Preset Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-500 font-semibold">Filter:</span>
            <button
              type="button"
              onClick={() => setFilterMode('ocr-contrast')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                filterMode === 'ocr-contrast'
                  ? 'bg-blue-950/60 border-blue-500/50 text-blue-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Adaptive Contrast (Standard)
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('binarized')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                filterMode === 'binarized'
                  ? 'bg-blue-950/60 border-blue-500/50 text-blue-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Document Binarization
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('sharpened')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                filterMode === 'sharpened'
                  ? 'bg-blue-950/60 border-blue-500/50 text-blue-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Color Edge Sharpen
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
              className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-400 px-1 w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
              className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer ml-1"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Main Stage */}
        <div className="flex-1 overflow-auto p-4 bg-slate-950/90 flex items-center justify-center min-h-[380px]">
          {viewMode === 'side-by-side' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
              {/* Original Label */}
              <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/40 p-3 overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-400" /> Original Uploaded Label
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Unfiltered RGB</span>
                </div>
                <div className="flex-1 overflow-auto flex items-center justify-center min-h-[300px]">
                  <img
                    src={originalImageSrc}
                    alt="Original packaging"
                    style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                    className="max-h-[56vh] object-contain rounded-lg transition-transform"
                  />
                </div>
              </div>

              {/* Pre-Processed */}
              <div className="flex flex-col rounded-xl border border-blue-500/30 bg-blue-950/10 p-3 overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                  <span className="font-semibold text-blue-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Pre-Processed for OCR Vision
                  </span>
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">
                    {filterMode.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex-1 overflow-auto flex items-center justify-center min-h-[300px]">
                  {isProcessing ? (
                    <div className="flex flex-col items-center gap-2 text-xs text-slate-400">
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <span>Applying Computer Vision Filter...</span>
                    </div>
                  ) : (
                    <img
                      src={processedSrc || originalImageSrc}
                      alt="Pre-processed packaging"
                      style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                      className="max-h-[56vh] object-contain rounded-lg transition-transform border border-slate-800/80 shadow-md"
                    />
                  )}
                </div>
              </div>
            </div>
          ) : viewMode === 'preprocessed' ? (
            <div className="w-full flex flex-col items-center justify-center">
              <span className="text-xs font-semibold text-blue-400 mb-2">
                Pre-Processed Image ({filterMode.replace('-', ' ')})
              </span>
              <img
                src={processedSrc || originalImageSrc}
                alt="Pre-processed packaging"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                className="max-h-[64vh] object-contain rounded-lg transition-transform border border-slate-800 shadow-xl"
              />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              <span className="text-xs font-semibold text-slate-400 mb-2">
                Original Uploaded Packaging Image
              </span>
              <img
                src={originalImageSrc}
                alt="Original packaging"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
                className="max-h-[64vh] object-contain rounded-lg transition-transform border border-slate-800 shadow-xl"
              />
            </div>
          )}
        </div>

        {/* Pipeline Info Footer */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-4 flex-wrap text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Resolution Standardized (Max 1600px)
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Layers className="w-3.5 h-3.5 text-blue-400" /> Glare Suppression &amp; Contrast Sigmoid
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> High-Pass Sub-2mm Numeral Edge Sharpening
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
