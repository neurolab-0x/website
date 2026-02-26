/* ──────────────────────────────────────────────
   Shared Careers Data
   Structured for future API mapping to Greenhouse / internal ATS.
   ────────────────────────────────────────────── */

export interface Role {
    slug: string;
    title: string;
    location: 'Remote' | 'San Francisco, CA' | 'Boston, MA' | 'Washington, DC' | 'Zürich, CH';
    level: 'Senior' | 'Lead' | 'Staff' | 'Principal' | 'Director';
    commitment: 'Full-time';
    about: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave: string[];
}

export interface Department {
    index: string;
    name: string;
    disciplines: string;
    roles: Role[];
}

export const departments: Department[] = [
    {
        index: '01',
        name: 'Neural Engineering',
        disciplines: 'Hardware · Signal Processing · Material Science',
        roles: [
            {
                slug: 'senior-neural-hardware-engineer',
                title: 'Senior Neural Hardware Engineer',
                location: 'San Francisco, CA',
                level: 'Senior',
                commitment: 'Full-time',
                about:
                    'You will design next-generation electrode arrays and analog front-end circuits for high-channel-count neural recording systems. Your work directly impacts the fidelity and safety of brain-computer interfaces deployed in clinical settings.',
                responsibilities: [
                    'Design and validate high-density electrode array architectures (128–512 channels)',
                    'Develop analog signal conditioning circuits with sub-microvolt noise floors',
                    'Collaborate with material science team on biocompatible substrate selection',
                    'Own the hardware verification pipeline from bench to clinical prototype',
                    'Interface with regulatory team on FDA design history file documentation',
                ],
                requirements: [
                    'MS/PhD in Electrical Engineering, Biomedical Engineering, or related field',
                    '5+ years experience in mixed-signal ASIC or neural recording system design',
                    'Proficiency with Cadence Virtuoso, MATLAB, and PCB layout tools',
                    'Experience with ISO 13485 or IEC 62304 medical device standards',
                    'Published research in neural interfaces, bioelectronics, or related areas',
                ],
                niceToHave: [
                    'Experience with flexible polyimide or parylene-C substrates',
                    'Familiarity with inductive power transfer for implantable systems',
                    'Prior FDA 510(k) or De Novo submission experience',
                ],
            },
            {
                slug: 'signal-processing-architect',
                title: 'Signal Processing Architect',
                location: 'Boston, MA',
                level: 'Staff',
                commitment: 'Full-time',
                about:
                    'You will architect the real-time signal processing pipeline that transforms raw neural recordings into clinically actionable data. This role bridges hardware output and the NeurAI intelligence layer.',
                responsibilities: [
                    'Design low-latency DSP pipelines for multi-channel neural decoding (<50ms)',
                    'Implement adaptive filtering algorithms for artifact rejection and noise suppression',
                    'Define signal quality metrics and automated calibration procedures',
                    'Optimize compute kernels for embedded ARM and GPU targets',
                    'Publish methodologies and contribute to open neuroscience standards',
                ],
                requirements: [
                    'PhD in Signal Processing, Computational Neuroscience, or related field',
                    '7+ years in real-time DSP system design',
                    'Deep expertise in spectral analysis, Kalman filtering, and Bayesian decoding',
                    'Proficiency in C++, Python, and CUDA',
                    'Track record of peer-reviewed publications',
                ],
                niceToHave: [
                    'Experience with BCI2000, Open Ephys, or similar frameworks',
                    'Familiarity with edge ML inference (TensorRT, ONNX Runtime)',
                ],
            },
            {
                slug: 'material-science-lead',
                title: 'Material Science Lead',
                location: 'San Francisco, CA',
                level: 'Lead',
                commitment: 'Full-time',
                about:
                    'You will lead the selection, characterization, and qualification of biocompatible materials for implantable neural interfaces. Your decisions directly affect device longevity, signal quality, and patient safety.',
                responsibilities: [
                    'Evaluate and qualify biocompatible polymers, ceramics, and metal thin films',
                    'Design accelerated aging and reliability test protocols',
                    'Collaborate with hardware engineers on electrode coating and encapsulation strategies',
                    'Manage external testing lab relationships for ISO 10993 biocompatibility testing',
                    'Build and lead a small materials characterization team',
                ],
                requirements: [
                    'PhD in Materials Science, Biomedical Engineering, or Chemistry',
                    '6+ years in medical device materials or implantable electronics',
                    'Expertise in thin-film deposition (sputtering, ALD, electroplating)',
                    'Working knowledge of ISO 10993 and ASTM F2129 standards',
                ],
                niceToHave: [
                    'Experience with hermetic packaging for implantable electronics',
                    'Familiarity with SEM, XPS, and impedance spectroscopy characterization',
                ],
            },
            {
                slug: 'embedded-firmware-engineer',
                title: 'Embedded Firmware Engineer',
                location: 'Remote',
                level: 'Senior',
                commitment: 'Full-time',
                about:
                    'You will develop the embedded firmware that orchestrates data acquisition, wireless communication, and power management in our neural recording devices. Safety-critical, real-time, and resource-constrained.',
                responsibilities: [
                    'Develop real-time firmware for ARM Cortex-M and RISC-V microcontrollers',
                    'Implement BLE 5.3 and proprietary RF communication protocols',
                    'Design power management firmware for battery and energy-harvesting systems',
                    'Write safety-critical code compliant with IEC 62304 Class C',
                    'Own firmware CI/CD pipeline and hardware-in-the-loop testing',
                ],
                requirements: [
                    'BS/MS in Computer Engineering, Electrical Engineering, or related field',
                    '5+ years embedded firmware development (bare-metal and RTOS)',
                    'Proficiency in C and assembly for ARM architectures',
                    'Experience with SPI, I2C, UART, and DMA peripherals',
                    'Understanding of EMC/EMI considerations for medical devices',
                ],
                niceToHave: [
                    'Experience with Zephyr RTOS or FreeRTOS in medical applications',
                    'Familiarity with wireless power transfer protocols (Qi, AirFuel)',
                ],
            },
        ],
    },
    {
        index: '02',
        name: 'Computational Ethics',
        disciplines: 'Policy · AI Safety · Human-Machine Interface',
        roles: [
            {
                slug: 'ai-safety-researcher',
                title: 'AI Safety Researcher',
                location: 'Remote',
                level: 'Principal',
                commitment: 'Full-time',
                about:
                    'You will define and enforce safety constraints for neural decoding models deployed in clinical environments. Your work ensures that AI-assisted brain-computer interfaces behave predictably, transparently, and within ethical bounds.',
                responsibilities: [
                    'Develop formal verification frameworks for neural decoding model safety',
                    'Design adversarial robustness testing for BCI inference pipelines',
                    'Establish model interpretability standards for clinical deployment',
                    'Collaborate with regulatory team on AI/ML-specific FDA guidance (PCCP)',
                    'Publish safety research and engage with the broader AI safety community',
                ],
                requirements: [
                    'PhD in Machine Learning, AI Safety, or Computational Neuroscience',
                    '8+ years in ML safety, robustness, or interpretability research',
                    'Track record of publications at NeurIPS, ICML, AISTATS, or equivalent',
                    'Experience with medical AI regulatory frameworks (FDA, EU MDR)',
                ],
                niceToHave: [
                    'Experience with formal methods (SMT solvers, abstract interpretation)',
                    'Familiarity with differential privacy in clinical data settings',
                ],
            },
            {
                slug: 'neuroethics-policy-lead',
                title: 'Neuroethics Policy Lead',
                location: 'Washington, DC',
                level: 'Lead',
                commitment: 'Full-time',
                about:
                    'You will shape Neurolab\'s ethical framework for brain data privacy, informed consent, and neurorights. This role operates at the intersection of technology policy, bioethics, and regulatory strategy.',
                responsibilities: [
                    'Draft and maintain Neurolab\'s neural data governance policies',
                    'Engage with policymakers, IRBs, and standards bodies on neurotechnology regulation',
                    'Design informed consent protocols for clinical BCI research',
                    'Conduct ethical impact assessments for new product capabilities',
                    'Represent Neurolab at conferences and public forums on neuroethics',
                ],
                requirements: [
                    'JD, PhD, or equivalent in Bioethics, Science Policy, or related field',
                    '6+ years in technology policy, health policy, or bioethics',
                    'Deep knowledge of HIPAA, GDPR, and emerging neurorights legislation',
                    'Published work on neuroethics, data governance, or AI policy',
                ],
                niceToHave: [
                    'Prior IRB or ethics committee membership experience',
                    'Relationships with IEEE, OECD, or WHO neurotechnology working groups',
                ],
            },
            {
                slug: 'human-machine-interface-designer',
                title: 'Human-Machine Interface Designer',
                location: 'San Francisco, CA',
                level: 'Senior',
                commitment: 'Full-time',
                about:
                    'You will design the interaction layer between neural signals and digital systems — from cursor control paradigms to communication interfaces for patients with motor impairments. Precision, latency, and cognitive load are your design variables.',
                responsibilities: [
                    'Design and prototype neural cursor control and selection paradigms',
                    'Conduct user studies with patients and clinicians in lab settings',
                    'Define UX metrics for BCI interaction (throughput, error rate, fatigue)',
                    'Collaborate with signal processing team on decoder-UI co-optimization',
                    'Create design specifications for clinical-grade assistive interfaces',
                ],
                requirements: [
                    'MS in HCI, Cognitive Science, or Biomedical Engineering',
                    '5+ years in interaction design for assistive technology or medical devices',
                    'Proficiency in Figma, prototyping tools, and user research methods',
                    'Familiarity with motor rehabilitation or augmentative communication',
                ],
                niceToHave: [
                    'Experience with P300, SSVEP, or motor imagery BCI paradigms',
                    'Published UX research in assistive technology',
                ],
            },
        ],
    },
    {
        index: '03',
        name: 'Clinical Operations',
        disciplines: 'Field Research · Patient Advocacy · Lab Management',
        roles: [
            {
                slug: 'clinical-research-director',
                title: 'Clinical Research Director',
                location: 'Boston, MA',
                level: 'Director',
                commitment: 'Full-time',
                about:
                    'You will lead Neurolab\'s clinical research program from protocol design through patient enrollment and data analysis. This role reports directly to the CSO and is responsible for the integrity and pace of our clinical validation pipeline.',
                responsibilities: [
                    'Design and execute Phase I/II clinical studies for neural interface devices',
                    'Manage relationships with clinical trial sites, PIs, and CROs',
                    'Oversee IRB submissions, informed consent, and regulatory documentation',
                    'Build and lead a clinical research team of coordinators and data managers',
                    'Present results to regulatory bodies, advisory boards, and investors',
                ],
                requirements: [
                    'MD or PhD in Clinical Neuroscience, Biomedical Engineering, or related field',
                    '10+ years in clinical research leadership for medical devices or neurotechnology',
                    'Experience with FDA IDE submissions and GCP compliance',
                    'Track record of successful clinical studies from design to publication',
                ],
                niceToHave: [
                    'Board certification in neurology or neurosurgery',
                    'Prior experience with implantable device clinical programs (DBS, cochlear)',
                ],
            },
            {
                slug: 'field-research-coordinator',
                title: 'Field Research Coordinator',
                location: 'Zürich, CH',
                level: 'Senior',
                commitment: 'Full-time',
                about:
                    'You will coordinate multi-site clinical research activities across European partner hospitals. This role requires rigorous protocol adherence, excellent communication with clinical teams, and deep respect for patient welfare.',
                responsibilities: [
                    'Coordinate patient screening, enrollment, and follow-up across EU sites',
                    'Ensure protocol compliance and data quality at partner hospitals',
                    'Manage regulatory submissions for EU MDR and local ethics committees',
                    'Serve as primary liaison between Neurolab engineering and clinical PIs',
                    'Maintain clinical trial management system (CTMS) and eCRF databases',
                ],
                requirements: [
                    'MS in Clinical Research, Public Health, or Biomedical Science',
                    '4+ years as a clinical research coordinator for medical devices',
                    'Fluency in English and German (French is a plus)',
                    'Experience with EU MDR and ISO 14155 clinical investigation standards',
                ],
                niceToHave: [
                    'ACRP or SOCRA certification',
                    'Experience with neurology or neurosurgery clinical trials',
                ],
            },
            {
                slug: 'patient-advocacy-specialist',
                title: 'Patient Advocacy Specialist',
                location: 'Remote',
                level: 'Senior',
                commitment: 'Full-time',
                about:
                    'You will serve as the voice of patients within Neurolab — ensuring that our technology development is guided by real patient needs, concerns, and experiences. This role bridges clinical research, product design, and community engagement.',
                responsibilities: [
                    'Build and maintain relationships with patient advocacy organizations',
                    'Conduct patient needs assessments and journey mapping',
                    'Advise product teams on accessibility, usability, and patient experience',
                    'Develop patient education materials for clinical trial participants',
                    'Organize patient advisory board meetings and feedback sessions',
                ],
                requirements: [
                    'BS/MS in Public Health, Social Work, or Patient Advocacy',
                    '5+ years in patient advocacy, community health, or clinical outreach',
                    'Experience with neurological conditions (ALS, spinal cord injury, stroke)',
                    'Excellent written and verbal communication skills',
                ],
                niceToHave: [
                    'Lived experience with disability or chronic neurological conditions',
                    'Experience with patient-reported outcome measures (PROMs)',
                ],
            },
            {
                slug: 'lab-operations-manager',
                title: 'Lab Operations Manager',
                location: 'San Francisco, CA',
                level: 'Lead',
                commitment: 'Full-time',
                about:
                    'You will run the day-to-day operations of Neurolab\'s R&D and clinical prototyping laboratories. This role ensures that our research teams have safe, organized, and well-equipped facilities to do their best work.',
                responsibilities: [
                    'Manage lab operations including equipment procurement, maintenance, and calibration',
                    'Implement and enforce EHS protocols for biological and electrical hazards',
                    'Coordinate cleanroom scheduling and consumables inventory',
                    'Manage vendor relationships for specialized equipment and materials',
                    'Support facility planning for lab expansion and new site buildout',
                ],
                requirements: [
                    'BS in Engineering, Life Sciences, or Facilities Management',
                    '5+ years managing R&D or clinical laboratories',
                    'Experience with ISO 14644 cleanroom standards and biosafety protocols',
                    'Strong organizational and vendor management skills',
                ],
                niceToHave: [
                    'Experience in medical device or semiconductor fabrication environments',
                    'OSHA 30-hour certification or equivalent',
                ],
            },
        ],
    },
];

export function getRoleBySlug(slug: string): { role: Role; department: Department } | null {
    for (const dept of departments) {
        const role = dept.roles.find((r) => r.slug === slug);
        if (role) return { role, department: dept };
    }
    return null;
}
