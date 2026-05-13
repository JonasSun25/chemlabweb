import React, { useMemo } from 'react';
import { Molecule, PeakData } from '../types';
import { Table2 } from 'lucide-react';

interface ReferencePanelProps {
  molecule: Molecule;
  nucleus: '1H' | '13C';
  setHoveredId: (id: string | null) => void;
  hoveredId: string | null;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

const ReferencePanel: React.FC<ReferencePanelProps> = ({ molecule, nucleus, setHoveredId, hoveredId, selectedId, setSelectedId }) => {
  const peaks = nucleus === '1H' ? molecule.peaks1H : molecule.peaks13C;
  
  // Deduplicate peaks based on chemical shift (ppm)
  const uniquePeaks = useMemo(() => {
    const map = new Map<string, PeakData>();
    peaks.forEach(peak => {
       const key = peak.ppm.toFixed(2); // Group by 2 decimal places
       if (!map.has(key)) {
           map.set(key, peak);
       }
    });
    return Array.from(map.values()).sort((a, b) => b.ppm - a.ppm);
  }, [peaks]);

  // Helper to check if a row should be highlighted
  // Active if hovered match OR selected match
  const getRowState = (rowPeak: PeakData) => {
      // Check hovered first
      if (hoveredId) {
          const hoveredPeak = peaks.find(p => p.id === hoveredId);
          if (hoveredPeak && Math.abs(hoveredPeak.ppm - rowPeak.ppm) < 0.01) return 'hovered';
      }
      
      // Check selected
      if (selectedId) {
          const selectedPeak = peaks.find(p => p.id === selectedId);
          if (selectedPeak && Math.abs(selectedPeak.ppm - rowPeak.ppm) < 0.01) return 'selected';
      }

      return 'none';
  };

  return (
    <div className="w-full h-80 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
             <div className="flex items-center gap-2 text-slate-700">
                <Table2 size={16}/>
                <h3 className="text-sm font-bold">Signal Reference</h3>
             </div>
             <div className="flex gap-2 text-xs text-slate-400">
                <span className={`px-2 py-0.5 rounded cursor-pointer ${nucleus === '1H' ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100'}`}>1H</span>
                <span className={`px-2 py-0.5 rounded cursor-pointer ${nucleus === '13C' ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100'}`}>13C</span>
             </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-0">
            <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th className="px-3 py-2 text-slate-500 font-semibold border-b border-slate-200">Shift (ppm)</th>
                        {nucleus === '1H' && <th className="px-3 py-2 text-slate-500 font-semibold border-b border-slate-200">Mult.</th>}
                        {nucleus === '1H' && <th className="px-3 py-2 text-slate-500 font-semibold border-b border-slate-200">Int.</th>}
                        <th className="px-3 py-2 text-slate-500 font-semibold border-b border-slate-200 w-full">Assignment</th>
                    </tr>
                </thead>
                <tbody>
                    {uniquePeaks.map((peak, idx) => {
                        const state = getRowState(peak);
                        let bgClass = 'hover:bg-slate-50';
                        if (state === 'hovered') bgClass = 'bg-blue-50';
                        if (state === 'selected') bgClass = 'bg-amber-50 border-l-4 border-amber-400';

                        return (
                            <tr 
                                key={`${peak.id}-${idx}`}
                                className={`border-b border-slate-50 transition-all cursor-pointer ${bgClass}`}
                                onMouseEnter={() => setHoveredId(peak.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => setSelectedId(peak.id)}
                            >
                                <td className={`px-3 py-2 font-mono font-medium whitespace-nowrap ${state === 'selected' ? 'text-amber-700' : 'text-blue-600'}`}>{peak.ppm.toFixed(2)}</td>
                                {nucleus === '1H' && <td className="px-3 py-2 font-mono text-slate-600">{peak.multiplicity}</td>}
                                {nucleus === '1H' && <td className="px-3 py-2 font-mono text-slate-600">{peak.integration}H</td>}
                                <td className="px-3 py-2 text-slate-600 truncate max-w-[120px]" title={peak.assignment}>{peak.assignment}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ReferencePanel;