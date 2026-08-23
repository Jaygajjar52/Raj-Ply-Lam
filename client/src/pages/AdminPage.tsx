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
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  Shield,
  Table2,
  UserRound,
} from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [form, setForm] = useState({ phone: "", password: "" });

  async function loadInquiries(page: number, successMessage?: string) {
    const nextPage = Math.max(1, page);
    setIsLoadingInquiries(true);
    const payload = await fetchAdminInquiries((nextPage - 1) * INQUIRY_PAGE_SIZE, INQUIRY_PAGE_SIZE);
    const totalPages = Math.max(1, Math.ceil(payload.meta.total / INQUIRY_PAGE_SIZE));
    const safePage = Math.min(nextPage, totalPages);

    if (safePage !== nextPage) {
      const safePayload = await fetchAdminInquiries((safePage - 1) * INQUIRY_PAGE_SIZE, INQUIRY_PAGE_SIZE);
      setInquiries(safePayload.inquiries);
      setTotalInquiries(safePayload.meta.total);
      setCurrentPage(safePage);
    } else {
      setInquiries(payload.inquiries);
      setTotalInquiries(payload.meta.total);
      setCurrentPage(nextPage);
    }

    if (successMessage) {
      setStatus(successMessage);
    }
  }

  async function loadSession() {
    setLoading(true);
    setError(null);
    try {
      const me = await fetchAdminMe();
      setSessionPhone(me.admin.phone);

      try {
        await loadInquiries(1);
      } catch (inquiryError) {
        setInquiries([]);
        setTotalInquiries(0);
        setCurrentPage(1);
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
      setTotalInquiries(0);
      setCurrentPage(1);
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
      setTotalInquiries(0);
      setCurrentPage(1);
      setStatus("Logged out.");
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : "Logout failed.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleRefresh() {
    setIsBusy(true);
    setError(null);
    try {
      await loadInquiries(currentPage, "Latest inquiries refreshed.");
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "Refresh failed.");
    } finally {
      setIsLoadingInquiries(false);
      setIsBusy(false);
    }
  }

  async function handlePageChange(page: number) {
    setIsBusy(true);
    setError(null);
    setStatus(null);
    try {
      await loadInquiries(page);
    } catch (pageError) {
      setError(pageError instanceof Error ? pageError.message : "Could not load that page.");
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
    return { total: totalInquiries, withEmail, todayCount };
  }, [inquiries, totalInquiries]);

  const totalPages = Math.max(1, Math.ceil(totalInquiries / INQUIRY_PAGE_SIZE));
  const pageStart = totalInquiries === 0 ? 0 : (currentPage - 1) * INQUIRY_PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * INQUIRY_PAGE_SIZE, totalInquiries);

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
          <Metric label="Today on page" value={summary.todayCount} />
          <Metric label="With email on page" value={summary.withEmail} />
        </div>

        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gold/15 bg-wood-light/70 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-gold-light text-xs uppercase tracking-[0.2em] mb-2">
              <Table2 size={14} />
              Inquiry inbox
            </div>
            <p className="text-sm text-beige/70">
              Showing {pageStart}-{pageEnd} of {totalInquiries} inquiries.
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

        {!query.trim() && totalInquiries > INQUIRY_PAGE_SIZE && (
          <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-xl border border-gold/15 bg-wood-light/70 px-4 py-3 sm:flex-row">
            <p className="text-sm text-beige/70">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isBusy || currentPage <= 1}
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isBusy || currentPage >= totalPages}
              >
                Next
                <ChevronRight size={16} />
              </Button>
            </div>
            <Button variant="ghost" onClick={() => handlePageChange(1)} disabled={isBusy || currentPage === 1}>
              <RefreshCw size={16} className={cn(isLoadingInquiries && "animate-spin")} />
              First page
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
