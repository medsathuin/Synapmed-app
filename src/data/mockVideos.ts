import { VideoLecture } from '../types';

export const MOCK_VIDEOS: VideoLecture[] = [
  {
    id: 'vid-anat-01',
    title: 'Circle of Willis & Stroke Syndromes: 3D Vascular Neuroanatomy',
    subject: 'Anatomy',
    chapter: 'Neuroanatomy & Cranial Nerves',
    topic: 'Cerebral Arterial Circle',
    durationMinutes: 48,
    type: 'concept',
    faculty: 'Dr. Rathod Sathyapal (Founder & Lead Educator)',
    thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    has3DModel: true,
    modelType: 'circle_of_willis',
    clinicalScenario: 'A 68-year-old male presents with sudden right-sided hemiplegia and expressive aphasia. Pinpoint the occluded arterial segment in the 3D model and identify watershed zones.',
    recentGuidelineUpdate: 'AHA/ASA 2025 Acute Stroke Mechanical Thrombectomy Window Guidelines',
    highYieldPoints: [
      'Anterior communicating artery is the most common site of Berry aneurysms (30-35%).',
      'Posterior communicating artery aneurysm compresses Cranial Nerve III causing dilated pupil and ptosis.',
      'Lateral medullary syndrome (Wallenberg) arises from PICA thrombosis, sparing the pyramid (no hemiplegia).'
    ],
    chaptersList: [
      { title: 'Introduction & Embryological Origin', timeSec: 0 },
      { title: 'Interactive 3D Circle Assembly', timeSec: 420 },
      { title: 'Anterior vs Posterior Circulation', timeSec: 960 },
      { title: 'Clinical Stroke Syndromes (MCA, ACA, PCA)', timeSec: 1680 },
      { title: 'Berry Aneurysms & CN Compressions', timeSec: 2400 }
    ]
  },
  {
    id: 'vid-anat-02',
    title: 'Brachial Plexus & High-Yield Upper Limb Nerve Injuries',
    subject: 'Anatomy',
    chapter: 'Upper Limb & Brachial Plexus',
    topic: 'Roots, Trunks, Divisions, Cords & Branches',
    durationMinutes: 55,
    type: 'concept',
    faculty: 'Dr. Rathod Sathyapal (Founder & Lead Educator)',
    thumbnail: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    has3DModel: true,
    modelType: 'brachial_plexus',
    clinicalScenario: 'A newborn after breech extraction presents with adducted, internally rotated shoulder and pronated forearm (Policeman tip deformity). Which nerve roots are avulsed?',
    recentGuidelineUpdate: 'High-Yield INI-CET & NEET-PG Clinical Vignette Pattern',
    highYieldPoints: [
      "Erb's Palsy involves C5-C6 roots (waiter's tip / porter's tip hand).",
      "Klumpke's Palsy involves C8-T1 roots with true claw hand and Horner's syndrome.",
      'Radial nerve injury at spiral groove spares triceps brachii but causes wrist drop.'
    ],
    chaptersList: [
      { title: 'Roots to Terminal Branches mnemonic', timeSec: 0 },
      { title: '3D Root Anatomy and scalene triangle', timeSec: 600 },
      { title: 'Supraclavicular vs Infraclavicular branches', timeSec: 1320 },
      { title: 'Erb-Duchenne vs Klumpke deformities', timeSec: 2100 },
      { title: 'Peripheral Nerve Testing table', timeSec: 2850 }
    ]
  },
  {
    id: 'vid-phys-01',
    title: 'Cardiac Cycle, Wiggers Diagram & Murmurs Explained',
    subject: 'Physiology',
    chapter: 'Cardiovascular Physiology',
    topic: 'Hemodynamics & Pressure-Volume Loops',
    durationMinutes: 62,
    type: 'concept',
    faculty: 'Dr. Rathod Sathyapal (Founder & Lead Educator)',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    has3DModel: true,
    modelType: 'cardiac_anatomy',
    clinicalScenario: 'Correlating jugular venous pulse (JVP) waveforms (a, c, v waves and x, y descents) with left ventricular pressure changes and phonocardiography.',
    recentGuidelineUpdate: 'ESC 2024 Valvular Heart Disease Hemodynamic Diagnostic Criteria',
    highYieldPoints: [
      'The c wave in JVP corresponds to tricuspid valve bulging during isovolumetric ventricular contraction.',
      'Aortic valve opens at the end of isovolumetric contraction and closes at the start of isovolumetric relaxation (dicrotic notch).',
      'S3 is rapid ventricular filling (volume overload); S4 is atrial gallop into a non-compliant ventricle (pressure overload).'
    ],
    chaptersList: [
      { title: 'Wiggers Diagram Step-by-Step Reconstruction', timeSec: 0 },
      { title: 'JVP Waves (a, c, v, x, y) vs ECG intervals', timeSec: 720 },
      { title: 'Systolic vs Diastolic Murmurs on PV loop', timeSec: 1500 },
      { title: 'Dynamic Auscultation (Squatting, Valsalva, Handgrip)', timeSec: 2400 }
    ]
  },
  {
    id: 'vid-med-01',
    title: 'Acute Coronary Syndrome: ECG Localisation & TIMI Risk Scoring',
    subject: 'Medicine',
    chapter: 'Cardiology & Intensive Coronary Care',
    topic: 'STEMI vs NSTEMI & Culprit Vessel Recognition',
    durationMinutes: 70,
    type: 'concept',
    faculty: 'Dr. Rathod Sathyapal (Founder & Lead Educator)',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    has3DModel: true,
    modelType: 'cardiac_anatomy',
    clinicalScenario: 'A 54-year-old diabetic smoker presents with crushing retrosternal chest pain radiating to the jaw and diaphoresis. ST elevation in II, III, aVF with reciprocal depression in I, aVL.',
    recentGuidelineUpdate: 'ACC/AHA 2025 Revascularization Timing in High-Risk ACS Guidelines',
    highYieldPoints: [
      'ST elevation in II, III, aVF = Inferior wall MI (RCA culprit in 85-90% patients). Always check V4R for RV involvement!',
      'In RV infarction, nitrates and diuretics are strictly contraindicated; treat hypotension with IV crystalloids.',
      'Wellens Syndrome Type A (biphasic T waves) & Type B (deeply inverted T waves in V2-V3) signals critical proximal LAD stenosis.'
    ],
    chaptersList: [
      { title: 'Pathophysiology of Plaque Rupture & Thrombus', timeSec: 0 },
      { title: 'ECG Lead Groups & Culprit Artery Mapping', timeSec: 600 },
      { title: 'Posterior & Right Ventricular Infarction Leads', timeSec: 1440 },
      { title: 'Primary PCI vs Fibrinolysis (Door-to-Balloon Rules)', timeSec: 2400 },
      { title: 'TIMI and GRACE Risk Scores in Practice', timeSec: 3300 }
    ]
  },
  {
    id: 'vid-med-02',
    title: 'Mechanical Ventilation & ARDS: P/F Ratio & Berlin Criteria',
    subject: 'Medicine',
    chapter: 'Pulmonology & Critical Care',
    topic: 'Acute Respiratory Distress Syndrome',
    durationMinutes: 52,
    type: 'revision',
    faculty: 'Dr. Rathod Sathyapal (Founder & Lead Educator)',
    thumbnail: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    has3DModel: false,
    clinicalScenario: 'A 42-year-old polytrauma patient develops severe dyspnea, bilateral diffuse infiltrates on chest X-ray, PaO2/FiO2 ratio of 140 mmHg on PEEP of 10 cm H2O. What is the lung-protective ventilation strategy?',
    recentGuidelineUpdate: 'New Global Definition of ARDS 2024 (Inclusion of High Flow Nasal Oxygen)',
    highYieldPoints: [
      'Lung-protective ventilation: Low tidal volume (4-8 mL/kg of predicted body weight, NOT actual weight).',
      'Target plateau pressure < 30 cm H2O and driving pressure < 15 cm H2O.',
      'Prone positioning for at least 16 hours/day in severe ARDS (P/F ratio < 150) dramatically reduces mortality (PROSEVA trial).'
    ],
    chaptersList: [
      { title: 'Berlin Criteria & 2024 Global Update', timeSec: 0 },
      { title: 'Ventilator Graphics: Pressure-Time & Flow-Time Curves', timeSec: 600 },
      { title: 'ARDSnet Low Tidal Volume Protocol', timeSec: 1320 },
      { title: 'Refractory Hypoxemia: Prone, Neuromuscular Blockade & ECMO', timeSec: 2100 }
    ]
  },
  {
    id: 'vid-surg-01',
    title: 'Acute Appendicitis vs Mesenteric Adenitis: Alvarado Score & Lap Anatomy',
    subject: 'Surgery',
    chapter: 'Gastrointestinal Surgery',
    topic: 'Right Iliac Fossa Pain Differential Diagnosis',
    durationMinutes: 44,
    type: 'rapid_revision',
    faculty: 'Dr. Rathod Sathyapal (Founder & Lead Educator)',
    thumbnail: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    has3DModel: false,
    clinicalScenario: 'A 19-year-old medical student develops periumbilical colicky pain that shifts to the right iliac fossa 12 hours later, accompanied by anorexia and low-grade fever.',
    recentGuidelineUpdate: 'WSES 2024 Jerusalem Guidelines for Diagnosis and Management of Acute Appendicitis',
    highYieldPoints: [
      "McBurney's point is at the junction of lateral one-third and medial two-thirds of the line from ASIS to umbilicus.",
      'Retrocecal is the most common position of appendix (65-70%), followed by pelvic (30%).',
      'Alvarado score >= 7 strongly indicates urgent surgical exploration.'
    ],
    chaptersList: [
      { title: 'Surgical Anatomy & Mesoappendix Artery', timeSec: 0 },
      { title: 'Clinical Signs: Rovsing, Psoas, Obturator, Dunphy', timeSec: 480 },
      { title: 'Alvarado (MANTRELS) Scoring & Ultrasound criteria', timeSec: 1100 },
      { title: 'Laparoscopic Appendectomy: 3-Port Technique & Complications', timeSec: 1800 }
    ]
  },
  {
    id: 'vid-pharm-01',
    title: 'Antimicrobial Resistance & Carbapenemase Inhibitors: New Guidelines',
    subject: 'Pharmacology',
    chapter: 'Chemotherapy & Antimicrobials',
    topic: 'Beta-Lactams, CRE, MRSA & P. aeruginosa',
    durationMinutes: 58,
    type: 'concept',
    faculty: 'Dr. Rathod Sathyapal (Founder & Lead Educator)',
    thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    has3DModel: false,
    clinicalScenario: 'An ICU patient with hospital-acquired pneumonia develops bacteremia with Klebsiella pneumoniae producing New Delhi Metallo-beta-lactamase (NDM-1). Which novel combinations are active?',
    recentGuidelineUpdate: 'IDSA 2024 Guidance on Treatment of Antimicrobial-Resistant Gram-Negative Infections',
    highYieldPoints: [
      'Avibactam, Vaborbactam, and Relebactam inhibit Class A (KPC) and Class C beta-lactamases, but NOT Class B metallo-beta-lactamases (NDM, VIM, IMP).',
      'Ceftazidime-avibactam + Aztreonam is the preferred regimen for NDM producers.',
      'Cefiderocol (siderophore cephalosporin) uses bacterial iron transport channels to bypass porin loss and efflux pumps.'
    ],
    chaptersList: [
      { title: 'Beta-Lactamase Classification (Ambler Classes A to D)', timeSec: 0 },
      { title: 'Novel Inhibitors: Avibactam, Vaborbactam, Relebactam', timeSec: 720 },
      { title: 'CRE Treatment Algorithm (IDSA 2024)', timeSec: 1560 },
      { title: 'MRSA and VRE Targeted Therapy', timeSec: 2400 }
    ]
  },
  {
    id: 'vid-path-01',
    title: 'Glomerulonephritis Spectrum: Light, IF & Electron Microscopy Patterns',
    subject: 'Pathology',
    chapter: 'Renal Pathology & Nephritic vs Nephrotic',
    topic: 'Membranous, FSGS, Post-Streptococcal & IgA Nephropathy',
    durationMinutes: 65,
    type: 'concept',
    faculty: 'Dr. Rathod Sathyapal (Founder & Lead Educator)',
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    has3DModel: true,
    modelType: 'nephron',
    clinicalScenario: 'A 7-year-old boy presents with smoky brown urine, periorbital puffiness, and hypertension 2 weeks after impetigo. Complement C3 is markedly decreased.',
    recentGuidelineUpdate: 'KDIGO 2024 Clinical Practice Guideline for the Management of Glomerular Diseases',
    highYieldPoints: [
      'PSGN: Subepithelial humps on EM, "lumpy-bumpy" granular IgG and C3 deposition on IF.',
      'Membranous Nephropathy: Subepithelial "spike and dome" pattern, PLA2R autoantibodies in 75-80% primary cases.',
      'Minimal Change Disease: Normal glomeruli on LM, negative IF, diffuse effacement of podocyte foot processes on EM.'
    ],
    chaptersList: [
      { title: 'Normal Glomerular Filtration Barrier Anatomy', timeSec: 0 },
      { title: 'Nephritic vs Nephrotic Syndrome Diagnostic Algorithm', timeSec: 540 },
      { title: 'Biopsy Patterns: Light, Immunofluorescence & EM side-by-side', timeSec: 1380 },
      { title: 'High-Yield Board Vignettes & Image Recognition', timeSec: 2700 }
    ]
  },
  {
    id: 'vid-obg-01',
    title: 'Postpartum Hemorrhage (PPH) Management & Active 3rd Stage of Labor',
    subject: 'Obstetrics & Gynaecology',
    chapter: 'Obstetric Emergencies & Labor Complications',
    topic: 'Uterine Atony, B-Lynch Suture & Bakri Balloon',
    durationMinutes: 50,
    type: 'rapid_revision',
    faculty: 'Dr. Rathod Sathyapal (Founder & Lead Educator)',
    thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
    has3DModel: false,
    clinicalScenario: 'A 28-year-old P2L2 delivers a 3.9 kg baby. 15 minutes after placental delivery, she has torrential vaginal bleeding (850 mL) and the uterus is soft, flabby and boggy above the umbilicus.',
    recentGuidelineUpdate: 'WHO 2024 Updated Recommendations on Uterotonics for PPH Prevention',
    highYieldPoints: [
      'The 4 "T"s of PPH etiology: Tone (Atony ~70%), Trauma (20%), Tissue (retained placenta 10%), Thrombin (<1%).',
      'First-line uterotonic is Oxytocin 10 IU IM/IV infusion; Carboprost (PGF2alpha) is contraindicated in bronchial asthma.',
      'Surgical step-ladder: Uterine massage -> Medical uterotonics -> Intrauterine balloon tamponade -> B-Lynch brace suture -> Internal iliac (hypogastric) artery ligation -> Peripartum hysterectomy.'
    ],
    chaptersList: [
      { title: 'Definition (Blood loss >= 500 mL vaginal, >= 1000 mL CS)', timeSec: 0 },
      { title: 'Active Management of 3rd Stage of Labor (AMTSL)', timeSec: 420 },
      { title: 'Uterotonic Drug Ladder (Oxytocin, Ergometrine, Carboprost, Misoprostol)', timeSec: 1080 },
      { title: 'Tamponade & Surgical Compressive Sutures (B-Lynch, Hayman)', timeSec: 1800 }
    ]
  },
  {
    id: 'vid-paed-01',
    title: 'Congenital Heart Diseases: Cyanotic vs Acyanotic Shunts in Newborns',
    subject: 'Paediatrics',
    chapter: 'Paediatric Cardiology',
    topic: 'TOF, TGA, VSD & PDA Hemodynamics',
    durationMinutes: 56,
    type: 'concept',
    faculty: 'Dr. Rathod Sathyapal (Founder & Lead Educator)',
    thumbnail: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    has3DModel: true,
    modelType: 'cardiac_anatomy',
    clinicalScenario: 'A 2-month-old infant becomes deeply cyanotic, irritable, and tachypneic during feeding. Drawing the knees to chest rapidly alleviates the spell. Explain the hemodynamic mechanism.',
    recentGuidelineUpdate: 'IAP 2024 Consensus on Pulse Oximetry Screening for Critical CHD in Newborns',
    highYieldPoints: [
      'Tetralogy of Fallot (TOF) 4 components: VSD, Overriding aorta, Subpulmonic stenosis (determines severity), RV hypertrophy.',
      'Knee-chest position in Tet spells increases systemic vascular resistance (SVR), reversing the right-to-left shunt into left-to-right.',
      'Boot-shaped heart (coeur en sabot) on chest X-ray is classic for TOF; Egg-on-string appearance is classic for TGA.'
    ],
    chaptersList: [
      { title: 'Fetal Circulation Transitions at Birth', timeSec: 0 },
      { title: 'The 5 Cyanotic Heart Diseases (1, 2, 3, 4, 5 mnemonic)', timeSec: 540 },
      { title: 'Tetralogy of Fallot: Anatomy, Auscultation & Spell Treatment', timeSec: 1380 },
      { title: 'Ductus-Dependent Lesions & Prostaglandin E1 Infusion', timeSec: 2280 }
    ]
  }
];
