# 🏏 ANT CRICKET — 3D AI Motion & Touch Cricket Batting Game
> **Official Hackathon Project | Built with Antseed AI (DeepSeek & GLM 5.3 Flash / Lite)**  
> **Total Development & Infrastructure Cost: $0.00 (Zero Dollar Budget)**  
> **100% Vibe Coded from Zero Scratch**

[![Built with Antseed AI](https://img.shields.io/badge/AI_Engine-Antseed_AI_(GLM_5.3_Flash_%26_DeepSeek)-00ff88?style=for-the-badge)](https://antseed.ai)
[![Total Cost](https://img.shields.io/badge/Cost-%240.00_(Zero_Budget)-brightgreen?style=for-the-badge)](#-zero-dollar-budget-breakdown-000)
[![Technology](https://img.shields.io/badge/Stack-Three.js_%7C_MediaPipe_%7C_WebAssembly_%7C_Blender_%7C_ElevenLabs-ff2a3c?style=for-the-badge)](#-languages--technologies-used)
[![POV Modes](https://img.shields.io/badge/Camera-First_Person_%26_Third_Person_POV-00e5ff?style=for-the-badge)](#-dual-broadcast-camera-pov-modes)

---

## 🌟 Executive Summary

**ANT CRICKET** is a next-generation, high-fidelity 3D motion-controlled cricket batting simulator that runs entirely inside any modern web browser at **60–120 FPS**. 

Players can step in front of their standard laptop/phone webcam and physically swing their arms or an everyday bat/ruler to hit drives, cuts, pulls, and towering sixes over the stadium ropes. Alternatively, players can play on touchscreen or mouse via fluid directional swipe gestures.

This entire application—including the Three.js 3D rendering pipeline, procedural stadium lighting, Web Worker-based MediaPipe computer vision gesture engine, Hawkeye radar pitch tracking, broadcast audio system, and official TV-grade glassmorphic scoreboard—was **vibe coded from zero scratch** using **Antseed AI** models (**DeepSeek** and **GLM 5.3 Flash / Lite**) accessed seamlessly via **Antseed AI VPN**.

---

## ⚡ The Antseed AI Origin: Zero Scratch & Vibe Coded

### What is Antseed AI & Antseed AI VPN?
**Antseed AI** provides high-speed, direct developer access to next-generation frontier intelligence models like **DeepSeek** and **GLM 5.3 Flash / Lite**. For developers and hackathon creators located anywhere in the world, **Antseed AI VPN** provides high-bandwidth, ultra-low-latency, uninterrupted global tunneling directly to Antseed AI model clusters, bypassing local API routing restrictions and network bottlenecks.

### How Antseed AI Built This Project:
1. **Zero Boilerplate, 100% Prompted & Vibe Coded**: From mathematical Three.js vector transformations and Draco 3D mesh decompression to Web Audio ducking filters, every algorithm was architected iteratively through conversational pairing with **Antseed AI GLM 5.3 Flash** and **DeepSeek**.
2. **Real-Time Physics Tuning**: DeepSeek was used to solve the aerodynamic flight formulas for leather cricket ball swing, pitch bounce restitution, and willow sweet-spot impulse vectors.
3. **Gesture Engineering**: GLM 5.3 Flash analyzed real-time human kinematics data to calibrate batsman swing velocity, backlift angles, and follow-through trajectories.

---

## 💰 Zero-Dollar Budget Breakdown ($0.00)

This project is proof that AAA-grade interactive AI experiences can be engineered with **zero financial capital**:

| Component | Solution Used | Commercial Value | Cost Paid |
| :--- | :--- | :--- | :--- |
| **Generative AI & Coding** | Antseed AI (DeepSeek & GLM 5.3 Flash via Antseed AI VPN) | $150 / mo | **$0.00** |
| **Motion Tracking & Computer Vision** | Google MediaPipe Pose Landmarker running locally via WebAssembly | $200 / mo cloud vision | **$0.00** |
| **3D Modeling & Stadium Geometry** | Blender 3D (Open Source) | $300 / seat | **$0.00** |
| **AI Audio Commentary** | ElevenLabs AI Voice synthesis (Free Creator Tier) | $22 / mo | **$0.00** |
| **3D Graphics Engine** | Three.js WebGL (MIT Open Source) | Free | **$0.00** |
| **Audio Processing** | Web Audio API (Hardware-native in-browser) | Free | **$0.00** |
| **Hosting & Serving** | Node.js native HTTP static server + GitHub Pages | Free | **$0.00** |
| **TOTAL PROJECT EXPENDITURE** | | | **$0.00** |

---

## 🧠 How I Taught AI to Detect Hand Gestures & Batting Mechanics

Rather than relying on laggy server-side computer vision APIs that charge per frame and invade player privacy, **ANT CRICKET runs a custom client-side AI motion model entirely in the browser**:

```
Webcam Stream (60 FPS)
       │
       ▼
Isolated Web Worker (`cricket-pose-worker.js`)
       │
       ▼
MediaPipe Pose Landmarker (WebAssembly internal)
       │  Extracts 33 3D Spatial Skeletal Landmarks
       ▼
Kinematic Batting Analyzer
  ├── Track: Left & Right Wrists (Landmarks 15, 16)
  ├── Track: Left & Right Elbows (Landmarks 13, 14)
  └── Track: Shoulder Plane Vector (Landmarks 11, 12)
       │
       ▼
Gesture Trajectory Engine
  ├── Velocity: Real-time hand speed derivation (m/s)
  ├── Lift Vector: Upward backlift vs forward downswing angle
  ├── Direction Vector: Lateral swing angle (Off-side vs Leg-side)
  └── Height Plane: High-elbow cover drive vs low sweep/pull
       │
       ▼
Bat-Ball Collision & Sweet Spot Integration
  ├── Delivery Arrival Timeline: Countdown ➔ Windup ➔ Release ➔ Pitch Bounce ➔ Crease Contact
  ├── Timing Tolerance Window: ±264 milliseconds
  └── Shot Classification:
        ├── Ground Drive (Lift < 0.25) ➔ 1–4 Runs
        ├── Lofted Shot (Lift ≥ 0.40, High Speed) ➔ 6 Runs (Over the rope)
        ├── Late / Mistimed Edge ➔ Caught by Slip / Keeper (Wicket)
        └── Missed Delivery ➔ Bowled onto Stumps (Wicket)
```

### Key Technical Innovations:
1. **Dedicated Web Worker Isolation (`cricket-pose-worker.js`)**:
   Camera frames are piped to an isolated Web Worker, freeing the main JavaScript UI and Three.js 3D rendering thread to run at a solid **120 FPS** with zero frame drops or input lag.
2. **100% Client-Side Privacy**:
   Video never leaves the player's device. No video frames are ever recorded or transmitted to any server.
3. **Instant Seamless Touch/Swipe Fail-Safe**:
   If the player moves out of the camera's field of view or lighting conditions drop, the AI instantly unlocks the "Swipe to Bat" mode with a single tap so the match never pauses or terminates unexpectedly.

---

## 💻 Languages & Technologies Used

### 1. Languages
* **JavaScript (ES6+)**:
  * Native ES Modules architecture (`import` / `export`).
  * Dedicated Web Workers for asynchronous AI landmark processing.
  * Web Audio API synthesis and spatial sound attenuation.
* **HTML5**:
  * Dual-layer WebGL2 Canvas and 2D Radar Overlay Canvas.
  * Semantic, accessible DOM structure.
* **CSS3**:
  * Modern CSS Variables, Flexbox, and CSS Grid.
  * Broadcast-grade Glassmorphism with `-webkit-backdrop-filter: blur(14px)`.
  * Hardware-accelerated keyframe animations.
* **GLSL (OpenGL Shading Language)**:
  * Custom vertex and fragment shaders for grass turf reflectivity, boundary rope highlights, and dynamic pitch creases.

### 2. 3D Graphics & Engine
* **Three.js (r160+)**:
  * Perspective camera rigs for First-Person Helmet POV and Third-Person Broadcast POV.
  * Directional shadow mapping, ambient occlusion, and ACESFilmic tone mapping.
  * Google Draco 3D mesh decompression for instant asset loading.

### 3. 3D Modeling & Asset Creation
* **Blender 3D**:
  * Modeled the entire 3D cricket stadium oval, stands, dynamic crowd stands, player pavilion, and pitch turf.
  * Optimized 3D geometry through mesh decimation (reducing vertex overhead by 70%) to ensure smooth performance on low-end laptops and mobile phones.
  * UV unwrapped and baked custom turf textures, pitch wear paths, and sponsor hoardings.

### 4. Audio & Commentary
* **ElevenLabs**:
  * Custom AI voice synthesis generating deep baritone English match commentary.
  * Context-aware commentary clips: match start, boundaries (4s), towering sixes (6s), wickets (bowled, caught, run out), dot balls, and nail-biting target chase moments.
* **Web Audio API**:
  * Dynamic sound engine featuring automatic commentary audio ducking, pitch-cracking willow impacts, crowd cheers, and celebratory horns.

---

## 🎥 Dual Broadcast Camera POV Modes

Players can toggle perspectives with a single tap on the HUD:

1. **👁️ FIRST PERSON POV**:
   * Places the camera directly at the batsman’s eye level inside the helmet grille.
   * Delivers pure adrenaline: watch the bowler release 145 km/h bouncers and curving yorkers directly at you, judging pitch bounce and swing in true 3D space.

2. **🎥 THIRD PERSON POV**:
   * Positions the camera slightly behind and above the batsman.
   * Offers maximum tactical awareness: clearly observe fielding placements, slip cordon gaps, boundary ropes, and full stadium atmosphere.

---

## 🔴 Official Cricket Broadcast Light-Red Scoreboard

Designed to match the high-stakes broadcast graphics of international cricket tournaments (ICC, Star Sports, Sky Sports):

* **Broadcast Light-Red Glassmorphism**: High-contrast crimson-to-scarlet gradient with top-edge white illumination and 14px frosted glass blur.
* **Clean Ball-by-Ball Sequence Chips**:
  * **Unbowled Balls**: Rendered as clean, minimalist empty circular rings (preventing any player confusion with pre-filled numbers).
  * **Current Ball**: Animated with a pulsing golden ring glow (`#ffe066`).
  * **Dot Balls**: Muted dark red chips with clean white dots.
  * **Scored Runs**: High-visibility white badges with bold red numerals.
  * **Boundaries (4s)**: Electric Cyan badges (`#00e5ff`) with glowing drop-shadows.
  * **Sixes (6s)**: Champion Gold badges (`#ffd700`) with stadium firework triggers.
  * **Wickets (W)**: High-alert Scarlet badges (`#ff334b`).

---

## 📡 Hawkeye 2D Radar & Field Tracker

Positioned at the bottom-left of the screen:
* Live top-down 2D radar mapping all 11 fielders across the oval in real time.
* Visualizes off-side and leg-side fielding gaps so batters can accurately pick boundary trajectories.
* Throttled to a lightweight 10 FPS during active delivery flight for maximum rendering performance.

---

## 📂 Project Architecture

```
d:/Cricket/
├── index.html                       # Application entrypoint & meta headers
├── antseed-cricket.js               # Antseed AI Core 3D Controller & Hawkeye Radar
├── antcricket.css                   # Official broadcast styling & glassmorphic UI
├── cricket-pose-worker.js           # Web Worker AI pose landmarker pipeline
├── server.js                        # Zero-dependency local Node.js static server
├── package.json                     # Project manifest & metadata
├── .gitignore                       # Clean Git tracking config (excludes raw 3D archives)
├── assets/
│   ├── game-DOfTd1o3.js             # Physics engine, ball trajectory, timing logic
│   ├── CricketScene-CavlwYGC.js     # Three.js scene graph, stadium & actor manager
│   └── game-8JwsuIL4.css            # Base layouts & typography
├── models/
│   └── cricket/
│       ├── ant-oval-lite.glb        # Optimized 3D stadium oval geometry
│       ├── ant-crowd-lite.glb       # Decimated 3D spectator crowd meshes
│       ├── pink-bowler.glb          # Animated 3D bowler model
│       ├── yellow-batter.glb        # Animated 3D batter model
│       └── helmet.glb               # Detailed batting helmet model
├── mediapipe/                       # In-browser WebAssembly pose detection models
│   ├── models/pose_landmarker_lite.task
│   └── wasm/vision_wasm_internal.wasm
├── sounds/                          # Match SFX & ElevenLabs broadcast audio
│   ├── crack-1.mp3, crack-2.mp3     # Willow bat impacts
│   ├── crowd-bed.mp3, cheer.mp3     # Stadium atmosphere & crowd cheers
│   └── commentary/                  # ElevenLabs AI voice clips
└── fonts/                           # Bebas Neue & Outfit tabular display fonts
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)
* A modern web browser (Google Chrome, Microsoft Edge, Safari, or Brave) with WebGL enabled.
* An integrated or USB webcam (for Motion Mode), or touch screen / mouse (for Swipe Mode).

### 1. Clone the Repository
```bash
git clone https://github.com/Faizanshekh351/ant-cricket.git
cd ant-cricket
```

### 2. Start the Local Server
```bash
node server.js
```

### 3. Open in Browser
Navigate to:
```
http://localhost:3000/
```

### 4. Choose Your Control Mode:
* **📷 Camera Swing**: Step back ~1.5 to 2.5 meters from the webcam so your hands and torso are visible. When the cue flashes green, swing through the line of the ball!
* **👆 Swipe to Bat**: Click or touch and drag across the pitch toward the open boundary gaps.
* **👁️ Toggle POV**: Tap the top-right button to instantly switch between **First Person POV** and **Third Person POV**.

---

## 🏆 Hackathon Credits & Acknowledgments

* **AI Architecture & Vibe Coding**: Powered exclusively by **Antseed AI** using **GLM 5.3 Flash** and **DeepSeek**.
* **Global Model Tunneling**: Accelerated and enabled worldwide via **Antseed AI VPN**.
* **Developed By**: **Faizanshekh351**
* **License**: MIT Open Source License

---

*ANT CRICKET — Built with Antseed AI GLM 5.3 Flash & DeepSeek.*
