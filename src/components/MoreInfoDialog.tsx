import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, Target, DollarSign, Users, ClipboardList, ShieldCheck } from "lucide-react";

const sections = [
  {
    icon: Target,
    title: "The problem we're solving",
    body: (
      <p>
        Markets are inherently unpredictable, and those seeking an edge will invest heavily in any advantage that
        improves their ability to anticipate change. Our mission is to bridge that gap by gathering direct insights
        from industry professionals and transforming real-world intelligence into actionable market signals.
      </p>
    ),
  },
  {
    icon: DollarSign,
    title: "How the business will be monetized",
    body: (
      <div className="space-y-4">
        <p className="text-muted-foreground">Two paths are being evaluated:</p>
        <div>
          <h4 className="font-medium text-foreground">Monthly subscriptions ($100–$1,000)</h4>
          <p className="mt-1">
            Subscribers get instant access to thousands of real estate data points to inform rent pricing,
            investments, and strategy. Provides consistent monthly cash flow, but revenue ramps slowly at first.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-foreground">Selling data to institutions</h4>
          <p className="mt-1">
            Survey data could be worth hundreds of thousands to hedge funds and private equity firms. Easier
            initial cash flow with less polish required, though revenue is less consistent unless buyers move to
            a recurring model.
          </p>
        </div>
      </div>
    ),
  },
  {
    icon: Users,
    title: "How customers will be acquired",
    body: (
      <p>
        Early growth comes through personal connections. As an incentive, weekly survey participants earn a{" "}
        <span className="text-foreground font-medium">Cassin Certification</span> — unlocking custom benefits like
        free networking events and, eventually, financial perks. Long-term, partnerships with companies like
        Robinhood, Zillow, and LinkedIn could promote the surveys and certification to millions of monthly users
        in exchange for data or revenue share.
      </p>
    ),
  },
  {
    icon: ClipboardList,
    title: "How the surveys are designed",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>All mandatory questions are multiple choice and quick to answer.</li>
        <li>
          Questions focus on real, market-moving signals: bidding war intensity, buyer demand, showing activity,
          highest-demand property types, price sensitivity, 3-month price expectations, and biggest market
          challenges.
        </li>
        <li>
          The look is slick and professional — directly addressing the industry's bad reputation around survey
          scams. Safety and verification are repeated throughout the brand.
        </li>
        <li>Short and quick to complete so respondents stay engaged through the end.</li>
      </ul>
    ),
  },
  {
    icon: ShieldCheck,
    title: "How data is legitimized",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Mirrored questions catch random clickers — contradictory answers automatically flag a survey as bad
          data.
        </li>
        <li>Surveys are timed: anything completed under a minimum threshold is discarded.</li>
        <li>
          Suspicious answer patterns (a,b,a,b or a,a,a,a) are detected and the response is excluded from the
          dataset.
        </li>
      </ul>
    ),
  },
];

export function MoreInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-8 h-8 rounded-full border-border bg-surface/60 px-4 text-xs backdrop-blur">
          <Info className="h-3 w-3" />
          Get more info
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl border-border bg-background p-0">
        <DialogHeader className="border-b border-border px-6 py-5 text-left">
          <DialogTitle className="font-display text-3xl">
            About <span className="text-gold italic">Cassin Analytics</span>
          </DialogTitle>
          <DialogDescription>
            How we're building verified, institutional-grade real estate intelligence.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] px-6 py-6">
          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
            {sections.map(({ icon: Icon, title, body }) => (
              <section key={title}>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground">{title}</h3>
                </div>
                <div className="pl-11">{body}</div>
              </section>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
