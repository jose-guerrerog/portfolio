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

function startAnimation(data = {}) {
  if (isAnimating) return;
  
  isAnimating = true;
  animationSpeed = data.speed || 0.005;
  
  console.log('🎬 Starting animation loop in worker');
  animationLoop();
}

function stopAnimation() {
  isAnimating = false;
  console.log('⏹️ Animation stopped');
}

function updateAnimationSpeed(speed) {
  animationSpeed = speed;
  self.postMessage({
    type: 'ANIMATION_SPEED_UPDATED',
    data: { speed }
  });
}

function animationLoop() {
  if (!isAnimating || !animationData) return;
  
  const currentTime = performance.now();
  const deltaTime = (currentTime - animationData.lastUpdate) / 1000;
  animationData.lastUpdate = currentTime;
  
  if (animationData.autoRotate && !animationData.isDragging) {
    animationData.rotation.y += animationSpeed;
    
    animationData.rotation.x = Math.sin(currentTime * 0.001) * 0.02;
    animationData.rotation.z = Math.cos(currentTime * 0.0008) * 0.01;
  }
  
  self.postMessage({
    type: 'ANIMATION_FRAME',
    data: {
      rotation: { ...animationData.rotation },
      deltaTime,
      timestamp: currentTime
    }
  });
  
  setTimeout(() => animationLoop(), 16); // ~60 FPS
}

function calculateRotation(data) {
  const { mouseMovement, sensitivity, currentRotation } = data;
  
  const rotationMatrix = {
    x: currentRotation.x + (mouseMovement.y * sensitivity * 0.01),
    y: currentRotation.y + (mouseMovement.x * sensitivity * 0.01),
    z: currentRotation.z
  };
  
  const damping = 0.95;
  rotationMatrix.x *= damping;
  rotationMatrix.y *= damping;
  
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


function processMeshData(data) {
  const startTime = performance.now();
  
  const { meshes, optimizationLevel } = data;
  const processedMeshes = [];
  
  meshes.forEach((mesh, index) => {
    const distance = Math.sqrt(
      Math.pow(mesh.position.x, 2) + 
      Math.pow(mesh.position.y, 2) + 
      Math.pow(mesh.position.z, 2)
    );
    
    let detailLevel = 'high';
    if (distance > 10) detailLevel = 'medium';
    if (distance > 20) detailLevel = 'low';
    
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


function optimizeGeometry(data) {
  console.log('⚡ Optimizing geometry...');
  const startTime = performance.now();
  
  const { vertices, faces, targetReduction } = data;
  
  const optimizedVertices = vertices.filter((_, index) => {
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

function calculateLighting(data) {
  const startTime = performance.now();
  
  const { lights, surfaces, cameraPosition } = data;
  const lightingData = [];
  
  surfaces.forEach(surface => {
    lights.forEach(light => {
      const distance = Math.sqrt(
        Math.pow(light.position.x - surface.position.x, 2) +
        Math.pow(light.position.y - surface.position.y, 2) +
        Math.pow(light.position.z - surface.position.z, 2)
      );
      
      const intensity = light.intensity / (1 + distance * distance * 0.01);
      
      const lightDirection = {
        x: light.position.x - surface.position.x,
        y: light.position.y - surface.position.y,
        z: light.position.z - surface.position.z
      };
      
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

function computeShadows(data) {
  const startTime = performance.now();
  
  const { objects, lights, shadowMapSize } = data;
  const shadowData = [];
  
  objects.forEach(obj => {
    lights.forEach(light => {
      if (!light.castShadows) return;
      
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

self.postMessage({
  type: 'MODEL_WORKER_READY',
  data: { message: 'Model optimization worker ready' }
});