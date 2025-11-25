// components/FloatingParticles.tsx
import React from "react";

export default function FloatingParticles() {
  const dots = Array.from({ length: 25 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((_, i) => (
        <div
          key={i}
          className="absolute w-[3px] h-[3px] rounded-full bg-white/40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${4 + Math.random() * 6}s linear infinite`,
            opacity: Math.random() * 0.6 + 0.2,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
