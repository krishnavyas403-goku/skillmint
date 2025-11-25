// pages/home.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, skills")
        .eq("id", user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name);
        setSkills(profile.skills || []);
      }

      setLoading(false);
    };

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071027] via-[#0f1724] to-black relative overflow-hidden text-white px-6">

      {/* Background glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#7c3aed44] rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[550px] h-[550px] bg-[#06b6d444] rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-28 text-center max-w-3xl mx-auto">

        {/* Welcome */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#67e8f9] to-[#c084fc] bg-clip-text text-transparent"
        >
          Welcome {fullName.split(" ")[0]} 👋
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 mt-3 text-lg"
        >
          Your Web3 Skill Passport is ready.
        </motion.p>

        {/* Glass skills card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-6 shadow-xl"
        >
          <h2 className="text-xl font-bold text-white/90 mb-3">
            Your Selected Skills
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {skills.length === 0 ? (
              <p className="text-white/60">No skills selected.</p>
            ) : (
              skills.map((sk) => (
                <span
                  key={sk}
                  className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm"
                >
                  {sk}
                </span>
              ))
            )}
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 mt-10"
        >
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#00d4ff] font-semibold text-white hover:opacity-90 shadow-lg"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => router.push("/tests")}
            className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-xl"
          >
            Take a Test
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
