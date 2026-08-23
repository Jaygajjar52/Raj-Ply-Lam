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

export async function fetchApi(path: string, init?: RequestInit) {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  const bases = getApiBases();
  let lastError: unknown = null;

  for (const base of bases) {
    try {
      return await fetch(`${base}${safePath}`, init);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new ApiConnectionError();
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

function getApiBases() {
  const bases = [API_BASE_URL];

  if (typeof window !== "undefined") {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      bases.push(DEFAULT_API_BASE, "http://localhost:4000/api");
    }
  }

  return [...new Set(bases.map(normalizeApiBase))];
}
