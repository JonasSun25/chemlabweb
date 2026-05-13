import React, { useState } from 'react';
import { Compound } from './types';
import { AVAILABLE_COLORS, MAX_COMPOUNDS } from './constants';
import { suggestPolarity } from '../../../services/geminiService';

interface CompoundListProps {
  compounds: Compound[];
  onUpdate: (compounds: Compound[]) => void;
}

const CompoundList: React.FC<CompoundListProps> = ({ compounds, onUpdate }) => {
  const [loadingSuggestion, setLoadingSuggestion] = useState<string | null>(null);

  const addCompound = () => {
    if (compounds.length >= MAX_COMPOUNDS) return;
    const newId = Math.random().toString(36).substr(2, 9);
    const unusedColor = AVAILABLE_COLORS.find(c => !compounds.some(cmp => cmp.color === c)) || AVAILABLE_COLORS[0];
    
    const newCompound: Compound = {
      id: newId,
      name: `Compound ${String.fromCharCode(65 + compounds.length)}`,
      polarity: 5,
      color: unusedColor
    };
    onUpdate([...compounds, newCompound]);
  };

  const removeCompound = (id: string) => {
    onUpdate(compounds.filter(c => c.id !== id));
  };

  const updateCompound = (id: string, field: keyof Compound, value: any) => {
    onUpdate(compounds.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleAutoPolarity = async (id: string, name: string) => {
      setLoadingSuggestion(id);
      const pol = await suggestPolarity(name);
      setLoadingSuggestion(null);
      if (pol !== null) {
          updateCompound(id, 'polarity', pol);
      } else {
          alert("Could not determine polarity automatically. Please set manually.");
      }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Mixture Composition
        </h2>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {compounds.length} / {MAX_COMPOUNDS}
        </span>
      </div>

      <div className="space-y-4">
        {compounds.map((c) => (
          <div key={c.id} className="group relative p-4 rounded-lg border border-slate-100 bg-slate-50 hover:border-indigo-100 hover:bg-white transition-all">
            <div className="flex items-start gap-4">
              {/* Color Indicator */}
              <div 
                className="w-4 h-4 rounded-full mt-3 shadow-sm shrink-0" 
                style={{ backgroundColor: c.color }}
              ></div>

              <div className="flex-1 space-y-3">
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Name</label>
                  <div className="flex gap-2">
                    <input
                        type="text"
                        value={c.name}
                        onChange={(e) => updateCompound(c.id, 'name', e.target.value)}
                        className="w-full text-sm font-medium text-slate-900 bg-transparent border-b border-slate-300 focus:border-indigo-500 focus:outline-none py-1"
                    />
                    <button 
                        onClick={() => handleAutoPolarity(c.id, c.name)}
                        disabled={loadingSuggestion === c.id}
                        className="text-xs text-indigo-600 hover:text-indigo-800 disabled:opacity-50 whitespace-nowrap"
                        title="Ask AI for polarity"
                    >
                        {loadingSuggestion === c.id ? "..." : "Auto-Detect"}
                    </button>
                  </div>
                </div>

                {/* Polarity Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Polarity</label>
                    <span className="text-xs font-bold text-slate-700">{c.polarity.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={c.polarity}
                    onChange={(e) => updateCompound(c.id, 'polarity', parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Non-polar (1)</span>
                    <span>Polar (10)</span>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button 
                onClick={() => removeCompound(c.id)}
                className="text-slate-400 hover:text-red-500 transition-colors p-1"
                aria-label="Remove compound"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {compounds.length < MAX_COMPOUNDS && (
        <button
          onClick={addCompound}
          className="w-full mt-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 font-semibold hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Compound
        </button>
      )}
    </div>
  );
};

export default CompoundList;