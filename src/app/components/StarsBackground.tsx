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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const quickStars: Star[] = [];
    const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
    
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

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const workerTimer = setTimeout(() => {
      
      try {
        const worker = new Worker('/workers/stars-worker.js');
        
        worker.onmessage = (e) => {
          const { type, data } = e.data;
          
          switch(type) {
            case 'WORKER_READY':
              setIsLoading(false);
              break;
              
            case 'STARS_INITIALIZED':
              setStars(data.stars);
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
          setIsLoading(false);
        };
        
        workerRef.current = worker;
        
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
        setIsLoading(false);
      }
    }, 100);

    return () => {
      clearTimeout(workerTimer);
      if (workerRef.current) {
        workerRef.current.postMessage({ type: 'STOP_ANIMATION' });
        workerRef.current.terminate();
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const render = (currentTime: number) => {
      if (currentTime - lastFrameTime < frameInterval) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }
      
      lastFrameTime = currentTime;
      frameCount++;

      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2.2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 1.2
      );
      gradient.addColorStop(0.4, 'rgba(10, 40, 90, 0.7)');
      gradient.addColorStop(0.7, 'rgba(0, 20, 40, 0.85)');
      gradient.addColorStop(1, 'rgba(0, 5, 20, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = currentTime * 0.001;
      
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
          const color = star.color.replace('1)', `${opacity})`);
          ctx.fillStyle = color;
        }
        
        ctx.fill();
        
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, radius * 2, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
          ctx.fill();
        }
      });

      if (isLoading) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '14px monospace';
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [stars, isLoading]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}