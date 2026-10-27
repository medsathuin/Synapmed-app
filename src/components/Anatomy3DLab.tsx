import React, { useState } from 'react';
import { RotateCw, Eye, ZoomIn, ZoomOut, Layers, Sparkles, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';

export type AnatomyModelId = 'circle_of_willis' | 'cardiac_anatomy' | 'brachial_plexus' | 'nephron' | 'cranial_nerves';

interface AnatomyPart {
  id: string;
  name: string;
  coords: { x: number; y: number; z: number };
  color: string;
  stroke: string;
  clinicalSignificance: string;
  highYieldExamQuestion: string;
}

export const Anatomy3DLab: React.FC<{ initialModel?: AnatomyModelId }> = ({ initialModel = 'circle_of_willis' }) => {
  const [selectedModel, setSelectedModel] = useState<AnatomyModelId>(initialModel);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [selectedPart, setSelectedPart] = useState<AnatomyPart | null>(null);
  const [visibleLayers, setVisibleLayers] = useState<{ vascular: boolean; neural: boolean; parenchymal: boolean }>({
    vascular: true,
    neural: true,
    parenchymal: true
  });
  const [activeQuizMode, setActiveQuizMode] = useState(false);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  // Model-specific structures
  const MODEL_DATA: Record<AnatomyModelId, { title: string; subtitle: string; parts: AnatomyPart[] }> = {
    circle_of_willis: {
      title: 'Circle of Willis (Arterial Circle of Cerebrum)',
      subtitle: '3D Cerebral Hemodynamics, Watershed Territories & Aneurysm Hotspots',
      parts: [
        {
          id: 'acom',
          name: 'Anterior Communicating Artery (ACom)',
          coords: { x: 200, y: 120, z: 0 },
          color: '#EF4444',
          stroke: '#B91C1C',
          clinicalSignificance: 'Most frequent site of intracranial saccular (Berry) aneurysms (30-35%). Rupture causes subarachnoid hemorrhage (worst headache of life) and bitemporal visual field cuts via optic chiasm compression.',
          highYieldExamQuestion: 'Which vessel connects the bilateral anterior cerebral arteries and is the most common site of Berry aneurysms?'
        },
        {
          id: 'aca',
          name: 'Anterior Cerebral Artery (ACA - A1/A2)',
          coords: { x: 160, y: 130, z: 0 },
          color: '#F87171',
          stroke: '#DC2626',
          clinicalSignificance: 'Supplies anteromedial cerebral cortex (paracentral lobule). Infarction causes contralateral lower extremity paralysis and sensory loss with urinary incontinence.',
          highYieldExamQuestion: 'Infarction causing isolated contralateral leg > arm motor weakness affects which artery?'
        },
        {
          id: 'ica',
          name: 'Internal Carotid Artery (ICA - Supraclinoid)',
          coords: { x: 150, y: 190, z: 0 },
          color: '#DC2626',
          stroke: '#991B1B',
          clinicalSignificance: 'Enters skull base via carotid canal, passes through cavernous sinus (intimately related to CN VI), gives off ophthalmic artery (amaurosis fugax) before terminal bifurcation into ACA and MCA.',
          highYieldExamQuestion: 'Aneurysm in the cavernous sinus typically produces isolated palsy of which cranial nerve first?'
        },
        {
          id: 'mca',
          name: 'Middle Cerebral Artery (MCA - M1/M2)',
          coords: { x: 80, y: 190, z: 0 },
          color: '#EA580C',
          stroke: '#C2410C',
          clinicalSignificance: 'Largest terminal branch of ICA. Supplies lateral convexity of hemisphere. Occlusion causes contralateral hemiplegia and hemisensory loss (Face & Arm > Leg) + Aphasia (Broca/Wernicke in dominant hemisphere) or Hemineglect (non-dominant).',
          highYieldExamQuestion: 'Occlusion of which artery produces contralateral facial and arm paralysis with global or expressive aphasia?'
        },
        {
          id: 'pcom',
          name: 'Posterior Communicating Artery (PCom)',
          coords: { x: 160, y: 250, z: 0 },
          color: '#F97316',
          stroke: '#EA580C',
          clinicalSignificance: 'Connects ICA to PCA. Aneurysm at the junction of ICA and PCom compresses Cranial Nerve III (Oculomotor nerve), resulting in a fixed, dilated pupil ("blown pupil") and ptosis with "down and out" gaze.',
          highYieldExamQuestion: 'Acute painful 3rd cranial nerve palsy with pupil dilatation is an emergency sign of aneurysm in which artery?'
        },
        {
          id: 'pca',
          name: 'Posterior Cerebral Artery (PCA - P1/P2)',
          coords: { x: 240, y: 270, z: 0 },
          color: '#EAB308',
          stroke: '#CA8A04',
          clinicalSignificance: 'Originates from basilar bifurcation. Supplies occipital lobe and inferior temporal lobe. Infarction causes contralateral homonymous hemianopia with MACULAR SPARING (dual supply from MCA at occipital pole).',
          highYieldExamQuestion: 'Contralateral homonymous hemianopia with macular sparing is pathognomonic for occlusion of which artery?'
        },
        {
          id: 'basilar',
          name: 'Basilar Artery',
          coords: { x: 200, y: 310, z: 0 },
          color: '#84CC16',
          stroke: '#65A30D',
          clinicalSignificance: 'Formed at the pontomedullary junction by the union of two vertebral arteries. Supplies brainstem and cerebellum. Thrombosis results in catastrophic "Locked-In Syndrome" (quadriplegia with preserved vertical eye movements).',
          highYieldExamQuestion: 'Locked-in syndrome with bilateral pontine ischemia results from thrombosis of which midline vessel?'
        },
        {
          id: 'pica',
          name: 'Posterior Inferior Cerebellar Artery (PICA)',
          coords: { x: 230, y: 370, z: 0 },
          color: '#10B981',
          stroke: '#059669',
          clinicalSignificance: 'Branch of vertebral artery. Supplies lateral medulla. Occlusion causes Lateral Medullary (Wallenberg) Syndrome: dysphagia (nucleus ambiguus), Horner syndrome, crossed sensory loss, and ataxia.',
          highYieldExamQuestion: 'Wallenberg syndrome with dysphagia and hoarseness is caused by infarction of which cerebellar branch?'
        }
      ]
    },
    cardiac_anatomy: {
      title: 'Cardiac Coronary Vasculature & Conduction Axis',
      subtitle: '3D Coronary Artery Dominance, STEMI Culprits & Valve Architecture',
      parts: [
        {
          id: 'lad',
          name: 'Left Anterior Descending Artery (LAD - "Widow Maker")',
          coords: { x: 190, y: 210, z: 0 },
          color: '#EF4444',
          stroke: '#B91C1C',
          clinicalSignificance: 'Supplies anterior 2/3 of interventricular septum, anterior LV wall, and cardiac apex. Most frequently occluded coronary artery (45-50%). Causes anteroseptal STEMI (V1-V4).',
          highYieldExamQuestion: 'ST elevation in leads V1 to V4 corresponds to infarction in the distribution of which coronary artery?'
        },
        {
          id: 'rca',
          name: 'Right Coronary Artery (RCA)',
          coords: { x: 260, y: 190, z: 0 },
          color: '#3B82F6',
          stroke: '#1D4ED8',
          clinicalSignificance: 'Supplies right atrium, right ventricle, SA node (60% of people), and AV node (90% - right dominance). Occlusion causes inferior STEMI (II, III, aVF) and RV infarction.',
          highYieldExamQuestion: 'Inferior wall MI complicated by complete heart block (AV dissociation) points to occlusion of which vessel?'
        },
        {
          id: 'lcx',
          name: 'Left Circumflex Artery (LCx)',
          coords: { x: 130, y: 180, z: 0 },
          color: '#8B5CF6',
          stroke: '#6D28D9',
          clinicalSignificance: 'Travels in the left atrioventricular groove. Supplies lateral and posterior walls of the left ventricle. Causes lateral STEMI (leads I, aVL, V5, V6).',
          highYieldExamQuestion: 'ST-segment elevation in high lateral leads I and aVL signifies occlusion of which arterial branch?'
        },
        {
          id: 'av_node',
          name: 'Atrioventricular (AV) Node',
          coords: { x: 210, y: 170, z: 0 },
          color: '#F59E0B',
          stroke: '#D97706',
          clinicalSignificance: 'Located in Triangle of Koch (bounded by tendon of Todaro, tricuspid valve septal leaflet, and coronary sinus orifice). Physiological delay (0.1s) allows atrial emptying.',
          highYieldExamQuestion: 'What anatomical triangle contains the AV node and is a landmark during catheter ablation of SVT?'
        }
      ]
    },
    brachial_plexus: {
      title: 'Brachial Plexus 3D Schematic & Neuropathies',
      subtitle: 'Roots (C5-T1) -> Trunks -> Divisions -> Cords -> Terminal Motor & Sensory Nerves',
      parts: [
        {
          id: 'c5_c6',
          name: 'Upper Trunk (C5, C6 Roots - Erb Point)',
          coords: { x: 120, y: 130, z: 0 },
          color: '#10B981',
          stroke: '#047857',
          clinicalSignificance: "Excessive traction on neonate neck during shoulder dystocia avulses C5-C6 roots causing Erb's Palsy (Policeman/Waiter tip hand): arm adducted, internally rotated, forearm pronated.",
          highYieldExamQuestion: "Adducted shoulder with extended elbow and pronated forearm in a newborn indicates injury to which trunk?"
        },
        {
          id: 'c8_t1',
          name: 'Lower Trunk (C8, T1 Roots)',
          coords: { x: 120, y: 270, z: 0 },
          color: '#EC4899',
          stroke: '#BE185D',
          clinicalSignificance: "Upward traction on abducted arm (catching a branch while falling) injures C8-T1 causing Klumpke's Palsy: total claw hand (lumbricals paralyzed) + ipsilateral Horner syndrome (T1 sympathetic chain).",
          highYieldExamQuestion: "Sudden hyperabduction traction resulting in true claw hand and Horner syndrome implicates which roots?"
        },
        {
          id: 'radial_nerve',
          name: 'Radial Nerve (Posterior Cord, C5-T1)',
          coords: { x: 250, y: 200, z: 0 },
          color: '#6366F1',
          stroke: '#4338CA',
          clinicalSignificance: "Travels in the radial (spiral) groove of the humerus with profunda brachii artery. Midshaft humerus fracture causes wrist drop with sensory loss over dorsal first webspace.",
          highYieldExamQuestion: "Midshaft fracture of the humerus is most commonly complicated by injury to which peripheral nerve?"
        },
        {
          id: 'median_nerve',
          name: 'Median Nerve (Lateral & Medial Cords, C5-T1)',
          coords: { x: 270, y: 240, z: 0 },
          color: '#F97316',
          stroke: '#C2410C',
          clinicalSignificance: "Enters forearm between heads of pronator teres. Supracondylar humerus fracture injures anterior interosseous branch. Carpal tunnel syndrome compresses it under flexor retinaculum (Ape hand).",
          highYieldExamQuestion: "Supracondylar fracture of the humerus in a child most commonly injures which nerve and artery?"
        }
      ]
    },
    nephron: {
      title: 'Nephron Microanatomy & Countercurrent Mechanism',
      subtitle: 'Glomerular Filtration Barrier, Loop of Henle Osmotic Gradient & SGLT2 Targets',
      parts: [
        {
          id: 'glomerulus',
          name: 'Glomerular Filtration Barrier',
          coords: { x: 140, y: 120, z: 0 },
          color: '#EF4444',
          stroke: '#DC2626',
          clinicalSignificance: 'Three layers: Fenestrated capillary endothelium, Podocyte foot processes, and Negatively charged Glomerular Basement Membrane (heparan sulfate). Loss of negative charge causes selective albuminuria.',
          highYieldExamQuestion: 'In Minimal Change Disease, what specific ultrastructural alteration is identified under electron microscopy?'
        },
        {
          id: 'pct',
          name: 'Proximal Convoluted Tubule (PCT)',
          coords: { x: 200, y: 140, z: 0 },
          color: '#3B82F6',
          stroke: '#1D4ED8',
          clinicalSignificance: 'Reabsorbs 65% of filtered water and sodium, 100% of glucose and amino acids. SGLT2 inhibitors (Empagliflozin, Dapagliflozin) block glucose and Na+ reabsorption here, reducing heart failure mortality.',
          highYieldExamQuestion: 'What segment of the renal tubule is the primary site of action for SGLT2 inhibitors and Carbonic Anhydrase inhibitors?'
        },
        {
          id: 'loop_henle',
          name: 'Thick Ascending Limb (TAL) of Loop of Henle',
          coords: { x: 220, y: 280, z: 0 },
          color: '#10B981',
          stroke: '#059669',
          clinicalSignificance: 'Impermeable to water. Expresses Na-K-2Cl (NKCC2) cotransporter. Loop diuretics (Furosemide) inhibit NKCC2, dissipating the medullary hypertonic osmotic gradient. Bartter syndrome mimics chronic loop diuretic use.',
          highYieldExamQuestion: 'Bartter syndrome results from an inherited loss-of-function mutation in which renal tubular transporter?'
        },
        {
          id: 'collecting_duct',
          name: 'Collecting Duct & Principal Cells',
          coords: { x: 280, y: 220, z: 0 },
          color: '#8B5CF6',
          stroke: '#6D28D9',
          clinicalSignificance: 'Regulated by Aldosterone (upregulates ENaC and Na+/K+ ATPase) and ADH / Vasopressin (inserts Aquaporin-2 water channels). Potassium-sparing diuretics (Spironolactone, Amiloride) act here.',
          highYieldExamQuestion: 'In nephrogenic diabetes insipidus secondary to chronic Lithium therapy, which water channel is down-regulated?'
        }
      ]
    },
    cranial_nerves: {
      title: 'Brainstem Cranial Nerve Nuclei & Pathways',
      subtitle: 'Midbrain (CN III-IV), Pons (CN V-VIII), Medulla (CN IX-XII) Localization',
      parts: [
        {
          id: 'cn3',
          name: 'Oculomotor Nerve (CN III - Edinger-Westphal)',
          coords: { x: 190, y: 130, z: 0 },
          color: '#EF4444',
          stroke: '#DC2626',
          clinicalSignificance: 'Emerges from interpeduncular fossa of midbrain. Uncal herniation compresses parasympathetic pupillomotor fibers on the nerve periphery, resulting in an early dilated unreactive pupil before complete extraocular muscle palsy.',
          highYieldExamQuestion: 'In transtentorial uncal herniation, what is the earliest clinical sign of 3rd nerve compression?'
        },
        {
          id: 'cn7',
          name: 'Facial Nerve (CN VII - Cerebellopontine Angle)',
          coords: { x: 140, y: 240, z: 0 },
          color: '#F59E0B',
          stroke: '#D97706',
          clinicalSignificance: 'Loops around CN VI nucleus (facial colliculus) in lower pons, exits at CP angle. Vestibular schwannoma causes sensorineural deafness (CN VIII) and loss of corneal reflex (CN V1 sensory limb + CN VII motor limb).',
          highYieldExamQuestion: 'Which reflex loop tests the integrity of both CN V1 and CN VII simultaneously?'
        },
        {
          id: 'cn10',
          name: 'Vagus & Nucleus Ambiguus (CN X)',
          coords: { x: 230, y: 340, z: 0 },
          color: '#10B981',
          stroke: '#059669',
          clinicalSignificance: 'Nucleus ambiguus innervates muscles of larynx and pharynx. Lesion causes uvula deviation to the contralateral normal side and hoarseness (recurrent laryngeal nerve).',
          highYieldExamQuestion: 'Unilateral vagal nerve lesion causes deviation of the uvula toward which side during phonation?'
        }
      ]
    }
  };

  const currentModelData = MODEL_DATA[selectedModel];

  // Rotate calculation
  const cos = Math.cos((rotationAngle * Math.PI) / 180);
  const sin = Math.sin((rotationAngle * Math.PI) / 180);

  const getTransformedCoords = (part: AnatomyPart) => {
    // 3D yaw rotation around vertical axis (X = 200 is center)
    const dx = part.coords.x - 200;
    const dz = part.coords.z;
    const rotatedX = 200 + (dx * cos - dz * sin) * zoomLevel;
    const rotatedY = part.coords.y * zoomLevel;
    return { x: rotatedX, y: rotatedY };
  };

  const handlePartClick = (part: AnatomyPart) => {
    setSelectedPart(part);
    if (activeQuizMode) {
      if (part.id === currentModelData.parts[quizQuestionIndex]?.id) {
        setQuizFeedback('Correct! Outstanding anatomical localization.');
        setTimeout(() => {
          setQuizFeedback(null);
          setQuizQuestionIndex(prev => (prev + 1) % currentModelData.parts.length);
        }, 1500);
      } else {
        setQuizFeedback(`Incorrect. That is the ${part.name}. Try locating: ${currentModelData.parts[quizQuestionIndex]?.name}`);
      }
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl text-slate-100 flex flex-col h-full">
      {/* Header bar */}
      <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Interactive 3D Simulation
            </span>
            <span className="text-xs text-slate-400">High-Yield Medical Anatomy & Clinical Correlates</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            {currentModelData.title}
          </h2>
          <p className="text-xs text-slate-400">{currentModelData.subtitle}</p>
        </div>

        {/* Model Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => { setSelectedModel('circle_of_willis'); setSelectedPart(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${selectedModel === 'circle_of_willis' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Circle of Willis
          </button>
          <button
            onClick={() => { setSelectedModel('cardiac_anatomy'); setSelectedPart(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${selectedModel === 'cardiac_anatomy' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Coronary & Heart
          </button>
          <button
            onClick={() => { setSelectedModel('brachial_plexus'); setSelectedPart(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${selectedModel === 'brachial_plexus' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Brachial Plexus
          </button>
          <button
            onClick={() => { setSelectedModel('nephron'); setSelectedPart(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${selectedModel === 'nephron' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Nephron Nephron
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area & Info Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-[460px]">
        {/* Interactive Canvas Canvas */}
        <div className="lg:col-span-7 bg-radial from-slate-850 via-slate-900 to-slate-950 p-6 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Controls Overlay */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400">Rotation:</span>
              <span className="font-mono text-indigo-400 font-bold">{rotationAngle}°</span>
              <button
                onClick={() => setRotationAngle(prev => (prev + 30) % 360)}
                className="p-1 hover:bg-slate-800 rounded transition text-slate-300"
                title="Rotate 30 deg"
              >
                <RotateCw size={14} />
              </button>
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${isAutoRotating ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
              >
                {isAutoRotating ? 'Auto ON' : 'Auto'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur px-2 py-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.1))}
                  className="p-1 hover:bg-slate-800 rounded text-slate-300"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="font-mono text-slate-300 px-1 text-xs">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(1.5, prev + 0.1))}
                  className="p-1 hover:bg-slate-800 rounded text-slate-300"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
              </div>

              <button
                onClick={() => {
                  setActiveQuizMode(!activeQuizMode);
                  setQuizFeedback(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${activeQuizMode ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
              >
                <Sparkles size={14} />
                {activeQuizMode ? 'Exit Spotter' : 'Spotter Quiz'}
              </button>
            </div>
          </div>

          {/* Interactive SVG Diagram */}
          <div className="my-auto py-6 flex items-center justify-center">
            <svg
              viewBox="0 0 400 420"
              className="w-full max-w-[420px] max-h-[380px] drop-shadow-2xl select-none"
            >
              {/* Subtle anatomical background glow */}
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="arteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
              </defs>

              {/* Connecting Vasculature / Fibers depending on model */}
              {selectedModel === 'circle_of_willis' && (
                <g stroke="#EF4444" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                  {/* Basilar Trunk */}
                  <line x1="200" y1="360" x2="200" y2="290" />
                  {/* Vertebral join */}
                  <line x1="170" y1="390" x2="200" y2="360" />
                  <line x1="230" y1="390" x2="200" y2="360" />
                  {/* PICA branches */}
                  <path d="M 190 370 Q 150 360 140 380" fill="none" strokeWidth="4" />
                  <path d="M 210 370 Q 250 360 260 380" fill="none" strokeWidth="4" />
                  {/* PCA bifurcation */}
                  <line x1="200" y1="290" x2="150" y2="260" />
                  <line x1="200" y1="290" x2="250" y2="260" />
                  {/* PCom connectors */}
                  <line x1="150" y1="260" x2="150" y2="190" strokeDasharray="3,3" />
                  <line x1="250" y1="260" x2="250" y2="190" strokeDasharray="3,3" />
                  {/* MCAs */}
                  <line x1="150" y1="190" x2="70" y2="190" strokeWidth="9" />
                  <line x1="250" y1="190" x2="330" y2="190" strokeWidth="9" />
                  {/* ACAs */}
                  <line x1="150" y1="190" x2="185" y2="120" strokeWidth="7" />
                  <line x1="250" y1="190" x2="215" y2="120" strokeWidth="7" />
                  {/* ACom bridge */}
                  <line x1="185" y1="120" x2="215" y2="120" strokeWidth="6" stroke="#DC2626" />
                </g>
              )}

              {selectedModel === 'cardiac_anatomy' && (
                <g stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" opacity="0.85">
                  {/* Aortic Arch */}
                  <path d="M 170 140 C 170 80, 240 80, 240 140" fill="none" stroke="#EF4444" strokeWidth="18" />
                  {/* LAD */}
                  <path d="M 190 140 Q 185 220 200 320" fill="none" stroke="#EF4444" strokeWidth="8" />
                  {/* Diagonal branches */}
                  <path d="M 188 200 Q 150 230 140 270" fill="none" stroke="#EF4444" strokeWidth="4" />
                  {/* LCx */}
                  <path d="M 180 150 Q 130 170 120 220" fill="none" stroke="#8B5CF6" strokeWidth="7" />
                  {/* RCA */}
                  <path d="M 230 150 Q 270 200 260 290" fill="none" stroke="#3B82F6" strokeWidth="8" />
                  {/* Marginal */}
                  <path d="M 265 240 Q 295 270 300 300" fill="none" stroke="#3B82F6" strokeWidth="4" />
                </g>
              )}

              {selectedModel === 'brachial_plexus' && (
                <g stroke="#10B981" strokeWidth="6" strokeLinecap="round" opacity="0.85">
                  {/* Roots */}
                  <line x1="90" y1="100" x2="150" y2="120" />
                  <line x1="90" y1="140" x2="150" y2="120" />
                  <line x1="90" y1="180" x2="150" y2="180" />
                  <line x1="90" y1="230" x2="150" y2="250" />
                  <line x1="90" y1="270" x2="150" y2="250" />
                  {/* Trunks to Cords */}
                  <line x1="150" y1="120" x2="220" y2="140" stroke="#F59E0B" strokeWidth="7" />
                  <line x1="150" y1="180" x2="220" y2="190" stroke="#F59E0B" strokeWidth="7" />
                  <line x1="150" y1="250" x2="220" y2="240" stroke="#F59E0B" strokeWidth="7" />
                  {/* Terminal branches */}
                  <line x1="220" y1="140" x2="310" y2="120" stroke="#EC4899" strokeWidth="6" />
                  <line x1="220" y1="190" x2="310" y2="190" stroke="#6366F1" strokeWidth="8" />
                  <line x1="220" y1="240" x2="310" y2="260" stroke="#F97316" strokeWidth="7" />
                </g>
              )}

              {selectedModel === 'nephron' && (
                <g stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85">
                  {/* Bowman's capsule */}
                  <circle cx="140" cy="120" r="22" stroke="#EF4444" strokeWidth="6" fill="#EF444422" />
                  {/* PCT */}
                  <path d="M 160 125 Q 190 100 210 130 T 220 180" stroke="#3B82F6" strokeWidth="7" />
                  {/* Loop of Henle hairpin */}
                  <path d="M 220 180 L 220 310 Q 230 330 240 310 L 240 160" stroke="#10B981" strokeWidth="7" />
                  {/* DCT */}
                  <path d="M 240 160 Q 260 140 280 170" stroke="#F59E0B" strokeWidth="6" />
                  {/* Collecting Duct */}
                  <line x1="280" y1="110" x2="280" y2="350" stroke="#8B5CF6" strokeWidth="10" />
                </g>
              )}

              {/* Interactive clickable anatomical nodes */}
              {currentModelData.parts.map(part => {
                const { x, y } = getTransformedCoords(part);
                const isSelected = selectedPart?.id === part.id;
                return (
                  <g
                    key={part.id}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => handlePartClick(part)}
                  >
                    {/* Ring highlight when selected */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r="18"
                        fill="none"
                        stroke="#60A5FA"
                        strokeWidth="2.5"
                        strokeDasharray="4,4"
                        className="animate-spin"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? '12' : '9'}
                      fill={part.color}
                      stroke={isSelected ? '#FFFFFF' : part.stroke}
                      strokeWidth={isSelected ? '3' : '2'}
                      filter="url(#glow)"
                    />
                    <text
                      x={x + 14}
                      y={y + 4}
                      fill={isSelected ? '#60A5FA' : '#CBD5E1'}
                      fontSize={isSelected ? '12' : '10'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      className="pointer-events-none select-none drop-shadow"
                    >
                      {part.name.split(' (')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Spotter Quiz Prompt overlay */}
          {activeQuizMode && (
            <div className="bg-amber-950/90 border border-amber-500/40 rounded-xl p-3.5 backdrop-blur z-10 shadow-xl">
              <div className="flex items-start gap-2">
                <Sparkles className="text-amber-400 mt-0.5 shrink-0" size={16} />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-amber-300">
                    Spotter Question #{quizQuestionIndex + 1} of {currentModelData.parts.length}
                  </div>
                  <p className="text-sm font-medium text-white mt-0.5">
                    {currentModelData.parts[quizQuestionIndex]?.highYieldExamQuestion}
                  </p>
                  <p className="text-xs text-amber-200/70 mt-1">
                    Click the correct anatomical structure on the 3D model above.
                  </p>
                  {quizFeedback && (
                    <div className={`mt-2 text-xs font-bold flex items-center gap-1.5 ${quizFeedback.startsWith('Correct') ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {quizFeedback.startsWith('Correct') ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      {quizFeedback}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom helper tip */}
          {!activeQuizMode && (
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
              <span>Click any anatomical node to inspect clinical lesions & questions</span>
              <span className="text-slate-400">High-Yield NEET-PG / INI-CET Core</span>
            </div>
          )}
        </div>

        {/* Clinical Rationale & High-Yield Sidebar */}
        <div className="lg:col-span-5 bg-slate-950 p-6 flex flex-col justify-between overflow-y-auto">
          {selectedPart ? (
            <div className="space-y-5">
              <div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Target Structure
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5 leading-snug">
                  {selectedPart.name}
                </h3>
              </div>

              {/* Clinical Significance Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs mb-2">
                  <AlertCircle size={15} />
                  Clinical & Surgical Pathology
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedPart.clinicalSignificance}
                </p>
              </div>

              {/* Exam Question Blueprint */}
              <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-2">
                  <BookOpen size={15} />
                  Frequently Tested Vignette Pattern
                </div>
                <p className="text-sm text-indigo-100 font-medium italic">
                  "{selectedPart.highYieldExamQuestion}"
                </p>
              </div>
            </div>
          ) : (
            <div className="my-auto text-center py-12 px-4 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
                <Eye size={26} />
              </div>
              <h4 className="text-base font-semibold text-slate-200">Select an Anatomical Landmark</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Click on any vascular branch, nerve root, or functional segment in the 3D viewport to inspect clinical lesions, stroke syndromes, and high-yield MCQs.
              </p>
            </div>
          )}

          {/* Quick navigation indicators */}
          <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>{currentModelData.parts.length} High-Yield Structures mapped</span>
            <button
              onClick={() => setSelectedPart(currentModelData.parts[0])}
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Start Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
