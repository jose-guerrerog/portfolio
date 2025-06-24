// public/workers/model-worker.js

// Worker for 3D model optimizations
let animationData = null;
let isAnimating = false;
let animationSpeed = 0.005;

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
    case 'UPDATE_ANIMATION_SPEED':
      updateAnimationSpeed(data.speed);
      break;
    case 'CALCULATE_ROTATION':
      calculateRotation(data);
      break;
    case 'PROCESS_MESH_DATA':
      processMeshData(data);
      break;
    case 'OPTIMIZE_GEOMETRY':
      optimizeGeometry(data);
      break;
    case 'CALCULATE_LIGHTING':
      calculateLighting(data);
      break;
    case 'COMPUTE_SHADOWS':
      computeShadows(data);
      break;
  }
};

/**
 * Initialize model data in worker
 */
function initializeModel(data) {
  console.log('🚀 Model worker initializing...');
  
  animationData = {
    rotation: { x: 0, y: 0, z: 0 },
    position: data.position || [0, 0, 0],
    scale: data.scale || [1, 1, 1],
    autoRotate: data.autoRotate || true,
    isDragging: false,
    lastUpdate: performance.now()
  };
  
  self.postMessage({
    type: 'MODEL_INITIALIZED',
    data: {
      status: 'Ready',
      animationData
    }
  });
}

/**
 * Start animation loop in worker
 */
function startAnimation(data = {}) {
  if (isAnimating) return;
  
  isAnimating = true;
  animationSpeed = data.speed || 0.005;
  
  console.log('🎬 Starting animation loop in worker');
  animationLoop();
}

/**
 * Stop animation
 */
function stopAnimation() {
  isAnimating = false;
  console.log('⏹️ Animation stopped');
}

/**
 * Update animation speed
 */
function updateAnimationSpeed(speed) {
  animationSpeed = speed;
  self.postMessage({
    type: 'ANIMATION_SPEED_UPDATED',
    data: { speed }
  });
}

/**
 * Main animation loop
 */
function animationLoop() {
  if (!isAnimating || !animationData) return;
  
  const currentTime = performance.now();
  const deltaTime = (currentTime - animationData.lastUpdate) / 1000;
  animationData.lastUpdate = currentTime;
  
  // Calculate smooth rotation
  if (animationData.autoRotate && !animationData.isDragging) {
    animationData.rotation.y += animationSpeed;
    
    // Optional: Add subtle wobble for more dynamic movement
    animationData.rotation.x = Math.sin(currentTime * 0.001) * 0.02;
    animationData.rotation.z = Math.cos(currentTime * 0.0008) * 0.01;
  }
  
  // Send updated rotation data to main thread
  self.postMessage({
    type: 'ANIMATION_FRAME',
    data: {
      rotation: { ...animationData.rotation },
      deltaTime,
      timestamp: currentTime
    }
  });
  
  // Continue animation loop
  setTimeout(() => animationLoop(), 16); // ~60 FPS
}

/**
 * Calculate complex rotation based on user interaction
 */
function calculateRotation(data) {
  const { mouseMovement, sensitivity, currentRotation } = data;
  
  // Heavy rotation calculations
  const rotationMatrix = {
    x: currentRotation.x + (mouseMovement.y * sensitivity * 0.01),
    y: currentRotation.y + (mouseMovement.x * sensitivity * 0.01),
    z: currentRotation.z
  };
  
  // Apply damping/smoothing
  const damping = 0.95;
  rotationMatrix.x *= damping;
  rotationMatrix.y *= damping;
  
  // Update animation data
  if (animationData) {
    animationData.rotation = rotationMatrix;
    animationData.isDragging = data.isDragging;
    animationData.autoRotate = !data.isDragging;
  }
  
  self.postMessage({
    type: 'ROTATION_CALCULATED',
    data: {
      rotation: rotationMatrix,
      isDragging: data.isDragging
    }
  });
}

/**
 * Process mesh data for optimization
 */
function processMeshData(data) {
  console.log('🔧 Processing mesh data...');
  const startTime = performance.now();
  
  const { meshes, optimizationLevel } = data;
  const processedMeshes = [];
  
  // Simulate heavy mesh processing
  meshes.forEach((mesh, index) => {
    // Calculate level of detail (LOD)
    const distance = Math.sqrt(
      Math.pow(mesh.position.x, 2) + 
      Math.pow(mesh.position.y, 2) + 
      Math.pow(mesh.position.z, 2)
    );
    
    // Determine appropriate detail level
    let detailLevel = 'high';
    if (distance > 10) detailLevel = 'medium';
    if (distance > 20) detailLevel = 'low';
    
    // Process based on optimization level
    const processed = {
      id: mesh.id,
      detailLevel,
      shouldRender: distance < 50,
      shadowCasting: distance < 15 && optimizationLevel > 1,
      materialQuality: optimizationLevel > 2 ? 'high' : 'medium'
    };
    
    processedMeshes.push(processed);
  });
  
  const duration = performance.now() - startTime;
  
  self.postMessage({
    type: 'MESH_DATA_PROCESSED',
    data: {
      processedMeshes,
      duration,
      optimizationsApplied: processedMeshes.length
    }
  });
}

