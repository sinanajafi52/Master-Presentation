/**
 * Defense Q&A Panel
 * Priority-sorted Q&A with short memorable answers
 */

// ─────────────────────────────────────────────────────────────
// METADATA: priority + short answer for each question
// priority 1 = Almost certain to be asked
// priority 2 = Very likely
// priority 3 = Possible
// ─────────────────────────────────────────────────────────────
const QA_META = {
    // ── METHODOLOGY ──
    'M1': {
        priority: 1,
        shortAnswer: `The question asks "how" — that's exploratory. No validated scales exist for micro-enterprises yet. We need to understand what's happening before we can measure it. Multi-case qualitative study is the gold standard for this type of question.`
    },
    'M2': {
        priority: 1,
        shortAnswer: `I'm doing analytical generalization, not statistical. Eisenhardt recommends 4–10 cases for theory building. My 7 cases vary across sector, size, stage, and funding — patterns that persist despite this variation are robust. Saturation was also reached.`
    },
    'M3': {
        priority: 2,
        shortAnswer: `Deliberate choice. With 445 minutes of interviews, the dataset was manageable manually. Manual coding forces deeper engagement than software tools would allow. I also maintained a coding journal for full transparency.`
    },
    'M4': {
        priority: 1,
        shortAnswer: `I used Lincoln & Guba's trustworthiness criteria: credibility through reflexive journaling, transferability through thick case descriptions, dependability through an audit trail, and confirmability by acknowledging my own positionality throughout.`
    },
    'M5': {
        priority: 2,
        shortAnswer: `Founders can explain the WHY behind decisions — observation shows what, not why. Documents barely exist in 2–10 person startups. Semi-structured interviews give consistency across cases plus the depth to probe unexpected themes.`
    },
    'M6': {
        priority: 2,
        shortAnswer: `I used maximum variation sampling — deliberately choosing diversity across sector, size, stage, and funding. I did NOT select for success. The sample includes high and medium agility cases, which is the opposite of selection bias.`
    },
    'M7': {
        priority: 2,
        shortAnswer: `Braun & Clarke's approach: codes evolve organically from the data, not set upfront. Researcher perspective is a resource, not a problem. Appropriate for exploratory research — I needed to discover patterns, not confirm preset categories.`
    },
    'M8': {
        priority: 1,
        shortAnswer: `In 2–10 person startups, the founder IS the organizational architect — they make every structural decision. For research on organizational design, founder perspective is primary. Team member triangulation is acknowledged as a limitation and recommended for future research.`
    },

    // ── THEORY ──
    'T1': {
        priority: 1,
        shortAnswer: `Each theory answers a different question: DCT → WHAT agility mechanisms look like. CLT → HOW leadership enables agility. Contingency → WHY outcomes vary by context. No single theory covers all three — together they give a complete picture.`
    },
    'T2': {
        priority: 1,
        shortAnswer: `The core logic holds, but mechanisms differ at small scale. Sensing: direct founder-customer contact. Seizing: faster with shorter decision chains. Transforming: more fluid with less inertia. Showing how DCT manifests differently at micro-enterprise scale is itself a theoretical contribution.`
    },
    'T3': {
        priority: 1,
        shortAnswer: `The five-layer framework IS the integration. Context (Contingency) shapes what capabilities (DCT) are possible and which leadership (CLT) is effective. They interact — they don't just sit side by side as three separate lenses.`
    },
    'T4': {
        priority: 1,
        shortAnswer: `Three contributions: first integration of DCT + CLT + Contingency Theory specifically for micro-enterprises; evidence that DCT mechanisms work differently at small scale; and the five-layer framework showing that culture must precede structure — which challenges the "framework-first" approach.`
    },

    // ── FINDINGS ──
    'F1': {
        priority: 1,
        shortAnswer: `Case C: no formal framework, 10+ years experience → high agility. Case F: full Scrum, newer to agile mindset → only medium agility. Pattern is consistent across all cases. I say "substantially more" not a specific multiplier — quantitative validation is recommended future research.`
    },
    'F2': {
        priority: 1,
        shortAnswer: `Brooks' Law is about adding people to late software projects. My finding is about organizational structure in general. More importantly: I provide empirical validation from real startups. The actionable guidance — prepare BEFORE reaching the threshold — is the distinct contribution.`
    },
    'F3': {
        priority: 1,
        shortAnswer: `"Universal" means consistent across all 7 studied cases despite maximum variation. A better word would be "consistently present." The strength is that these factors held across railway, consulting, software, and medical AI — very different contexts.`
    },
    'F4': {
        priority: 1,
        shortAnswer: `Qualitative composite: decision speed, flexibility, responsiveness, and growth capacity — triangulated with concrete examples from each interview. Case B pivoted their entire product in one week = high agility. Case F had month-long cycles with no ability to deviate = medium agility.`
    },
    'F5': {
        priority: 2,
        shortAnswer: `Yes — multi-sector clients, self-funding limits, or sector dynamics could also explain it. But Cases C and D faced equally complex contexts and still achieved high agility with experienced teams. Convergence across cases reduces — but doesn't eliminate — alternative explanations.`
    },
    'F6': {
        priority: 1,
        shortAnswer: `Not software agile — organizational agility: the capability to sense environmental changes, make timely decisions, and reconfigure resources rapidly. Four dimensions: decision speed, structural flexibility, market responsiveness, sustainable adaptability. In micro-enterprises, it's fundamentally cultural — not procedural.`
    },

    // ── FRAMEWORK ──
    'FW1': {
        priority: 1,
        shortAnswer: `Each layer emerged from cross-case analysis of all 7 cases. The ordering — context, culture, structure, leadership, outcomes — reflects observed causal patterns. Cases that built culture before structure consistently achieved higher agility. It's a first-generation framework that needs further validation.`
    },
    'FW2': {
        priority: 1,
        shortAnswer: `In mature organizations yes — it's bidirectional. But in early-stage micro-enterprises there is essentially no formal structure yet. Culture IS the organization at 2–5 employees. The founder embeds culture first, structure comes later as a response to growth. Schein (2010) supports this sequence.`
    },
    'FW3': {
        priority: 2,
        shortAnswer: `Diagnostic and planning tool. Assess context first → build cultural foundations → add appropriate structure → align leadership to enable not control → define outcomes and iterate. The six guiding principles give concrete "how-to" guidance at each step.`
    },
    'FW4': {
        priority: 2,
        shortAnswer: `These are empirically derived from micro-enterprise data, not adapted from large firms. Principle 4 directly addresses German legal constraints. Principle 5 gives a specific trigger: 6–8 people. Not generic "be agile" advice — but what, when, for what size, in this specific context.`
    },

    // ── GERMAN CONTEXT ──
    'G1': {
        priority: 2,
        shortAnswer: `Geschäftsführer personal liability means founders must retain final authority on certain decisions — pure flat hierarchy is legally impossible. EXIST funding requires milestone reporting alongside agile delivery. Sector regulations like EBA and MDR mandate compliance documentation. Hybrid models are a legal necessity, not a failure.`
    },
    'G2': {
        priority: 2,
        shortAnswer: `Cultural foundations (Layer 2) — trust, safety, learning — are likely universal. Layer 1 is explicitly German. The framework design transfers; Layer 1 content must be adapted. Austria and Switzerland: high transferability. USA: significant recalibration needed due to different liability, employment, and funding structures.`
    },
    'G3': {
        priority: 2,
        shortAnswer: `Three reasons: genuine research gap (74.6% of German startups have no existing research addressing them). Qualitatively different dynamics — no middle management, founder dominance. Above 10 employees, different organizational phenomena emerge. The narrow focus IS the contribution — it fills the exact identified gap.`
    },

    // ── LIMITATIONS ──
    'L1': {
        priority: 1,
        shortAnswer: `The most significant limitation — I acknowledge it directly. Mitigated by retrospective interview questions and cases at different stages that create a synthetic longitudinal view. True longitudinal research tracking the same startups through the 6–8 threshold is my top future research recommendation.`
    },
    'L2': {
        priority: 2,
        shortAnswer: `Reflexive TA acknowledges researcher perspective as a resource. Concrete steps: reflexive journal throughout, coding in multiple phases with time gaps between them, within-case profiling before cross-case synthesis, and actively seeking disconfirming evidence — which Case F provided.`
    },
    'L3': {
        priority: 2,
        shortAnswer: `I asked for specific examples and concrete stories — not general self-assessments. I explicitly asked about failures and difficulties. Cross-case comparison exposes outlier claims. Case F's honest reporting of the gap between Scrum implementation and actual agility shows founders shared genuine challenges.`
    },

    // ── PRACTICAL IMPACT ──
    'P1': {
        priority: 2,
        shortAnswer: `The framework gives founders a structured approach instead of blindly adopting Scrum. The 6–8 threshold gives a concrete planning trigger. The experience-over-framework finding has direct hiring implications. For incubators: focus mentoring on cultural development, not framework certification.`
    },
    'P2': {
        priority: 1,
        shortAnswer: `Build trust and psychological safety first — before any framework, before any process. Every high-agility case had strong cultural foundations regardless of which methodology they used. Case F shows that even a well-implemented framework underperforms without this cultural foundation.`
    },
    'P3': {
        priority: 2,
        shortAnswer: `Complementary but at different levels. Lean Startup: WHAT to build. Agile methods: HOW to build it. My research: HOW TO ORGANIZE the team. A team can be agile in development but rigid organizationally — or vice versa. My framework provides the organizational layer the others don't address.`
    },

    // ── SPECIFIC ──
    'S1': {
        priority: 2,
        shortAnswer: `Phase 1 — within-case: each case analyzed independently into detailed profiles. Phase 2 — cross-case: comparison matrix across all 7 cases on trust, learning, leadership, framework, threshold awareness, agility outcome. The patterns in that matrix became the three key findings.`
    },
    'S2': {
        priority: 2,
        shortAnswer: `Maximum variation — to test whether findings are sector-specific or cross-cutting. Trust and safety appearing consistently across railway, medical, consulting, and software shows cross-sector robustness. It also lets Contingency Theory show: same cultural foundations lead to different structures depending on sector regulations.`
    },
    'S3': {
        priority: 1,
        shortAnswer: `The most surprising: experience matters far more than framework choice. I expected frameworks to be more important. Case F with full Scrum should have outperformed Case C with no framework — but the opposite happened. I had to verify it multiple times. The 6–8 threshold also emerged independently across founders without being prompted.`
    },
    'S4': {
        priority: 2,
        shortAnswer: `In German GmbH law, the managing director bears personal liability for tax compliance, insolvency, and duty of care. Full distributed decision-making is legally impossible. Startups handle this through "bounded autonomy" — teams decide freely within defined limits, financial and compliance decisions stay with the founder.`
    },
    'S5': {
        priority: 2,
        shortAnswer: `Case C: consulting, experienced founder, no formal framework, extracted principles from multiple methods → high agility. Case F: software, newer to agile, full Scrum implemented mechanically without internalizing the principles → medium agility. The critical difference: mindset without framework beats framework without mindset.`
    },
    'S6': {
        priority: 3,
        shortAnswer: `Funding shapes required structures, not agility level directly. All funding types — EXIST, VC, bootstrap, self-funded — produced both high and medium agility cases. This confirms Contingency Theory: funding influences the structural mechanisms needed, not the outcome itself.`
    },

    // ── CHALLENGING ──
    'C1': {
        priority: 1,
        shortAnswer: `Seems obvious now, but practitioner literature overwhelmingly says framework first — choose Scrum, implement SAFe. Academic literature treats culture and structure as parallel. Empirical evidence specifically for micro-enterprises showing the sequence matters — and that getting it wrong costs agility — that's the contribution.`
    },
    'C2': {
        priority: 1,
        shortAnswer: `They're preliminary and evidence-based, not definitive prescriptions. Eisenhardt explicitly supports theory building from cases. The alternative — waiting for quantitative validation — leaves practitioners without any research-based guidance for years. The framework is a useful starting point for future research to refine or challenge.`
    },
    'C3': {
        priority: 1,
        shortAnswer: `Partially — the cross-sectional design limits long-term claims. But I address the foundations for sustainability: cultural DNA, the 6–8 threshold as a sustainability risk point, and Principle 6 on preserving culture during growth. Longitudinal validation is explicitly the top future research recommendation.`
    },
    'C4': {
        priority: 1,
        shortAnswer: `Three things I'd change: include one team member interview per case, add a brief 6-month follow-up for minimal longitudinal data, and include 9–10 cases — adding at least one that explicitly failed or pivoted significantly. The core methodology I would keep — it was the right approach.`
    },
    'C5': {
        priority: 2,
        shortAnswer: `In resource-constrained environments, you can't afford the wrong framework. Agility and efficiency aren't opposed in micro-enterprises — agility IS efficiency. Quick pivots without bureaucratic overhead are both agile and efficient. The 6–8 threshold helps founders avoid inefficient coordination problems before they occur.`
    },
    'C6': {
        priority: 3,
        shortAnswer: `AI could shift the 6–8 threshold — smaller teams doing more delays coordination complexity. Remote work makes building trust and psychological safety harder, possibly requiring more formal coordination earlier. The five-layer framework remains valid but Layer 1 context would need "distributed/co-located" as a new factor.`
    }
};

