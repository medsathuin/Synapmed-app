import React, { useState } from 'react';
import { GitBranch, Sparkles, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { SchemaDiagram } from '../types';
import { MOCK_SCHEMAS } from '../data/mockSchemas';

export const SchemasView: React.FC = () => {
  const [selectedSchema, setSelectedSchema] = useState<SchemaDiagram>(MOCK_SCHEMAS[0]);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-950/70 via-slate-900 to-indigo-950/70 border border-teal-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            <Sparkles size={14} />
            Diagnostic & Treatment Algorithms
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            High-Yield Clinical Schemas
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Step-by-step visual revision flowcharts for complex clinical decision-making: Acid-Base disorders, Shock classification & hemodynamics, and ATLS emergency resuscitation.
          </p>
        </div>

        {/* Schema Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          {MOCK_SCHEMAS.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSchema(s)}
              className={`p-3 rounded-xl border text-left transition ${selectedSchema.id === s.id ? 'bg-teal-600 text-white border-teal-500 shadow' : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
            >
              <div className="text-xs font-bold">{s.title}</div>
              <div className="text-[10px] opacity-80 mt-0.5">{s.category}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Schema Flowchart Canvas */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {selectedSchema.category}
            </span>
            <span className="text-xs text-slate-400">{selectedSchema.subject}</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1.5">{selectedSchema.title}</h3>
          <p className="text-xs text-slate-400 mt-1">{selectedSchema.description}</p>
        </div>

        {/* Interactive Steps List */}
        <div className="space-y-4">
          {selectedSchema.steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 rounded-xl p-5 relative pl-12 space-y-2 hover:border-slate-700 transition"
            >
              {/* Step number badge */}
              <div className="absolute left-4 top-5 w-6 h-6 rounded-full bg-teal-500 text-slate-950 font-black text-xs flex items-center justify-center">
                {st.stepNumber}
              </div>

              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {st.title}
              </h4>

              {st.condition && (
                <div className="text-xs font-mono text-teal-300 bg-teal-950/40 p-2.5 rounded-lg border border-teal-500/30">
                  Rule: {st.condition}
                </div>
              )}

              <p className="text-xs text-slate-300 leading-relaxed">
                {st.actionOrFinding}
              </p>

              {st.highYieldPearl && (
                <div className="text-[11px] text-amber-300 font-medium pt-1 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-400 shrink-0" />
                  <span>Clinical Pearl: {st.highYieldPearl}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Takeaway */}
        <div className="p-4 bg-teal-950/30 border border-teal-500/30 rounded-xl text-xs text-teal-100">
          <strong className="block text-teal-300 font-bold mb-1">Algorithmic Summary Takeaway:</strong>
          {selectedSchema.summaryTakeaway}
        </div>
      </div>
    </div>
  );
};
