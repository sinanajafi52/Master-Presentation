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
            subtitle: 'A Qualitative Multi-Case Study of Early-Stage German Startups (2-10 Employees)',
            author: 'Sina Najafi',
            role: "Master's Thesis Defense",
            institution: 'Ostfalia University of Applied Sciences',
            faculty: 'Faculty of Business Administration',
            supervisor: 'Prof. Dr. Denis Royer',
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
            problems: [
                'Existing organizational agility research focuses on large enterprises (50+ employees)',
                'Founders face critical decisions without evidence-based guidance:',
            ],
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
        title: 'Research Question',
        shortTitle: 'Question',
        duration: 90,
        isBackup: false,
        content: {
            type: 'question',
            mainQuestion: 'How can early-stage German startups (2-10 employees) design agile business structures that enable organizational adaptability, scalability, and long-term sustainability?',
            subQuestions: [
                'Sub-RQ1: What constitutes organizational agility in early-stage startups vs. software agile methodologies?',
                'Sub-RQ2: What structural, cultural, and leadership factors enable or constrain agility?',
                'Sub-RQ3: How can startups maintain agility while scaling, and what obstacles emerge?',
                'Sub-RQ4: What design principles help founders sustain agile organizational structures?'
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
                    explains: 'HOW',
                    description: 'Sensing → Seizing → Transforming mechanisms',
                    color: 'theory'
                },
                {
                    name: 'Complexity Leadership Theory',
                    abbrev: 'CLT',
                    author: 'Uhl-Bien et al., 2007',
                    explains: 'WHO',
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
                coding: 'Manual coding for transparency and depth', processFlow: [{ step: 'Sampling', desc: 'Max Variation (7 Cases)' }, { step: 'Collection', desc: 'Interviews (445 min)' }, { step: 'Coding', desc: 'Reflexive Thematic' }, { step: 'Synthesis', desc: 'Cross-Case Matrix' }, { step: 'Findings', desc: 'Factors & Framework' }],
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

    // ===== SLIDE 6: Key Finding #1 - Success Factors =====
    {
        id: 6,
        section: 'findings',
        sectionColor: 'findings',
        title: 'Finding #1: Success Factors Across Cases',
        shortTitle: 'Success Fact...',
        duration: 120,
        isBackup: false,
        content: {
            type: 'factors',
            headline: 'Five Success Factors Present Across All Seven Cases Examined',
            factors: [
                {
                    icon: '🤝',
                    title: 'Trust & Psychological Safety',
                    description: 'Foundation enabling risk-taking and experimentation',
                    evidence: 'Present in all seven cases'
                },
                {
                    icon: '📚',
                    title: 'Learning Orientation',
                    description: 'Continuous improvement over rigid process adherence',
                    evidence: 'Manifested through retrospectives, feedback loops'
                },
                {
                    icon: '🌱',
                    title: 'Servant Leadership',
                    description: 'Enabling team autonomy and professional growth',
                    evidence: 'Founders focused on removing blockers'
                },
                {
                    icon: '🎯',
                    title: 'Results Focus > Process Compliance',
                    description: 'Outcomes prioritized over ceremony adherence',
                    evidence: '"Ship working software" mentality'
                },
                {
                    icon: '⚙️',
                    title: 'Selective Framework Customization',
                    description: 'Frameworks adapted to context, not vice versa',
                    evidence: 'Context-dependent implementation'
                }
            ]
        },
        notes: 'These five factors were found in all seven cases examined. This is the foundation. Culture beats structure.'
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
                    items: 'Trust | Psychological Safety | Learning Orientation | Results Focus',
                    isPrerequisite: true
                },
                {
                    number: 3,
                    name: 'Structural Mechanisms',
                    type: 'structure',
                    description: 'Context-Dependent',
                    items: 'Flat Hierarchies | Role Design | Decision Distribution'
                },
                {
                    number: 4,
                    name: 'Leadership Approaches',
                    type: 'leadership',
                    description: 'Enabling Dynamics',
                    items: 'Servant Leadership | Threshold-Aware | Adaptive-Enabling Balance'
                },
                {
                    number: 5,
                    name: 'Agility Outcomes',
                    type: 'outcomes',
                    description: 'Desired Results',
                    items: 'Adaptability | Speed | Flexibility | Resilience | Sustainable Growth'
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
                    description: 'Add structure incrementally as team grows; avoid premature bureaucracy. The 6-8 person threshold requires proactive coordination mechanisms.'
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
                    description: 'This critical inflection point requires proactive structural intervention through domain-based decisions or regular alignment meetings.'
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
            limitations: [
                {
                    icon: '📊',
                    title: 'Sample Size',
                    description: '7 cases enable pattern identification, not statistical generalization'
                },
                {
                    icon: '🌍',
                    title: 'Geographic Scope',
                    description: 'Germany only—institutional context matters for transferability'
                },
                {
                    icon: '📸',
                    title: 'Cross-Sectional Design',
                    description: 'Snapshot in time, not longitudinal tracking'
                },
                {
                    icon: '👤',
                    title: 'Founder Perspectives',
                    description: 'Self-reported data, no team member interviews'
                },
                {
                    icon: '📏',
                    title: 'Size Range',
                    description: 'Findings specific to 2-10 employees, may not apply beyond'
                }
            ],
            futureResearch: [
                'Longitudinal studies tracking startups through critical threshold',
                'Quantitative validation of experience-framework contribution differential',
                'Extension to other European institutional contexts',
                'Team member perspective studies',
                'Larger sample for statistical generalization'
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
            theoretical: [
                'Contributes to organizational agility theory by examining micro-enterprises (2-10 employees)',
                'Integrates Dynamic Capabilities + Complexity Leadership + Contingency theories',
                'Identifies and validates critical 6-8 person threshold with mathematical proof',
                'Suggests team experience contributes substantially more to agility outcomes than framework choice'
            ],
            practical: [
                'Five-layer framework for designing adaptive, scalable micro-enterprises',
                'Six evidence-based guiding principles for German startup founders',
                'Context-appropriate guidance accounting for German institutional environment'
            ],
            conclusion: '"Organizational agility in micro-enterprises is fundamentally cultural rather than structural—foundations must precede frameworks, and context always matters."',
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
            cases: [
                { id: 'A', sector: 'Railway Infrastructure', stage: 'Early Scaling', size: 7, funding: 'Investment', challenge: 'Regulatory compliance', agility: '5/10 (was higher)' },
                { id: 'B', sector: 'Water Quality Monitoring', stage: 'Early Growth', size: 2, funding: 'EXIST', challenge: 'Resource constraints', agility: 'High' },
                { id: 'C', sector: 'Organizational Consulting', stage: 'Ramp-up', size: 5, funding: 'Strategic', challenge: 'Matrix coordination', agility: 'High' },
                { id: 'D', sector: 'Business Consulting', stage: 'Growth', size: 6, funding: 'Bootstrap', challenge: 'Project-based scaling', agility: 'High' },
                { id: 'E', sector: 'Autonomous Firefighting', stage: 'Pre-seed', size: 4, funding: 'EXIST', challenge: 'Technical complexity', agility: 'Medium' },
                { id: 'F', sector: 'Software Development', stage: 'Growth', size: 5, funding: 'Self-funded', challenge: 'Multi-sector clients', agility: 'Medium' },
                { id: 'G', sector: 'Medical Education AI', stage: 'Pre-seed', size: 4, funding: 'EXIST', challenge: 'Medical regulations', agility: 'High' }
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
            aspects: [
                {
                    title: 'Geschäftsführer Liability',
                    description: 'Personal liability of managing directors creates risk-averse documentation culture',
                    implication: 'Limits purely agile approaches; requires some formalization'
                },
                {
                    title: 'EXIST Funding Constraints',
                    description: 'Government startup funding comes with reporting requirements',
                    implication: 'Structured milestone tracking needed alongside agile delivery'
                },
                {
                    title: 'Sector-Specific Regulations',
                    description: 'Railway (EBA), Medical devices (MDR), etc. have strict requirements',
                    implication: 'Hybrid models necessary to combine agility with compliance'
                },
                {
                    title: 'Works Council Potential',
                    description: 'At 5+ employees, workers can form works council (Betriebsrat)',
                    implication: 'Influences decision-making processes and organizational structure'
                }
            ],
            keyTakeaway: 'German startups cannot fully adopt Silicon Valley agile models; hybrid approaches are a pragmatic necessity, not a failure.'
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
            dimensions: ['Trust Level', 'Learning Orientation', 'Leadership Style', 'Framework Usage', 'Threshold Awareness', 'Agility Outcome'],
            cases: {
                'A': ['High', 'High', 'Servant', 'Adapted OKR+Scrum', 'Proactive', '5/10 (was higher)'],
                'B': ['High', 'High', 'Servant', 'Adapted Scrum', 'N/A (2 people)', 'High'],
                'C': ['High', 'High', 'Servant', 'Custom Matrix', 'Aware', 'High'],
                'D': ['High', 'High', 'Servant', 'Project-based', 'Learning', 'High'],
                'E': ['High', 'High', 'Collaborative', 'Minimal', 'N/A (4 people)', 'Medium'],
                'F': ['Medium', 'Medium', 'Semi-agile', 'Full Scrum', 'Unaware', 'Medium'],
                'G': ['High', 'High', 'Servant', 'Minimal', 'N/A (4 people)', 'High']
            }
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

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.SLIDES = SLIDES;
    window.BACKUP_SLIDES = BACKUP_SLIDES;
    window.SECTIONS = SECTIONS;
}
