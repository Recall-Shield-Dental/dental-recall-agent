"use client";

import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export interface Patient {
  id: string;
  fields: {
    Name: string;
    Phone: string;
    [key: string]: unknown;
  };
}

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();

  // Extract roles from user claims (if present)
  const roles: string[] = user?.["https://schemas.quickstart.com/roles"] || user?.roles || [];

  // Fetch patients
  useEffect(() => {
    async function fetchPatients() {
      setLoading(true);
      setError(null);
      try {
        const token = isAuthenticated ? await getAccessTokenSilently() : null;
        const res = await fetch("/api/patients", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        setPatients(data.records || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Add a patient
  const addPatient = async (fields: { Name: string; Phone: string }) => {
    setLoading(true);
    setError(null);
    try {
      const token = isAuthenticated ? await getAccessTokenSilently() : null;
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      setPatients((prev: Patient[]) => [...prev, ...(data.records || [])]);
      setLoading(false);
      return data;
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
      throw err;
    }
  };

  return { patients, loading, error, addPatient, user, roles, isAuthenticated };
}
