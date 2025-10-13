// This file is for securely accessing Airtable from the backend.
// Do NOT commit secrets to source control in production!
export const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN || ""; // Set in environment only, never commit secrets
export const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || "appEfZ3kFIK2jRkmI"; // Set your base ID here or in env
export const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE || "DemoRequests";
