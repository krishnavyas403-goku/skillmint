import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Welcome() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.replace("/auth/login");

      const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single();
      if (profile) setName(profile.full_name.split(" ")[0]);
    };
    load();

    setTimeout(() => router.replace("/home"), 2300);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071027] via-[#0f1724] to-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#7c3aed44] blur-3xl rounded-full animate-pulse"/>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#06b6d444] blur-3xl rounded-full animate-pulse animation-delay-2000"/>

      <motion.h1
        initial={{ opacity: 0, scale:0.9 }}
        animate={{ opacity:1, scale:1 }}
        className="z-10 text-5xl font-bold bg-gradient-to-r from-[#6ee7ff] to-[#c084fc] text-transparent bg-clip-text"
      >
        Welcome {name} 👋
      </motion.h1>
    </div>
  );
}
