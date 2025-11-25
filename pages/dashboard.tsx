// pages/dashboard.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/auth/login");

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, skills")
        .eq("id", user.id)
        .single();

      setFullName(profile.full_name);
      setSkills(profile.skills || []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071027] via-[#0e1423] to-black text-white px-6 relative">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white backdrop-blur-xl"
      >
        ← Back
      </button>

      {/* Glow BG */}
      <div className="absolute -top-48 -left-40 w-[650px] h-[650px] bg-[#7c3aed44] blur-3xl rounded-full animate-pulse" />
      <div className="absolute -bottom-48 -right-40 w-[650px] h-[650px] bg-[#06b6d444] blur-3xl rounded-full animate-pulse animation-delay-2000" />

      <div className="relative z-10 pt-28 max-w-5xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#67e8f9] to-[#c084fc] text-transparent bg-clip-text">
            Hello {fullName.split(" ")[0]} 👋
          </h1>
          <p className="text-white/60 mt-1">Here is your SkillMint Dashboard</p>
        </motion.div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-xl cursor-pointer"
            onClick={() => router.push("/tests")}
          >
            <h3 className="text-xl font-semibold">🧠 Take a Test</h3>
            <p className="text-white/70 mt-2 text-sm">
              Evaluate your skill and earn badges.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-xl cursor-pointer"
            onClick={() => router.push("/badges")}
          >
            <h3 className="text-xl font-semibold">🏅 Your Badges</h3>
            <p className="text-white/70 mt-2 text-sm">
              View your blockchain achievements.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-xl cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <h3 className="text-xl font-semibold">👤 Profile</h3>
            <p className="text-white/70 mt-2 text-sm">
              Manage your personal details.
            </p>
          </motion.div>
        </div>

        {/* SKILLS */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-4">Your Skills</h2>
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-xl border border-white/20">
            <div className="flex flex-wrap gap-3">
              {skills.map((sk) => (
                <span
                  key={sk}
                  className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-sm"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FUTURE SECTION: RECENT ACTIVITY */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 text-white/60">
            Coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}
