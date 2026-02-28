/**
 * Slide Content Data
 * All presentation content defined as structured data
 */

const SLIDES = [
    // ===== SLIDE 1: Title Slide =====
    {
        id: 1,
        section: 'intro',
        sectionColor: 'impact',
        title: 'Title',
        shortTitle: 'Title',
        duration: 30, // seconds
        isBackup: false,
        content: {
            type: 'title',
            mainTitle: 'Agile Business Structure and Organizational Management for Startups',
            mainTitleSub: 'Designing Adaptive and Scalable Enterprises',
            subtitle: 'A Qualitative Multi-Case Study of Early-Stage German Startups (2-10 Employees)',
            author: 'Sina Najafi',
            role: "Master's Thesis Defense — Digital Technology M.Sc.",
            institution: 'Ostfalia University of Applied Sciences',
            faculty: 'Faculty of Computer Science',
            supervisor: 'Prof. Dr. Denis Royer',
            secondSupervisor: 'Prof. Dr. Wolfram Ludwig',
            date: 'January 2026'
        },
        notes: 'Introduce self, thank supervisor and committee, set context. Keep it brief and confident.'
    },

    // ===== SLIDE 2: The Problem & Research Gap =====
    {
        id: 2,
        section: 'problem',
        sectionColor: 'problem',
        title: 'The Problem & Research Gap',
        shortTitle: 'Problem',
        duration: 120,
        isBackup: false,
        content: {
            type: 'problem',
            statistic: {
                number: '74.6%',
                label: 'of German startups have fewer than 10 employees',
                source: 'Startup-Verband, 2024'
            },
            challenges: [
                { icon: '⏱️', text: 'When to formalize processes?' },
                { icon: '🔄', text: 'Which agile practices transfer to micro-enterprises?' },
                { icon: '⚖️', text: 'How to preserve flexibility while introducing structure?' }
            ],
            gaps: [
                { negative: true, text: 'No research on organizational agility in 2-10 person ventures' },
                { negative: true, text: 'German institutional context (Geschäftsführer liability, regulations) ignored' },
                { positive: true, text: 'Need: Context-appropriate frameworks for resource-constrained startups' }
            ]
        },
        notes: 'Emphasize the statistic - this affects the majority of German startups. The gap is real and consequential.'
    },

    // ===== SLIDE 3: Research Question =====
    {
        id: 3,
        section: 'problem',
        sectionColor: 'problem',
        title: 'Research Questions',
        shortTitle: 'Question',
        duration: 90,
        isBackup: false,
        content: {
            type: 'question',
            mainQuestion: 'How can early-stage German startups (2-10 employees) design agile business structures that enable organizational adaptability, scalability, and long-term sustainability?',
            subQuestions: [
                'Sub-RQ1: What constitutes organizational agility in early-stage startups, and how does it differ from software-based agile methodologies?',
                'Sub-RQ2: What structural, cultural, and leadership factors enable or constrain organizational agility in startup contexts?',
                'Sub-RQ3: How can startups maintain agility while scaling, and what obstacles emerge during growth?',
                'Sub-RQ4: What design principles and management practices can founders employ to build adaptive, scalable, and sustainable agile structures?'
            ]
        },
        notes: 'Read the main question slowly and clearly. Sub-questions show the logical structure of the investigation.'
    },

    // ===== SLIDE 4: Theoretical Framework =====
    {
        id: 4,
        section: 'theory',
        sectionColor: 'theory',
        title: 'Theoretical Framework',
        shortTitle: 'Theory',
        duration: 120,
        isBackup: false,
        content: {
            type: 'theory',
            theories: [
                {
                    name: 'Dynamic Capabilities Theory',
                    abbrev: 'DCT',
                    author: 'Teece et al., 1997',
                    explains: 'WHAT',
                    description: 'Sensing → Seizing → Transforming mechanisms',
                    color: 'theory'
                },
                {
                    name: 'Complexity Leadership Theory',
                    abbrev: 'CLT',
                    author: 'Uhl-Bien et al., 2007',
                    explains: 'HOW',
                    description: 'Adaptive + Enabling + Administrative leadership functions',
                    color: 'method'
                },
                {
                    name: 'Contingency Theory',
                    abbrev: 'CT',
                    author: 'Lawrence & Lorsch, 1967',
                    explains: 'WHY variation',
                    description: 'Stage, Sector, Size, Funding contingencies',
                    color: 'findings'
                }
            ],
            contribution: 'First study integrating all three lenses for micro-enterprises',
            centerLabel: 'Organizational Agility in Micro-Enterprises'
        },
        notes: 'Explain briefly why each theory is needed. The integration is the theoretical contribution.'
    },

    // ===== SLIDE 5: Methodology =====
    {
        id: 5,
        section: 'method',
        sectionColor: 'method',
        title: 'Methodology',
        shortTitle: 'Method',
        duration: 120,
        isBackup: false,
        content: {
            type: 'methodology',
            approach: 'Interpretivist Qualitative Multi-Case Study',
            sampling: 'Maximum Variation Sampling',
            cases: [
                { id: 'A', sector: 'Railway Infrastructure', stage: 'Early Scaling', size: 7, funding: 'VC/Investment' },
                { id: 'B', sector: 'Water Quality Monitoring', stage: 'Early Growth', size: 2, funding: 'EXIST' },
                { id: 'C', sector: 'Organizational Consulting', stage: 'Ramp-up', size: 5, funding: 'Strategic' },
                { id: 'D', sector: 'Business Consulting', stage: 'Growth', size: 6, funding: 'Bootstrap' },
                { id: 'E', sector: 'Autonomous Firefighting', stage: 'Pre-seed', size: 4, funding: 'EXIST' },
                { id: 'F', sector: 'Software Development', stage: 'Growth', size: 5, funding: 'Self-funded' },
                { id: 'G', sector: 'Medical Education AI', stage: 'Pre-seed', size: 4, funding: 'EXIST' }
            ],
            dataCollection: {
                method: 'Semi-structured founder interviews',
                totalMinutes: 445,
                interviews: 7,
                averageMinutes: 63.5
            },
            analysis: {
                method: 'Reflexive thematic analysis (Braun & Clarke, 2006)',
                process: 'Within-case profiling → Cross-case synthesis',
                coding: 'Manual coding for transparency and depth',
                processFlow: [
                    { step: 'Sampling', desc: 'Maximum Variation (7 Cases)' },
                    { step: 'Data Collection', desc: 'Semi-structured Interviews (445 min)' },
                    { step: 'Coding', desc: 'Reflexive Thematic Analysis (Manual)' },
                    { step: 'Synthesis', desc: 'Within-Case & Cross-Case Matrix' },
                    { step: 'Findings', desc: '5 Factors, 6 Principles, 5-Layer Framework' }
                ]
            }
        },
        notes: 'Emphasize the diversity of cases - this strengthens the findings. Manual coding shows rigor.'
    },

    // ===== SLIDE 6: Finding #1 - Five Universal Success Factors =====
    {
        id: 6,
        section: 'findings',
        sectionColor: 'findings',
        title: 'Finding #1: Five Universal Success Factors',
        shortTitle: 'Success Factors',
        duration: 120,
        isBackup: false,
        content: {
            type: 'factors',
            headline: 'Five factors present across all seven cases',
            factors: [
                {
                    icon: '🤝',
                    title: 'Trust & Psychological Safety',
                    description: 'Foundation enabling risk-taking, open communication, and experimentation',
                    evidence: 'Emphasized by all 7 startups'
                },
                {
                    icon: '📚',
                    title: 'Learning Orientation',
                    description: 'Retrospectives, iteration, and experimentation over rigid process adherence',
                    evidence: 'Present in all 7 startups'
                },
                {
                    icon: '🌱',
                    title: 'Servant/Delegative Leadership',
                    description: 'Enabling team autonomy, removing blockers, and fostering professional growth',
                    evidence: 'Emphasized by all 7 startups'
                },
                {
                    icon: '🎯',
                    title: 'Results over Process Compliance',
                    description: 'Outcomes and working product prioritized over strict ceremony adherence',
                    evidence: 'Observed in all 7 startups'
                },
                {
                    icon: '⚙️',
                    title: 'Selective Framework Adoption',
                    description: 'Customize frameworks to context — don\'t copy wholesale (extract principles)',
                    evidence: 'Applied by all 7 startups'
                }
            ]
        },
        notes: 'These five factors were universally present. Culture beats structure. Trust is the foundation — no method works without it.'
    },

    // ===== SLIDE 7: Key Finding #2 - Team Experience Matters Most =====
    {
        id: 7,
        section: 'findings',
        sectionColor: 'findings',
        title: 'Finding #2: Team Experience Matters Most',
        shortTitle: 'Experience > Framework',
        duration: 120,
        isBackup: false,
        content: {
            type: 'comparison',
            headline: 'Key Discovery: Team Experience Matters More Than Framework Choice',
            mainInsight: "The findings suggest that team members' prior agile experience contributes substantially more to agility outcomes than the specific choice of framework",
            multiplier: 'Substantially',
            multiplierNote: 'More Important',
            cases: [
                {
                    id: 'C',
                    framework: 'No formal framework',
                    outcome: 'HIGH agility',
                    positive: true,
                    reason: 'Founder with 10+ years consulting experience',
                    detail: 'Extracted principles from multiple methodologies'
                },
                {
                    id: 'F',
                    framework: 'Full Scrum implementation',
                    outcome: 'MEDIUM agility',
                    positive: false,
                    reason: 'Comprehensive framework but newer to agile mindset',
                    detail: 'Framework compliance without internalized principles'
                }
            ],
            implication: 'Hire for agile mindset and experience, not just framework expertise'
        },
        notes: 'Cases C and D achieved high agility without formal frameworks, while Case F with full Scrum achieved only medium agility. Experience appears to matter considerably more than methodology choice.'
    },

    // ===== SLIDE 8: Key Finding #3 - Critical 6-8 Person Threshold =====
    {
        id: 8,
        section: 'findings',
        sectionColor: 'findings',
        title: 'Finding #3: Critical 6-8 Person Threshold',
        shortTitle: '6-8 Threshold',
        duration: 120,
        isBackup: false,
        content: {
            type: 'threshold',
            headline: 'Critical Inflection Point: The 6-8 Person Threshold',
            formula: 'Communication links = n(n-1)/2',
            examples: [
                { people: 4, links: 6 },
                { people: 8, links: 28 }
            ],
            multiplierNote: 'Nearly 5-fold complexity increase!',
            validation: {
                below: {
                    cases: ['B', 'E', 'G'],
                    size: '2-4 people',
                    result: 'Informal coordination sufficient, high agility maintained'
                },
                above: {
                    cases: ['A', 'C', 'D', 'F'],
                    size: '5-7 people',
                    result: 'Coordination challenges emerged; required proactive structural intervention'
                }
            },
            actionableInsight: 'Founders must anticipate this threshold and implement selective structural mechanisms BEFORE reaching 6-8 employees'
        },
        notes: 'Mathematical proof plus empirical validation. This is actionable - founders can plan for it.'
    },

    // ===== SLIDE 9: Five-Layer Conceptual Framework =====
    {
        id: 9,
        section: 'framework',
        sectionColor: 'framework',
        title: 'Five-Layer Conceptual Framework',
        shortTitle: 'Framework',
        duration: 120,
        isBackup: false,
        content: {
            type: 'framework',
            headline: 'Five-Layer Integrated Framework for Micro-Enterprise Agility',
            layers: [
                {
                    number: 1,
                    name: 'Contextual Factors',
                    type: 'context',
                    description: 'Boundary Conditions',
                    items: 'Stage | Sector | Size | Funding | German Regulations'
                },
                {
                    number: 2,
                    name: 'Cultural Foundations',
                    type: 'culture',
                    description: 'PREREQUISITES (NOT Optional)',
                    items: 'Trust | Psychological Safety | Learning Orientation | Results Focus | Servant Leadership',
                    isPrerequisite: true
                },
                {
                    number: 3,
                    name: 'Structural Mechanisms',
                    type: 'structure',
                    description: 'Context-Dependent',
                    items: 'Org. Architecture | Role Design | Decision Distribution | Coordination Mechanisms'
                },
                {
                    number: 4,
                    name: 'Leadership Approaches',
                    type: 'leadership',
                    description: 'Enabling Dynamics',
                    items: 'Empowerment Levels | Process-Results Orientation | Autonomy-Alignment Balance'
                },
                {
                    number: 5,
                    name: 'Agility Outcomes',
                    type: 'outcomes',
                    description: 'Desired Results',
                    items: 'Decision Speed | Flexibility | Responsiveness | Sustainable Growth'
                }
            ],
            criticalInsight: 'Layer 2 (Cultural Foundations) must be established BEFORE Layer 3 (Structure). Cultural foundations are universal; structure is contingent.'
        },
        notes: 'This is the main theoretical contribution. Emphasize that culture MUST come before structure.'
    },

    // ===== SLIDE 10: Six Guiding Principles =====
    {
        id: 10,
        section: 'framework',
        sectionColor: 'framework',
        title: 'Six Guiding Principles for Founders',
        shortTitle: 'Principles',
        duration: 90,
        isBackup: false,
        content: {
            type: 'principles',
            headline: 'Evidence-Based Principles for Designing Agile Startups',
            principles: [
                {
                    icon: '🏗️',
                    number: 1,
                    title: 'Foundation First',
                    description: 'Establish trust, psychological safety, and learning orientation before selecting frameworks. Culture proves harder to change retroactively than structure.'
                },
                {
                    icon: '🌱',
                    number: 2,
                    title: 'Gradual Formalization',
                    description: 'Add structure incrementally as team grows; avoid premature bureaucracy. Formalization should respond to actual coordination needs rather than anticipated growth, ensuring each structural addition demonstrably serves team function before the next layer is introduced.'
                },
                {
                    icon: '💎',
                    number: 3,
                    title: 'Principle Extraction Over Framework Adoption',
                    description: 'Learn from Scrum, Kanban, OKR, Spotify models, but customize based on context. Framework choice contributes far less than team experience.'
                },
                {
                    icon: '🔀',
                    number: 4,
                    title: 'Accept Hybridity as Pragmatic Necessity',
                    description: 'Pure agility proves impossible with German Geschäftsführer liability. Hybrid models represent permanent equilibrium, not implementation failures.'
                },
                {
                    icon: '🎯',
                    number: 5,
                    title: 'Monitor the 6-8 Person Threshold',
                    description: 'The 6-8 person threshold is the primary diagnostic trigger for activating Principle 2\'s gradual formalization strategy. At this inflection point communication links increase five-fold (6→28), requiring a shift from reactive to proactive coordination. Interventions include domain-based decisions, weekly alignment meetings, or selective ceremonies — introduced before coordination failures emerge.'
                },
                {
                    icon: '🛡️',
                    number: 6,
                    title: 'Preserve Culture During Growth',
                    description: 'Agility often peaks in first 1-2 years before complexity increases. Maintaining agility during scaling requires intentional cultural reinforcement.'
                }
            ]
        },
        notes: 'These are actionable principles derived from the research. Each links back to findings.'
    },

    // ===== SLIDE 11: Limitations & Future Research =====
    {
        id: 11,
        section: 'impact',
        sectionColor: 'impact',
        title: 'Limitations & Future Research',
        shortTitle: 'Limitations',
        duration: 90,
        isBackup: false,
        content: {
            type: 'limitations',
            headline: 'Transparency Strengthens Validity',
            limitations: [
                {
                    icon: '📊',
                    title: 'Sample Size',
                    description: '7 cases — pattern identification, not statistical generalization',
                    mitigation: 'Maximum variation sampling strengthens transferability'
                },
                {
                    icon: '🌍',
                    title: 'Geographic Scope',
                    description: 'Germany only — institutional context limits direct transfer',
                    mitigation: 'Framework layers are adaptable to other contexts'
                },
                {
                    icon: '📸',
                    title: 'Cross-Sectional',
                    description: 'Single point-in-time snapshot, no longitudinal tracking',
                    mitigation: 'Retrospective narratives capture developmental arcs'
                },
                {
                    icon: '👤',
                    title: 'Founder-Only View',
                    description: 'Self-reported data without team member triangulation',
                    mitigation: 'Reflexive analysis reduces single-source bias'
                },
                {
                    icon: '📏',
                    title: 'Size Range',
                    description: 'Specific to 2-10 employees, may not scale beyond',
                    mitigation: 'Deliberate scope — fills the exact research gap'
                }
            ],
            futureResearch: [
                { icon: '📈', text: 'Longitudinal studies tracking startups through the 6-8 threshold' },
                { icon: '🔢', text: 'Quantitative validation of experience vs. framework contribution' },
                { icon: '🇪🇺', text: 'Extension to other European institutional contexts' },
                { icon: '👥', text: 'Multi-perspective studies including team members' },
                { icon: '🔬', text: 'Larger samples enabling statistical generalization' }
            ]
        },
        notes: 'Be honest about limitations - this shows academic maturity. Frame future research positively.'
    },

    // ===== SLIDE 12: Contributions & Conclusion =====
    {
        id: 12,
        section: 'impact',
        sectionColor: 'impact',
        title: 'Contributions & Conclusion',
        shortTitle: 'Conclusion',
        duration: 120,
        isBackup: false,
        content: {
            type: 'conclusion',
            headline: 'What This Research Contributes',
            theoretical: [
                { icon: '🔍', text: 'First study examining organizational agility in micro-enterprises (2-10 employees)' },
                { icon: '🔗', text: 'Novel integration of DCT + CLT + Contingency Theory for startups' },
                { icon: '📐', text: 'Identifies and validates the critical 6-8 person threshold' },
                { icon: '🧠', text: 'Demonstrates that team experience outweighs framework choice' }
            ],
            practical: [
                { icon: '🏗️', text: 'Five-layer framework for designing adaptive micro-enterprises' },
                { icon: '📋', text: 'Six evidence-based guiding principles for German founders' },
                { icon: '🇩🇪', text: 'Context-appropriate guidance for German institutional environment' }
            ],
            keyNumbers: [
                { value: '7', label: 'Cases Studied' },
                { value: '5', label: 'Layer Framework' },
                { value: '6', label: 'Guiding Principles' },
                { value: '3', label: 'Key Findings' }
            ],
            conclusion: 'Organizational agility in micro-enterprises is fundamentally cultural rather than structural — foundations must precede frameworks, and context always matters.',
            closing: 'Thank you for your attention. I welcome your questions.'
        },
        notes: 'End strong with the central conclusion. Make eye contact. Be ready for questions.'
    }
];

