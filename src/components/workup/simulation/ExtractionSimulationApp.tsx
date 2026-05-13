
import React, { useState, useEffect } from 'react';
import { FunnelSimulation } from './FunnelSimulation';
import { AITutor } from './AITutor';
import { StructurePanel } from './StructurePanel';
import { ExperimentState, Particle, SOLVENTS, Solvent, AqueousReagent, MoleculeType, CollectedFraction, SimulationLabels } from './types';

// Initial particle Setup
const INITIAL_COUNT = 15; // 5 of each type for clearer visualization

const generateParticles = (targetYStart: number, targetYEnd: number): Particle[] => {
    const particles: Particle[] = [];
    // Equal distribution initially
    for (let i = 0; i < INITIAL_COUNT; i++) {
        let type = MoleculeType.NEUTRAL;
        if (i < 5) type = MoleculeType.ACID;
        else if (i < 10) type = MoleculeType.BASE;
        
        particles.push({
            id: i,
            x: 130 + Math.random() * 40, // Start clumped in center
            y: 60, // Start at top neck for "dropping in"
            type
        });
    }
    return particles;
};

enum ExtractionStep {
    PREP_SOLVENT = 0,
    PREP_SOLUTE = 1,    // Add mixture
    PART_A_ADD_REAGENT = 2, // Add HCl
    PART_A_EXTRACT = 3, // Mix
    PART_A_DRAIN_LOWER = 4, // Drain Bottom Layer (Aqueous)
    
    PART_B_ADD_REAGENT = 5, // Add NaOH
    PART_B_EXTRACT = 6, // Mix
    PART_B_DRAIN_LOWER = 7, // Drain Bottom (Aqueous)
    
    PART_C_POUR = 8,    // Pour Neutral
    PART_C_FINAL = 9   // Finished
}

