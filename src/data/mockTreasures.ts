import { Treasure } from '../types';

export const MOCK_TREASURES: Treasure[] = [
  {
    id: 'tr-01',
    title: 'Apple Core Sign (Napkin Ring Lesion)',
    subject: 'Radiology',
    topic: 'GI Tract Radiology',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    imageType: 'Radiology',
    buzzword: 'Apple Core / Napkin Ring Sign',
    description: 'Circumferential annular constricting mass lesion with overhanging margins (shouldering) causing lumen narrowing on barium enema radiograph.',
    classicAssociations: [
      'Colorectal adenocarcinoma (left-sided descending & sigmoid colon)',
      'Primary colonic lymphoma',
      'Extrinsic endometriosis or metastatic implant'
    ],
    examPoints: [
      'Left-sided lesions present early with bowel obstruction and altered bowel habits.',
      'Right-sided lesions present with iron-deficiency anemia, occult blood, and mass in right iliac fossa.'
    ]
  },
  {
    id: 'tr-02',
    title: 'Coffee Bean Sign (Bent Inner Tube)',
    subject: 'Radiology',
    topic: 'Acute Abdomen',
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80',
    imageType: 'Radiology',
    buzzword: 'Coffee Bean Sign / Bent Inner Tube',
    description: 'Enormously distended, closed-loop sigmoid colon on plain abdominal radiograph without haustra, converging down into the left lower quadrant.',
    classicAssociations: [
      'Sigmoid Volvulus',
      'Common in elderly bedridden patients, neuropsychiatric conditions (Parkinsonism, institutionalized)',
      'Associated with high fiber diet, redundant sigmoid colon'
    ],
    examPoints: [
      'Apex of the coffee bean points towards the Right Upper Quadrant (RUQ).',
      'Initial management in non-strangulated case: Sigmoidoscopic deflation with flatus tube.'
    ]
  },
  {
    id: 'tr-03',
    title: "Bird's Beak Sign (Rat Tail Appearance)",
    subject: 'Radiology',
    topic: 'Esophageal Disorders',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    imageType: 'Radiology',
    buzzword: "Bird's Beak / Rat Tail Sign",
    description: 'Smooth, symmetrical, tapered tapering of the distal lower esophageal sphincter with proximal massive esophageal dilation on barium swallow.',
    classicAssociations: [
      'Primary Achalasia Cardia (loss of myenteric / Auerbach plexus ganglion cells)',
      'Secondary Achalasia (Chagas disease - Trypanosoma cruzi)',
      'Pseudoachalasia (gastric fundus adenocarcinoma infiltrating gastroesophageal junction)'
    ],
    examPoints: [
      'High-resolution esophageal manometry is the gold standard diagnostic test (integrated relaxation pressure IRP >15 mmHg).',
      'Definitive treatment: Laparoscopic Heller myotomy with Dor/Toupet fundoplication, or POEM (Per-Oral Endoscopic Myotomy).'
    ]
  },
  {
    id: 'tr-04',
    title: 'Kimmelstiel-Wilson Nodules',
    subject: 'Pathology',
    topic: 'Renal Pathology',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    imageType: 'Histopathology',
    buzzword: 'Nodular Glomerulosclerosis / KW Nodules',
    description: 'Ovoid, PAS-positive, laminated acellular mesangial nodules composed of type IV collagen and advanced glycation end-products surrounded by dilated capillary loops.',
    classicAssociations: [
      'Diabetic Nephropathy (Class III nodular glomerulosclerosis)',
      'Pathognomonic for longstanding Diabetes Mellitus',
      'Almost universally associated with Diabetic Retinopathy'
    ],
    examPoints: [
      'Earliest detectable renal alteration in diabetes: Glomerular hyperfiltration and microalbuminuria (30-300 mg/day).',
      'First-line renoprotective therapy: SGLT2 inhibitors and ACE inhibitors / ARBs.'
    ]
  },
  {
    id: 'tr-05',
    title: 'Orphan Annie Eyes & Psammoma Bodies',
    subject: 'Pathology',
    topic: 'Endocrine Pathology',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    imageType: 'Histopathology',
    buzzword: 'Orphan Annie Eye Nuclei',
    description: 'Optically clear, ground-glass nuclei with peripheral margination of chromatin, nuclear grooves (coffee bean nuclei), and concentric laminated calcospherites (psammoma bodies).',
    classicAssociations: [
      'Papillary Thyroid Carcinoma (PTC) - most common thyroid cancer (80%)',
      'History of head and neck ionizing radiation exposure in childhood',
      'Associated with RET/PTC rearrangements and BRAF V600E mutations'
    ],
    examPoints: [
      'Metastasis occurs predominantly via lymphatic route to cervical lymph nodes (contrast with Follicular CA which metastasizes hematogenously to bones/lungs).',
      'Excellent 10-year survival (>95%).'
    ]
  },
  {
    id: 'tr-06',
    title: "Codman's Triangle & Sunburst Appearance",
    subject: 'Radiology',
    topic: 'Musculoskeletal Imaging',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    imageType: 'Radiology',
    buzzword: 'Sunburst Pattern & Codman Triangle',
    description: 'Aggressive periosteal elevation forming a triangular shell of reactive new bone at the tumor cortex junction, with perpendicular spicules of mineralized bone mimicking rays of the sun.',
    classicAssociations: [
      'Osteosarcoma (most common primary malignant bone tumor in adolescents)',
      "Ewing's Sarcoma (more commonly shows 'onion-skinning' concentric laminations)",
      'Metaphyseal region around the knee (distal femur 40%, proximal tibia 20%)'
    ],
    examPoints: [
      'Associated with Retinoblastoma (RB1 mutation) and Li-Fraumeni syndrome (TP53).',
      'Treatment protocol: Neoadjuvant chemotherapy -> Limb salvage surgery -> Adjuvant chemotherapy.'
    ]
  }
];
