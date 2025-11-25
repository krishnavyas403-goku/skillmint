// pages/tests/index.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";

export default function TestSelect() {
  const router = useRouter();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.replace("/auth/login");

      const { data } = await supabase
        .from("profiles")
        .select("skills")
        .eq("id", user.id)
        .single();

      setSkills(data?.skills || []);
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071027] via-[#0f1724] to-black relative text-white px-6">

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white backdrop-blur-xl"
      >
        ← Back
      </button>

      <div className="pt-28 max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold bg-gradient-to-r from-[#67e8f9] to-[#c084fc] bg-clip-text text-transparent"
        >
          Choose a Skill Test
        </motion.h1>

        <p className="text-white/60 mt-2">Select a skill to begin testing.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {skills.map((skill: string) => (
            <motion.div
              key={skill}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl cursor-pointer shadow-lg hover:bg-white/20"
              onClick={() => router.push(`/tests/${encodeURIComponent(skill)}`)}
            >
              <h3 className="text-xl font-bold">{skill}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
