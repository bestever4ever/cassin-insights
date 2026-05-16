import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !name.trim() || !role.trim() || !company.trim()) {
      toast.error("Please fill in name, company, role, and email.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("survey_signups").insert({
      email: email.trim(),
      name: name.trim(),
      role: role.trim(),
      company: company.trim(),
    });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast.error("That email is already on the list.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      return;
    }
    setDone(true);
    toast.success("You're on the list. We'll be in touch.");
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface-elevated/60 p-8 text-center backdrop-blur">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-primary-foreground">
          <Check className="h-6 w-6" strokeWidth={3} />
        </div>
        <h3 className="font-display text-2xl">You're on the list.</h3>
        <p className="text-sm text-muted-foreground">
          We'll reach out before the first survey goes live.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-border bg-surface-elevated/60 p-6 backdrop-blur shadow-elegant md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          required
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 bg-surface/80 border-border"
        />
        <Input
          required
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="h-12 bg-surface/80 border-border"
        />
        <Input
          required
          placeholder="Your role (e.g. Broker, PM, Analyst)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="h-12 bg-surface/80 border-border sm:col-span-2"
        />
        <Input
          required
          type="email"
          placeholder="you@firm.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 bg-surface/80 border-border sm:col-span-2"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="mt-5 h-12 w-full bg-gold text-primary-foreground hover:opacity-90 font-medium text-base shadow-glow group"
      >
        {loading ? "Submitting…" : "Request early access"}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        No spam. We only contact you about Cassin Analytics surveys and data releases.
      </p>
    </form>
  );
}