// ─────────────────────────────────────────────────────────────

class QAPanel {
    constructor() {
        this.isOpen = false;
        this.activeCategory = 'all';
        this.activePriority = 'all';
        this.searchQuery = '';
        this.expandedQuestion = null;
        this.showFullAnswer = {};

        this.categoryMap = {
            'M':  'Methodology',
            'T':  'Theory',
            'F':  'Findings',
            'FW': 'Framework',
            'G':  'German Context',
            'L':  'Limitations',
            'P':  'Practical',
            'S':  'Specific',
            'C':  'Challenging'
        };

        this.categoryColors = {
            'M':  '#3498DB',
            'T':  '#9B59B6',
            'F':  '#F39C12',
            'FW': '#1ABC9C',
            'G':  '#E74C3C',
            'L':  '#95A5A6',
            'P':  '#2ECC71',
            'S':  '#E67E22',
            'C':  '#E91E63'
        };

        this.priorityConfig = {
            1: { label: 'Must Ask',    color: '#E74C3C', bg: 'rgba(231,76,60,0.15)',  icon: '🔴' },
            2: { label: 'Very Likely', color: '#F39C12', bg: 'rgba(243,156,18,0.15)', icon: '🟡' },
            3: { label: 'Possible',    color: '#2ECC71', bg: 'rgba(46,204,113,0.15)', icon: '🟢' }
        };

        this._injectStyles();
        this._buildModal();
    }

