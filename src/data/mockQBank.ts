import { MCQ } from '../types';

export const MOCK_MCQS: MCQ[] = [
  {
    id: 'mcq-001',
    subject: 'General Medicine',
    chapter: 'Cardiology & ECG Mastery',
    topic: 'Acute Coronary Syndromes',
    stem: 'A 56-year-old male with long-standing type 2 diabetes mellitus is brought to the emergency department with acute onset severe retrosternal chest pain radiating to the jaw, accompanied by profuse diaphoresis and nausea. On arrival, heart rate is 54 bpm, BP is 86/52 mmHg, and respiratory rate is 20/min. Jugular venous distention is noted up to 7 cm above the sternal angle with clear lung fields bilaterally on auscultation. A 12-lead ECG shows 3.5 mm ST-segment elevation in leads II, III, and aVF with reciprocal ST depression in leads I and aVL. A right-sided precordial lead (V4R) demonstrates 2 mm ST elevation.\n\nWhich of the following is the most appropriate initial pharmacological hemodynamic management for this patient?',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    imageCaption: '12-lead ECG demonstrating ST-elevation in inferior leads II, III, aVF and lead V4R',
    options: [
      { id: 'opt-a', text: 'Sublingual Nitroglycerin 0.4 mg every 5 minutes' },
      { id: 'opt-b', text: 'Intravenous normal saline 500 mL bolus over 15 minutes' },
      { id: 'opt-c', text: 'Intravenous Morphine sulphate 4 mg push' },
      { id: 'opt-d', text: 'Intravenous Furosemide 40 mg push' }
    ],
    correctOptionId: 'opt-b',
    detailedExplanation: `### Clinical Rationale & Hemodynamic Analysis
This patient presents with acute inferior wall myocardial infarction complicated by **Right Ventricular Myocardial Infarction (RVMI)**, indicated by:
1. ST-elevation in II, III, aVF (Inferior MI, usually Right Coronary Artery - RCA occlusion).
2. ST-elevation >= 1 mm in right-sided lead **V4R** (pathognomonic sensitivity ~88%, specificity ~78% for RV involvement).
3. The classic clinical triad of RVMI: **Hypotension + Elevated JVP + Clear lung fields** (absence of pulmonary edema).

### Why IV Fluid Bolus (Option B) is Correct:
The infarcted right ventricle loses contractile power, making right ventricular forward output heavily dependent on **preload** (end-diastolic filling pressure). Administering isotonic crystalloid (IV normal saline) increases venous return, stretching the ischemic right ventricle and boosting left ventricular filling via passive transpulmonary flow, thereby restoring blood pressure and cardiac output.

### Why Distractors are Dangerous:
* **Option A (Nitroglycerin) & Option C (Morphine):** Both are potent venodilators that drastically reduce preload. In RVMI, nitroglycerin can trigger catastrophic cardiovascular collapse and refractory cardiogenic shock.
* **Option D (Furosemide):** Diuretics cause intravascular volume depletion, worsening preload failure in a patient who already has clear lungs.`,
    highYieldSummary: 'Inferior STEMI + ST-elevation in V4R = Right Ventricular Infarction. Triad: Hypotension, Raised JVP, Clear Lungs. First-line therapy: Rapid IV isotonic fluids. Contraindicated: Nitrates, Diuretics, Morphine.',
    isHighYield: true,
    isClinicalVignette: true,
    isImageBased: true,
    examSource: 'NEET-PG',
    examYear: 2024,
    difficulty: 'Hard',
    peerAccuracy: 58,
    guidelineReference: 'ACC/AHA 2025 STEMI Clinical Practice Guidelines',
    pearlId: 'pearl-002',
    schemaId: 'schema-002'
  },
  {
    id: 'mcq-002',
    subject: 'General Surgery',
    chapter: 'GI Tract & Acute Abdomen',
    topic: 'Intestinal Obstruction',
    stem: 'A 74-year-old institutionalized male with a history of chronic Parkinsonism and severe constipation presents with severe abdominal distention, obstipation, and crampy lower abdominal pain for the past 2 days. On physical examination, the abdomen is massively distended and tympanitic to percussion with high-pitched tinkling bowel sounds. An abdominal radiograph reveals a hugely dilated, gas-filled loop of bowel extending from the left lower quadrant upwards towards the right upper quadrant, resembling a "bent inner tube" or "coffee bean". There are no peritoneal signs or fever.\n\nWhat is the most appropriate initial management in this hemodynamically stable patient?',
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Abdominal radiograph showing characteristic inverted U-shaped dilated loop ("Coffee Bean sign")',
    options: [
      { id: 'opt-a', text: 'Emergency exploratory laparotomy with Hartman procedure' },
      { id: 'opt-b', text: 'Rigid sigmoidoscopy with flatus tube insertion for endoscopic derotation' },
      { id: 'opt-c', text: 'Barium contrast enema examination' },
      { id: 'opt-d', text: 'Intravenous neostigmine 2 mg infusion' }
    ],
    correctOptionId: 'opt-b',
    detailedExplanation: `### Diagnostic Discussion: Sigmoid Volvulus
The clinical picture and characteristic radiograph ("Coffee bean sign" / inverted U-shape / bent inner tube) point conclusively to **Sigmoid Volvulus**, the most common type of colonic volvulus in elderly, bedridden patients with neuropsychiatric disorders.

### Stepwise Management:
1. **Initial Step (Hemodynamically stable without peritonitis):**
   * Non-operative decompression via **rigid or flexible sigmoidoscopy with gentle insertion of a well-lubricated flatus tube**.
   * Success rate exceeds 75-85%, releasing massive flatus and liquid stool with immediate clinical relief.
   * Flatus tube is left in place for 24-48 hours to prevent instant recurrence.
2. **Subsequent Definitive Management:**
   * Recurrence occurs in up to 50-60% of cases after decompression alone. Therefore, elective sigmoid resection with primary anastomosis during the same hospital admission is recommended.
3. **Emergency Laparotomy (Option A):** Indicated only if there is evidence of bowel strangulation, necrosis, perforation, peritonitis, or failure of endoscopic decompression.`,
    highYieldSummary: 'Sigmoid Volvulus: Coffee bean sign pointing to RUQ. Initial management in stable patient: Rigid/flexible sigmoidoscopy decompression + flatus tube. Cecal Volvulus: Bird of beak pointing to LUQ, requires emergency surgery.',
    isHighYield: true,
    isClinicalVignette: true,
    isImageBased: true,
    examSource: 'INI-CET',
    examYear: 2024,
    difficulty: 'Medium',
    peerAccuracy: 71,
    guidelineReference: 'Bailey & Love 28th Ed, Chapter 71: Intestinal Obstruction',
    pearlId: 'pearl-003',
    schemaId: 'schema-003'
  },
  {
    id: 'mcq-003',
    subject: 'Pathology',
    chapter: 'Renal & Uropathology',
    topic: 'Nephrotic Syndrome',
    stem: 'A 48-year-old male presents with generalized anasarca, foamy urine, and a 7 kg weight gain over 3 weeks. Urinalysis shows 4+ proteinuria, 24-hour urinary protein is 7.2 g, serum albumin is 1.9 g/dL, and total cholesterol is 380 mg/dL. Renal biopsy shows diffuse uniform thickening of the glomerular capillary wall on light microscopy without cellular proliferation. Jones silver methenamine stain reveals prominent "spike and dome" projections along the basement membrane. Immunofluorescence displays granular deposition of IgG and C3 along the glomerular basement membrane.\n\nWhich of the following circulating autoantibodies is most commonly associated with this patient condition in primary cases?',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Silver methenamine stain demonstrating classic subepithelial black "spikes" extending between immune deposits',
    options: [
      { id: 'opt-a', text: 'Anti-phospholipase A2 receptor (PLA2R) antibodies' },
      { id: 'opt-b', text: 'Anti-glomerular basement membrane (anti-GBM) antibodies' },
      { id: 'opt-c', text: 'Anti-neutrophil cytoplasmic antibodies (p-ANCA / MPO)' },
      { id: 'opt-d', text: 'Anti-double stranded DNA (anti-dsDNA) antibodies' }
    ],
    correctOptionId: 'opt-a',
    detailedExplanation: `### Case Diagnosis: Membranous Nephropathy (MN)
The clinical presentation (heavy nephrotic syndrome) combined with renal biopsy findings—diffuse uniform capillary wall thickening, **"Spike and Dome" appearance on Silver stain**, and granular subepithelial IgG/C3 on immunofluorescence—is definitive for **Membranous Nephropathy**.

### High-Yield Etiology & Pathogenesis:
* **Primary / Idiopathic Membranous Nephropathy (70-85% of cases):**
  * Mediated by autoantibodies against the **M-type phospholipase A2 receptor (anti-PLA2R)** in ~75-80% of adult patients.
  * Second most common: Anti-thrombospondin type-1 domain-containing 7A (**anti-THSD7A**, ~3-5%).
  * Titers of anti-PLA2R correlate strongly with disease activity, proteinuria, and response to immunosuppressive therapy.
* **Secondary Causes:** Malignancy (lung, colon, breast), Hepatitis B and C, SLE (Class V), NSAIDs, Gold, Penicillamine.`,
    highYieldSummary: 'Membranous Nephropathy = Spike and Dome on Silver Stain + Subepithelial humps/deposits. Primary MN is driven by Anti-PLA2R antibodies in 80% cases. Most common nephrotic syndrome associated with renal vein thrombosis.',
    isHighYield: true,
    isClinicalVignette: true,
    isImageBased: true,
    examSource: 'NEET-PG',
    examYear: 2023,
    difficulty: 'Medium',
    peerAccuracy: 66,
    guidelineReference: 'KDIGO 2025 Clinical Practice Guideline for the Management of Glomerular Diseases',
    pearlId: 'pearl-004',
    schemaId: 'schema-004'
  },
  {
    id: 'mcq-004',
    subject: 'Anatomy',
    chapter: 'Neuroanatomy & Cranial Nerves',
    topic: 'Brainstem Syndromes',
    stem: 'A 62-year-old hypertensive female suddenly develops severe vertigo, intractable hiccups, vomiting, and dysphagia. Neurological examination reveals:\n- Ipsilateral Horner syndrome (miosis, partial ptosis, anhidrosis)\n- Ipsilateral loss of pain and temperature over the face\n- Contralateral loss of pain and temperature over the trunk and extremities\n- Ipsilateral cerebellar ataxia with dysdiadochokinesia\n- Absent gag reflex on the ipsilateral side with vocal cord paralysis\n\nMotor strength is 5/5 in all four extremities. Which blood vessel is most likely occluded?',
    options: [
      { id: 'opt-a', text: 'Posterior Inferior Cerebellar Artery (PICA)' },
      { id: 'opt-b', text: 'Anterior Spinal Artery (ASA)' },
      { id: 'opt-c', text: 'Basilar artery paramedian branches' },
      { id: 'opt-d', text: 'Anterior Inferior Cerebellar Artery (AICA)' }
    ],
    correctOptionId: 'opt-a',
    detailedExplanation: `### Anatomical Localization: Lateral Medullary (Wallenberg) Syndrome
This classic syndrome results from ischemia in the territory supplied by the **Posterior Inferior Cerebellar Artery (PICA)** or its parent **Vertebral Artery**.

### Structure-to-Sign Anatomical Correlation:
* **Spinal trigeminal nucleus & tract:** Ipsilateral loss of facial pain and temperature.
* **Spinothalamic tract:** Contralateral loss of body pain and temperature.
* **Descending sympathetic tract:** Ipsilateral Horner syndrome.
* **Nucleus ambiguus (CN IX, X):** Dysphagia, dysarthria, hoarseness, loss of gag reflex (Key differentiator from AICA syndrome!).
* **Vestibular nuclei:** Vertigo, nystagmus, nausea/vomiting.
* **Inferior cerebellar peduncle:** Ipsilateral limb ataxia.
* **Medullary tegmentum (respiratory/vagus centers):** Intractable hiccups.

### Key Negative Finding:
**Normal motor power (5/5)**: The corticospinal tract lies in the anteromedial medulla (pyramids), which is supplied by the Anterior Spinal Artery (ASA) and spared in Wallenberg syndrome.`,
    highYieldSummary: 'Lateral Medullary (Wallenberg) Syndrome = PICA or Vertebral Artery occlusion. Triad: Horner syndrome + Crossed sensory loss + Dysphagia/hoarseness (Nucleus Ambiguus). Motor strength is intact (pyramids spared).',
    isHighYield: true,
    isClinicalVignette: true,
    isImageBased: false,
    examSource: 'INI-CET',
    examYear: 2025,
    difficulty: 'Hard',
    peerAccuracy: 52,
    guidelineReference: 'Snell Clinical Neuroanatomy 8th Edition',
    pearlId: 'pearl-001',
    schemaId: 'schema-001'
  },
  {
    id: 'mcq-005',
    subject: 'Pharmacology',
    chapter: 'Antimicrobial Agents',
    topic: 'Beta-Lactams & Resistance',
    stem: 'A 34-year-old woman admitted to the intensive care unit with ventilator-associated pneumonia grows Pseudomonas aeruginosa from endotracheal aspirate cultures. The isolate is found to produce an extended-spectrum metallo-beta-lactamase (NDM-1 positive). Which of the following antimicrobial regimens retains bactericidal activity against this metallo-beta-lactamase-producing strain?',
    options: [
      { id: 'opt-a', text: 'Meropenem + Vaborbactam' },
      { id: 'opt-b', text: 'Ceftazidime + Avibactam combined with Aztreonam' },
      { id: 'opt-c', text: 'Ceftolozane + Tazobactam' },
      { id: 'opt-d', text: 'Piperacillin + Tazobactam' }
    ],
    correctOptionId: 'opt-b',
    detailedExplanation: `### Metallo-Beta-Lactamase (MBL) Resistance Mechanism
Metallo-beta-lactamases (such as **NDM-1, VIM, IMP**) are Class B beta-lactamases that utilize a divalent zinc ion (Zn2+) in their active catalytic site. They hydrolyze almost all beta-lactams including carbapenems, and are NOT inhibited by standard serine beta-lactamase inhibitors (clavulanate, tazobactam, vaborbactam, or relebactam).

### The Synergistic Solution: Ceftazidime-Avibactam + Aztreonam
* **Aztreonam** (a monobactam) is structurally resistant to hydrolysis by Class B metallo-beta-lactamases.
* However, MBL-producing clinical isolates almost universally co-produce Class A (ESBL) or Class C (AmpC) beta-lactamases that rapidly destroy aztreonam.
* **Avibactam** is a non-beta-lactam diazabicyclooctane inhibitor that potently neutralizes these co-existing serine beta-lactamases, thereby protecting Aztreonam so it can bind to PBP-3 and exert bactericidal killing.
* Hence, **Ceftazidime-Avibactam + Aztreonam** is the guideline-recommended synergistic combination for NDM-1 infections.`,
    highYieldSummary: 'NDM-1 / Metallo-beta-lactamases require zinc and hydrolyze carbapenems. Aztreonam is naturally immune to MBLs. Adding Avibactam protects Aztreonam from companion serine beta-lactamases. Drug of choice: CZA + Aztreonam or Cefiderocol.',
    isHighYield: true,
    isClinicalVignette: true,
    isImageBased: false,
    examSource: 'NEET-PG',
    examYear: 2024,
    difficulty: 'Hard',
    peerAccuracy: 44,
    guidelineReference: 'IDSA 2024-2025 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections',
    pearlId: 'pearl-005',
    schemaId: 'schema-005'
  },
  {
    id: 'mcq-006',
    subject: 'Obstetrics & Gynaecology',
    chapter: 'Obstetric Complications & PPH',
    topic: 'Postpartum Hemorrhage',
    stem: 'A 28-year-old G2P1 woman at 39 weeks gestation undergoes an uncomplicated vaginal delivery of a 4.1 kg infant. Fifteen minutes after delivery of the placenta, brisk continuous vaginal hemorrhage begins. Physical examination shows the uterine fundus is soft, boggy, and palpated 3 cm above the umbilicus. Maternal blood pressure is 92/58 mmHg, and pulse is 114 bpm. Uterine massage is commenced, and 20 units of Oxytocin in 1 L lactated Ringer solution is running rapidly. The patient has a known history of moderate bronchial asthma treated with inhaled budesonide-formoterol.\n\nWhich of the following second-line uterotonic drugs is strictly CONTRAINDICATED in this patient?',
    options: [
      { id: 'opt-a', text: 'Carboprost tromethamine (15-methyl PGF2-alpha)' },
      { id: 'opt-b', text: 'Methylergometrine 0.2 mg IM' },
      { id: 'opt-c', text: 'Misoprostol (PGE1) 800 mcg rectal' },
      { id: 'opt-d', text: 'Tranexamic acid 1 g IV' }
    ],
    correctOptionId: 'opt-a',
    detailedExplanation: `### Management of Atonic PPH & Uterotonic Contraindications
The patient has **Atonic Postpartum Hemorrhage** (soft, boggy uterus above umbilicus following delivery of a macrosomic fetus).

### Drug Specific Contraindications:
1. **Carboprost tromethamine (PGF2-alpha):**
   * Acts on smooth muscle prostaglandin receptors, causing intense **bronchoconstriction** and ventilation-perfusion mismatch.
   * **Absolute Contraindication: Bronchial asthma.**
2. **Methylergometrine / Ergometrine:**
   * Causes alpha-adrenergic vasoconstriction and generalized arterial spasm.
   * **Contraindication: Hypertension, Pre-eclampsia, Coronary artery disease.** (Safe in asthma without hypertension).
3. **Misoprostol (PGE1):**
   * Bronchodilator properties; completely safe in bronchial asthma.
4. **Tranexamic Acid:**
   * Antifibrinolytic; recommended within 3 hours of PPH onset in all patients (WOMAN trial).`,
    highYieldSummary: 'PPH Drug Contraindications: Carboprost (PGF2a) is strictly contraindicated in ASTHMA (bronchospasm). Methylergometrine is strictly contraindicated in HYPERTENSION / PRE-ECLAMPSIA (vasoconstriction).',
    isHighYield: true,
    isClinicalVignette: true,
    isImageBased: false,
    examSource: 'FMGE',
    examYear: 2024,
    difficulty: 'Easy',
    peerAccuracy: 84,
    guidelineReference: 'FIGO 2025 Guidelines for Prevention and Treatment of Postpartum Hemorrhage',
    pearlId: 'pearl-006',
    schemaId: 'schema-006'
  },
  {
    id: 'mcq-007',
    subject: 'Paediatrics',
    chapter: 'Pediatric Cardiology (Cyanotic/Acyanotic)',
    topic: 'Congenital Heart Defects',
    stem: 'A 14-month-old male infant is brought to the clinic due to episodic blue discoloration around his lips and fingers, particularly during crying or feeding. During these episodes, he spontaneously squats or draws his knees towards his chest, which appears to ease his symptoms. Cardiovascular examination reveals a grade 3/6 harsh ejection systolic murmur heard best along the left upper sternal border. An arterial blood gas during a crying episode reveals PaO2 of 42 mmHg. A chest X-ray shows an upturned cardiac apex with a concave pulmonary artery segment ("coeur en sabot" or boot-shaped heart).\n\nWhat is the exact physiological mechanism by which squatting improves systemic arterial oxygen saturation in this condition?',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Chest radiograph showing characteristic upturned cardiac apex (boot-shaped heart) and dark oligemic lung fields',
    options: [
      { id: 'opt-a', text: 'Increases Systemic Vascular Resistance (SVR), decreasing right-to-left shunt across the VSD' },
      { id: 'opt-b', text: 'Decreases Systemic Vascular Resistance (SVR), increasing left ventricular afterload' },
      { id: 'opt-c', text: 'Increases Pulmonary Vascular Resistance (PVR), directing blood to the bronchial arteries' },
      { id: 'opt-d', text: 'Relaxes the infundibular pulmonary stenosis through beta-adrenergic stimulation' }
    ],
    correctOptionId: 'opt-a',
    detailedExplanation: `### Physiology of Tetralogy of Fallot & Squatting
The infant presents with a hypercyanotic spell ("Tet spell") secondary to **Tetralogy of Fallot (TOF)**:
1. Large ventricular septal defect (VSD)
2. Right ventricular outflow tract obstruction (infundibular pulmonary stenosis)
3. Overriding aorta
4. Right ventricular hypertrophy (manifesting as upturned apex / "coeur en sabot" on CXR)

### Hemodynamic Mechanism of Squatting:
* When the child squats or is placed in knee-chest position, **kinking of the femoral arteries** and compression of lower-body muscular arteries markedly **increases Systemic Vascular Resistance (SVR)**.
* Increased SVR raises Left Ventricular systolic pressure relative to Right Ventricular pressure.
* This pressure gradient **reverses or reduces the right-to-left shunt** across the VSD, forcing more deoxygenated blood forward through the stenosed pulmonary valve into the lungs for oxygenation!
* Squatting also increases venous return, augmenting RV preload.`,
    highYieldSummary: 'Squatting in TOF kinks femoral arteries -> elevates Systemic Vascular Resistance (SVR) -> decreases right-to-left VSD shunt -> increases pulmonary blood flow and PaO2. CXR sign: Boot-shaped heart (coeur en sabot).',
    isHighYield: true,
    isClinicalVignette: true,
    isImageBased: true,
    examSource: 'NEET-PG',
    examYear: 2024,
    difficulty: 'Medium',
    peerAccuracy: 74,
    guidelineReference: 'Nelson Textbook of Pediatrics 21st Edition, Chapter 458',
    pearlId: 'pearl-007',
    schemaId: 'schema-007'
  },
  {
    id: 'mcq-008',
    subject: 'Microbiology',
    chapter: 'Medical Mycology',
    topic: 'Opportunistic Fungi',
    stem: 'A 42-year-old male with poorly controlled type 1 diabetes mellitus presents to the casualty with severe facial pain, periorbital swelling, proptosis, and blood-tinged nasal discharge. Nasal endoscopy reveals extensive black necrotic eschars covering the right middle turbinate and hard palate. A biopsy of the necrotic eschar with calcofluor white and silver staining reveals broad (10-25 mcm), non-septate or sparsely septate hyphae with irregular right-angle (90 degree) branching.\n\nWhich of the following is the most definitive initial treatment of choice for this condition?',
    options: [
      { id: 'opt-a', text: 'Immediate surgical debridement plus intravenous Liposomal Amphotericin B' },
      { id: 'opt-b', text: 'Intravenous Fluconazole 800 mg loading dose' },
      { id: 'opt-c', text: 'Intravenous Voriconazole monotherapy' },
      { id: 'opt-d', text: 'Hyperbaric oxygen therapy alone' }
    ],
    correctOptionId: 'opt-a',
    detailedExplanation: `### Case Presentation: Rhino-Orbital-Cerebral Mucormycosis
The clinical features (diabetic ketoacidosis/poorly controlled diabetes, periorbital cellulitis, black necrotic eschars on palate/turbinate) along with biopsy showing **broad, ribbon-like, non-septate hyphae with 90-degree wide-angle branching** confirm **Mucormycosis (Zygomycosis)** (Rhizopus, Mucor, Lichtheimia).

### Why Voriconazole is Ineffective:
Voriconazole has **zero activity** against Mucorales; in fact, voriconazole prophylaxis in hematology patients is a known risk factor for breakthrough mucormycosis! (Voriconazole is drug of choice for Aspergillus, which has narrow septate hyphae with 45-degree acute branching).

### Dual Cornerstone Treatment:
1. **Urgent, aggressive surgical debridement** to clear all necrotic, angioinvasive tissue.
2. High-dose **Intravenous Liposomal Amphotericin B** (5-10 mg/kg/day).
3. Correction of underlying metabolic acidosis and hyperglycemia.`,
    highYieldSummary: 'Mucor: Broad, non-septate, ribbon-like hyphae with right-angle (90 deg) branching. Angioinvasive -> black necrotic eschar. Treatment: Immediate radical debridement + IV Liposomal Amphotericin B. Resistant to Voriconazole.',
    isHighYield: true,
    isClinicalVignette: true,
    isImageBased: false,
    examSource: 'INI-CET',
    examYear: 2024,
    difficulty: 'Medium',
    peerAccuracy: 80,
    guidelineReference: 'ECMM/MSG Global Guideline for the Diagnosis and Management of Mucormycosis',
    pearlId: 'pearl-008',
    schemaId: 'schema-008'
  }
];
