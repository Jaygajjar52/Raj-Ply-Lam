import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  adminLogin,
  adminLogout,
  fetchAdminMe,
  fetchAdminInquiries,
  AdminInquiry,
} from "@/lib/admin-api";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { ArrowLeft, Clock3, Lock, LogOut, RefreshCw, Search, Shield, Table2, UserRound } from "lucide-react";
import { cn } from "@/lib/cn";

const ADMIN_NAME = "Naresh Gajjar";
const INQUIRY_PAGE_SIZE = 50;

export function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sessionPhone, setSessionPhone] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);
  const [hasMoreInquiries, setHasMoreInquiries] = useState(false);
  const [form, setForm] = useState({ phone: "", password: "" });

  async function loadSession() {
    setLoading(true);
    setError(null);
    try {
      const me = await fetchAdminMe();
      setSessionPhone(me.admin.phone);

      try {
        setIsLoadingInquiries(true);
        const payload = await fetchAdminInquiries(0, INQUIRY_PAGE_SIZE);
        setInquiries(payload.inquiries);
        setHasMoreInquiries(payload.meta.hasMore);
      } catch (inquiryError) {
        setInquiries([]);
        setHasMoreInquiries(false);
        setError(
          inquiryError instanceof Error
            ? inquiryError.message
            : "Could not load inquiries. Please try refreshing."
          );
      }
      return true;
    } catch {
      setSessionPhone(null);
      setInquiries([]);
      setHasMoreInquiries(false);
      return false;
    } finally {
      setIsLoadingInquiries(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadSession();
  }, []);

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsBusy(true);
    setError(null);
    setStatus(null);

    try {
      await adminLogin(form.phone, form.password);
      setForm({ phone: "", password: "" });
      const hasSession = await loadSession();
      if (hasSession) {
        setStatus("Latest inquiries loaded.");
      } else {
        setError("Login succeeded, but the admin session could not be saved. Check the server cookie settings.");
      }
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleLogout() {
    setIsBusy(true);
    setError(null);
    try {
      await adminLogout();
      setSessionPhone(null);
      setInquiries([]);
      setHasMoreInquiries(false);
      setStatus("Logged out.");
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : "Logout failed.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleRefresh() {
    setIsBusy(true);
    setIsLoadingInquiries(true);
    setError(null);
    try {
      const payload = await fetchAdminInquiries(0, INQUIRY_PAGE_SIZE);
      setInquiries(payload.inquiries);
      setHasMoreInquiries(payload.meta.hasMore);
      setStatus("Latest inquiries refreshed.");
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "Refresh failed.");
    } finally {
      setIsLoadingInquiries(false);
      setIsBusy(false);
    }
  }

  async function handleLoadMore() {
    setIsBusy(true);
    setIsLoadingInquiries(true);
    setError(null);
    try {
      const payload = await fetchAdminInquiries(inquiries.length, INQUIRY_PAGE_SIZE);
      setInquiries((current) => [...current, ...payload.inquiries]);
      setHasMoreInquiries(payload.meta.hasMore);
      setStatus(`Loaded ${payload.inquiries.length} more inquiries.`);
    } catch (loadMoreError) {
      setError(loadMoreError instanceof Error ? loadMoreError.message : "Could not load more inquiries.");
    } finally {
      setIsLoadingInquiries(false);
      setIsBusy(false);
    }
  }

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return inquiries;
    return inquiries.filter((item) =>
      [
        item.fullName,
        item.phone,
        item.email || "",
        item.product || "",
        item.category || "",
        item.city || "",
        item.message,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [inquiries, query]);

  const summary = useMemo(() => {
    const withEmail = inquiries.filter((item) => item.email).length;
    const today = new Date().toDateString();
    const todayCount = inquiries.filter((item) => new Date(item.addDate).toDateString() === today).length;
    return { total: inquiries.length, withEmail, todayCount };
  }, [inquiries]);

  if (loading) {
    return (
      <div className="min-h-screen bg-wood text-cream flex items-center justify-center">
        <p className="text-sm text-beige/70">Checking admin access...</p>
      </div>
    );
  }

  if (!sessionPhone) {
    return (
      <div className="min-h-screen bg-wood text-cream">
        <Container className="py-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-beige/70 hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} />
            Back to website
          </button>
        </Container>
        <Container className="py-8 md:py-14">
          <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-gold/20 bg-wood-light/85 shadow-2xl shadow-black/20">
            <div className="border-b border-gold/10 bg-gold/10 px-6 py-5 md:px-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-wood text-gold">
                  <Shield size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-light">Private access</p>
                  <h1 className="font-display text-3xl font-semibold">Admin login</h1>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-beige/75">
                Welcome back. Enter your mobile number and password to open the inquiry dashboard.
              </p>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-4 p-6 md:p-8">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-gold-light mb-2">
                  Mobile number
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
                  className="w-full rounded-xl border border-gold/20 bg-wood px-4 py-3 text-cream outline-none placeholder:text-beige/40 focus:border-gold/60 focus:ring-2 focus:ring-gold/15"
                  placeholder="Enter admin mobile"
                  inputMode="numeric"
                  autoComplete="tel"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-gold-light mb-2">
                  Password
                </label>
                <input
                  value={form.password}
                  onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))}
                  className="w-full rounded-xl border border-gold/20 bg-wood px-4 py-3 text-cream outline-none placeholder:text-beige/40 focus:border-gold/60 focus:ring-2 focus:ring-gold/15"
                  placeholder="Enter admin password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-300">{error}</p>}
              {status && <p className="text-sm text-gold-light">{status}</p>}
              <Button type="submit" className="w-full" disabled={isBusy}>
                <Lock size={16} />
                {isBusy ? "Loading inquiries..." : "Login and View Inquiries"}
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wood text-cream">
      <Container className="py-5 md:py-8">
        <div className="rounded-2xl border border-gold/15 bg-wood-light/75 p-5 shadow-xl shadow-black/10 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-gold-light text-xs uppercase tracking-[0.2em] mb-2">
                <UserRound size={14} />
                Owner dashboard
              </div>
              <h1 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                Hey {ADMIN_NAME}, welcome back
              </h1>
              <p className="mt-2 text-sm text-beige/70">Signed in with {sessionPhone}.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleRefresh} disabled={isBusy}>
                <RefreshCw size={16} className={cn(isLoadingInquiries && "animate-spin")} />
                {isLoadingInquiries ? "Loading" : "Refresh"}
              </Button>
              <Button variant="ghost" onClick={handleLogout} disabled={isBusy}>
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-gold/10 pt-4 text-sm text-beige/70">
            <span className="inline-flex items-center gap-2">
              <Table2 size={15} className="text-gold" />
              Customer inquiries
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-gold/50 sm:inline-block" />
            <span className="inline-flex items-center gap-2">
              <Clock3 size={15} className="text-gold" />
              Last checked {formatDateTime(new Date().toISOString())}
            </span>
          </div>
        </div>
      </Container>

      <Container className="pb-10 md:pb-14">
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Metric label="Total inquiries" value={summary.total} />
          <Metric label="Today" value={summary.todayCount} />
          <Metric label="With email" value={summary.withEmail} />
        </div>

        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gold/15 bg-wood-light/70 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-gold-light text-xs uppercase tracking-[0.2em] mb-2">
              <Table2 size={14} />
              Inquiry inbox
            </div>
            <p className="text-sm text-beige/70">
              Showing latest {inquiries.length} inquiries first for faster mobile loading.
            </p>
          </div>
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-beige/50" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, phone, product, message"
              className="w-full rounded-xl border border-gold/15 bg-wood pl-11 pr-4 py-3 text-sm text-cream outline-none placeholder:text-beige/40 focus:border-gold/60 focus:ring-2 focus:ring-gold/15"
            />
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-red-300">{error}</p>}
        {status && <p className="mb-4 text-sm text-gold-light">{status}</p>}

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="border border-gold/15 bg-wood-light/70 rounded-xl p-6 text-sm text-beige/70">
              {isLoadingInquiries ? "Loading inquiries..." : "No inquiries found."}
            </div>
          ) : (
            filtered.map((item) => (
              <details
                key={item.id}
                className="border border-gold/15 bg-wood-light/70 rounded-xl overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-cream">{item.fullName}</p>
                    <p className="text-sm text-beige/65">
                      {item.phone}
                      {item.product ? ` | ${item.product}` : ""}
                    </p>
                  </div>
                  <p className="text-xs text-beige/50">{formatDateTime(item.addDate)}</p>
                </summary>
                <div className="border-t border-gold/10 px-5 py-4 grid gap-3 md:grid-cols-2">
                  <Detail label="Email" value={item.email || "Not provided"} />
                  <Detail label="Product" value={item.product || "Not provided"} />
                  <Detail label="Category" value={item.category || "Not provided"} />
                  <Detail label="Quantity" value={item.quantity || "Not provided"} />
                  <Detail label="City" value={item.city || "Not provided"} />
                  <Detail label="Source" value={item.source || "website"} />
                  <Detail label="Inquiry ID" value={item.id} />
                  <Detail label="Submitted" value={formatDateTime(item.addDate)} />
                  <Detail label="Updated" value={formatDateTime(item.editDate)} />
                  <Detail label="IP address" value={item.ipAddress || "Not captured"} />
                  <div className="md:col-span-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-gold-light mb-2">Message</p>
                    <p className="text-sm leading-relaxed text-cream whitespace-pre-wrap">{item.message}</p>
                  </div>
                </div>
              </details>
            ))
          )}
        </div>

        {hasMoreInquiries && !query.trim() && (
          <div className="mt-6 flex justify-center">
            <Button variant="outline" onClick={handleLoadMore} disabled={isBusy}>
              <RefreshCw size={16} className={cn(isLoadingInquiries && "animate-spin")} />
              {isLoadingInquiries ? "Loading more..." : "Load more inquiries"}
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-gold/15 bg-wood-light/70 rounded-2xl px-5 py-4 shadow-lg shadow-black/10">
      <p className="text-xs uppercase tracking-[0.2em] text-gold-light">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-gold-light mb-1">{label}</p>
      <p className={cn("text-sm text-cream break-words")}>{value}</p>
    </div>
  );
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}
