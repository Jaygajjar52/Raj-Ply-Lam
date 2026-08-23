import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  adminLogin,
  adminLogout,
  fetchAllAdminInquiries,
  fetchAdminMe,
  AdminInquiry,
} from "@/lib/admin-api";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { ArrowLeft, Lock, LogOut, RefreshCw, Search, Shield, Table2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sessionPhone, setSessionPhone] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [form, setForm] = useState({ phone: "", password: "" });

  async function loadSession() {
    setLoading(true);
    setError(null);
    try {
      const me = await fetchAdminMe();
      setSessionPhone(me.admin.phone);
      setInquiries(await fetchAllAdminInquiries());
    } catch {
      setSessionPhone(null);
      setInquiries([]);
    } finally {
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
      setStatus("Logged in.");
      setForm({ phone: "", password: "" });
      await loadSession();
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
      setInquiries(await fetchAllAdminInquiries());
      setStatus("Inbox refreshed.");
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "Refresh failed.");
    } finally {
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
        <Container className="py-10 md:py-16">
          <div className="max-w-md border border-gold/20 bg-wood-light/80 p-6 md:p-8 rounded-xl">
            <div className="flex items-center gap-3 mb-5">
              <Shield className="text-gold" size={20} />
              <h1 className="font-display text-3xl font-semibold">Admin access</h1>
            </div>
            <p className="text-sm text-beige/70 leading-relaxed mb-6">
              Log in with your mobile number and password to view every saved customer inquiry.
            </p>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-gold-light mb-2">
                  Mobile number
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
                  className="w-full rounded-lg border border-gold/20 bg-wood px-4 py-3 text-cream placeholder:text-beige/40"
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
                  className="w-full rounded-lg border border-gold/20 bg-wood px-4 py-3 text-cream placeholder:text-beige/40"
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
                Login and View Inquiries
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
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-gold-light text-xs uppercase tracking-[0.2em] mb-2">
              <Table2 size={14} />
              Private dashboard
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold">Customer inquiries</h1>
            <p className="text-sm text-beige/65 mt-2">Signed in as {sessionPhone}.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isBusy}>
              <RefreshCw size={16} />
              Refresh
            </Button>
            <Button variant="ghost" onClick={handleLogout} disabled={isBusy}>
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </Container>

      <Container className="pb-10 md:pb-14">
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Metric label="Total inquiries" value={summary.total} />
          <Metric label="Today" value={summary.todayCount} />
          <Metric label="With email" value={summary.withEmail} />
        </div>

        <div className="mb-5 relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-beige/50" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, phone, product, message"
            className="w-full rounded-xl border border-gold/15 bg-wood-light/80 pl-11 pr-4 py-3 text-sm text-cream placeholder:text-beige/40"
          />
        </div>

        {error && <p className="mb-4 text-sm text-red-300">{error}</p>}
        {status && <p className="mb-4 text-sm text-gold-light">{status}</p>}

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="border border-gold/15 bg-wood-light/70 rounded-xl p-6 text-sm text-beige/70">
              No inquiries found.
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
      </Container>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-gold/15 bg-wood-light/70 rounded-xl px-5 py-4">
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
