import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Cassin Analytics" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Signup = {
  id: string;
  email: string;
  name: string | null;
  role: string | null;
  company: string | null;
  created_at: string;
};

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(false);
      setSignups([]);
      return;
    }
    (async () => {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = !!roles?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      if (admin) {
        setLoadingData(true);
        const { data, error } = await supabase
          .from("survey_signups")
          .select("*")
          .order("created_at", { ascending: false });
        setLoadingData(false);
        if (error) toast.error("Could not load signups.");
        else setSignups((data ?? []) as Signup[]);
      }
    })();
  }, [session]);

  if (checkingSession) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-sm tracking-[0.2em] uppercase">
            Cassin <span className="text-muted-foreground">Analytics</span>
          </Link>
          {session && (
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Sign out
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {!session ? (
          <AuthPanel />
        ) : !isAdmin ? (
          <div className="rounded-xl border border-border bg-surface/60 p-8 text-center">
            <h2 className="font-display text-2xl">Not authorized</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your account ({session.user.email}) doesn't have admin access.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              User ID: <code className="rounded bg-surface px-1.5 py-0.5">{session.user.id}</code>
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h1 className="font-display text-3xl md:text-4xl">Survey signups</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {signups.length} {signups.length === 1 ? "person" : "people"} signed up
                </p>
              </div>
              <Button variant="outline" onClick={() => downloadCsv(signups)} disabled={!signups.length}>
                Export CSV
              </Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Company</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingData ? (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>
                  ) : signups.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No signups yet.</td></tr>
                  ) : signups.map((s) => (
                    <tr key={s.id} className="border-t border-border bg-surface/30">
                      <td className="px-4 py-3 text-muted-foreground">{new Date(s.created_at).toLocaleString()}</td>
                      <td className="px-4 py-3">{s.name ?? "—"}</td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${s.email}`} className="text-primary hover:underline">{s.email}</a>
                      </td>
                      <td className="px-4 py-3">{s.role ?? "—"}</td>
                      <td className="px-4 py-3">{s.company ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function AuthPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Signed in.");
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border border-border bg-surface/60 p-8 backdrop-blur">
      <h1 className="font-display text-2xl">Admin sign in</h1>
      <p className="mt-1 text-sm text-muted-foreground">Sign in to view signups.</p>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11" />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="h-11" />
        <Button type="submit" disabled={busy} className="h-11 w-full bg-gold text-primary-foreground hover:opacity-90">
          {busy ? "…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

function downloadCsv(rows: Signup[]) {
  const header = ["Date", "Name", "Email", "Role", "Company"];
  const esc = (v: string | null) => `"${(v ?? "").replace(/"/g, '""')}"`;
  const csv = [
    header.join(","),
    ...rows.map((r) => [new Date(r.created_at).toISOString(), r.name, r.email, r.role, r.company].map(esc).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cassin-signups-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
