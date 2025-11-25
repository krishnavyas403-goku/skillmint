// pages/auth/login.tsx
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Invalid email or password.");
      return;
    }

    router.push("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#071027] via-[#0f1724] to-black relative overflow-hidden">

      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#7c3aed44] blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full bg-[#06b6d444] blur-3xl animate-pulse animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-[90%] max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo-skillmint.jpg" width={70} height={70} alt="" className="rounded-md" />
          <h1 className="text-3xl font-bold mt-3 bg-gradient-to-r from-[#67e8f9] to-[#c084fc] bg-clip-text text-transparent">
            SkillMint
          </h1>
        </div>

        {errorMsg && <p className="text-red-400 text-center">{errorMsg}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#00d4ff] text-white font-semibold">
            Login
          </button>
        </form>

        <p className="text-center text-white/60 mt-4">
          Don't have an account?{" "}
          <span className="text-[#67e8f9]" onClick={() => router.push("/auth/signup")}>Sign Up</span>
        </p>
      </motion.div>
    </div>
  );
}
