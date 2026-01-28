/**
 * Main Application Entry Point
 * Initializes all modules and manages the presentation lifecycle
 */

class PresentationApp {
    constructor() {
        this.isInitialized = false;
        this.isLoading = true;

        // Module references
        this.navigation = null;
        this.sphere = null;
        this.timer = null;
        this.keyboard = null;

        // DOM references
        this.loadingScreen = document.getElementById('loading-screen');
        this.app = document.getElementById('app');

        this.init();
    }

    async init() {
        try {
            // Wait for DOM to be fully loaded
            if (document.readyState !== 'complete') {
                await new Promise(resolve => {
                    window.addEventListener('load', resolve);
                });
            }

            // Small delay for smooth loading experience
            await this.delay(500);

            // Initialize modules
            this.initNavigation();
            this.initSphere();
            this.initTimer();
            this.initKeyboard();

            // Setup additional features
            this.setupPDFExport();
            this.setupOfflineSupport();
            this.checkBrowserCompatibility();

            // Hide loading, show app
            this.hideLoading();

            this.isInitialized = true;

            console.log('🚀 Presentation initialized successfully');
            console.log('📌 Press ? for keyboard shortcuts');

        } catch (error) {
            console.error('Failed to initialize presentation:', error);
            this.showError(error);
        }
    }

    initNavigation() {
        this.navigation = new PresentationNavigation();
        window.presentationNav = this.navigation;
    }

    initSphere() {
        // Only initialize if sphere container exists and Three.js is loaded
        if (typeof THREE !== 'undefined') {
            this.sphere = new SphereVisualization('sphere-canvas');
            window.sphereViz = this.sphere;
        } else {
            console.warn('Three.js not loaded - sphere visualization disabled');
        }
    }

    initTimer() {
        // 20 minutes target duration
        this.timer = new PresentationTimer(20 * 60);
        window.presentationTimer = this.timer;
    }

    initKeyboard() {
        this.keyboard = new KeyboardController();
        window.keyboardController = this.keyboard;
    }

    hideLoading() {
        this.isLoading = false;

        // Fade out loading screen
        if (this.loadingScreen) {
            this.loadingScreen.style.transition = 'opacity 0.5s ease';
            this.loadingScreen.style.opacity = '0';

            setTimeout(() => {
                this.loadingScreen.classList.add('hidden');
            }, 500);
        }

        // Show and animate in the app
        if (this.app) {
            this.app.classList.remove('hidden');

            // Small delay before adding visible class for smooth fade in
            requestAnimationFrame(() => {
                this.app.classList.add('visible');
            });
        }
    }

    showError(error) {
        if (this.loadingScreen) {
            const loaderText = this.loadingScreen.querySelector('.loader-text');
            if (loaderText) {
                loaderText.textContent = 'Error loading presentation. Please refresh.';
                loaderText.style.color = '#ef4444';
            }
        }

        console.error('Presentation Error:', error);
    }

    setupPDFExport() {
        // Add PDF export functionality (using browser print dialog)
        window.exportToPDF = () => {
            // Switch to linear mode
            if (this.navigation) {
                this.navigation.setMode('linear');
            }

            // Add print styles
            const printStyles = document.createElement('style');
            printStyles.id = 'print-styles';
            printStyles.textContent = `
                @media print {
                    body {
                        background: white !important;
                        color: black !important;
                    }
                    
                    .top-bar, .bottom-bar, .mini-nav, .progress-bar-container,
                    #sphere-container, .quick-jump-overlay, .help-modal {
                        display: none !important;
                    }
                    
                    .slides-container {
                        display: block !important;
                    }
                    
                    .slide {
                        position: relative !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        transform: none !important;
                        page-break-after: always;
                        padding: 2cm !important;
                        min-height: 100vh;
                        background: white !important;
                    }
                    
                    .slide-title {
                        color: #2c3e50 !important;
                        -webkit-text-fill-color: #2c3e50 !important;
                        background: none !important;
                    }
                    
                    .slide-section-tag {
                        background: #e0e0e0 !important;
                        color: #333 !important;
                    }
                    
                    * {
                        box-shadow: none !important;
                        text-shadow: none !important;
                    }
                }
            `;
            document.head.appendChild(printStyles);

            // Show all slides for printing
            document.querySelectorAll('.slide').forEach(slide => {
                slide.style.display = 'block';
            });

            // Trigger print
            window.print();

            // Cleanup after print
            setTimeout(() => {
                document.getElementById('print-styles')?.remove();
                document.querySelectorAll('.slide').forEach((slide, index) => {
                    slide.style.display = '';
                });
            }, 1000);
        };

        console.log('💾 PDF export ready - use window.exportToPDF() or Ctrl+P');
    }

    setupOfflineSupport() {
        // Check if service worker is supported
        if ('serviceWorker' in navigator) {
            // For now, just log that we could support offline mode
            // Full SW implementation would require a service-worker.js file
            console.log('📴 Offline support: Use browser "Save as" for offline backup');
        }

        // Add offline event listeners
        window.addEventListener('online', () => {
            console.log('🌐 Back online');
        });

        window.addEventListener('offline', () => {
            console.log('📴 Offline - presentation continues to work');
        });
    }

    checkBrowserCompatibility() {
        const issues = [];

        // Check WebGL
        if (!window.WebGLRenderingContext) {
            issues.push('WebGL not supported - 3D sphere will be disabled');
        }

        // Check CSS Grid
        if (!CSS.supports('display', 'grid')) {
            issues.push('CSS Grid not fully supported - layout may be affected');
        }

        // Check Flexbox
        if (!CSS.supports('display', 'flex')) {
            issues.push('Flexbox not supported - layout will be affected');
        }

        // Check CSS Custom Properties
        if (!CSS.supports('--test', '0')) {
            issues.push('CSS Custom Properties not supported - styling may be affected');
        }

        if (issues.length > 0) {
            console.warn('⚠️ Browser Compatibility Issues:');
            issues.forEach(issue => console.warn('  -', issue));
            console.warn('Consider using Chrome, Firefox, Safari, or Edge for best experience');
        } else {
            console.log('✅ Browser compatibility check passed');
        }

        return issues;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Public API
    getSlide(id) {
        return SLIDES.find(s => s.id === id);
    }

    getBackupSlide(id) {
        return BACKUP_SLIDES.find(s => s.id === id);
    }

    getSection(name) {
        return SECTIONS.find(s => s.name.toLowerCase() === name.toLowerCase());
    }

    // Utility: Generate a simple static HTML backup
    generateStaticBackup() {
        console.log('🔧 Static backup can be created using browser "Save As" feature');
        console.log('   Or use Ctrl+S / Cmd+S to save the complete HTML');
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.presentationApp = new PresentationApp();
});

// Fallback initialization for cached pages
if (document.readyState === 'complete') {
    if (!window.presentationApp) {
        window.presentationApp = new PresentationApp();
    }
}

// Export
if (typeof window !== 'undefined') {
    window.PresentationApp = PresentationApp;
}