    // ── helpers ──────────────────────────────────────────────

    _getAllQuestions() {
        if (typeof DEFENSE_QA === 'undefined') return [];
        const all = [];
        DEFENSE_QA.forEach(cat => {
            if (cat.questions) cat.questions.forEach(q => all.push(q));
        });
        return all;
    }

    _getCategoryPrefix(id) {
        const prefixes = ['FW', 'M', 'T', 'F', 'G', 'L', 'P', 'S', 'C'];
        for (const p of prefixes) {
            if (id.startsWith(p)) return p;
        }
        return id.charAt(0);
    }

    _getMeta(id) {
        return QA_META[id] || { priority: 3, shortAnswer: '' };
    }

    _getFilteredQuestions() {
        return this._getAllQuestions()
            .filter(q => {
                const prefix = this._getCategoryPrefix(q.id);
                const meta   = this._getMeta(q.id);
                const catOk  = this.activeCategory === 'all' || prefix === this.activeCategory;
                const priOk  = this.activePriority === 'all' || meta.priority === Number(this.activePriority);
                const term   = this.searchQuery.toLowerCase();
                const srchOk = term === '' ||
                    q.question.toLowerCase().includes(term) ||
                    q.answer.toLowerCase().includes(term) ||
                    (meta.shortAnswer || '').toLowerCase().includes(term);
                return catOk && priOk && srchOk;
            })
            .sort((a, b) => this._getMeta(a.id).priority - this._getMeta(b.id).priority);
    }

