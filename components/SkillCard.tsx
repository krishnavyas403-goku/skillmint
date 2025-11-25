// components/SkillCard.tsx - WEB3 NEON SKILL TILE
import React from "react";
import { motion } from "framer-motion";

interface SkillCardProps {
  skill: string;
  score: number;
  onClick?: () => void;
}

export default function SkillCard({ skill, score, onClick }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        background: "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(12px)",
        borderRadius: "14px",
        padding: "22px",
        border: "1px solid rgba(255,255,255,0.1)",
        position: "relative",
        overflow: "hidden",
        minWidth: "210px",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "conic-gradient(#ff00ff, #00ffff, #ffaa00, #ff00ff)",
          filter: "blur(70px)",
          opacity: 0.12,
          zIndex: 0,
        }}
      />

      <h2
        style={{
          fontSize: "20px",
          fontWeight: 600,
          position: "relative",
          zIndex: 2,
        }}
      >
        {skill}
      </h2>

      <p
        style={{
          marginTop: "10px",
          color: "var(--text-light)",
          fontSize: "15px",
          position: "relative",
          zIndex: 2,
        }}
      >
        Score: <span style={{ color: "var(--accent)" }}>{score}%</span>
      </p>
    </motion.div>
  );
}
