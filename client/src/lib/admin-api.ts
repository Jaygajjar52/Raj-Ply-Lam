import { ApiConnectionError, fetchApi, readJsonResponse } from "./api-config";

const ADMIN_TOKEN_STORAGE_KEY = "rajplylam_admin_token";

export interface AdminInquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  product: string | null;
  category: string | null;
  quantity: string | null;
  city: string | null;
  message: string;
  ipAddress: string | null;
  userAgent: string | null;
  source: string | null;
  addDate: string;
  editDate: string;
}

interface AdminInquiryResponse {
  ok: true;
  inquiries: AdminInquiry[];
  meta: {
    limit: number;
    skip: number;
    total: number;
    hasMore: boolean;
  };
}

interface AdminMeResponse {
  ok: true;
  admin: {
    phone: string;
  };
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getStoredAdminToken();
  let res: Response;

  try {
    res = await fetchApi(path, {
      credentials: "include",
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers || {}),
      },
    });
  } catch {
    throw new ApiConnectionError();
  }

  const json = await readJsonResponse(res);
  if (!res.ok) {
    if (res.status === 401) {
      clearStoredAdminToken();
    }

    throw new Error(json?.message || "Request failed.");
  }

  return json as T;
}

export async function adminLogin(phone: string, password: string) {
  const payload = await requestJson<{ ok: true; token: string }>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ phone, password }),
  });

  storeAdminToken(payload.token);
  return payload;
}

export async function adminLogout() {
  try {
    return await requestJson<{ ok: true }>("/admin/logout", { method: "POST" });
  } finally {
    clearStoredAdminToken();
  }
}

export function fetchAdminMe() {
  return requestJson<AdminMeResponse>("/admin/me", { method: "GET" });
}

export function fetchAdminInquiries(skip = 0, limit = 500) {
  return requestJson<AdminInquiryResponse>(`/admin/inquiries?skip=${skip}&limit=${limit}`, {
    method: "GET",
  });
}

export async function fetchAllAdminInquiries() {
  const limit = 500;
  let skip = 0;
  const inquiries: AdminInquiry[] = [];

  while (true) {
    const payload = await fetchAdminInquiries(skip, limit);
    inquiries.push(...payload.inquiries);

    if (!payload.meta.hasMore || payload.inquiries.length === 0) {
      return inquiries;
    }

    skip += limit;
  }
}

function getStoredAdminToken() {
  try {
    return window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeAdminToken(token: string) {
  try {
    window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
  } catch {
    // The cookie session can still work when storage is unavailable.
  }
}

function clearStoredAdminToken() {
  try {
    window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
  } catch {
    // Nothing to clear when storage is unavailable.
  }
}