// ===== BACKUP SLIDES =====
const BACKUP_SLIDES = [
    {
        id: 'B1',
        section: 'backup',
        sectionColor: 'method',
        title: 'Detailed Case Profiles',
        shortTitle: 'Case Profiles',
        isBackup: true,
        content: {
            type: 'case-profiles',
            headline: 'Seven German Startups — Maximum Variation Sampling',
            cases: [
                { id: 'A', sector: 'Railway Infrastructure', icon: '🚂', stage: 'Early Scaling', size: 7, funding: 'Investment', challenge: 'Regulatory compliance', agility: 'Medium', agilityNote: '5/10 — declined from higher' },
                { id: 'B', sector: 'Water Quality Monitoring', icon: '💧', stage: 'Early Growth', size: 2, funding: 'EXIST', challenge: 'Resource constraints', agility: 'High', agilityNote: 'Strong cultural foundation' },
                { id: 'C', sector: 'Organizational Consulting', icon: '🏢', stage: 'Ramp-up', size: 5, funding: 'Strategic', challenge: 'Matrix coordination', agility: 'High', agilityNote: 'Custom framework approach' },
                { id: 'D', sector: 'Business Consulting', icon: '📊', stage: 'Growth', size: 6, funding: 'Bootstrap', challenge: 'Project-based scaling', agility: 'High', agilityNote: 'Near threshold — proactive' },
                { id: 'E', sector: 'Autonomous Firefighting', icon: '🤖', stage: 'Pre-seed', size: 4, funding: 'EXIST', challenge: 'Technical complexity', agility: 'Medium', agilityNote: 'Limited formal structures' },
                { id: 'F', sector: 'Software Development', icon: '💻', stage: 'Growth', size: 5, funding: 'Self-funded', challenge: 'Multi-sector clients', agility: 'Medium', agilityNote: 'Framework without culture' },
                { id: 'G', sector: 'Medical Education AI', icon: '🧬', stage: 'Pre-seed', size: 4, funding: 'EXIST', challenge: 'Medical regulations', agility: 'High', agilityNote: 'Strong team experience' }
            ]
        }
    },
    {
        id: 'B2',
        section: 'backup',
        sectionColor: 'problem',
        title: 'German Institutional Context',
        shortTitle: 'German Context',
        isBackup: true,
        content: {
            type: 'context',
            headline: 'Why Silicon Valley Models Don\'t Translate Directly',
            aspects: [
                {
                    icon: '⚖️',
                    title: 'Geschäftsführer Liability',
                    description: 'Personal liability of managing directors creates risk-averse documentation culture',
                    implication: 'Limits purely agile approaches; requires some formalization'
                },
                {
                    icon: '🏛️',
                    title: 'EXIST Funding Constraints',
                    description: 'Government startup funding comes with reporting requirements & milestones',
                    implication: 'Structured milestone tracking needed alongside agile delivery'
                },
                {
                    icon: '📜',
                    title: 'Sector-Specific Regulations',
                    description: 'Railway (EBA), Medical devices (MDR), etc. impose strict compliance',
                    implication: 'Hybrid models necessary to combine agility with compliance'
                },
                {
                    icon: '🤝',
                    title: 'Works Council Potential',
                    description: 'At 5+ employees, workers can form a Betriebsrat (works council)',
                    implication: 'Influences decision-making processes and organizational structure'
                }
            ],
            keyTakeaway: 'German startups cannot fully adopt Silicon Valley agile models — hybrid approaches are a pragmatic necessity, not a failure.'
        }
    },
    {
        id: 'B3',
        section: 'backup',
        sectionColor: 'findings',
        title: 'Cross-Case Comparison Matrix',
        shortTitle: 'Comparison Matrix',
        isBackup: true,
        content: {
            type: 'matrix',
            headline: 'Pattern Analysis Across All Seven Cases',
            dimensions: ['Trust', 'Learning', 'Leadership', 'Framework', 'Threshold Awareness', 'Agility'],
            cases: {
                'A': ['High', 'High', 'Servant', 'Adapted OKR+Scrum', 'Proactive', 'Medium'],
                'B': ['High', 'High', 'Servant', 'Adapted Scrum', 'N/A (2p)', 'High'],
                'C': ['High', 'High', 'Servant', 'Custom Matrix', 'Aware', 'High'],
                'D': ['High', 'High', 'Servant', 'Project-based', 'Learning', 'High'],
                'E': ['High', 'High', 'Collaborative', 'Minimal', 'N/A (4p)', 'Medium'],
                'F': ['Medium', 'Medium', 'Semi-agile', 'Full Scrum', 'Unaware', 'Medium'],
                'G': ['High', 'High', 'Servant', 'Minimal', 'N/A (4p)', 'High']
            },
            patterns: [
                { label: 'Culture First', desc: '6/7 cases show high trust + high learning as the foundation' },
                { label: 'Servant Leadership', desc: '5/7 founders practice servant leadership style' },
                { label: 'Framework ≠ Agility', desc: 'Case F uses full Scrum but only achieves medium agility' }
            ]
        }
    }
];

