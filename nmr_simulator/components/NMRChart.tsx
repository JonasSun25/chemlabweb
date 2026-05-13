import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceArea
} from 'recharts';
import { Molecule, PeakData } from '../types';
import { ZoomIn, RotateCcw, Search, ChevronLeft, ChevronRight, Hand, Plus, Minus } from 'lucide-react';

interface NMRChartProps {
  molecule: Molecule;
  nucleus: '1H' | '13C';
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

// Utility to generate Lorentzian/Gaussian shapes
const generateSpectrumData = (peaks: PeakData[], range: [number, number], nucleus: '1H' | '13C') => {
  const data = [];
  const min = Math.min(range[0], range[1]);
  const max = Math.max(range[0], range[1]);
  // Increase resolution for sharper splitting rendering
  const pointCount = 4000;
  const step = (max - min) / pointCount; 

  let maxIntensity = 0;

  for (let ppm = max; ppm >= min; ppm -= step) {
    let intensity = 0;
    intensity += Math.random() * 0.005; // Reduced noise for cleaner look

    peaks.forEach(peak => {
      // Sharper peaks (smaller width) to make splitting distinct matching the visual reference
      // 13C width reduced from 0.4 to 0.2 for sharper lines
      const width = nucleus === '1H' ? 0.005 : 0.2; 
      let subPeaks: number[] = [];
      let ratios: number[] = [];
      
      // Increased coupling constant for better visual separation of multiplets
      const jCoupling = nucleus === '1H' ? 0.032 : 0; 

      switch(peak.multiplicity) {
        case 's': subPeaks = [0]; ratios = [1]; break;
        case 'd': subPeaks = [-0.5, 0.5]; ratios = [1, 1]; break;
        case 't': subPeaks = [-1, 0, 1]; ratios = [1, 2, 1]; break;
        case 'q': subPeaks = [-1.5, -0.5, 0.5, 1.5]; ratios = [1, 3, 3, 1]; break;
        case 'dd': 
             // Doublet of Doublets: Two doublets (1:1) spaced out
             // Approx centers -1, +1. Subpeaks -1.5, -0.5 and 0.5, 1.5
             subPeaks = [-1.5, -0.5, 0.5, 1.5]; 
             ratios = [1, 1, 1, 1]; 
             break;
        case 'dt':
             // Doublet of Triplets: Large doublet split, each line is a triplet
             // Visual Ref: Two distinct triplets separated by a gap
             // Left triplet centered at -2.5, Right triplet centered at +2.5 (gap of 5 units)
             subPeaks = [-3.5, -2.5, -1.5, 1.5, 2.5, 3.5];
             ratios = [1, 2, 1, 1, 2, 1];
             break;
        case 'm': 
        default: 
             // Generic Multiplet (Quintet-like)
             subPeaks = [-2, -1, 0, 1, 2]; 
             ratios = [1, 2, 3, 2, 1]; 
             break;
      }

      // Normalize ratios so that total area corresponds to integration
      // Sum of Lorentzian area is proportional to sum of heights (since width is const)
      const totalRatio = ratios.reduce((sum, r) => sum + r, 0);

      // FIX: 13C usually has integration=0 in data, give it a default height so it appears
      let integrationVal = peak.integration;
      if (nucleus === '13C' && integrationVal === 0) integrationVal = 3;

      const normalizationFactor = totalRatio > 0 ? (integrationVal / totalRatio) : 1;

      subPeaks.forEach((offset, idx) => {
        const peakCenter = peak.ppm + (offset * jCoupling);
        // Scale factor: 1H = 10, 13C = 50 (to make C peaks tall and distinct lines)
        const height = normalizationFactor * ratios[idx] * (nucleus === '1H' ? 10 : 50); 
        // Lorentzian function
        const val = height / (1 + Math.pow((ppm - peakCenter) / width, 2));
        intensity += val;
      });
    });

    if (intensity > maxIntensity) maxIntensity = intensity;
    data.push({ ppm, intensity });
  }
  return { data, maxIntensity }; 
};

const NMRChart: React.FC<NMRChartProps> = ({ molecule, nucleus, hoveredId, setHoveredId, selectedId, setSelectedId }) => {
  const peaks = nucleus === '1H' ? molecule.peaks1H : molecule.peaks13C;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Default Domains
  const defaultDomain1H: [number, number] = [-1, 12];
  const defaultDomain13C: [number, number] = [-10, 220];
  const defaultDomain = nucleus === '1H' ? defaultDomain1H : defaultDomain13C;

  // View & Mode State
  const [xDomain, setXDomain] = useState<[number, number]>(defaultDomain);
  const [mode, setMode] = useState<'zoom' | 'pan'>('zoom');
  const [verticalScale, setVerticalScale] = useState<number>(1);

  // Zoom Selection State
  const [refAreaLeft, setRefAreaLeft] = useState<number | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<number | null>(null);

  // Pan Drag State
  const [isPanning, setIsPanning] = useState(false);
  const [panStartPPM, setPanStartPPM] = useState<number | null>(null);
  const [panStartDomain, setPanStartDomain] = useState<[number, number] | null>(null);

  // Reset when molecule/nucleus changes
  useEffect(() => {
    setXDomain(defaultDomain);
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setMode('zoom');
    setVerticalScale(1);
  }, [nucleus, molecule]);

  // Generate data
  const { data, maxIntensity } = useMemo(() => {
    const { data: rawData, maxIntensity: rawMax } = generateSpectrumData(peaks, xDomain, nucleus);
    return { 
        data: rawData.sort((a, b) => a.ppm - b.ppm), 
        maxIntensity: rawMax 
    };
  }, [peaks, nucleus, xDomain]);

  // --- Controls ---

  const zoom = () => {
    if (refAreaLeft === refAreaRight || refAreaLeft === null || refAreaRight === null) {
      setRefAreaLeft(null);
      setRefAreaRight(null);
      return;
    }
    let min = Math.min(refAreaLeft, refAreaRight);
    let max = Math.max(refAreaLeft, refAreaRight);
    if (Math.abs(max - min) < 0.1) {
       setRefAreaLeft(null);
       setRefAreaRight(null);
       return;
    }
    setXDomain([min, max]);
    setRefAreaLeft(null);
    setRefAreaRight(null);
  };

  const resetZoom = () => {
    setXDomain(defaultDomain);
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setVerticalScale(1);
  };

  // Horizontal Panning Steps
  const panStep = (direction: 'left' | 'right') => {
      const range = xDomain[1] - xDomain[0];
      const step = range * 0.15; // Shift by 15% of current view
      if (direction === 'left') {
          setXDomain([xDomain[0] + step, xDomain[1] + step]);
      } else {
          setXDomain([xDomain[0] - step, xDomain[1] - step]);
      }
  };

  const adjustVerticalScale = (factor: number) => {
      setVerticalScale(prev => Math.max(0.1, Math.min(50, prev * factor)));
  };

  // --- Mouse Handlers ---

  const handleMouseDown = (e: any) => {
      if (!e) return;
      if (mode === 'zoom') {
          setRefAreaLeft(e.activeLabel);
      } else if (mode === 'pan') {
          setIsPanning(true);
          setPanStartPPM(e.activeLabel);
          setPanStartDomain(xDomain);
      }
  };

  const handleMouseMove = (e: any) => {
      if (!e) return;
      
      if (mode === 'zoom' && refAreaLeft !== null) {
          setRefAreaRight(e.activeLabel);
      } 
      else if (mode === 'pan' && isPanning && panStartPPM !== null && panStartDomain !== null && e.activeLabel !== undefined) {
         // Placeholder for drag
      }
  };

  const handleMouseUp = () => {
      if (mode === 'zoom') {
          zoom();
      } else if (mode === 'pan') {
          setIsPanning(false);
          setPanStartPPM(null);
          setPanStartDomain(null);
      }
  };

  // Handle clicking on the chart background to deselect
  const handleBackgroundClick = (e: React.MouseEvent) => {
      // We rely on stopPropagation in the specific peak areas.
      // If this fires, it means we clicked empty space.
      if (mode === 'zoom' && refAreaLeft === null) {
          setSelectedId(null);
      }
  };

  return (
    <div 
        ref={containerRef}
        onClick={handleBackgroundClick}
        className={`w-full h-80 bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col relative select-none ${mode === 'pan' ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      
      {/* Chart Header & Controls */}
      <div className="flex justify-between items-center mb-2 z-10 relative">
         <div>
            <h3 className="text-lg font-bold text-slate-800">
                {nucleus === '1H' ? 'Proton NMR (1H)' : 'Carbon-13 NMR (13C)'}
            </h3>
            <div className="text-xs text-slate-500">
                Chemical Shift (δ ppm)
            </div>
         </div>
         
         <div className="flex items-center gap-2">
            {/* Tool Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 mr-2">
                <button
                    onClick={(e) => { e.stopPropagation(); setMode('zoom'); }}
                    title="Zoom Mode (Drag to Zoom)"
                    className={`p-1.5 rounded-md transition-all ${mode === 'zoom' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Search size={16} /> {/* Magnifying glass icon for Zoom */}
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); setMode('pan'); }}
                    title="Pan Mode (Drag to Move)"
                    className={`p-1.5 rounded-md transition-all ${mode === 'pan' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Hand size={16} /> {/* Hand icon for Pan */}
                </button>
            </div>

             {/* Vertical Scale Controls */}
             <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 mr-2">
                <button
                    onClick={(e) => { e.stopPropagation(); adjustVerticalScale(1.5); }}
                    title="Increase Vertical Amplitude"
                    className="p-1.5 rounded-md hover:bg-white text-slate-500 hover:text-blue-600 transition-all hover:shadow-sm"
                >
                    <Plus size={16} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); adjustVerticalScale(0.66); }}
                    title="Decrease Vertical Amplitude"
                    className="p-1.5 rounded-md hover:bg-white text-slate-500 hover:text-blue-600 transition-all hover:shadow-sm"
                >
                    <Minus size={16} />
                </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button 
                    onClick={(e) => { e.stopPropagation(); panStep('left'); }}
                    title="Move View Left"
                    className="p-1.5 hover:bg-white rounded-md text-slate-600 transition-all hover:text-blue-600 hover:shadow-sm"
                >
                    <ChevronLeft size={16} />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); panStep('right'); }}
                    title="Move View Right"
                    className="p-1.5 hover:bg-white rounded-md text-slate-600 transition-all hover:text-blue-600 hover:shadow-sm"
                >
                    <ChevronRight size={16} />
                </button>
                
                <div className="w-px h-4 bg-slate-300 mx-1"></div>
                
                <button 
                    onClick={(e) => { e.stopPropagation(); resetZoom(); }}
                    title="Reset View"
                    className="p-1.5 hover:bg-white rounded-md text-slate-600 transition-all hover:text-red-500 hover:shadow-sm flex items-center gap-1 text-xs font-semibold"
                >
                    <RotateCcw size={14} />
                    <span>Reset</span>
                </button>
            </div>
         </div>
      </div>

      <div className="flex-grow w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <XAxis 
                dataKey="ppm" 
                type="number" 
                domain={xDomain} 
                allowDataOverflow
                reversed={true}
                tick={{ fontSize: 12 }}
                tickCount={8}
                tickFormatter={(val: number) => val.toFixed(1)} 
            />
            
            {/* YAxis domain control for Vertical Zoom */}
            <YAxis 
                hide 
                domain={[0, (maxIntensity || 1) / verticalScale]} 
                allowDataOverflow={true}
            />
            
            <Line 
                type="monotone" 
                dataKey="intensity" 
                stroke="#b91c1c" 
                strokeWidth={1.5} 
                dot={false} 
                isAnimationActive={false} 
            />

            {/* Selection Box for Zoom */}
            {refAreaLeft !== null && refAreaRight !== null && mode === 'zoom' && (
              <ReferenceArea 
                x1={refAreaLeft} 
                x2={refAreaRight} 
                strokeOpacity={0.3} 
                fill="#3b82f6" 
                fillOpacity={0.1} 
              />
            )}

            {/* Interactive Areas for Peaks - No Labels */}
            {peaks.map((peak) => (
               <ReferenceArea
                 key={peak.id}
                 // Narrower detection width: 0.04 for Proton, 0.6 for Carbon (expanded from 0.4)
                 x1={peak.ppm + (nucleus === '1H' ? 0.04 : 0.6)}
                 x2={peak.ppm - (nucleus === '1H' ? 0.04 : 0.6)}
                 y1={0}
                 // Color logic: Selected (Amber-500) > Hovered (Yellow-300) > Transparent
                 fill={selectedId === peak.id ? "#f59e0b" : (hoveredId === peak.id ? "#fcd34d" : "transparent")}
                 fillOpacity={selectedId === peak.id ? 0.6 : 0.4}
                 onMouseEnter={() => setHoveredId(peak.id)}
                 onMouseLeave={() => setHoveredId(null)}
                 onClick={(e) => {
                     // Stop propagation so background click doesn't deselect immediately
                     if (e) e.stopPropagation();
                     setSelectedId(peak.id);
                 }}
                 className="cursor-pointer transition-colors"
               />
            ))}

          </LineChart>
        </ResponsiveContainer>
        
        {/* Overlay Hint */}
        {mode === 'zoom' && xDomain[1] - xDomain[0] > (defaultDomain[1] - defaultDomain[0]) * 0.9 && (
            <div className="absolute top-2 right-12 text-[10px] text-slate-400 pointer-events-none flex items-center gap-1 bg-white/50 rounded px-1">
                <Search size={10}/> Drag to zoom
            </div>
        )}
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-slate-400">
         TMS (0 ppm)
      </div>
    </div>
  );
};

export default NMRChart;