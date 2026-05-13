import React from 'react';

export const SilicaStructure = () => (
  <div className="flex flex-col items-center p-2 bg-white rounded border border-gray-200">
    <div className="text-xs font-bold text-gray-500 mb-1">Stationary Phase (Silica)</div>
    <svg width="120" height="60" viewBox="0 0 120 60" className="opacity-80">
      {/* Silica Surface */}
      <path d="M10,50 L110,50" stroke="#94a3b8" strokeWidth="2" />
      <path d="M10,50 L10,60 M35,50 L35,60 M60,50 L60,60 M85,50 L85,60 M110,50 L110,60" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Si-OH Groups */}
      <g transform="translate(20, 30)">
        <circle cx="0" cy="10" r="4" fill="#94a3b8" /> {/* Si */}
        <line x1="0" y1="10" x2="0" y2="0" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="0" cy="-4" r="4" fill="#ef4444" /> {/* O */}
        <circle cx="5" cy="-8" r="2" fill="#fff" stroke="#94a3b8" /> {/* H */}
        <text x="-15" y="0" fontSize="8" fill="#64748b">OH</text>
      </g>
      <g transform="translate(60, 30)">
        <circle cx="0" cy="10" r="4" fill="#94a3b8" />
        <line x1="0" y1="10" x2="0" y2="0" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="0" cy="-4" r="4" fill="#ef4444" />
        <circle cx="5" cy="-8" r="2" fill="#fff" stroke="#94a3b8" />
         <text x="-15" y="0" fontSize="8" fill="#64748b">OH</text>
      </g>
       <g transform="translate(100, 30)">
        <circle cx="0" cy="10" r="4" fill="#94a3b8" />
        <line x1="0" y1="10" x2="0" y2="0" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="0" cy="-4" r="4" fill="#ef4444" />
        <circle cx="5" cy="-8" r="2" fill="#fff" stroke="#94a3b8" />
         <text x="-15" y="0" fontSize="8" fill="#64748b">OH</text>
      </g>
    </svg>
    <div className="text-[10px] text-center text-gray-400 mt-1">High Polarity (Many -OH groups)</div>
  </div>
);

export const PolarMolecule = () => (
  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded border border-blue-100">
    <svg width="40" height="40" viewBox="0 0 40 40">
       {/* Generic Polar Molecule */}
       <circle cx="20" cy="20" r="12" fill="#3B82F6" opacity="0.8" />
       {/* OH group sticking out */}
       <circle cx="30" cy="12" r="5" fill="#ef4444" />
       <circle cx="34" cy="9" r="2.5" fill="white" />
    </svg>
    <div>
        <div className="text-xs font-bold text-blue-800">Compound B (Polar)</div>
        <div className="text-[10px] text-blue-600 leading-tight">Has polar groups.<br/>Attracted to Silica.<br/>"Sticks" & moves slow.</div>
    </div>
  </div>
);

export const NonPolarMolecule = () => (
  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-100">
    <svg width="40" height="40" viewBox="0 0 40 40">
       {/* Benzene Ring approximation */}
       <path d="M20,8 L30,14 L30,26 L20,32 L10,26 L10,14 Z" fill="#FACC15" stroke="#ca8a04" strokeWidth="2" opacity="0.8" />
       <circle cx="20" cy="20" r="4" fill="none" stroke="#ca8a04" strokeWidth="1" />
    </svg>
    <div>
        <div className="text-xs font-bold text-yellow-800">Compound A (Non-Polar)</div>
        <div className="text-[10px] text-yellow-700 leading-tight">Hydrocarbon only.<br/>No attraction to Silica.<br/>Flows fast.</div>
    </div>
  </div>
);