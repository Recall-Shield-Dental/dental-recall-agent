"use client";
import { useState } from "react";

export interface DemoRequestFormProps {
  onSuccess: () => void;
}

export default function DemoRequestModal({ onSuccess }: DemoRequestFormProps) {
  const [showCalendly, setShowCalendly] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, org }),
      });
      if (!res.ok) throw new Error("Failed to submit request");
      setSubmitted(true);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (showCalendly) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full relative">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
            onClick={() => setShowCalendly(false)}
            aria-label="Close"
          >
            ×
          </button>
          <iframe
            src="https://calendly.com/YOUR-CALENDLY-LINK/demo"
            width="100%"
            height="600"
            frameBorder="0"
            title="Book a Demo"
            className="rounded"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onSuccess}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Request a Demo</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold text-center py-8">
            Thank you! We'll be in touch soon.
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
              <input
                className="border rounded px-3 py-2"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Organization"
                value={org}
                onChange={e => setOrg(e.target.value)}
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
            <div className="text-center text-gray-500 mb-2">or</div>
            <button
              className="w-full bg-gray-100 hover:bg-blue-100 text-blue-700 font-semibold rounded px-4 py-2"
              onClick={() => setShowCalendly(true)}
            >
              Book Instantly via Calendly
            </button>
          </>
        )}
      </div>
    </div>
  );
}
