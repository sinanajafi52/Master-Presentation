/**
 * Defense Q&A Panel
 * Provides quick access to all Q&A preparation during the presentation
 */

class QAPanel {
    constructor() {
        this.isOpen = false;
        this.activeCategory = 'all';
        this.searchQuery = '';
        this.expandedQuestion = null;

        this.categoryMap = {
            'M': 'Research Design & Methodology',
            'T': 'Theoretical Framework',
            'F': 'Findings & Analysis',
            'FW': 'Framework & Principles',
            'G': 'German Context',
            'L': 'Limitations & Validity',
            'P': 'Practical Impact',
            'S': 'Specific Questions',
            'C': 'Challenging Questions'
        };

        this.categoryColors = {
            'M': '#3498DB',
            'T': '#9B59B6',
            'F': '#F39C12',
            'FW': '#1ABC9C',
            'G': '#E74C3C',
            'L': '#95A5A6',
            'P': '#2ECC71',
            'S': '#E67E22',
            'C': '#E91E63'
        };

        this.difficultyColors = {
            'high': '#E74C3C',
            'medium': '#F39C12',
            'low': '#2ECC71'
        };

        this._injectStyles();
        this._buildModal();
    }

    _getAllQuestions() {
        const all = [];
        if (typeof DEFENSE_QA === 'undefined') return all;
        DEFENSE_QA.forEach(cat => {
            if (cat.questions) {
                cat.questions.forEach(q => all.push(q));
            }
        });
        return all;
    }

    _getCategoryPrefix(id) {
        // Match longest prefix first (FW before F)
        const prefixes = ['FW', 'M', 'T', 'F', 'G', 'L', 'P', 'S', 'C'];
        for (const p of prefixes) {
            if (id.startsWith(p)) return p;
        }
        return id.charAt(0);
    }

