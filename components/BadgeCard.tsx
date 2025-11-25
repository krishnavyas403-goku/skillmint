// components/BadgeCard.tsx - MULTICOLOR GLOW ANIMATED BADGE
import React from "react";
import { motion } from "framer-motion";

interface BadgeCardProps {
  title: string;
  image: string;
  score: number;
}

export default function BadgeCard({ title, image, score }: BadgeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        padding: "20px",
        textAlign: "center",
        border: "1px solid rgba(255,255,255,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        style={{
          position: "absolute",
          top: "-40%",
          left: "-40%",
          width: "180%",
          height: "180%",
          background:
            "conic-gradient(#ff00ff, #00ffff, #ff9900, #ff00ff)",
          filter: "blur(60px)",
          opacity: 0.18,
          zIndex: 0,
        }}
      />

      <img
        src={image}
        alt={title}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "12px",
          position: "relative",
          zIndex: 2,
        }}
      />

      <h3 style={{ marginTop: "16px", fontSize: "20px", zIndex: 2 }}>
        {title}
      </h3>
      <p style={{ marginTop: "8px", color: "var(--text-light)" }}>
        Score: {score}%
      </p>
    </motion.div>
  );
}
