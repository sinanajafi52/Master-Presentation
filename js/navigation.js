/**
 * Navigation Module
 * Handles slide navigation, mode switching, and UI updates
 */

class PresentationNavigation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = SLIDES.length;
        this.currentMode = 'sphere'; // 'sphere', 'linear', 'menu'
        this.isQuickJumpOpen = false;
        this.isMiniNavCollapsed = false;
        this.isHelpOpen = false;

        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.buildMiniNav();
        this.buildQuickJumpGrid();
        this.buildSlides();
        this.updateUI();
    }

    cacheElements() {
        // Mode buttons
        this.btnSphereMode = document.getElementById('btn-sphere-mode');
        this.btnLinearMode = document.getElementById('btn-linear-mode');
        this.btnMenuMode = document.getElementById('btn-menu-mode');

        // Navigation buttons
        this.btnPrev = document.getElementById('btn-prev');
        this.btnNext = document.getElementById('btn-next');
        this.btnQuickJump = document.getElementById('btn-quick-jump');
        this.btnFullscreen = document.getElementById('btn-fullscreen');
        this.btnHelp = document.getElementById('btn-help');

        // Slide indicators
        this.currentSlideNum = document.getElementById('current-slide-num');
        this.totalSlidesNum = document.getElementById('total-slides-num');
        this.progressFill = document.getElementById('progress-fill');

        // Containers
        this.sphereContainer = document.getElementById('sphere-container');
        this.slidesContainer = document.getElementById('slides-container');
        this.quickJumpOverlay = document.getElementById('quick-jump-overlay');
        this.quickJumpGrid = document.getElementById('quick-jump-grid');
        this.quickJumpBackupGrid = document.getElementById('quick-jump-backup-grid');
        this.quickJumpClose = document.getElementById('quick-jump-close');
        this.helpModal = document.getElementById('help-modal');
        this.helpModalClose = document.getElementById('help-modal-close');

        // Mini nav
        this.miniNav = document.getElementById('mini-nav');
        this.miniNavToggle = document.getElementById('mini-nav-toggle');
        this.miniNavList = document.getElementById('mini-nav-list');
    }

    setupEventListeners() {
        // Mode switching
        this.btnSphereMode?.addEventListener('click', () => this.setMode('sphere'));
        this.btnLinearMode?.addEventListener('click', () => this.setMode('linear'));
        this.btnMenuMode?.addEventListener('click', () => this.toggleQuickJump());

        // Navigation
        this.btnPrev?.addEventListener('click', () => this.prevSlide());
        this.btnNext?.addEventListener('click', () => this.nextSlide());
        this.btnQuickJump?.addEventListener('click', () => this.toggleQuickJump());
        this.quickJumpClose?.addEventListener('click', () => this.closeQuickJump());

        // Quick jump overlay click outside
        this.quickJumpOverlay?.addEventListener('click', (e) => {
            if (e.target === this.quickJumpOverlay) {
                this.closeQuickJump();
            }
        });

        // Help modal
        this.btnHelp?.addEventListener('click', () => this.toggleHelp());
        this.helpModalClose?.addEventListener('click', () => this.closeHelp());
        this.helpModal?.addEventListener('click', (e) => {
            if (e.target === this.helpModal) {
                this.closeHelp();
            }
        });

        // Fullscreen
        this.btnFullscreen?.addEventListener('click', () => this.toggleFullscreen());

        // Mini nav toggle
        this.miniNavToggle?.addEventListener('click', () => this.toggleMiniNav());

        // Sphere section click
        document.addEventListener('sphereSectionClick', (e) => {
            this.onSphereSectionClick(e.detail);
        });
    }

    buildMiniNav() {
        if (!this.miniNavList) return;

        this.miniNavList.innerHTML = '';

        SLIDES.forEach((slide, index) => {
            const item = document.createElement('li');
            item.className = 'mini-nav-item';
            item.dataset.slide = slide.id;

            item.innerHTML = `
                <span class="nav-dot" style="background: var(--color-${slide.sectionColor})"></span>
                <span class="nav-label">${slide.shortTitle}</span>
            `;

            item.addEventListener('click', () => this.goToSlide(slide.id));

            this.miniNavList.appendChild(item);
        });
    }

    buildQuickJumpGrid() {
        if (!this.quickJumpGrid) return;

        // Main slides
        this.quickJumpGrid.innerHTML = '';

        SLIDES.forEach((slide) => {
            const item = document.createElement('div');
            item.className = 'quick-jump-item';
            item.dataset.slide = slide.id;

            item.innerHTML = `
                <div class="slide-num">Slide ${slide.id}</div>
                <div class="slide-title">${slide.title}</div>
            `;

            item.addEventListener('click', () => {
                this.goToSlide(slide.id);
                this.closeQuickJump();
            });

            this.quickJumpGrid.appendChild(item);
        });

        // Backup slides
        if (this.quickJumpBackupGrid) {
            this.quickJumpBackupGrid.innerHTML = '';

            BACKUP_SLIDES.forEach((slide) => {
                const item = document.createElement('div');
                item.className = 'quick-jump-item backup';
                item.dataset.slide = slide.id;

                item.innerHTML = `
                    <div class="slide-num">${slide.id}</div>
                    <div class="slide-title">${slide.title}</div>
                `;

                item.addEventListener('click', () => {
                    this.goToBackupSlide(slide.id);
                    this.closeQuickJump();
                });

                this.quickJumpBackupGrid.appendChild(item);
            });
        }
    }

    buildSlides() {
        if (!this.slidesContainer) return;

        this.slidesContainer.innerHTML = '';

        // Main slides
        SLIDES.forEach((slide) => {
            const slideElement = this.createSlideElement(slide);
            this.slidesContainer.appendChild(slideElement);
        });

        // Backup slides
        BACKUP_SLIDES.forEach((slide) => {
            const slideElement = this.createSlideElement(slide, true);
            this.slidesContainer.appendChild(slideElement);
        });
    }

    createSlideElement(slide, isBackup = false) {
        const div = document.createElement('div');
        div.className = `slide ${isBackup ? 'backup-slide' : ''} ${slide.id === 1 ? 'active' : ''}`;
        div.id = `slide-${slide.id}`;
        div.dataset.slideId = slide.id;

        div.innerHTML = this.getSlideContent(slide);

        return div;
    }

    getSlideContent(slide) {
        const content = slide.content;

        switch (content.type) {
            case 'title':
                return this.getTitleSlideContent(slide, content);
            case 'problem':
                return this.getProblemSlideContent(slide, content);
            case 'question':
                return this.getQuestionSlideContent(slide, content);
            case 'theory':
                return this.getTheorySlideContent(slide, content);
            case 'methodology':
                return this.getMethodologySlideContent(slide, content);
            case 'factors':
                return this.getFactorsSlideContent(slide, content);
            case 'comparison':
                return this.getComparisonSlideContent(slide, content);
            case 'threshold':
                return this.getThresholdSlideContent(slide, content);
            case 'framework':
                return this.getFrameworkSlideContent(slide, content);
            case 'principles':
                return this.getPrinciplesSlideContent(slide, content);
            case 'limitations':
                return this.getLimitationsSlideContent(slide, content);
            case 'conclusion':
                return this.getConclusionSlideContent(slide, content);
            case 'case-profiles':
                return this.getCaseProfilesSlideContent(slide, content);
            case 'context':
                return this.getContextSlideContent(slide, content);
            case 'matrix':
                return this.getMatrixSlideContent(slide, content);
            default:
                return `<div class="slide-header"><h1 class="slide-title">${slide.title}</h1></div>`;
        }
    }

    getTitleSlideContent(slide, content) {
        return `
            <div class="slide-content title-slide" style="padding-left: var(--space-3xl);">
                <h1 class="main-title">${content.mainTitle}</h1>
                ${content.mainTitleSub ? `<p class="main-title-sub">${content.mainTitleSub}</p>` : ''}
                <p class="main-subtitle">${content.subtitle}</p>
                <div class="author-info">
                    <span class="author-name">${content.author}</span>
                    <span class="author-role">${content.role}</span>
                </div>
                <div class="institution-info">
                    <span>${content.institution}</span>
                    <span>${content.faculty}</span>
                    <span>First Supervisor: ${content.supervisor}</span>
                    ${content.secondSupervisor ? `<span>Second Supervisor: ${content.secondSupervisor}</span>` : ''}
                </div>
                <div class="defense-date">${content.date}</div>
            </div>
        `;
    }

    getProblemSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Problem</span>
                <h1 class="slide-title">${slide.title}</h1>
            </div>
            <div class="slide-content">
                <div class="stat-highlight">
                    <span class="stat-number">${content.statistic.number}</span>
                    <span class="stat-label">${content.statistic.label}</span>
                    <small style="color: var(--color-text-muted); margin-top: 0.5rem;">${content.statistic.source}</small>
                </div>
                
                <div class="content-section" style="margin-bottom: 0.5rem;">
                    <h2 class="content-section-title" style="margin-bottom: 0.5rem;">The Problem</h2>
                    <div class="bullet-list" style="margin-left: 0; margin-top: 0; gap: 1.5rem;">
                        ${content.challenges.map(c => `
                            <div class="bullet-item" style="padding: 1rem; font-size: 1.3rem;">
                                <span class="bullet-icon" style="font-size: 1.5rem;">${c.icon}</span>
                                <span class="bullet-text" style="font-size: 1.3rem; line-height: 1.4;">${c.text}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="content-section">
                    <h2 class="content-section-title">The Research Gap</h2>
                    <div class="check-list">
                        ${content.gaps.map(g => `
                            <div class="check-item ${g.positive ? 'positive' : 'negative'}">
                                <span>${g.text}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getQuestionSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Research Questions</span>
                <h1 class="slide-title">${slide.title}</h1>
            </div>
            <div class="slide-content" style="justify-content: center; gap: var(--space-lg);">
                <div class="research-question-box">
                    <p class="research-question-text">${content.mainQuestion}</p>
                </div>

                <div class="sub-questions">
                    ${content.subQuestions.map((q, i) => {
            const parts = q.match(/^(Sub-RQ\d):\s*(.+)$/);
            const label = parts ? parts[1] : `Sub-RQ${i + 1}`;
            const text = parts ? parts[2] : q;
            return `
                        <div class="sub-question">
                            <span class="sub-question-num" style="width: auto; padding: 0 8px; font-size: 0.65rem;">${label}</span>
                            <span class="sub-question-text">${text}</span>
                        </div>`;
        }).join('')}
                </div>
            </div>
        `;
    }

    getTheorySlideContent(slide, content) {
        const theoryColors = {
            'theory': { border: '#3498db', bg: 'rgba(52, 152, 219, 0.12)', glow: 'rgba(52, 152, 219, 0.3)' },
            'method': { border: '#2ecc71', bg: 'rgba(46, 204, 113, 0.12)', glow: 'rgba(46, 204, 113, 0.3)' },
            'findings': { border: '#f39c12', bg: 'rgba(243, 156, 18, 0.12)', glow: 'rgba(243, 156, 18, 0.3)' }
        };

        const theoryCards = content.theories.map(t => {
            const c = theoryColors[t.color] || theoryColors['theory'];
            return `
                <div class="theory-card" style="border-top: 3px solid ${c.border}; background: ${c.bg};">
                    <div class="theory-card-header">
                        <span class="theory-abbrev" style="background: ${c.border};">${t.abbrev}</span>
                        <span class="theory-explains" style="color: ${c.border};">Explains ${t.explains}</span>
                    </div>
                    <h3 class="theory-card-name">${t.name}</h3>
                    <p class="theory-card-author">${t.author}</p>
                    <p class="theory-card-desc">${t.description}</p>
                </div>
            `;
        }).join('');

        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Theory</span>
                <h1 class="slide-title">${slide.title}</h1>
            </div>
            <div class="slide-content" style="gap: var(--space-lg);">
                <h2 class="content-section-title" style="text-align: center;">Three Complementary Theoretical Lenses</h2>
                
                <div class="theory-cards-grid">
                    ${theoryCards}
                </div>

                <div class="theory-integration-banner">
                    <span class="theory-integration-icon">⟶</span>
                    <span class="theory-integration-label">${content.centerLabel}</span>
                    <span class="theory-integration-icon">⟵</span>
                </div>
                
                <div style="text-align: center; color: var(--color-accent-light); font-weight: 500; font-size: 1rem;">
                    ${content.contribution}
                </div>
            </div>
        `;
    }

    getMethodologySlideContent(slide, content) {
        const processFlow = content.analysis.processFlow || [
            { step: 'Sampling', desc: 'Max Variation (7 Cases)' },
            { step: 'Data Collection', desc: 'Semi-structured Interviews (445 min)' },
            { step: 'Coding', desc: 'Reflexive Thematic Analysis (Manual)' },
            { step: 'Synthesis', desc: 'Within-Case & Cross-Case Matrix' },
            { step: 'Findings', desc: '5 Factors, 6 Principles, 5-Layer Framework' }
        ];

        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Methodology</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.approach}</p>
            </div>
            <div class="slide-content">
                <div class="two-columns">
                    <div class="column-card">
                        <h3>Sample Design: ${content.sampling}</h3>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Case</th>
                                    <th>Sector</th>
                                    <th>Stage</th>
                                    <th>Size</th>
                                    <th>Funding</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${content.cases.map(c => `
                                    <tr>
                                        <td><strong>${c.id}</strong></td>
                                        <td>${c.sector}</td>
                                        <td>${c.stage}</td>
                                        <td>${c.size}</td>
                                        <td>${c.funding}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div class="column-card">
                            <h3>📝 Data Collection</h3>
                            <p style="color: var(--color-text-secondary);">${content.dataCollection.method}</p>
                            <div style="display: flex; gap: 2rem; margin-top: 1rem;">
                                <div class="stat-highlight" style="padding: 1rem; flex: 1;">
                                    <span class="stat-number" style="font-size: 2rem;">${content.dataCollection.interviews}</span>
                                    <span class="stat-label">Interviews</span>
                                </div>
                                <div class="stat-highlight" style="padding: 1rem; flex: 1;">
                                    <span class="stat-number" style="font-size: 2rem;">${content.dataCollection.totalMinutes}</span>
                                    <span class="stat-label">Minutes total</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="column-card">
                            <h3>🔍 Analysis</h3>
                            <p style="color: var(--color-text-secondary);">${content.analysis.method}</p>
                            <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-top: 0.5rem;">${content.analysis.process}</p>
                            <p style="color: var(--color-text-muted); font-size: 0.9rem;">${content.analysis.coding}</p>
                        </div>
                    </div>
                </div>

                <div class="process-flow">
                    ${processFlow.map((step, i) => `
                        <div class="process-step">
                            <div class="step-number">${i + 1}</div>
                            <div class="step-title">${step.step}</div>
                            <div class="step-desc">${step.desc}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getFactorsSlideContent(slide, content) {
        const factorColors = ['#6366f1', '#3498db', '#2ecc71', '#f39c12', '#e74c3c'];

        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Finding #1</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content">
                <div class="factors-grid">
                    ${content.factors.map((f, i) => `
                        <div class="factor-card" style="--card-color: ${factorColors[i]};">
                            <div class="factor-card-bg-num">${i + 1}</div>
                            <div class="factor-card-content">
                                <div class="factor-card-header">
                                    <div class="factor-icon-wrapper">${f.icon}</div>
                                    <h3 class="factor-card-title">${f.title}</h3>
                                </div>
                                <p class="factor-card-desc">${f.description}</p>
                                <div class="factor-evidence-wrapper">
                                    <span class="factor-evidence-badge">✓ ${f.evidence}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getComparisonSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Finding #2</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content">
                <div class="comparison-chart">
                    <p style="text-align: center; color: var(--color-text-secondary); margin-bottom: 1rem;">${content.mainInsight}</p>
                    
                    <div class="comparison-bars">
                        <div class="comparison-bar-item">
                            <div class="comparison-bar-label">Team Experience</div>
                            <div class="comparison-bar-container">
                                <div class="comparison-bar-fill experience animate">${content.multiplier}</div>
                            </div>
                        </div>
                        <div class="comparison-bar-item">
                            <div class="comparison-bar-label">Framework Choice</div>
                            <div class="comparison-bar-container">
                                <div class="comparison-bar-fill framework animate">1×</div>
                            </div>
                        </div>
                    </div>
                    <p style="text-align: center; color: var(--color-text-muted); font-size: 0.875rem;">(${content.multiplierNote})</p>
                </div>
                
                <div class="two-columns" style="margin-top: 1.5rem;">
                    ${content.cases.map(c => `
                        <div class="column-card ${c.positive ? 'theory' : ''}">
                            <h3 style="color: ${c.positive ? 'var(--color-success)' : 'var(--color-danger)'}">
                                ${c.positive ? '✓' : '✗'} Case ${c.id}: ${c.framework}
                            </h3>
                            <p style="font-weight: 600; margin-bottom: 0.5rem;">${c.outcome}</p>
                            <p style="color: var(--color-text-secondary);">→ ${c.reason}</p>
                            <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-top: 0.5rem;">${c.detail}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div style="text-align: center; margin-top: 1.5rem; padding: 1rem; background: rgba(99, 102, 241, 0.1); border-radius: 0.75rem;">
                    <strong style="color: var(--color-accent-light);">Implication:</strong>
                    <span style="color: var(--color-text-secondary);"> ${content.implication}</span>
                </div>
            </div>
        `;
    }

    getThresholdSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Finding #3</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content" style="justify-content: space-between;">
                <div class="threshold-chart">
                    <div class="chart-formula">
                        <span>Communication links = </span>
                        <code style="background: rgba(255,255,255,0.1); padding: 0.2rem 0.5rem; border-radius: 0.25rem;">${content.formula}</code>
                    </div>

                    <div class="chart-container">
                        <svg class="chart-svg" viewBox="0 0 400 200">
                            <defs>
                                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style="stop-color:#6366f1"/>
                                    <stop offset="60%" style="stop-color:#f59e0b"/>
                                    <stop offset="100%" style="stop-color:#ef4444"/>
                                </linearGradient>
                            </defs>
                            <!-- Axis -->
                            <line class="chart-axis" x1="40" y1="170" x2="380" y2="170"/>
                            <line class="chart-axis" x1="40" y1="20" x2="40" y2="170"/>
                            <!-- Grid lines -->
                            <line class="chart-grid" x1="40" y1="120" x2="380" y2="120"/>
                            <line class="chart-grid" x1="40" y1="70" x2="380" y2="70"/>
                            <!-- Threshold zone -->
                            <rect class="chart-threshold-zone threshold-zone animate" x="200" y="20" width="100" height="150" rx="4"/>
                            <!-- Curve -->
                            <path class="chart-curve animate" d="M40,165 Q100,160 150,145 T220,80 T300,30 T380,15"/>
                            <!-- Labels -->
                            <text class="chart-label" x="40" y="185">1</text>
                            <text class="chart-label" x="100" y="185">3</text>
                            <text class="chart-label" x="200" y="185">6</text>
                            <text class="chart-label" x="260" y="185">8</text>
                            <text class="chart-label" x="380" y="185">10</text>
                            <text class="chart-label" x="15" y="170">0</text>
                            <text class="chart-label" x="15" y="120">15</text>
                            <text class="chart-label" x="15" y="70">30</text>
                            <text class="chart-label" x="15" y="25">45</text>
                            <text class="chart-label" x="210" y="12" style="fill: #ef4444; font-size: 10px;">CRITICAL</text>
                        </svg>
                    </div>

                    <div style="display: flex; gap: 2rem; justify-content: center; align-items: center; margin-top: var(--space-sm);">
                        ${content.examples.map(e => `
                            <div style="text-align: center;">
                                <div style="font-size: 1.6rem; font-weight: 700; color: var(--color-accent-light);">${e.people}</div>
                                <div style="color: var(--color-text-muted); font-size: 0.85rem;">people</div>
                                <div style="font-size: 1.3rem; font-weight: 600; margin-top: 0.25rem;">${e.links}</div>
                                <div style="color: var(--color-text-muted); font-size: 0.85rem;">links</div>
                            </div>
                        `).join('<div style="font-size: 1.8rem; color: var(--color-text-muted);">→</div>')}
                        <div style="text-align: center; color: var(--color-warning);">
                            <div style="font-size: 1.3rem; font-weight: 700;">${content.multiplierNote}</div>
                        </div>
                    </div>
                </div>

                <div class="two-columns">
                    <div class="column-card theory">
                        <h3 style="color: var(--color-success);">✓ Below Threshold</h3>
                        <p style="color: var(--color-text-muted);">Cases: ${content.validation.below.cases.join(', ')} (${content.validation.below.size})</p>
                        <p style="color: var(--color-text-secondary);">${content.validation.below.result}</p>
                    </div>
                    <div class="column-card">
                        <h3 style="color: var(--color-danger);">✗ Above Threshold</h3>
                        <p style="color: var(--color-text-muted);">Cases: ${content.validation.above.cases.join(', ')} (${content.validation.above.size})</p>
                        <p style="color: var(--color-text-secondary);">${content.validation.above.result}</p>
                    </div>
                </div>

                <div style="text-align: center; padding: var(--space-md); background: rgba(245, 158, 11, 0.1); border-radius: 0.75rem; border: 1px solid rgba(245, 158, 11, 0.3);">
                    <strong style="color: var(--color-warning);">Actionable Insight:</strong>
                    <span style="color: var(--color-text-secondary);"> ${content.actionableInsight}</span>
                </div>
            </div>
        `;
    }

    getFrameworkSlideContent(slide, content) {
        const layerIcons = ['🌐', '💚', '🔧', '👤', '🎯'];
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Framework</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content" style="justify-content: space-between;">
                <div class="framework-layers">
                    ${content.layers.map((layer, index) => `
                        <div class="framework-layer ${layer.type}">
                            <span class="layer-icon">${layerIcons[index]}</span>
                            <span class="layer-number">${layer.number}</span>
                            <div class="layer-content">
                                <div class="layer-title">${layer.name} <span class="layer-badge ${layer.type}">${layer.description}</span></div>
                                <div class="layer-items">
                                    ${layer.items.split(' | ').map(item => `<span class="layer-tag">${item}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                        ${index < content.layers.length - 1 ? '<div class="framework-arrow"><svg width="20" height="12" viewBox="0 0 20 12"><path d="M10 12L0 0h20z" fill="currentColor" opacity="0.4"/></svg></div>' : ''}
                    `).join('')}
                </div>

                <div class="framework-insight-box">
                    <div class="framework-insight-icon">⚡</div>
                    <div>
                        <strong style="color: var(--color-success);">Critical Insight:</strong>
                        <span style="color: var(--color-text-secondary);"> ${content.criticalInsight}</span>
                    </div>
                </div>
            </div>
        `;
    }

    getPrinciplesSlideContent(slide, content) {
        const principleStyles = [
            { color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)' },
            { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)' },
            { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)' },
            { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
            { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)' },
            { color: '#6366f1', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)' }
        ];
        const principleLinks = ['Finding #1', 'Finding #3', 'Finding #2', 'German Context', 'Finding #3', 'Finding #1'];
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Principles</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content">
                <div class="principles-grid">
                    ${content.principles.map((p, i) => {
                        const s = principleStyles[i];
                        return `
                        <div class="principle-card hover-lift" style="border-top: 3px solid ${s.color};">
                            <div class="principle-header">
                                <div class="principle-icon" style="background: ${s.bg}; color: ${s.color};">${p.icon}</div>
                                <span class="principle-badge" style="background: ${s.bg}; color: ${s.color}; border: 1px solid ${s.border};">${principleLinks[i]}</span>
                            </div>
                            <div class="principle-number" style="color: ${s.color};">Principle ${p.number}</div>
                            <div class="principle-title">${p.title}</div>
                            <div class="principle-desc">${p.description}</div>
                        </div>
                    `}).join('')}
                </div>
            </div>
        `;
    }

    getLimitationsSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Limitations</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content" style="justify-content: space-between;">
                <div class="two-columns" style="flex: 1;">
                    <div class="column-card" style="border-top: 3px solid rgba(245,158,11,0.6); display: flex; flex-direction: column;">
                        <h3 style="color: var(--color-warning); margin-bottom: 0.75rem;">⚠️ Study Limitations</h3>
                        <div class="limitations-list">
                            ${content.limitations.map(l => `
                                <div class="limitation-item">
                                    <div class="limitation-icon">${l.icon}</div>
                                    <div class="limitation-content">
                                        <div class="limitation-title">${l.title}</div>
                                        <div class="limitation-desc">${l.description}</div>
                                        <div class="limitation-mitigation">↳ ${l.mitigation}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="column-card" style="border-top: 3px solid rgba(16,185,129,0.6); display: flex; flex-direction: column;">
                        <h3 style="color: var(--color-success); margin-bottom: 0.75rem;">🔬 Future Research</h3>
                        <div class="future-research-list">
                            ${content.futureResearch.map((r, i) => `
                                <div class="future-item">
                                    <div class="future-number">${i + 1}</div>
                                    <div class="future-icon">${r.icon}</div>
                                    <div class="future-text">${r.text}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getConclusionSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Conclusion</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content" style="justify-content: space-between;">
                <div class="key-numbers-row">
                    ${content.keyNumbers.map(n => `
                        <div class="key-number-item">
                            <div class="key-number-value">${n.value}</div>
                            <div class="key-number-label">${n.label}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="two-columns">
                    <div class="column-card" style="border-top: 3px solid rgba(52,152,219,0.6);">
                        <h3 style="color: var(--color-theory);">📚 Theoretical Contributions</h3>
                        <div class="contribution-list">
                            ${content.theoretical.map(t => `
                                <div class="contribution-item theory">
                                    <span class="contribution-icon">${t.icon}</span>
                                    <span class="contribution-text">${t.text}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="column-card" style="border-top: 3px solid rgba(46,204,113,0.6);">
                        <h3 style="color: var(--color-method);">🛠️ Practical Contributions</h3>
                        <div class="contribution-list">
                            ${content.practical.map(p => `
                                <div class="contribution-item practical">
                                    <span class="contribution-icon">${p.icon}</span>
                                    <span class="contribution-text">${p.text}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="conclusion-quote">
                    <blockquote>"${content.conclusion}"</blockquote>
                </div>

                <div class="thank-you">
                    <span class="thank-you-text">${content.closing}</span>
                </div>
            </div>
        `;
    }

    getCaseProfilesSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Backup</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content">
                <div class="case-profiles-grid">
                    ${content.cases.map(c => `
                        <div class="case-profile-card">
                            <div class="case-profile-header">
                                <span class="case-profile-id">Case ${c.id}</span>
                                <span class="case-agility-badge agility-${c.agility.toLowerCase()}">${c.agility}</span>
                            </div>
                            <div class="case-profile-sector">
                                <span class="case-profile-icon">${c.icon}</span>
                                <span>${c.sector}</span>
                            </div>
                            <div class="case-profile-details">
                                <div class="case-detail"><span class="case-detail-label">Stage</span><span>${c.stage}</span></div>
                                <div class="case-detail"><span class="case-detail-label">Size</span><span>${c.size} people</span></div>
                                <div class="case-detail"><span class="case-detail-label">Funding</span><span>${c.funding}</span></div>
                            </div>
                            <div class="case-profile-challenge">
                                <span class="case-detail-label">Challenge:</span> ${c.challenge}
                            </div>
                            <div class="case-profile-note">${c.agilityNote}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getContextSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Backup</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content">
                <div class="context-aspects-grid">
                    ${content.aspects.map(a => `
                        <div class="context-aspect-card">
                            <div class="context-aspect-icon">${a.icon}</div>
                            <div class="context-aspect-body">
                                <div class="context-aspect-title">${a.title}</div>
                                <div class="context-aspect-desc">${a.description}</div>
                                <div class="context-aspect-implication">→ ${a.implication}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="context-takeaway">
                    <span class="context-takeaway-label">Key Takeaway</span>
                    <p class="context-takeaway-text">${content.keyTakeaway}</p>
                </div>
            </div>
        `;
    }

    getMatrixSlideContent(slide, content) {
        const getValueClass = (v) => {
            if (v === 'High') return 'matrix-high';
            if (v === 'Medium') return 'matrix-medium';
            if (v === 'Servant') return 'matrix-high';
            if (v === 'Proactive' || v === 'Aware') return 'matrix-high';
            if (v === 'Unaware') return 'matrix-low';
            return '';
        };
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Backup</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content">
                <table class="data-table matrix-table">
                    <thead>
                        <tr>
                            <th>Case</th>
                            ${content.dimensions.map(d => `<th>${d}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(content.cases).map(([caseId, values]) => `
                            <tr>
                                <td><strong class="matrix-case-id">${caseId}</strong></td>
                                ${values.map(v => `<td><span class="matrix-cell ${getValueClass(v)}">${v}</span></td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="matrix-patterns">
                    ${content.patterns.map(p => `
                        <div class="matrix-pattern-item">
                            <span class="matrix-pattern-label">${p.label}</span>
                            <span class="matrix-pattern-desc">${p.desc}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Mode switching
    setMode(mode) {
        if (this.currentMode === mode) return;

        this.currentMode = mode;

        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        if (mode === 'sphere') {
            this.btnSphereMode?.classList.add('active');
            this.sphereContainer?.classList.remove('hidden');
            this.slidesContainer?.classList.add('hidden');
        } else if (mode === 'linear') {
            this.btnLinearMode?.classList.add('active');
            this.sphereContainer?.classList.add('hidden');
            this.slidesContainer?.classList.remove('hidden');
        }

        // Dispatch event
        document.dispatchEvent(new CustomEvent('modeChange', { detail: { mode } }));
    }

    // Navigation
    nextSlide() {
        if (this.currentMode === 'sphere') {
            this.setMode('linear');
            return;
        }

        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        } else if (this.currentMode === 'linear') {
            this.setMode('sphere');
        }
    }

    goToSlide(slideId) {
        const id = typeof slideId === 'string' ? parseInt(slideId) : slideId;
        if (id < 1 || id > this.totalSlides) return;

        // Set mode to linear if in sphere
        if (this.currentMode === 'sphere') {
            this.setMode('linear');
        }

        const previousSlide = this.currentSlide;
        this.currentSlide = id;

        // Update slide visibility
        document.querySelectorAll('.slide').forEach(slide => {
            const slideNum = parseInt(slide.dataset.slideId);
            slide.classList.remove('active', 'prev');

            if (slideNum === id) {
                slide.classList.add('active');
            } else if (slideNum < id) {
                slide.classList.add('prev');
            }
        });

        this.updateUI();

        // Dispatch event
        document.dispatchEvent(new CustomEvent('slideChange', {
            detail: {
                current: id,
                previous: previousSlide,
                direction: id > previousSlide ? 'next' : 'prev'
            }
        }));
    }

    goToBackupSlide(slideId) {
        // Set mode to linear if in sphere
        if (this.currentMode === 'sphere') {
            this.setMode('linear');
        }

        // Update slide visibility for backup slides
        document.querySelectorAll('.slide').forEach(slide => {
            slide.classList.remove('active');
        });

        const backupSlide = document.getElementById(`slide-${slideId}`);
        if (backupSlide) {
            backupSlide.classList.add('active');
        }

        // Update indicator to show backup
        if (this.currentSlideNum) {
            this.currentSlideNum.textContent = slideId;
        }
    }

    onSphereSectionClick(detail) {
        const section = SECTIONS.find(s => s.name === detail.section);
        if (section && section.slides.length > 0) {
            this.goToSlide(section.slides[0]);
        }
    }

    // Quick Jump
    toggleQuickJump() {
        if (this.isQuickJumpOpen) {
            this.closeQuickJump();
        } else {
            this.openQuickJump();
        }
    }

    openQuickJump() {
        this.quickJumpOverlay?.classList.remove('hidden');
        this.isQuickJumpOpen = true;
        this.btnMenuMode?.classList.add('active');

        // Highlight current slide
        document.querySelectorAll('.quick-jump-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.slide == this.currentSlide) {
                item.classList.add('active');
            }
        });
    }

    closeQuickJump() {
        this.quickJumpOverlay?.classList.add('hidden');
        this.isQuickJumpOpen = false;
        this.btnMenuMode?.classList.remove('active');
    }

    // Help modal
    toggleHelp() {
        if (this.isHelpOpen) {
            this.closeHelp();
        } else {
            this.openHelp();
        }
    }

    openHelp() {
        this.helpModal?.classList.remove('hidden');
        this.isHelpOpen = true;
    }

    closeHelp() {
        this.helpModal?.classList.add('hidden');
        this.isHelpOpen = false;
    }

    // Mini nav
    toggleMiniNav() {
        this.isMiniNavCollapsed = !this.isMiniNavCollapsed;
        this.miniNav?.classList.toggle('collapsed', this.isMiniNavCollapsed);
    }

    // Fullscreen
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Fullscreen error:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // UI Updates
    updateUI() {
        // Update slide number
        if (this.currentSlideNum) {
            this.currentSlideNum.textContent = this.currentSlide;
        }
        if (this.totalSlidesNum) {
            this.totalSlidesNum.textContent = this.totalSlides;
        }

        // Update progress bar
        const progress = ((this.currentSlide - 1) / (this.totalSlides - 1)) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = `${progress}%`;
        }

        // Update mini nav
        document.querySelectorAll('.mini-nav-item').forEach(item => {
            const slideId = parseInt(item.dataset.slide);
            item.classList.remove('active', 'completed');

            if (slideId === this.currentSlide) {
                item.classList.add('active');
            } else if (slideId < this.currentSlide) {
                item.classList.add('completed');
            }
        });

        // Update navigation buttons
        if (this.btnPrev) {
            this.btnPrev.disabled = this.currentSlide === 1 && this.currentMode === 'linear';
        }
        if (this.btnNext) {
            this.btnNext.disabled = this.currentSlide === this.totalSlides;
        }
    }

    // Public API
    getCurrentSlide() {
        return this.currentSlide;
    }

    getTotalSlides() {
        return this.totalSlides;
    }

    getMode() {
        return this.currentMode;
    }
}

// Export
if (typeof window !== 'undefined') {
    window.PresentationNavigation = PresentationNavigation;
}
