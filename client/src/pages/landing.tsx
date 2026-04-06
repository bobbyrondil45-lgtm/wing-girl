import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";

export default function Landing() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] overflow-hidden text-[#F5E6C8]">
      {/* Fixed Nav */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="hw-caps text-xs tracking-[0.35em] text-[#F5E6C8]">WING GIRL</span>
          <Button
            data-testid="button-enter-app"
            onClick={() => navigate("/browse")}
            className="bg-[#DC143C] hover:bg-[#FF1744] text-white rounded-none px-6 text-[10px] hw-caps tracking-[0.2em] h-8 border border-[#DC143C]/50 shadow-[0_0_20px_rgba(220,20,60,0.3)]"
          >
            Enter
          </Button>
        </div>
      </nav>

      {/* HERO — Full screen cinematic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0000] via-[#080808] to-black" />

        {/* Red atmospheric glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DC143C]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FFD700]/5 rounded-full blur-[100px]" />

        {/* Scanlines */}
        <div className="absolute inset-0 scanlines" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Small tag */}
          <p className="hw-caps text-[10px] tracking-[0.5em] text-[#DC143C] mb-8 opacity-80">
            Women-Powered Dating
          </p>

          {/* MEGA headline */}
          <h1 className="hw-mega text-[#F5E6C8] mb-2">
            DATING,
          </h1>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl italic font-light text-[#DC143C] mb-8 neon-glow">
            but with receipts.
          </h1>

          <p className="text-sm sm:text-base text-white/40 max-w-lg mx-auto mb-12 leading-relaxed tracking-wide">
            Good men, verified by the women who know them best.
          </p>

          {/* Waitlist */}
          {!submitted ? (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <Input
                data-testid="input-email"
                type="email"
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-none bg-white/5 border-white/10 text-[#F5E6C8] placeholder:text-white/20 text-xs tracking-[0.15em] px-5 focus:border-[#DC143C]/50 focus:ring-[#DC143C]/20"
                required
              />
              <Button
                data-testid="button-join-waitlist"
                type="submit"
                className="h-12 rounded-none px-8 bg-[#DC143C] hover:bg-[#FF1744] text-white text-[10px] hw-caps tracking-[0.2em] border border-[#DC143C]/50 shadow-[0_0_30px_rgba(220,20,60,0.3)]"
              >
                Join Waitlist
              </Button>
            </form>
          ) : (
            <div className="max-w-md mx-auto mb-6 p-4 border border-[#DC143C]/30 bg-[#DC143C]/5">
              <p className="text-xs hw-caps tracking-[0.2em] text-[#DC143C]">You're on the list.</p>
            </div>
          )}

          <button
            onClick={() => navigate("/browse")}
            className="text-[10px] hw-caps tracking-[0.3em] text-white/30 hover:text-[#FFD700] transition-colors"
          >
            Preview the experience &rarr;
          </button>
        </div>

        {/* Bottom line accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DC143C]/40 to-transparent" />
      </section>

      {/* HOW IT WORKS — Dark editorial grid */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0000] to-black" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="hw-caps text-[10px] tracking-[0.5em] text-[#DC143C] mb-4 text-center">The System</p>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-center text-[#F5E6C8] mb-16">
            How Wing Girl Works
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            <RoleCard
              number="01"
              title="WING GIRLS"
              subtitle="THE CURATORS"
              description="Women nominate men they trust. Brothers, cousins, coworkers, friends. They write the bio. They vouch for character. They set the vibe."
            />
            <RoleCard
              number="02"
              title="MEN"
              subtitle="INVITE ONLY"
              description="Men can't sign up alone. They join through a Wing Girl's invite. They only see women who liked them first. No hunting. No chasing."
            />
            <RoleCard
              number="03"
              title="WOMEN"
              subtitle="THE CHOOSERS"
              description="Browse vetted profiles. Like with intention. No unsolicited messages. Men must make the first move — and earn it."
            />
          </div>
        </div>
      </section>

      {/* FEATURES — Cinematic cards */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="hw-caps text-[10px] tracking-[0.5em] text-[#FFD700] mb-4 text-center">Features</p>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-center text-[#F5E6C8] mb-16">
            Not Another Dating App
          </h2>

          <div className="grid sm:grid-cols-2 gap-px bg-white/5">
            {[
              { label: "EDITORIAL PROFILES", desc: "Magazine spreads, not cards. Full-bleed photos. Wing Girl pull quotes. Music moments." },
              { label: "TRUST BADGES", desc: "'Sister Approved.' 'Friend Vouched.' 'Cousin Certified.' Real proof from real relationships." },
              { label: "INTENTIONAL MATCHING", desc: "Limited daily likes. No rapid-fire swiping. Quality over volume. Always." },
              { label: "REWARDS SYSTEM", desc: "Earn boosts, priority visibility, and exclusive access by making genuine connections." },
            ].map((f, i) => (
              <div key={i} className="bg-black/40 p-8 border border-white/5 group hover:border-[#DC143C]/20 transition-colors">
                <p className="hw-caps text-[10px] tracking-[0.3em] text-[#DC143C] mb-3">{f.label}</p>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAGLINES — Big bold editorial */}
      <section className="relative py-24 px-6 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0000] to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DC143C]/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-12">
          {[
            "Because the best guys don't self-promote.",
            "Your friend's favorite guy.",
            "Good men, verified by women.",
          ].map((tagline, i) => (
            <p key={i} className="font-editorial text-2xl sm:text-3xl italic text-white/20 hover:text-[#F5E6C8] transition-colors duration-700 cursor-default">
              "{tagline}"
            </p>
          ))}
        </div>
      </section>

      {/* CTA — Cinematic */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0000]/50 to-black" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#F5E6C8] mb-4">
            Ready?
          </h2>
          <p className="text-sm text-white/30 mb-10">
            Wing Girl is Raya's cool older sister with community values.
          </p>
          <Button
            data-testid="button-explore-demo"
            onClick={() => navigate("/browse")}
            className="rounded-none px-10 h-12 bg-[#DC143C] hover:bg-[#FF1744] text-white text-[10px] hw-caps tracking-[0.2em] border border-[#DC143C]/50 shadow-[0_0_40px_rgba(220,20,60,0.3)]"
          >
            Explore <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center">
        <p className="hw-caps text-[10px] tracking-[0.4em] text-white/20 mb-2">WING GIRL</p>
        <p className="text-[10px] text-white/10 tracking-wider">
          A WOMEN-POWERED, SOCIALLY CURATED DATING PLATFORM
        </p>
      </footer>
    </div>
  );
}

function RoleCard({
  number,
  title,
  subtitle,
  description,
}: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <div className="bg-black/40 p-8 border border-white/5 group hover:border-[#DC143C]/20 transition-colors">
      <span className="font-editorial text-4xl font-bold text-[#DC143C]/20 block mb-4">{number}</span>
      <h3 className="hw-caps text-sm tracking-[0.2em] text-[#F5E6C8] mb-1">{title}</h3>
      <p className="hw-caps text-[9px] tracking-[0.3em] text-white/30 mb-4">{subtitle}</p>
      <p className="text-sm text-white/40 leading-relaxed">{description}</p>
    </div>
  );
}
