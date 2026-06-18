"use client";

import { useState } from "react";


export default function Home() {
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [examDate, setExamDate] = useState("");
  const [plan, setPlan] = useState("");

  const generatePlan = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        topics,
        examDate,
      }),
    });

   const data = await res.json();

setPlan(data.plan);


  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-black text-center mb-6">
  PrepWise AI
</h1>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <textarea
          placeholder="Topics"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          onClick={generatePlan}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Generate Study Plan
        </button>

        {plan && (
          <div className="mt-4 border p-3 rounded">
            <h2 className="font-bold mb-2">Generated Plan</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-800">
  {plan}
</pre>
          </div>
        )}
      </div>
    </main>
  );
}