const ExtractionSimulationApp: React.FC = () => {
  const [step, setStep] = useState<ExtractionStep>(ExtractionStep.PREP_SOLVENT);
  const [state, setState] = useState<ExperimentState>(ExperimentState.SETUP);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [solvent, setSolvent] = useState<Solvent>(SOLVENTS[0]); // Default Ether
  const [reagent, setReagent] = useState<AqueousReagent>(AqueousReagent.WATER);
  const [collectedFractions, setCollectedFractions] = useState<CollectedFraction[]>([]);
  const [currentLabels, setCurrentLabels] = useState<SimulationLabels>({ funnel: null, flask: null });
  
  // Reset simulation specific vars
  const resetSim = () => {
      setStep(ExtractionStep.PREP_SOLVENT);
      setState(ExperimentState.SETUP);
      setParticles([]);
      setReagent(AqueousReagent.WATER);
      setCollectedFractions([]);
      setCurrentLabels({ funnel: null, flask: null });
  };

  const handleSolventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const s = SOLVENTS.find(s => s.name === e.target.value) || SOLVENTS[0];
      setSolvent(s);
  };

  // Step Logic
  const advanceStep = () => {
    setCurrentLabels({ funnel: null, flask: null }); // Clear labels on step change

    switch(step) {
        case ExtractionStep.PREP_SOLVENT:
            // User clicks "Add Mixture"
            // Spawn particles at top
            setStep(ExtractionStep.PREP_SOLUTE);
            setState(ExperimentState.ADDING_SOLUTE);
            
            const freshParticles = generateParticles(260, 500); // Target organic layer at bottom
            setParticles(freshParticles);
            
            // Trigger animation to dissolve
            setTimeout(() => {
                 // Move particles to dispersed positions in the bottom (Organic initially at bottom)
                 // Constraint: Funnel bottom rect is Y=260, H=240. 
                 // To stay well inside: Y range 300 to 450.
                 const dispersed = freshParticles.map(p => ({
                     ...p,
                     x: 110 + Math.random() * 80,
                     y: 300 + Math.random() * 150 
                 }));
                 setParticles(dispersed);
            }, 100);
            
            setTimeout(() => {
                setState(ExperimentState.SETUP); // Ready for next step
            }, 2000);
            break;

        case ExtractionStep.PREP_SOLUTE:
             // User clicks "Add HCl"
             setStep(ExtractionStep.PART_A_ADD_REAGENT);
             setReagent(AqueousReagent.HCL);
             setState(ExperimentState.ADDING_LIQUID);
             
             // Animate Liquid Addition & Phase Inversion
             // Organic moves UP from bottom (260-500) to top (120-260).
             setTimeout(() => {
                 const shiftedParticles = particles.map(p => {
                     // Interpolate from Bottom Range to Top Range
                     const relY = (p.y - 260) / 240;
                     return {
                         ...p,
                         x: 110 + Math.random() * 80,
                         y: 130 + relY * 120 
                     };
                 });
                 setParticles(shiftedParticles);
                 
                 setState(ExperimentState.ADD_REAGENT);
                 setStep(ExtractionStep.PART_A_EXTRACT);
             }, 2000);
             break;
            
        case ExtractionStep.PART_A_EXTRACT:
            setState(ExperimentState.MIXING);
            setTimeout(() => setState(ExperimentState.SETTLING), 2500);
            break;
            
        case ExtractionStep.PART_A_DRAIN_LOWER:
             setState(ExperimentState.DRAINING);
             setTimeout(() => {
                 // Ether: Bottom is Aqueous (Base - Target). Organic stays.
                 setCollectedFractions(prev => [...prev, {
                     id: 'A', label: 'Flask A (Base)', color: '#bfdbfe', volume: 50, contents: ['p-Chloroanilinium'], moleculeType: MoleculeType.BASE
                 }]);
                 
                 // Remove Base, and SHIFT remaining Organic particles "down" to bottom
                 // Because physically, when bottom layer drains, top layer drops to bottom.
                 setParticles(prev => prev
                    .filter(p => p.type !== MoleculeType.BASE)
                    .map(p => ({
                        ...p,
                        y: p.y + 140 // Visual shift to bottom
                    }))
                 );
                 
                 // Trigger Reveal Labels
                 setCurrentLabels({
                     funnel: "Acid + Neutral (Organic)",
                     flask: "Base Salt (Aqueous)"
                 });
                 
                 setStep(ExtractionStep.PART_B_ADD_REAGENT);
                 setState(ExperimentState.SEPARATED); 
             }, 3000);
             break;

        case ExtractionStep.PART_B_ADD_REAGENT:
             setReagent(AqueousReagent.NAOH);
             setState(ExperimentState.ADDING_LIQUID);
             
             // Same Animation logic as Part A: Organic moves UP
             setTimeout(() => {
                const shiftedParticles = particles.map(p => {
                     const relY = (p.y - 260) / 240; // Assuming they are at bottom now
                     return {
                         ...p,
                         x: 110 + Math.random() * 80,
                         y: 130 + relY * 120 
                     };
                 });
                setParticles(shiftedParticles);

                setState(ExperimentState.ADD_REAGENT);
                setStep(ExtractionStep.PART_B_EXTRACT);
             }, 2000);
             break;

        case ExtractionStep.PART_B_EXTRACT:
             setState(ExperimentState.MIXING);
             setTimeout(() => setState(ExperimentState.SETTLING), 2500);
             break;
             
        case ExtractionStep.PART_B_DRAIN_LOWER:
             setState(ExperimentState.DRAINING);
             setTimeout(() => {
                 // Ether: Bottom is Aqueous (Acid - Target).
                 setCollectedFractions(prev => [...prev, {
                     id: 'B', label: 'Flask B (Acid)', color: '#ddd6fe', volume: 50, contents: ['Benzoate'], moleculeType: MoleculeType.ACID
                 }]);
                 
                 // Remove Acid, shift Neutral down
                 setParticles(prev => prev
                    .filter(p => p.type !== MoleculeType.ACID)
                    .map(p => ({ ...p, y: p.y + 140 }))
                 );
                 
                 // Trigger Reveal Labels
                 setCurrentLabels({
                     funnel: "Neutral (Organic)",
                     flask: "Acid Salt (Aqueous)"
                 });

                 setStep(ExtractionStep.PART_C_POUR);
                 setState(ExperimentState.SEPARATED);
                 setReagent(AqueousReagent.WATER);
             }, 3000);
             break;

        case ExtractionStep.PART_C_POUR:
             setState(ExperimentState.POURING);
             setTimeout(() => {
                 setCollectedFractions(prev => [...prev, {
                    id: 'C', label: 'Flask C (Neutral)', color: solvent.color, volume: 50, contents: ['Diphenyl'], moleculeType: MoleculeType.NEUTRAL
                }]);
                setParticles([]);
                setStep(ExtractionStep.PART_C_FINAL);
                setState(ExperimentState.FINISHED);
             }, 3000);
             break;
    }
  };

  // Auto-enable "Next" logic
  const [canProceed, setCanProceed] = useState(false);
  useEffect(() => {
      if (state === ExperimentState.SEPARATED) setCanProceed(true);
      else if (state === ExperimentState.SETUP) setCanProceed(true);
      else setCanProceed(false);
      
      // Auto transition from Settling to Separated
      if (state === ExperimentState.SETTLING) {
          const t = setTimeout(() => setState(ExperimentState.SEPARATED), 4500);
          return () => clearTimeout(t);
      }
  }, [state]);

  // Helper to determine active molecule for Structure Panel
  let activeMolecule: MoleculeType | null = null;
  if (step >= ExtractionStep.PART_A_EXTRACT && step <= ExtractionStep.PART_A_DRAIN_LOWER) activeMolecule = MoleculeType.BASE;
  else if (step >= ExtractionStep.PART_B_EXTRACT && step <= ExtractionStep.PART_B_DRAIN_LOWER) activeMolecule = MoleculeType.ACID;
  else if (step >= ExtractionStep.PART_C_POUR) activeMolecule = MoleculeType.NEUTRAL;

  return (
    <div className="bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8 relative">
      <div className="p-6 md:p-8 flex flex-col">
        
        {/* Header */}
        <header className="mb-4 flex flex-wrap justify-between items-center shrink-0">
          <div>
             <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                ChemExtract: Virtual Lab
             </h1>
             <p className="text-slate-500 text-xs md:text-sm mt-1">
                Separation of Acidic, Basic, and Neutral Compounds
             </p>
          </div>
          
          {/* Control Panel */}
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 mt-2 md:mt-0">
              <div className="flex flex-col">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Organic Solvent</label>
                  <select 
                    value={solvent.name} 
                    onChange={handleSolventChange}
                    disabled={step !== ExtractionStep.PREP_SOLVENT}
                    className="text-sm font-semibold text-indigo-600 bg-transparent outline-none cursor-pointer max-w-[150px]"
                  >
                      {SOLVENTS.map(s => (
                          <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                  </select>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex flex-col text-right min-w-[100px]">
                   <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Density</span>
                   <span className="text-sm font-bold text-slate-700">{solvent.density} g/mL</span>
              </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
          
          {/* Left: Procedure Guide */}
          <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto h-full">
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
               <h2 className="font-bold text-base mb-3 flex items-center gap-2 text-slate-800">
                 <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center text-xs">Lab</span>
                 Procedure
               </h2>
               
               <div className="space-y-3">
                  {/* Step 1: Intro */}
                  <StepCard 
                    active={step === ExtractionStep.PREP_SOLVENT || step === ExtractionStep.PREP_SOLUTE}
                    completed={step > ExtractionStep.PREP_SOLUTE}
                    title="1. Preparation"
                    desc="Dissolve solid mixture in organic solvent."
                  >
                      {step === ExtractionStep.PREP_SOLVENT && (
                        <button onClick={advanceStep} className="mt-2 w-full py-2 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition">
                            Add Solid Mixture
                        </button>
                      )}
                      {step === ExtractionStep.PREP_SOLUTE && state === ExperimentState.SETUP && (
                        <button onClick={advanceStep} className="mt-2 w-full py-2 bg-emerald-600 text-white rounded-lg text-xs hover:bg-emerald-700 transition">
                            Start Part A: Add 5% HCl
                        </button>
                      )}
                  </StepCard>

                  {/* Step 2: Part A (Base) */}
                  <StepCard 
                    active={step >= ExtractionStep.PART_A_ADD_REAGENT && step <= ExtractionStep.PART_A_DRAIN_LOWER}
                    completed={step > ExtractionStep.PART_A_DRAIN_LOWER}
                    title="2. Isolate Base"
                    desc="Extract with acid. Drain bottom aqueous layer."
                  >
                      {step === ExtractionStep.PART_A_EXTRACT && state === ExperimentState.ADD_REAGENT && (
                          <button onClick={advanceStep} className="mt-2 w-full py-2 bg-amber-500 text-white rounded-lg text-xs hover:bg-amber-600 transition">
                              Shake & Mix
                          </button>
                      )}
                      
                      {step === ExtractionStep.PART_A_EXTRACT && state === ExperimentState.SEPARATED && (
                          <button onClick={() => setStep(ExtractionStep.PART_A_DRAIN_LOWER)} className="mt-2 w-full py-2 bg-emerald-600 text-white rounded-lg text-xs hover:bg-emerald-700 transition">
                              Ready to Drain Bottom Layer
                          </button>
                      )}

                      {step === ExtractionStep.PART_A_DRAIN_LOWER && (
                          <button onClick={advanceStep} className="mt-2 w-full py-2 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition">
                              Drain Bottom (Base) to Flask A
                          </button>
                      )}
                  </StepCard>

                   {/* Step 3: Part B (Acid) */}
                  <StepCard 
                    active={step >= ExtractionStep.PART_B_ADD_REAGENT && step <= ExtractionStep.PART_B_DRAIN_LOWER}
                    completed={step > ExtractionStep.PART_B_DRAIN_LOWER}
                    title="3. Isolate Acid"
                    desc="Add NaOH to extract Benzoic Acid."
                  >
                       {step === ExtractionStep.PART_B_ADD_REAGENT && state === ExperimentState.SEPARATED && (
                          <button onClick={advanceStep} className="mt-2 w-full py-2 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition">
                              Add 10% NaOH
                          </button>
                       )}
                       {step === ExtractionStep.PART_B_EXTRACT && state === ExperimentState.ADD_REAGENT && (
                          <button onClick={advanceStep} className="mt-2 w-full py-2 bg-amber-500 text-white rounded-lg text-xs hover:bg-amber-600 transition">
                              Shake & Mix
                          </button>
                      )}
                      {step === ExtractionStep.PART_B_EXTRACT && state === ExperimentState.SEPARATED && (
                          <button onClick={() => setStep(ExtractionStep.PART_B_DRAIN_LOWER)} className="mt-2 w-full py-2 bg-emerald-600 text-white rounded-lg text-xs hover:bg-emerald-700 transition">
                              Ready to Drain Bottom Layer
                          </button>
                      )}

                      {step === ExtractionStep.PART_B_DRAIN_LOWER && (
                          <button onClick={advanceStep} className="mt-2 w-full py-2 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition">
                              Drain Bottom (Acid) to Flask B
                          </button>
                      )}
                  </StepCard>

                  {/* Step 4: Part C (Neutral) */}
                  <StepCard 
                    active={step === ExtractionStep.PART_C_POUR || step === ExtractionStep.PART_C_FINAL}
                    completed={step === ExtractionStep.PART_C_FINAL}
                    title="4. Isolate Neutral"
                    desc="Pour remaining organic layer containing Diphenyl."
                  >
                      {step === ExtractionStep.PART_C_POUR && (
                           <button onClick={advanceStep} className="mt-2 w-full py-2 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition">
                              Pour from Top
                           </button>
                      )}
                      {step === ExtractionStep.PART_C_FINAL && (
                          <div className="mt-2 p-3 bg-green-50 text-green-800 rounded text-xs border border-green-200">
                              <strong>Success!</strong> Diphenyl Isolated.
                          </div>
                      )}
                  </StepCard>
               </div>
            </div>
          </div>

          {/* Middle: Simulation Canvas */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-100 to-slate-50 rounded-3xl border border-slate-200 shadow-inner relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
             
             <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded border border-slate-200 text-xs font-mono text-slate-500">
                 Density: {solvent.density} g/mL (Floats)
             </div>

             <FunnelSimulation 
                state={state} 
                particles={particles} 
                solvent={solvent}
                reagent={reagent}
                onParticlesUpdate={setParticles}
                collectedFractions={collectedFractions}
                labels={currentLabels}
             />
          </div>

           {/* Right: Structural View */}
           <div className="lg:col-span-3 flex flex-col h-full gap-4">
                <StructurePanel reagent={reagent} activeType={activeMolecule} />
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex-1 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Observations</h3>
                    <div className="text-sm text-slate-600 leading-relaxed">
                        {step === ExtractionStep.PREP_SOLVENT && "The funnel contains the organic solvent. Click to add the solid mixture."}
                        {step === ExtractionStep.PREP_SOLUTE && "The mixture dissolves in the organic solvent. All components are currently neutral."}
                        
                        {(step === ExtractionStep.PART_A_EXTRACT || step === ExtractionStep.PART_A_DRAIN_LOWER) && "Added HCl. The aqueous acid layer is denser and sinks to the bottom. p-Chloroaniline becomes the p-Chloroanilinium ion and migrates to this aqueous layer."}
                        
                        {(step === ExtractionStep.PART_B_EXTRACT || step === ExtractionStep.PART_B_DRAIN_LOWER) && "Added NaOH. The aqueous base layer sinks to the bottom. Benzoic Acid becomes Benzoate and migrates to this aqueous layer."}
                        
                        {step === ExtractionStep.PART_C_POUR && "Diphenyl remains in the organic layer (top). It is poured out from the top."}
                        {step === ExtractionStep.PART_C_FINAL && "Diphenyl has been isolated in the organic solvent."}
                    </div>
                </div>
           </div>

        </div>
      </div>

      <AITutor currentState={state} currentSolvent={solvent.name} currentReagent={reagent} />
    </div>
  );
};

// UI Components

const StepCard = ({ active, completed, title, desc, children }: any) => (
  <div className={`p-3 rounded-xl border transition-all duration-300
      ${active 
        ? 'bg-white border-indigo-500 ring-1 ring-indigo-500 shadow-md' 
        : 'bg-slate-50 border-slate-200 opacity-80'}
      ${completed ? 'opacity-60 bg-slate-50' : ''}
    `}
  >
    <div className="flex items-center justify-between mb-1">
       <h3 className={`font-semibold text-sm ${active ? 'text-indigo-700' : 'text-slate-700'}`}>{title}</h3>
       {completed && <span className="text-green-500 text-xs">✓</span>}
    </div>
    <p className="text-xs text-slate-500 leading-relaxed mb-1">{desc}</p>
    {children}
  </div>
);

export default ExtractionSimulationApp;
