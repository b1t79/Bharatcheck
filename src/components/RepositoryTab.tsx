import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, XCircle, AlertTriangle, Eye, ArrowUpRight, FileText } from 'lucide-react';
import { InspectionRecord } from '../types';

interface RepositoryTabProps {
  records: InspectionRecord[];
  onSelectRecord: (record: InspectionRecord) => void;
  onOpenReportModal: (record: InspectionRecord) => void;
}

export const RepositoryTab: React.FC<RepositoryTabProps> = ({
  records,
  onSelectRecord,
  onOpenReportModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'COMPLIANT' | 'NON_COMPLIANT' | 'WARNING'>('ALL');
  const [selectedPreview, setSelectedPreview] = useState<InspectionRecord | null>(records[0] || null);

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      (r.productName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.brand || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.mfgName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.scanId || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || r.complianceStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Product, Brand, Manufacturer, or Scan ID..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {(['ALL', 'COMPLIANT', 'NON_COMPLIANT', 'WARNING'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                statusFilter === st
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {st === 'ALL' ? 'All Statuses' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Records Table + Detail Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Records Table */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">
              Inspection Registry ({filteredRecords.length} Commodities)
            </h3>
            <span className="text-xs text-slate-500 font-mono">SQLite Repository</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-4">Commodity / Brand</th>
                  <th className="py-2.5 px-4">Scan ID &amp; Date</th>
                  <th className="py-2.5 px-4">MRP &amp; Net Qty</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                      No matching records found.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((rec) => {
                    const isSelected = selectedPreview?.id === rec.id;
                    return (
                      <tr
                        key={rec.id}
                        onClick={() => setSelectedPreview(rec)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-950/20' : 'hover:bg-slate-800/30'
                        }`}
                      >
                        <td className="py-3 px-4 font-medium text-slate-200">
                          <div>{rec.productName}</div>
                          <div className="text-[11px] text-slate-500 font-normal">{rec.brand}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                          <div>{rec.scanId}</div>
                          <div className="text-[10px] text-slate-500">{rec.timestamp}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-300">
                          <div>{rec.mrp}</div>
                          <div className="text-[11px] text-slate-500">{rec.netQty}</div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                              rec.complianceStatus === 'COMPLIANT'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : rec.complianceStatus === 'NON_COMPLIANT'
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {rec.complianceStatus === 'COMPLIANT' ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : rec.complianceStatus === 'NON_COMPLIANT' ? (
                              <XCircle className="w-3 h-3" />
                            ) : (
                              <AlertTriangle className="w-3 h-3" />
                            )}
                            {rec.complianceStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectRecord(rec);
                            }}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 text-[11px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Inspect</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Record Detail Panel */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          {selectedPreview ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Record Overview
                </h3>
                <span className="font-mono text-[11px] text-blue-400">
                  {selectedPreview.scanId}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-100">
                  {selectedPreview.productName}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedPreview.mfgName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">MRP</span>
                  <span className="font-bold text-slate-200">{selectedPreview.mrp}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Net Qty</span>
                  <span className="font-bold text-slate-200">{selectedPreview.netQty}</span>
                </div>
              </div>

              {/* Violations List */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Recorded Violations ({(selectedPreview.violations || []).length})
                </span>
                {(selectedPreview.violations || []).length === 0 ? (
                  <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>No statutory violations recorded.</span>
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {(selectedPreview.violations || []).map((v, i) => (
                      <div
                        key={i}
                        className="p-2 rounded bg-rose-950/20 border border-rose-500/20 text-[11px] text-rose-300 flex items-start gap-2"
                      >
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <button
                  type="button"
                  onClick={() => onSelectRecord(selectedPreview)}
                  className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Load into Live Scanner
                </button>
                <button
                  type="button"
                  onClick={() => onOpenReportModal(selectedPreview)}
                  className="w-full py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>View Official Certificate</span>
                </button>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs">
              Select any record to view detailed findings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
