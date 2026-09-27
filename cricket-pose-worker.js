/* Uses the project's pinned MediaPipe Tasks Vision 0.10.32 bundle and matching local WASM. */
const assetUrl = path => new URL(path, self.location.href).href;
importScripts(assetUrl('mediapipe-vision.js'));
let detector;
const progress = (message, stage = 'download') => self.postMessage({ type: 'progress', message, stage });
async function download(url, label) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${label} could not load (${response.status}).`);
  const total = Number(response.headers.get('content-length')) || 0;
  if (!response.body) return new Uint8Array(await response.arrayBuffer());
  const reader = response.body.getReader(); const parts = []; let loaded = 0;
  for (;;) {
    const { value, done } = await reader.read(); if (done) break;
    parts.push(value); loaded += value.byteLength;
    progress(`${label}: ${(loaded / 1048576).toFixed(1)}${total ? ' / ' + (total / 1048576).toFixed(1) : ''} MB`);
  }
  const bytes = new Uint8Array(loaded); let offset = 0;
  for (const part of parts) { bytes.set(part, offset); offset += part.byteLength; }
  return bytes;
}
self.onmessage = async ({ data }) => {
  if (data.type === 'init') {
    let wasmURL;
    try {
      progress('Preparing local camera tracking…');
      const { FilesetResolver, PoseLandmarker } = self.Vision;
      const fileset = await FilesetResolver.forVisionTasks(assetUrl('mediapipe/wasm'));
      const model = await download(assetUrl('mediapipe/models/pose_landmarker_lite.task'), 'Pose model');
      const wasm = await download(fileset.wasmBinaryPath, 'Camera engine');
      wasmURL = URL.createObjectURL(new Blob([wasm], { type: 'application/wasm' }));
      const localFileset = { ...fileset, wasmBinaryPath: wasmURL };
      for (const delegate of data.cpuOnly ? ['CPU'] : ['GPU', 'CPU']) {
        try {
          progress(`Starting ${delegate === 'GPU' ? 'graphics' : 'CPU'} tracking…`, delegate);
          detector = await PoseLandmarker.createFromOptions(localFileset, {
            baseOptions: { modelAssetBuffer: model, delegate }, runningMode: 'VIDEO', numPoses: 1,
            minPoseDetectionConfidence: 0.55, minPosePresenceConfidence: 0.55,
            minTrackingConfidence: 0.55, outputSegmentationMasks: false,
            canvas: typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(1, 1) : undefined,
          });
          self.postMessage({ type: 'ready', delegate, version: self.Vision.__version });
          return;
        } catch (error) { if (delegate === 'CPU') throw error; }
      }
    } catch (error) { self.postMessage({ type: 'error', message: String(error?.message || error) }); }
    finally { if (wasmURL) URL.revokeObjectURL(wasmURL); }
  } else if (data.type === 'frame') {
    try {
      if (!detector) throw new Error('Camera tracking has not started.');
      const begin = performance.now();
      const result = detector.detectForVideo(data.bitmap, data.timestamp);
      self.postMessage({ type: 'pose', landmarks: result.landmarks[0] || null,
        timestamp: data.timestamp, inferenceMs: performance.now() - begin });
    } catch (error) { self.postMessage({ type: 'error', message: String(error?.message || error) }); }
    finally { data.bitmap?.close(); }
  }
};
