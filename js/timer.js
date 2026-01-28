/**
 * Presentation Timer Module
 * Tracks elapsed time, pace, and provides timing feedback
 */

class PresentationTimer {
    constructor(targetDuration = 20 * 60) { // Default 20 minutes in seconds
        this.targetDuration = targetDuration;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.startTime = null;
        this.pausedTime = 0;
        this.intervalId = null;
        this.slideStartTime = {};
        this.currentSlide = 1;

        this.elements = {
            elapsed: document.getElementById('timer-elapsed'),
            paceIndicator: document.getElementById('pace-indicator'),
            timerContainer: document.querySelector('.timer-container')
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDisplay();
    }

    setupEventListeners() {
        // Toggle timer visibility
        const toggleBtn = document.getElementById('btn-timer-toggle');
        toggleBtn?.addEventListener('click', () => this.toggle());

        // Listen for slide changes to track time per slide
        document.addEventListener('slideChange', (e) => {
            this.onSlideChange(e.detail);
        });

        // Auto-start timer when entering linear mode
        document.addEventListener('modeChange', (e) => {
            if (e.detail.mode === 'linear' && !this.isRunning) {
                this.start();
            }
        });
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startTime = Date.now() - this.pausedTime;
        this.slideStartTime[this.currentSlide] = Date.now();

        this.intervalId = setInterval(() => {
            this.update();
        }, 1000);

        document.dispatchEvent(new CustomEvent('timerStart'));
    }

    pause() {
        if (!this.isRunning) return;

        this.isRunning = false;
        this.pausedTime = Date.now() - this.startTime;

        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        document.dispatchEvent(new CustomEvent('timerPause'));
    }

    toggle() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }

    reset() {
        this.pause();
        this.elapsedTime = 0;
        this.pausedTime = 0;
        this.startTime = null;
        this.slideStartTime = {};
        this.updateDisplay();

        document.dispatchEvent(new CustomEvent('timerReset'));
    }

    update() {
        if (!this.isRunning || !this.startTime) return;

        this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        this.updateDisplay();
        this.updatePace();
    }

    updateDisplay() {
        if (this.elements.elapsed) {
            this.elements.elapsed.textContent = this.formatTime(this.elapsedTime);
        }
    }

    updatePace() {
        const paceIndicator = this.elements.paceIndicator;
        if (!paceIndicator) return;

        const paceText = paceIndicator.querySelector('.pace-text');

        // Calculate expected progress based on time
        const timeProgress = this.elapsedTime / this.targetDuration;

        // Get current slide progress (assuming navigation is available)
        const nav = window.presentationNav;
        const slideProgress = nav ? (nav.getCurrentSlide() - 1) / (nav.getTotalSlides() - 1) : 0;

        // Determine pace
        const paceDiff = slideProgress - timeProgress;

        paceIndicator.classList.remove('slow', 'fast');

        if (paceDiff < -0.1) {
            // Too slow - behind schedule
            paceIndicator.classList.add('slow');
            paceText.textContent = 'Too Slow';
        } else if (paceDiff > 0.15) {
            // Too fast - ahead of schedule
            paceIndicator.classList.add('fast');
            paceText.textContent = 'Too Fast';
        } else {
            // On track
            paceText.textContent = 'On Track';
        }
    }

    onSlideChange(detail) {
        const now = Date.now();

        // Record end time for previous slide
        if (this.slideStartTime[detail.previous]) {
            const timeOnSlide = (now - this.slideStartTime[detail.previous]) / 1000;
            console.log(`Time on slide ${detail.previous}: ${this.formatTime(Math.floor(timeOnSlide))}`);
        }

        // Record start time for new slide
        this.currentSlide = detail.current;
        this.slideStartTime[detail.current] = now;

        // Start timer if not already running
        if (!this.isRunning) {
            this.start();
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    getElapsedTime() {
        return this.elapsedTime;
    }

    getRemainingTime() {
        return Math.max(0, this.targetDuration - this.elapsedTime);
    }

    getTimeOnCurrentSlide() {
        if (!this.slideStartTime[this.currentSlide]) return 0;
        return Math.floor((Date.now() - this.slideStartTime[this.currentSlide]) / 1000);
    }

    // Get expected time for a slide based on its duration in SLIDES data
    getExpectedDuration(slideId) {
        const slide = SLIDES.find(s => s.id === slideId);
        return slide ? slide.duration : 60; // Default 60 seconds
    }

    // Check if we're on track for the current slide
    isSlideOnTrack(slideId) {
        const expected = this.getExpectedDuration(slideId);
        const actual = this.getTimeOnCurrentSlide();
        const tolerance = 0.2; // 20% tolerance

        return actual <= expected * (1 + tolerance);
    }

    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

// Export
if (typeof window !== 'undefined') {
    window.PresentationTimer = PresentationTimer;
}
