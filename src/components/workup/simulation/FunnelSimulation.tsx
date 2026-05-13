
import React, { useEffect, useState } from 'react';
import { ExperimentState, Particle, Solvent, AqueousReagent, MoleculeType, CollectedFraction, SimulationLabels } from './types';

interface FunnelSimulationProps {
  state: ExperimentState;
  particles: Particle[];
  solvent: Solvent;
  reagent: AqueousReagent;
  onParticlesUpdate: (particles: Particle[]) => void;
  collectedFractions: CollectedFraction[];
  labels: SimulationLabels;
}

export const FunnelSimulation: React.FC<FunnelSimulationProps> = ({
  state,
  particles,
  solvent,
  reagent,
  onParticlesUpdate,
  collectedFractions,
  labels
}) => {
  // SVG Dimensions
  const width = 300;
  const height = 650;
  
  // Pear-shaped funnel path
  const funnelPath = `
    M 136 60 
    L 136 90 
    C 136 110, 50 140, 50 210 
    C 50 320, 145 390, 146 440 
    L 146 530 
    L 154 530 
    L 154 440 
    C 155 390, 250 320, 250 210 
    C 250 140, 164 110, 164 90 
    L 164 60 
    Z
  `;
  const liquidClipPathId = "funnel-clip";

  const [drainHeight, setDrainHeight] = useState(0);
  const [pourVolume, setPourVolume] = useState(0);
  const [addReagentProgress, setAddReagentProgress] = useState(0);
  const [showReveal, setShowReveal] = useState(false);

  // Graphical constants
  const LIQUID_START_Y = 120; 
  const INTERFACE_Y = 260; 
  const BOTTOM_LAYER_Y_START = 260;

  // Calculate dynamic offsets
  const drainOffset = state === ExperimentState.DRAINING ? drainHeight * 2.5 : 0;
  const pourOffset = state === ExperimentState.POURING ? pourVolume * 2 : 0;

  // Helper to determine animation class
  const getParticleTransitionClass = (currentState: ExperimentState) => {
      if (currentState === ExperimentState.MIXING) return "transition-none"; // Instant updates for shaking
      if (currentState === ExperimentState.ADDING_SOLUTE) return "transition-all duration-[2000ms] ease-out"; // Falling and dissolving
      if (currentState === ExperimentState.ADDING_LIQUID) return "transition-none"; // Handled by SVG interpolation for smoothness
      if (currentState === ExperimentState.SETTLING) return "transition-all duration-[3000ms] ease-in-out"; // Smooth glide
      // For Reveal state (Separated)
      if (currentState === ExperimentState.SEPARATED) return "transition-opacity duration-1000 ease-in";
      return "transition-all duration-300 ease-out"; // Standard
  };

  useEffect(() => {
    if (state === ExperimentState.SETUP) {
        setDrainHeight(0);
        setPourVolume(0);
        setAddReagentProgress(0);
        setShowReveal(false);
    }
    
    if (state === ExperimentState.SEPARATED) {
        setShowReveal(true);
    } else {
        setShowReveal(false);
    }
    
    if (state === ExperimentState.ADDING_LIQUID) {
        // Animate pouring in
        const interval = setInterval(() => {
            setAddReagentProgress(prev => Math.min(prev + 1, 100));
        }, 20);
        return () => clearInterval(interval);
    }

    if (state === ExperimentState.MIXING) {
      const interval = setInterval(() => {
        const newParticles = particles.map(p => ({
          ...p,
          x: 100 + Math.random() * 100,
          y: 130 + Math.random() * 250 
        }));
        onParticlesUpdate(newParticles);
      }, 100);
      return () => clearInterval(interval);
    } 
    
    if (state === ExperimentState.SETTLING) {
      // Calculate FINAL destination immediately
      const newParticles = particles.map(p => {
          let prefersAqueous = false;
          if (p.type === MoleculeType.BASE && reagent === AqueousReagent.HCL) prefersAqueous = true;
          else if (p.type === MoleculeType.ACID && reagent === AqueousReagent.NAOH) prefersAqueous = true;

          let targetYRange = [0, 0];
          
          // Organic Top, Aqueous Bottom (Fixed)
          if (prefersAqueous) targetYRange = [BOTTOM_LAYER_Y_START, 140];
          else targetYRange = [LIQUID_START_Y + 20, 100];

          return {
            ...p,
            x: 110 + Math.random() * 80,
            y: targetYRange[0] + Math.random() * targetYRange[1]
          };
      });
      // Trigger update once. CSS handles the 3s interpolation.
      onParticlesUpdate(newParticles);
    }

    if (state === ExperimentState.DRAINING) {
        const interval = setInterval(() => {
            setDrainHeight(h => {
                if (h >= 80) return 80; 
                return h + 1.0; 
            });
        }, 30);
        return () => clearInterval(interval);
    }

    if (state === ExperimentState.POURING) {
        const interval = setInterval(() => {
             setPourVolume(v => Math.min(v + 1.5, 80));
        }, 30);
        return () => clearInterval(interval);
    }

  }, [state, reagent]);

  const isShaking = state === ExperimentState.MIXING;
  const isPouring = state === ExperimentState.POURING;
  const isAddingLiquid = state === ExperimentState.ADDING_LIQUID;
  const isDraining = state === ExperimentState.DRAINING;
  const isDissolving = state === ExperimentState.ADDING_SOLUTE;
  
  // Solvents are always lighter than water now (Ether/EtOAc)
  const aqueousColor = reagent === AqueousReagent.HCL ? '#bfdbfe' : reagent === AqueousReagent.NAOH ? '#ddd6fe' : '#e2e8f0';
  const organicColor = solvent.color;
  const bottomFill = aqueousColor; 
  const topFill = organicColor;
  
  const flaskPath = "M 15 100 L 35 30 L 65 30 L 85 100 Q 90 110 80 110 L 20 110 Q 10 110 15 100 Z";

  const getParticleColor = (type: MoleculeType) => {
      switch(type) {
          case MoleculeType.ACID: return "#ef4444";
          case MoleculeType.BASE: return "#3b82f6";
          case MoleculeType.NEUTRAL: return "#10b981";
          default: return "#94a3b8";
      }
  };

  const showLayerLabels = state !== ExperimentState.FINISHED && !isPouring && !isAddingLiquid && !isDissolving && (
      state === ExperimentState.ADD_REAGENT || 
      state === ExperimentState.SETTLING || 
      state === ExperimentState.SEPARATED || 
      state === ExperimentState.DRAINING
  );
  
  const topLabel = "Organic Phase";
  const bottomLabel = "Aqueous Phase";
  const labelStyle = "fill-slate-700 font-bold text-sm opacity-75 pointer-events-none drop-shadow-sm tracking-tight";

  const activeDrainingParticles = particles.filter(p => {
     // Bottom is Aqueous.
     if (reagent === AqueousReagent.HCL) return p.type === MoleculeType.BASE;
     if (reagent === AqueousReagent.NAOH) return p.type === MoleculeType.ACID;
     return false;
  });

  // Calculate Liquid Heights for Animations
  // Base heights
  let bottomRectY = 260;
  let bottomRectH = 240;
  let topRectY = 120;
  let topRectH = 140;

  let bottomFillColor = bottomFill;
  let topFillColor = topFill;
  
  // Animation states
  if (state === ExperimentState.SETUP || state === ExperimentState.ADDING_SOLUTE) {
      // ONLY ORGANIC. It sits at bottom of funnel shape initially.
      bottomFillColor = organicColor; 
      topRectH = 0; // No top layer yet
  } else if (isAddingLiquid) {
      // Transition: Organic layer lifts up as Aqueous layer fills underneath
      const p = addReagentProgress / 100;

      bottomFillColor = aqueousColor;
      
      const organicStartY = 260;
      const organicEndY = 120;
      const organicStartH = 240;
      const organicEndH = 140;
      
      topRectY = organicStartY + (organicEndY - organicStartY) * p;
      topRectH = organicStartH + (organicEndH - organicStartH) * p;

      // Bottom Rect (Aqueous) - Fills from bottom
      const aqueousTargetH = 240;
      bottomRectH = aqueousTargetH * p;
      bottomRectY = 500 - bottomRectH;
      
      topFillColor = organicColor; 
  }

  // Label Overlay Component
  const LabelOverlay = ({ x, y, text, color = "bg-slate-800" }: {x: number, y: number, text: string, color?: string}) => (
      <div 
        className="absolute px-3 py-1 rounded shadow-lg text-xs font-bold text-white whitespace-nowrap z-20 animate-fade-in-up"
        style={{ left: x, top: y, backgroundColor: color }}
      >
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ backgroundColor: color }}></div>
          {text}
      </div>
  );

  return (
    <div className={`relative flex flex-col items-center justify-center h-full select-none`}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="drop-shadow-xl">
        <defs>
          <clipPath id={liquidClipPathId}>
            <path d={funnelPath} />
          </clipPath>
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="20%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            <stop offset="80%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
          </linearGradient>
          <clipPath id="flaskClip">
             <path d={flaskPath} />
          </clipPath>
        </defs>

        {/* --- COLLECTED FLASKS SHELF --- */}
        {collectedFractions.filter(f => !f.isTemp).map((fraction, idx) => (
             <g key={fraction.id} transform={`translate(${220}, ${430 - (idx * 80)}) scale(0.6)`}>
                 <path d={flaskPath} fill="white" stroke="#94a3b8" strokeWidth="2" opacity="0.5" />
                 <g clipPath="url(#flaskClip)">
                     <rect x="0" y={110 - 60} width="100" height="60" fill={fraction.color} opacity="0.8" />
                     {Array.from({ length: 5 }).map((_, i) => (
                         <circle 
                            key={i}
                            cx={30 + Math.random() * 40}
                            cy={60 + Math.random() * 40}
                            r={6}
                            fill={getParticleColor(fraction.moleculeType)}
                            stroke="white"
                            strokeWidth="1"
                            opacity="0.8"
                         />
                     ))}
                 </g>
                 <path d={flaskPath} fill="url(#glassGradient)" stroke="rgba(255,255,255,0.5)" />
                 <text x="50" y="130" textAnchor="middle" fontSize="16" className="fill-slate-500 font-bold">{fraction.label}</text>
             </g>
        ))}

        {/* --- MAIN FUNNEL GROUP --- */}
        <g 
            id="funnel-assembly" 
            className={`transition-transform duration-1000 ease-in-out ${isShaking ? 'animate-shake' : ''}`}
            style={{ 
                transformOrigin: '150px 300px',
                transform: isPouring ? 'rotate(-100deg) translate(-40px, 40px)' : 'rotate(0deg)'
            }}
        >
            {/* Glass Container Back */}
            <path d={funnelPath} fill="rgba(255,255,255,0.05)" stroke="#94a3b8" strokeWidth="3" />

            {/* Liquids Group */}
            <g clipPath={`url(#${liquidClipPathId})`}>
                
                {/* Bottom Layer */}
                <rect 
                    x="0" 
                    y={bottomRectY + drainOffset} 
                    width={width} 
                    height={bottomRectH} 
                    fill={state === ExperimentState.MIXING ? '#86efac' : bottomFillColor} 
                    className={isAddingLiquid ? '' : "transition-all duration-1000 opacity-80"}
                />
                
                {/* Top Layer */}
                {state !== ExperimentState.SETUP && (
                    <rect 
                        x="0" 
                        y={(topRectY + drainOffset) - pourOffset} 
                        width={width} 
                        height={topRectH} 
                        fill={state === ExperimentState.MIXING ? '#86efac' : topFillColor}
                        className={isAddingLiquid ? '' : "transition-all duration-1000 opacity-80"}
                    />
                )}
            </g>

            {/* Particles Group */}
            <g clipPath={(isDraining || isPouring) ? undefined : `url(#${liquidClipPathId})`}>
                {particles.map((p) => {
                    let visualY = p.y;
                    
                    if (isDraining) {
                        visualY = p.y + drainOffset;
                    } else if (isPouring) {
                        visualY = p.y - pourOffset; 
                    } else if (isAddingLiquid) {
                        // Animate particle rising with Organic Phase
                        const progress = addReagentProgress / 100;
                        const organicStartH = 240;
                        const organicEndH = 140;
                        const organicStartY = 260;
                        const organicEndY = 120;
                        
                        // Relative position within the organic block (0 = top of block, 1 = bottom of block)
                        const relativePos = (p.y - 260) / 240; 
                        
                        // Current Block Params
                        const currentBlockY = organicStartY + (organicEndY - organicStartY) * progress;
                        const currentBlockH = organicStartH + (organicEndH - organicStartH) * progress;
                        
                        visualY = currentBlockY + (relativePos * currentBlockH);
                    }

                    // Opacity Logic for "Disappear then Reveal"
                    let opacity = 1;
                    if (isDraining) opacity = 0; // Hide during drain
                    else if (isPouring && visualY < 50) opacity = 0; // Hide if poured out
                    else opacity = 1;
                    
                    // Specific override for reveal animation
                    if (state === ExperimentState.SEPARATED) {
                        // They are 1, but we rely on transition from 0 (during drain) to 1 (now)
                    }

                    const transitionClass = getParticleTransitionClass(state);

                    return (
                        <circle
                            key={p.id}
                            cx={p.x}
                            cy={visualY}
                            r={4.5}
                            fill={getParticleColor(p.type)}
                            stroke="white"
                            strokeWidth="1"
                            className={transitionClass}
                            style={{ opacity }}
                        />
                    );
                })}
            </g>

            {/* Stopper (Glass) */}
            <g transform="translate(135, 20)" opacity={(isPouring || isAddingLiquid || isDissolving) ? 0 : 1} className="transition-opacity duration-500">
                <rect x="5" y="25" width="20" height="16" fill="url(#glassGradient)" stroke="#cbd5e1" rx="2" />
                <rect x="0" y="10" width="30" height="15" fill="url(#glassGradient)" stroke="#cbd5e1" rx="2" />
            </g>

            {/* Glass Container Front (Shine) */}
            <path d={funnelPath} fill="url(#glassGradient)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" pointerEvents="none" />

            {/* Phase Labels - Move with Liquid */}
            {showLayerLabels && (
                <g>
                    <text x="150" y={190 + drainOffset} textAnchor="middle" className={labelStyle}>{topLabel}</text>
                    <text x="150" y={330 + drainOffset} textAnchor="middle" className={labelStyle}>{bottomLabel}</text>
                </g>
            )}

            {state === ExperimentState.MIXING && (
                <text x="150" y="250" textAnchor="middle" className={labelStyle}>Emulsion</text>
            )}
            
            {/* Stopcock */}
            <g transform={`translate(150, 460) rotate(${state === ExperimentState.DRAINING ? 90 : 0})`} className="transition-transform duration-300 origin-center">
                <rect x="-16" y="-6" width="32" height="12" rx="2" fill="#f1f5f9" stroke="#cbd5e1" />
                <circle cx="0" cy="0" r="4" fill="#ef4444" opacity="0.8" /> 
                <rect x="-6" y="-18" width="12" height="36" rx="2" fill="#e2e8f0" stroke="#94a3b8" opacity={0.5} />
            </g>
        </g>

        {/* --- ADDING LIQUID ANIMATION (Beaker) --- */}
        {isAddingLiquid && (
            <g transform="translate(200, 20) rotate(-45)">
                 <path d="M 0 50 L -20 150" stroke={reagent === AqueousReagent.HCL || reagent === AqueousReagent.NAOH ? aqueousColor : organicColor} strokeWidth="8" strokeLinecap="round" className="animate-pulse" />
                 <rect x="-20" y="0" width="40" height="60" rx="4" fill="white" stroke="#94a3b8" strokeWidth="2" />
                 <rect x="-20" y="10" width="40" height="40" fill={reagent === AqueousReagent.HCL || reagent === AqueousReagent.NAOH ? aqueousColor : organicColor} opacity="0.6" />
                 <text x="0" y="35" textAnchor="middle" fontSize="10" fill="#64748b" transform="rotate(45)">{reagent === AqueousReagent.HCL ? 'HCl' : 'NaOH'}</text>
            </g>
        )}

        {/* --- POUR OUT STREAM --- */}
        {isPouring && (
            <>
             <path 
                d="M 20 180 Q 10 280 60 350" 
                stroke={topFillColor} 
                strokeWidth={pourVolume > 70 ? 0 : (pourVolume > 5 ? 6 : pourVolume)} 
                fill="none"
                opacity="0.8"
                className="transition-all duration-300"
             />
             <g transform="translate(30, 300)" className="animate-fade-in">
                 <path d={flaskPath} fill="none" stroke="#94a3b8" strokeWidth="2" />
                 <g clipPath="url(#flaskClip)">
                     <rect 
                        x="0" 
                        y={110 - pourVolume} 
                        width="100" 
                        height={110} 
                        fill={topFillColor} 
                        opacity="0.8" 
                     />
                 </g>
                 <path d={flaskPath} fill="url(#glassGradient)" stroke="rgba(255,255,255,0.5)" pointerEvents="none" />
                 <text x="50" y="130" textAnchor="middle" className="text-xs fill-slate-600 font-bold">Collection Flask</text>
             </g>
            </>
        )}

        {/* Drip Animation */}
        {state === ExperimentState.DRAINING && (
            <circle cx="150" cy="530" r="4" fill={bottomFill} className="animate-drip" />
        )}

        {/* --- ACTIVE BOTTOM COLLECTION FLASK --- */}
        {/* We keep this visible during SEPARATED (Show Reveal) to allow the particles to Fade In */}
        <g transform="translate(100, 530)" className={`transition-opacity duration-500`} style={{ opacity: (isPouring) ? 0.3 : 1 }}>
             <path d={flaskPath} fill="none" stroke="#94a3b8" strokeWidth="2" />
             <g clipPath="url(#flaskClip)">
                 <rect 
                    x="0" 
                    y={110 - (drainHeight)} 
                    width="100" 
                    height={110} 
                    fill={bottomFillColor} 
                    opacity="0.8" 
                    className="transition-all duration-75"
                 />
                 {/* Only render particles here if we are Draining OR Separated (Post-drain reveal) */}
                 {(state === ExperimentState.DRAINING || state === ExperimentState.SEPARATED) && (
                     <g>
                        {Array.from({ length: 5 }).map((_, i) => {
                           let pType = null;
                           
                           if (state === ExperimentState.DRAINING) {
                               if (activeDrainingParticles.length > 0) {
                                   pType = activeDrainingParticles[i % activeDrainingParticles.length].type;
                               }
                           } else if (state === ExperimentState.SEPARATED) {
                               // Use the last collected fraction to determine what is shown in the flask
                               const lastFraction = collectedFractions[collectedFractions.length - 1];
                               if (lastFraction) {
                                   pType = lastFraction.moleculeType;
                               }
                           }
                           
                           if (!pType) return null;
                             
                           return (
                           <circle 
                              key={`active-p-${i}`}
                              cx={25 + Math.random() * 50}
                              cy={60 + Math.random() * 40}
                              r={4}
                              fill={getParticleColor(pType)}
                              stroke="white"
                              strokeWidth="1"
                              // Opacity 0 during drain, 1 after (Separated)
                              opacity={state === ExperimentState.DRAINING || drainHeight < 20 ? 0 : 1}
                              className="transition-opacity duration-1000 ease-in"
                           />
                        )})}
                     </g>
                 )}
             </g>
             <path d={flaskPath} fill="url(#glassGradient)" stroke="rgba(255,255,255,0.5)" pointerEvents="none" />
        </g>

      </svg>
      
      {/* --- DYNAMIC LABELS (Post-Separation Reveal) --- */}
      {showReveal && labels.funnel && (
          <LabelOverlay x={170} y={180} text={labels.funnel} color="rgb(234, 179, 8)" /> // Yellowish for Organic
      )}
      {showReveal && labels.flask && (
          <LabelOverlay x={180} y={550} text={labels.flask} color="rgb(34, 197, 94)" /> // Greenish for Aqueous
      )}

      
      {/* Legend */}
      <div className="absolute top-4 right-0 bg-white/90 backdrop-blur p-3 rounded-lg border border-slate-200 shadow-sm text-xs text-slate-700 flex flex-col gap-2">
        <div className="font-bold text-slate-900 border-b pb-1 mb-1">Molecules</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 border border-white"></span> Benzoic Acid</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 border border-white"></span> p-Chloroaniline</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 border border-white"></span> Diphenyl</div>
      </div>
    </div>
  );
};
