const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

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
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.message || "Request failed.");
  }

  return json as T;
}

export function adminLogin(phone: string, password: string) {
  return requestJson<{ ok: true }>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ phone, password }),
  });
}

export function adminLogout() {
  return requestJson<{ ok: true }>("/admin/logout", { method: "POST" });
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
