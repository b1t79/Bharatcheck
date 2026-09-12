import React, { useState, useEffect } from 'react';
import {
  X,
  FileText,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  Layers,
  Info
} from 'lucide-react';
import { ExtractedEntities, InspectionRecord } from '../types';

interface ExtractedTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: InspectionRecord | null;
  onApplyCorrections: (correctedEntities: ExtractedEntities, correctedRawText: string) => Promise<void>;
  isApplying: boolean;
}

export const ExtractedTextModal: React.FC<ExtractedTextModalProps> = ({
  isOpen,
  onClose,
  record,
  onApplyCorrections,
  isApplying,
}) => {
  const [activeTab, setActiveTab] = useState<'raw' | 'entities'>('raw');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Editable local state
  const [rawText, setRawText] = useState('');
  const [entities, setEntities] = useState<ExtractedEntities>({
    manufacturer: '',
    commonName: '',
    netQuantity: '',
    mfdDate: '',
    expiryDate: '',
    mrp: '',
    unitSalePrice: '',
    batchNo: '',
    consumerCare: '',
    countryOfOrigin: 'India',
    fssaiLicense: '',
    vegLogo: 'Present',
    energy: '',
    protein: '',
    carbohydrates: '',
    totalSugar: '',
    addedSugar: '',
    dietaryFiber: '',
    totalFat: '',
    saturatedFat: '',
    transFat: '',
    cholesterol: '',
    sodium: '',
    servingSize: 'Per 100g',
    ingredients: '',
  });

  // Sync state when record changes or modal opens
  useEffect(() => {
    if (record && isOpen) {
      setRawText(record.rawExtractedText || compileDefaultText(record.entities));
      setEntities({ ...record.entities });
    }
  }, [record, isOpen]);

  if (!isOpen || !record) return null;

  function compileDefaultText(ent: ExtractedEntities): string {
    const lines: string[] = [];
    if (ent.commonName) lines.push(`PRODUCT / COMMODITY: ${ent.commonName}`);
    if (ent.netQuantity) lines.push(`NET QUANTITY: ${ent.netQuantity}`);
    if (ent.mrp) lines.push(`MAXIMUM RETAIL PRICE (MRP): ${ent.mrp}`);
    if (ent.unitSalePrice) lines.push(`UNIT SALE PRICE (USP): ${ent.unitSalePrice}`);
    if (ent.batchNo) lines.push(`BATCH / LOT NO: ${ent.batchNo}`);
    if (ent.mfdDate) lines.push(`MFD DATE: ${ent.mfdDate}`);
    if (ent.expiryDate) lines.push(`EXPIRY / BEST BEFORE: ${ent.expiryDate}`);
    if (ent.fssaiLicense) lines.push(`FSSAI LIC NO: ${ent.fssaiLicense}`);
    if (ent.manufacturer) lines.push(`MANUFACTURER / PACKER: ${ent.manufacturer}`);
    if (ent.consumerCare) lines.push(`CONSUMER CARE: ${ent.consumerCare}`);
    if (ent.countryOfOrigin) lines.push(`COUNTRY OF ORIGIN: ${ent.countryOfOrigin}`);
    lines.push(`VEGETARIAN / NON-VEG: ${ent.vegLogo === 'Present' ? 'Vegetarian Green Dot' : 'Not detected'}`);
    if (ent.ingredients) lines.push(`\nINGREDIENTS:\n${ent.ingredients}`);
    lines.push(`\nNUTRITION (per 100g): Energy ${ent.energy}, Protein ${ent.protein}, Carbs ${ent.carbohydrates}, Fat ${ent.totalFat}`);
    return lines.join('\n');
  }

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleFieldChange = (key: keyof ExtractedEntities, val: string) => {
    setEntities((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleRevert = () => {
    if (record) {
      setRawText(record.rawExtractedText || compileDefaultText(record.entities));
      setEntities({ ...record.entities });
      setIsEditing(false);
    }
  };

  const handleSubmitCorrections = async () => {
    await onApplyCorrections(entities, rawText);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Extracted Packaging Text &amp; Statutory Parameters</span>
                {record.isManuallyEdited && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    Manually Corrected
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">
                Inspect raw OCR transcripts or correct misread declarations to re-execute compliance verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy extracted OCR text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isEditing
                  ? 'bg-amber-600/20 border-amber-500/50 text-amber-300'
                  : 'bg-blue-600 hover:bg-blue-500 border-blue-500 text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Exit Edit Mode' : 'Edit Extracted Text'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab & Mode Switcher */}
        <div className="px-5 py-2.5 bg-slate-950/50 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('raw')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'raw'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Verbatim OCR Text
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('entities')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'entities'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Statutory Fields Editor
            </button>
          </div>

          {isEditing && (
            <div className="flex items-center gap-2 text-amber-300 text-xs bg-amber-950/30 border border-amber-500/30 px-3 py-1 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Editing Active — Changes will trigger automated regulatory re-audit.</span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'raw' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  {isEditing ? 'Edit Full Verbatim OCR Transcript' : 'Transcribed Packaging Label Text'}
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                  {rawText.length} characters • {rawText.split('\n').length} lines
                </span>
              </div>

              {isEditing ? (
                <div className="space-y-1.5">
                  <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    rows={16}
                    className="w-full bg-slate-950/80 border border-amber-500/40 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-400 leading-relaxed"
                    placeholder="Correct any misread text lines from packaging label here..."
                  />
                  <p className="text-[11px] text-slate-400">
                    Tip: You can edit or paste raw OCR text, batch numbers, net quantity numerals, or missing FSSAI license numbers here.
                  </p>
                </div>
              ) : (
                <div className="relative rounded-xl border border-slate-800 bg-slate-950/70 p-4 max-h-[55vh] overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-blue-500/30">
                  {rawText}
                </div>
              )}
            </div>
          ) : (
            /* Tab 2: Structured Entity Parameters Form */
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Adjust any falsely extracted statutory values below. Correcting net quantity, font height parameters, or FSSAI license numbers will recalculate legal metrology compliance scores instantly.
                </span>
              </div>

              {/* General Declarations */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  LMPC Rule 6 Statutory Declarations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Common / Commodity Name
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.commonName}
                      onChange={(e) => handleFieldChange('commonName', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Net Quantity (e.g. 100g, 100 g / 3.5 oz)
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.netQuantity}
                      onChange={(e) => handleFieldChange('netQuantity', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Maximum Retail Price (MRP)
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.mrp}
                      onChange={(e) => handleFieldChange('mrp', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Unit Sale Price (USP)
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.unitSalePrice}
                      onChange={(e) => handleFieldChange('unitSalePrice', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Batch / Lot No.
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.batchNo}
                      onChange={(e) => handleFieldChange('batchNo', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      14-Digit FSSAI License No(s)
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.fssaiLicense}
                      onChange={(e) => handleFieldChange('fssaiLicense', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-blue-400 focus:outline-none focus:border-blue-500 font-mono"
                      placeholder="e.g. 13615010000200, 13619034000112"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Date of Manufacture / Packing
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.mfdDate}
                      onChange={(e) => handleFieldChange('mfdDate', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Expiry Date / Best Before
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.expiryDate}
                      onChange={(e) => handleFieldChange('expiryDate', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Vegetarian Emblem (Green Dot)
                    </label>
                    <select
                      disabled={!isEditing}
                      value={entities.vegLogo || 'Present'}
                      onChange={(e) => handleFieldChange('vegLogo', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Present">Present (Vegetarian Green Dot / Vegan)</option>
                      <option value="Not detected">Not detected / Non-Vegetarian</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Manufacturer / Packer / Marketer Details
                    </label>
                    <textarea
                      rows={2}
                      disabled={!isEditing}
                      value={entities.manufacturer}
                      onChange={(e) => handleFieldChange('manufacturer', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Consumer Care (Phone / Email / Address)
                    </label>
                    <textarea
                      rows={2}
                      disabled={!isEditing}
                      value={entities.consumerCare}
                      onChange={(e) => handleFieldChange('consumerCare', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Nutritional Panel Declarations */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  FSSAI 2020 Nutritional Declarations (per 100g)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Energy (kcal)</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.energy}
                      onChange={(e) => handleFieldChange('energy', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Protein (g)</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.protein}
                      onChange={(e) => handleFieldChange('protein', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Carbohydrates (g)</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.carbohydrates}
                      onChange={(e) => handleFieldChange('carbohydrates', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Total Sugar (g)</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.totalSugar}
                      onChange={(e) => handleFieldChange('totalSugar', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Total Fat (g)</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.totalFat}
                      onChange={(e) => handleFieldChange('totalFat', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Sodium (mg)</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={entities.sodium}
                      onChange={(e) => handleFieldChange('sodium', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-1 pt-2 border-t border-slate-800/80">
                <label className="block text-[11px] font-medium text-slate-400">
                  Verbatim Ingredients List
                </label>
                <textarea
                  rows={3}
                  disabled={!isEditing}
                  value={entities.ingredients}
                  onChange={(e) => handleFieldChange('ingredients', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 disabled:opacity-75 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono text-xs"
                  placeholder="Ingredients: e.g. Pumpkin Seeds (100%)"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            {isEditing ? (
              <span className="text-amber-400 font-medium flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5" /> Manual Correction Pending
              </span>
            ) : (
              <span className="text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Viewing extracted data. Click &quot;Edit Extracted Text&quot; to modify values.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isEditing && (
              <button
                type="button"
                onClick={handleRevert}
                disabled={isApplying}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Revert Changes</span>
              </button>
            )}

            {isEditing ? (
              <button
                type="button"
                onClick={handleSubmitCorrections}
                disabled={isApplying}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50"
              >
                {isApplying ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Re-Executing Audit...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Apply Corrections &amp; Re-Audit</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
