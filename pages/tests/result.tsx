// pages/tests/result.tsx
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function ResultPage() {
  const router = useRouter();
  const { skill, score, total } = router.query;

  const passed = Number(score) >= Number(total) * 0.6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071027] via-[#0f1724] to-black text-white px-6 flex flex-col items-center justify-center">

      {/* Back */}
      <button
        onClick={() => router.push("/tests")}
        className="absolute top-6 left-6 bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white backdrop-blur-xl"
      >
        ← Back
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 p-10 rounded-2xl border border-white/20 backdrop-blur-xl max-w-lg text-center"
      >
        <h1 className="text-4xl font-bold mb-4">{skill} Test Result</h1>

        <p className="text-2xl mb-4">
          Score: <span className="font-bold">{score}/{total}</span>
        </p>

        {passed ? (
          <p className="text-green-400 text-xl mb-4">You Passed! 🎉</p>
        ) : (
          <p className="text-red-400 text-xl mb-4">You Failed ❌</p>
        )}

        <button
          onClick={() => router.push("/badges")}
          className="px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#00d4ff] rounded-xl text-white font-bold mt-4"
        >
          View Badges
        </button>
      </motion.div>
    </div>
  );
}
