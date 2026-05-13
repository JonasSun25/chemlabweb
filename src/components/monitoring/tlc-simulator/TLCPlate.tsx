import React from 'react';
import { Compound, SimulationResult } from './types';

interface TLCPlateProps {
  results: SimulationResult[];
  compounds: Compound[];
  solventRatio: number;
}

const TLCPlate: React.FC<TLCPlateProps> = ({ results, compounds, solventRatio }) => {
  return (
    <div className="relative w-full max-w-[300px] h-[500px] bg-white border-2 border-slate-200 shadow-xl rounded-sm mx-auto overflow-hidden">
      {/* Texture effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-slate-100" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

      {/* Solvent Front Label */}
      <div className="absolute top-2 right-2 text-xs text-slate-400 font-mono">
        Front
      </div>

      {/* Baseline Label */}
      <div className="absolute bottom-2 right-2 text-xs text-slate-400 font-mono">
        Baseline
      </div>

      {/* The Plate Drawing Area */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Baseline */}
        <line x1="10" y1="90" x2="90" y2="90" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2,1" />
        
        {/* Solvent Front (Calculated) - Usually fixed at top for calculation, but visually we show where it stopped */}
        <line x1="10" y1="10" x2="90" y2="10" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2,1" />

        {/* Compounds */}
        {results.map((res, index) => {
          const compound = compounds.find(c => c.id === res.compoundId);
          if (!compound) return null;

          // Map Rf (0-1) to Y coordinates
          // Y=90 is Rf=0, Y=10 is Rf=1
          // Formula: y = 90 - (rf * 80)
          const cy = 90 - (res.rf * 80);
          
          // Distribute X position based on index to separate spots horizontally like lanes
          const totalLanes = results.length;
          const laneWidth = 80 / totalLanes;
          const cx = 10 + (laneWidth * index) + (laneWidth / 2);

          return (
            <g key={res.compoundId} className="group cursor-help">
              {/* Vertical Lane Guide (Faint) */}
              <line x1={cx} y1="90" x2={cx} y2="10" stroke={compound.color} strokeWidth="0.1" strokeOpacity="0.2" strokeDasharray="1,1" />

               {/* Spot shape - slightly irregular oval */}
              <ellipse 
                cx={cx} 
                cy={cy} 
                rx="3" 
                ry="4" 
                fill={compound.color} 
                opacity="0.9" 
                className="transition-all duration-500 ease-out hover:rx-4 hover:ry-5"
              />
              
              {/* Rf Label - Always visible now */}
              <text 
                x={cx} 
                y={cy - 6} 
                textAnchor="middle" 
                fontSize="3.5" 
                fill="#475569"
                fontWeight="bold"
                className="select-none"
                style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}
              >
                {res.rf.toFixed(2)}
              </text>
              
              {/* Compound Name at bottom */}
              <text 
                x={cx} 
                y="96" 
                textAnchor="middle" 
                fontSize="2.5" 
                fill="#64748b"
                className="font-medium"
              >
                {compound.name}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Solvent Info Overlay */}
      <div className="absolute top-0 left-0 bg-slate-900/5 p-2 rounded-br-lg text-[10px] text-slate-500">
        <div className="font-bold">Mobile Phase</div>
        <div>EA: {solventRatio}%</div>
        <div>Hex: {100 - solventRatio}%</div>
      </div>
    </div>
  );
};

export default TLCPlate;