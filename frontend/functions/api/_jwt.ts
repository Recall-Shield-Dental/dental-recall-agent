// /functions/api/_jwt.ts
// Production-grade JWT validation for Auth0 using JWKS
// Uses jose for JWT verification (Edge-compatible)

import { jwtVerify, createRemoteJWKSet } from "jose";

export async function verifyAuth0JWT(token: string, env: any) {
  const AUTH0_DOMAIN = env.AUTH0_DOMAIN || env.NEXT_PUBLIC_AUTH0_DOMAIN;
  if (!AUTH0_DOMAIN) throw new Error("Missing AUTH0_DOMAIN env");
  const JWKS = createRemoteJWKSet(new URL(`${AUTH0_DOMAIN}/.well-known/jwks.json`));
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `${AUTH0_DOMAIN}/`,
      audience: env.AUTH0_AUDIENCE || env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    });
    return payload;
  } catch (e) {
    throw new Error("Invalid or expired token");
  }
}
