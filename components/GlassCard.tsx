// components/GlassCard.tsx
import React from "react";

export default function GlassCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={
        "bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 transition " +
        (onClick ? "cursor-pointer hover:bg-white/20 " : "") +
        className
      }
    >
      {children}
    </div>
  );
}
