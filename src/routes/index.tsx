import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/components/SignupForm";
import { BarChart3, ShieldCheck, Building2, LineChart } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cassin Analytics — Real Estate Market Intelligence" },
      {
        name: "description",
        content:
          "Accurate market intelligence powered by verified professionals. Join the Cassin Analytics panel before our first surveys go live.",
      },
      { property: "og:title", content: "Cassin Analytics" },
      {
        property: "og:description",
        content:
          "Accurate market intelligence powered by verified professionals.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
      />

      {/* NAV */}
      <header className="relative z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary shadow-glow" />
            <span className="text-sm font-medium tracking-[0.2em] uppercase">
              Cassin <span className="text-muted-foreground">Analytics</span>
            </span>
          </div>
          <a
            href="#signup"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Early access →
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-64"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-background))",
          }}
        />

        <div className="mx-auto max-w-6xl px-6 pt-20 pb-28 md:pt-32 md:pb-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Surveys launching soon — join the panel
            </div>

            <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-balance md:text-7xl">
              Cassin <span className="text-gold italic">Analytics</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance md:text-xl">
              Accurate market intelligence powered by verified professionals.
            </p>

            <div className="mt-10 flex items-center justify-center gap-6 text-xs uppercase tracking-widest text-muted-foreground/80">
              <span>Real Estate</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>Hedge Funds</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>Subscriptions</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Verified panel",
              body: "Brokers, property managers, and analysts vetted before joining.",
            },
            {
              icon: BarChart3,
              title: "Survey-driven signal",
              body: "Structured questionnaires capture leasing, pricing, and sentiment.",
            },
            {
              icon: LineChart,
              title: "Institutional-grade data",
              body: "Sold to hedge funds and offered via subscription to operators.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-surface p-8">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNUP */}
      <section id="signup" className="relative mx-auto max-w-3xl px-6 pb-32">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl">
            Join the <span className="text-gold italic">first cohort</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Be among the first verified professionals contributing to — and
            receiving early access to — Cassin's real estate intelligence.
          </p>
        </div>
        <SignupForm />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Cassin Analytics. All rights reserved.</div>
          <div className="tracking-widest uppercase">Real estate · Verified · Confidential</div>
        </div>
      </footer>
    </div>
  );
}
