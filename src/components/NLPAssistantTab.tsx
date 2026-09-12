import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Scale, BookOpen, AlertCircle, RefreshCw, User, Bot, Copy, Check } from 'lucide-react';
import { InspectionRecord, NLPMessage } from '../types';

interface NLPAssistantTabProps {
  currentRecord: InspectionRecord | null;
  nlpPromptQueue?: string;
  onClearQueue?: () => void;
}

export const NLPAssistantTab: React.FC<NLPAssistantTabProps> = ({
  currentRecord,
  nlpPromptQueue,
  onClearQueue,
}) => {
  const [messages, setMessages] = useState<NLPMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hello, Officer. I am your **Real-Time Gemini AI Regulatory & Compliance Assistant** for Indian Legal Metrology (LMPC Rules 2011) and FSSAI 2020 Standards.

${currentRecord ? `I currently have active context for: **${currentRecord.productName || 'Selected Item'}** (${currentRecord.brand || 'Unbranded'} - Net Qty: ${currentRecord.netQty || 'N/A'}).` : 'You can ask general statutory questions, or scan a packaging label in the Scanner tab for specific audit context.'}

You can ask me to:
- Explain specific statutory violations or Atwater discrepancies
- Calculate penalties under **Section 36 of the Legal Metrology Act, 2009**
- Draft formal Inspection Notice / Summon letters to manufacturers
- Interpret FSSAI 2020 display guidelines and Rule 9 font height tables
- Compare macronutrient profiles against Indian RDA standards`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Explain why this product failed the Atwater test',
        'Draft a Section 36 Notice to manufacturer',
        'What is the Rule 9 font requirement for this pack?',
        'Verify sugar sub-fraction rules under FSSAI'
      ],
      citations: [
        'Legal Metrology Act, 2009 (Sec 36)',
        'Legal Metrology (PC) Rules, 2011 (Rule 6, Rule 9)',
        'FSSAI (Labelling & Display) Regulations, 2020'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (nlpPromptQueue) {
      handleSend(nlpPromptQueue);
      onClearQueue?.();
    }
  }, [nlpPromptQueue]);

  const handleSend = async (queryToSend?: string) => {
    const query = (queryToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg: NLPMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/nlp-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          activeRecord: currentRecord,
          history: messages.slice(-4),
        }),
      });

      if (!res.ok) throw new Error('NLP query failed');
      const data = await res.json();

      const assistantMsg: NLPMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'Received analysis from Gemini.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: data.suggestedActions,
        citations: data.citations,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('NLP Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: `An error occurred while querying Gemini 3.8 Flash. Operating in local mode:
          
Rule 6 of LMPC 2011 mandates 9 primary declarations. Under Section 36 of the Legal Metrology Act, 2009, non-compliant packaging attracts fines up to ₹25,000 for a first offense.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-210px)] min-h-[600px] bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Top Context Header */}
      <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-200">
              Gemini 3.8 Flash Real-Time NLP Regulatory Assistant
            </h2>
            <p className="text-[11px] text-slate-400">
              Interactive legal reasoning, mathematical validation &amp; notice generation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Active Target:</span>
          {currentRecord ? (
            <>
              <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-blue-400 font-semibold truncate max-w-[200px]">
                {currentRecord?.productName || 'Unnamed Commodity'}
              </span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                currentRecord.complianceStatus === 'COMPLIANT'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : currentRecord.complianceStatus === 'NON_COMPLIANT'
                  ? 'bg-rose-500/20 text-rose-400'
                  : 'bg-amber-500/20 text-amber-400'
              }`}>
                {currentRecord.complianceStatus}
              </span>
            </>
          ) : (
            <span className="px-2 py-0.5 rounded bg-slate-950/60 border border-slate-800 text-slate-400 italic text-[11px]">
              None selected (General Statutory Q&amp;A Mode)
            </span>
          )}
        </div>
      </div>

      {/* Messages Chat Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 border border-slate-700 text-amber-400'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1 text-[10px] opacity-75">
                  <span className="font-semibold">{isUser ? 'Enforcement Officer' : 'Gemini 3.8 Flash'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed">
                  {msg.text}
                </div>

                {/* Citations & Suggested Actions for Assistant Messages */}
                {!isUser && msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-mono">Statutory Citations:</span>
                    {msg.citations.map((cite, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {cite}
                      </span>
                    ))}
                  </div>
                )}

                {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {msg.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(action)}
                        className="px-2.5 py-1 rounded-full text-[11px] bg-slate-900 hover:bg-slate-800 text-blue-300 border border-slate-700/60 cursor-pointer transition-colors"
                      >
                        ⚡ {action}
                      </button>
                    ))}
                  </div>
                )}

                {!isUser && (
                  <div className="mt-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="text-[10px] text-slate-500 hover:text-slate-300 inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-md">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
              <span>Gemini 3.8 Flash is analyzing regulatory statutes &amp; drafting response...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              currentRecord?.productName
                ? `Ask Gemini anything about ${currentRecord.productName}, LMPC 2011 rules, or Section 36 penalties...`
                : 'Ask Gemini anything about LMPC 2011 rules, FSSAI regulations, or Section 36 penalties...'
            }
            disabled={isLoading}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              !inputQuery.trim() || isLoading
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
