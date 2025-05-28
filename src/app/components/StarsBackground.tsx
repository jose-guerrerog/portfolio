'use client';
import { useEffect, useRef } from 'react';

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 100 : 300;
    const stars: { x: number; y: number; radius: number; twinkle: number }[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.3,
        twinkle: Math.random() * 100,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;

      // blue glow radial gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.2
      );
      gradient.addColorStop(0, 'rgba(0, 90, 230, 0.8)');
      gradient.addColorStop(0.4, 'rgba(10, 40, 90, 0.7)');
      gradient.addColorStop(0.7, 'rgba(0, 20, 40, 0.85)');
      gradient.addColorStop(1, 'rgba(0, 5, 20, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star, i) => {
        const twinkle = Math.abs(Math.sin((Date.now() + star.twinkle * 10) / 1000));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="stars-background-canvas" />;
}