# ⚡ ANT CRICKET | 3D Motion Cricket Challenge ⚡
> **Built for Hackathon with Antseed AI (GLM 5.3 Lite)**

A high-tech, zero-latency motion-controlled 3D cricket batting simulator powered by **Antseed AI (GLM 5.3 Lite)**, **WebAssembly**, **MediaPipe AI Pose Tracking**, and **Three.js WebGL**.

Chase down high-stakes targets with your real-life arm/bat swings tracked via webcam, or master the crease with touch/mouse swipe controls!

---

## 🚀 Key Features

### 1. 🎥 Dual 3D POV Modes (First Person & Third Person)
- **👁️ First Person POV**: Immersive batter eye-level helmet perspective right inside the crease tracking the ball onto the willow.
- **🎥 Third Person POV**: Classic broadcast perspective positioned behind the batsman with complete visibility over field gaps and stadium.
- Instant seamless one-tap POV toggle directly from the HUD.

### 2. 🎯 Hawkeye 3D Field Radar & Pitch Map
- Real-time interactive pitch visualizer at bottom-left showing bowling zones (Yorker, Good Length, Short Pitch) and dynamic fielder placement dots.
- Synchronized fielder tracking across the entire 3D stadium oval.

### 3. 🎙️ Deep Baritone AI Audio Commentary & Dynamic SFX
- Broadcast-grade match commentary and dynamic sound effects (sweet-spot willow cracks, stadium crowd roars, boundary celebrations).
- Natural speech timing synchronized with bowler run-up and delivery.

### 4. ⚡ Seamless Camera-to-Swipe Fail-Safe
- Instant fail-safe mode transition if tracking is lost, ensuring continuous gameplay without match interruption.

### 5. 🏆 Zero Friction: Local Career Stats (No Sign-In Required)
- Zero blockers, 100% offline-ready local storage tracking for High Score, Total Runs, 4s, and 6s.

---

## 🎮 How to Play

### Quick Start:
```bash
npm start
# or: node server.js
```

Open: **[http://localhost:3000/](http://localhost:3000/)**

1. **📷 Camera Swing Mode**: Allow camera access, step back so your upper body/hands are visible, and swing as the ball approaches!
2. **👆 Swipe Mode**: Drag across the pitch with mouse/finger toward field gaps to drive, pull, or loft.
3. **Change POV**: Tap the top-right camera pill to toggle between First Person POV and Third Person POV.

---

*Project engineered with Antseed AI (GLM 5.3 Lite)*
