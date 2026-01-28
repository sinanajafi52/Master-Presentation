# 🎓 Master's Thesis Defense Presentation

## Agile Business Structure and Organizational Management for Startups

**A Qualitative Multi-Case Study of Early-Stage German Startups (2-10 Employees)**

---

### 👤 Author
**Sina Najafi**  
Master's Thesis Defense  
Ostfalia University of Applied Sciences  
Faculty of Business Administration  
Supervisor: Prof. Dr. Denis Royer  
January 2026

---

## 🚀 Quick Start

1. **Open the presentation**: Simply double-click `index.html` to open in your browser
2. **Navigate**: Use arrow keys or click the navigation buttons
3. **Explore**: Press `?` for keyboard shortcuts

No installation required! The presentation runs entirely in the browser.

---

## ✨ Features

### Three-Mode System
- **🌐 Sphere Mode**: Impressive 3D animated sphere for opening and closing
- **📊 Linear Mode**: Traditional slide-by-slide progression for main content
- **📋 Quick Jump Mode**: Instant navigation to any slide (perfect for Q&A)

### Navigation
- Full keyboard support (Space, Arrow keys, numbers 1-9)
- Click navigation with Previous/Next buttons
- Progress bar showing completion
- Mini-map sidebar for quick overview
- Quick jump menu for instant slide access

### Presentation Tools
- ⏱️ Built-in timer with pace indicator (On Track / Too Slow / Too Fast)
- 📝 Presenter notes (press `P` to toggle)
- 🖥️ Fullscreen mode (press `F`)
- 📄 PDF export support (Ctrl+P or `window.exportToPDF()`)

### Professional Design
- Dark theme with gradient accents
- Smooth animations and transitions
- Responsive layout (works on 1920×1080 and 1366×768)
- Accessible design with ARIA labels

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` / `→` | Next slide |
| `←` / `Backspace` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `1`-`9` | Jump to slide number |
| `S` | Toggle Sphere/Linear mode |
| `J` | Open Quick Jump menu |
| `M` | Toggle mini-map sidebar |
| `F` | Toggle fullscreen |
| `T` | Toggle timer |
| `P` | Toggle presenter notes |
| `B` | Enable static backup mode |
| `?` | Show help |
| `Esc` | Close modals / Exit |

---

## 📁 Project Structure

```
Master-Presentation/
├── index.html              # Main HTML file
├── README.md               # This file
├── styles/
│   ├── main.css           # Core styles and design system
│   ├── slides.css         # Slide-specific layouts
│   ├── sphere.css         # 3D sphere styling
│   └── animations.css     # Animation library
├── js/
│   ├── slideContent.js    # All slide content data
│   ├── sphere.js          # Three.js 3D visualization
│   ├── navigation.js      # Slide navigation logic
│   ├── timer.js           # Presentation timer
│   ├── keyboard.js        # Keyboard shortcuts
│   └── app.js             # Main application
└── assets/                # (Optional) Images and logos
```

---

## 📑 Presentation Content

### Main Slides (12 slides, ~20 minutes)

1. **Title Slide** (30 sec)
2. **The Problem & Research Gap** (2 min)
3. **Research Question** (1.5 min)
4. **Theoretical Framework** (2 min)
5. **Methodology** (2 min)
6. **Finding #1: Universal Success Factors** (2 min)
7. **Finding #2: Team Experience Matters Most** (2 min)
8. **Finding #3: Critical 6-8 Person Threshold** (2 min)
9. **Five-Layer Conceptual Framework** (2 min)
10. **Six Guiding Principles** (1.5 min)
11. **Limitations & Future Research** (1.5 min)
12. **Contributions & Conclusion** (2 min)

### Backup Slides (for Q&A)
- **B1**: Detailed Case Profiles
- **B2**: German Institutional Context
- **B3**: Cross-Case Comparison Matrix

---

## 🎯 Key Research Findings

1. **Five Universal Success Factors**: Trust, Learning Orientation, Servant Leadership, Results Focus, Selective Framework Customization

2. **Team Experience > Framework Choice**: Prior agile experience contributes 20-40× more than framework selection

3. **Critical 6-8 Person Threshold**: Communication complexity increases nearly 5-fold (from 6 to 28 links)

4. **Five-Layer Framework**: Context → Culture → Structure → Leadership → Outcomes (Culture must precede Structure!)

5. **Central Conclusion**: "Organizational agility in micro-enterprises is fundamentally cultural rather than structural—foundations must precede frameworks, and context always matters."

---

## 🛠️ Technical Details

### Dependencies (loaded via CDN)
- **Three.js** (r128): 3D graphics library for sphere visualization
- **Google Fonts**: Inter, Montserrat, Fira Code

### Browser Support
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (not supported)

### Performance
- Optimized for 60fps animations
- Lazy-loaded slide content
- Minimal file size for fast loading

---

## 📋 Before the Defense: Checklist

- [ ] Test on presentation computer/projector
- [ ] Check 3D sphere renders smoothly
- [ ] Verify all keyboard shortcuts work
- [ ] Practice mode switching (Sphere → Linear → Quick Jump)
- [ ] Test timer functionality
- [ ] Create PDF backup (Ctrl+P)
- [ ] Save offline HTML copy (Ctrl+S)
- [ ] Bring USB drive with backup files
- [ ] Test on different screen resolution

---

## 🔧 Troubleshooting

### 3D Sphere Not Displaying
1. Check if WebGL is enabled in your browser
2. Try a different browser (Chrome recommended)
3. Press `B` for static backup mode

### Slides Not Loading
1. Ensure all files are in the correct directories
2. Check browser console for errors (F12)
3. Try refreshing the page

### Performance Issues
1. Close other browser tabs
2. Disable browser extensions
3. Use fullscreen mode (F)
4. Enable static backup mode (B)

---

## 📝 Customization

### Changing Colors
Edit the CSS custom properties in `styles/main.css`:
```css
:root {
    --color-accent: #6366f1;     /* Primary accent */
    --color-problem: #E74C3C;    /* Section colors */
    --color-theory: #3498DB;
    /* ... */
}
```

### Modifying Slide Content
Edit `js/slideContent.js` to change text, add slides, or modify structure.

### Adjusting Timer
The default is 20 minutes. Modify in `js/app.js`:
```javascript
this.timer = new PresentationTimer(20 * 60); // seconds
```

---

## 📄 License

This presentation and its code are created for academic purposes as part of a Master's thesis defense at Ostfalia University of Applied Sciences.

---

## 🙏 Acknowledgments

- Prof. Dr. Denis Royer (Supervisor)
- Ostfalia University of Applied Sciences
- All startup founders who participated in the research

---

**Good luck with your defense!** 🎓✨