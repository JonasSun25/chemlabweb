import React, { useState } from 'react';
import { X, Atom, Shield, MoveRight } from 'lucide-react';

interface ChemicalShiftVisualizerProps {
  onClose: () => void;
}

export const ChemicalShiftVisualizer: React.FC<ChemicalShiftVisualizerProps> = ({ onClose }) => {
  // Shielding value: 0 (Deshielded/Downfield) to 100 (Shielded/Upfield)
  const [shielding, setShielding] = useState(20);

  // Map shielding to approx ppm (e.g. 10 ppm to 0 ppm)
  const ppm = 10 - (shielding / 100) * 10;
  
  // Visual parameters
  const cloudOpacity = 0.2 + (shielding / 100) * 0.7;
  const cloudSize = 80 + (shielding / 100) * 60;
  const inducedFieldHeight = (shielding / 100) * 80; // Height of opposing vector
  const effectiveFieldHeight = 120 - inducedFieldHeight; // Net field B_eff

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
             <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
               <Atom size={24} />
             </div>
             <div>
               <h2 className="text-xl font-bold text-slate-800">Chemical Shift Explorer</h2>
               <p className="text-xs text-slate-500">Shielding, Deshielding & The Effective Magnetic Field</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
           
           {/* Sidebar Controls */}
           <div className="w-full md:w-80 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                 <label className="text-sm font-bold text-slate-700 block mb-4 flex items-center gap-2">
                    <Shield size={16} className="text-blue-500"/> Electron Shielding
                 </label>
                 
                 <input 
                   type="range" min="0" max="100" value={shielding} 
                   onChange={(e) => setShielding(parseInt(e.target.value))}
                   className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-2"
                 />
                 
                 <div className="flex justify-between text-xs font-semibold text-slate-500 mb-6">
                    <span className="text-red-500">Deshielded</span>
                    <span className="text-emerald-500">Shielded</span>
                 </div>

                 <div className="space-y-2">
                    <button onClick={() => setShielding(95)} className="w-full text-left text-xs px-3 py-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors flex justify-between items-center group">
                       <span>Reference (TMS)</span>
                       <span className="text-slate-400 group-hover:text-blue-500">0 ppm</span>
                    </button>
                    <button onClick={() => setShielding(85)} className="w-full text-left text-xs px-3 py-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors flex justify-between items-center group">
                       <span>Alkane (-CH₃)</span>
                       <span className="text-slate-400 group-hover:text-blue-500">~1.0 ppm</span>
                    </button>
                    <button onClick={() => setShielding(65)} className="w-full text-left text-xs px-3 py-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors flex justify-between items-center group">
                       <span>Ether (-O-CH₃)</span>
                       <span className="text-slate-400 group-hover:text-blue-500">~3.5 ppm</span>
                    </button>
                    <button onClick={() => setShielding(5)} className="w-full text-left text-xs px-3 py-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors flex justify-between items-center group">
                       <span>Aldehyde (-CHO)</span>
                       <span className="text-slate-400 group-hover:text-blue-500">~9.5 ppm</span>
                    </button>
                 </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                 <p className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <strong>1. External Field (B₀):</strong> The constant magnetic field applied by the NMR instrument.
                 </p>
                 <p className="bg-red-50 p-3 rounded-lg border border-red-100">
                    <strong>2. Induced Field (B<sub>ind</sub>):</strong> Electrons circulating around the nucleus create a small magnetic field that <em>opposes</em> B₀.
                 </p>
                 <p className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                    <strong>3. Effective Field (B<sub>eff</sub>):</strong> The actual field felt by the nucleus.
                    <br/>
                    <code className="block mt-2 text-center font-bold text-slate-700 bg-white/60 rounded py-2 border border-emerald-200/50">
                      B<sub>eff</sub> = B₀ - B<sub>ind</sub>
                    </code>
                 </p>
              </div>
           </div>

           {/* Visualization Canvas */}
           <div className="flex-1 bg-white relative flex flex-col">
              
              {/* Animation Stage */}
              <div className="flex-grow relative overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-50 to-white">
                 
                 {/* Grid Background */}
                 <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }}></div>

                 <div className="relative flex items-end gap-12 md:gap-24 mb-12">
                    
                    {/* Visual 1: The Nucleus System */}
                    <div className="relative flex flex-col items-center">
                        <span className="absolute -top-12 font-bold text-slate-400 text-sm tracking-widest">NUCLEUS ENVIRONMENT</span>
                        
                        {/* B0 Vector (Background) */}
                        <div className="absolute bottom-[-20px] h-[300px] w-1 bg-slate-200 flex flex-col items-center justify-start rounded-full">
                           <div className="w-3 h-3 border-t-4 border-r-4 border-slate-300 -rotate-45 mt-1"></div>
                           <span className="mt-4 text-xs font-bold text-slate-400 bg-white px-1">B₀</span>
                        </div>

                        {/* Electron Cloud */}
                        <div className="relative flex items-center justify-center w-64 h-64">
                            {/* The Cloud */}
                            <div 
                                className="absolute rounded-full bg-blue-500 blur-xl transition-all duration-500 ease-out"
                                style={{ width: `${cloudSize}px`, height: `${cloudSize}px`, opacity: cloudOpacity }}
                            ></div>
                            <div 
                                className="absolute rounded-full bg-blue-400 blur-md transition-all duration-500 ease-out mix-blend-screen"
                                style={{ width: `${cloudSize * 0.7}px`, height: `${cloudSize * 0.7}px`, opacity: cloudOpacity + 0.1 }}
                            ></div>
                            
                            {/* Electrons (Orbiting CSS) */}
                            <div className="absolute inset-0 animate-spin-slow opacity-60" style={{ animationDuration: '3s' }}>
                               <div className="absolute top-10 left-1/2 w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_rgba(253,224,71,0.8)]"></div>
                            </div>
                            <div className="absolute inset-0 animate-spin-slow opacity-60" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
                               <div className="absolute bottom-12 right-1/4 w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_rgba(253,224,71,0.8)]"></div>
                            </div>

                            {/* The Nucleus */}
                            <div className="w-8 h-8 bg-slate-800 rounded-full relative z-10 shadow-lg flex items-center justify-center text-white text-[10px] font-bold border-2 border-slate-600">
                                1H
                            </div>

                            {/* Induced Field Vector (Opposing B0) */}
                            {inducedFieldHeight > 5 && (
                                <div 
                                    className="absolute z-20 w-1 bg-red-500 rounded-full flex flex-col items-center justify-end transition-all duration-300"
                                    style={{ height: `${inducedFieldHeight}px`, top: '50%', transform: 'translateY(-50%)' }}
                                >
                                    {/* Arrowhead pointing down */}
                                    <div className="w-2.5 h-2.5 border-b-4 border-l-4 border-red-500 -rotate-45 mb-[-2px]"></div>
                                </div>
                            )}
                            {inducedFieldHeight > 20 && (
                                <span className="absolute right-0 text-xs font-bold text-red-500 translate-x-8">B<sub>ind</sub></span>
                            )}
                        </div>
                    </div>

                    {/* Visual 2: Vector Math */}
                    <div className="relative h-64 flex flex-col justify-end items-center w-24">
                        <span className="absolute -top-12 font-bold text-slate-400 text-sm tracking-widest w-40 text-center">NET FIELD FELT</span>

                        {/* Net Field Vector */}
                        <div 
                            className="w-4 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-lg shadow-lg shadow-emerald-200 transition-all duration-500 ease-out relative group"
                            style={{ height: `${effectiveFieldHeight * 2}px`, minHeight: '20px' }}
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[12px] border-l-transparent border-r-transparent border-b-emerald-400"></div>
                            
                            {/* Label */}
                            <div className="absolute top-1/2 -translate-y-1/2 -right-12 text-sm font-bold text-emerald-600">
                                B<sub>eff</sub>
                            </div>
                        </div>
                        
                        {/* Frequency Display Removed */}
                    </div>

                 </div>
              </div>

              {/* Spectrum Result */}
              <div className="h-32 bg-slate-50 border-t border-slate-200 p-4 relative shrink-0">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Resulting Spectrum</h3>
                  
                  <div className="relative h-16 w-full max-w-4xl mx-auto flex items-end pb-6 border-b-2 border-slate-300">
                      
                      {/* Ticks */}
                      {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(t => (
                          <div key={t} className="flex-1 border-r border-slate-300 h-2 relative">
                              <span className="absolute -bottom-6 -right-1.5 text-xs text-slate-400 font-mono">{t}</span>
                          </div>
                      ))}
                      <div className="absolute -bottom-6 left-0 text-xs text-slate-400 font-mono">ppm</div>

                      {/* The Peak */}
                      <div 
                         className="absolute bottom-0 transition-all duration-500 ease-out flex flex-col items-center"
                         style={{ 
                             left: `${(1 - ppm/12) * 100}%`, 
                             transform: 'translateX(-50%)',
                             filter: 'drop-shadow(0px 4px 6px rgba(59, 130, 246, 0.5))' 
                         }}
                      >
                         <span className="text-xs font-bold text-blue-600 mb-1 bg-blue-50 px-1.5 rounded border border-blue-100">{ppm.toFixed(2)}</span>
                         
                         {/* Peak Shape */}
                         <svg width="40" height="80" viewBox="0 0 40 80" className="overflow-visible">
                            <path d="M0,80 Q20,-20 40,80" fill="none" stroke="#2563eb" strokeWidth="3" />
                         </svg>
                      </div>

                  </div>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-12 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <div className="flex items-center gap-1">
                          <MoveRight className="rotate-180" size={12}/> Deshielded (Downfield)
                      </div>
                      <div className="flex items-center gap-1">
                          Shielded (Upfield) <MoveRight size={12}/>
                      </div>
                  </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};