// Section information for navigation and sphere
const SECTIONS = [
    { id: 'problem', name: 'Problem', color: '#E74C3C', slides: [2, 3] },
    { id: 'theory', name: 'Theory', color: '#3498DB', slides: [4] },
    { id: 'method', name: 'Method', color: '#2ECC71', slides: [5] },
    { id: 'findings', name: 'Findings', color: '#F39C12', slides: [6, 7, 8] },
    { id: 'framework', name: 'Framework', color: '#9B59B6', slides: [9, 10] },
    { id: 'impact', name: 'Impact', color: '#1ABC9C', slides: [11, 12] }
];

// =====================================================
// DEFENSE Q&A PREPARATION
// Comprehensive questions & suggested answers for thesis defense
// =====================================================

const DEFENSE_QA = [

    // ─────────────────────────────────────────────────────
    // CATEGORY 1: RESEARCH DESIGN & METHODOLOGY
    // ─────────────────────────────────────────────────────
    {
        category: 'Research Design & Methodology',
        questions: [
            {
                id: 'M1',
                question: 'Why did you choose a qualitative approach instead of a quantitative one?',
                difficulty: 'high',
                likelyAskedBy: 'Both supervisors',
                answer: `The research question asks "how" startups design agile structures — this is fundamentally an exploratory, process-oriented question. Quantitative methods would require pre-defined variables and established scales, which don't exist for micro-enterprises (2-10 employees). The phenomenon is under-researched, so we first need to understand WHAT is happening before we can measure it. Qualitative multi-case study design (Yin, 2018) is the gold standard for exploring complex organizational phenomena in context. Additionally, the richness of founder narratives — their reasoning, trade-offs, and contextual decisions — would be lost in survey data.`
            },
            {
                id: 'M2',
                question: 'Seven cases — isn\'t that too few? How can you generalize from only 7 cases?',
                difficulty: 'high',
                likelyAskedBy: 'Both supervisors',
                answer: `This is a critical distinction: I am pursuing analytical generalization, not statistical generalization (Yin, 2018). The goal is not to claim "X% of startups do Y" but to identify patterns, mechanisms, and principles that are theoretically transferable. Seven cases with maximum variation sampling actually provides strong analytical power — Eisenhardt (1989) recommends 4-10 cases for theory building. My cases vary across sector, size, stage, and funding type, which means patterns that emerge across ALL seven cases (like the five success factors) are robust precisely because they persist despite variation. Moreover, saturation was reached — the last cases confirmed rather than introduced new patterns.`
            },
            {
                id: 'M3',
                question: 'Why did you use manual coding instead of software like NVivo or ATLAS.ti?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Royer',
                answer: `This was a deliberate methodological choice, not a limitation. Manual coding using Braun & Clarke's (2006) reflexive thematic analysis emphasizes the researcher's active role in meaning-making. Software tools excel at managing large datasets, but with 7 interviews (445 minutes), the dataset was manageable manually. Manual coding forced deeper engagement with each transcript — I read each interview multiple times, which led to richer pattern recognition. The within-case profiling followed by cross-case synthesis would not have been qualitatively different with software, but the depth of engagement might have been reduced. I maintained a detailed coding journal for transparency and auditability.`
            },
            {
                id: 'M4',
                question: 'How did you ensure the validity and reliability of your qualitative research?',
                difficulty: 'high',
                likelyAskedBy: 'Both supervisors',
                answer: `I addressed this through Lincoln & Guba's (1985) trustworthiness criteria. For credibility: I used prolonged engagement with transcripts, member-checking where possible, and reflexive journaling. For transferability: maximum variation sampling and thick description of each case context enables readers to assess applicability. For dependability: I maintained an audit trail of coding decisions and analytical memos. For confirmability: the reflexive thematic analysis approach explicitly acknowledges the researcher's role, and I documented my positionality. Cross-case synthesis also serves as a form of internal triangulation — patterns validated across 7 independent cases are more robust than single-case findings.`
            },
            {
                id: 'M5',
                question: 'Why semi-structured interviews? Why not observation or document analysis?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `Semi-structured interviews were chosen because founders are uniquely positioned to articulate their organizational design decisions, reasoning, and trade-offs. Observation would capture current practices but miss the WHY behind decisions and the historical evolution. Document analysis in micro-startups is limited — most 2-10 person companies have minimal formal documentation. The semi-structured format allowed me to follow the interview guide for consistency across cases while probing deeply into emergent themes. That said, triangulation with observation and documents would strengthen future research — this is acknowledged in the limitations.`
            },
            {
                id: 'M6',
                question: 'How did you select your seven cases? Could there be selection bias?',
                difficulty: 'medium',
                likelyAskedBy: 'Both supervisors',
                answer: `I used maximum variation sampling (Patton, 2015), deliberately selecting cases that differ across key dimensions: sector (railway, water, consulting, software, AI, firefighting), size (2-7 employees), stage (pre-seed to growth), and funding (EXIST, VC, bootstrap, self-funded). This is the opposite of convenience sampling — I actively sought diversity. Selection bias is mitigated because I did NOT select for success or failure; the sample includes high, medium, and varying agility levels. The German geographic focus was intentional to control for institutional context, not a convenience limitation.`
            },
            {
                id: 'M7',
                question: 'What is reflexive thematic analysis and how does it differ from other forms of thematic analysis?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Royer',
                answer: `Braun & Clarke (2006, updated 2019) distinguish reflexive thematic analysis from codebook and coding reliability approaches. In reflexive TA, codes are not fixed upfront — they evolve organically through iterative engagement with the data. The researcher's subjectivity is a resource, not a problem to eliminate. There is no inter-rater reliability because the analysis is inherently interpretive. This contrasts with codebook approaches where codes are predefined, or coding reliability approaches that seek agreement between multiple coders. I chose reflexive TA because my research is exploratory — I needed the flexibility to discover unexpected patterns rather than confirm predetermined categories.`
            },
            {
                id: 'M8',
                question: 'Why did you interview only founders and not team members?',
                difficulty: 'high',
                likelyAskedBy: 'Both supervisors',
                answer: `In micro-enterprises of 2-10 employees, the founder IS the organizational architect. They make the structural decisions, set the culture, and navigate the trade-offs between agility and formalization. For research questions focused on organizational DESIGN, the founder perspective is primary. That said, I acknowledge this as a limitation — team members might perceive agility differently than founders. This is explicitly listed as future research: multi-perspective studies including team members would add valuable triangulation. Practically, accessing team members in early-stage startups is also challenging due to small team sizes and founder gatekeeping.`
            },

            // ─────────────────────────────────────────────────────
            // CATEGORY 2: THEORETICAL FRAMEWORK
            // ─────────────────────────────────────────────────────
            {
                id: 'T1',
                question: 'Why these three theories specifically? Why not others like Resource-Based View or Institutional Theory?',
                difficulty: 'high',
                likelyAskedBy: 'Prof. Royer',
                answer: `Each theory was chosen for a specific analytical purpose. Dynamic Capabilities Theory (Teece, 1997) explains WHAT agility mechanisms look like — sensing, seizing, transforming. Complexity Leadership Theory (Uhl-Bien, 2007) explains HOW leadership enables agility through adaptive, enabling, and administrative functions. Contingency Theory (Lawrence & Lorsch, 1967) explains WHY outcomes vary — because context matters. Resource-Based View was considered but focuses more on competitive advantage through resources, which is less relevant for understanding organizational DESIGN processes. Institutional Theory could complement the German context analysis but would shift focus to external pressures rather than internal design choices. The three chosen lenses together cover the what-how-why comprehensively.`
            },
            {
                id: 'T2',
                question: 'Dynamic Capabilities Theory was developed for large firms. Is it applicable to micro-enterprises?',
                difficulty: 'high',
                likelyAskedBy: 'Prof. Royer',
                answer: `Excellent question — and this is actually part of the theoretical contribution. Teece's original formulation (1997) indeed focused on large firms, but subsequent work (Zahra et al., 2006; Arend, 2014) has debated its applicability to smaller firms. My research shows that the sensing-seizing-transforming framework IS applicable, but manifests differently in micro-enterprises. Sensing happens through direct founder-customer contact rather than formal market research. Seizing is faster because decision chains are shorter. Transforming is more fluid because there's less organizational inertia. The theory's core logic holds, but the MECHANISMS are fundamentally different. This micro-enterprise adaptation of DCT is itself a theoretical contribution.`
            },
            {
                id: 'T3',
                question: 'How exactly do the three theories integrate? Isn\'t this just using three separate lenses independently?',
                difficulty: 'high',
                likelyAskedBy: 'Prof. Royer',
                answer: `The integration is not additive but multiplicative — the theories interact. Here's how: Contingency Theory identifies the boundary conditions (stage, sector, size, funding, regulations) that shape which dynamic capabilities are possible and which leadership approaches are effective. Dynamic Capabilities Theory identifies the agility mechanisms, but their activation depends on the leadership functions described by Complexity Leadership Theory. And CLT's adaptive leadership is contingent on context — the same leadership approach produces different outcomes in different contingencies. The five-layer framework IS the integration: Layer 1 (Context) is Contingency Theory, Layer 2-3 (Culture, Structure) are Dynamic Capabilities, Layer 4 (Leadership) is CLT, and Layer 5 (Outcomes) is where they converge. No single theory could explain the full picture.`
            },
            {
                id: 'T4',
                question: 'What is your theoretical contribution exactly?',
                difficulty: 'high',
                likelyAskedBy: 'Both supervisors',
                answer: `Three theoretical contributions: First, this is the first study to integrate Dynamic Capabilities Theory, Complexity Leadership Theory, and Contingency Theory specifically for micro-enterprises. Each theory has been applied separately, but never combined to analyze organizational agility at this scale. Second, I demonstrate how DCT mechanisms manifest differently in 2-10 person ventures compared to larger organizations — this extends the theory's boundary conditions. Third, the five-layer framework itself is a theoretical contribution — it provides a structured conceptual model showing that cultural foundations (universal) must precede structural mechanisms (contingent), which challenges the prevalent "framework-first" approach in practitioner literature.`
            },

            // ─────────────────────────────────────────────────────
            // CATEGORY 3: FINDINGS & ANALYSIS
            // ─────────────────────────────────────────────────────
            {
                id: 'F1',
                question: 'You say team experience matters more than framework choice. How strong is this evidence?',
                difficulty: 'high',
                likelyAskedBy: 'Both supervisors',
                answer: `The evidence comes from cross-case pattern analysis. Case C used no formal framework but achieved high agility — the founder had 10+ years of consulting experience and extracted principles from multiple methodologies. Case D similarly achieved high agility with a project-based approach built on extensive experience. In contrast, Case F implemented full Scrum comprehensively but achieved only medium agility — the team was newer to agile mindset and followed the framework mechanically without internalizing the underlying principles. The pattern is consistent: cases with experienced teams outperformed cases with comprehensive frameworks but less experience. I should note this is a qualitative finding — I use "substantially more" rather than a specific multiplier. Quantitative validation of the exact magnitude is recommended as future research.`
            },
            {
                id: 'F2',
                question: 'The 6-8 person threshold — is this really a new finding? Brooks\'s Law has existed since 1975.',
                difficulty: 'high',
                likelyAskedBy: 'Prof. Royer',
                answer: `Brooks's Law (1975) addresses software project teams and states "adding manpower to a late project makes it later." My finding is different in three ways: First, it's about ORGANIZATIONAL structure, not project management. Second, Brooks discusses the communication overhead formula n(n-1)/2 but doesn't identify a specific threshold for micro-enterprises. Third, and most importantly, I provide EMPIRICAL validation from real startups — cases below the threshold (B, E, G with 2-4 people) maintained informal coordination, while cases above (A, C, D, F with 5-7 people) required proactive structural intervention. The threshold itself may not be entirely novel, but its empirical validation in micro-enterprise organizational design and the actionable guidance (prepare BEFORE reaching it) is a distinct contribution.`
            },
            {
                id: 'F3',
                question: 'You claim five "universal" success factors. Can you really call them universal with only 7 cases?',
                difficulty: 'high',
                likelyAskedBy: 'Both supervisors',
                answer: `Fair critique on the term "universal." What I mean is that these five factors were present across ALL seven cases, despite maximum variation in sector, size, stage, and funding. In qualitative research, when a pattern persists across deliberately diverse cases, it suggests robustness — not statistical universality, but analytical consistency. A more precise phrasing would be "consistently present across all studied cases." The maximum variation design strengthens this: if trust and psychological safety matter in railway infrastructure, water monitoring, consulting, software, AI, and autonomous firefighting — across bootstrapped and VC-funded, 2-person and 7-person teams — the pattern is more than coincidental. But I agree that "universal" should be understood within the qualitative paradigm, not as a statistical absolute.`
            },
            {
                id: 'F4',
                question: 'How did you measure "agility level" (high/medium) for each case?',
                difficulty: 'high',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `Agility level was assessed through a qualitative composite evaluation, not a quantitative scale. I examined multiple dimensions from the interview data: decision speed (how quickly can the team respond to changes?), flexibility (how easily can roles and processes adapt?), responsiveness (how does the team react to market signals or customer feedback?), and sustainable growth capacity. I triangulated founder self-assessment with concrete examples they provided — for instance, Case B described pivoting their entire product approach within one week, which supports "high" agility. Case F described month-long sprint cycles with limited ability to deviate, supporting "medium." I acknowledge this is interpretive — developing a validated quantitative agility scale for micro-enterprises would be valuable future research.`
            },
            {
                id: 'F5',
                question: 'Case F implemented full Scrum but only achieved medium agility. Could there be other explanations besides "experience matters more"?',
                difficulty: 'high',
                likelyAskedBy: 'Both supervisors',
                answer: `Absolutely — and intellectual honesty requires acknowledging alternative explanations. Case F's medium agility could also be influenced by: their multi-sector client base creating coordination complexity, their self-funded status potentially limiting investment in team development, or their specific sector dynamics. However, the cross-case comparison strengthens the experience interpretation: Cases C and D also faced complex contexts (consulting, multiple clients) but achieved high agility with experienced teams and no formal framework. The convergence of evidence across cases reduces — but doesn't eliminate — alternative explanations. This is a qualitative finding suggesting a strong pattern, not a controlled experiment proving causation. The recommendation for quantitative validation as future research directly addresses this.`
            },
            {
                id: 'F6',
                question: 'What exactly do you mean by "agility" in your research? How do you define it?',
                difficulty: 'high',
                likelyAskedBy: 'Both supervisors',
                answer: `This is a foundational question that I address early in the thesis. I distinguish organizational agility from software agile methodologies (Scrum, Kanban, etc.). Organizational agility, drawing from Teece (2007) and Worley & Lawler (2010), is defined as the organizational capability to sense changes in the environment, make timely decisions, and reconfigure resources and structures rapidly. It encompasses four dimensions: decision speed, structural flexibility, market responsiveness, and sustainable adaptability. Critically, in micro-enterprises, this agility is not about implementing specific frameworks — it's about building organizational DNA that enables continuous adaptation. Sub-RQ1 specifically addresses this definitional question, and the findings confirm that organizational agility in micro-enterprises is fundamentally cultural rather than procedural.`
            },

            // ─────────────────────────────────────────────────────
            // CATEGORY 4: FRAMEWORK & PRINCIPLES
            // ─────────────────────────────────────────────────────
            {
                id: 'FW1',
                question: 'Your five-layer framework — how is it validated? Isn\'t it just descriptive?',
                difficulty: 'high',
                likelyAskedBy: 'Prof. Royer',
                answer: `The framework is empirically grounded, not just descriptive. Each layer emerged from cross-case analysis of all seven cases. The ordering (context → culture → structure → leadership → outcomes) is not arbitrary — it reflects the causal patterns observed. For instance, cases that established cultural foundations (Layer 2) before implementing structural mechanisms (Layer 3) achieved higher agility than those that jumped to structure first (like Case F with Scrum). The framework is validated through cross-case synthesis: it explains the variation across all seven cases — why some achieved high agility and others medium. That said, it is a first-generation conceptual framework that requires further validation through additional qualitative studies and eventually quantitative testing. The framework's value at this stage is its ability to explain and guide, not predict statistically.`
            },
            {
                id: 'FW2',
                question: 'You say culture must come before structure. But isn\'t culture itself shaped by structure?',
                difficulty: 'high',
                likelyAskedBy: 'Prof. Royer',
                answer: `This is a sophisticated observation — and you're right that the relationship is bidirectional in mature organizations. However, in EARLY-STAGE micro-enterprises, the sequence matters differently. At 2-5 employees, there is essentially no formal structure yet — culture IS the organization. The founder's values, communication patterns, and trust-building directly create the cultural foundation. Structure comes later as a response to growing complexity (especially around the 6-8 person threshold). My finding is specifically about the INITIAL sequence in micro-enterprises: founders who deliberately built trust and psychological safety first, then added structure as needed, outperformed those who started with framework implementation. Once both exist, they indeed co-evolve — but the genesis sequence matters. This is consistent with Schein's (2010) observation that founders embed culture before organizational structures solidify.`
            },
            {
                id: 'FW3',
                question: 'How should a founder actually USE your framework in practice?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `The framework serves as a diagnostic and planning tool. Step 1: Assess your contextual factors (Layer 1) — what stage are you at, what sector regulations apply, what's your team size and funding situation? Step 2: Evaluate your cultural foundations (Layer 2) — do you have trust, psychological safety, and learning orientation? If not, this is where to invest first. Step 3: Only then design structural mechanisms (Layer 3) appropriate to your context — and be ready to adjust these as you grow toward the 6-8 person threshold. Step 4: Align your leadership approach (Layer 4) to enable rather than control. Step 5: Define your desired agility outcomes (Layer 5) and use them as feedback to iterate on all layers. The six guiding principles provide concrete "how-to" guidance at each step.`
            },
            {
                id: 'FW4',
                question: 'Your six principles — how are they different from general management advice?',
                difficulty: 'medium',
                likelyAskedBy: 'Both supervisors',
                answer: `The key difference is that these principles are empirically derived from micro-enterprise data, not adapted from large-firm management theory. For example, Principle 4 — "Accept Hybridity as Pragmatic Necessity" — directly addresses the German institutional context (Geschäftsführer liability) and contradicts the prevalent "pure agile" narrative in startup advice. Principle 3 — "Principle Extraction Over Framework Adoption" — is backed by the specific finding that team experience outweighs framework choice. Principle 5 — "Monitor the 6-8 Person Threshold" — gives a specific, actionable trigger point rather than generic scaling advice. Generic management advice says "be agile" or "build culture." These principles say specifically what to do, in what sequence, for what size, in the German context.`
            },

            // ─────────────────────────────────────────────────────
            // CATEGORY 5: GERMAN CONTEXT & GENERALIZABILITY
            // ─────────────────────────────────────────────────────
            {
                id: 'G1',
                question: 'How does the German institutional context specifically affect your findings?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `The German context affects findings at multiple levels. Geschäftsführer personal liability means founders CANNOT fully delegate all decisions — some formalization is legally required, making pure flat structures impossible. EXIST funding (used by Cases B, E, G) imposes milestone reporting that requires structured planning alongside agile delivery. Sector-specific regulations like EBA (railway, Case A) and MDR (medical, Case G) mandate compliance documentation that conflicts with pure agility. Even the potential for Betriebsrat formation at 5+ employees influences organizational design. This is why Principle 4 states that hybrid models are "pragmatic necessity, not implementation failure" — German founders face structural constraints that Silicon Valley advice simply doesn't account for. The framework's Layer 1 (Contextual Factors) explicitly includes German regulations as a boundary condition.`
            },
            {
                id: 'G2',
                question: 'Can your findings be applied outside Germany? What about other European countries or the US?',
                difficulty: 'medium',
                likelyAskedBy: 'Both supervisors',
                answer: `The findings have different transferability depending on the layer. Layer 2 (Cultural Foundations) — trust, psychological safety, learning orientation — these are likely universal across contexts. The five success factors transcend national boundaries. However, Layer 1 (Contextual Factors) is explicitly context-dependent — German regulations, funding structures, and liability frameworks differ from other countries. The framework DESIGN is transferable — any country can use the five-layer model — but the specific CONTENT of Layer 1 must be adapted. For other European countries with similar institutional frameworks (Austria, Switzerland, Netherlands), transferability is higher. For the US with its different liability, employment, and funding structures, Layer 1 would need significant recalibration. This is why I recommend future research extending to other European institutional contexts.`
            },
            {
                id: 'G3',
                question: 'Why focus specifically on 2-10 employees? Why not 1-50 or even broader?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `The 2-10 range was chosen for three reasons. First, the research gap: existing literature covers agility in organizations with 50+ employees extensively, but virtually nothing exists for the smallest ventures. 74.6% of German startups fall in this range — it's the majority case that's been ignored. Second, theoretical distinctiveness: at 2-10 employees, organizational dynamics are qualitatively different from larger firms. There's no middle management, minimal formal hierarchy, and the founder's personal influence is dominant. Above 10, you start seeing different organizational phenomena. Third, methodological coherence: including larger firms would introduce confounding variables (middle management layers, formal HR, departmentalization) that would muddy the analysis. The deliberate narrow focus is a strength — it fills the exact gap identified in the literature.`
            },

            // ─────────────────────────────────────────────────────
            // CATEGORY 6: LIMITATIONS & VALIDITY
            // ─────────────────────────────────────────────────────
            {
                id: 'L1',
                question: 'Your biggest limitation is the cross-sectional design. How do you know these patterns hold over time?',
                difficulty: 'high',
                likelyAskedBy: 'Prof. Royer',
                answer: `You're right — this is the most significant limitation. I capture a snapshot, not a movie. However, I mitigated this in two ways. First, the semi-structured interviews included retrospective questions — founders described their organizational evolution, not just the current state. This provides developmental narratives, though filtered through memory and hindsight bias. Second, the cases naturally represent different stages (pre-seed to growth), so cross-case comparison creates a "synthetic longitudinal" view — we see what early-stage looks like (Cases B, E, G) and what later-stage looks like (Cases A, D, F). That said, true longitudinal research — following the same startups through the 6-8 person threshold over 2-3 years — would be immensely valuable and is my top recommendation for future research.`
            },
            {
                id: 'L2',
                question: 'How do you address researcher bias in your interpretive approach?',
                difficulty: 'medium',
                likelyAskedBy: 'Both supervisors',
                answer: `Reflexive thematic analysis (Braun & Clarke) explicitly acknowledges that the researcher's perspective shapes the analysis — this is a feature, not a bug, of interpretivist research. However, I took concrete steps to maintain analytical rigor: I kept a reflexive journal documenting my assumptions, surprises, and analytical decisions throughout the process. I conducted the coding in multiple phases with time gaps between them, allowing fresh perspectives. I used within-case profiling before cross-case synthesis to let each case "speak" before imposing patterns. And I actively sought disconfirming evidence — for example, Case F challenges the narrative of "culture always wins" by showing that even with some cultural gaps, framework implementation provided partial benefits. I reported all seven cases honestly, including those that complicated the emerging patterns.`
            },
            {
                id: 'L3',
                question: 'Social desirability bias — founders might present their companies more positively. How did you handle this?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `This is a real concern with founder interviews. I addressed it through several interview techniques: I asked for specific examples and concrete stories rather than general self-assessments. When founders claimed high agility, I probed for specific instances — "Can you describe a time when you had to pivot quickly? What happened?" I also asked about challenges and failures explicitly — "What didn't work?" "Where did you struggle?" The interview guide included questions about difficulties, not just successes. Additionally, cross-case comparison helps — if one founder's claims are significantly outliers without supporting evidence, that becomes apparent. Case F is actually a good example of honest reporting — the founder acknowledged the gap between framework implementation and actual agility outcomes, which suggests willingness to share genuine challenges.`
            },

            // ─────────────────────────────────────────────────────
            // CATEGORY 7: PRACTICAL IMPACT & IMPLICATIONS
            // ─────────────────────────────────────────────────────
            {
                id: 'P1',
                question: 'What is the practical relevance of your research for founders?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `The practical relevance is threefold. First, the five-layer framework gives founders a structured way to think about organizational design — instead of blindly adopting Scrum or Kanban, they can assess their context, build cultural foundations, and then select appropriate structural mechanisms. Second, the six guiding principles provide actionable guidance — especially Principle 5 about the 6-8 person threshold, which gives founders a concrete planning trigger: "When your team approaches 6-8 people, proactively implement coordination mechanisms." Third, the finding about experience over frameworks has hiring implications: founders should prioritize team members with agile mindset and experience over framework certifications. For incubators and accelerators, this research suggests that mentoring programs should focus on cultural development rather than framework training.`
            },
            {
                id: 'P2',
                question: 'If you had to give a founder ONE piece of advice from your research, what would it be?',
                difficulty: 'low',
                likelyAskedBy: 'Both supervisors',
                answer: `Build trust and psychological safety first — before choosing any framework, before implementing any process. My research consistently shows that cultural foundations are the prerequisite for everything else. The cases that achieved high agility all had strong cultural foundations, regardless of whether they used Scrum, Kanban, their own methods, or no formal framework at all. Conversely, Case F shows that even a well-implemented framework underperforms without the cultural basis. So: invest in trust, create psychological safety for experimentation, encourage learning from failure, and lead by enabling rather than controlling. The structure can come later and will be more effective when built on this foundation.`
            },
            {
                id: 'P3',
                question: 'How does your research relate to existing startup advice and frameworks like Lean Startup or Agile?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Royer',
                answer: `My research complements Lean Startup (Ries, 2011) and agile methodologies but addresses a different level. Lean Startup focuses on product-market fit and business model validation — it's about WHAT to build. Agile methodologies (Scrum, Kanban) focus on HOW to build it — the software development process. My research focuses on how to ORGANIZE the team that builds it — the organizational design question. These three levels interact but are distinct. Importantly, my finding that organizational agility differs from software agility directly challenges the assumption that implementing Scrum = creating an agile organization. A team can be agile in their development process but rigid in their organizational structure, or vice versa. The five-layer framework provides the organizational layer that Lean Startup and Agile methodologies don't address.`
            },

            // ─────────────────────────────────────────────────────
            // CATEGORY 8: SPECIFIC/DETAILED QUESTIONS
            // ─────────────────────────────────────────────────────
            {
                id: 'S1',
                question: 'Can you explain the within-case and cross-case analysis process in more detail?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Royer',
                answer: `The analysis followed a two-phase process. Phase 1 — Within-case profiling: Each of the seven cases was analyzed independently. I created detailed profiles covering organizational context, agility practices, leadership approach, cultural elements, structural mechanisms, and challenges. This resulted in seven standalone case narratives. Phase 2 — Cross-case synthesis: I created a comparison matrix with key dimensions (trust level, learning orientation, leadership style, framework choice, threshold awareness, agility outcome) and populated it for all seven cases. This matrix revealed patterns: for instance, high trust appeared in 6/7 cases with high agility, while Case F with medium trust achieved only medium agility. The five success factors, the experience-over-framework finding, and the 6-8 person threshold all emerged from this cross-case comparison. The framework was then constructed to integrate these patterns into a coherent model.`
            },
            {
                id: 'S2',
                question: 'Why did you include both tech and non-tech startups?',
                difficulty: 'low',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `This was deliberate through maximum variation sampling. Including diverse sectors (railway, water, consulting, software, AI, firefighting) tests whether the findings are sector-specific or cross-cutting. If trust and psychological safety only mattered in tech startups, that would be a sector-specific finding. But since these factors appeared consistently across ALL sectors — including highly regulated ones like railway and medical — the finding is more robust. The sector diversity also allowed me to identify how Contingency Theory operates: the SAME cultural foundations (universal) lead to DIFFERENT structural mechanisms depending on sector regulations. This variation is precisely what makes the contingency argument compelling.`
            },
            {
                id: 'S3',
                question: 'What was the most surprising finding in your research?',
                difficulty: 'low',
                likelyAskedBy: 'Both supervisors',
                answer: `The most surprising finding was the magnitude of difference between team experience and framework choice. I expected frameworks to matter more. Going in, I assumed that startups with well-implemented methodologies (like Case F with full Scrum) would outperform those without formal frameworks. The opposite pattern emerged: Case C with no formal framework but deep experience achieved high agility, while Case F with comprehensive Scrum achieved only medium. This challenged my initial assumptions and required me to revisit the data multiple times to verify the pattern. The second surprise was how clearly the 6-8 person threshold emerged — it was not something I was specifically looking for, but multiple founders independently described the same inflection point.`
            },
            {
                id: 'S4',
                question: 'How does Geschäftsführer liability specifically limit agile practices?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `In German GmbH law, the Geschäftsführer (managing director) bears personal liability for certain decisions — including tax compliance, insolvency obligations, and duty of care. This means that unlike Silicon Valley startups where flat hierarchies can fully distribute decision-making, German founders MUST retain final authority over certain categories of decisions. This creates an inherent tension with agile principles of full team autonomy and distributed decision-making. In practice, startups handle this through what I call "bounded autonomy" — teams have freedom within defined boundaries, but certain decisions (financial, legal, compliance) remain with the Geschäftsführer. This is why pure agile is structurally impossible in Germany, and why Principle 4 states hybrid models are a pragmatic necessity. The founders I interviewed viewed this not as a failure but as responsible governance.`
            },
            {
                id: 'S5',
                question: 'Could you elaborate on the differences between Case C and Case F? Why did one succeed and the other not?',
                difficulty: 'medium',
                likelyAskedBy: 'Both supervisors',
                answer: `Case C is an organizational consulting startup (5 people, ramp-up stage) founded by someone with 10+ years of consulting experience across multiple methodologies. The founder deliberately chose NOT to adopt a formal framework but instead extracted principles from Scrum, Kanban, and OKR, creating a custom matrix approach tailored to their context. The team had deep agile experience and internalized agile thinking. Result: high agility. Case F is a software development firm (5 people, growth stage, self-funded) that implemented full Scrum — sprints, ceremonies, roles, artifacts. However, the team was newer to agile thinking. They followed the framework MECHANICALLY without deeply understanding the underlying principles. The result was "framework compliance without internalized principles" — medium agility. The critical difference: Case C had agile MINDSET without the framework; Case F had the framework without the mindset. Mindset proved more powerful.`
            },
            {
                id: 'S6',
                question: 'What role does funding type play in organizational agility?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `Funding type emerged as a Layer 1 contextual factor that shapes structural requirements. EXIST-funded startups (B, E, G) face government milestone reporting requirements, creating a need for structured planning alongside agile delivery. VC/Investment-funded startups (Case A) face investor reporting and potentially board oversight, adding formal governance requirements. Bootstrapped/self-funded startups (D, F) have maximum structural freedom but may face resource constraints that limit team development investment. Strategic funding (Case C) brings its own dependencies. Importantly, funding type didn't determine agility LEVEL — EXIST-funded cases achieved both high (B, G) and medium (E) agility. But it DID influence which structural mechanisms were necessary, supporting the Contingency Theory argument that context shapes optimal structure.`
            },

            // ─────────────────────────────────────────────────────
            // CATEGORY 9: CHALLENGING / PROVOCATIVE QUESTIONS
            // ─────────────────────────────────────────────────────
            {
                id: 'C1',
                question: 'Isn\'t "culture before structure" just common sense? What\'s the academic contribution?',
                difficulty: 'high',
                likelyAskedBy: 'Prof. Royer',
                answer: `It might seem intuitive in retrospect, but the PRACTICE contradicts this in two ways. First, the practitioner literature overwhelmingly focuses on framework selection — "choose Scrum or Kanban," "implement SAFe" — essentially structure-first advice. My research provides empirical evidence that this approach is backwards for micro-enterprises. Second, even in academic literature, organizational design research typically examines structure and culture as parallel or co-evolving elements, not sequential. The finding that in micro-enterprises, the sequence matters — that culture must be established BEFORE structure — is a specific, empirically grounded claim that adds nuance to existing organizational theory. Good research sometimes validates what seems obvious but hasn't been rigorously demonstrated, especially for a specific population (micro-enterprises) where assumptions from larger organizations shouldn't be taken for granted.`
            },
            {
                id: 'C2',
                question: 'If your research is exploratory, isn\'t it premature to offer principles and frameworks?',
                difficulty: 'high',
                likelyAskedBy: 'Prof. Royer',
                answer: `This is a valid epistemological question. The framework and principles are presented as PRELIMINARY and evidence-based, not as definitive prescriptions. Eisenhardt's (1989) case study methodology explicitly supports theory building from cases — the output is propositions and conceptual frameworks, not tested hypotheses. The principles are derived from empirical patterns across seven diverse cases, making them more than speculation but less than validated theory. I'm transparent about this: the framework "requires further validation" and the principles are "evidence-based" within the qualitative paradigm. The alternative — waiting until quantitative validation is available — would leave practitioners without any research-based guidance for potentially years. The framework provides a useful starting point that future research can refine, validate, or challenge. This iterative approach to theory building is standard in organizational research.`
            },
            {
                id: 'C3',
                question: 'You mention sustainability in your research question, but do your findings really address long-term sustainability?',
                difficulty: 'high',
                likelyAskedBy: 'Both supervisors',
                answer: `Honest answer: partially. The cross-sectional design limits what I can say about long-term sustainability directly. What I CAN address is the foundations for sustainability — the five success factors and the cultural foundation argument are about building durable organizational DNA rather than quick fixes. Principle 6 specifically addresses this: "Preserve Culture During Growth" — acknowledging that agility often peaks in the first 1-2 years. The 6-8 person threshold finding is also about sustainability — it identifies a point where agility is at risk if not proactively managed. However, true validation of sustainability requires longitudinal data, which I recommend as future research. The research question includes sustainability as an aspiration — the findings provide the conditions believed to enable it, but proving long-term sustainability requires long-term study.`
            },
            {
                id: 'C4',
                question: 'What would you do differently if you were to redo this research?',
                difficulty: 'medium',
                likelyAskedBy: 'Both supervisors',
                answer: `Three things. First, I would include at least one team member interview per case alongside the founder interview — this multi-perspective data would significantly strengthen the findings and address the single-source limitation. Second, I would add a brief follow-up interview 6 months later to introduce a longitudinal element, even if modest — this would help assess whether the patterns persist over time. Third, I might have included 2-3 more cases (reaching 9-10 total) to further strengthen analytical generalization, particularly adding a case that explicitly failed or pivoted significantly. That said, the core methodology — qualitative multi-case study with maximum variation sampling and reflexive thematic analysis — I would keep the same. It was appropriate for the research questions and produced rich, meaningful findings.`
            },
            {
                id: 'C5',
                question: 'Your research is about organizational agility, but isn\'t agility becoming less important in the current economic climate favoring efficiency?',
                difficulty: 'medium',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `This is a relevant contemporary question. The argument that efficiency trumps agility in tough economic times actually SUPPORTS the need for my research. In resource-constrained environments, startups cannot afford to waste time and money on the wrong framework or unnecessary formalization. My findings suggest the most efficient path to agility is cultural investment (which is low-cost) rather than framework implementation (which can be expensive and time-consuming). Furthermore, agility and efficiency are not opposed — in micro-enterprises, agility IS efficiency. When a 4-person team can pivot quickly without bureaucratic overhead, they're being both agile AND efficient. The 6-8 person threshold finding helps founders avoid INEFFICIENT coordination problems. In economic downturns, the ability to adapt quickly is arguably MORE important, not less.`
            },
            {
                id: 'C6',
                question: 'How do you see AI and remote work affecting your framework in the future?',
                difficulty: 'low',
                likelyAskedBy: 'Prof. Ludwig',
                answer: `Interesting question. AI tools could affect the 6-8 person threshold by enabling smaller teams to accomplish more — potentially delaying or shifting the inflection point. If AI handles coordination tasks (scheduling, documentation, status updates), the communication overhead formula might change. Remote work affects Layer 2 (Cultural Foundations) significantly — building trust and psychological safety is harder remotely. It also affects Layer 3 (Structural Mechanisms) — distributed teams may need MORE formal coordination mechanisms earlier. The framework's five-layer structure would remain valid, but the specific content within layers would need updating. Layer 1 would need to include "distributed/co-located" as a contextual factor. These are excellent directions for future research — my framework provides the scaffold that can be adapted as workplace dynamics evolve.`
            }
        ]
    }
];

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.SLIDES = SLIDES;
    window.BACKUP_SLIDES = BACKUP_SLIDES;
    window.SECTIONS = SECTIONS;
    window.DEFENSE_QA = DEFENSE_QA;
}
