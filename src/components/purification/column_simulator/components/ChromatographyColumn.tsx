
import React, { useEffect, useRef, useState } from 'react';
import { Particle, CompoundType, SimulationState } from '../types';
import { SilicaStructure } from './ChemicalStructures';
import { ZoomIn } from 'lucide-react';

interface Props {
  particles: Particle[];
  simState: SimulationState;
  solventLevel: number; // 0-100
  solventPolarity: number; // 0-1
}

export const ChromatographyColumn: React.FC<Props> = ({ particles, simState, solventLevel, solventPolarity }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showSilicaZoom, setShowSilicaZoom] = useState(false);

  // Trigger zoom animation after packing
  useEffect(() => {
    if (simState === SimulationState.READY) {
      setShowSilicaZoom(true);
      const timer = setTimeout(() => setShowSilicaZoom(false), 4000); // Show for 4s
      return () => clearTimeout(timer);
    } else {
      setShowSilicaZoom(false);
    }
  }, [simState]);

  // Determine solvent color based on polarity
  // Low (0) -> Yellowish (Non-polar/Hexane)
  // High (1) -> Blueish (Polar/EtOAc)
  const solventColor = `rgba(${250 - (solventPolarity * 50)}, ${250 - (solventPolarity * 20)}, ${200 + (solventPolarity * 55)}, 0.6)`;

  // Draw particles on canvas for better performance than 100 DOM nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Solvent Level
    if (solventLevel > 0) {
        const solventY = canvas.height - (canvas.height * (solventLevel / 100));
        
        // Wet Silica Background
        ctx.fillStyle = 'rgba(240, 245, 255, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height); 
        
        // Top solvent reservoir
        ctx.fillStyle = solventColor;
        ctx.fillRect(0, 0, canvas.width, 25); 
        
        // Bubbles in reservoir
        if (simState === SimulationState.ELUTING) {
             const time = Date.now() / 200;
             for(let i=0; i<5; i++) {
                 const x = (Math.sin(time + i) * 40) + 48;
                 const y = 20 - (time * 2 % 20);
                 ctx.beginPath();
                 ctx.arc(x, y, 2, 0, Math.PI*2);
                 ctx.fillStyle = 'rgba(255,255,255,0.6)';
                 ctx.fill();
             }
        }
    }

    // Draw Particles
    particles.forEach(p => {
      if (!p.visible || p.collected) return;

      const yPos = (p.y / 100) * canvas.height;
      const xPos = (p.x / 100) * canvas.width;

      ctx.beginPath();
      ctx.arc(xPos, yPos, 3, 0, Math.PI * 2);
      
      // Color Logic
      if (p.type === CompoundType.A) {
        ctx.fillStyle = '#FACC15'; // Yellow (Non-polar)
      } else {
        ctx.fillStyle = '#3B82F6'; // Blue (Polar)
      }
      
      ctx.fill();
    });

  }, [particles, solventLevel, solventPolarity, simState]);

  return (
    <div className="relative h-[500px] w-[140px] flex flex-col items-center z-10">
      
      {/* Silica Zoom Overlay */}
      {showSilicaZoom && (
        <div className="absolute top-32 -left-24 w-40 p-2 bg-white rounded-full shadow-2xl border-4 border-blue-200 animate-[popIn_0.5s_ease-out] z-50 flex flex-col items-center justify-center text-center">
             <div className="bg-blue-50 rounded-full p-2 mb-1">
                <ZoomIn size={20} className="text-blue-500" />
             </div>
             <div className="scale-50 origin-center -my-4">
                <SilicaStructure />
             </div>
             <p className="text-[10px] font-bold text-blue-800 mt-2">Packed Silica Gel</p>
        </div>
      )}

      {/* Column Neck */}
      <div className="w-16 h-8 border-x-2 border-gray-400/50 relative bg-white/10 backdrop-blur-sm rounded-t-sm z-20"></div>
      
      {/* Main Column Body */}
      <div className="w-24 flex-grow border-x-2 border-gray-400/50 relative bg-white/20 backdrop-blur-md overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] rounded-sm">
        
        {/* Stationary Phase (Silica) Texture - Beads Effect */}
        {simState !== SimulationState.IDLE && simState !== SimulationState.PACKING && (
           <>
             <div className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                      backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                      backgroundSize: '4px 4px'
                  }}
             ></div>
             <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-r from-gray-100 via-transparent to-gray-100"></div>
           </>
        )}
        
        {/* Packing Animation Overlay */}
        {simState === SimulationState.PACKING && (
             <div className="absolute bottom-0 left-0 right-0 bg-slate-100 animate-[rise_2s_ease-in-out_forwards] opacity-90 border-t border-gray-300 h-full transition-all duration-[2000ms] flex items-end justify-center pb-4">
                <span className="text-[10px] text-gray-400 animate-pulse font-mono">PACKING...</span>
             </div>
        )}

        {/* Canvas for Particles & Solvent */}
        <canvas 
            ref={canvasRef} 
            width={96} 
            height={440} 
            className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Stopcock */}
      <div className="w-2 h-6 bg-gray-300 relative flex items-center justify-center z-20 shadow-sm">
          <div className={`w-8 h-2 bg-red-500 rounded-full transition-transform duration-300 shadow-sm ${simState === SimulationState.ELUTING ? 'rotate-90' : 'rotate-0'}`}>
             <div className="w-1 h-1 bg-red-700 rounded-full absolute right-1 top-0.5 opacity-50"></div>
          </div>
      </div>

      {/* Tip */}
      <div className="w-2 h-8 bg-gray-300/50 border-x border-gray-400/50 relative z-10">
        {/* Drip Animation */}
        {simState === SimulationState.ELUTING && (
             <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full animate-[drip_0.6s_infinite] z-0"
                  style={{ backgroundColor: solventColor }} // Drip matches solvent color
             ></div>
        )}
      </div>

      <style>{`
        @keyframes rise {
            0% { height: 0%; }
            100% { height: 100%; }
        }
        @keyframes drip {
            0% { transform: translate(-50%, 0); opacity: 1; }
            100% { transform: translate(-50%, 20px); opacity: 0; }
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
