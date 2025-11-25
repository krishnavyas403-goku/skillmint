// pages/u/[username].tsx

import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PublicProfile() {
  const router = useRouter();
  const { username } = router.query;

  const [profile, setProfile] = useState<any>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultAvatar = "/default-avatar.png";

  useEffect(() => {
    if (!username) return;

    const load = async () => {
      // Load profile by username (PUBLIC)
      const { data: userData } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (!userData) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile(userData);

      // Load user's badges
      const { data: badgeData } = await supabase
        .from("badges")
        .select("*")
        .eq("user_id", userData.id);

      setBadges(badgeData || []);
      setLoading(false);
    };

    load();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl font-bold">Profile Not Found</h1>
        <p className="text-white/60 mt-2">This user does not exist.</p>
      </div>
    );
  }

  const photo = profile.profile_photo || defaultAvatar;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071027] via-[#0e1423] to-black text-white px-6 relative overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-[#7c3aed33] blur-3xl rounded-full"></div>
      <div className="absolute -bottom-40 -right-40 w-[650px] h-[650px] bg-[#06b6d433] blur-3xl rounded-full"></div>

      <div className="relative z-10 pt-24 max-w-3xl mx-auto flex flex-col items-center">

        {/* PROFILE PHOTO */}
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={photo}
          className="w-36 h-36 rounded-full border border-white/20 shadow-2xl object-cover"
        />

        {/* NAME */}
        <h1 className="text-3xl font-bold mt-4">
          {profile.full_name}
        </h1>

        {/* USERNAME */}
        <p className="text-white/60">@{profile.username}</p>

        {/* ABOUT ME */}
        <div className="mt-10 w-full bg-white/10 p-6 border border-white/20 rounded-2xl backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-3">About Me</h2>
          <p className="text-white/80">
            {profile.about_me || "No bio added yet."}
          </p>
        </div>

        {/* DETAILS */}
        <div className="mt-6 w-full bg-white/10 p-6 border border-white/20 rounded-2xl backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-3">Details</h2>

          <p><b>Goal:</b> {profile.goal || "Not set"}</p>
          <p className="mt-1"><b>Skills:</b></p>

          <div className="flex flex-wrap gap-2 mt-2">
            {(profile.skills || []).map((sk: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* BADGES */}
        <div className="mt-8 w-full">
          <h2 className="text-xl font-bold mb-3">Badges</h2>

          {badges.length === 0 ? (
            <div className="text-white/60 bg-white/5 p-4 rounded-xl border border-white/10">
              No badges earned yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((badge: any) => (
                <div
                  key={badge.id}
                  className="bg-white/10 p-4 border border-white/20 rounded-xl backdrop-blur-xl flex items-center gap-4"
                >
                  <img
                    src={badge.image_url}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  <div>
                    <h4 className="text-lg font-semibold">{badge.title}</h4>
                    <p className="text-white/60 text-sm">{badge.skill}</p>

                    {badge.tx_hash && (
                      <p className="text-xs text-white/40 break-all mt-1">
                        Tx: {badge.tx_hash}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
