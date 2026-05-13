
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SimulationState, CompoundType, Particle, LabAssistantMessage, Fraction } from './types';
import { ChromatographyColumn } from './components/ChromatographyColumn';
import { FractionCollector } from './components/FractionCollector';
import { SilicaStructure, PolarMolecule, NonPolarMolecule } from './components/ChemicalStructures';
import { askLabAssistant } from './services/geminiService';
import { Play, Pause, RotateCcw, FlaskConical, Info, Send, Loader2, Droplets } from 'lucide-react';

// Constants
const PARTICLE_COUNT = 60; // Total particles
const TUBE_VOLUME_MAX = 100; // Max volume per test tube
// Increased flow rate to ensure tubes fill up faster, creating better resolution between bands
const SOLVENT_RATE = 0.8; 

const App: React.FC = () => {
  // --- State ---
  const [simState, setSimState] = useState<SimulationState>(SimulationState.IDLE);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [solventPolarity, setSolventPolarity] = useState<number>(0.5); // 0 = Non-polar, 1 = Polar
  
  // Fraction Collection State
  const [currentFraction, setCurrentFraction] = useState({ countA: 0, countB: 0, total: 0, volume: 0 });
  const [fractions, setFractions] = useState<Fraction[]>([]);
  const postElutionCountRef = useRef(0); // Track empty tubes after completion
  
  // Chat State
  const [chatMessages, setChatMessages] = useState<LabAssistantMessage[]>([
    { role: 'model', text: "Welcome to the lab! I'm your AI assistant. I can explain what's happening in the column. Try starting the simulation!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Animation Ref
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);

  // --- Logic ---

  // Initialize Particles
  const initializeParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isTypeA = i < PARTICLE_COUNT / 2; // 50/50 split
      newParticles.push({
        id: i,
        type: isTypeA ? CompoundType.A : CompoundType.B,
        y: 5 + Math.random() * 5, // Start at top (5-10%)
        x: 20 + Math.random() * 60, // Random width position (20-80%)
        speed: 0,
        visible: true,
        collected: false
      });
    }
    setParticles(newParticles);
    setCurrentFraction({ countA: 0, countB: 0, total: 0, volume: 0 });
    setFractions([]);
    postElutionCountRef.current = 0;
  }, []);

  // Step Handlers
  const handlePackColumn = () => {
    setSimState(SimulationState.PACKING);
    setTimeout(() => setSimState(SimulationState.READY), 2000);
  };

  const handleLoadSample = () => {
    initializeParticles();
    setSimState(SimulationState.LOADING);
  };

  const handleStartElution = () => {
    setSimState(SimulationState.ELUTING);
    previousTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(animate);
  };

  const handlePause = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    setSimState(SimulationState.LOADING); // Treat pause as returning to loaded state
  };

  const handleReset = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    setSimState(SimulationState.IDLE);
    setParticles([]);
    setCurrentFraction({ countA: 0, countB: 0, total: 0, volume: 0 });
    setFractions([]);
    postElutionCountRef.current = 0;
  };

  // Tube Swapping Logic
  const triggerTubeSwap = () => {
    setSimState(SimulationState.SWAPPING);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);

    // 1. Check if all particles are collected (specifically checking if B is done)
    const allCollected = particles.length > 0 && particles.every(p => p.collected);
    const hasPolarInTube = currentFraction.countB > 0;

    // 2. Logic for stopping: 
    // If everything is collected, and this tube was just a solvent wash (no polar compound),
    // increment the counter. We want 2 empty tubes after the last polar compound tube.
    if (allCollected && !hasPolarInTube) {
        postElutionCountRef.current += 1;
    } else if (hasPolarInTube) {
        // If we saw polar compound, reset the empty tube counter
        postElutionCountRef.current = 0;
    }

    // Add current to history
    setFractions(prev => [
      ...prev, 
      { 
        id: prev.length, 
        countA: currentFraction.countA, 
        countB: currentFraction.countB,
        total: currentFraction.total,
        volume: currentFraction.volume
      }
    ]);

    // Delay to allow animation to play before resetting current and resuming
    setTimeout(() => {
      // Check if we have collected our 2 extra tubes
      if (postElutionCountRef.current >= 2) {
          setSimState(SimulationState.FINISHED);
          setCurrentFraction({ countA: 0, countB: 0, total: 0, volume: 0 });
      } else {
          // Continue Simulation
          setCurrentFraction({ countA: 0, countB: 0, total: 0, volume: 0 });
          setSimState(SimulationState.ELUTING);
          previousTimeRef.current = performance.now();
          requestRef.current = requestAnimationFrame(animate);
      }
    }, 1500); // 1.5s swap animation
  };

  // Animation Loop
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      
      setParticles(prevParticles => {
        let newA = 0;
        let newB = 0;

        const nextParticles = prevParticles.map(p => {
          if (p.collected) return p;

          // Physics Logic
          let moveSpeed = 0;
          if (p.type === CompoundType.A) {
              // Non-polar: Fast
              // Increased base speed slightly to separate from B
              moveSpeed = 0.4 + (solventPolarity * 0.15) + (Math.random() * 0.05);
          } else {
              // Polar: Slow (adsorbed to silica)
              // Reduced base speed to ensure a gap appears between A and B
              moveSpeed = (solventPolarity * 0.3) + (Math.random() * 0.02);
          }

          let newY = p.y + moveSpeed;

          // Random X wobble (diffusion)
          let newX = p.x + (Math.random() - 0.5) * 2;
          if (newX < 10) newX = 10;
          if (newX > 90) newX = 90;

          // Check Collection
          let isCollected = p.collected;
          if (newY >= 100) {
             newY = 100;
             isCollected = true;
             if (p.type === CompoundType.A) newA++;
             else newB++;
          }

          return {
            ...p,
            y: newY,
            x: newX,
            collected: isCollected
          };
        });

        // Update collected counts and VOLUME for CURRENT TUBE
        setCurrentFraction(prev => {
            const nextTotal = prev.total + newA + newB;
            // Increment volume constantly if eluting (solvent flow)
            const nextVolume = Math.min(prev.volume + SOLVENT_RATE, TUBE_VOLUME_MAX + 1);
            
            return {
                countA: prev.countA + newA,
                countB: prev.countB + newB,
                total: nextTotal,
                volume: nextVolume
            };
        });
        
        return nextParticles;
      });
    }
    
    previousTimeRef.current = time;
    
    // Continue loop
    if (simState === SimulationState.ELUTING) {
       requestRef.current = requestAnimationFrame(animate);
    }
  };

  // Effect to monitor tube capacity (Volume based)
  useEffect(() => {
      if (currentFraction.volume >= TUBE_VOLUME_MAX && simState === SimulationState.ELUTING) {
          triggerTubeSwap();
      }
  }, [currentFraction.volume, simState]);

  // Manage Animation Frame Effect
  useEffect(() => {
    if (simState === SimulationState.ELUTING) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [simState, solventPolarity]); 

  // AI Handler
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg: LabAssistantMessage = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsChatLoading(true);

    const responseText = await askLabAssistant(userMsg.text, simState, solventPolarity);
    
    setChatMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsChatLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white shadow-blue-200">
            <FlaskConical size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ChromaLab</h1>
            <p className="text-xs text-gray-500">Interactive Column Chromatography Simulator</p>
          </div>
        </div>
        <div className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full border border-gray-200 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${simState === SimulationState.ELUTING ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            Status: <span className="text-blue-600">{simState}</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Panel: Visualizer */}
        <div className="flex-grow lg:w-3/5 p-4 lg:p-8 flex flex-col bg-slate-100 relative overflow-y-auto">
           
           {/* Background Grid */}
           <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

           <div className="relative z-10 flex flex-col items-center justify-start pt-4 flex-grow min-h-[600px]">
              
              <ChromatographyColumn 
                  particles={particles} 
                  simState={simState} 
                  solventLevel={simState === SimulationState.ELUTING || simState === SimulationState.SWAPPING ? 80 : 0}
                  solventPolarity={solventPolarity}
              />
              
              {/* Fraction Collector */}
              <FractionCollector 
                  currentFraction={currentFraction} 
                  fractions={fractions} 
                  isSwapping={simState === SimulationState.SWAPPING}
              />

           </div>

           {/* Legend & Structure Panel */}
           <div className="absolute top-4 left-4 flex flex-col gap-2 max-w-[240px]">
              <div className="bg-white/90 backdrop-blur p-3 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-xs text-gray-700 mb-2 uppercase tracking-wide">Molecular Legend</h3>
                  <div className="space-y-2">
                      <SilicaStructure />
                      <PolarMolecule />
                      <NonPolarMolecule />
                  </div>
              </div>
           </div>
        </div>

        {/* Right Panel: Controls & Chat */}
        <div className="lg:w-2/5 bg-white border-l border-gray-200 flex flex-col h-[50vh] lg:h-auto overflow-y-auto shadow-xl z-20">
            
            {/* Controls Section */}
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                    <Info size={18} /> Lab Controls
                </h2>
                
                <div className="space-y-6">
                    {/* Polarity Slider */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between mb-3 items-center">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Droplets size={14} className="text-blue-500"/> Solvent Composition
                            </label>
                            <span className="text-xs font-mono bg-white border border-gray-200 px-2 py-1 rounded shadow-sm flex items-center gap-1">
                                {solventPolarity === 0 ? 'Pure Hexane' : solventPolarity === 1 ? 'Pure EtOAc' : `${Math.round(solventPolarity * 100)}% Polar`}
                            </span>
                        </div>
                        
                        <div className="relative h-2 bg-gradient-to-r from-yellow-100 to-blue-100 rounded-lg">
                             <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.1" 
                                value={solventPolarity}
                                onChange={(e) => setSolventPolarity(parseFloat(e.target.value))}
                                disabled={simState === SimulationState.ELUTING || simState === SimulationState.SWAPPING}
                                className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer z-20"
                            />
                            <div 
                                className="absolute top-0 bottom-0 w-4 h-4 bg-blue-600 rounded-full shadow border-2 border-white -mt-1 transition-all pointer-events-none"
                                style={{ left: `calc(${solventPolarity * 100}% - 8px)` }}
                            >
                                 {/* Mixing Spinner if not collecting */}
                                 {simState !== SimulationState.ELUTING && simState !== SimulationState.SWAPPING && (
                                     <div className="absolute -top-6 -left-2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Adjust
                                     </div>
                                 )}
                            </div>
                        </div>

                        <div className="flex justify-between mt-2 text-[10px] text-gray-500 uppercase font-medium">
                            <span>Non-Polar (Yellow)</span>
                            <span>Polar (Blue)</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        {simState === SimulationState.IDLE && (
                            <button onClick={handlePackColumn} className="col-span-2 bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-900 transition font-medium shadow-lg shadow-slate-200">
                                1. Pack Column with Silica
                            </button>
                        )}
                        {simState === SimulationState.READY && (
                            <button onClick={handleLoadSample} className="col-span-2 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition font-medium shadow-lg shadow-purple-200">
                                2. Load Mixture Sample
                            </button>
                        )}
                         {simState === SimulationState.LOADING && (
                            <button onClick={handleStartElution} className="col-span-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-200">
                                <Play size={18} /> Start Elution
                            </button>
                        )}
                        {(simState === SimulationState.ELUTING || simState === SimulationState.SWAPPING) && (
                             <button onClick={handlePause} className="col-span-2 bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition font-medium flex items-center justify-center gap-2 shadow-lg shadow-yellow-200">
                                <Pause size={18} /> Pause
                            </button>
                        )}
                        {simState === SimulationState.FINISHED && (
                            <div className="col-span-2 text-center p-4 bg-green-50 text-green-800 rounded-xl border border-green-100">
                                <p className="font-bold">Separation Complete!</p>
                                <p className="text-sm mt-1">Collected {fractions.length} fractions.</p>
                            </div>
                        )}
                        
                        <button onClick={handleReset} className="col-span-2 border border-gray-300 text-gray-700 py-2.5 rounded-xl hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2 mt-2">
                            <RotateCcw size={16} /> Reset Experiment
                        </button>
                    </div>
                </div>
            </div>

            {/* Chat/Assistant Section */}
            <div className="flex-grow flex flex-col min-h-[300px] bg-gray-50">
                <div className="p-4 bg-white border-y border-gray-200 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">AI Professor</h3>
                </div>
                
                <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-slate-50/50">
                    {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-sm' 
                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isChatLoading && (
                         <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-sm flex items-center gap-2 text-sm text-gray-500 shadow-sm">
                                <Loader2 size={16} className="animate-spin text-blue-500" /> 
                                <span className="text-xs font-medium">Analyzing structures...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-2">
                        <input 
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask about stationary phase..."
                            className="flex-grow px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={!chatInput.trim() || isChatLoading}
                            className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-blue-100"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    {simState === SimulationState.IDLE && (
                         <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            <button onClick={() => setChatInput("Explain the Silica structure diagram.")} className="whitespace-nowrap px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-600 transition-colors">
                                Explain Silica
                            </button>
                            <button onClick={() => setChatInput("Why do fractions need to be swapped?")} className="whitespace-nowrap px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-600 transition-colors">
                                Why swap tubes?
                            </button>
                         </div>
                    )}
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

export default App;
