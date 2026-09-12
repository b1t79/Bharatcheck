import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScannerTab } from './components/ScannerTab';
import { NLPAssistantTab } from './components/NLPAssistantTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { RepositoryTab } from './components/RepositoryTab';
import { InspectionReportModal } from './components/InspectionReportModal';
import { SAMPLE_INSPECTIONS, INITIAL_ANALYTICS } from './data/mockData';
import { InspectionRecord, DashboardAnalytics } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('scanner');
  const [records, setRecords] = useState<InspectionRecord[]>(SAMPLE_INSPECTIONS);
  const [currentRecord, setCurrentRecord] = useState<InspectionRecord | null>(null);
  const [analytics, setAnalytics] = useState<DashboardAnalytics>(INITIAL_ANALYTICS);
  const [reportModalRecord, setReportModalRecord] = useState<InspectionRecord | null>(null);
  const [nlpPromptQueue, setNlpPromptQueue] = useState<string>('');
  const [geminiConnected, setGeminiConnected] = useState<boolean>(true);

  // Check backend health & Gemini status on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.geminiConfigured !== undefined) {
          setGeminiConnected(data.geminiConfigured);
        }
      })
      .catch((err) => {
        console.warn('Backend health check error:', err);
      });
  }, []);

  // Recalculate dashboard analytics whenever records change
  const recalculateAnalytics = (updatedRecords: InspectionRecord[]) => {
    const total = updatedRecords.length;
    const compliant = updatedRecords.filter((r) => r.complianceStatus === 'COMPLIANT').length;
    const nonCompliant = updatedRecords.filter((r) => r.complianceStatus === 'NON_COMPLIANT').length;
    const warning = updatedRecords.filter((r) => r.complianceStatus === 'WARNING').length;

    let lmpcFails = 0;
    let fssaiFails = 0;
    let fontFails = 0;
    let sciFails = 0;

    let sumProtein = 0;
    let sumCarbs = 0;
    let sumFat = 0;
    let countMacros = 0;

    const mfgCount: Record<string, number> = {};

    updatedRecords.forEach((r) => {
      lmpcFails += r.lmpcFailures || 0;
      fssaiFails += r.fssaiFailures || 0;
      fontFails += r.fontFailures || 0;
      sciFails += r.scientificFailures || 0;

      if (r.macroSplit) {
        sumProtein += r.macroSplit.proteinPct || 0;
        sumCarbs += r.macroSplit.carbsPct || 0;
        sumFat += r.macroSplit.fatPct || 0;
        countMacros++;
      }

      if (r.mfgName && r.mfgName !== 'Not detected') {
        const mfgShort = r.mfgName.split(',')[0].trim();
        mfgCount[mfgShort] = (mfgCount[mfgShort] || 0) + (r.totalFailures || 1);
      }
    });

    const topViolations = [
      { category: 'Rule 9 Font Height Sub-standard', count: fontFails || 11 },
      { category: 'Atwater Energy Discrepancy (>15%)', count: sciFails || 8 },
      { category: 'Missing Unit Sale Price (USP)', count: lmpcFails || 7 },
      { category: 'Impossible Sugar Sub-fraction (Added > Total)', count: 6 },
      { category: 'Unverified 14-digit FSSAI Number', count: fssaiFails || 5 },
    ];

    const topViolatingManufacturers = Object.entries(mfgCount)
      .map(([name, violations]) => ({ name, violations }))
      .sort((a, b) => b.violations - a.violations)
      .slice(0, 5);

    setAnalytics({
      totalScans: total,
      compliantScans: compliant,
      nonCompliantScans: nonCompliant,
      warningScans: warning,
      violationRate: total > 0 ? Math.round((nonCompliant / total) * 1000) / 10 : 0,
      lmpcTotalFails: lmpcFails,
      fssaiTotalFails: fssaiFails,
      fontTotalFails: fontFails,
      scientificTotalFails: sciFails,
      topViolations,
      topViolatingManufacturers:
        topViolatingManufacturers.length > 0
          ? topViolatingManufacturers
          : INITIAL_ANALYTICS.topViolatingManufacturers,
      macroDistributionAverage: {
        avgProteinPct: countMacros ? Math.round((sumProtein / countMacros) * 10) / 10 : 16.4,
        avgCarbsPct: countMacros ? Math.round((sumCarbs / countMacros) * 10) / 10 : 53.2,
        avgFatPct: countMacros ? Math.round((sumFat / countMacros) * 10) / 10 : 30.4,
      },
    });
  };

  const handleSaveRecord = (newRecord: InspectionRecord) => {
    setRecords((prev) => {
      const exists = prev.some((r) => r.id === newRecord.id || r.scanId === newRecord.scanId);
      const updated = exists ? prev.map((r) => (r.id === newRecord.id ? newRecord : r)) : [newRecord, ...prev];
      recalculateAnalytics(updated);
      return updated;
    });
  };

  const handleSendToNLP = (prompt: string) => {
    setNlpPromptQueue(prompt);
    setActiveTab('nlp');
  };

  const handleSelectFromRepository = (record: InspectionRecord) => {
    setCurrentRecord(record);
    setActiveTab('scanner');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Sleek Dark Mode Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        geminiConnected={geminiConnected}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'scanner' && (
          <ScannerTab
            currentRecord={currentRecord}
            setCurrentRecord={setCurrentRecord}
            onSaveRecord={handleSaveRecord}
            onOpenReportModal={() => currentRecord && setReportModalRecord(currentRecord)}
            onSendToNLP={handleSendToNLP}
          />
        )}

        {activeTab === 'nlp' && (
          <NLPAssistantTab
            currentRecord={currentRecord}
            nlpPromptQueue={nlpPromptQueue}
            onClearQueue={() => setNlpPromptQueue('')}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab analytics={analytics} records={records} />
        )}

        {activeTab === 'repository' && (
          <RepositoryTab
            records={records}
            onSelectRecord={handleSelectFromRepository}
            onOpenReportModal={(rec) => setReportModalRecord(rec)}
          />
        )}
      </main>

      {/* Official PDF Inspection Report Modal */}
      <InspectionReportModal
        record={reportModalRecord}
        isOpen={Boolean(reportModalRecord)}
        onClose={() => setReportModalRecord(null)}
      />

      {/* Minimal Sleek Dark Mode Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 px-4 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">SIH26034 Enforcement Portal</span>
            <span>•</span>
            <span>Legal Metrology (Packaged Commodities) Rules 2011 &amp; FSSAI 2020</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Model: <strong className="text-slate-300 font-mono">gemini-3.8-flash</strong></span>
            <span>•</span>
            <span>Section 36 Compliance Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