    _getFilteredQuestions() {
        const all = this._getAllQuestions();
        return all.filter(q => {
            const prefix = this._getCategoryPrefix(q.id);
            const matchesCategory = this.activeCategory === 'all' || prefix === this.activeCategory;
            const matchesSearch = this.searchQuery === '' ||
                q.question.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                q.answer.toLowerCase().includes(this.searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }

    _injectStyles() {
        if (document.getElementById('qa-panel-styles')) return;
        const style = document.createElement('style');
        style.id = 'qa-panel-styles';
        style.textContent = `
            #qa-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.75);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: qaFadeIn 0.2s ease;
            }
            #qa-overlay.hidden { display: none; }

            @keyframes qaFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes qaSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            #qa-modal {
                background: #0f1117;
                border: 1px solid rgba(255,255,255,0.12);
                border-radius: 16px;
                width: 90vw;
                max-width: 860px;
                height: 85vh;
                display: flex;
                flex-direction: column;
                box-shadow: 0 24px 64px rgba(0,0,0,0.6);
                animation: qaSlideUp 0.25s ease;
                overflow: hidden;
            }

            #qa-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 18px 24px;
                border-bottom: 1px solid rgba(255,255,255,0.08);
                flex-shrink: 0;
            }

            #qa-header h2 {
                font-size: 18px;
                font-weight: 700;
                color: #fff;
                margin: 0;
                letter-spacing: 0.02em;
            }

            #qa-header-meta {
                font-size: 12px;
                color: rgba(255,255,255,0.4);
                margin-left: 10px;
            }

            #qa-close {
                background: none;
                border: none;
                color: rgba(255,255,255,0.5);
                font-size: 24px;
                cursor: pointer;
                padding: 2px 8px;
                border-radius: 6px;
                line-height: 1;
                transition: color 0.15s, background 0.15s;
            }
            #qa-close:hover { color: #fff; background: rgba(255,255,255,0.08); }

            #qa-search-wrap {
                padding: 14px 24px 10px;
                flex-shrink: 0;
            }

            #qa-search {
                width: 100%;
                background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.12);
                border-radius: 10px;
                color: #fff;
                font-size: 14px;
                padding: 10px 14px;
                outline: none;
                transition: border-color 0.2s;
                box-sizing: border-box;
            }
            #qa-search::placeholder { color: rgba(255,255,255,0.3); }
            #qa-search:focus { border-color: rgba(255,255,255,0.3); }

            #qa-categories {
                display: flex;
                gap: 6px;
                padding: 0 24px 12px;
                flex-wrap: wrap;
                flex-shrink: 0;
            }

            .qa-cat-btn {
                background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                color: rgba(255,255,255,0.55);
                font-size: 11px;
                font-weight: 600;
                padding: 4px 12px;
                cursor: pointer;
                transition: all 0.15s;
                white-space: nowrap;
                letter-spacing: 0.03em;
            }
            .qa-cat-btn:hover { color: #fff; border-color: rgba(255,255,255,0.25); }
            .qa-cat-btn.active {
                color: #fff;
                border-color: transparent;
            }

            #qa-count {
                padding: 0 24px 8px;
                font-size: 12px;
                color: rgba(255,255,255,0.35);
                flex-shrink: 0;
            }

            #qa-list {
                overflow-y: auto;
                flex: 1;
                padding: 0 16px 16px;
                scrollbar-width: thin;
                scrollbar-color: rgba(255,255,255,0.15) transparent;
            }
            #qa-list::-webkit-scrollbar { width: 5px; }
            #qa-list::-webkit-scrollbar-track { background: transparent; }
            #qa-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }

            .qa-item {
                border: 1px solid rgba(255,255,255,0.07);
                border-radius: 10px;
                margin-bottom: 8px;
                overflow: hidden;
                transition: border-color 0.15s;
            }
            .qa-item:hover { border-color: rgba(255,255,255,0.15); }
            .qa-item.expanded { border-color: rgba(255,255,255,0.2); }

            .qa-item-header {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                padding: 12px 14px;
                cursor: pointer;
                user-select: none;
            }

            .qa-item-id {
                font-size: 10px;
                font-weight: 700;
                padding: 2px 7px;
                border-radius: 5px;
                flex-shrink: 0;
                margin-top: 2px;
                font-family: 'Fira Code', monospace;
            }

            .qa-item-question {
                font-size: 14px;
                color: rgba(255,255,255,0.85);
                line-height: 1.45;
                flex: 1;
            }

            .qa-item-meta {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 4px;
                flex-shrink: 0;
            }

            .qa-difficulty {
                font-size: 10px;
                font-weight: 700;
                padding: 2px 7px;
                border-radius: 4px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .qa-chevron {
                color: rgba(255,255,255,0.3);
                font-size: 12px;
                transition: transform 0.2s;
                line-height: 1;
            }
            .qa-item.expanded .qa-chevron { transform: rotate(180deg); }

            .qa-item-body {
                display: none;
                padding: 0 14px 14px;
                border-top: 1px solid rgba(255,255,255,0.06);
            }
            .qa-item.expanded .qa-item-body { display: block; }

            .qa-asked-by {
                font-size: 11px;
                color: rgba(255,255,255,0.35);
                margin-bottom: 10px;
                padding-top: 10px;
            }

            .qa-answer {
                font-size: 13.5px;
                color: rgba(255,255,255,0.7);
                line-height: 1.7;
                white-space: pre-wrap;
            }

            .qa-no-results {
                text-align: center;
                color: rgba(255,255,255,0.3);
                padding: 40px 20px;
                font-size: 14px;
            }
        `;
        document.head.appendChild(style);
    }

    _buildModal() {
        const overlay = document.createElement('div');
        overlay.id = 'qa-overlay';
        overlay.className = 'hidden';
        overlay.innerHTML = `
            <div id="qa-modal" role="dialog" aria-modal="true" aria-label="Defense Q&A">
                <div id="qa-header">
                    <div style="display:flex;align-items:center;gap:8px">
                        <h2>Defense Q&amp;A</h2>
                        <span id="qa-header-meta">43 questions</span>
                    </div>
                    <button id="qa-close" aria-label="Close Q&A panel">&#x2715;</button>
                </div>
                <div id="qa-search-wrap">
                    <input id="qa-search" type="search" placeholder="Search questions or answers..." autocomplete="off" />
                </div>
                <div id="qa-categories"></div>
                <div id="qa-count"></div>
                <div id="qa-list"></div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Close button
        overlay.querySelector('#qa-close').addEventListener('click', () => this.close());

        // Click outside modal to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close();
        });

        // Search
        overlay.querySelector('#qa-search').addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this._renderList();
        });

        this._renderCategories();
        this._renderList();
    }

    _renderCategories() {
        const container = document.getElementById('qa-categories');
        if (!container) return;

        const allQuestions = this._getAllQuestions();

        // Count per category
        const counts = { all: allQuestions.length };
        allQuestions.forEach(q => {
            const p = this._getCategoryPrefix(q.id);
            counts[p] = (counts[p] || 0) + 1;
        });

        let html = `<button class="qa-cat-btn active" data-cat="all" style="background:rgba(255,255,255,0.12)">All (${counts.all})</button>`;

        Object.entries(this.categoryMap).forEach(([prefix, label]) => {
            if (!counts[prefix]) return;
            const color = this.categoryColors[prefix] || '#888';
            const shortLabel = prefix; // use ID prefix as short label
            html += `<button class="qa-cat-btn" data-cat="${prefix}"
                style="--cat-color:${color}"
                title="${label}"
            >${shortLabel} · ${counts[prefix]}</button>`;
        });

        container.innerHTML = html;

        container.querySelectorAll('.qa-cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.activeCategory = btn.dataset.cat;
                container.querySelectorAll('.qa-cat-btn').forEach(b => {
                    b.classList.remove('active');
                    b.style.background = '';
                });
                btn.classList.add('active');
                btn.style.background = btn.dataset.cat === 'all'
                    ? 'rgba(255,255,255,0.12)'
                    : (this.categoryColors[btn.dataset.cat] || 'rgba(255,255,255,0.12)');
                this.expandedQuestion = null;
                this._renderList();
            });
        });
    }

    _renderList() {
        const list = document.getElementById('qa-list');
        const countEl = document.getElementById('qa-count');
        if (!list) return;

        const questions = this._getFilteredQuestions();

        if (countEl) {
            countEl.textContent = `${questions.length} question${questions.length !== 1 ? 's' : ''} shown`;
        }

        if (questions.length === 0) {
            list.innerHTML = '<div class="qa-no-results">No questions match your search.</div>';
            return;
        }

        list.innerHTML = questions.map(q => {
            const prefix = this._getCategoryPrefix(q.id);
            const color = this.categoryColors[prefix] || '#888';
            const diffColor = this.difficultyColors[q.difficulty] || '#888';
            const isExpanded = this.expandedQuestion === q.id;

            return `
                <div class="qa-item${isExpanded ? ' expanded' : ''}" data-id="${q.id}">
                    <div class="qa-item-header">
                        <span class="qa-item-id" style="background:${color}22;color:${color}">${q.id}</span>
                        <span class="qa-item-question">${this._highlight(q.question)}</span>
                        <div class="qa-item-meta">
                            <span class="qa-difficulty" style="background:${diffColor}22;color:${diffColor}">${q.difficulty}</span>
                            <span class="qa-chevron">&#9660;</span>
                        </div>
                    </div>
                    <div class="qa-item-body">
                        <div class="qa-asked-by">Likely asked by: ${q.likelyAskedBy}</div>
                        <div class="qa-answer">${this._highlight(q.answer)}</div>
                    </div>
                </div>
            `;
        }).join('');

        list.querySelectorAll('.qa-item').forEach(item => {
            item.querySelector('.qa-item-header').addEventListener('click', () => {
                const id = item.dataset.id;
                this.expandedQuestion = this.expandedQuestion === id ? null : id;
                this._renderList();
                // Scroll into view if expanding
                if (this.expandedQuestion === id) {
                    setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
                }
            });
        });
    }

    _highlight(text) {
        if (!this.searchQuery) return this._escapeHtml(text);
        const escaped = this._escapeHtml(text);
        const escapedQuery = this._escapeHtml(this.searchQuery).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return escaped.replace(new RegExp(`(${escapedQuery})`, 'gi'), '<mark style="background:rgba(243,156,18,0.35);color:#fff;border-radius:2px">$1</mark>');
    }

    _escapeHtml(text) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }

    open() {
        const overlay = document.getElementById('qa-overlay');
        if (!overlay) return;
        overlay.classList.remove('hidden');
        this.isOpen = true;
        // Focus search
        setTimeout(() => {
            const search = document.getElementById('qa-search');
            if (search) search.focus();
        }, 100);
        // Disable keyboard navigation while QA is open
        if (window.keyboardController) window.keyboardController.disable();
    }

    close() {
        const overlay = document.getElementById('qa-overlay');
        if (!overlay) return;
        overlay.classList.add('hidden');
        this.isOpen = false;
        // Re-enable keyboard navigation
        if (window.keyboardController) window.keyboardController.enable();
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}

// Initialize and expose globally
document.addEventListener('DOMContentLoaded', () => {
    window.qaPanel = new QAPanel();
});

if (typeof window !== 'undefined') {
    window.QAPanel = QAPanel;
}