/**
 * Optimize geometry for better performance
 */
function optimizeGeometry(data) {
  console.log('⚡ Optimizing geometry...');
  const startTime = performance.now();
  
  const { vertices, faces, targetReduction } = data;
  
  // Simulate geometry optimization (normally would use algorithms like mesh decimation)
  const optimizedVertices = vertices.filter((_, index) => {
    // Keep every nth vertex based on target reduction
    const keepRatio = 1 - targetReduction;
    return Math.random() < keepRatio;
  });
  
  const optimizedFaces = faces.filter((_, index) => {
    const keepRatio = 1 - targetReduction;
    return Math.random() < keepRatio;
  });
  
  const reductionAchieved = {
    vertices: (vertices.length - optimizedVertices.length) / vertices.length,
    faces: (faces.length - optimizedFaces.length) / faces.length
  };
  
  const duration = performance.now() - startTime;
  
  self.postMessage({
    type: 'GEOMETRY_OPTIMIZED',
    data: {
      optimizedVertices,
      optimizedFaces,
      reductionAchieved,
      duration,
      originalCount: { vertices: vertices.length, faces: faces.length },
      optimizedCount: { vertices: optimizedVertices.length, faces: optimizedFaces.length }
    }
  });
}

/**
 * Calculate lighting effects
 */
function calculateLighting(data) {
  console.log('💡 Calculating lighting...');
  const startTime = performance.now();
  
  const { lights, surfaces, cameraPosition } = data;
  const lightingData = [];
  
  // Heavy lighting calculations
  surfaces.forEach(surface => {
    lights.forEach(light => {
      // Calculate distance from light to surface
      const distance = Math.sqrt(
        Math.pow(light.position.x - surface.position.x, 2) +
        Math.pow(light.position.y - surface.position.y, 2) +
        Math.pow(light.position.z - surface.position.z, 2)
      );
      
      // Calculate light intensity based on distance
      const intensity = light.intensity / (1 + distance * distance * 0.01);
      
      // Calculate angle between surface normal and light direction
      const lightDirection = {
        x: light.position.x - surface.position.x,
        y: light.position.y - surface.position.y,
        z: light.position.z - surface.position.z
      };
      
      // Normalize light direction
      const magnitude = Math.sqrt(
        lightDirection.x * lightDirection.x +
        lightDirection.y * lightDirection.y +
        lightDirection.z * lightDirection.z
      );
      
      if (magnitude > 0) {
        lightDirection.x /= magnitude;
        lightDirection.y /= magnitude;
        lightDirection.z /= magnitude;
      }
      
      // Calculate dot product with surface normal
      const dotProduct = 
        surface.normal.x * lightDirection.x +
        surface.normal.y * lightDirection.y +
        surface.normal.z * lightDirection.z;
      
      const finalIntensity = Math.max(0, dotProduct) * intensity;
      
      lightingData.push({
        surfaceId: surface.id,
        lightId: light.id,
        intensity: finalIntensity,
        color: light.color
      });
    });
  });
  
  const duration = performance.now() - startTime;
  
  self.postMessage({
    type: 'LIGHTING_CALCULATED',
    data: {
      lightingData,
      duration,
      calculationsPerformed: lightingData.length
    }
  });
}

/**
 * Compute shadow maps
 */
function computeShadows(data) {
  console.log('🌑 Computing shadows...');
  const startTime = performance.now();
  
  const { objects, lights, shadowMapSize } = data;
  const shadowData = [];
  
  // Heavy shadow calculations
  objects.forEach(obj => {
    lights.forEach(light => {
      if (!light.castShadows) return;
      
      // Ray casting for shadow detection
      const shadowRays = [];
      const rayCount = shadowMapSize || 64;
      
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const ray = {
          origin: { ...obj.position },
          direction: {
            x: Math.cos(angle),
            y: Math.sin(angle),
            z: 0
          }
        };
        
        // Check if ray hits any other object (simplified)
        let isInShadow = false;
        objects.forEach(otherObj => {
          if (otherObj.id !== obj.id) {
            const distance = Math.sqrt(
              Math.pow(ray.origin.x - otherObj.position.x, 2) +
              Math.pow(ray.origin.y - otherObj.position.y, 2) +
              Math.pow(ray.origin.z - otherObj.position.z, 2)
            );
            
            if (distance < otherObj.radius) {
              isInShadow = true;
            }
          }
        });
        
        shadowRays.push({ angle, isInShadow });
      }
      
      const shadowIntensity = shadowRays.filter(ray => ray.isInShadow).length / rayCount;
      
      shadowData.push({
        objectId: obj.id,
        lightId: light.id,
        intensity: shadowIntensity,
        quality: shadowMapSize
      });
    });
  });
  
  const duration = performance.now() - startTime;
  
  self.postMessage({
    type: 'SHADOWS_COMPUTED',
    data: {
      shadowData,
      duration,
      raysCalculated: shadowData.length * (data.shadowMapSize || 64)
    }
  });
}

// Ready signal
self.postMessage({
  type: 'MODEL_WORKER_READY',
  data: { message: 'Model optimization worker ready' }
});