// pages/tests/[skill].tsx
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";

const sampleQuestions: any = {
  React: [
    { q: "What is JSX?", a: ["JS Syntax", "React Syntax", "XML File", "None"], c: 1 },
    { q: "useState returns?", a: ["value + setter", "component", "function", "null"], c: 0 },
  ],

  SQL: [
    { q: "Which is used to filter rows?", a: ["WHERE", "SELECT", "ORDER BY", "GROUP"], c: 0 },
    { q: "Primary Key is?", a: ["Unique + Not null", "Duplicate", "Null", "None"], c: 0 },
  ],

  // Add more domains...
};

export default function SkillTest() {
  const router = useRouter();
  const skill = router.query.skill as string;

  const questions = sampleQuestions[skill] || [];
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));

  const submitTest = () => {
    let score = 0;
    answers.forEach((ans, i) => {
      if (ans === questions[i].c) score++;
    });

    router.push(`/tests/result?skill=${skill}&score=${score}&total=${questions.length}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071027] via-[#0f1724] to-black text-white px-6 relative">

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white"
      >
        ← Back
      </button>

      <div className="pt-24 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{skill} Test</h1>

        {questions.map((q: any, i: number) => (
          <div key={i} className="mb-6 p-4 bg-white/10 border border-white/20 rounded-xl">
            <p className="font-semibold mb-3">{i + 1}. {q.q}</p>

            {q.a.map((option: string, index: number) => (
              <div
                key={index}
                className={`p-3 rounded-lg cursor-pointer mb-2 border ${answers[i] === index ? "bg-[#67e8f933] border-[#67e8f9]" : "bg-white/5 border-white/20"}`}
                onClick={() => {
                  const newAns = [...answers];
                  newAns[i] = index;
                  setAnswers(newAns);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        ))}

        <button
          onClick={submitTest}
          className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#00d4ff] font-bold"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}
