// /functions/api/patients.ts
// Cloudflare Pages Function for patient CRUD (Airtable integration)

// Import PagesFunction type if available (Cloudflare Workers types)
// @ts-ignore
type PagesFunction = (context: any) => Promise<Response>;


export const onRequest: PagesFunction = async (context) => {
  const { request, env } = context;
  const AIRTABLE_API_KEY = env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE = env.AIRTABLE_TABLE || "Patients";

  // --- HIPAA: JWT validation and role extraction ---
  const authHeader = request.headers.get("authorization");
  let userEmail = "unknown";
  let userRoles: string[] = [];
  let jwtPayload: any = null;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    // NOTE: For production, validate JWT signature using Auth0 JWKS!
    // Here, we just decode for demo. Use jose/jwt-decode or similar for real validation.
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    jwtPayload = JSON.parse(jsonPayload);
    userEmail = jwtPayload.email || jwtPayload.name || "unknown";
    userRoles = jwtPayload["https://schemas.quickstart.com/roles"] || jwtPayload.roles || [];
  } catch (e) {
    return new Response("Invalid token", { status: 401 });
  }

  // --- Audit log (console for now) ---
  const logAudit = (action: string, details: any = {}) => {
    // Mask PHI in logs: never log patient names, phones, etc.
    const safeDetails = { ...details };
    if (safeDetails.body) safeDetails.body = "[REDACTED]";
    console.log(`[AUDIT] ${action} by ${userEmail} roles=[${userRoles.join(",")}], details=`, safeDetails);
  };

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return new Response("Airtable API key or base ID not set", { status: 500 });
  }

  const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`;
  const headers = {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    "Content-Type": "application/json",
  };

  if (request.method === "GET") {
    // Only allow users with 'admin' or 'staff' role to list patients
    if (!userRoles.includes("admin") && !userRoles.includes("staff")) {
      logAudit("DENY_LIST_PATIENTS", {});
      return new Response("Forbidden", { status: 403 });
    }
    // List patients
    logAudit("LIST_PATIENTS");
    const res = await fetch(airtableUrl, { headers });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (request.method === "POST") {
    // Only allow users with 'admin' or 'staff' role to add patients
    if (!userRoles.includes("admin") && !userRoles.includes("staff")) {
      logAudit("DENY_ADD_PATIENT", {});
      return new Response("Forbidden", { status: 403 });
    }
    // Add a patient
    const body = await request.json();
    logAudit("ADD_PATIENT", { body });
    const res = await fetch(airtableUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ records: [{ fields: body }] }),
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
