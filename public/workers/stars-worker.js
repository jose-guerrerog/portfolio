let stars = [];
let isAnimating = false;
let animationTimeout = null;

self.onmessage = function(e) {
  const { type, data } = e.data;
  
  switch(type) {
    case 'INIT_STARS':
      initStars(data);
      break;
    case 'RESIZE_STARS':
      resizeStars(data);
      break;
    case 'START_ANIMATION':
      startAnimation();
      break;
    case 'STOP_ANIMATION':
      stopAnimation();
      break;
  }
};

function initStars({ width, height, isMobile }) {
  const starCount = isMobile ? 200 : 2000;
  stars = [];
  
  for (let i = 0; i < starCount; i++) {
    const baseRadius = Math.random() * 1.5 + 0.3;
    const brightness = Math.random() * 0.6 + 0.4;
    
    stars.push({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      radius: baseRadius,
      baseRadius: baseRadius,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      brightness: brightness,
      opacity: brightness,
      color: Math.random() < 0.1 ? getRandomStarColor() : 'white',
      twinkleIntensity: Math.random() * 0.5 + 0.5
    });
  }
  
  self.postMessage({
    type: 'STARS_INITIALIZED',
    data: { stars: cloneStars(stars) }
  });
}

function updateStars() {
  if (!stars.length) return;
  
  const time = performance.now() * 0.001;
  
  stars.forEach(star => {
    const twinklePhase = time * star.twinkleSpeed + star.twinkleOffset;
    const twinkleIntensity = (Math.sin(twinklePhase) + 1) * 0.5;
    
    const minOpacity = star.brightness * 0.3;
    const maxOpacity = star.brightness;
    star.opacity = minOpacity + (twinkleIntensity * star.twinkleIntensity * (maxOpacity - minOpacity));
    star.radius = star.baseRadius * (0.8 + twinkleIntensity * 0.4);
  });
  
  self.postMessage({
    type: 'STARS_UPDATED',
    data: { stars: cloneStars(stars) }
  });
}

function resizeStars({ width, height, isMobile }) {
  const newStarCount = isMobile ? 200 : 2000;
  const currentCount = stars.length;
  
  if (newStarCount > currentCount) {
    for (let i = currentCount; i < newStarCount; i++) {
      const baseRadius = Math.random() * 1.5 + 0.3;
      const brightness = Math.random() * 0.6 + 0.4;
      
      stars.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        radius: baseRadius,
        baseRadius: baseRadius,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        brightness: brightness,
        opacity: brightness,
        color: Math.random() < 0.1 ? getRandomStarColor() : 'white',
        twinkleIntensity: Math.random() * 0.5 + 0.5
      });
    }
  } else if (newStarCount < currentCount) {
    stars = stars.slice(0, newStarCount);
  }
  
  stars.forEach(star => {
    if (star.x > width) star.x = Math.random() * width;
    if (star.y > height) star.y = Math.random() * height;
  });
  
  self.postMessage({
    type: 'STARS_RESIZED',
    data: { stars: cloneStars(stars) }
  });
}

function startAnimation() {
  if (isAnimating) return;
  
  isAnimating = true;
  
  const animate = () => {
    if (!isAnimating) return;
    
    updateStars();
    animationTimeout = setTimeout(animate, 1000 / 30); // 30 FPS
  };
  
  animate();
}

function stopAnimation() {
  isAnimating = false;
  if (animationTimeout) {
    clearTimeout(animationTimeout);
    animationTimeout = null;
  }
}

function getRandomStarColor() {
  const colors = [
    'rgba(255, 255, 255, 1)',     // White
    'rgba(135, 206, 235, 1)',     // Light blue
    'rgba(255, 255, 224, 1)',     // Light yellow
    'rgba(255, 182, 193, 1)',     // Light pink
    'rgba(221, 160, 221, 1)'      // Plum
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}

function cloneStars(starsArray) {
  return starsArray.map(star => ({
    id: star.id,
    x: star.x,
    y: star.y,
    radius: star.radius,
    opacity: star.opacity,
    color: star.color
  }));
}

self.onerror = function(error) {
  self.postMessage({
    type: 'WORKER_ERROR',
    data: { message: error.message }
  });
};

self.postMessage({
  type: 'WORKER_READY',
  data: { message: 'Stars worker ready' }
});