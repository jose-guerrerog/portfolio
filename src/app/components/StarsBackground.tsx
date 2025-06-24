'use client'
import { useEffect, useRef, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  color: string;
}

export default function OptimizedStarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const animationRef = useRef<number>();
  const [stars, setStars] = useState<Star[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState('Initializing...');

  // Immediate canvas setup (no worker dependency)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Quick canvas setup
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Show immediate basic stars while worker loads
    const quickStars: Star[] = [];
    const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000)); // Fewer stars for speed
    
    for (let i = 0; i < count; i++) {
      quickStars.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        color: 'white'
      });
    }
    
    setStars(quickStars);
    setLoadingStage('Basic stars ready');

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize worker with delay to not block initial render
  useEffect(() => {
    // Delay worker loading to prioritize initial page render
    const workerTimer = setTimeout(() => {
      setLoadingStage('Loading worker...');
      
      try {
        const worker = new Worker('/workers/stars-worker.js');
        
        worker.onmessage = (e) => {
          const { type, data } = e.data;
          
          switch(type) {
            case 'WORKER_READY':
              setLoadingStage('Worker ready');
              setIsLoading(false);
              break;
              
            case 'STARS_INITIALIZED':
              setStars(data.stars);
              setLoadingStage('Stars enhanced');
              break;
              
            case 'STARS_UPDATED':
              setStars(data.stars);
              break;
              
            case 'STARS_RESIZED':
              setStars(data.stars);
              break;
          }
        };
        
        worker.onerror = () => {
          setLoadingStage('Worker failed - using fallback');
          setIsLoading(false);
        };
        
        workerRef.current = worker;
        
        // Initialize worker with current canvas size
        const canvas = canvasRef.current;
        if (canvas) {
          worker.postMessage({
            type: 'INIT_STARS',
            data: {
              width: canvas.width,
              height: canvas.height,
              isMobile: window.innerWidth < 768
            }
          });
          
          worker.postMessage({ type: 'START_ANIMATION' });
        }
        
      } catch (error) {
        console.warn('Worker failed to load, using fallback stars');
        setLoadingStage('Fallback mode');
        setIsLoading(false);
      }
    }, 100); // Small delay to let page render first

    return () => {
      clearTimeout(workerTimer);
      if (workerRef.current) {
        workerRef.current.postMessage({ type: 'STOP_ANIMATION' });
        workerRef.current.terminate();
      }
    };
  }, []);

  // Optimized render loop with proper animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;
    const targetFPS = 60; // Smooth animation
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const render = (currentTime: number) => {
      // Throttle to target FPS
      if (currentTime - lastFrameTime < frameInterval) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }
      
      lastFrameTime = currentTime;
      frameCount++;

      // Create animated background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2.2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 1.2
      );
      gradient.addColorStop(0.4, 'rgba(10, 40, 90, 0.7)');
      gradient.addColorStop(0.7, 'rgba(0, 20, 40, 0.85)');
      gradient.addColorStop(1, 'rgba(0, 5, 20, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate stars individually with twinkling
      const time = currentTime * 0.001; // Convert to seconds
      
      stars.forEach((star) => {
        // Create twinkling effect
        const twinkle = Math.sin(time * 2 + star.id * 0.5) * 0.3 + 0.7;
        const radius = star.radius * (0.8 + twinkle * 0.4);
        const opacity = star.opacity * twinkle;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, 2 * Math.PI);
        
        if (star.color === 'white') {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        } else {
          // Handle colored stars
          const color = star.color.replace('1)', `${opacity})`);
          ctx.fillStyle = color;
        }
        
        ctx.fill();
        
        // Add subtle glow for brighter stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, radius * 2, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
          ctx.fill();
        }
      });

      // Show loading indicator
      if (isLoading) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '14px monospace';
        ctx.fillText(loadingStage, 20, canvas.height - 30);
      }

      animationRef.current = requestAnimationFrame(render);
    };

    // Start animation immediately
    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [stars, isLoading, loadingStage]);

  return (
    <>
      {/* Optimized Stars Canvas */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Minimal Loading Indicator */}
      {isLoading && (
        <div className="fixed top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded text-sm font-mono">
          {loadingStage}
        </div>
      )}
    </>
  );
}