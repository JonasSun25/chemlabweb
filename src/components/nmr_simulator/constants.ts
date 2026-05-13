import { Molecule } from './types';

export const MOLECULES: Molecule[] = [
  {
    id: 'ethyl_acetate',
    name: 'Ethyl Acetate',
    formula: 'CH₃COOCH₂CH₃',
    structureImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/fa/Ethyl_acetate_structural_formula_v.1.svg/320px-Ethyl_acetate_structural_formula_v.1.svg.png',
    atoms: [
      // Left Methyl Group (Acetate) - Red Hydrogens
      { id: 'h_acetate_1', label: 'H', x: 20, y: 70, type: 'H', groupColor: 'bg-red-100', textColor: '#FF0000' },
      { id: 'h_acetate_2', label: 'H', x: 20, y: 110, type: 'H', groupColor: 'bg-red-100', textColor: '#FF0000' },
      { id: 'h_acetate_3', label: 'H', x: 50, y: 130, type: 'H', groupColor: 'bg-red-100', textColor: '#FF0000' },
      { id: 'c_acetate', label: 'C', x: 50, y: 90, type: 'C', groupColor: 'bg-slate-100' },
      
      // Carbonyl Group
      { id: 'c_carbonyl', label: 'C', x: 90, y: 70, type: 'C', groupColor: 'bg-slate-100' },
      { id: 'o_carbonyl', label: 'O', x: 90, y: 30, type: 'O', groupColor: 'bg-slate-100' },
      
      // Ester Oxygen
      { id: 'o_ester', label: 'O', x: 120, y: 90, type: 'O', groupColor: 'bg-slate-100' },

      // Methylene Group (-CH2-) - Blue Hydrogens
      { id: 'c_methylene', label: 'C', x: 160, y: 70, type: 'C', groupColor: 'bg-blue-50' },
      { id: 'h_methylene_1', label: 'H', x: 150, y: 30, type: 'H', groupColor: 'bg-blue-100', textColor: '#0000FF' },
      { id: 'h_methylene_2', label: 'H', x: 180, y: 30, type: 'H', groupColor: 'bg-blue-100', textColor: '#0000FF' },
      
      // Terminal Methyl Group (-CH3) - Magenta Hydrogens
      { id: 'c_methyl_t', label: 'C', x: 200, y: 90, type: 'C', groupColor: 'bg-fuchsia-50' },
      { id: 'h_methyl_t1', label: 'H', x: 230, y: 70, type: 'H', groupColor: 'bg-fuchsia-100', textColor: '#FF00FF' },
      { id: 'h_methyl_t2', label: 'H', x: 230, y: 110, type: 'H', groupColor: 'bg-fuchsia-100', textColor: '#FF00FF' },
      { id: 'h_methyl_t3', label: 'H', x: 200, y: 130, type: 'H', groupColor: 'bg-fuchsia-100', textColor: '#FF00FF' },

    ],
    bonds: [
      // Acetate Methyl to Carbonyl
      { from: 'c_acetate', to: 'c_carbonyl', type: 'single' },
      { from: 'c_acetate', to: 'h_acetate_1', type: 'single' },
      { from: 'c_acetate', to: 'h_acetate_2', type: 'single' },
      { from: 'c_acetate', to: 'h_acetate_3', type: 'single' },
      
      // Carbonyl
      { from: 'c_carbonyl', to: 'o_carbonyl', type: 'double' },
      { from: 'c_carbonyl', to: 'o_ester', type: 'single' },
      
      // Ester Link to Ethyl
      { from: 'o_ester', to: 'c_methylene', type: 'single' },
      
      // Methylene
      { from: 'c_methylene', to: 'c_methyl_t', type: 'single' },
      { from: 'c_methylene', to: 'h_methylene_1', type: 'single' },
      { from: 'c_methylene', to: 'h_methylene_2', type: 'single' },
      
      // Terminal Methyl
      { from: 'c_methyl_t', to: 'h_methyl_t1', type: 'single' },
      { from: 'c_methyl_t', to: 'h_methyl_t2', type: 'single' },
      { from: 'c_methyl_t', to: 'h_methyl_t3', type: 'single' },
    ],
    peaks1H: [
      { 
        id: 'h_methylene_1', 
        ppm: 4.12, 
        multiplicity: 'q', 
        integration: 2, 
        assignment: '-O-CH₂- (Deshielded)',
        analysis: {
            inductive: 'Attached directly to the highly electronegative Oxygen atom (-O-). The strong electron-withdrawing inductive effect reduces electron density, causing significant deshielding.',
        }
      },
      { 
        id: 'h_methylene_2', 
        ppm: 4.12, 
        multiplicity: 'q', 
        integration: 2, 
        assignment: '-O-CH₂- (Deshielded)',
        analysis: {
            inductive: 'Attached directly to the highly electronegative Oxygen atom (-O-). The strong electron-withdrawing inductive effect reduces electron density, causing significant deshielding.',
        }
      },
      { 
        id: 'h_acetate_1', 
        ppm: 2.03, 
        multiplicity: 's', 
        integration: 3, 
        assignment: 'CH₃-C=O (Acetate)',
        analysis: {
            anisotropy: 'Adjacent to the carbonyl (C=O) π-system. The magnetic anisotropy of the carbonyl group creates a deshielding zone affecting this methyl group, shifting it downfield (~2.0 ppm).',
            inductive: 'The carbonyl carbon is moderately electron-withdrawing, contributing slightly to deshielding.'
        }
      },
      { 
        id: 'h_acetate_2', 
        ppm: 2.03, 
        multiplicity: 's', 
        integration: 3, 
        assignment: 'CH₃-C=O (Acetate)',
        analysis: {
            anisotropy: 'Adjacent to the carbonyl (C=O) π-system. The magnetic anisotropy of the carbonyl group creates a deshielding zone affecting this methyl group, shifting it downfield (~2.0 ppm).',
        }
      },
      { 
        id: 'h_acetate_3', 
        ppm: 2.03, 
        multiplicity: 's', 
        integration: 3, 
        assignment: 'CH₃-C=O (Acetate)',
        analysis: {
            anisotropy: 'Adjacent to the carbonyl (C=O) π-system. The magnetic anisotropy of the carbonyl group creates a deshielding zone affecting this methyl group, shifting it downfield (~2.0 ppm).',
        }
      },
      { 
        id: 'h_methyl_t1', 
        ppm: 1.15, 
        multiplicity: 't', 
        integration: 3, 
        assignment: '-CH₂-CH₃ (Terminal)',
        analysis: {
            inductive: 'Far from electronegative groups. Minimal inductive effect, resulting in a typical high-field alkyl chemical shift.'
        }
      },
      { id: 'h_methyl_t2', ppm: 1.15, multiplicity: 't', integration: 3, assignment: '-CH₂-CH₃ (Terminal)', analysis: { inductive: 'Far from electronegative groups. Minimal inductive effect, resulting in a typical high-field alkyl chemical shift.' } },
      { id: 'h_methyl_t3', ppm: 1.15, multiplicity: 't', integration: 3, assignment: '-CH₂-CH₃ (Terminal)', analysis: { inductive: 'Far from electronegative groups. Minimal inductive effect, resulting in a typical high-field alkyl chemical shift.' } },
    ],
    peaks13C: [
      { id: 'c_carbonyl', ppm: 170.74, multiplicity: 's', integration: 0, assignment: 'C=O (Carbonyl)' },
      { id: 'c_methylene', ppm: 60.64, multiplicity: 's', integration: 0, assignment: '-O-CH₂-' },
      { id: 'c_acetate', ppm: 20.97, multiplicity: 's', integration: 0, assignment: 'CH₃-C=O' },
      { id: 'c_methyl_t', ppm: 14.35, multiplicity: 's', integration: 0, assignment: '-CH₂-CH₃' },
    ]
  },
  {
    id: 'dmaca',
    name: '(E)-4-(Dimethylamino)cinnamyl Acetate',
    formula: 'C₁₃H₁₇NO₂',
    structureImage: 'https://placehold.co/600x300/white/0f172a?text=(E)-4-(Dimethylamino)cinnamyl+Acetate+Structure&font=merriweather',
    atoms: [
        // --- N-Dimethyl Group (Simplified) ---
        { id: 'n_amine', label: 'N', x: 40, y: 75, type: 'N', groupColor: 'bg-indigo-50' },
        
        // Simplified CH3 groups
        { id: 'g_n_me1', label: 'CH₃', x: 10, y: 55, type: 'C', groupColor: 'bg-indigo-50' }, // Top-ish Left
        { id: 'g_n_me2', label: 'CH₃', x: 10, y: 95, type: 'C', groupColor: 'bg-indigo-50' }, // Bottom-ish Left

        // --- Benzene Ring ---
        { id: 'c_ar_4', label: 'C', x: 55, y: 75, type: 'C', groupColor: 'bg-slate-50' },
        
        { id: 'c_ar_3', label: 'C', x: 65, y: 55, type: 'C', groupColor: 'bg-green-50' }, // Ortho to N
        { id: 'h_ar_3', label: 'H', x: 60, y: 40, type: 'H', groupColor: 'bg-green-100', textColor: '#16a34a' },
        
        { id: 'c_ar_5', label: 'C', x: 65, y: 95, type: 'C', groupColor: 'bg-green-50' }, // Ortho to N
        { id: 'h_ar_5', label: 'H', x: 60, y: 110, type: 'H', groupColor: 'bg-green-100', textColor: '#16a34a' },

        { id: 'c_ar_2', label: 'C', x: 85, y: 55, type: 'C', groupColor: 'bg-orange-50' }, // Meta to N
        { id: 'h_ar_2', label: 'H', x: 90, y: 40, type: 'H', groupColor: 'bg-orange-100', textColor: '#ea580c' },

        { id: 'c_ar_6', label: 'C', x: 85, y: 95, type: 'C', groupColor: 'bg-orange-50' }, // Meta to N
        { id: 'h_ar_6', label: 'H', x: 90, y: 110, type: 'H', groupColor: 'bg-orange-100', textColor: '#ea580c' },

        { id: 'c_ar_1', label: 'C', x: 95, y: 75, type: 'C', groupColor: 'bg-slate-50' },

        // --- Alkene Chain ---
        { id: 'c_alk_a', label: 'C', x: 115, y: 90, type: 'C', groupColor: 'bg-cyan-50' },
        { id: 'h_alk_a', label: 'H', x: 115, y: 110, type: 'H', groupColor: 'bg-cyan-100', textColor: '#0891b2' },

        { id: 'c_alk_b', label: 'C', x: 135, y: 65, type: 'C', groupColor: 'bg-teal-50' },
        { id: 'h_alk_b', label: 'H', x: 135, y: 45, type: 'H', groupColor: 'bg-teal-100', textColor: '#0d9488' },

        // --- Allylic CH2 ---
        { id: 'c_ch2', label: 'C', x: 155, y: 80, type: 'C', groupColor: 'bg-sky-50' },
        { id: 'h_ch2_a', label: 'H', x: 150, y: 100, type: 'H', groupColor: 'bg-sky-100', textColor: '#0284c7' },
        { id: 'h_ch2_b', label: 'H', x: 160, y: 100, type: 'H', groupColor: 'bg-sky-100', textColor: '#0284c7' },

        // --- Ester Group ---
        { id: 'o_ester', label: 'O', x: 175, y: 70, type: 'O', groupColor: 'bg-slate-50' },
        
        { id: 'c_carbonyl', label: 'C', x: 195, y: 80, type: 'C', groupColor: 'bg-slate-50' },
        { id: 'o_carbonyl', label: 'O', x: 195, y: 100, type: 'O', groupColor: 'bg-slate-50' },

        // Simplified Acetate Methyl
        { id: 'g_ac_me', label: 'CH₃', x: 225, y: 75, type: 'C', groupColor: 'bg-rose-50' },
    ],
    bonds: [
        // N-Me2 (Simplified)
        { from: 'n_amine', to: 'g_n_me1', type: 'single' },
        { from: 'n_amine', to: 'g_n_me2', type: 'single' },
        
        // Benzene
        { from: 'n_amine', to: 'c_ar_4', type: 'single' },
        { from: 'c_ar_4', to: 'c_ar_3', type: 'double' }, { from: 'c_ar_3', to: 'h_ar_3', type: 'single' },
        { from: 'c_ar_4', to: 'c_ar_5', type: 'single' }, { from: 'c_ar_5', to: 'h_ar_5', type: 'single' },
        { from: 'c_ar_3', to: 'c_ar_2', type: 'single' }, { from: 'c_ar_2', to: 'h_ar_2', type: 'single' },
        { from: 'c_ar_5', to: 'c_ar_6', type: 'double' }, { from: 'c_ar_6', to: 'h_ar_6', type: 'single' },
        { from: 'c_ar_2', to: 'c_ar_1', type: 'double' },
        { from: 'c_ar_6', to: 'c_ar_1', type: 'single' },

        // Chain
        { from: 'c_ar_1', to: 'c_alk_a', type: 'single' },
        { from: 'c_alk_a', to: 'h_alk_a', type: 'single' },
        { from: 'c_alk_a', to: 'c_alk_b', type: 'double' },
        { from: 'c_alk_b', to: 'h_alk_b', type: 'single' },
        { from: 'c_alk_b', to: 'c_ch2', type: 'single' },
        { from: 'c_ch2', to: 'h_ch2_a', type: 'single' }, { from: 'c_ch2', to: 'h_ch2_b', type: 'single' },
        
        // Ester
        { from: 'c_ch2', to: 'o_ester', type: 'single' },
        { from: 'o_ester', to: 'c_carbonyl', type: 'single' },
        { from: 'c_carbonyl', to: 'o_carbonyl', type: 'double' },
        { from: 'c_carbonyl', to: 'g_ac_me', type: 'single' },
    ],
    peaks1H: [
        // Aromatic Ortho to Alkene (Deshielded)
        { 
            id: 'h_ar_2', 
            ppm: 7.58, 
            multiplicity: 'd', 
            integration: 2, 
            assignment: 'Ar-H (Ortho to Chain)',
            analysis: {
                anisotropy: 'Located in the deshielding zone of the benzene ring current effect. This is the primary reason aromatic protons appear downfield (~7-8 ppm).',
                resonance: 'Compared to the para-amino group, this position receives less electron-donating resonance and is closer to the electron-withdrawing acrylate chain.'
            }
        },
        { 
            id: 'h_ar_6', 
            ppm: 7.58, 
            multiplicity: 'd', 
            integration: 2, 
            assignment: 'Ar-H (Ortho to Chain)',
            analysis: {
                anisotropy: 'Located in the deshielding zone of the benzene ring current effect. This is the primary reason aromatic protons appear downfield (~7-8 ppm).',
                resonance: 'Compared to the para-amino group, this position receives less electron-donating resonance and is closer to the electron-withdrawing acrylate chain.'
            }
        },

        // Alkene Alpha to Ring
        { 
            id: 'h_alk_a', 
            ppm: 6.86, 
            multiplicity: 'd', 
            integration: 1, 
            assignment: 'Alkene-Hα (d, J=14.6Hz)',
            analysis: {
                anisotropy: 'The magnetic anisotropy of the double bond (C=C) places alkene protons in a deshielding zone.',
                resonance: 'Conjugated with the aromatic ring; electron delocalization leads to further deshielding.',
            }
        },

        // Aromatic Ortho to N (Shielded)
        { 
            id: 'h_ar_3', 
            ppm: 6.74, 
            multiplicity: 'd', 
            integration: 2, 
            assignment: 'Ar-H (Ortho to NMe₂)',
            analysis: {
                resonance: 'Resonance Donating Effect: The lone pair on Nitrogen increases electron density at the ortho positions. This enhanced shielding shifts the signal upfield relative to typical benzene protons.',
                anisotropy: 'Still affected by the ring current, but the resonance shielding dominates the relative shift.'
            }
        },
        { 
            id: 'h_ar_5', 
            ppm: 6.74, 
            multiplicity: 'd', 
            integration: 2, 
            assignment: 'Ar-H (Ortho to NMe₂)',
            analysis: {
                resonance: 'Resonance Donating Effect: The lone pair on Nitrogen increases electron density at the ortho positions. This enhanced shielding shifts the signal upfield relative to typical benzene protons.',
            }
        },

        // Alkene Beta to Ring
        { 
            id: 'h_alk_b', 
            ppm: 5.73, 
            multiplicity: 'dt', 
            integration: 1, 
            assignment: 'Alkene-Hβ (dt, J=14.6, 4.8Hz)',
            analysis: {
                resonance: 'Long-range resonance from the electron-donating dimethylamino group increases electron density here compared to the alpha position, resulting in a higher field shift.',
                anisotropy: 'Affected by the double bond anisotropy.'
            }
        },

        // Allylic CH2
        { 
            id: 'h_ch2_a', 
            ppm: 4.45, 
            multiplicity: 'd', 
            integration: 2, 
            assignment: '-O-CH₂- (d, J=4.7Hz)',
            analysis: {
                inductive: 'Strong electronegativity of Oxygen causes an electron-withdrawing inductive effect (deshielding).',
                anisotropy: 'Also located in the deshielding zone of the alkene double bond (Allylic position).'
            }
        },
        { 
            id: 'h_ch2_b', 
            ppm: 4.45, 
            multiplicity: 'd', 
            integration: 2, 
            assignment: '-O-CH₂- (d, J=4.7Hz)',
             analysis: {
                inductive: 'Strong electronegativity of Oxygen causes an electron-withdrawing inductive effect (deshielding).',
                anisotropy: 'Also located in the deshielding zone of the alkene double bond (Allylic position).'
            }
        },

        // N-Dimethyls - Using the group IDs
        { 
            id: 'g_n_me1', 
            ppm: 2.98, 
            multiplicity: 's', 
            integration: 6, 
            assignment: '-N(CH₃)₂',
            analysis: {
                inductive: 'Nitrogen is more electronegative (3.04) than Carbon (2.55), causing an electron-withdrawing inductive effect that deshields the methyl protons.'
            }
        },
        { 
            id: 'g_n_me2', 
            ppm: 2.98, 
            multiplicity: 's', 
            integration: 6, 
            assignment: '-N(CH₃)₂',
            analysis: {
                inductive: 'Nitrogen is more electronegative (3.04) than Carbon (2.55), causing an electron-withdrawing inductive effect that deshields the methyl protons.'
            }
        },

        // Acetate Methyl - Using the group ID
        { 
            id: 'g_ac_me', 
            ppm: 2.06, 
            multiplicity: 's', 
            integration: 3, 
            assignment: '-CO-CH₃ (Acetate)',
            analysis: {
                anisotropy: 'Typical methyl ketone/acetate position. Deshielded by the magnetic anisotropy cone of the carbonyl group (C=O).'
            }
        },
    ],
    peaks13C: [
        { id: 'c_carbonyl', ppm: 170.70, multiplicity: 's', integration: 0, assignment: 'C=O (Ester)' },
        { id: 'c_ar_4', ppm: 151.16, multiplicity: 's', integration: 0, assignment: 'Ar-C-N' },
        { id: 'c_alk_a', ppm: 134.32, multiplicity: 's', integration: 0, assignment: 'Alkene Cα' },
        { id: 'c_ar_2', ppm: 128.08, multiplicity: 's', integration: 0, assignment: 'Ar-C (Meta to N)' },
        { id: 'c_ar_6', ppm: 128.08, multiplicity: 's', integration: 0, assignment: 'Ar-C (Meta to N)' },
        { id: 'c_ar_1', ppm: 127.14, multiplicity: 's', integration: 0, assignment: 'Ar-C (Ipso Chain)' },
        { id: 'c_alk_b', ppm: 124.02, multiplicity: 's', integration: 0, assignment: 'Alkene Cβ' },
        { id: 'c_ar_3', ppm: 110.84, multiplicity: 's', integration: 0, assignment: 'Ar-C (Ortho to N)' },
        { id: 'c_ar_5', ppm: 110.84, multiplicity: 's', integration: 0, assignment: 'Ar-C (Ortho to N)' },
        { id: 'c_ch2', ppm: 65.05, multiplicity: 's', integration: 0, assignment: '-O-CH₂-' },
        // N-Me2 groups
        { id: 'g_n_me1', ppm: 40.23, multiplicity: 's', integration: 0, assignment: 'N-CH₃' },
        { id: 'g_n_me2', ppm: 40.23, multiplicity: 's', integration: 0, assignment: 'N-CH₃' },
        // Acetate Methyl
        { id: 'g_ac_me', ppm: 20.77, multiplicity: 's', integration: 0, assignment: 'Acetyl CH₃' },
    ]
  }
];

export const SYSTEM_PROMPT = "";