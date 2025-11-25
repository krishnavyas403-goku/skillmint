// components/Navbar.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";



export default function Navbar() {
  const router = useRouter();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        width: "100%",
        padding: "16px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* BACK BUTTON */}
     

      {/* LOGO / TITLE */}
      <motion.div whileHover={{ scale: 1.05 }} style={{ flexGrow: 1 }}>
        <Link
          href="/"
          style={{
            fontSize: "22px",
            fontWeight: 600,
            background:
              "linear-gradient(90deg, #ff00ff, #00ffff, #ffaa00)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          SkillMint
        </Link>
      </motion.div>

      {/* NAV LINKS */}
      {/* NAV LINKS */}
<div style={{ display: "flex", gap: "22px" }}>
  <NavItem text="Home" href="/" />
  <NavItem text="Profile" href="/profile" />
</div>


    </motion.nav>
  );
}

function NavItem({ text, href }: { text: string; href: string }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Link
        href={href}
        style={{
          fontSize: "16px",
          color: "var(--text-light)",
          textDecoration: "none",
          position: "relative",
          paddingBottom: "4px",
        }}
      >
        {text}

        {/* Neon underline */}
        <span
          style={{
            content: "",
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "0%",
            height: "2px",
            background:
              "linear-gradient(90deg, #ff00ff, #00ffff, #ffaa00)",
            transition: "0.3s",
          }}
          className="nav-underline"
        ></span>

        <style>
          {`
          a:hover .nav-underline {
            width: 100%;
          }
          `}
        </style>
      </Link>
    </motion.div>
  );
}
