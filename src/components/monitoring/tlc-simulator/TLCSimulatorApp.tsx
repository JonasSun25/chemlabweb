import React, { useState, useEffect, useMemo, useCallback } from 'react';
import CompoundList from './CompoundList';
import TLCPlate from './TLCPlate';
import { Compound, SimulationResult, AnalysisResult } from './types';
import { DEFAULT_COMPOUNDS, MODEL_PARAMS } from './constants';

const TLCSimulatorApp: React.FC = () => {
  // State
  const [compounds, setCompounds] = useState<Compound[]>(DEFAULT_COMPOUNDS);
  const [solventRatio, setSolventRatio] = useState<number>(30); // 30% EtOAc default

  // Core Simulation Logic
  const results: SimulationResult[] = useMemo(() => {
    return compounds.map(comp => {
      // NON-LINEAR PHYSICS MODEL
      // Rf is determined by the partition coefficient k'
      // k' = (Affinity to Stationary Phase) / (Affinity to Mobile Phase)
      
      // 1. Stationary Phase Affinity (Silica is Polar)
      // Increases exponentially with compound polarity
      const stationaryAffinity = Math.pow(comp.polarity, MODEL_PARAMS.POLARITY_POWER);

      // 2. Mobile Phase Affinity
      // Increases exponentially with solvent polarity (EtOAc ratio)
      const mobileAffinity = Math.exp(solventRatio * MODEL_PARAMS.SOLVENT_SENSITIVITY) * MODEL_PARAMS.MOBILITY_FACTOR;

      // 3. Calculate Capacity Factor k'
      const kPrime = stationaryAffinity / mobileAffinity;

      // 4. Calculate Rf
      const rawRf = 1 / (1 + kPrime);

      // Clamp for visual sanity
      const rf = Math.max(MODEL_PARAMS.MIN_RF, Math.min(MODEL_PARAMS.MAX_RF, rawRf));

      return {
        compoundId: comp.id,
        rf
      };
    });
  }, [compounds, solventRatio]);

  // Analysis Logic
  const analysis: AnalysisResult = useMemo(() => {
    if (results.length < 2) {
      return { deltaRf: 1, status: 'excellent', message: "Need at least 2 compounds to separate.", worstPair: ["", ""] };
    }

    // Sort by Rf to find closest neighbors
    const sorted = [...results].sort((a, b) => a.rf - b.rf);
    let minDelta = 1.0;
    let worstPair: [string, string] = ["", ""];

    for (let i = 0; i < sorted.length - 1; i++) {
      const delta = sorted[i+1].rf - sorted[i].rf;
      if (delta < minDelta) {
        minDelta = delta;
        const c1 = compounds.find(c => c.id === sorted[i].compoundId)?.name || "?";
        const c2 = compounds.find(c => c.id === sorted[i+1].compoundId)?.name || "?";
        worstPair = [c1, c2];
      }
    }

    let status: AnalysisResult['status'] = 'good';
    let message = "";

    if (minDelta < 0.1) {
      status = 'poor';
      message = "Poor separation. Compounds will co-elute.";
    } else if (minDelta < 0.25) {
      status = 'fair';
      message = "Acceptable for TLC, but difficult for column chromatography.";
    } else {
      status = 'excellent';
      message = "Excellent separation. Ready for column.";
    }

    return { deltaRf: minDelta, status, message, worstPair };
  }, [results, compounds]);

  // Pairwise Differences Logic for the new module
  const pairwiseDifferences = useMemo(() => {
    const pairs: { c1: Compound; c2: Compound; delta: number }[] = [];
    if (compounds.length < 2) return pairs;

    for (let i = 0; i < compounds.length; i++) {
      for (let j = i + 1; j < compounds.length; j++) {
        const c1 = compounds[i];
        const c2 = compounds[j];
        const r1 = results.find(r => r.compoundId === c1.id)?.rf || 0;
        const r2 = results.find(r => r.compoundId === c2.id)?.rf || 0;
        const delta = Math.abs(r1 - r2);
        pairs.push({ c1, c2, delta });
      }
    }
    // Sort by smallest delta first (most critical)
    return pairs.sort((a, b) => a.delta - b.delta);
  }, [compounds, results]);

  return (
    <div className="flex flex-col bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-sm mt-8 scale-95 origin-top">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200">
              TLC
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-none">Chromatography Simulator</h1>
              <p className="text-xs text-slate-500 font-medium">Educational Prediction Tool</p>
            </div>
          </div>
          <div className="hidden md:block text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            v1.2.0
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 py-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Solvent System Control */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Mobile Phase
              </h2>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-500">Hexane (Non-polar)</span>
                <span className="text-indigo-600">Ethyl Acetate (Polar)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={solventRatio}
                onChange={(e) => setSolventRatio(parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-slate-300 to-indigo-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="mt-2 text-center font-mono font-bold text-lg text-slate-700">
                {100 - solventRatio}% Hex : {solventRatio}% EtOAc
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
              <strong>Tip:</strong> Increasing polar solvent (EtOAc) strength helps polar compounds desorb from the silica. The effect is non-linear—polar compounds need a specific threshold to start moving.
            </div>
          </div>

          {/* Compound Inputs */}
          <CompoundList compounds={compounds} onUpdate={setCompounds} />

        </div>

        {/* Center/Right Column: Visualization & Analysis (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            
            {/* Visualizer Panel */}
            <div className="flex flex-col bg-slate-100 rounded-xl border-2 border-slate-200 overflow-hidden">
              {/* View Toggles */}
              <div className="flex border-b border-slate-200 bg-white">
                <button 
                  className="flex-1 py-3 text-sm font-bold uppercase tracking-wider bg-slate-100 text-indigo-600 border-b-2 border-indigo-600"
                >
                  TLC Plate
                </button>
              </div>

              <div className="flex-1 p-4 flex flex-col items-center justify-center min-h-[350px]">
                 <TLCPlate results={results} compounds={compounds} solventRatio={solventRatio} />
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="flex flex-col gap-6">
              {/* Stats Card */}
              <div className={`p-4 rounded-xl border shadow-sm transition-colors ${
                analysis.status === 'poor' ? 'bg-red-50 border-red-200' :
                analysis.status === 'fair' ? 'bg-amber-50 border-amber-200' :
                'bg-emerald-50 border-emerald-200'
              }`}>
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${
                  analysis.status === 'poor' ? 'text-red-600' :
                  analysis.status === 'fair' ? 'text-amber-600' :
                  'text-emerald-600'
                }`}>
                  Separation Quality: {analysis.status}
                </h3>
                
                <div className="text-3xl font-bold text-slate-800 mb-2">
                  ΔRf: {analysis.deltaRf.toFixed(2)}
                </div>
                
                <p className="text-slate-700 text-sm font-medium">
                  {analysis.message}
                </p>

                {analysis.status !== 'excellent' && results.length > 1 && (
                  <div className="mt-4 text-xs text-slate-500 bg-white/50 p-2 rounded">
                    Problem pair: <strong>{analysis.worstPair[0]}</strong> & <strong>{analysis.worstPair[1]}</strong>
                  </div>
                )}
              </div>

              {/* Pairwise Differences Module */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col min-h-[200px]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  ΔRf Analysis Table
                </h3>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                  {compounds.length < 2 ? (
                    <div className="text-center py-8 text-slate-400 text-sm italic h-full flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                      Add at least 2 compounds to analyze separation differences.
                    </div>
                  ) : (
                    pairwiseDifferences.map((pair, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 transition-colors">
                        <div className="flex flex-col gap-1.5 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-200 shadow-sm" style={{ backgroundColor: pair.c1.color }}></span>
                            <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]" title={pair.c1.name}>{pair.c1.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-200 shadow-sm" style={{ backgroundColor: pair.c2.color }}></span>
                            <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]" title={pair.c2.name}>{pair.c2.name}</span>
                          </div>
                        </div>
                        
                        <div className="text-right pl-4">
                          <div className={`text-lg font-bold font-mono ${
                            pair.delta < 0.1 ? 'text-red-500' : 
                            pair.delta < 0.25 ? 'text-amber-500' : 
                            'text-emerald-600'
                          }`}>
                            {pair.delta.toFixed(2)}
                          </div>
                          <div className={`text-[9px] font-bold uppercase tracking-wider ${
                             pair.delta < 0.1 ? 'text-red-400' : 
                             pair.delta < 0.25 ? 'text-amber-400' : 
                             'text-emerald-400'
                          }`}>
                             {pair.delta < 0.1 ? 'Poor' : pair.delta < 0.25 ? 'Fair' : 'Good'}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Educational Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-4 px-4 mt-auto">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h4 className="font-bold text-slate-600">How it works</h4>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Retention factor (Rf) is modeled using capacity factors derived from relative polarities.
            <br />
            Rf = 1 / (1 + k'), where k' increases with compound polarity and decreases with solvent strength.
            Column chromatography separation speed is directly proportional to Rf.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TLCSimulatorApp;