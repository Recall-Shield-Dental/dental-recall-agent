// /functions/api/appointments.ts
import { verifyAuth0JWT } from "./_jwt";
// @ts-ignore
export const onRequest: (context: any) => Promise<Response> = async (context) => {
  const { request, env } = context;
  const authHeader = request.headers.get("authorization");
  let userEmail = "unknown";
  let userRoles: string[] = [];
  let jwtPayload: any = null;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    jwtPayload = await verifyAuth0JWT(token, env);
    userEmail = jwtPayload.email || jwtPayload.name || "unknown";
    userRoles = jwtPayload["https://schemas.quickstart.com/roles"] || jwtPayload.roles || [];
  } catch (e) {
    return new Response("Invalid token", { status: 401 });
  }
  const logAudit = (action: string, details: any = {}) => {
    const safeDetails = { ...details };
    if (safeDetails.body) safeDetails.body = "[REDACTED]";
    console.log(`[AUDIT] ${action} by ${userEmail} roles=[${userRoles.join(",")}], details=`, safeDetails);
  };
  if (request.method === "GET") {
    if (!userRoles.includes("admin") && !userRoles.includes("staff")) {
      logAudit("DENY_LIST_APPOINTMENTS", {});
      return new Response("Forbidden", { status: 403 });
    }
    logAudit("LIST_APPOINTMENTS");
    return new Response(JSON.stringify({ appointments: [] }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  if (request.method === "POST") {
    if (!userRoles.includes("admin") && !userRoles.includes("staff")) {
      logAudit("DENY_ADD_APPOINTMENT", {});
      return new Response("Forbidden", { status: 403 });
    }
    const body = await request.json();
    logAudit("ADD_APPOINTMENT", { body });
    return new Response(JSON.stringify({ message: "Appointment created (placeholder)" }), { status: 201, headers: { "Content-Type": "application/json" } });
  }
  return new Response("Method Not Allowed", { status: 405 });
};
