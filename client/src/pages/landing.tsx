import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Shield, Star, Users, ChevronRight, Sparkles } from "lucide-react";

export default function Landing() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WingGirlLogo />
            <span className="font-editorial text-lg font-semibold tracking-tight">Wing Girl</span>
          </div>
          <Button
            data-testid="button-enter-app"
            onClick={() => navigate("/browse")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 text-sm font-medium"
          >
            Enter App
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide uppercase">Women-powered dating</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            Dating, but with{" "}
            <span className="italic text-primary">receipts.</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Good men, verified by the women who know them best.
            Wing Girl replaces swipe culture with trust, taste, and real social proof.
          </p>

          {/* Waitlist Form */}
          {!submitted ? (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <Input
                data-testid="input-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-full px-5 bg-card border-border text-foreground placeholder:text-muted-foreground"
                required
              />
              <Button
                data-testid="button-join-waitlist"
                type="submit"
                className="h-12 rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium whitespace-nowrap"
              >
                Join Waitlist
              </Button>
            </form>
          ) : (
            <div className="max-w-md mx-auto mb-6 p-4 rounded-2xl bg-primary/8 border border-primary/15">
              <p className="text-sm font-medium text-primary">You're on the list. We'll be in touch soon.</p>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Launching in DC & NYC — <button onClick={() => navigate("/browse")} className="underline hover:text-foreground transition-colors">preview the experience</button>
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-center mb-4">
            How Wing Girl works
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Three roles. One mission. Better dating for everyone.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <RoleCard
              icon={<Users className="w-5 h-5" />}
              title="Wing Girls"
              subtitle="The Curators"
              description="Women nominate men they trust — brothers, cousins, coworkers, friends. They write the bio, vouch for character, and set the vibe."
              color="primary"
            />
            <RoleCard
              icon={<Shield className="w-5 h-5" />}
              title="Men"
              subtitle="Invite-Only"
              description="Men can't sign up alone. They join through a Wing Girl's invite, approve their profile, and only see women who liked them first."
              color="accent"
            />
            <RoleCard
              icon={<Heart className="w-5 h-5" />}
              title="Women Daters"
              subtitle="The Choosers"
              description="Browse vetted profiles. Like with intention. No unsolicited messages. Men must make the first move — and earn it."
              color="primary"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-card/50 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-center mb-16">
            Not just another dating app
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Star className="w-4 h-4" />}
              title="Editorial Profiles"
              description="Profiles feel like magazine features — full-bleed photos, Wing Girl pull quotes, and curated music moments."
            />
            <FeatureCard
              icon={<Shield className="w-4 h-4" />}
              title="Trust Badges"
              description="'Sister Approved', 'Friend Vouched', 'Cousin Certified' — real social proof from real relationships."
            />
            <FeatureCard
              icon={<Heart className="w-4 h-4" />}
              title="Quality Over Volume"
              description="Limited daily likes. No rapid-fire swiping. Reward real engagement, not dopamine loops."
            />
            <FeatureCard
              icon={<Sparkles className="w-4 h-4" />}
              title="Rewards That Matter"
              description="Earn profile boosts, priority visibility, and exclusive features by making genuine connections."
            />
          </div>
        </div>
      </section>

      {/* Taglines */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {[
            "Because the best guys don't self-promote.",
            "Your friend's favorite guy.",
            "Good men, verified by women.",
          ].map((tagline, i) => (
            <p key={i} className="font-editorial text-xl sm:text-2xl italic text-muted-foreground/70">
              "{tagline}"
            </p>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-sidebar text-sidebar-foreground border-t border-sidebar-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold mb-4">
            Ready to change how you date?
          </h2>
          <p className="text-sidebar-foreground/60 mb-8">
            Wing Girl is Raya's cool older sister with community values.
          </p>
          <Button
            data-testid="button-explore-demo"
            onClick={() => navigate("/browse")}
            className="rounded-full px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            Explore the Experience <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <WingGirlLogo size={20} />
          <span className="font-editorial text-sm font-semibold">Wing Girl</span>
        </div>
        <p className="text-xs text-muted-foreground">
          A women-powered, socially curated dating platform.
        </p>
      </footer>
    </div>
  );
}

function WingGirlLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-label="Wing Girl logo">
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
      <path
        d="M10 20C10 20 12 13 16 10C20 13 22 20 22 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
      <path
        d="M13 18C13 18 14.5 14 16 13C17.5 14 19 18 19 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
      <circle cx="16" cy="10" r="2" fill="currentColor" className="text-primary" />
    </svg>
  );
}

function RoleCard({
  icon,
  title,
  subtitle,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border/60 hover:border-border transition-colors">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
        color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground"
      }`}>
        {icon}
      </div>
      <h3 className="font-editorial text-lg font-semibold mb-1">{title}</h3>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{subtitle}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-5 rounded-xl bg-background border border-border/40">
      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-sm mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
