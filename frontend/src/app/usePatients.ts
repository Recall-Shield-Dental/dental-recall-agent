
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function usePatients() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();

  // Extract roles from user claims (if present)
  const roles = user?.["https://schemas.quickstart.com/roles"] || user?.roles || [];

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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Add a patient
  const addPatient = async (fields: Record<string, any>) => {
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
      setPatients((prev) => [...prev, ...(data.records || [])]);
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { patients, loading, error, addPatient, user, roles, isAuthenticated };
}