    _escapeHtml(text) {
        const d = document.createElement('div');
        d.appendChild(document.createTextNode(text));
        return d.innerHTML;
    }

    _highlight(text) {
        if (!this.searchQuery) return this._escapeHtml(text);
        const esc = this._escapeHtml(text);
        const q   = this._escapeHtml(this.searchQuery).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return esc.replace(new RegExp(`(${q})`, 'gi'),
            '<mark style="background:rgba(243,156,18,0.4);color:#fff;border-radius:2px;padding:0 1px">$1</mark>');
    }

    // ── styles ───────────────────────────────────────────────

    _injectStyles() {
        if (document.getElementById('qa-panel-styles')) return;
        const s = document.createElement('style');
        s.id = 'qa-panel-styles';
        s.textContent = `
        #qa-overlay {
            position:fixed;inset:0;background:rgba(0,0,0,.78);
            z-index:1000;display:flex;align-items:center;justify-content:center;
            animation:qaFadeIn .2s ease;
        }
        #qa-overlay.hidden{display:none}
        @keyframes qaFadeIn{from{opacity:0}to{opacity:1}}
        @keyframes qaSlideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

        #qa-modal {
            background:#0f1117;border:1px solid rgba(255,255,255,.12);border-radius:16px;
            width:90vw;max-width:880px;height:88vh;
            display:flex;flex-direction:column;
            box-shadow:0 24px 64px rgba(0,0,0,.65);
            animation:qaSlideUp .25s ease;overflow:hidden;
        }

        /* header */
        #qa-header {
            display:flex;align-items:center;justify-content:space-between;
            padding:16px 22px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0;
        }
        #qa-header h2{font-size:17px;font-weight:700;color:#fff;margin:0}
        #qa-header-meta{font-size:11px;color:rgba(255,255,255,.35);margin-left:8px}
        #qa-close{
            background:none;border:none;color:rgba(255,255,255,.45);
            font-size:22px;cursor:pointer;padding:2px 8px;border-radius:6px;line-height:1;
            transition:color .15s,background .15s;
        }
        #qa-close:hover{color:#fff;background:rgba(255,255,255,.08)}

        /* search */
        #qa-search-wrap{padding:12px 22px 8px;flex-shrink:0}
        #qa-search{
            width:100%;background:rgba(255,255,255,.06);
            border:1px solid rgba(255,255,255,.12);border-radius:10px;
            color:#fff;font-size:14px;padding:9px 13px;outline:none;
            transition:border-color .2s;box-sizing:border-box;
        }
        #qa-search::placeholder{color:rgba(255,255,255,.28)}
        #qa-search:focus{border-color:rgba(255,255,255,.3)}

        /* priority filter */
        #qa-priority-bar{
            display:flex;gap:6px;padding:0 22px 10px;flex-shrink:0;align-items:center;
        }
        .qa-pri-btn{
            background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
            border-radius:20px;color:rgba(255,255,255,.5);font-size:12px;font-weight:600;
            padding:4px 13px;cursor:pointer;transition:all .15s;white-space:nowrap;
        }
        .qa-pri-btn:hover{color:#fff;border-color:rgba(255,255,255,.25)}
        .qa-pri-btn.active{color:#fff;border-color:transparent}

        /* category filter */
        #qa-categories{
            display:flex;gap:5px;padding:0 22px 10px;flex-wrap:wrap;flex-shrink:0;
        }
        .qa-cat-btn{
            background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);
            border-radius:20px;color:rgba(255,255,255,.45);font-size:11px;font-weight:600;
            padding:3px 11px;cursor:pointer;transition:all .15s;white-space:nowrap;letter-spacing:.03em;
        }
        .qa-cat-btn:hover{color:#fff;border-color:rgba(255,255,255,.22)}
        .qa-cat-btn.active{color:#fff;border-color:transparent}

        /* count */
        #qa-count{padding:0 22px 6px;font-size:11px;color:rgba(255,255,255,.3);flex-shrink:0}

        /* list */
        #qa-list{
            overflow-y:auto;flex:1;padding:0 14px 14px;
            scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.15) transparent;
        }
        #qa-list::-webkit-scrollbar{width:4px}
        #qa-list::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:3px}

        /* item */
        .qa-item{
            border:1px solid rgba(255,255,255,.07);border-radius:10px;
            margin-bottom:7px;overflow:hidden;transition:border-color .15s;
        }
        .qa-item:hover{border-color:rgba(255,255,255,.14)}
        .qa-item.expanded{border-color:rgba(255,255,255,.2)}

        .qa-item-header{
            display:flex;align-items:flex-start;gap:9px;
            padding:11px 13px;cursor:pointer;user-select:none;
        }
        .qa-item-id{
            font-size:10px;font-weight:700;padding:2px 7px;border-radius:5px;
            flex-shrink:0;margin-top:2px;font-family:'Fira Code',monospace;letter-spacing:.04em;
        }
        .qa-item-question{font-size:13.5px;color:rgba(255,255,255,.88);line-height:1.45;flex:1}
        .qa-item-badges{display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0}
        .qa-pri-badge{
            font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px;
            text-transform:uppercase;letter-spacing:.06em;
        }
        .qa-chevron{color:rgba(255,255,255,.28);font-size:11px;transition:transform .2s;line-height:1}
        .qa-item.expanded .qa-chevron{transform:rotate(180deg)}

        /* body */
        .qa-item-body{display:none;padding:0 13px 13px;border-top:1px solid rgba(255,255,255,.06)}
        .qa-item.expanded .qa-item-body{display:block}
        .qa-asked-by{font-size:11px;color:rgba(255,255,255,.32);padding-top:9px;margin-bottom:9px}

        .qa-short-answer{
            font-size:14px;color:rgba(255,255,255,.82);line-height:1.7;
            background:rgba(255,255,255,.04);border-radius:8px;padding:11px 13px;
            border-left:3px solid;margin-bottom:8px;
        }
        .qa-toggle-full{
            background:none;border:1px solid rgba(255,255,255,.12);border-radius:6px;
            color:rgba(255,255,255,.4);font-size:11px;padding:4px 10px;cursor:pointer;
            transition:all .15s;
        }
        .qa-toggle-full:hover{color:rgba(255,255,255,.75);border-color:rgba(255,255,255,.25)}
        .qa-full-answer{
            font-size:12.5px;color:rgba(255,255,255,.55);line-height:1.75;
            margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.06);
            white-space:pre-wrap;display:none;
        }
        .qa-full-answer.visible{display:block}

        .qa-no-results{
            text-align:center;color:rgba(255,255,255,.28);
            padding:40px 20px;font-size:14px;
        }
        `;
        document.head.appendChild(s);
    }

