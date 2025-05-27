'use client';

import { useEffect, useState } from 'react';

export default function StarsBackground() {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const count = 300;
    const generatedStars = Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 2 + 0.5; // Size: 0.5px to 2.5px
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
  }, []);

  return (
    <div className="stars-background">
      {stars}
    </div>
  );
}