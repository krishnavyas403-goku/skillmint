// components/TestUI.tsx - WEB3 MULTISTEP TEST INTERFACE
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Question {
  id: number;
  q: string;
  type: string;
  maxScore: number;
}

interface TestUIProps {
  questions: Question[];
  onSubmit: (answers: { [key: number]: string }) => void;
  loading?: boolean;
}

export default function TestUI({ questions, onSubmit, loading }: TestUIProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFinish = () => {
    onSubmit(answers);
  };

  const q = questions[step];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
      style={{ maxWidth: "650px", margin: "auto", padding: "28px" }}
    >
      <h2 style={{ marginBottom: "14px" }}>
        Question {step + 1} / {questions.length}
      </h2>

      <motion.div
        key={q.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p style={{ marginBottom: "14px", fontSize: "17px" }}>{q.q}</p>
        <textarea
          rows={4}
          value={answers[q.id] || ""}
          onChange={(e) => handleChange(q.id, e.target.value)}
        />
      </motion.div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        {step > 0 ? (
          <button className="btn" onClick={handlePrev}>
            Back
          </button>
        ) : (
          <div></div>
        )}

        {step < questions.length - 1 ? (
          <button className="btn" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="btn" onClick={handleFinish} disabled={loading}>
            {loading ? "Submitting..." : "Finish"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
