"use client";

import { useState } from "react";
import { usePatients } from "./usePatients";
// Import Patient type for explicit typing
import type { Patient } from "./usePatients";

export default function PatientsList() {
  const { patients, loading, error, addPatient, user, roles, isAuthenticated } = usePatients();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Only allow add if user has 'admin' or 'staff' role
  const canAdd = isAuthenticated && (roles.includes("admin") || roles.includes("staff"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addPatient({ Name: name, Phone: phone });
      setName("");
      setPhone("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Patients</h2>
      {/* User Info */}
      {isAuthenticated && user && (
        <div className="mb-4 p-2 bg-blue-50 rounded flex flex-col gap-1">
          <span className="text-blue-700 font-semibold">Logged in as: {user.email || user.name}</span>
          {roles.length > 0 && (
            <span className="text-xs text-blue-600">Roles: {roles.join(", ")}</span>
          )}
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mb-6">
        {patients.map((p: Patient) => (
          <li key={p.id} className="border-b py-2">
            <span className="font-semibold">{p.fields?.Name}</span> <span className="text-gray-500">{p.fields?.Phone}</span>
          </li>
        ))}
      </ul>
      {canAdd ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="border rounded px-3 py-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? "Adding..." : "Add Patient"}
          </button>
        </form>
      ) : (
        <div className="text-gray-500 text-sm text-center mt-4">
          {isAuthenticated
            ? "You do not have permission to add patients."
            : "Please log in to add patients."}
        </div>
      )}
    </div>
  );
}
