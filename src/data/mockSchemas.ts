import { SchemaDiagram } from '../types';

export const MOCK_SCHEMAS: SchemaDiagram[] = [
  {
    id: 'schema-001',
    title: 'Arterial Blood Gas (ABG) & Acid-Base Disorders Algorithm',
    subject: 'General Medicine',
    category: 'Diagnostic Flowchart',
    description: 'Systematic 4-step algorithm to crack simple, compensated, and triple mixed acid-base abnormalities.',
    steps: [
      {
        stepNumber: 1,
        title: 'Determine Primary Disturbance from pH',
        condition: 'pH < 7.35 = Acidemia | pH > 7.45 = Alkalemia | pH 7.35-7.45 = Normal or Mixed',
        actionOrFinding: 'Check PaCO2 and [HCO3-]. If pH and PaCO2 move in opposite directions -> Primary Respiratory. If pH and HCO3 move in same direction -> Primary Metabolic.',
        highYieldPearl: 'The body NEVER overcompensates. Normal pH with abnormal PaCO2 and HCO3 indicates a mixed disorder!'
      },
      {
        stepNumber: 2,
        title: 'Calculate Serum Anion Gap (AG)',
        condition: 'Anion Gap = [Na+] - ([Cl-] + [HCO3-]) | Normal AG = 10 to 12 mEq/L',
        actionOrFinding: 'If AG > 12 -> High AG Metabolic Acidosis (MUDPILES: Methanol, Uremia, DKA, Paraldehyde, INH/Iron, Lactic acidosis, Ethylene glycol, Salicylates). Adjust AG for hypoalbuminemia: Expected AG drops by 2.5 for every 1 g/dL drop in serum albumin below 4.',
        highYieldPearl: 'A high Anion Gap signifies an organic acid addition regardless of the measured pH or bicarbonate.'
      },
      {
        stepNumber: 3,
        title: 'Assess Respiratory Compensation (Winter formula)',
        condition: 'Metabolic Acidosis: Expected PaCO2 = 1.5 x [HCO3-] + 8 (+/- 2)',
        actionOrFinding: 'If measured PaCO2 > Expected -> Concomitant Respiratory Acidosis (CO2 retention/hypoventilation). If measured PaCO2 < Expected -> Concomitant Respiratory Alkalosis (hyperventilation).',
        highYieldPearl: 'Takes 12-24 hours for respiratory compensation to reach steady state.'
      },
      {
        stepNumber: 4,
        title: 'Calculate Delta-Delta Ratio (Delta Gap / Delta HCO3)',
        condition: 'Delta AG = (Patient AG - 12) | Delta HCO3 = (24 - Patient HCO3)',
        actionOrFinding: 'Ratio < 0.4: Pure Normal AG Acidosis (Hyperchloremic). Ratio 0.4 - 0.8: Mixed High AG + Normal AG Acidosis. Ratio 1.0 - 1.6: Pure High AG Acidosis (DKA, Lactic). Ratio > 2.0: Concomitant Metabolic Alkalosis (e.g., DKA + Vomiting / Diuretics).',
        highYieldPearl: 'Classic INI-CET question: Patient with vomiting + sepsis usually has Delta Ratio > 2.0.'
      }
    ],
    summaryTakeaway: 'Always calculate Anion Gap in all patients with acid-base disturbances, check Winter formula for respiratory compensation, and calculate Delta Ratio to unmask hidden metabolic alkalosis or non-gap acidosis.'
  },
  {
    id: 'schema-002',
    title: 'Shock Classification & Hemodynamic Profiles Matrix',
    subject: 'General Medicine',
    category: 'Classification Matrix',
    description: 'Hemodynamic parameters (PCWP, Cardiac Output, SVR, MvO2) across Hypovolemic, Cardiogenic, Distributive, and Obstructive shock.',
    steps: [
      {
        stepNumber: 1,
        title: 'Hypovolemic Shock (Hemorrhage, Severe Dehydration, Burns)',
        condition: 'Preload (PCWP/CVP) Decreased (Down)',
        actionOrFinding: 'Cardiac Output: Decreased. Systemic Vascular Resistance (SVR): Elevated (Up - compensatory vasoconstriction). Mixed Venous O2 (SvO2): Decreased (<65%). Treatment: Aggressive IV crystalloid/blood resuscitation.',
        highYieldPearl: 'Skin is cold and clammy due to reflex alpha-adrenergic peripheral vasoconstriction.'
      },
      {
        stepNumber: 2,
        title: 'Cardiogenic Shock (Acute MI, End-Stage Dilated Cardiomyopathy)',
        condition: 'Preload (PCWP/CVP) Markedly Elevated (Up >18 mmHg)',
        actionOrFinding: 'Cardiac Output: Severely Decreased (Down <2.2 L/min/m2). SVR: Elevated (Up). SvO2: Markedly Decreased. Treatment: Inotropes (Dobutamine, Milrinone), IABP, ECMO. Avoid aggressive fluids.',
        highYieldPearl: 'Bilateral lung crepitations with elevated JVP and cold extremities.'
      },
      {
        stepNumber: 3,
        title: 'Distributive Shock (Septic Shock, Anaphylaxis, Neurogenic)',
        condition: 'Preload (PCWP) Normal or Decreased',
        actionOrFinding: 'Cardiac Output: ELEVATED (Up - Hyperdynamic warm phase). SVR: SEVERELY DECREASED (Down - profound vasodilation). SvO2: Increased (>70% due to cellular extraction failure). Treatment: Norepinephrine first-line vasopressor + broad-spectrum antibiotics.',
        highYieldPearl: 'Only type of shock with DECREASED SVR and warm extremities in early phase.'
      },
      {
        stepNumber: 4,
        title: 'Obstructive Shock (Cardiac Tamponade, Tension Pneumothorax, Massive PE)',
        condition: 'Extrinsic physical obstruction to cardiac inflow or outflow',
        actionOrFinding: 'Tamponade: Equalization of diastolic pressures (RA = RV = PA = PCWP). Massive PE: High CVP with low PCWP (RV strain). Treatment: Emergency pericardiocentesis, needle thoracostomy, or systemic thrombolysis.',
        highYieldPearl: "Pulsus paradoxus (>10 mmHg systolic drop on inspiration) in Tamponade; Beck's Triad (Hypotension + Muffled heart sounds + JVD)."
      }
    ],
    summaryTakeaway: 'Distributive is the ONLY shock with Low SVR and High Cardiac Output (warm shock). Cardiogenic has High PCWP with Low CO. Hypovolemic has Low PCWP with Low CO.'
  },
  {
    id: 'schema-003',
    title: 'ATLS 11th Edition Trauma Resuscitation Protocol',
    subject: 'General Surgery',
    category: 'Treatment Protocol',
    description: 'Primary survey (ABCDE) and prioritized interventions in polytrauma emergencies.',
    steps: [
      {
        stepNumber: 1,
        title: 'A - Airway Maintenance with Cervical Spine Protection',
        condition: 'Assess airway patency while immobilizing cervical spine with rigid collar and inline stabilization',
        actionOrFinding: 'Definitive airway required if GCS <= 8, severe maxillofacial trauma, or expanding neck hematoma. Surgical cricothyroidotomy if oral intubation fails.',
        highYieldPearl: 'Never extend the neck in suspected cervical spine trauma; use jaw-thrust maneuver.'
      },
      {
        stepNumber: 2,
        title: 'B - Breathing & Ventilation: Immediately Lethal Chest Injuries',
        condition: 'Exclude Tension Pneumothorax, Massive Hemothorax, Flail Chest, Open Pneumothorax',
        actionOrFinding: 'Tension Pneumothorax: Immediate needle decompression in 5th intercostal space anterior to mid-axillary line (ATLS 11th Edition update), followed by intercostal chest tube.',
        highYieldPearl: 'Do NOT wait for chest X-ray to diagnose tension pneumothorax. It is a 100% clinical diagnosis.'
      },
      {
        stepNumber: 3,
        title: 'C - Circulation with Hemorrhage Control',
        condition: 'Identify external & internal hemorrhage (Chest, Abdomen, Pelvis, Long bones, Retroperitoneum)',
        actionOrFinding: 'Two large-bore (16-gauge or 18-gauge) IV cannulae. Balanced 1:1:1 resuscitation with PRBC, FFP, and Platelets (MTP protocol). Pelvic binder for open-book pelvic fracture.',
        highYieldPearl: 'Permissive hypotension (SBP 80-90 mmHg) until surgical hemostasis is achieved (except in traumatic brain injury).'
      },
      {
        stepNumber: 4,
        title: 'D & E - Disability & Exposure / Environmental Control',
        condition: 'Neurological evaluation via GCS and pupillary symmetry; full patient exposure with warming',
        actionOrFinding: 'Calculate GCS (E4 V5 M6). Prevent hypothermia, which accelerates coagulopathy and acidosis (Lethal Triad of Trauma).',
        highYieldPearl: 'The Lethal Triad: Hypothermia + Coagulopathy + Acidosis.'
      }
    ],
    summaryTakeaway: 'Airway with c-spine restriction -> Breathing (needle decompression 5th ICS anterior axillary line) -> Circulation (1:1:1 MTP, pelvic binder) -> Disability (GCS) -> Exposure (prevent hypothermia).'
  }
];
