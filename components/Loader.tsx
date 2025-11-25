// components/Loader.tsx - NEON WEB3 SPINNER
import React from "react";

export default function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <div
        style={{
          width: "32px",
          height: "32px",
          border: "4px solid rgba(255,255,255,0.15)",
          borderTop: "4px solid transparent",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
          background:
            "conic-gradient(#ff00ff,#00ffff,#ffaa00,#ff00ff)",
          filter: "blur(0.3px)",
        }}
      />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
