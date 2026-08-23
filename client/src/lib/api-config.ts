const DEFAULT_API_BASE = "/api";

export const API_BASE_URL = normalizeApiBase(import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE);

export class ApiConnectionError extends Error {
  constructor() {
    super(
      "Could not reach the backend API. Please make sure the server is running and VITE_API_BASE_URL points to the backend URL ending in /api."
    );
    this.name = "ApiConnectionError";
  }
}

export function buildApiUrl(path: string) {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${safePath}`;
}

export async function readJsonResponse(res: Response) {
  const contentType = res.headers.get("content-type") || "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return {
      ok: false,
      message:
        "The backend API returned an unexpected response. Check that VITE_API_BASE_URL is set to the live backend /api URL.",
    };
  }

  return res.json().catch(() => ({}));
}

function normalizeApiBase(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return DEFAULT_API_BASE;
  return trimmed.replace(/\/+$/, "");
}
