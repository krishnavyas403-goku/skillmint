// components/ErrorBox.tsx - ANIMATED WARNING BOX
import React from "react";
import { motion } from "framer-motion";

interface ErrorBoxProps {
  message: string;
}

export function ErrorBox({ message }: ErrorBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      style={{
        padding: "14px 18px",
        border: "1px solid var(--error)",
        background: "rgba(255,0,0,0.08)",
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
        color: "#ff6b6b",
        marginTop: "14px",
        fontSize: "14px",
        textAlign: "center",
      }}
    >
      ⚠ {message}
    </motion.div>
  );
}
