import React, { useState, useEffect, useRef } from 'react';
import { Compound, SimulationResult } from './types';

interface ColumnSimulatorProps {
  results: SimulationResult[];
  compounds: Compound[];
}

const ColumnSimulator: React.FC<ColumnSimulatorProps> = ({ results, compounds }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Constants
  const COLUMN_HEIGHT = 400; // px
  const SPEED_FACTOR = 0.08; // px per ms

  const startSimulation = () => {
    if (!isRunning) {
      setIsRunning(true);
      // Adjust start time to account for time already elapsed if resuming
      startTimeRef.current = performance.now() - elapsedTime;
    }
  };

  const pauseSimulation = () => {
    setIsRunning(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setElapsedTime(0);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const animate = (time: number) => {
    lastTimeRef.current = time;
    const newElapsedTime = time - startTimeRef.current;
    setElapsedTime(newElapsedTime);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning]);

  // Auto-reset if the mixture changes
  useEffect(() => {
    resetSimulation();
  }, [compounds, results]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4 select-none relative">
       
       {/* Controls */}
       <div className="absolute top-0 left-4 z-30 flex flex-col gap-2">
         <button
           onClick={isRunning ? pauseSimulation : startSimulation}
           className={`w-24 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all border ${
             isRunning 
               ? 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100' 
               : 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700'
           }`}
         >
           {isRunning ? 'Pause' : elapsedTime > 0 ? 'Resume' : 'Start'}
         </button>
         
         {elapsedTime > 0 && (
            <button
                onClick={resetSimulation}
                className="w-24 px-4 py-2 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
            >
                Reset
            </button>
         )}

         <div className="mt-2 text-[10px] font-mono text-slate-400 bg-white/80 p-1 rounded backdrop-blur-sm">
           Time: {(elapsedTime / 1000).toFixed(1)}s
         </div>
       </div>

       {/* Column Apparatus */}
       <div className="relative w-[120px] h-[420px] flex-shrink-0 mx-auto mt-4">
          
          {/* Main Column Body (Clipping Container) */}
          <div className="absolute inset-0 rounded-b-xl overflow-hidden border-x-[6px] border-b-[6px] border-slate-300 bg-white shadow-inner z-10">
              
              {/* Silica Gel Texture */}
              <div className="absolute inset-0 bg-slate-50 opacity-100" 
                   style={{ 
                       backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', 
                       backgroundSize: '4px 4px' 
                   }}>
              </div>

              {/* Solvent Head */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-indigo-50/50 border-b border-indigo-100 z-20 backdrop-blur-[2px]"></div>

              {/* Compounds Animation Layer */}
              <div className="absolute top-10 left-0 right-0 bottom-0 z-10">
                {results.map((res) => {
                  const compound = compounds.find(c => c.id === res.compoundId);
                  if (!compound) return null;

                  // PHYSICS ENGINE UPDATES (Advanced)
                  const rf = res.rf;
                  const isHighRf = rf > 0.3;

                  // 1. Velocity Calculation
                  // If Rf > 0.3, compounds move disproportionately faster (rushing effect).
                  // Ideally, column chromatography works best with Rf ~0.2 - 0.3.
                  // Compounds with high Rf flush out too quickly.
                  const speedMultiplier = isHighRf ? 1.5 : 1.0; 
                  const distance = rf * speedMultiplier * elapsedTime * SPEED_FACTOR;
                  
                  // 2. Band Broadening (Diffusion + Mass Transfer)
                  // Standard diffusion: width increases with sqrt(distance).
                  // "Worse separation" effect: High Rf compounds get an extra broadening penalty.
                  // This simulates the Van Deemter C-term (mass transfer resistance) dominating at high speeds.
                  // Result: High Rf bands are very wide/blurry and overlap easily. Low Rf bands are tight.
                  const baseBroadeningFactor = 2.0;
                  const penaltyBroadening = isHighRf ? (rf * 5.0) : 0; // Significant penalty for high Rf
                  const broadeningFactor = baseBroadeningFactor + penaltyBroadening;
                  
                  const spread = 8 + Math.sqrt(distance) * broadeningFactor;
                  
                  // Center the band at the calculated distance
                  const topPos = distance - (spread / 2);

                  // Mass Conservation (Visual)
                  // As band spreads, concentration (opacity) decreases to keep "area under curve" somewhat constant
                  const concentration = Math.min(0.9, 15 / spread);
                  
                  // Skip if passed the column length (approx 390px)
                  if (distance > 410) return null;

                  return (
                    <div
                      key={res.compoundId}
                      className="absolute left-1 right-1 rounded-full"
                      style={{
                        top: topPos,
                        height: spread,
                        // Gradient simulates Gaussian distribution (dense center, diffuse edges)
                        background: `linear-gradient(to bottom, transparent, ${compound.color}, transparent)`,
                        opacity: concentration,
                        filter: `blur(${spread / 10}px)`, // Dynamic blur based on width
                        transform: 'translateZ(0)', // GPU acceleration hint
                      }}
                    >
                      {/* Tooltip for hover */}
                      <div className="opacity-0 hover:opacity-100 absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-auto z-50">
                        {compound.name} (Rf: {rf.toFixed(2)})
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>

          {/* Glass Glare Overlay (on top of everything inside column) */}
          <div className="absolute inset-0 rounded-b-xl border-x-[6px] border-b-[6px] border-transparent bg-gradient-to-r from-white/20 via-transparent to-black/5 pointer-events-none z-30"></div>

          {/* Stopcock */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-3 h-6 bg-slate-300 z-0"></div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-slate-400 rounded-full shadow-md z-40 flex items-center justify-center">
            <div className={`w-1.5 h-full bg-slate-500/20 ${isRunning ? 'rotate-90' : 'rotate-0'} transition-transform duration-300`}></div>
          </div>
          
          {/* Drip Tip */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-slate-300/80 z-0"></div>

       </div>

       {/* Collection Flask */}
       <div className="relative mt-6 w-28 h-28 flex flex-col items-center justify-end z-10">
          <div className="w-20 h-20 rounded-full border-[3px] border-slate-300 bg-white/80 shadow-lg relative overflow-hidden">
             {/* Liquid Level - Visual only, assumes everything eventually elutes */}
             <div 
               className="absolute bottom-0 left-0 right-0 bg-slate-100 transition-all duration-1000 ease-linear"
               style={{ 
                 height: `${Math.min(100, elapsedTime / 100)}%`,
                 opacity: 0.8 
               }}
             ></div>
             
             {/* Glass reflection */}
             <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-white opacity-40"></div>
          </div>
          <div className="absolute top-0 w-8 h-10 border-x-[3px] border-slate-300 bg-white/50"></div>
          <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Collection</div>
       </div>

    </div>
  );
};

export default ColumnSimulator;