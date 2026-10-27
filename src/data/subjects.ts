import { SubjectInfo } from '../types';

export const MEDICAL_SUBJECTS: SubjectInfo[] = [
  // Pre-Clinical
  {
    id: 'anatomy',
    name: 'Anatomy',
    shortName: 'ANAT',
    category: 'Pre-Clinical',
    color: '#EF4444', // Red
    icon: 'Bone',
    totalHours: 52,
    totalMCQs: 1240,
    highYieldWeightage: 8.5,
    chapters: ['General Anatomy & Histology', 'Upper Limb & Brachial Plexus', 'Lower Limb', 'Thorax & Mediastinum', 'Abdomen & Pelvis', 'Head & Neck', 'Neuroanatomy & Cranial Nerves', 'Embryology']
  },
  {
    id: 'physiology',
    name: 'Physiology',
    shortName: 'PHYS',
    category: 'Pre-Clinical',
    color: '#F97316', // Orange
    icon: 'Activity',
    totalHours: 48,
    totalMCQs: 1180,
    highYieldWeightage: 8.0,
    chapters: ['General Physiology & Transport', 'Nerve-Muscle Physiology', 'Cardiovascular System', 'Respiratory System', 'Renal Physiology & Acid-Base', 'Endocrine System', 'Central Nervous System', 'Special Senses']
  },
  {
    id: 'biochemistry',
    name: 'Biochemistry',
    shortName: 'BIOCHEM',
    category: 'Pre-Clinical',
    color: '#F59E0B', // Amber
    icon: 'Dna',
    totalHours: 42,
    totalMCQs: 960,
    highYieldWeightage: 7.5,
    chapters: ['Enzymology & Kinetics', 'Carbohydrate Metabolism', 'Lipid Metabolism', 'Amino Acid Metabolism & Inborn Errors', 'Molecular Biology & Genetics', 'Vitamins & Minerals', 'Nutrition & Energy Balance']
  },

  // Para-Clinical
  {
    id: 'pathology',
    name: 'Pathology',
    shortName: 'PATH',
    category: 'Para-Clinical',
    color: '#84CC16', // Lime
    icon: 'Microscope',
    totalHours: 58,
    totalMCQs: 1520,
    highYieldWeightage: 10.5,
    chapters: ['Cell Injury & Adaptations', 'Inflammation & Repair', 'Hemodynamics & Thromboembolism', 'Neoplasia & Genetics', 'Hematology & Bone Marrow', 'Cardiovascular & Respiratory Pathology', 'Renal & Uropathology', 'GI & Hepatobiliary Pathology']
  },
  {
    id: 'pharmacology',
    name: 'Pharmacology',
    shortName: 'PHARM',
    category: 'Para-Clinical',
    color: '#10B981', // Emerald
    icon: 'Pill',
    totalHours: 54,
    totalMCQs: 1450,
    highYieldWeightage: 10.0,
    chapters: ['General Pharmacology & Pharmacokinetics', 'Autonomic Nervous System', 'Cardiovascular Drugs', 'Antimicrobial Agents', 'Central Nervous System Pharmacology', 'Endocrine Pharmacology', 'Chemotherapeutic Agents', 'Toxicology & Antidotes']
  },
  {
    id: 'microbiology',
    name: 'Microbiology',
    shortName: 'MICRO',
    category: 'Para-Clinical',
    color: '#06B6D4', // Cyan
    icon: 'Bug',
    totalHours: 46,
    totalMCQs: 1120,
    highYieldWeightage: 8.0,
    chapters: ['General Bacteriology & Culture', 'Systemic Bacteriology', 'Virology & Viral Vaccines', 'Medical Mycology', 'Parasitology & Helminths', 'Immunology & Hypersensitivity', 'Hospital Infection Control']
  },
  {
    id: 'forensic',
    name: 'Forensic Medicine',
    shortName: 'FMT',
    category: 'Para-Clinical',
    color: '#6366F1', // Indigo
    icon: 'Scale',
    totalHours: 28,
    totalMCQs: 680,
    highYieldWeightage: 5.0,
    chapters: ['Medical Jurisprudence & Ethics', 'Thanatology & Autopsy', 'Traumatology & Mechanical Injuries', 'Thermal & Asphyxial Deaths', 'Sexual Jurisprudence', 'Clinical Toxicology & Poisons']
  },
  {
    id: 'psm',
    name: 'Community Medicine (PSM)',
    shortName: 'PSM',
    category: 'Para-Clinical',
    color: '#8B5CF6', // Purple
    icon: 'Users',
    totalHours: 48,
    totalMCQs: 1250,
    highYieldWeightage: 9.0,
    chapters: ['Epidemiology & Biostatistics', 'Communicable Disease Control', 'Non-Communicable Diseases', 'National Health Programs', 'Demography & Family Planning', 'Occupational & Environmental Health', 'Health Planning & Management']
  },

  // Clinical
  {
    id: 'ent',
    name: 'ENT (Otorhinolaryngology)',
    shortName: 'ENT',
    category: 'Clinical',
    color: '#EC4899', // Pink
    icon: 'Volume2',
    totalHours: 30,
    totalMCQs: 720,
    highYieldWeightage: 5.5,
    chapters: ['Diseases of External & Middle Ear', 'Inner Ear & Audiology', 'Diseases of Nose & Paranasal Sinuses', 'Pharynx & Oral Cavity', 'Larynx & Stridor', 'Operative ENT Procedures']
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    shortName: 'OPHTH',
    category: 'Clinical',
    color: '#14B8A6', // Teal
    icon: 'Eye',
    totalHours: 32,
    totalMCQs: 780,
    highYieldWeightage: 5.5,
    chapters: ['Optics & Errors of Refraction', 'Conjunctiva & Cornea', 'Lens & Cataract Surgery', 'Glaucoma & Tonometry', 'Uvea & Retina (Fundus)', 'Neuro-Ophthalmology & Strabismus']
  },
  {
    id: 'medicine',
    name: 'General Medicine',
    shortName: 'MED',
    category: 'Clinical',
    color: '#2563EB', // Blue
    icon: 'Stethoscope',
    totalHours: 95,
    totalMCQs: 2450,
    highYieldWeightage: 16.0,
    chapters: ['Cardiology & ECG Mastery', 'Pulmonology & ABG', 'Gastroenterology & Hepatology', 'Nephrology & Dialysis', 'Neurology & Stroke', 'Endocrinology & Diabetes', 'Rheumatology & Autoimmune', 'Infectious Diseases & Sepsis', 'Critical Care & Emergency Medicine']
  },
  {
    id: 'surgery',
    name: 'General Surgery',
    shortName: 'SURG',
    category: 'Clinical',
    color: '#DC2626', // Deep Red
    icon: 'Scissors',
    totalHours: 85,
    totalMCQs: 2150,
    highYieldWeightage: 14.5,
    chapters: ['Trauma & ATLS Protocol', 'Surgical Infections & Wound Healing', 'Thyroid & Parathyroid', 'Breast Diseases & Oncology', 'GI Tract & Acute Abdomen', 'Hepatobiliary & Pancreas', 'Hernias & Abdominal Wall', 'Urology & Genitourinary Surgery', 'Vascular Surgery & Burns']
  },
  {
    id: 'obg',
    name: 'Obstetrics & Gynaecology',
    shortName: 'OBG',
    category: 'Clinical',
    color: '#D946EF', // Fuchsia
    icon: 'HeartHandshake',
    totalHours: 72,
    totalMCQs: 1850,
    highYieldWeightage: 13.0,
    chapters: ['Antenatal Care & Fetal Surveillance', 'Normal & Abnormal Labor', 'Obstetric Complications & PPH', 'Medical Disorders in Pregnancy', 'Gynecological Oncology', 'Menstrual Disorders & Infertility', 'Contraception & MTP', 'Pelvic Organ Prolapse & Infections']
  },
  {
    id: 'pediatrics',
    name: 'Paediatrics',
    shortName: 'PAED',
    category: 'Clinical',
    color: '#0284C7', // Sky Blue
    icon: 'Baby',
    totalHours: 44,
    totalMCQs: 1150,
    highYieldWeightage: 8.0,
    chapters: ['Growth & Development Milestones', 'Neonatology & Neonatal Resuscitation', 'Pediatric Nutrition & PEM', 'Infectious Diseases & Immunization', 'Pediatric Cardiology (Cyanotic/Acyanotic)', 'Pediatric Neurology & Seizures', 'Pediatric Nephrology']
  },
  {
    id: 'orthopedics',
    name: 'Orthopaedics',
    shortName: 'ORTHO',
    category: 'Clinical',
    color: '#CA8A04', // Dark Gold
    icon: 'Shield',
    totalHours: 28,
    totalMCQs: 690,
    highYieldWeightage: 5.0,
    chapters: ['Fractures & Dislocations Upper Limb', 'Lower Limb Fractures & Pelvis', 'Pediatric Orthopaedics', 'Bone & Joint Infections', 'Bone Tumors & X-ray Signs', 'Spine Disorders & Scoliosis']
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    shortName: 'DERM',
    category: 'Clinical',
    color: '#F43F5E', // Rose
    icon: 'Sparkles',
    totalHours: 24,
    totalMCQs: 580,
    highYieldWeightage: 4.5,
    chapters: ['Vesiculobullous Disorders', 'Papulosquamous Disorders (Psoriasis/Lichen)', 'Leprosy & Cutaneous TB', 'Sexually Transmitted Infections', 'Skin Manifestations of Systemic Disease', 'Pigmentary & Hair Disorders']
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry',
    shortName: 'PSYCH',
    category: 'Clinical',
    color: '#7C3AED', // Violet
    icon: 'Brain',
    totalHours: 22,
    totalMCQs: 520,
    highYieldWeightage: 4.0,
    chapters: ['Schizophrenia & Psychotic Disorders', 'Mood Disorders (Depression & Bipolar)', 'Anxiety & Obsessive Compulsive Disorders', 'Substance Abuse & Addiction', 'Sleep & Eating Disorders', 'Psychopharmacology & ECT']
  },
  {
    id: 'radiology',
    name: 'Radiology',
    shortName: 'RADIO',
    category: 'Clinical',
    color: '#475569', // Slate
    icon: 'Radio',
    totalHours: 26,
    totalMCQs: 640,
    highYieldWeightage: 5.0,
    chapters: ['Chest X-Ray Patterns & Signs', 'Abdominal Radiology (Plain & Contrast)', 'Neuroradiology (CT/MRI Signs)', 'Emergency Trauma Imaging (FAST/eFAST)', 'Interventional Radiology', 'Radiation Physics & Protection']
  },
  {
    id: 'anesthesia',
    name: 'Anaesthesia',
    shortName: 'ANAESTH',
    category: 'Clinical',
    color: '#0D9488', // Dark Teal
    icon: 'Syringe',
    totalHours: 20,
    totalMCQs: 480,
    highYieldWeightage: 3.5,
    chapters: ['General Anaesthesia & Inhalational Agents', 'Local & Regional Anaesthesia', 'Difficult Airway Management', 'ACLS 2025/2026 Guidelines & CPR', 'Monitoring in Anaesthesia', 'Post-Operative Pain & ICU Management']
  }
];
