import React, { useState, useMemo } from 'react';
import { MOLECULES } from './constants';
import MoleculeStructure from './components/MoleculeStructure';
import NMRChart from './components/NMRChart';
import ReferencePanel from './components/ReferencePanel';
import { SplittingVisualizer } from './components/SplittingVisualizer';
import { ChemicalShiftVisualizer } from './components/ChemicalShiftVisualizer';
import { NucleusType } from './types';
import { Atom, Beaker, ArrowRight, BrainCircuit, Zap, Shield, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>(MOLECULES[0].id);
  const [nucleus, setNucleus] = useState<NucleusType>('1H');
  
  // State for interaction: Hover (transient) and Selected (persistent)
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedPeakId, setSelectedPeakId] = useState<string | null>(null);
  
  // Simulation Modal States
  const [showSplittingSim, setShowSplittingSim] = useState(false);
  const [showShiftSim, setShowShiftSim] = useState(false);

  const selectedMolecule = MOLECULES.find(m => m.id === selectedMoleculeId) || MOLECULES[0];

  // Derive the active peak data based on what is hovered OR selected
  // Priority: Hovered > Selected > Null
  const activePeak = useMemo(() => {
    const targetId = hoveredId || selectedPeakId;
    if (!targetId) return null;
    
    const peaks = nucleus === '1H' ? selectedMolecule.peaks1H : selectedMolecule.peaks13C;
    return peaks.find(p => p.id === targetId);
  }, [hoveredId, selectedPeakId, nucleus, selectedMolecule]);

  // Helpers for text display
  const getMultiplicityLabel = (m: string) => {
    const map: Record<string, string> = { s: 'Singlet', d: 'Doublet', t: 'Triplet', q: 'Quartet', m: 'Multiplet', dt: 'Doublet of Triplets', dd: 'Doublet of Doublets' };
    return map[m] || 'Signal';
  };

  const getNeighborCount = (m: string) => {
    const map: Record<string, number> = { s: 0, d: 1, t: 2, q: 3 };
    return map[m];
  };

  const handleMoleculeChange = (id: string) => {
      setSelectedMoleculeId(id);
      setHoveredId(null);
      setSelectedPeakId(null); // Reset selection on molecule change
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
               <Beaker size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">NMR Master</h1>
              <p className="text-xs text-slate-500">Interactive Spectroscopy Learning</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 gap-8">
        
        {/* Main Content Area */}
        <div className="space-y-6">
          
          {/* Controls Section - Redesigned for visibility */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            
            {/* Molecule Selection Cards */}
            <div className="flex-1 w-full">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block px-1">Select Compound</label>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MOLECULES.map((m) => {
                      const isSelected = selectedMoleculeId === m.id;
                      return (
                          <button
                              key={m.id}
                              onClick={() => handleMoleculeChange(m.id)}
                              className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between group relative overflow-hidden ${
                                  isSelected 
                                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200 ring-2 ring-blue-100 ring-offset-1' 
                                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50'
                              }`}
                          >
                              <div className="relative z-10">
                                  <div className={`font-bold text-sm mb-0.5 ${isSelected ? 'text-white' : 'text-slate-800'}`}>{m.name}</div>
                                  <div className={`text-xs font-mono ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>{m.formula}</div>
                              </div>
                              {isSelected && (
                                <div className="animate-fade-in relative z-10">
                                   <CheckCircle2 size={20} className="text-white drop-shadow-sm" />
                                </div>
                              )}
                              {/* Subtle glow effect for selected item */}
                              {isSelected && <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 blur-xl rounded-full -mr-4 -mt-4 pointer-events-none"></div>}
                          </button>
                      )
                  })}
               </div>
            </div>

            {/* Nucleus Selection Toggles */}
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0 w-full md:w-auto mt-2 md:mt-0">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Nucleus Mode</label>
               <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-full md:w-auto">
                <button
                  onClick={() => {
                      setNucleus('1H');
                      setSelectedPeakId(null);
                  }}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                    nucleus === '1H' ? 'bg-white text-blue-600 shadow' : 'text-slate-500 hover:text-slate-700 shadow-none'
                  }`}
                >
                  1H Proton
                </button>
                <button
                  onClick={() => {
                      setNucleus('13C');
                      setSelectedPeakId(null);
                  }}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                    nucleus === '13C' ? 'bg-white text-blue-600 shadow' : 'text-slate-500 hover:text-slate-700 shadow-none'
                  }`}
                >
                  13C Carbon
                </button>
              </div>
            </div>
          </div>

          {/* Top Row: Structure and Reference Data */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2">
                <MoleculeStructure 
                    molecule={selectedMolecule} 
                    hoveredId={hoveredId} 
                    setHoveredId={setHoveredId}
                    selectedId={selectedPeakId}
                    setSelectedId={setSelectedPeakId}
                    nucleus={nucleus}
                />
             </div>
             <div className="lg:col-span-1">
                <ReferencePanel
                    molecule={selectedMolecule}
                    nucleus={nucleus}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
                    selectedId={selectedPeakId}
                    setSelectedId={setSelectedPeakId}
                />
             </div>
          </div>

          {/* Bottom Row: Spectrum Chart */}
          <div className="w-full">
            <NMRChart 
                molecule={selectedMolecule} 
                nucleus={nucleus}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                selectedId={selectedPeakId}
                setSelectedId={setSelectedPeakId}
            />
          </div>

          {/* Educational Quick Facts - DYNAMIC CONTENT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             
             {/* Chemical Shift Card */}
             <div className={`p-6 rounded-xl border flex flex-col items-start relative group transition-all min-h-[220px] ${activePeak ? 'bg-blue-600 text-white border-blue-700 shadow-lg scale-[1.01]' : 'bg-blue-50 border-blue-100'}`}>
                {/* Dashed border only if inactive */}
                {!activePeak && <div className="absolute inset-0 border-2 border-blue-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border-dashed"></div>}
                
                <h4 className={`font-bold text-lg mb-3 flex items-center gap-2 ${activePeak ? 'text-white' : 'text-blue-800'}`}>
                   <Atom size={20}/> Chemical Shift (δ)
                </h4>
                
                {activePeak ? (
                  <div className="animate-fade-in w-full flex flex-col h-full">
                    <div className="flex justify-between items-end mb-4 border-b border-white/20 pb-2">
                        <div className="text-4xl font-bold">{activePeak.ppm.toFixed(2)} <span className="text-lg font-normal opacity-80">ppm</span></div>
                        <div className="text-xs bg-white/20 p-1.5 rounded backdrop-blur-sm">
                           {activePeak.ppm > 3 ? "Downfield" : "Upfield"}
                        </div>
                    </div>
                    
                    {/* Detailed Analysis Section */}
                    {activePeak.analysis && (
                        <div className="space-y-3 text-sm opacity-95">
                             {activePeak.analysis.inductive && (
                                 <div className="bg-blue-700/50 p-2 rounded-lg border border-blue-500/30">
                                    <div className="font-bold text-xs text-blue-100 flex items-center gap-1 mb-1">
                                        <Zap size={12}/> Inductive Effect
                                    </div>
                                    <p className="leading-snug">{activePeak.analysis.inductive}</p>
                                 </div>
                             )}
                             {activePeak.analysis.resonance && (
                                 <div className="bg-blue-700/50 p-2 rounded-lg border border-blue-500/30">
                                    <div className="font-bold text-xs text-blue-100 flex items-center gap-1 mb-1">
                                        <Shield size={12}/> Resonance Effect
                                    </div>
                                    <p className="leading-snug">{activePeak.analysis.resonance}</p>
                                 </div>
                             )}
                             {activePeak.analysis.anisotropy && (
                                 <div className="bg-blue-700/50 p-2 rounded-lg border border-blue-500/30">
                                    <div className="font-bold text-xs text-blue-100 flex items-center gap-1 mb-1">
                                        <RotateCcw size={12}/> Magnetic Anisotropy
                                    </div>
                                    <p className="leading-snug">{activePeak.analysis.anisotropy}</p>
                                 </div>
                             )}
                        </div>
                    )}

                    {!activePeak.analysis && (
                         <p className="text-sm opacity-90 leading-relaxed mb-4">
                           <strong>Assignment:</strong> {activePeak.assignment}
                        </p>
                    )}
                    
                    {/* Visualize Button in Active State */}
                    <button 
                      onClick={() => setShowShiftSim(true)}
                      className="mt-4 w-full text-sm bg-white/20 hover:bg-white/30 text-white border border-white/40 px-3 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
                    >
                       Visualize Concept <ArrowRight size={14}/>
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-blue-800 leading-relaxed mb-4">
                      Indicates the electronic environment of the nucleus. Select a peak to see details.
                    </p>
                    <ul className="text-xs text-blue-700 space-y-2 mb-4 bg-white/50 p-3 rounded-lg">
                        <li><strong>Inductive:</strong> Electronegative atoms withdraw electron density (Deshielding).</li>
                        <li><strong>Resonance:</strong> Delocalization can add (Shielding) or remove (Deshielding) density.</li>
                        <li><strong>Anisotropy:</strong> Ring currents in π-systems create local magnetic fields.</li>
                    </ul>
                    <button 
                      onClick={() => setShowShiftSim(true)}
                      className="mt-auto text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-1 z-10"
                    >
                       Visualize Concept <ArrowRight size={14}/>
                    </button>
                  </>
                )}
             </div>
             
             {/* Splitting Card */}
             <div className={`p-6 rounded-xl border flex flex-col items-start min-h-[220px] transition-all ${activePeak && nucleus === '1H' ? 'bg-purple-600 text-white border-purple-700 shadow-lg scale-[1.01]' : 'bg-purple-50 border-purple-100'}`}>
                <h4 className={`font-bold text-lg mb-3 flex items-center gap-2 ${activePeak && nucleus === '1H' ? 'text-white' : 'text-purple-800'}`}>
                   <BrainCircuit size={20}/> Splitting (n+1)
                </h4>

                {activePeak && nucleus === '1H' ? (
                   <div className="animate-fade-in w-full">
                      <div className="text-3xl font-bold mb-1">{getMultiplicityLabel(activePeak.multiplicity)}</div>
                      <div className="text-sm font-mono opacity-70 mb-3">Multiplicity Code: '{activePeak.multiplicity}'</div>
                      
                      <div className="text-sm opacity-90 leading-relaxed border-t border-white/20 pt-2 mb-4">
                         {activePeak.multiplicity === 's' ? (
                             <span>Singlet indicates <strong>no neighboring</strong> non-equivalent protons.</span>
                         ) : activePeak.multiplicity === 'm' ? (
                             <span>Multiplet indicates a complex splitting pattern due to <strong>multiple</strong> non-equivalent neighbors.</span>
                         ) : (
                             <>
                                Has <strong>{getNeighborCount(activePeak.multiplicity)}</strong> neighboring protons (n={getNeighborCount(activePeak.multiplicity)}).
                                <div className="mt-2 bg-white/20 p-2 rounded text-xs font-mono">
                                    n + 1 = {getNeighborCount(activePeak.multiplicity)! + 1} peaks
                                </div>
                             </>
                         )}
                      </div>

                      {/* Visualize Button in Active State */}
                      <button 
                        onClick={() => setShowSplittingSim(true)}
                        className="w-full text-sm bg-white/20 hover:bg-white/30 text-white border border-white/40 px-3 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
                        >
                        Visualize Concept <ArrowRight size={14}/>
                      </button>
                   </div>
                ) : (
                   <>
                    <p className="text-sm text-purple-800 leading-relaxed mb-4">
                       (1H only) Describes the magnetic interaction between neighboring non-equivalent protons.
                    </p>
                    <button 
                      onClick={() => setShowSplittingSim(true)}
                      className="mt-auto text-sm bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-1"
                    >
                       Visualize Concept <ArrowRight size={14}/>
                    </button>
                   </>
                )}
             </div>

             {/* Integration Card */}
             <div className={`p-6 rounded-xl border min-h-[220px] flex flex-col transition-all ${activePeak && nucleus === '1H' ? 'bg-green-600 text-white border-green-700 shadow-lg scale-[1.01]' : 'bg-green-50 border-green-100'}`}>
                <h4 className={`font-bold text-lg mb-3 flex items-center gap-2 ${activePeak && nucleus === '1H' ? 'text-white' : 'text-green-800'}`}>
                   <ArrowRight size={20}/> Integration
                </h4>

                {activePeak && nucleus === '1H' ? (
                   <div className="animate-fade-in w-full">
                      <div className="text-5xl font-bold mb-2">{activePeak.integration}H</div>
                      <p className="text-sm opacity-90 leading-relaxed border-t border-white/20 pt-3 mt-1">
                         This signal accounts for <strong>{activePeak.integration}</strong> protons in this specific chemical environment.
                      </p>
                   </div>
                ) : (
                   <p className="text-sm text-green-800 leading-relaxed">
                      (1H only) Represents the area under each signal peak. Select a peak to view.
                   </p>
                )}
             </div>
          </div>
        </div>

      </main>

      {/* Visualizer Modals */}
      {showSplittingSim && <SplittingVisualizer onClose={() => setShowSplittingSim(false)} />}
      {showShiftSim && <ChemicalShiftVisualizer onClose={() => setShowShiftSim(false)} />}
    </div>
  );
}