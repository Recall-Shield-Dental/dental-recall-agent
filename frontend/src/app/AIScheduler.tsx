"use client";
import { useState } from "react";

// Import the type for suggestion
import { useAISchedule, AISuggestion } from "./useAISchedule";

export default function AIScheduler() {
  const [name, setName] = useState("");
  const { suggestion, loading, error, requestAISuggestion } = useAISchedule();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) requestAISuggestion(name);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-700">AI Appointment Scheduler</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <input
          className="border rounded px-3 py-2"
          placeholder="Patient Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Requesting..." : "Get AI Suggestion"}
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {suggestion && (
        <div className="bg-blue-50 p-4 rounded text-blue-900">
          <div className="font-semibold mb-1">AI Suggestion:</div>
          <div>{(suggestion as any).message}</div>
          <div className="text-sm mt-2 text-blue-700">
            Suggested: {(suggestion as any).suggested_date} at {(suggestion as any).suggested_time}
          </div>
        </div>
      )}
    </div>
  );
}
