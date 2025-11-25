import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.replace("/auth/login"), 1200);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071027] via-[#0f1724] to-black flex items-center justify-center relative overflow-hidden">

      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#7c3aed44] blur-3xl rounded-full animate-pulse"/>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#06b6d444] blur-3xl rounded-full animate-pulse animation-delay-2000"/>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 flex flex-col items-center"
      >
        <div className="bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20">
          <Image src="/logo-skillmint.jpg" width={70} height={70} alt="logo" className="rounded-lg" />
        </div>

        <h1 className="text-4xl mt-4 font-bold bg-gradient-to-r from-[#6ee7ff] to-[#c084fc] text-transparent bg-clip-text">
          SkillMint
        </h1>
        <p className="text-white/60 mt-2">Web3 Skill Passport</p>
      </motion.div>
    </div>
  );
}