    // ── build DOM ─────────────────────────────────────────────

    _buildModal() {
        const overlay = document.createElement('div');
        overlay.id = 'qa-overlay';
        overlay.className = 'hidden';
        overlay.innerHTML = `
            <div id="qa-modal" role="dialog" aria-modal="true">
                <div id="qa-header">
                    <div style="display:flex;align-items:center;gap:8px">
                        <h2>Defense Q&amp;A</h2>
                        <span id="qa-header-meta">43 questions · sorted by priority</span>
                    </div>
                    <button id="qa-close" aria-label="Close">&#x2715;</button>
                </div>
                <div id="qa-search-wrap">
                    <input id="qa-search" type="search" placeholder="Search questions or answers..." autocomplete="off"/>
                </div>
                <div id="qa-priority-bar"></div>
                <div id="qa-categories"></div>
                <div id="qa-count"></div>
                <div id="qa-list"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('#qa-close').addEventListener('click', () => this.close());
        overlay.addEventListener('click', e => { if (e.target === overlay) this.close(); });
        overlay.querySelector('#qa-search').addEventListener('input', e => {
            this.searchQuery = e.target.value;
            this._renderList();
        });

        this._renderPriorityBar();
        this._renderCategories();
        this._renderList();
    }

    _renderPriorityBar() {
        const bar = document.getElementById('qa-priority-bar');
        if (!bar) return;

        const all = this._getAllQuestions();
        const counts = { all: all.length, 1: 0, 2: 0, 3: 0 };
        all.forEach(q => { const p = this._getMeta(q.id).priority; counts[p] = (counts[p] || 0) + 1; });

        bar.innerHTML = `
            <button class="qa-pri-btn active" data-pri="all"
                style="background:rgba(255,255,255,.12)">All (${counts.all})</button>
            <button class="qa-pri-btn" data-pri="1"
                style="--pc:#E74C3C" title="Almost certain to be asked">
                🔴 Must Ask (${counts[1]})</button>
            <button class="qa-pri-btn" data-pri="2"
                style="--pc:#F39C12" title="Very likely">
                🟡 Very Likely (${counts[2]})</button>
            <button class="qa-pri-btn" data-pri="3"
                style="--pc:#2ECC71" title="Possible">
                🟢 Possible (${counts[3]})</button>
        `;

        bar.querySelectorAll('.qa-pri-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.activePriority = btn.dataset.pri;
                this.expandedQuestion = null;
                bar.querySelectorAll('.qa-pri-btn').forEach(b => {
                    b.classList.remove('active'); b.style.background = '';
                });
                btn.classList.add('active');
                const colors = { all: 'rgba(255,255,255,.12)', 1: 'rgba(231,76,60,.25)', 2: 'rgba(243,156,18,.25)', 3: 'rgba(46,204,113,.25)' };
                btn.style.background = colors[btn.dataset.pri] || '';
                this._renderList();
            });
        });
    }

    _renderCategories() {
        const container = document.getElementById('qa-categories');
        if (!container) return;

        const all = this._getAllQuestions();
        const counts = {};
        all.forEach(q => {
            const p = this._getCategoryPrefix(q.id);
            counts[p] = (counts[p] || 0) + 1;
        });

        let html = `<button class="qa-cat-btn active" data-cat="all"
            style="background:rgba(255,255,255,.1)">All topics</button>`;

        Object.entries(this.categoryMap).forEach(([prefix, label]) => {
            if (!counts[prefix]) return;
            const color = this.categoryColors[prefix] || '#888';
            html += `<button class="qa-cat-btn" data-cat="${prefix}"
                title="${label}" style="--cc:${color}">${label} (${counts[prefix]})</button>`;
        });

        container.innerHTML = html;

        container.querySelectorAll('.qa-cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.activeCategory = btn.dataset.cat;
                this.expandedQuestion = null;
                container.querySelectorAll('.qa-cat-btn').forEach(b => {
                    b.classList.remove('active'); b.style.background = '';
                });
                btn.classList.add('active');
                if (btn.dataset.cat === 'all') {
                    btn.style.background = 'rgba(255,255,255,.1)';
                } else {
                    const c = this.categoryColors[btn.dataset.cat];
                    if (c) btn.style.background = c + '28';
                }
                this._renderList();
            });
        });
    }

    _renderList() {
        const list    = document.getElementById('qa-list');
        const countEl = document.getElementById('qa-count');
        if (!list) return;

        const questions = this._getFilteredQuestions();
        if (countEl) countEl.textContent = `${questions.length} question${questions.length !== 1 ? 's' : ''} shown`;

        if (questions.length === 0) {
            list.innerHTML = '<div class="qa-no-results">No questions match your filter.</div>';
            return;
        }

        list.innerHTML = questions.map(q => {
            const prefix   = this._getCategoryPrefix(q.id);
            const catColor = this.categoryColors[prefix] || '#888';
            const meta     = this._getMeta(q.id);
            const pri      = this.priorityConfig[meta.priority];
            const expanded = this.expandedQuestion === q.id;
            const fullVis  = this.showFullAnswer[q.id];

            return `
            <div class="qa-item${expanded ? ' expanded' : ''}" data-id="${q.id}">
                <div class="qa-item-header">
                    <span class="qa-item-id"
                        style="background:${catColor}22;color:${catColor}">${q.id}</span>
                    <span class="qa-item-question">${this._highlight(q.question)}</span>
                    <div class="qa-item-badges">
                        <span class="qa-pri-badge"
                            style="background:${pri.bg};color:${pri.color}">
                            ${pri.icon} ${pri.label}
                        </span>
                        <span class="qa-chevron">&#9660;</span>
                    </div>
                </div>
                <div class="qa-item-body">
                    <div class="qa-asked-by">Likely asked by: ${q.likelyAskedBy}</div>
                    <div class="qa-short-answer"
                        style="border-color:${pri.color}">
                        ${this._highlight(meta.shortAnswer || q.answer)}
                    </div>
                    <button class="qa-toggle-full" data-id="${q.id}">
                        ${fullVis ? '▲ Hide full answer' : '▼ Show full answer'}
                    </button>
                    <div class="qa-full-answer${fullVis ? ' visible' : ''}"
                        id="qa-full-${q.id}">
                        ${this._highlight(q.answer)}
                    </div>
                </div>
            </div>`;
        }).join('');

        // click handlers
        list.querySelectorAll('.qa-item').forEach(item => {
            item.querySelector('.qa-item-header').addEventListener('click', () => {
                const id = item.dataset.id;
                this.expandedQuestion = this.expandedQuestion === id ? null : id;
                this._renderList();
                if (this.expandedQuestion === id) {
                    setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
                }
            });
        });

        list.querySelectorAll('.qa-toggle-full').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const id = btn.dataset.id;
                this.showFullAnswer[id] = !this.showFullAnswer[id];
                this._renderList();
            });
        });
    }

    // ── public API ────────────────────────────────────────────

    open() {
        const overlay = document.getElementById('qa-overlay');
        if (!overlay) return;
        overlay.classList.remove('hidden');
        this.isOpen = true;
        setTimeout(() => document.getElementById('qa-search')?.focus(), 100);
        if (window.keyboardController) window.keyboardController.disable();
    }

    close() {
        const overlay = document.getElementById('qa-overlay');
        if (!overlay) return;
        overlay.classList.add('hidden');
        this.isOpen = false;
        if (window.keyboardController) window.keyboardController.enable();
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    window.qaPanel = new QAPanel();
});

if (typeof window !== 'undefined') {
    window.QAPanel = QAPanel;
}
