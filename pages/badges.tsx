// pages/badges.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function BadgesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [badges, setBadges] = useState<any[]>([]);

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
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (profile) setFullName(profile.full_name);

      // Load earned badges
      const { data: badgeData } = await supabase
        .from("badges")
        .select("*")
        .eq("user_id", user.id);

      setBadges(badgeData || []);
      setLoading(false);
    };

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading Badges...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071027] via-[#0f1724] to-black relative overflow-hidden text-white px-6">

      {/* Neon glows */}
      <div className="absolute -top-36 -left-40 w-[600px] h-[600px] rounded-full bg-[#7c3aed44] blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#06b6d444] blur-3xl animate-pulse animation-delay-2000"></div>

      <div className="relative z-10 pt-24 max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-[#67e8f9] to-[#c084fc] bg-clip-text text-transparent"
        >
          Your Badges 🏅
        </motion.h1>

        <p className="text-white/60 mt-2">
          Hello {fullName.split(" ")[0]}, here are your verified blockchain badges.
        </p>

        {/* Badge List Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {/* If no badges */}
          {badges.length === 0 && (
            <div className="col-span-full text-center text-white/60 bg-white/10 backdrop-blur-xl border border-white/10 p-12 rounded-2xl">
              <p>No badges earned yet.</p>
              <p className="text-sm mt-2">Take tests to start earning badges!</p>
            </div>
          )}

          {/* Badge Items */}
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center"
            >
              <img
                src={badge.image_url}
                alt="badge"
                className="w-20 h-20 rounded-xl mb-3"
              />
              <h3 className="text-lg font-semibold">{badge.title}</h3>
              <p className="text-white/60 text-sm mt-1">{badge.skill}</p>

              {/* Blockchain hash */}
              {badge.tx_hash && (
                <p className="text-xs text-white/40 mt-3 break-all">
                  Tx: {badge.tx_hash}
                </p>
              )}
            </div>
          ))}
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
