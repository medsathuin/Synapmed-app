import { Pearl } from '../types';

export const MOCK_PEARLS: Pearl[] = [
  {
    id: 'pearl-001',
    pearlNumber: 1042,
    subject: 'Anatomy',
    topic: 'Neuroanatomy',
    title: 'Lateral Medullary vs Lateral Pontine Syndromes',
    keyPoints: [
      'Lateral Medullary (Wallenberg) = PICA occlusion -> Nucleus Ambiguus affected (CN 9, 10) -> Dysphagia, Hoarseness, Absent gag reflex.',
      'Lateral Pontine Syndrome = AICA occlusion -> Facial Motor Nucleus affected (CN 7) -> Ipsilateral Bell-like Facial Droop, Sensorineural deafness (CN 8).',
      'Both syndromes have: Ipsilateral Horner syndrome, Ataxia (ICP), and Crossed sensory loss (ipsilateral face + contralateral body).',
      'Memory aid: "Don\'t Pick a (PICA) horse (Hoarseness) that can\'t eat (Dysphagia)" | "AICA = Facial paralysis (Facial motor nucleus)".'
    ],
    mnemonic: 'PICA = Palate / Pharynx / Hoarse | AICA = Auditory / Facial palsy',
    clinicalSignificance: 'Emergency room stroke differentiator: vocal cord and palatal paralysis pinpoint medulla, whereas lower motor neuron facial weakness pinpoints pons.',
    buzzwords: ['Wallenberg', 'PICA', 'Nucleus Ambiguus', 'Horner syndrome', 'AICA']
  },
  {
    id: 'pearl-002',
    pearlNumber: 2115,
    subject: 'General Medicine',
    topic: 'Cardiology',
    title: 'Right Ventricular Infarction Triad & Management Rules',
    keyPoints: [
      'Clinical Triad: Hypotension + Elevated JVP + Clear lung fields (lungs are clean because fluid cannot cross the failed RV).',
      'Diagnostic Lead: ST-elevation >= 1mm in V4R (Right-sided chest lead). Most specific ECG sign.',
      'Culprit Vessel: Proximal Right Coronary Artery (RCA) occlusion prior to the acute marginal branch.',
      'Preload Dependency: The ischemic RV acts as a passive conduit. Treatment is IV crystalloid loading (Normal Saline 500-1000 mL boluses).',
      'Lethal Pitfall: Nitrates, Morphine, and Diuretics drop venous return and cause fatal refractory cardiovascular collapse!'
    ],
    mnemonic: 'RVMI Triad = Hypotension + High JVP + Dry Lungs. Fluid is Friend, Nitrate is Foe.',
    clinicalSignificance: 'Every inferior STEMI patient with hypotension must have a right-sided ECG (V3R, V4R) before giving anti-anginal vasodilators.',
    buzzwords: ['V4R', 'RCA', 'Preload dependent', 'Avoid Nitrates', 'Clear lung fields']
  },
  {
    id: 'pearl-003',
    pearlNumber: 3088,
    subject: 'General Surgery',
    topic: 'Acute Abdomen',
    title: 'Volvulus Comparison: Sigmoid vs Cecal',
    keyPoints: [
      'Sigmoid Volvulus: 75% of colonic volvulus. Elderly, bedridden, institutionalized, chronic constipation. Coffee bean sign pointing to RUQ. Initial management: Sigmoidoscopic decompression + flatus tube.',
      'Cecal Volvulus: 25% of colonic volvulus. Younger patients (30-50 yrs), marathon runners, pregnant females with mobile cecum. Teardrop / bird of prey sign pointing to LUQ. Initial management: Urgent Laparotomy + Right Hemicolectomy (endoscopic reduction contraindicated!).'
    ],
    mnemonic: 'Sigmoid = Senior / Slow / Sigmoidoscope to RUQ | Cecal = Childbearing / Cut (Surgery) to LUQ',
    clinicalSignificance: 'Never attempt endoscopic detorsion in cecal volvulus due to extreme perforation risk and high failure rate (>95%).',
    buzzwords: ['Coffee bean sign', 'Bird of prey', 'Flatus tube', 'Laparotomy']
  },
  {
    id: 'pearl-004',
    pearlNumber: 4210,
    subject: 'Pathology',
    topic: 'Glomerular Diseases',
    title: 'Electron Microscopy & Silver Stain Hallmarks in Nephrology',
    keyPoints: [
      'Minimal Change Disease: Normal LM, Normal IF, Diffuse effacement of podocyte foot processes on EM.',
      'Membranous Nephropathy: Subepithelial spikes ("Spike and Dome") on Silver stain, granular IgG/C3 on IF, anti-PLA2R antibodies.',
      'Post-Streptococcal GN (PSGN): Large dome-shaped subepithelial electron-dense humps, "Starry-sky" lumpy-bumpy IF.',
      'Goodpasture Syndrome: Smooth, linear ribbon-like IgG deposition along GBM (Anti-Type IV collagen alpha-3 chain).',
      'Alport Syndrome: Basket-weave appearance of GBM with alternating thinning and thickening (COL4A5 X-linked).'
    ],
    mnemonic: 'Sub-EPI = PSGN & Membranous | Sub-ENDO = Lupus (DPGN) & MPGN Type 1',
    clinicalSignificance: 'Core histopathological discriminator asked in 100% of medical PG entrance examinations.',
    buzzwords: ['Spike and dome', 'Subepithelial humps', 'Linear IgG', 'Basket weave', 'Podocyte effacement']
  },
  {
    id: 'pearl-005',
    pearlNumber: 5122,
    subject: 'Pharmacology',
    topic: 'Antimicrobials',
    title: 'Carbapenemase Classification & Rescue Agents',
    keyPoints: [
      'Class A (KPC): Serine beta-lactamase -> Inhibited by Avibactam and Vaborbactam (Meropenem-Vaborbactam or Ceftazidime-Avibactam).',
      'Class B (NDM-1, VIM, IMP): Metallo-beta-lactamase (requires Zn2+) -> Hydrolyzes all carbapenems; Aztreonam is naturally resistant. Treatment: Ceftazidime-Avibactam + Aztreonam, or Cefiderocol.',
      'Class D (OXA-48): Serine carbapenemase -> Inhibited by Avibactam (Ceftazidime-Avibactam).',
      'Cefiderocol (Siderophore cephalosporin): "Trojan horse" enters bacterial iron transport systems; active against ALL three classes (A, B, D).'
    ],
    mnemonic: 'Class B = Metallo = Zinc = Aztreonam survives (MZA)',
    clinicalSignificance: 'Empiric ICU therapy for pandrug-resistant Klebsiella and Pseudomonas in septic shock.',
    buzzwords: ['NDM-1', 'Metallo-beta-lactamase', 'Aztreonam + Avibactam', 'Cefiderocol', 'KPC']
  },
  {
    id: 'pearl-006',
    pearlNumber: 6019,
    subject: 'Obstetrics & Gynaecology',
    topic: 'Obstetrics',
    title: 'Postpartum Hemorrhage 4 Ts & Uterotonic Contraindications',
    keyPoints: [
      'The 4 Ts: Tone (70-80% - Atony), Trauma (20% - Lacerations), Tissue (10% - Retained cotyledons), Thrombin (1% - DIC).',
      'Carboprost (PGF2-alpha, 250 mcg IM): Potent bronchoconstrictor. STRICT CONTRAINDICATION: Asthma.',
      'Methylergometrine (0.2 mg IM): Alpha-1 vasoconstrictor. STRICT CONTRAINDICATION: Hypertension, Pre-eclampsia.',
      'Oxytocin (10-20 units): First line, safe in all.',
      'Tranexamic Acid (1 g IV over 10 min): Must be administered within 3 hours of delivery (WOMAN Trial).'
    ],
    mnemonic: 'CarboPROST = PROSTrate the lungs (Asthma) | METHERGINE = Makes Pressure Rise (Hypertension)',
    clinicalSignificance: 'Prevents iatrogenic death in labor room emergencies by selecting safe secondary uterotonics.',
    buzzwords: ['Uterine atony', 'Carboprost contraindicated in asthma', 'Methergine in preeclampsia', 'Tranexamic acid']
  }
];
