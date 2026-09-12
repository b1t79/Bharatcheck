import React from 'react';
import { Shield, Sparkles, Scale, BookOpen, AlertCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  geminiConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  geminiConnected,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Top Gov Information Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/60 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
              🇮🇳
            </span>
            <span className="font-semibold text-slate-300">
              Government of India
            </span>
            <span className="text-slate-600">|</span>
            <span>Ministry of Consumer Affairs, Food &amp; Public Distribution</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Gemini 3.8 Flash AI Engine Active
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-mono">SIH26034 Portal</span>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-lg shadow-blue-500/10 border border-blue-500/20 text-white font-bold text-xl">
              ⚖️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                  Food Safety &amp; Legal Metrology Enforcement Portal
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  LMPC 2011 &amp; FSSAI 2020
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Automated statutory inspection, real-time natural language processing &amp; advanced Atwater data analysis
              </p>
            </div>
          </div>

          {/* Regulatory Quick Badges */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5 font-mono text-[11px]">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Sec 36 Penalty Engine</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5 font-mono text-[11px]">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Rule 9 Font Table</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5 font-mono text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>15% Atwater Tolerance</span>
            </div>
          </div>
        </div>

        {/* Sleek Minimalist Tabs Navigation */}
        <div className="flex items-center gap-1.5 mt-4 pt-2 border-t border-slate-800/60 overflow-x-auto">
          <button
            id="tab-scanner"
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'scanner'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>📸</span>
            <span>Live Label Scanner</span>
          </button>

          <button
            id="tab-nlp"
            onClick={() => setActiveTab('nlp')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'nlp'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Real-Time NLP Assistant</span>
          </button>

          <button
            id="tab-analytics"
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>📊</span>
            <span>Advanced Data Analytics</span>
          </button>

          <button
            id="tab-repository"
            onClick={() => setActiveTab('repository')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'repository'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>🗄️</span>
            <span>Product Repository &amp; Search</span>
          </button>
        </div>
      </div>
    </header>
  );
};
