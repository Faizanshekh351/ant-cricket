/* ============================================================
   ⚡ ANT CRICKET 3D MOTION ENGINE ⚡
   Architecture: Antseed AI (GLM 5.3 Lite)
   Hackathon Edition — Zero Latency Motion Cricket Engine
   ============================================================ */
(function () {
  'use strict';

  /* ── 1. CONSTANTS ─────────────────────────────────────── */
  var BATTER_BLUE  = 0x1565C0;
  var BATTER_WHITE = 0xF5F5F5;
  var BATTER_DARK  = 0x0D1B2A;
  var UMPIRE_HAT   = 0xFFFFFF;

  /* ── 2. KILL BROWSER TTS ─────────────────────────────── */
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak = function() {};
  }

  /* ── 3. GLSL HELPERS ────────────────────────────────── */
  var HSV_GLSL = [
    'vec3 rgb2hsv(vec3 c){',
    '  vec4 K=vec4(0.,-1./3.,2./3.,-1.);',
    '  vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));',
    '  vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));',
    '  float d=q.x-min(q.w,q.y);float e=1e-10;',
    '  return vec3(abs(q.z+(q.w-q.y)/(6.*d+e)),d/(q.x+e),q.x);',
    '}',
    'vec3 hsv2rgb(vec3 c){',
    '  vec4 K=vec4(1.,2./3.,1./3.,3.);',
    '  vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);',
    '  return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);',
    '}'
  ].join('\n');

  function injectVertexHelpers(shader) {
    if (!shader.vertexShader.includes('vAntUV')) {
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>',
          '#include <common>\nvarying vec2 vAntUV;\nvarying float vAntY;')
        .replace('#include <begin_vertex>',
          '#include <begin_vertex>\nvAntUV=uv;\nvAntY=position.y;');
    }
  }

  function injectFragHelpers(shader) {
    if (!shader.fragmentShader.includes('rgb2hsv')) {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        '#include <common>\nvarying vec2 vAntUV;\nvarying float vAntY;\n' + HSV_GLSL
      );
    }
  }

  /* ── 4. BATTER SHADER: Yellow → Royal Blue ─────────── */
  var BATTER_FRAG = [
    '#include <map_fragment>',
    '{',
    '  vec3 c=diffuseColor.rgb;',
    '  vec3 h=rgb2hsv(c);',
    '  bool skin=(c.r>c.g&&c.g>c.b&&c.r>0.35&&(c.r-c.b)>0.07&&h.y>0.10);',
    '  bool dark=(h.z<0.07);',
    '  bool yel=(h.x>=0.08&&h.x<=0.22&&h.y>0.28&&h.z>0.18);',
    '  if(yel&&!skin&&!dark){',
    '    vec3 t=vec3(0.597,0.887,max(0.22,h.z*0.85+0.05));',
    '    diffuseColor.rgb=hsv2rgb(t);',
    '  }',
    '}'
  ].join('\n');

  function batterOBC(shader) {
    injectVertexHelpers(shader);
    injectFragHelpers(shader);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <map_fragment>', BATTER_FRAG);
  }

  /* ── 5. BOWLER SHADER: Pink → Forest Green ─────────── */
  var BOWLER_FRAG = [
    '#include <map_fragment>',
    '{',
    '  vec3 c=diffuseColor.rgb;',
    '  vec3 h=rgb2hsv(c);',
    '  bool skin=(c.r>c.g&&c.g>c.b&&c.r>0.35&&(c.r-c.b)>0.07&&h.y>0.10);',
    '  bool dark=(h.z<0.07);',
    '  bool pink=((h.x>=0.83||h.x<=0.07)&&h.y>0.28&&h.z>0.15);',
    '  if(pink&&!skin&&!dark){',
    '    vec3 t=vec3(0.338,0.633,max(0.20,h.z*0.82+0.06));',
    '    diffuseColor.rgb=hsv2rgb(t);',
    '  }',
    '}'
  ].join('\n');

  function bowlerOBC(shader) {
    injectVertexHelpers(shader);
    injectFragHelpers(shader);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <map_fragment>', BOWLER_FRAG);
  }

  /* ── 6. FIELDER SHADER: Pink → Same Green as Bowler ─── */
  var FIELDER_FRAG = [
    '#include <map_fragment>',
    '{',
    '  vec3 c=diffuseColor.rgb;',
    '  vec3 h=rgb2hsv(c);',
    '  bool skin=(c.r>c.g&&c.g>c.b&&c.r>0.35&&(c.r-c.b)>0.07&&h.y>0.10);',
    '  bool dark=(h.z<0.07);',
    '  bool pink=((h.x>=0.83||h.x<=0.07)&&h.y>0.28&&h.z>0.15);',
    '  if(pink&&!skin&&!dark){',
    '    // Forest Green #2E7D32 — same as bowler jersey',
    '    vec3 t=vec3(0.338,0.633,max(0.20,h.z*0.82+0.06));',
    '    diffuseColor.rgb=hsv2rgb(t);',
    '  }',
    '}'
  ].join('\n');

  function fielderOBC(shader) {
    injectVertexHelpers(shader);
    injectFragHelpers(shader);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <map_fragment>', FIELDER_FRAG);
  }

  /* ── 7. UMPIRE SHADER: Height-Partitioned White ────── */
  var UMPIRE_FRAG = [
    '#include <map_fragment>',
    '{',
    '  vec3 c=diffuseColor.rgb;',
    '  bool skin=(c.r>c.g&&c.g>c.b&&c.r>0.32&&(c.r-c.b)>0.06);',
    '  bool hair=(vAntY>1.50&&c.r<0.28&&c.g<0.28);',
    '  if(!skin&&!hair){',
    '    if(vAntY>0.87) diffuseColor.rgb=vec3(0.97,0.97,0.98);',
    '    else if(vAntY>=0.08) diffuseColor.rgb=vec3(0.11,0.11,0.13);',
    '    else diffuseColor.rgb=vec3(0.90,0.90,0.91);',
    '  }',
    '}'
  ].join('\n');

  function umpireOBC(shader) {
    injectVertexHelpers(shader);
    injectFragHelpers(shader);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <map_fragment>', UMPIRE_FRAG);
  }

  /* ── 8. PITCH FROM SCRATCH ──────────────────────────── */
  var _pitchMesh = null;

  function buildPitch(THREE, group) {
    if (_pitchMesh || !group) return;
    var W = 512, H = 2048;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var ctx = c.getContext('2d');

    // Clay base
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0,    '#c9a06b');
    g.addColorStop(0.12, '#c4986a');
    g.addColorStop(0.50, '#b58854');
    g.addColorStop(0.88, '#c4986a');
    g.addColorStop(1,    '#c9a06b');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    // Grain noise (deterministic LCG)
    var id = ctx.getImageData(0, 0, W, H), d = id.data, s = 987654321;
    for (var i = 0; i < d.length; i += 4) {
      s = (s * 1664525 + 1013904223) >>> 0;
      var n = ((s & 0xFF) - 127) * 0.18;
      d[i]   = Math.max(0, Math.min(255, d[i]   + n));
      d[i+1] = Math.max(0, Math.min(255, d[i+1] + n*0.82));
      d[i+2] = Math.max(0, Math.min(255, d[i+2] + n*0.58));
    }
    ctx.putImageData(id, 0, 0);

    // Roller stripes
    for (var y = 0; y < H; y += 64) {
      if ((y >> 6) % 2 === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.035)';
        ctx.fillRect(0, y, W, 64);
      }
    }

    // Grass fringe
    var lgL = ctx.createLinearGradient(0,0,44,0);
    lgL.addColorStop(0,'rgba(30,68,28,0.88)'); lgL.addColorStop(1,'rgba(30,68,28,0)');
    ctx.fillStyle=lgL; ctx.fillRect(0,0,44,H);
    var lgR = ctx.createLinearGradient(W,0,W-44,0);
    lgR.addColorStop(0,'rgba(30,68,28,0.88)'); lgR.addColorStop(1,'rgba(30,68,28,0)');
    ctx.fillStyle=lgR; ctx.fillRect(W-44,0,44,H);

    // Wear patches
    [[W/2,H*0.21],[W/2,H*0.79]].forEach(function(p) {
      var wg=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],88);
      wg.addColorStop(0,'rgba(128,88,42,0.42)'); wg.addColorStop(1,'rgba(128,88,42,0)');
      ctx.fillStyle=wg; ctx.fillRect(0,p[1]-88,W,176);
    });

    // Creases
    var lm=W*0.08, rm=W*0.92, rc1=W*0.175, rc2=W*0.825;
    var bcT=H*0.115, pcT=H*0.195, bcB=H*0.885, pcB=H*0.805;
    var wl=W*0.30, wr=W*0.70;
    ctx.strokeStyle='#FFFFFF'; ctx.lineCap='square';
    ctx.lineWidth=4;
    ctx.beginPath();
    ctx.moveTo(lm,bcT); ctx.lineTo(rm,bcT);
    ctx.moveTo(lm,bcB); ctx.lineTo(rm,bcB); ctx.stroke();
    ctx.lineWidth=6;
    ctx.beginPath();
    ctx.moveTo(lm-12,pcT); ctx.lineTo(rm+12,pcT);
    ctx.moveTo(lm-12,pcB); ctx.lineTo(rm+12,pcB); ctx.stroke();
    ctx.lineWidth=4;
    ctx.beginPath();
    ctx.moveTo(rc1,bcT-12); ctx.lineTo(rc1,pcT+12);
    ctx.moveTo(rc2,bcT-12); ctx.lineTo(rc2,pcT+12);
    ctx.moveTo(rc1,bcB+12); ctx.lineTo(rc1,pcB-12);
    ctx.moveTo(rc2,bcB+12); ctx.lineTo(rc2,pcB-12); ctx.stroke();
    ctx.setLineDash([7,10]); ctx.lineWidth=2.5;
    ctx.beginPath();
    ctx.moveTo(wl,bcT); ctx.lineTo(wl,pcT);
    ctx.moveTo(wr,bcT); ctx.lineTo(wr,pcT);
    ctx.moveTo(wl,bcB); ctx.lineTo(wl,pcB);
    ctx.moveTo(wr,bcB); ctx.lineTo(wr,pcB); ctx.stroke();
    ctx.setLineDash([]);

    var tex = new THREE.CanvasTexture(c);
    tex.generateMipmaps = true; tex.needsUpdate = true;
    var geo = new THREE.PlaneGeometry(3.66, 22.56, 1, 6);
    var mat = new THREE.MeshStandardMaterial({map:tex, roughness:0.88, metalness:0.02});
    _pitchMesh = new THREE.Mesh(geo, mat);
    _pitchMesh.rotation.x = -Math.PI/2;
    _pitchMesh.position.set(0, 0.009, 0);
    _pitchMesh.receiveShadow = true;
    _pitchMesh.name = 'AntCricket_Pitch_v31';
    group.add(_pitchMesh);
    ['Lite_|_Pitch_|_active_2012m','Pitch','pitch_mesh'].forEach(function(nm) {
      var old = group.getObjectByName(nm);
      if (old) old.visible = false;
    });
  }

  /* ── 8b. STADIUM "ANT CRICKET" BORDER & PAVILION BRANDING ── */
  var _brandingDone = false;

  function buildStadiumBranding(THREE, group) {
    if (_brandingDone || !group) return;
    _brandingDone = true;

    // ── 1. Hide original text meshes & remove old freestanding boards ──
    var toRemove = [];
    group.traverse(function(node) {
      if (!node) return;
      var nm = node.name || '';
      // Hide original baked 3D text meshes in the GLB
      if (nm === 'Lite export | Pavilion' ||
          nm === 'Lite export | Boundary' ||
          nm === 'Lite export | Scoreboard' ||
          nm === 'Lite export | Scoreboard.001') {
        node.visible = false;
      }
      // Remove any previously added freestanding boards that were inside the grass
      if (nm.startsWith('AntCricket_Hoarding_')) {
        toRemove.push(node);
      }
      // Re-theme stadium materials for a refreshed look
      if (node.isMesh && node.material) {
        var mn = (node.material.name || '');
        if (mn.toLowerCase().includes('lime') || nm.includes('lime cap')) {
          node.material = node.material.clone();
          node.material.color.setHex(0x00FF88);
          node.material.emissive = new (node.material.color.constructor)(0x00FF88);
          node.material.emissiveIntensity = 0.25;
        } else if (mn.includes('Deep navy seats') || nm.includes('navy')) {
          node.material = node.material.clone();
          node.material.color.setHex(0x0A2240);
        } else if (mn.includes('Ocean seats') || nm.includes('blue')) {
          node.material = node.material.clone();
          node.material.color.setHex(0x0088CC);
        }
      }
    });
    toRemove.forEach(function(o) {
      if (o.parent) o.parent.remove(o);
    });

    // ── 2. Upper Pavilion "ANT CRICKET" Sign ──
    // The pavilion mesh is positioned at (0, 18.07, -95.35)
    var pavCanvas = document.createElement('canvas');
    pavCanvas.width = 1024; pavCanvas.height = 160;
    var pctx = pavCanvas.getContext('2d');
    // Dark brushed obsidian background
    pctx.fillStyle = '#060d09';
    pctx.fillRect(0, 0, 1024, 160);
    // Neon lime accent border
    pctx.strokeStyle = '#00ff88';
    pctx.lineWidth = 4;
    pctx.strokeRect(4, 4, 1016, 152);
    // Left & right accent bars
    pctx.fillStyle = '#00ff88';
    pctx.fillRect(10, 10, 18, 140);
    pctx.fillRect(1024 - 28, 10, 18, 140);
    // Main text: "ANT CRICKET"
    pctx.fillStyle = '#ffffff';
    pctx.font = 'bold 96px Impact, Bebas Neue, sans-serif';
    pctx.textAlign = 'center';
    pctx.textBaseline = 'middle';
    pctx.fillText('ANT CRICKET', 512, 80);
    // Glow effect
    pctx.shadowColor = '#00ff88';
    pctx.shadowBlur = 18;
    pctx.fillStyle = '#00ff88';
    pctx.fillText('ANT CRICKET', 512, 80);
    pctx.shadowBlur = 0;

    var pavTex = new THREE.CanvasTexture(pavCanvas);
    pavTex.needsUpdate = true;
    var pavMat = new THREE.MeshStandardMaterial({
      map: pavTex,
      roughness: 0.2,
      metalness: 0.1,
      toneMapped: false
    });
    pavMat.emissiveMap = pavTex;
    pavMat.emissiveIntensity = 0.55;

    // Placed exactly on the pavilion upper facade facing the pitch (+Z)
    var pavSign = new THREE.Mesh(new THREE.PlaneGeometry(9.2, 1.45), pavMat);
    pavSign.position.set(0, 18.07, -95.28);
    pavSign.name = 'AntCricket_PavilionFacadeSign';
    group.add(pavSign);

    // ── 3. Upper Stadium Roof Marquee (top arch crest) ──
    var topCanvas = document.createElement('canvas');
    topCanvas.width = 1024; topCanvas.height = 128;
    var tctx = topCanvas.getContext('2d');
    tctx.fillStyle = '#030806';
    tctx.fillRect(0, 0, 1024, 128);
    tctx.strokeStyle = 'rgba(0,255,136,0.6)';
    tctx.lineWidth = 3;
    tctx.strokeRect(3, 3, 1018, 122);
    tctx.fillStyle = '#00ff88';
    tctx.font = 'bold 74px Impact, Bebas Neue, sans-serif';
    tctx.textAlign = 'center';
    tctx.textBaseline = 'middle';
    tctx.fillText('\u26A1 ANT CRICKET STADIUM \u26A1', 512, 64);

    var topTex = new THREE.CanvasTexture(topCanvas);
    topTex.needsUpdate = true;
    var topMat = new THREE.MeshStandardMaterial({ map: topTex, toneMapped: false });
    topMat.emissiveMap = topTex;
    topMat.emissiveIntensity = 0.5;

    var topSign = new THREE.Mesh(new THREE.PlaneGeometry(16, 2.0), topMat);
    topSign.position.set(0, 26.3, -94.6);
    topSign.name = 'AntCricket_TopRoofMarquee';
    group.add(topSign);

    // ── 4. Flush Border Wall LED Ribbon Boards (ON the perimeter barrier wall) ──
    // The perimeter border wall is at RX = 72.8, RZ = 78.8, height 0.10m to 1.02m (center y = 0.56)
    var ribbonCanvas = document.createElement('canvas');
    ribbonCanvas.width = 1024; ribbonCanvas.height = 128;
    var rctx = ribbonCanvas.getContext('2d');
    rctx.fillStyle = '#040906';
    rctx.fillRect(0, 0, 1024, 128);
    // Cyan / Lime glowing top and bottom edge lines
    rctx.fillStyle = '#00ff88';
    rctx.fillRect(0, 0, 1024, 6);
    rctx.fillStyle = '#00e5ff';
    rctx.fillRect(0, 122, 1024, 6);
    // Repeating text along the LED ribbon
    rctx.fillStyle = '#ffffff';
    rctx.font = 'bold 62px Impact, Bebas Neue, sans-serif';
    rctx.textAlign = 'center';
    rctx.textBaseline = 'middle';
    rctx.fillText('ANT CRICKET   \u2022   ANT CRICKET   \u2022   ANT CRICKET', 512, 64);
    rctx.fillStyle = 'rgba(0,255,136,0.35)';
    rctx.fillText('ANT CRICKET   \u2022   ANT CRICKET   \u2022   ANT CRICKET', 512, 64);

    var ribbonTex = new THREE.CanvasTexture(ribbonCanvas);
    ribbonTex.needsUpdate = true;
    var ribbonMat = new THREE.MeshStandardMaterial({
      map: ribbonTex,
      roughness: 0.3,
      metalness: 0.05,
      toneMapped: false
    });
    ribbonMat.emissiveMap = ribbonTex;
    ribbonMat.emissiveIntensity = 0.42;

    // Slender panels: 8.5m wide, 0.82m tall (matches border wall face exactly)
    var ribbonGeo = new THREE.PlaneGeometry(8.5, 0.82, 1, 1);
    var RIBBON_COUNT = 24;
    var RX = 72.2, RZ = 78.2; // Placed flush against the perimeter board wall

    for (var bi = 0; bi < RIBBON_COUNT; bi++) {
      var angle = (bi / RIBBON_COUNT) * Math.PI * 2;
      var bx = RX * Math.cos(angle);
      var bz = RZ * Math.sin(angle);

      var panel = new THREE.Mesh(ribbonGeo, ribbonMat);
      // y = 0.56m places it right on the perimeter wall face
      panel.position.set(bx, 0.56, bz);
      // Face inwards towards the ground center
      panel.lookAt(0, 0.56, 0);

      panel.name = 'AntCricket_BorderRibbon_' + bi;
      panel.receiveShadow = false;
      panel.castShadow = false;
      group.add(panel);
    }

    // ── 5. Main scoreboard name plates ──
    var nameCanvas = document.createElement('canvas');
    nameCanvas.width = 512; nameCanvas.height = 80;
    var nctx = nameCanvas.getContext('2d');
    nctx.fillStyle = '#050f08';
    nctx.fillRect(0, 0, 512, 80);
    nctx.fillStyle = '#00ff88';
    nctx.font = 'bold 52px Impact, sans-serif';
    nctx.textAlign = 'center';
    nctx.textBaseline = 'middle';
    nctx.fillText('ANT CRICKET ARENA', 256, 40);
    nctx.strokeStyle = 'rgba(0,255,136,0.4)';
    nctx.lineWidth = 2;
    nctx.strokeRect(1, 1, 510, 78);

    var nameTex = new THREE.CanvasTexture(nameCanvas);
    nameTex.needsUpdate = true;
    var nameMat = new THREE.MeshStandardMaterial({ map: nameTex, toneMapped: false });
    nameMat.emissiveMap = nameTex;
    nameMat.emissiveIntensity = 0.45;

    var nameGeo = new THREE.PlaneGeometry(16, 2.5, 1, 1);
    [38, 218].forEach(function(deg) {
      var rad = (deg * Math.PI) / 180;
      var nm = new THREE.Mesh(nameGeo, nameMat);
      nm.position.set(
        (101 - 0.56) * Math.cos(rad),
        24,
        -106.44 * Math.sin(rad)
      );
      nm.lookAt(
        nm.position.x + (-Math.cos(rad)),
        24,
        nm.position.z + Math.sin(rad)
      );
      nm.name = 'AntCricket_ScoreboardName_' + deg;
      group.add(nm);
    });
  }


  var _umpireDone = false;
  function styleUmpire() {
    if (_umpireDone) return;
    var ump = window.antScene && window.antScene.umpire;
    if (!ump || !ump.officials) return;
    if (ump.officials[1]) ump.officials[1].visible = false;
    var off = ump.officials[0];
    if (!off) return;
    off.visible = true;
    off.traverse(function(n) {
      if (!n.isMesh || !n.material) return;
      if (n.name === 'tripo_node_77df16e4042_1' && !n._antHat) {
        n._antHat = true;
        n.material = n.material.clone();
        n.material.color.setHex(UMPIRE_HAT);
        n.material.roughness = 0.45;
        n.material.needsUpdate = true;
      }
      if (n.name === 'tripo_node_77df16e4042' && !n._antBody) {
        n._antBody = true;
        var m = n.material.clone();
        m.onBeforeCompile = umpireOBC;
        m.customProgramCacheKey = function() { return 'ant-ump-v31'; };
        m.needsUpdate = true;
        n.material = m;
        _umpireDone = true;
      }
    });
  }

  /* ── 10. BATTER STYLING (CA PLUS BAT & KIT) ─────────── */
  var _batDone = false;
  var _helmetChecked = false;

  function styleBatter() {
    var b = window.antScene && window.antScene.batter;
    if (!b || !b.root) return;

    // Remove helmet if attached so character looks like before (check once)
    if (!_helmetChecked) {
      var head = b.root.getObjectByName('mixamorigHead');
      if (head) {
        var oldHelmet = head.getObjectByName('AntCricket_BattingHelmet');
        if (oldHelmet) head.remove(oldHelmet);
      }
      var oldH = b.root.getObjectByName('AntCricket_BattingHelmet');
      if (oldH && oldH.parent) oldH.parent.remove(oldH);
      _helmetChecked = true;
    }

    if (_batDone) return;
    b.root.traverse(function(n) {
      if (!n.isMesh || !n.material) return;
      var mn = (n.material.name||'').toLowerCase();
      var nn = (n.name||'').toLowerCase();

      // Royal Blue jersey
      if ((mn.includes('tripo_mat')||nn.includes('batter_mesh')) && !n._antBat) {
        n._antBat = true;
        var m = n.material.clone();
        m.color.setHex(0xFFFFFF);
        m.onBeforeCompile = batterOBC;
        m.customProgramCacheKey = function() { return 'ant-bat-v31'; };
        m.needsUpdate = true;
        n.material = m;
      }
      // White pads
      if ((mn.includes('glove')||mn.includes('pad')) && !n._antPad) {
        n._antPad = true;
        n.material = n.material.clone();
        n.material.color.setHex(BATTER_WHITE);
        n.material.needsUpdate = true;
      }
      // Bat styling (CA Plus blade & rubber grip)
      if (nn.includes('willow') || nn.includes('blade')) {
        n.material = n.material.clone();
        n.material.color.setHex(0xEAD0A2); // Premium English willow tone
        n.material.roughness = 0.55;
        n.material.needsUpdate = true;
      }
      if (nn.includes('face_mark') || nn.includes('shoulder')) {
        n.material = n.material.clone();
        n.material.color.setHex(0xC22222); // CA Plus red emblem
        n.material.roughness = 0.35;
        n.material.needsUpdate = true;
      }
      if (nn.includes('rubber') || nn.includes('handle') || mn.includes('grip')) {
        n._antGrip = true;
        n.material = n.material.clone();
        n.material.color.setHex(0x111111); // Spiral black chevron grip
        n.material.roughness = 0.9;
        n.material.needsUpdate = true;
      }
    });
    _batDone = true;
  }

  /* ── 11. BOWLER STYLING ─────────────────────────────── */
  var _bowlDone = false;
  function styleBowler() {
    if (_bowlDone) return;
    var b = window.antScene && window.antScene.bowler;
    if (!b || !b.root) return;
    b.root.traverse(function(n) {
      if (!n.isMesh || !n.material) return;
      var mn = (n.material.name||'').toLowerCase();
      var nn = (n.name||'').toLowerCase();
      if ((mn.includes('tripo_mat')||nn.includes('athlete')||nn.includes('pink')) && !n._antBowl) {
        n._antBowl = true;
        var m = n.material.clone();
        m.color.setHex(0xFFFFFF);
        m.onBeforeCompile = bowlerOBC;
        m.customProgramCacheKey = function() { return 'ant-bowl-v31'; };
        m.needsUpdate = true;
        n.material = m;
      }
    });
    _bowlDone = true;
  }

  /* ── 12. CREW FIELDER STYLING ───────────────────────── */
  var _crewDone = false;
  function styleCrewFielders() {
    if (_crewDone) return;
    var crew = window.antScene &&
               window.antScene.fieldPlayers &&
               window.antScene.fieldPlayers.crew;
    if (!crew || !crew.actors) return;
    var found = false;
    crew.actors.forEach(function(actor, idx) {
      if (idx === 0 || !actor || !actor.root) return;
      actor.root.traverse(function(n) {
        if (!n.isMesh || !n.material) return;
        var mn = (n.material.name||'').toLowerCase();
        if ((mn.includes('tripo_mat')||mn.includes('77df16e4')) && !n._antCrew) {
          n._antCrew = true;
          found = true;
          var m = n.material.clone();
          m.color.setHex(0xFFFFFF);
          m.onBeforeCompile = fielderOBC;
          m.customProgramCacheKey = function() { return 'ant-field-v32-green'; };
          m.needsUpdate = true;
          n.material = m;
        }
      });
    });
    if (found) _crewDone = true;
  }

  /* ── 13. FIELDER INSTANCED KIT COLORS ──────────────── */
  function enforceFielderColors() {
    var fp = window.antScene && window.antScene.fieldPlayers;
    if (!fp) return;
    if (fp.jerseys && fp.jerseys.material && !fp._jDone) {
      fp._jDone = true;
      fp.jerseys.material = fp.jerseys.material.clone();
      fp.jerseys.material.color.setHex(0x2E7D32); // Forest Green
      fp.jerseys.material.needsUpdate = true;
    }
    if (fp.runners && fp.runners.material && !fp._rDone) {
      fp._rDone = true;
      fp.runners.material = fp.runners.material.clone();
      fp.runners.material.color.setHex(0xF0F4F0);
      fp.runners.material.needsUpdate = true;
    }
  }

  /* ── 14. KEEPER OFF-CAMERA ──────────────────────────── */
  var _keeperDone = false;
  function keeperFix() {
    if (_keeperDone) return;
    var crew = window.antScene &&
               window.antScene.fieldPlayers &&
               window.antScene.fieldPlayers.crew;
    if (!crew) return;
    var k = crew.actors && crew.actors.get(0);
    if (k && k.root) {
      k.root.visible = false;
      k.root.position.set(9999,9999,9999);
      _keeperDone = true;
    }
  }

  /* ── 15. FIELD TRACKER ──────────────────────────────── */
  var _ftWrap = null, _ftCanvas = null, _ftCtx = null;

  function createFieldTracker() {
    if (_ftCanvas) return;

    _ftWrap = document.createElement('div');
    _ftWrap.id = 'ant-field-tracker';
    _ftWrap.setAttribute('style', [
      'position:fixed',
      'bottom:24px',
      'left:24px',
      'width:146px',
      'height:146px',
      'border-radius:50%',
      'border:2px solid rgba(0,255,136,0.48)',
      'background:rgba(4,14,8,0.76)',
      'backdrop-filter:blur(10px)',
      '-webkit-backdrop-filter:blur(10px)',
      'box-shadow:0 8px 30px rgba(0,0,0,0.65), 0 0 16px rgba(0,255,136,0.22)',
      'z-index:120',
      'overflow:hidden',
      'pointer-events:none',
      'transition:opacity 0.25s ease'
    ].join(';'));

    _ftCanvas = document.createElement('canvas');
    _ftCanvas.width = 146; _ftCanvas.height = 146;
    _ftCanvas.setAttribute('style','position:absolute;top:0;left:0;width:100%;height:100%;border-radius:50%;');
    _ftCtx = _ftCanvas.getContext('2d');

    var lbl = document.createElement('div');
    lbl.setAttribute('style',[
      'position:absolute','bottom:4px','left:0','right:0',
      'text-align:center','font-size:7px','letter-spacing:2px',
      'color:rgba(0,255,136,0.58)','font-family:Bebas Neue,Impact,sans-serif',
      'text-transform:uppercase','pointer-events:none'
    ].join(';'));
    lbl.textContent = 'FIELD TRACKER';

    _ftWrap.appendChild(_ftCanvas);
    _ftWrap.appendChild(lbl);
    document.body.appendChild(_ftWrap);
  }

  var _lastTrackerDraw = 0;
  function updateFieldTracker() {
    if (!_ftCtx || !_ftWrap) return;

    var panel = document.getElementById('panel');
    var panelOpen = panel && !panel.hidden;
    _ftWrap.style.opacity = panelOpen ? '0' : '1';
    if (panelOpen || !window.antScene) return;

    var now = performance.now();
    var game = window.antGame;
    var isDelivering = game && (game.phase === 'delivery' || game.phase === 'windup' || game.phase === 'flight');
    if (isDelivering && (now - _lastTrackerDraw < 120)) return;
    if (!isDelivering && (now - _lastTrackerDraw < 35)) return;
    _lastTrackerDraw = now;

    var ctx = _ftCtx;
    var W = 146, H = 146, cx = W/2, cy = H/2, R = 69;
    var SC = R / 65.0;

    ctx.clearRect(0, 0, W, H);
    ctx.save();

    // Oval + clip
    ctx.beginPath();
    ctx.ellipse(cx, cy, R, R, 0, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(26,68,32,0.88)';
    ctx.fill();
    ctx.clip();

    // Stripes
    ctx.strokeStyle = 'rgba(255,255,255,0.024)';
    ctx.lineWidth = 7;
    for (var sx2 = -R; sx2 < R; sx2 += 13) {
      ctx.beginPath();
      ctx.moveTo(cx+sx2, cy-R);
      ctx.lineTo(cx+sx2, cy+R);
      ctx.stroke();
    }

    // Boundary rope
    ctx.beginPath();
    ctx.ellipse(cx, cy, R-3, R-3, 0, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(255,255,255,0.16)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pitch
    var pw = 3.66*SC, ph = 22.56*SC;
    ctx.fillStyle = 'rgba(185,145,76,0.92)';
    ctx.fillRect(cx-pw/2, cy-ph/2, pw, ph);

    // Creases
    ctx.strokeStyle = 'rgba(255,255,255,0.78)';
    ctx.lineWidth = 1;
    var pc2 = 4.26*SC;
    [cy-pc2, cy+pc2].forEach(function(y2) {
      ctx.beginPath();
      ctx.moveTo(cx-pw/2-2, y2); ctx.lineTo(cx+pw/2+2, y2); ctx.stroke();
    });

    // Stumps
    [[cx, cy-9.65*SC],[cx, cy+9.65*SC]].forEach(function(p2) {
      ctx.beginPath(); ctx.arc(p2[0],p2[1],2.5,0,Math.PI*2);
      ctx.fillStyle='#FFD700'; ctx.fill();
    });

    // Batter dot
    ctx.beginPath(); ctx.arc(cx, cy+8.5*SC, 4, 0, Math.PI*2);
    ctx.fillStyle='#00e676'; ctx.fill();
    ctx.strokeStyle='rgba(0,255,136,0.45)'; ctx.lineWidth=1; ctx.stroke();

    // Fielders (read from real actor positions)
    var crew2 = window.antScene.fieldPlayers &&
                window.antScene.fieldPlayers.crew;
    if (crew2 && crew2.actors) {
      crew2.actors.forEach(function(actor, idx2) {
        if (idx2 === 0) return;
        if (!actor || !actor.root || !actor.root.visible) return;
        var pos = actor.root.position;
        if (Math.abs(pos.x) > 95 || Math.abs(pos.z) > 95) return;
        var dx = pos.x * SC, dz = -pos.z * SC;
        var dist = Math.sqrt(dx*dx + dz*dz);
        if (dist > R-5) { var s2=((R-5)/dist); dx*=s2; dz*=s2; }
        var px2 = cx + dx, pz2 = cy + dz;
        ctx.beginPath(); ctx.arc(px2,pz2,5.5,0,Math.PI*2);
        ctx.fillStyle='rgba(33,150,243,0.22)'; ctx.fill();
        ctx.beginPath(); ctx.arc(px2,pz2,3.5,0,Math.PI*2);
        ctx.fillStyle='#2196F3'; ctx.fill();
        ctx.strokeStyle='rgba(255,255,255,0.50)'; ctx.lineWidth=0.8; ctx.stroke();
      });
    }

    ctx.restore();

    // Compass
    ctx.save();
    ctx.fillStyle='rgba(0,255,136,0.50)';
    ctx.font='bold 7px Bebas Neue,Impact,sans-serif';
    ctx.textAlign='center'; ctx.fillText('N',cx,8); ctx.fillText('S',cx,H-1);
    ctx.textAlign='left';   ctx.fillText('E',W-7,cy+3);
    ctx.textAlign='right';  ctx.fillText('W',7,cy+3);
    ctx.restore();
  }

  /* ── 16. GET READY 2-SECOND COUNTDOWN HUD ────────────── */
  var _hudReadyEl = null;

  function createCountdownHUD() {
    if (_hudReadyEl) return;
    _hudReadyEl = document.createElement('div');
    _hudReadyEl.id = 'ant-ready-hud';
    _hudReadyEl.setAttribute('style', [
      'position:fixed',
      'top:110px',
      'left:50%',
      'transform:translateX(-50%)',
      'background:rgba(4,16,10,0.88)',
      'border:2px solid #00ff88',
      'border-radius:18px',
      'padding:10px 32px',
      'text-align:center',
      'box-shadow:0 8px 32px rgba(0,255,136,0.35)',
      'backdrop-filter:blur(8px)',
      '-webkit-backdrop-filter:blur(8px)',
      'z-index:900',
      'pointer-events:none',
      'opacity:0',
      'transition:opacity 0.18s ease, transform 0.18s ease'
    ].join(';'));

    _hudReadyEl.innerHTML = [
      '<div style="font-family:\'Bebas Neue\',Impact,sans-serif;font-size:16px;letter-spacing:3px;color:#00ff88;">\u26A1 GET READY \u26A1</div>',
      '<div id="ant-ready-sec" style="font-family:\'Bebas Neue\',Impact,sans-serif;font-size:46px;line-height:1;color:#ffffff;text-shadow:0 0 16px #00ff88;margin-top:2px;">5</div>'
    ].join('');

    document.body.appendChild(_hudReadyEl);
  }

  function updateCountdownHUD() {
    if (!_hudReadyEl) createCountdownHUD();
    var game = window.antGame;
    if (!game) return;

    // Show during countdown / between balls
    if (game.phase === 'countdown') {
      var remaining = Math.max(1, Math.ceil(game.countdownDuration - game.phaseTime));
      var secEl = document.getElementById('ant-ready-sec');
      if (secEl) secEl.textContent = String(remaining);
      _hudReadyEl.style.opacity = '1';
      _hudReadyEl.style.transform = 'translateX(-50%) scale(1)';
    } else {
      _hudReadyEl.style.opacity = '0';
      _hudReadyEl.style.transform = 'translateX(-50%) scale(0.9)';
    }
  }

  /* ── 17. 3D POV MODE SWITCHER (FIRST PERSON & THIRD PERSON ONLY) ── */
  var CAM_VIEWS = ['broadcast', 'eyes'];
  var CAM_LABELS = {
    broadcast: '🎥 THIRD PERSON POV',
    eyes: '👁️ FIRST PERSON POV'
  };
  var _currentCamIdx = 0;

  function setup3DModeButton() {
    var topbar = document.querySelector('.topbar');
    if (!topbar || document.getElementById('ant-cam-btn')) return;

    var btn = document.createElement('button');
    btn.id = 'ant-cam-btn';
    btn.className = 'ant-nav-cam-btn';
    btn.setAttribute('style', [
      'background:rgba(0,255,136,0.12)',
      'border:1px solid #00ff88',
      'color:#00ff88',
      'border-radius:18px',
      'font-family:\'Bebas Neue\',Impact,sans-serif',
      'font-size:14px',
      'letter-spacing:1.5px',
      'padding:6px 16px',
      'cursor:pointer',
      'box-shadow:0 0 14px rgba(0,255,136,0.3)',
      'transition:all 0.18s ease',
      'margin-right:8px'
    ].join(';'));
    btn.innerHTML = CAM_LABELS['broadcast'];

    function syncPOV(view) {
      if (window.antScene && window.antScene.setView) {
        window.antScene.setView(view);
      }
      var select = document.getElementById('game-view');
      if (select) select.value = view;
    }

    btn.addEventListener('click', function() {
      _currentCamIdx = (_currentCamIdx + 1) % CAM_VIEWS.length;
      var view = CAM_VIEWS[_currentCamIdx];
      btn.innerHTML = CAM_LABELS[view];
      syncPOV(view);
    });

    var select = document.getElementById('game-view');
    if (select) {
      Array.from(select.options).forEach(function(opt) {
        if (opt.value === 'tactical') opt.remove();
        else if (opt.value === 'broadcast') opt.textContent = 'Third Person POV';
        else if (opt.value === 'eyes') opt.textContent = 'First Person POV';
      });
      select.addEventListener('change', function() {
        var v = select.value === 'eyes' ? 'eyes' : 'broadcast';
        _currentCamIdx = CAM_VIEWS.indexOf(v);
        btn.innerHTML = CAM_LABELS[v];
      });
    }

    var homeBtn = document.getElementById('ant-home-btn');
    if (homeBtn && homeBtn.parentNode) {
      homeBtn.parentNode.insertBefore(btn, homeBtn);
    } else {
      topbar.appendChild(btn);
    }
  }

  /* ── 18. HIDE FIELD BANNERS ─────────────────────────── */
  function hideFieldBanners() {
    ['field-call','placement'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el && !el.hidden) { el.hidden=true; el.style.setProperty('display','none','important'); }
    });
  }

  /* ── 19. HOME NAV ───────────────────────────────────── */
  function setupHomeNav() {
    var topbar = document.querySelector('.topbar');
    if (!topbar || document.getElementById('ant-home-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'ant-home-btn';
    btn.className = 'ant-nav-home-btn';
    btn.innerHTML = '\uD83C\uDFE0 HOME';
    btn.addEventListener('click', function() {
      try { if (window.antGame) window.antGame.phase='idle'; } catch(e) {}
      var panel = document.getElementById('panel');
      if (panel) panel.hidden = false;
    });
    var personal = topbar.querySelector('.personal');
    personal ? topbar.insertBefore(btn, personal) : topbar.appendChild(btn);
  }

  /* ── 20. RAF TICK (ZERO-OVERHEAD HOT LOOP FOR DELIVERY) ─ */
  var _crowdDone = false;
  function tick() {
    var scene = window.antScene;
    if (scene) {
      var THREE = window.THREE;
      var group = scene.stadium && scene.stadium.group;
      if (THREE && group && !_pitchMesh) buildPitch(THREE, group);
      if (THREE && group && !_brandingDone) buildStadiumBranding(THREE, group);
      if (!_umpireDone) styleUmpire();
      if (!_batDone || !_helmetChecked) styleBatter();
      if (!_bowlDone) styleBowler();
      if (!_crewDone) styleCrewFielders();
      enforceFielderColors();
      if (!_keeperDone) keeperFix();
      if (!_crowdDone) {
        try { scene.setCrowd(true); _crowdDone = true; } catch(e) {}
      }
    }
    updateFieldTracker();
    updateCountdownHUD();
    hideFieldBanners();
    if (window.antGame && window.antGame.phase === 'paused') {
      document.querySelectorAll('[name="input-mode"]').forEach(function(r) {
        r.disabled = false;
      });
    }
    requestAnimationFrame(tick);
  }

  /* ── 20. CAMERA FAILSAFE: INSTANT SWAP TO SWIPE BATTING ─ */
  function setupModeSwapFix() {
    function enableInputs() {
      var game = window.antGame;
      if (game && game.phase === 'paused') {
        document.querySelectorAll('[name="input-mode"]').forEach(function(r) {
          r.disabled = false;
        });
      }
    }

    document.addEventListener('pointerdown', enableInputs, true);

    document.addEventListener('click', function(e) {
      enableInputs();
      var target = e.target;
      if (!target) return;
      var label = target.closest('label');
      var radio = (target.name === 'input-mode') ? target : (label ? label.querySelector('input[name="input-mode"]') : null);
      if (!radio) return;

      var val = radio.value;
      var game = window.antGame;
      if (game && game.phase === 'paused' && val === 'touch') {
        radio.disabled = false;
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
        var actionBtn = document.getElementById('action');
        if (actionBtn) {
          actionBtn.disabled = false;
          actionBtn.click();
        } else if (game.resume) {
          game.resume();
        }
      }
    }, true);
  }

  /* ── 21. BOOT ───────────────────────────────────────── */
  function boot() {
    createFieldTracker();
    createCountdownHUD();
    setup3DModeButton();
    setupHomeNav();
    setupModeSwapFix();
    tick();
    console.log('%c⚡ ANT CRICKET — Powered by Antseed AI (GLM 5.3 Lite)',
      'color:#00ff88;font-size:14px;font-weight:bold;background:#000;padding:4px 12px;border-radius:4px');
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
