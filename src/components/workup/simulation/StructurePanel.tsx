
import React from 'react';
import { AqueousReagent, MoleculeType } from './types';

interface StructurePanelProps {
  reagent: AqueousReagent;
  activeType: MoleculeType | null; // Highlights the molecule currently reacting/moving
}

export const StructurePanel: React.FC<StructurePanelProps> = ({ reagent, activeType }) => {
  
  const isAcidicEnv = reagent === AqueousReagent.HCL;
  const isBasicEnv = reagent === AqueousReagent.NAOH;

  // Determine molecule status/location for visual feedback
  const getStatus = (type: MoleculeType) => {
      // Logic simplified for demo based on linear flow
      if (type === MoleculeType.BASE) {
          if (reagent === AqueousReagent.NAOH) return { text: "Collected in Flask A", color: "bg-blue-600 text-white" }; // Already done
          if (isAcidicEnv) return { text: "Moving to Aqueous Layer", color: "bg-blue-100 text-blue-800" };
      }
      if (type === MoleculeType.ACID) {
          if (activeType === MoleculeType.NEUTRAL) return { text: "Collected in Flask B", color: "bg-red-600 text-white" }; // Already done
          if (isBasicEnv) return { text: "Moving to Aqueous Layer", color: "bg-red-100 text-red-800" };
      }
      return { text: "In Organic Layer (Funnel)", color: "bg-slate-100 text-slate-600" };
  };

  // SVG Helpers
  const BenzeneRing = ({ x, y, scale = 1, opacity = 1 }: any) => (
    <path 
        d={`M ${x} ${y-20*scale} L ${x+17*scale} ${y-10*scale} L ${x+17*scale} ${y+10*scale} L ${x} ${y+20*scale} L ${x-17*scale} ${y+10*scale} L ${x-17*scale} ${y-10*scale} Z`}
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        className="text-slate-700 transition-all duration-500"
        style={{ opacity }}
    />
  );

  const Bond = ({ x1, y1, x2, y2 }: any) => (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" className="text-slate-700" />
  );

  const LocationBadge = ({ type }: { type: MoleculeType }) => {
      const status = getStatus(type);
      return (
        <div className={`mt-2 text-[9px] font-bold uppercase tracking-wide py-1 px-2 rounded-full ${status.color}`}>
            {status.text}
        </div>
      );
  };

  return (
    <div className="bg-white/90 backdrop-blur rounded-xl border border-slate-200 p-4 shadow-sm w-full">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-b pb-2">
          Molecular Structures
      </h3>
      
      <div className="grid grid-cols-3 gap-2">
          
          {/* 1. p-Chloroaniline (BASE) */}
          <div className={`relative p-2 rounded-lg transition-colors duration-500 flex flex-col items-center justify-between
              ${activeType === MoleculeType.BASE ? 'bg-blue-50 ring-1 ring-blue-200' : 'bg-transparent opacity-60'}
          `}>
               <div className="h-24 w-full flex items-center justify-center text-slate-700">
                   <svg width="80" height="80" viewBox="0 0 100 100">
                       <BenzeneRing x={50} y={50} />
                       {/* NH2 / NH3+ Group */}
                       <text x="50" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isAcidicEnv && activeType === MoleculeType.BASE ? "#2563eb" : "currentColor"}>
                           {isAcidicEnv && activeType === MoleculeType.BASE ? "NH₃⁺" : "NH₂"}
                       </text>
                       <Bond x1={50} y1={30} x2={50} y2={25} />
                       {/* Cl Group */}
                       <text x="50" y="90" textAnchor="middle" fontSize="12" fontWeight="bold">Cl</text>
                       <Bond x1={50} y1={70} x2={50} y2={80} />
                   </svg>
               </div>
               <div className="text-center w-full">
                   <div className="text-xs font-bold text-blue-700">p-Chloroaniline</div>
                   <LocationBadge type={MoleculeType.BASE} />
               </div>
          </div>

          {/* 2. Benzoic Acid (ACID) */}
          <div className={`relative p-2 rounded-lg transition-colors duration-500 flex flex-col items-center justify-between
              ${activeType === MoleculeType.ACID ? 'bg-red-50 ring-1 ring-red-200' : 'bg-transparent opacity-60'}
          `}>
               <div className="h-24 w-full flex items-center justify-center text-slate-700">
                   <svg width="80" height="80" viewBox="0 0 100 100">
                       <BenzeneRing x={50} y={50} />
                       {/* COOH / COO- Group */}
                       <text x="50" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill={isBasicEnv && activeType === MoleculeType.ACID ? "#dc2626" : "currentColor"}>
                           {isBasicEnv && activeType === MoleculeType.ACID ? "COO⁻" : "COOH"}
                       </text>
                       <Bond x1={50} y1={30} x2={50} y2={25} />
                   </svg>
               </div>
               <div className="text-center w-full">
                   <div className="text-xs font-bold text-red-700">Benzoic Acid</div>
                   <LocationBadge type={MoleculeType.ACID} />
               </div>
          </div>

          {/* 3. Diphenyl (NEUTRAL) */}
          <div className={`relative p-2 rounded-lg transition-colors duration-500 flex flex-col items-center justify-between
              ${activeType === MoleculeType.NEUTRAL ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'bg-transparent opacity-60'}
          `}>
               <div className="h-24 w-full flex items-center justify-center text-slate-700">
                   <svg width="100" height="80" viewBox="0 0 120 100">
                       <g transform="translate(-15,0)">
                        <BenzeneRing x={50} y={50} />
                       </g>
                       <g transform="translate(35,0)">
                        <BenzeneRing x={50} y={50} />
                       </g>
                       <Bond x1={52} y1={50} x2={68} y2={50} />
                   </svg>
               </div>
               <div className="text-center w-full">
                   <div className="text-xs font-bold text-emerald-700">Diphenyl</div>
                   <LocationBadge type={MoleculeType.NEUTRAL} />
               </div>
          </div>
      </div>
      
      {/* Reaction Equation Display */}
      <div className="mt-3 bg-slate-50 p-2 rounded text-center text-xs font-mono text-slate-600 border border-slate-200">
          {isAcidicEnv && (
              <span>R-NH₂ + HCl → <strong className="text-blue-600">R-NH₃⁺ Cl⁻</strong> (Salt)</span>
          )}
          {isBasicEnv && (
              <span>R-COOH + NaOH → <strong className="text-red-600">R-COO⁻ Na⁺</strong> (Salt) + H₂O</span>
          )}
          {!isAcidicEnv && !isBasicEnv && (
              <span className="italic text-slate-400">No active reaction</span>
          )}
      </div>
    </div>
  );
};
