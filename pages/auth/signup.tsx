// pages/auth/signup.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();

  const skillOptions = [
    "SQL", "React", "Blockchain", "AI / Machine Learning",
    "Data Science", "Cybersecurity", "UI/UX", "Cloud",
    "DevOps", "DSA", "Mobile App Development", "AR / VR"
  ];

  const goalOptions = [
    "Get a Job", "Upskill Myself", "Crack Internship",
    "Build Strong Profile", "Switch Career"
  ];

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");

  const toggleSkill = (sk: string) => {
    setSkills(prev =>
      prev.includes(sk) ? prev.filter(s => s !== sk) : [...prev, sk]
    );
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!fullName || !username || !email || !mobile || !password || !goal || skills.length === 0) {
      setError("All fields are required.");
      return;
    }

    if (username.includes(" ")) {
      setError("Username cannot contain spaces.");
      return;
    }

    const { data: exists } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username);

    if (exists?.length > 0) {
      setError("Username already taken.");
      return;
    }

    const { data: auth, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    await supabase.from("profiles").insert([
      {
        id: auth.user?.id,
        full_name: fullName,
        username,
        email,
        mobile,
        skills,
        goal,
      },
    ]);

    router.push("/welcome");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#071027] via-[#0f1724] to-black relative overflow-hidden px-6">

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 text-white/70 hover:text-white bg-white/10 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-xl transition"
      >
        ← Back
      </button>

      {/* Glowing Background */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#7c3aed44] blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#06b6d444] blur-3xl rounded-full animate-pulse animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
      >
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo-skillmint.jpg" width={70} height={70} alt="Logo" className="rounded-lg" />
          <h1 className="text-3xl font-bold mt-3 bg-gradient-to-r from-[#67e8f9] to-[#c084fc] text-transparent bg-clip-text">
            Create Account
          </h1>
        </div>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">

          <input
            className="input-field"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="input-field"
            placeholder="Unique Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input-field"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-white/70">Select Skills:</p>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map(sk => (
              <span
                key={sk}
                onClick={() => toggleSkill(sk)}
                className={`px-4 py-2 rounded-lg border text-sm cursor-pointer ${
                  skills.includes(sk)
                    ? "bg-[#67e8f933] border-[#67e8f9] text-[#67e8f9]"
                    : "bg-white/5 border-white/20 text-white/70"
                }`}
              >
                {sk}
              </span>
            ))}
          </div>

          <select
            className="input-field"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="">Select Goal</option>
            {goalOptions.map(g => (
              <option key={g} className="bg-black" value={g}>{g}</option>
            ))}
          </select>

          <button className="submit-btn">Sign Up</button>
        </form>
      </motion.div>

      <style jsx>{`
        .input-field {
          padding: 12px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          color: white;
        }
        .submit-btn {
          margin-top: 14px;
          background: linear-gradient(90deg, #6366f1, #00d4ff);
          padding: 12px;
          border-radius: 10px;
          color: white;
          font-weight: bold;
        }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
