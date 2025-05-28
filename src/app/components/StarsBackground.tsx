'use client';

import { useEffect, useState } from 'react';

export default function StarsBackground() {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 100 : 300;
  
    const generateStars = () => {
      const generatedStars = Array.from({ length: count }, (_, i) => {
        const size = Math.random() * 2 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 3;
  
        return (
          <div
            key={i}
            className="star"
            style={{
              top: `${y}vh`,
              left: `${x}vw`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      });
      setStars(generatedStars);
    };
  
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(generateStars);
    } else {
      setTimeout(generateStars, 500);
    }
  }, []);

  return (
    <div className="stars-background">
      {stars}
    </div>
  );
}