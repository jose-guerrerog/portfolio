let animationData = null;
let isAnimating = false;
let animationSpeed = 0.005;
let animationFrameId = null;

self.onmessage = function(e) {
  const { type, data } = e.data;
  
  switch(type) {
    case 'INIT_MODEL':
      initializeModel(data);
      break;
    case 'START_ANIMATION':
      startAnimation(data);
      break;
    case 'STOP_ANIMATION':
      stopAnimation();
      break;
    case 'UPDATE_SPEED':
      updateAnimationSpeed(data.speed);
      break;
    case 'SET_DRAGGING':
      setDragging(data.isDragging);
      break;
  }
};

function initializeModel(data = {}) {
  console.log('🚀 Model worker initializing...');
  
  animationData = {
    rotation: { x: 0, y: 0, z: 0 },
    isDragging: false,
    lastUpdate: performance.now()
  };
  
  self.postMessage({
    type: 'MODEL_INITIALIZED',
    data: { status: 'Ready' }
  });
}

function startAnimation(data = {}) {
  if (isAnimating) return;
  
  isAnimating = true;
  animationSpeed = data.speed || 0.005;
  
  console.log('🎬 Starting animation loop in worker');
  animationLoop();
}

function stopAnimation() {
  isAnimating = false;
  
  if (animationFrameId) {
    clearTimeout(animationFrameId);
    animationFrameId = null;
  }
}

function updateAnimationSpeed(speed) {
  if (typeof speed === 'number' && speed >= 0) {
    animationSpeed = speed;
  }
}

function setDragging(isDragging) {
  if (animationData) {
    animationData.isDragging = isDragging;
  }
}

function animationLoop() {
  if (!isAnimating || !animationData) return;
  
  const currentTime = performance.now();
  const deltaTime = (currentTime - animationData.lastUpdate) / 1000;
  animationData.lastUpdate = currentTime;
  
  if (!animationData.isDragging) {
    animationData.rotation.y += animationSpeed;
    
    animationData.rotation.x = Math.sin(currentTime * 0.001) * 0.02;
    animationData.rotation.z = Math.cos(currentTime * 0.0008) * 0.01;
    
    animationData.rotation.y = animationData.rotation.y % (Math.PI * 2);
  }
  
  self.postMessage({
    type: 'ANIMATION_FRAME',
    data: {
      rotation: { ...animationData.rotation },
      deltaTime,
      timestamp: currentTime
    }
  });
  
  if (isAnimating) {
    animationFrameId = setTimeout(() => animationLoop(), 16); // ~60 FPS
  }
}

self.postMessage({
  type: 'WORKER_READY',
  data: { message: 'Animation worker ready' }
});