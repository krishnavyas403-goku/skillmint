// components/BackgroundRings.tsx
import React from "react";

export default function BackgroundRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Big neon blobs */}
      <div className="absolute -left-40 -top-40 w-[650px] h-[650px] rounded-full 
        bg-gradient-to-r from-[#7c3aed33] to-[#06b6d433] blur-3xl opacity-40 animate-blob" />

      <div className="absolute -right-40 -bottom-40 w-[550px] h-[550px] rounded-full 
        bg-gradient-to-r from-[#06b6d433] to-[#7c3aed33] blur-3xl opacity-40 animate-blob animation-delay-2000" />

      {/* Soft radial overlay */}
      <div className="absolute inset-0">
        <svg 
          className="w-full h-full" 
          preserveAspectRatio="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="skillring" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#0ea5e933" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#7c3aed33" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#00000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#skillring)" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translateY(0) scale(1); }
          33% { transform: translateY(-12px) scale(1.05); }
          66% { transform: translateY(6px) scale(0.98); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-blob { animation: blob 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
