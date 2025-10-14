"use client";
import { useState } from "react";

export interface AISuggestion {
  suggested_date: string;
  suggested_time: string;
  message: string;
}

export function useAISchedule() {
  const [suggestion, setSuggestion] = useState<AISuggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestAISuggestion = async (patient_name: string) => {
    setLoading(true);
    setError("");
    setSuggestion(null);
    try {
      const res = await fetch("/api/ai/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_name }),
      });
      if (!res.ok) throw new Error("Failed to get AI suggestion");
      const data = await res.json();
      setSuggestion(data.ai_suggestion);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { suggestion, loading, error, requestAISuggestion };
}
