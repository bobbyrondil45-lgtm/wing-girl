import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { demoProfiles } from "@/lib/demo-data";
import { ArrowLeft, Heart, Music, MapPin, Briefcase, GraduationCap, Zap, Quote, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfileDetail() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [liked, setLiked] = useState(false);

  const profile = demoProfiles.find(p => p.id === Number(params.id));

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 1. Cover Moment — Hero Section */}
      <section className="relative h-[85vh] min-h-[500px] max-h-[700px] overflow-hidden grain-overlay">
        <img
          src={profile.photoUrls[0]}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 z-[2]" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 z-[3] flex items-center justify-between">
          <button
            data-testid="button-back"
            onClick={() => navigate("/browse")}
            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Badge */}
        <div className="absolute top-16 left-4 z-[3]">
          <Badge className="bg-white/15 backdrop-blur-md text-white border-white/20 text-[10px] font-medium tracking-wide uppercase px-3 py-1">
            {profile.badge}
          </Badge>
        </div>

        {/* Bottom hero info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-[3]">
          {profile.tagline && (
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.25em] mb-2">
              {profile.tagline}
            </p>
          )}
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-white mb-1">
            {profile.name}, {profile.age}
          </h1>
          <div className="flex items-center gap-1.5 text-white/60 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>{profile.city}</span>
          </div>

          {/* Song indicator */}
          {profile.songTitle && (
            <div className="mt-4 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 w-fit">
              <Music className="w-3.5 h-3.5 text-white/70" />
              <div className="flex gap-[3px] items-end h-4">
                {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.3].map((h, i) => (
                  <div
                    key={i}
                    className="w-[2.5px] bg-white/60 rounded-full waveform-bar"
                    style={{
                      height: `${h * 16}px`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
              <div className="text-xs text-white/70">
                <span className="font-medium text-white/90">{profile.songTitle}</span>
                {" · "}
                <span>{profile.songArtist}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-lg mx-auto px-4">
        {/* 2. Wing Girl Note — Social Proof */}
        <section className="py-8 border-b border-border/40">
          <div className="flex items-center gap-2 mb-4">
            <Quote className="w-4 h-4 text-primary/50" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Wing Girl Note</span>
          </div>
          <blockquote className="font-editorial text-lg sm:text-xl italic text-foreground/90 leading-relaxed mb-4">
            "{profile.wingGirlNote}"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{profile.wingGirlName?.[0]}</span>
            </div>
            <div>
              <p className="text-sm font-semibold">{profile.wingGirlName}</p>
              <p className="text-xs text-muted-foreground capitalize">{profile.wingGirlRelation}</p>
            </div>
          </div>
        </section>

        {/* 3. Visual Spread — Zine Layout */}
        <section className="py-8 border-b border-border/40">
          <div className="grid grid-cols-2 gap-2">
            <div className="row-span-2 rounded-xl overflow-hidden grain-overlay">
              <img
                src={profile.photoUrls[1]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-square grain-overlay">
              <img
                src={profile.photoUrls[2]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-sidebar flex items-center justify-center p-4">
              <p className="font-editorial text-lg font-bold text-sidebar-foreground text-center italic">
                "{profile.energy}"
              </p>
            </div>
          </div>
        </section>

        {/* 4. Quick Facts — Minimal, Chic */}
        <section className="py-8 border-b border-border/40 space-y-4">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-5">Quick Facts</h3>

          <div className="grid grid-cols-2 gap-3">
            {profile.career && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Career</p>
                  <p className="text-sm font-medium">{profile.career}</p>
                </div>
              </div>
            )}
            {profile.education && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Education</p>
                  <p className="text-sm font-medium">{profile.education}</p>
                </div>
              </div>
            )}
          </div>

          {profile.energy && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Energy</p>
                <p className="text-sm font-medium">{profile.energy}</p>
              </div>
            </div>
          )}

          <div className="p-3 rounded-xl bg-muted/40">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Looking For</p>
            <p className="text-sm font-medium">{profile.datingIntent}</p>
          </div>
        </section>

        {/* 5. Green Flags */}
        <section className="py-8 border-b border-border/40">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Green Flags</h3>
          <div className="flex flex-wrap gap-2">
            {profile.greenFlags.map((flag, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-emerald-500/8 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-500/15"
              >
                {flag}
              </span>
            ))}
          </div>
        </section>

        {/* 6. Personality */}
        <section className="py-8 border-b border-border/40">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Personality</h3>
          <div className="flex flex-wrap gap-2">
            {profile.personality.map((trait, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-medium border border-primary/15"
              >
                {trait}
              </span>
            ))}
          </div>
        </section>

        {/* 7. Bio */}
        <section className="py-8">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">About</h3>
          <p className="text-sm leading-relaxed text-foreground/80">{profile.bio}</p>
        </section>
      </div>

      {/* Fixed Like Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Button
            data-testid="button-like-profile"
            onClick={() => setLiked(!liked)}
            className={`flex-1 h-12 rounded-full font-medium text-sm transition-all ${
              liked
                ? "bg-primary text-primary-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
            {liked ? "Liked" : "Like This Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}
