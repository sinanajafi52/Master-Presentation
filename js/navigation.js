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
                <p class="main-subtitle">${content.subtitle}</p>
                <div class="author-info">
                    <span class="author-name">${content.author}</span>
                    <span class="author-role">${content.role}</span>
                </div>
                <div class="institution-info">
                    <span>${content.institution}</span>
                    <span>${content.faculty}</span>
                    <span>Supervisor: ${content.supervisor}</span>
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
                
                <div class="content-section">
                    <h2 class="content-section-title">The Problem</h2>
                    <div class="bullet-list stagger-children">
                        ${content.problems.map(p => `
                            <div class="bullet-item">
                                <span class="bullet-icon">•</span>
                                <span class="bullet-text">${p}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="bullet-list" style="margin-left: 2rem; margin-top: 1rem;">
                        ${content.challenges.map(c => `
                            <div class="bullet-item">
                                <span class="bullet-icon">${c.icon}</span>
                                <span class="bullet-text">${c.text}</span>
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
                <span class="slide-section-tag ${slide.sectionColor}">Research Question</span>
                <h1 class="slide-title">${slide.title}</h1>
            </div>
            <div class="slide-content" style="justify-content: center;">
                <div class="research-question-box">
                    <p class="research-question-text">${content.mainQuestion}</p>
                </div>
                
                <div class="sub-questions stagger-children">
                    ${content.subQuestions.map((q, i) => `
                        <div class="sub-question">
                            <span class="sub-question-num">${i + 1}</span>
                            <span class="sub-question-text">${q}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getTheorySlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Theory</span>
                <h1 class="slide-title">${slide.title}</h1>
            </div>
            <div class="slide-content">
                <h2 class="content-section-title">Three Complementary Theoretical Lenses</h2>
                
                <div class="venn-diagram">
                    <div class="venn-circle dct">
                        <div>
                            <div class="venn-label">Dynamic Capabilities</div>
                            <div class="venn-desc">Explains HOW</div>
                            <div class="venn-desc" style="margin-top: 0.5rem; font-size: 0.65rem;">Sensing → Seizing → Transforming</div>
                        </div>
                    </div>
                    <div class="venn-circle clt">
                        <div>
                            <div class="venn-label">Complexity Leadership</div>
                            <div class="venn-desc">Explains WHO</div>
                            <div class="venn-desc" style="margin-top: 0.5rem; font-size: 0.65rem;">Adaptive + Enabling + Admin</div>
                        </div>
                    </div>
                    <div class="venn-circle contingency">
                        <div>
                            <div class="venn-label">Contingency Theory</div>
                            <div class="venn-desc">Explains WHY variation</div>
                            <div class="venn-desc" style="margin-top: 0.5rem; font-size: 0.65rem;">Stage, Sector, Size, Funding</div>
                        </div>
                    </div>
                    <div class="venn-center">${content.centerLabel}</div>
                </div>
                
                <div style="text-align: center; margin-top: 1rem; color: var(--color-accent-light); font-weight: 500;">
                    ${content.contribution}
                </div>
            </div>
        `;
    }

    getMethodologySlideContent(slide, content) {
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
            </div>
        `;
    }

    getFactorsSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Key Finding #1</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content">
                <div class="pentagon-layout stagger-children">
                    ${content.factors.map(f => `
                        <div class="pentagon-item hover-lift">
                            <div class="factor-icon">${f.icon}</div>
                            <div class="factor-title">${f.title}</div>
                            <div class="factor-desc">${f.description}</div>
                            <div class="factor-badge">${f.evidence}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getComparisonSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Key Finding #2</span>
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
                <span class="slide-section-tag ${slide.sectionColor}">Key Finding #3</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content">
                <div class="threshold-chart">
                    <div class="chart-formula">
                        <span>Communication links = </span>
                        <code style="background: rgba(255,255,255,0.1); padding: 0.25rem 0.5rem; border-radius: 0.25rem;">${content.formula}</code>
                    </div>
                    
                    <div class="chart-container" style="margin: 2rem 0;">
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
                    
                    <div style="display: flex; gap: 2rem; justify-content: center; margin-top: 1rem;">
                        ${content.examples.map(e => `
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; font-weight: 700; color: var(--color-accent-light);">${e.people}</div>
                                <div style="color: var(--color-text-muted);">people</div>
                                <div style="font-size: 1.5rem; font-weight: 600; margin-top: 0.5rem;">${e.links}</div>
                                <div style="color: var(--color-text-muted);">links</div>
                            </div>
                        `).join('<div style="font-size: 2rem; color: var(--color-text-muted);">→</div>')}
                        <div style="text-align: center; color: var(--color-warning);">
                            <div style="font-size: 1.5rem; font-weight: 700;">${content.multiplierNote}</div>
                        </div>
                    </div>
                </div>
                
                <div class="two-columns" style="margin-top: 1.5rem;">
                    <div class="column-card theory">
                        <h3 style="color: var(--color-success);">✓ Below Threshold</h3>
                        <p style="color: var(--color-text-muted);">Cases: ${content.validation.below.cases.join(', ')} (${content.validation.below.size})</p>
                        <p style="color: var(--color-text-secondary); margin-top: 0.5rem;">${content.validation.below.result}</p>
                    </div>
                    <div class="column-card">
                        <h3 style="color: var(--color-danger);">✗ Above Threshold</h3>
                        <p style="color: var(--color-text-muted);">Cases: ${content.validation.above.cases.join(', ')} (${content.validation.above.size})</p>
                        <p style="color: var(--color-text-secondary); margin-top: 0.5rem;">${content.validation.above.result}</p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 1.5rem; padding: 1rem; background: rgba(245, 158, 11, 0.1); border-radius: 0.75rem; border: 1px solid rgba(245, 158, 11, 0.3);">
                    <strong style="color: var(--color-warning);">Actionable Insight:</strong>
                    <span style="color: var(--color-text-secondary);"> ${content.actionableInsight}</span>
                </div>
            </div>
        `;
    }

    getFrameworkSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Framework</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content">
                <div class="framework-layers stagger-children">
                    ${content.layers.map((layer, index) => `
                        <div class="framework-layer ${layer.type}">
                            <span class="layer-number">${layer.number}</span>
                            <div class="layer-content">
                                <div class="layer-title">${layer.name} <span style="color: var(--color-text-muted); font-weight: 400; font-size: 0.875rem;">(${layer.description})</span></div>
                                <div class="layer-items">${layer.items}</div>
                            </div>
                        </div>
                        ${index < content.layers.length - 1 ? '<div class="framework-arrow">↓</div>' : ''}
                    `).join('')}
                </div>
                
                <div style="text-align: center; margin-top: 2rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: 0.75rem; border: 1px solid rgba(16, 185, 129, 0.3);">
                    <strong style="color: var(--color-success);">Critical Insight:</strong>
                    <span style="color: var(--color-text-secondary);"> ${content.criticalInsight}</span>
                </div>
            </div>
        `;
    }

    getPrinciplesSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Principles</span>
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${content.headline}</p>
            </div>
            <div class="slide-content">
                <div class="principles-grid stagger-children">
                    ${content.principles.map(p => `
                        <div class="principle-card hover-lift">
                            <div class="principle-icon">${p.icon}</div>
                            <div class="principle-number">Principle ${p.number}</div>
                            <div class="principle-title">${p.title}</div>
                            <div class="principle-desc">${p.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getLimitationsSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <span class="slide-section-tag ${slide.sectionColor}">Limitations</span>
                <h1 class="slide-title">${slide.title}</h1>
            </div>
            <div class="slide-content">
                <div class="two-columns">
                    <div class="column-card">
                        <h3>📋 Study Limitations</h3>
                        <div class="bullet-list" style="margin-top: 1rem;">
                            ${content.limitations.map(l => `
                                <div class="bullet-item" style="border-left-color: var(--color-warning);">
                                    <span class="bullet-icon">${l.icon}</span>
                                    <span class="bullet-text">
                                        <strong>${l.title}:</strong> ${l.description}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="column-card practice">
                        <h3 style="color: var(--color-success);">🔬 Future Research Opportunities</h3>
                        <div class="bullet-list" style="margin-top: 1rem;">
                            ${content.futureResearch.map(r => `
                                <div class="bullet-item" style="border-left-color: var(--color-success);">
                                    <span class="bullet-icon">→</span>
                                    <span class="bullet-text">${r}</span>
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
            </div>
            <div class="slide-content">
                <div class="two-columns">
                    <div class="column-card theory">
                        <h3>📚 Theoretical Contributions</h3>
                        <div class="bullet-list" style="margin-top: 1rem;">
                            ${content.theoretical.map(t => `
                                <div class="bullet-item">
                                    <span class="bullet-icon">•</span>
                                    <span class="bullet-text">${t}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="column-card practice">
                        <h3>🛠️ Practical Contributions</h3>
                        <div class="bullet-list" style="margin-top: 1rem;">
                            ${content.practical.map(p => `
                                <div class="bullet-item">
                                    <span class="bullet-icon">•</span>
                                    <span class="bullet-text">${p}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="conclusion-quote">
                    <blockquote>${content.conclusion}</blockquote>
                </div>
                
                <div class="thank-you">${content.closing}</div>
            </div>
        `;
    }

    getCaseProfilesSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <h1 class="slide-title">${slide.title}</h1>
            </div>
            <div class="slide-content">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Case</th>
                            <th>Sector</th>
                            <th>Stage</th>
                            <th>Size</th>
                            <th>Funding</th>
                            <th>Main Challenge</th>
                            <th>Agility Level</th>
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
                                <td>${c.challenge}</td>
                                <td>${c.agility}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    getContextSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <h1 class="slide-title">${slide.title}</h1>
            </div>
            <div class="slide-content">
                <div class="bullet-list stagger-children">
                    ${content.aspects.map(a => `
                        <div class="bullet-item">
                            <div style="flex: 1;">
                                <strong style="color: var(--color-text-primary);">${a.title}</strong>
                                <p style="color: var(--color-text-secondary); margin: 0.5rem 0;">${a.description}</p>
                                <p style="color: var(--color-accent-light); font-size: 0.9rem;">→ ${a.implication}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="text-align: center; margin-top: 2rem; padding: 1rem; background: rgba(99, 102, 241, 0.1); border-radius: 0.75rem;">
                    <strong style="color: var(--color-accent-light);">Key Takeaway:</strong>
                    <span style="color: var(--color-text-secondary);"> ${content.keyTakeaway}</span>
                </div>
            </div>
        `;
    }

    getMatrixSlideContent(slide, content) {
        return `
            <div class="slide-header">
                <h1 class="slide-title">${slide.title}</h1>
            </div>
            <div class="slide-content">
                <table class="data-table" style="font-size: 0.9rem;">
                    <thead>
                        <tr>
                            <th>Case</th>
                            ${content.dimensions.map(d => `<th>${d}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(content.cases).map(([caseId, values]) => `
                            <tr>
                                <td><strong>${caseId}</strong></td>
                                ${values.map(v => `<td>${v}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
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
