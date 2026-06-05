// Central API base URL.
// Override at build/runtime via VITE_API_URL (see .env.example); falls back to the
// local Express backend used in development.
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
