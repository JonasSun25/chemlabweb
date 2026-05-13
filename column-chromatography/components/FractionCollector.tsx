
import React from 'react';
import { Fraction } from '../types';

interface Props {
  currentFraction: { countA: number; countB: number; total: number; volume: number };
  fractions: Fraction[];
  isSwapping: boolean;
}

const TestTube: React.FC<{ 
  countA: number; 
  countB: number; 
  total: number; 
  volume: number;
  maxVolume?: number;
  scale?: number;
}> = ({ countA, countB, total, volume, maxVolume = 100, scale = 1 }) => {
  
  // Default to clear solvent look (transparent with slight tint)
  let bgColor = 'bg-cyan-50/50'; 
  let borderColor = 'border-transparent';

  let height = 0;

  if (volume > 0) {
    height = Math.min((volume / maxVolume) * 100, 90);
    
    if (total > 0) {
        // Compounds present
        if (countA > countB * 2) {
            bgColor = 'bg-yellow-400/90';
        } else if (countB > countA * 2) {
            bgColor = 'bg-blue-500/90';
        } else {
            bgColor = 'bg-green-500/90'; // Mixed
        }
    } else {
        // Only solvent - make it look liquid but clear
        bgColor = 'bg-sky-100/40';
        borderColor = 'border-sky-200/30';
    }
  }

  return (
    <div 
      className="relative border-x border-b border-gray-400/60 bg-white/10 backdrop-blur-[1px] rounded-b-full overflow-hidden shadow-sm transition-all duration-300"
      style={{ 
        width: `${20 * scale}px`, 
        height: `${80 * scale}px` 
      }}
    >
        {/* Liquid */}
        <div 
            className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${bgColor} ${borderColor} border-t`}
            style={{ height: `${height}%` }}
        >
            {/* Surface shine/meniscus */}
            <div className="w-full h-[2px] bg-white/60 absolute top-0"></div>
        </div>
        
        {/* Glass Reflections */}
        <div className="absolute top-0 right-[20%] w-[20%] h-full bg-gradient-to-l from-white/30 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-2 left-1 w-1 h-4 bg-white/20 rounded-full blur-[1px]"></div>
    </div>
  );
};

export const FractionCollector: React.FC<Props> = ({ currentFraction, fractions, isSwapping }) => {
  return (
    <div className="relative w-full h-[180px] mt-0 overflow-hidden">
      
      {/* 1. Active Collection Tube - Centered Absolute */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 flex flex-col items-center w-24">
        
        {/* The Active Tube (or the new one entering) */}
        <div className={`transition-all duration-700 ease-in-out transform ${isSwapping ? 'translate-x-[60px] translate-y-[20px] opacity-0 scale-75' : 'translate-x-0 translate-y-0 opacity-100 scale-100'}`}>
             <TestTube 
                countA={currentFraction.countA} 
                countB={currentFraction.countB} 
                total={currentFraction.total} 
                volume={currentFraction.volume}
                scale={1.4} // Slightly larger as it's the focus
             />
        </div>
        
        {/* Ghost tube for animation (The empty one replacing it) */}
        {isSwapping && (
             <div className="absolute top-0 animate-[fadeInUp_0.5s_ease-out_0.5s_both]">
                <TestTube countA={0} countB={0} total={0} volume={0} scale={1.4} />
             </div>
        )}

        {!isSwapping && <div className="text-xs text-gray-500 mt-2 font-mono bg-white/80 px-2 rounded shadow-sm">Current</div>}
      </div>

      {/* 2. Tube Rack - Offset to the Right */}
      <div className="absolute left-[calc(50%+60px)] top-10 right-4 h-[100px] flex items-end overflow-x-auto pb-2 px-2 scrollbar-hide mask-gradient">
         <div className="flex gap-2 items-end bg-gray-200/50 p-2 rounded-lg border border-gray-300 shadow-inner h-full min-w-[200px]">
            {/* Rack Slots */}
            {fractions.length === 0 && (
                 <span className="text-xs text-gray-400 italic w-full text-center self-center">Fraction Rack Empty</span>
            )}
            
            {[...fractions].reverse().map((f) => (
                <div key={f.id} className="animate-[popIn_0.3s_ease-out] flex flex-col items-center min-w-[24px]">
                    <TestTube 
                        countA={f.countA} 
                        countB={f.countB} 
                        total={f.total} 
                        volume={f.volume}
                        scale={0.7}
                    />
                    <div className="text-[9px] text-center text-gray-500 mt-1 font-mono">#{f.id + 1}</div>
                </div>
            ))}
         </div>
      </div>

      <style>{`
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .mask-gradient {
            mask-image: linear-gradient(to right, black 80%, transparent 100%);
        }
      `}</style>
    </div>
  );
};
