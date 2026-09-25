import React from 'react';
import { useCart } from '../context/useCart';

// Renamed internally to AmbientParticles — soft warm glow accents, not explicitly festive
export default function DiyaParticles() {
  const { diyaGlowActive } = useCart();

  if (!diyaGlowActive) return null;

  const particles = [
    { left: '5%',  top: '15%', size: 5,  delay: '0s',   duration: '7s'   },
    { left: '12%', top: '45%', size: 3,  delay: '2s',   duration: '9s'   },
    { left: '22%', top: '75%', size: 4,  delay: '1s',   duration: '8s'   },
    { left: '85%', top: '20%', size: 5,  delay: '3s',   duration: '7.5s' },
    { left: '92%', top: '60%', size: 3,  delay: '0.5s', duration: '10s'  },
    { left: '78%', top: '85%', size: 4,  delay: '2.5s', duration: '8.5s' },
    { left: '48%', top: '8%',  size: 4,  delay: '1.8s', duration: '9.5s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            background: 'radial-gradient(circle, #D4AF37 0%, #C5A059 60%, transparent 100%)',
            opacity: 0.55,
            filter: 'blur(1px)',
            boxShadow: '0 0 8px rgba(197,160,89,0.8), 0 0 18px rgba(212,175,55,0.4)',
          }}
        />
      ))}
    </div>
  );
}
