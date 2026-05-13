import React from 'react';
import { CompoundType } from '../types';

interface Props {
  collectedA: number;
  collectedB: number;
}

export const Beaker: React.FC<Props> = ({ collectedA, collectedB }) => {
  // Determine color of liquid in beaker
  let bgColor = 'bg-gray-100/20'; // clear
  let height = 0;
  
  const total = collectedA + collectedB;

  if (total > 0) {
      height = Math.min(total * 2, 80); // Cap height visual
      if (collectedA > collectedB * 2) {
          bgColor = 'bg-yellow-400/80';
      } else if (collectedB > collectedA * 2) {
          bgColor = 'bg-blue-500/80';
      } else {
          bgColor = 'bg-green-500/80'; // Mixture
      }
  }

  return (
    <div className="relative w-24 h-28 mx-auto mt-2">
       <div className="absolute bottom-0 w-full h-full border-x-2 border-b-4 border-gray-400 rounded-b-xl bg-white/10 backdrop-blur-sm overflow-hidden">
            {/* Liquid */}
            <div 
                className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${bgColor}`}
                style={{ height: `${height}%` }}
            >
                {/* Surface tension line */}
                <div className="w-full h-1 bg-white/30 absolute top-0"></div>
            </div>
            
            {/* Graduations */}
            <div className="absolute right-2 bottom-4 w-2 h-px bg-gray-500"></div>
            <div className="absolute right-2 bottom-8 w-3 h-px bg-gray-500"></div>
            <div className="absolute right-2 bottom-12 w-2 h-px bg-gray-500"></div>
            <div className="absolute right-2 bottom-16 w-3 h-px bg-gray-500"></div>
       </div>
       <div className="text-center text-xs text-gray-500 mt-29 font-mono">Collection Beaker</div>
    </div>
  );
};