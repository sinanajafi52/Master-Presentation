/**
 * Keyboard Shortcuts Module
 * Handles all keyboard interactions for the presentation
 */

class KeyboardController {
    constructor() {
        this.shortcuts = {
            // Navigation
            ' ': 'nextSlide',           // Space
            'ArrowRight': 'nextSlide',
            'ArrowLeft': 'prevSlide',
            'Backspace': 'prevSlide',
            'Home': 'firstSlide',
            'End': 'lastSlide',

            // Mode switching
            's': 'toggleMode',
            'S': 'toggleMode',

            // Quick Jump
            'j': 'openQuickJump',
            'J': 'openQuickJump',

            // Mini nav
            'm': 'toggleMiniNav',
            'M': 'toggleMiniNav',

            // Controls
            'f': 'toggleFullscreen',
            'F': 'toggleFullscreen',
            't': 'toggleTimer',
            'T': 'toggleTimer',
            'p': 'togglePresenterNotes',
            'P': 'togglePresenterNotes',
            'b': 'staticBackup',
            'B': 'staticBackup',

            // Help
            '?': 'showHelp',

            // Exit/Close
            'Escape': 'escape',

            // Number keys for direct slide access
            '1': 'goToSlide1',
            '2': 'goToSlide2',
            '3': 'goToSlide3',
            '4': 'goToSlide4',
            '5': 'goToSlide5',
            '6': 'goToSlide6',
            '7': 'goToSlide7',
            '8': 'goToSlide8',
            '9': 'goToSlide9'
        };

        this.isEnabled = true;
        this.presenterNotesVisible = false;

        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleKeyDown(event) {
        // Skip if disabled or typing in an input
        if (!this.isEnabled) return;
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

        const key = event.key;
        const action = this.shortcuts[key];

        if (action) {
            event.preventDefault();
            this.executeAction(action);
        }
    }

    executeAction(action) {
        const nav = window.presentationNav;
        const timer = window.presentationTimer;

        switch (action) {
            case 'nextSlide':
                nav?.nextSlide();
                break;

            case 'prevSlide':
                nav?.prevSlide();
                break;

            case 'firstSlide':
                nav?.goToSlide(1);
                break;

            case 'lastSlide':
                nav?.goToSlide(nav?.getTotalSlides() || 12);
                break;

            case 'toggleMode':
                this.toggleMode();
                break;

            case 'openQuickJump':
                nav?.toggleQuickJump();
                break;

            case 'toggleMiniNav':
                nav?.toggleMiniNav();
                break;

            case 'toggleFullscreen':
                nav?.toggleFullscreen();
                break;

            case 'toggleTimer':
                timer?.toggle();
                break;

            case 'togglePresenterNotes':
                this.togglePresenterNotes();
                break;

            case 'staticBackup':
                this.enableStaticBackup();
                break;

            case 'showHelp':
                nav?.openHelp();
                break;

            case 'escape':
                this.handleEscape();
                break;

            default:
                // Handle slide number shortcuts
                if (action.startsWith('goToSlide')) {
                    const num = parseInt(action.replace('goToSlide', ''));
                    if (num >= 1 && num <= (nav?.getTotalSlides() || 12)) {
                        nav?.goToSlide(num);
                    }
                }
        }
    }

    toggleMode() {
        const nav = window.presentationNav;
        if (!nav) return;

        const currentMode = nav.getMode();
        if (currentMode === 'sphere') {
            nav.setMode('linear');
        } else {
            nav.setMode('sphere');
        }
    }

    togglePresenterNotes() {
        this.presenterNotesVisible = !this.presenterNotesVisible;

        // Find current slide notes
        const nav = window.presentationNav;
        const currentSlideId = nav?.getCurrentSlide();
        const slideData = SLIDES.find(s => s.id === currentSlideId);

        if (this.presenterNotesVisible && slideData?.notes) {
            this.showPresenterNotes(slideData.notes);
        } else {
            this.hidePresenterNotes();
        }
    }

    showPresenterNotes(notes) {
        // Remove existing notes
        this.hidePresenterNotes();

        // Create notes panel
        const panel = document.createElement('div');
        panel.id = 'presenter-notes';
        panel.className = 'presenter-notes';
        panel.innerHTML = `
            <div class="presenter-notes-header">
                <h3>Presenter Notes</h3>
                <button class="presenter-notes-close" onclick="window.keyboardController.hidePresenterNotes()">×</button>
            </div>
            <div class="presenter-notes-content">
                ${notes}
            </div>
        `;

        // Add styles if not already added
        if (!document.getElementById('presenter-notes-styles')) {
            const styles = document.createElement('style');
            styles.id = 'presenter-notes-styles';
            styles.textContent = `
                .presenter-notes {
                    position: fixed;
                    bottom: 70px;
                    right: 20px;
                    width: 350px;
                    max-height: 200px;
                    background: rgba(0, 0, 0, 0.95);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    padding: 16px;
                    z-index: 500;
                    animation: slideUp 0.3s ease;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }
                .presenter-notes-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }
                .presenter-notes-header h3 {
                    font-size: 14px;
                    color: var(--color-accent-light);
                    margin: 0;
                }
                .presenter-notes-close {
                    background: none;
                    border: none;
                    color: var(--color-text-secondary);
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0 5px;
                }
                .presenter-notes-close:hover {
                    color: white;
                }
                .presenter-notes-content {
                    font-size: 14px;
                    color: var(--color-text-secondary);
                    line-height: 1.5;
                    overflow-y: auto;
                    max-height: 120px;
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(panel);
    }

    hidePresenterNotes() {
        this.presenterNotesVisible = false;
        const panel = document.getElementById('presenter-notes');
        if (panel) {
            panel.remove();
        }
    }

    enableStaticBackup() {
        // Disable 3D sphere and animations for maximum compatibility
        const sphere = window.sphereViz;
        if (sphere) {
            sphere.destroy();
        }

        // Force linear mode
        const nav = window.presentationNav;
        nav?.setMode('linear');

        // Add static backup indicator
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            padding: 8px 16px;
            background: rgba(245, 158, 11, 0.2);
            border: 1px solid rgba(245, 158, 11, 0.5);
            border-radius: 8px;
            color: #f59e0b;
            font-size: 12px;
            font-weight: 600;
            z-index: 600;
        `;
        indicator.textContent = '⚠️ STATIC BACKUP MODE';
        document.body.appendChild(indicator);

        console.log('Static backup mode enabled - 3D features disabled');
    }

    handleEscape() {
        const nav = window.presentationNav;

        // Close modals in order of priority
        if (nav?.isQuickJumpOpen) {
            nav.closeQuickJump();
        } else if (nav?.isHelpOpen) {
            nav.closeHelp();
        } else if (this.presenterNotesVisible) {
            this.hidePresenterNotes();
        } else if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    enable() {
        this.isEnabled = true;
    }

    disable() {
        this.isEnabled = false;
    }

    // Add custom shortcut
    addShortcut(key, action) {
        this.shortcuts[key] = action;
    }

    // Remove shortcut
    removeShortcut(key) {
        delete this.shortcuts[key];
    }
}

// Export
if (typeof window !== 'undefined') {
    window.KeyboardController = KeyboardController;
}
