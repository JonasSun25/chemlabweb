import React, { useState } from 'react';
import { Molecule, Atom } from '../types';
import { Image as ImageIcon, Box } from 'lucide-react';

interface MoleculeStructureProps {
  molecule: Molecule;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  nucleus: '1H' | '13C';
}

const MoleculeStructure: React.FC<MoleculeStructureProps> = ({
  molecule,
  hoveredId,
  setHoveredId,
  selectedId,
  setSelectedId,
  nucleus
}) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'image'>('interactive');

  // Simple scaling for the SVG
  const scale = 3.5;
  const offsetX = 50;
  const offsetY = 50;

  const isRelevant = (atom: Atom) => {
    // Standard check
    if (nucleus === '1H' && atom.type === 'H') return true;
    if (nucleus === '13C' && atom.type === 'C') return true;

    // Extended check: If an atom (like a CH3 group) is referenced in the peaks list for the current nucleus, it is relevant.
    const peaks = nucleus === '1H' ? molecule.peaks1H : molecule.peaks13C;
    const hasPeak = peaks.some(p => p.id === atom.id);
    if (hasPeak) return true;

    return false;
  };

  const getAtomColor = (atom: Atom) => {
    const isSelected = selectedId === atom.id;
    const isHovered = hoveredId === atom.id;
    const isTargetNucleus = isRelevant(atom);

    // If an item is selected or hovered, check if this atom belongs to the same group (same ppm)
    // Priority: Hovered > Selected
    const targetId = hoveredId || selectedId;

    if (targetId && (targetId !== atom.id)) {
       const targetAtom = molecule.atoms.find(a => a.id === targetId);
       const thisPeak = nucleus === '1H' ? molecule.peaks1H.find(p => p.id === atom.id) : molecule.peaks13C.find(p => p.id === atom.id);
       const targetPeak = nucleus === '1H' ? molecule.peaks1H.find(p => p.id === targetId) : molecule.peaks13C.find(p => p.id === targetId);
       
       // If both have same ppm, treat as active group
       if (targetPeak && thisPeak && targetPeak.ppm === thisPeak.ppm) {
          if (hoveredId) return 'opacity-100 scale-110 drop-shadow-md'; // Hover style
          return 'opacity-100 scale-110 drop-shadow-md fill-amber-50'; // Selected style variant (handled in render)
       }
       
       return 'opacity-30';
    }
    
    if (isSelected) return 'opacity-100 scale-110 drop-shadow-md';
    if (isHovered) return 'opacity-100 scale-110 drop-shadow-md';
    
    return isTargetNucleus ? 'opacity-100' : 'opacity-60';
  };

  return (
    <div 
      className="w-full h-80 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col relative overflow-hidden group"
      onClick={() => setSelectedId(null)} // Background click deselects
    >
      
      {/* Header / Controls */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 pointer-events-none">
          <div className="text-xs font-mono text-slate-400 bg-white/80 backdrop-blur px-2 py-1 rounded">
            Structure Viewer
          </div>
          
          {molecule.structureImage && (
             <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 pointer-events-auto shadow-sm">
                <button
                    onClick={(e) => { e.stopPropagation(); setViewMode('interactive'); }}
                    title="Interactive Diagram"
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'interactive' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Box size={14} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); setViewMode('image'); }}
                    title="Static Image"
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'image' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <ImageIcon size={14} />
                </button>
             </div>
          )}
      </div>
      
      {/* Content Area */}
      <div className="flex-grow w-full h-full flex items-center justify-center relative">
        {viewMode === 'image' && molecule.structureImage ? (
             <div className="w-full h-full p-8 flex items-center justify-center animate-fade-in">
                 <img 
                    src={molecule.structureImage} 
                    alt="Structure" 
                    className="max-w-full max-h-full object-contain"
                 />
                 <div className="absolute bottom-4 text-xs text-slate-400 bg-white/90 px-2 py-1 rounded">
                     Static View (No Interaction)
                 </div>
             </div>
        ) : (
            <>
              <svg width="100%" height="100%" viewBox="0 0 1000 600" className="transition-all duration-300">
                {/* Draw Bonds */}
                {molecule.bonds.map((bond, idx) => {
                  const fromAtom = molecule.atoms.find((a) => a.id === bond.from);
                  const toAtom = molecule.atoms.find((a) => a.id === bond.to);

                  if (!fromAtom || !toAtom) return null;

                  const x1 = fromAtom.x * scale + offsetX;
                  const y1 = fromAtom.y * scale + offsetY;
                  const x2 = toAtom.x * scale + offsetX;
                  const y2 = toAtom.y * scale + offsetY;

                  // Double bond offset logic
                  if (bond.type === 'double') {
                    // Offset perpendicular to line
                    const dx = x2 - x1;
                    const dy = y2 - y1;
                    const len = Math.sqrt(dx*dx + dy*dy);
                    const ox = (dy / len) * 4;
                    const oy = (-dx / len) * 4;

                    return (
                      <g key={idx} stroke="currentColor" strokeWidth="3" className="text-slate-800">
                        <line x1={x1 + ox} y1={y1 + oy} x2={x2 + ox} y2={y2 + oy} />
                        <line x1={x1 - ox} y1={y1 - oy} x2={x2 - ox} y2={y2 - oy} />
                      </g>
                    )
                  }

                  return (
                    <line
                      key={idx}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="text-slate-800"
                    />
                  );
                })}

                {/* Draw Atoms */}
                {molecule.atoms.map((atom) => {
                  const x = atom.x * scale + offsetX;
                  const y = atom.y * scale + offsetY;
                  const active = isRelevant(atom);
                  const atomClass = getAtomColor(atom);
                  
                  // Check explicit selection for ring color
                  const isSelected = selectedId === atom.id;
                  
                  // Adjust font size based on label length (e.g. CH3 vs C)
                  const fontSize = atom.label.length > 1 ? 'text-3xl' : 'text-5xl';
                  // Adjust circle size slightly for larger groups if needed
                  const r = atom.label.length > 1 ? 40 : 26;

                  return (
                    <g
                      key={atom.id}
                      className={`transition-all duration-300 cursor-pointer ${atomClass}`}
                      onMouseEnter={() => active && setHoveredId(atom.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={(e) => {
                          e.stopPropagation(); // Stop background click
                          if (active) setSelectedId(atom.id);
                      }}
                    >
                      {/* Highlight Circle Background */}
                      {active && (
                        <circle
                          cx={x}
                          cy={y}
                          r={r + 12}
                          className={`${atom.groupColor} transition-colors duration-300`}
                          stroke={isSelected ? '#f59e0b' : 'transparent'}
                          strokeWidth={isSelected ? 4 : 0}
                        />
                      )}
                      
                      {/* Atom Circle (White background for text) */}
                      <circle
                        cx={x}
                        cy={y}
                        r={r}
                        className="fill-white stroke-0"
                      />
                      
                      {/* Atom Label */}
                      <text
                        x={x}
                        y={y}
                        dy=".35em"
                        textAnchor="middle"
                        style={{ fill: atom.textColor || (atom.type === 'C' && atom.label === 'C' ? '#1e293b' : atom.type === 'C' ? '#64748b' : '#64748b') }}
                        className={`${fontSize} font-bold select-none pointer-events-none`}
                      >
                        {atom.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
              
              <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
                <p className="text-sm text-slate-500 bg-white/80 inline-block px-2 rounded backdrop-blur transition-opacity opacity-100">
                  {hoveredId 
                    ? (molecule.peaks1H.find(p => p.id === hoveredId)?.assignment || molecule.peaks13C.find(p => p.id === hoveredId)?.assignment || "Atom Selected")
                    : selectedId 
                      ? (molecule.peaks1H.find(p => p.id === selectedId)?.assignment || molecule.peaks13C.find(p => p.id === selectedId)?.assignment || "Atom Locked")
                      : "Click on an atom to lock details"}
                </p>
              </div>
            </>
        )}
      </div>
    </div>
  );
};

export default MoleculeStructure;