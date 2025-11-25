// components/BackButton.tsx
import React from "react";
import { useRouter } from "next/router";

export default function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.04)",
        color: "var(--text-light)",
        cursor: "pointer",
        fontSize: "15px",
        backdropFilter: "blur(8px)",
        transition: "0.3s",
      }}
    >
      ← {label}
    </button>
  );
}
