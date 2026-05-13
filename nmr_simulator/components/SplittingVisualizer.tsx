import React, { useState, useMemo } from 'react';
import { X, Dna } from 'lucide-react';

interface SplittingVisualizerProps {
  onClose: () => void;
}

export const SplittingVisualizer: React.FC<SplittingVisualizerProps> = ({ onClose }) => {
  // Group 1 (Blue/Red)
  const [n1, setN1] = useState(1);
  const [j1, setJ1] = useState(14);
  
  // Group 2 (Green/Orange) - Non-equivalent
  const [n2, setN2] = useState(0);
  const [j2, setJ2] = useState(6);

  // Helper to generate binary states for N items
  const getBinaryStates = (count: number) => {
    const states = [];
    const total = Math.pow(2, count);
    for (let i = 0; i < total; i++) {
      const binary = i.toString(2).padStart(count, '0');
      states.push(binary.split('').map(b => b === '1')); // true=UP, false=DOWN
    }
    return states;
  };

  // Compute all combined microstates
  const microstates = useMemo(() => {
    const states1 = getBinaryStates(n1);
    const states2 = getBinaryStates(n2);
    
    const combined = [];
    
    for (const s1 of states1) {
      const net1 = s1.filter(x => x).length - s1.filter(x => !x).length;
      const shift1 = net1 * (j1 / 2);

      if (n2 === 0) {
          combined.push({
              s1,
              s2: [],
              shift: shift1,
              net1,
              net2: 0
          });
      } else {
          for (const s2 of states2) {
            const net2 = s2.filter(x => x).length - s2.filter(x => !x).length;
            const shift2 = net2 * (j2 / 2);
            combined.push({
                s1,
                s2,
                shift: shift1 + shift2,
                net1,
                net2
            });
          }
      }
    }
    
    // Sort by shift value
    return combined.sort((a, b) => b.shift - a.shift);
  }, [n1, n2, j1, j2]);

  // Group Microstates by Shift (Classification)
  const groupedMicrostates = useMemo(() => {
    const groups: { [key: string]: typeof microstates } = {};
    microstates.forEach(m => {
      // Use fixed precision to group correctly
      const key = m.shift.toFixed(2);
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });
    
    // Convert to array and sort descending by shift
    return Object.entries(groups)
        .map(([key, states]) => ({ 
          shift: parseFloat(key), 
          states 
        }))
        .sort((a, b) => b.shift - a.shift);
  }, [microstates]);

  // Aggregate into peaks for the stick spectrum
  const spectrum = useMemo(() => {
     return groupedMicrostates.map(g => ({
         shift: g.shift,
         count: g.states.length
     }));
  }, [groupedMicrostates]);

  // Splitting Tree Data Calculation
  const treeData = useMemo(() => {
     // Helper for Pascal weights
     const getWeights = (n: number) => {
        const row = [1];
        for(let k=0; k<n; k++) row.push(row[k] * (n-k)/(k+1));
        return row;
     };
     
     const w1 = getWeights(n1);
     const w2 = getWeights(n2);
     
     // Level 1 Nodes (Group A splits)
     // Start from 0. Positions are centered.
     const l1Nodes = w1.map((w, i) => {
        // Range is -(n1*J1)/2 to +(n1*J1)/2
        const pos = -(n1 * j1)/2 + i*j1;
        return { pos, weight: w };
     });
     
     // Level 2 Connections (Group B splits from L1)
     const connections: Array<{
         x1: number, 
         x2: number, 
         sourceIdx: number
     }> = [];
     
     l1Nodes.forEach((l1, i) => {
        w2.forEach((w, k) => {
            const shift2 = -(n2 * j2)/2 + k*j2;
            const pos2 = l1.pos + shift2;
            connections.push({
                x1: l1.pos,
                x2: pos2,
                sourceIdx: i
            });
        });
     });
     
     return { l1Nodes, connections };
  }, [n1, n2, j1, j2]);

  // Determine chart scale
  const maxShift = Math.max(
      Math.abs((n1 * j1 + n2 * j2) / 2),
      20 // Min width
  ) * 1.2;

  const maxCount = Math.max(...spectrum.map(s => s.count));

  // Helper to normalize shift to % position (0-100)
  const getPct = (shift: number) => ((shift + maxShift) / (2 * maxShift)) * 100;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl flex flex-col h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
             <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
               <Dna size={24} />
             </div>
             <div>
               <h2 className="text-xl font-bold text-slate-800">NMR Splitting Explorer</h2>
               <p className="text-xs text-slate-500">Visualization of Coupling Constants & Microstates</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
           
           {/* Sidebar Controls */}
           <div className="w-full md:w-80 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto shrink-0">
              
              {/* Group 1 Controls */}
              <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span> Neighbor Group A
                    </h3>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">Jab</span>
                 </div>
                 
                 <div className="mb-4">
                    <label className="text-xs font-semibold text-slate-500 block mb-1">
                        Protons (n): {n1}
                    </label>
                    <input 
                      type="range" min="0" max="4" value={n1} 
                      onChange={(e) => setN1(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">
                        Coupling (J): {j1} Hz
                    </label>
                    <input 
                      type="range" min="2" max="24" step="2" value={j1} 
                      onChange={(e) => setJ1(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                 </div>
              </div>

              {/* Group 2 Controls */}
              <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Neighbor Group B
                    </h3>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">Jac</span>
                 </div>
                 
                 <div className="mb-4">
                    <label className="text-xs font-semibold text-slate-500 block mb-1">
                        Protons (n'): {n2}
                    </label>
                    <input 
                      type="range" min="0" max="3" value={n2} 
                      onChange={(e) => setN2(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>0</span><span>1</span><span>2</span><span>3</span>
                    </div>
                 </div>

                 <div className={n2 === 0 ? "opacity-50 pointer-events-none" : ""}>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">
                        Coupling (J'): {j2} Hz
                    </label>
                    <input 
                      type="range" min="2" max="24" step="2" value={j2} 
                      onChange={(e) => setJ2(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                 </div>
              </div>
           </div>

           {/* Visualization Area */}
           <div className="flex-1 bg-white p-6 md:p-8 overflow-y-auto flex flex-col relative">
              
              {/* Top: Microstates (Classified/Grouped) */}
              <div className="mb-8 shrink-0">
                 <div className="flex justify-between items-end mb-4 flex-wrap gap-4">
                    <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                        1. Microstates <span className="text-sm font-normal text-slate-400">({microstates.length} Combinations)</span>
                    </h3>

                    {/* Legend for Balls */}
                    <div className="flex gap-4 text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-600">Group A:</span>
                            <div className="flex items-center gap-1" title="Spin Up (+J/2)"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div><span className="text-slate-500">↑</span></div>
                            <div className="flex items-center gap-1" title="Spin Down (-J/2)"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><span className="text-slate-500">↓</span></div>
                        </div>
                        {n2 > 0 && (
                            <>
                                <div className="w-px bg-slate-200"></div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-600">Group B:</span>
                                    <div className="flex items-center gap-1" title="Spin Up (+J'/2)"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div><span className="text-slate-500">↑</span></div>
                                    <div className="flex items-center gap-1" title="Spin Down (-J'/2)"><div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div><span className="text-slate-500">↓</span></div>
                                </div>
                            </>
                        )}
                    </div>
                 </div>

                 {/* Grouped Display Container */}
                 <div className="flex gap-2 overflow-x-auto pb-4 items-end min-h-[160px]">
                    {groupedMicrostates.map((group, gIdx) => (
                       <div key={gIdx} className="flex flex-col gap-2 min-w-[70px] items-center">
                          {/* Stack of Microstates */}
                          <div className="flex flex-col-reverse gap-1">
                            {group.states.map((m, sIdx) => (
                               <div 
                                 key={sIdx} 
                                 className="flex gap-0.5 p-1 bg-slate-50 border border-slate-100 rounded shadow-sm justify-center hover:scale-110 transition-transform"
                               >
                                  {m.s1.length === 0 && m.s2.length === 0 && <span className="w-2 h-2 rounded-full bg-slate-300"/>}
                                  {/* Group A Coins */}
                                  {m.s1.map((isUp, i) => (
                                      <div key={`a-${i}`} className={`w-2 h-2 rounded-full ${isUp ? 'bg-blue-500' : 'bg-red-500'}`}/>
                                  ))}
                                  {/* Separator if both exist */}
                                  {m.s1.length > 0 && m.s2.length > 0 && <div className="w-px bg-slate-200 mx-0.5"></div>}
                                  {/* Group B Coins */}
                                  {m.s2.map((isUp, i) => (
                                      <div key={`b-${i}`} className={`w-2 h-2 rounded-full ${isUp ? 'bg-emerald-500' : 'bg-orange-400'}`}/>
                                  ))}
                               </div>
                            ))}
                          </div>
                          
                          {/* Shift Label */}
                          <div className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                             {group.shift > 0 ? '+' : ''}{group.shift.toFixed(1)}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Bottom: Resulting Signal (Splitting Tree + Sticks) */}
              <div className="border-t border-slate-100 pt-6 flex-grow flex flex-col min-h-[350px]">
                 <h3 className="text-lg font-bold text-slate-700 mb-2 flex items-center gap-2">
                    2. Resulting Signal <span className="text-sm font-normal text-slate-400">(Splitting Tree)</span>
                 </h3>
                 <p className="text-xs text-slate-400 mb-6">
                    Blue lines: Group A splitting (<span className="font-mono">J={j1}</span>) • 
                    Green lines: Group B splitting (<span className="font-mono">J={j2}</span>)
                 </p>
                 
                 <div className="flex-grow relative w-full flex items-center justify-center bg-slate-50/50 rounded-xl border border-slate-100 p-4 overflow-hidden">
                    
                    {/* Intensity Axis Label */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-300 font-bold tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                        INTENSITY
                    </div>

                    {/* SVG Splitting Tree */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                       {/* Level 1 Lines (Group A - Blue) */}
                       {/* From Top Center (50%) to Level 1 positions */}
                       {n1 > 0 && treeData.l1Nodes.map((node, i) => {
                           const x1 = "50%"; // Start from center
                           const x2 = `${getPct(node.pos)}%`;
                           return (
                               <line 
                                key={`l1-${i}`} 
                                x1={x1} y1="15%" 
                                x2={x2} y2="40%" 
                                stroke="#60a5fa" // blue-400
                                strokeWidth="2" 
                                strokeOpacity="0.6"
                               />
                           );
                       })}

                       {/* Level 2 Lines (Group B - Green) */}
                       {/* From Level 1 positions to Final positions */}
                       {n2 > 0 && treeData.connections.map((conn, i) => {
                           // If n1 was 0, start from center
                           const startX = n1 === 0 ? "50%" : `${getPct(conn.x1)}%`;
                           const startY = n1 === 0 ? "15%" : "40%";
                           const endX = `${getPct(conn.x2)}%`;
                           
                           return (
                               <line 
                                key={`l2-${i}`} 
                                x1={startX} y1={startY} 
                                x2={endX} y2="70%" 
                                stroke="#34d399" // emerald-400
                                strokeWidth="2"
                                strokeOpacity="0.6"
                               />
                           );
                       })}
                       
                       {/* Center Line (Reference) */}
                       <line x1="50%" y1="10%" x2="50%" y2="80%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
                    </svg>

                    {/* Sticks (DOM Overlay) */}
                    <div className="relative w-full h-full z-10">
                        {spectrum.map((peak, idx) => {
                           const pct = getPct(peak.shift);
                           const heightPct = (peak.count / maxCount) * 25; // Scale stick height

                           return (
                               <div 
                                 key={idx}
                                 className="absolute bottom-[10%] flex flex-col items-center group"
                                 style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
                               >
                                   {/* Intensity Box */}
                                   <div className="mb-1 text-xs font-bold text-white bg-slate-700 px-1.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                      {peak.count}
                                   </div>

                                   {/* The Stick */}
                                   <div 
                                      className="w-1.5 bg-slate-800 rounded-t-sm hover:bg-purple-600 transition-colors shadow-sm"
                                      style={{ height: `${Math.max(heightPct * 4, 10)}px` }}
                                   ></div>
                                   
                                   {/* Frequency Label */}
                                   <div className="mt-2 text-[9px] font-mono text-slate-400 opacity-60 group-hover:opacity-100">
                                      {peak.shift}
                                   </div>
                               </div>
                           );
                        })}
                    </div>
                 </div>
                 
                 <div className="text-center text-sm text-blue-600 mt-4 font-medium">
                    Different colored lines distinguish splitting from different chemical environments
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};