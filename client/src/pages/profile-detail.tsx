import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { demoProfiles } from "@/lib/demo-data";
import { ArrowLeft, Heart, Music, MapPin, Briefcase, GraduationCap, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileDetail() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [liked, setLiked] = useState(false);

  const profile = demoProfiles.find(p => p.id === Number(params.id));

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white/30">
        Profile not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] pb-24 text-[#F5E6C8]">
      {/* 1. COVER — Full-bleed cinematic hero */}
      <section className="relative h-[90vh] min-h-[550px] max-h-[750px] overflow-hidden letterbox vignette">
        <img
          src={profile.photoUrls[0]}
          alt={profile.name}
          className="w-full h-full object-cover hw-image slow-zoom"
        />
        {/* Heavy cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 z-[2]" />
        {/* Red color wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#DC143C]/15 via-transparent to-[#FFD700]/5 z-[2] mix-blend-overlay" />
        {/* Scanlines */}
        <div className="absolute inset-0 scanlines" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 z-[10] flex items-center justify-between">
          <button
            data-testid="button-back"
            onClick={() => navigate("/browse")}
            className="w-10 h-10 border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Badge */}
        <div className="absolute top-16 left-4 z-[10]">
          <span className="hw-caps text-[8px] tracking-[0.3em] text-[#FFD700] bg-black/60 backdrop-blur-md px-3 py-1.5 border border-[#FFD700]/20">
            {profile.badge}
          </span>
        </div>

        {/* Bottom hero info */}
        <div className="absolute bottom-[10%] left-0 right-0 px-6 z-[10]">
          {profile.tagline && (
            <p className="hw-caps text-[9px] tracking-[0.5em] text-[#FFD700]/60 mb-3">
              {profile.tagline}
            </p>
          )}
          <h1 className="font-editorial text-5xl sm:text-6xl font-bold text-white mb-1" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
            {profile.name}
          </h1>
          <div className="flex items-center gap-3 text-white/40 text-sm">
            <span className="font-editorial text-2xl font-light text-white/60">{profile.age}</span>
            <span className="text-white/10">|</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="text-xs tracking-wider">{profile.city}</span>
            </div>
          </div>

          {/* Song */}
          {profile.songTitle && (
            <div className="mt-5 flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/8 px-4 py-2.5 w-fit">
              <Music className="w-3.5 h-3.5 text-[#DC143C]/60" />
              <div className="flex gap-[2.5px] items-end h-4">
                {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.3, 0.6, 0.9].map((h, i) => (
                  <div
                    key={i}
                    className="w-[2px] bg-[#DC143C]/50 rounded-full waveform-bar"
                    style={{ height: `${h * 16}px`, animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
              <div className="text-[10px] tracking-wider">
                <span className="text-white/60">{profile.songTitle}</span>
                <span className="mx-1 text-white/10">·</span>
                <span className="text-white/30">{profile.songArtist}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-lg mx-auto px-4">
        {/* 2. WING GIRL NOTE — Pull quote editorial */}
        <section className="py-10 border-b border-white/5">
          <p className="hw-caps text-[9px] tracking-[0.4em] text-[#DC143C] mb-6">Wing Girl Note</p>
          <blockquote className="font-editorial text-xl sm:text-2xl italic text-white/70 leading-relaxed mb-6 pl-4 border-l-2 border-[#DC143C]/30">
            "{profile.wingGirlNote}"
          </blockquote>
          <div className="flex items-center gap-3 pl-4">
            <div className="w-8 h-8 border border-[#DC143C]/30 flex items-center justify-center">
              <span className="text-xs font-bold text-[#DC143C]">{profile.wingGirlName?.[0]}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#F5E6C8]/80">{profile.wingGirlName}</p>
              <p className="text-[10px] text-white/30 capitalize tracking-wider">{profile.wingGirlRelation}</p>
            </div>
          </div>
        </section>

        {/* 3. VISUAL SPREAD — Zine layout */}
        <section className="py-10 border-b border-white/5">
          <div className="grid grid-cols-2 gap-1">
            <div className="row-span-2 overflow-hidden grain-overlay vignette">
              <img src={profile.photoUrls[1]} alt="" className="w-full h-full object-cover hw-image" />
            </div>
            <div className="overflow-hidden aspect-square grain-overlay vignette">
              <img src={profile.photoUrls[2]} alt="" className="w-full h-full object-cover hw-image" />
            </div>
            <div className="aspect-square bg-[#DC143C]/10 border border-[#DC143C]/20 flex items-center justify-center p-4 relative">
              <div className="absolute inset-0 scanlines" />
              <p className="font-editorial text-lg font-bold text-[#F5E6C8] text-center italic relative z-10">
                "{profile.energy}"
              </p>
            </div>
          </div>
        </section>

        {/* 4. QUICK FACTS */}
        <section className="py-10 border-b border-white/5">
          <p className="hw-caps text-[9px] tracking-[0.4em] text-white/20 mb-6">Quick Facts</p>

          <div className="grid grid-cols-2 gap-1">
            {profile.career && (
              <div className="bg-white/3 border border-white/5 p-4">
                <Briefcase className="w-4 h-4 text-white/20 mb-2" />
                <p className="hw-caps text-[8px] tracking-[0.2em] text-white/20 mb-1">Career</p>
                <p className="text-sm text-[#F5E6C8]/80">{profile.career}</p>
              </div>
            )}
            {profile.education && (
              <div className="bg-white/3 border border-white/5 p-4">
                <GraduationCap className="w-4 h-4 text-white/20 mb-2" />
                <p className="hw-caps text-[8px] tracking-[0.2em] text-white/20 mb-1">Education</p>
                <p className="text-sm text-[#F5E6C8]/80">{profile.education}</p>
              </div>
            )}
          </div>

          {profile.energy && (
            <div className="bg-white/3 border border-white/5 p-4 mt-1">
              <Zap className="w-4 h-4 text-[#FFD700]/40 mb-2" />
              <p className="hw-caps text-[8px] tracking-[0.2em] text-white/20 mb-1">Energy</p>
              <p className="text-sm text-[#F5E6C8]/80">{profile.energy}</p>
            </div>
          )}

          <div className="bg-white/3 border border-white/5 p-4 mt-1">
            <p className="hw-caps text-[8px] tracking-[0.2em] text-white/20 mb-1">Looking For</p>
            <p className="text-sm text-[#F5E6C8]/80">{profile.datingIntent}</p>
          </div>
        </section>

        {/* 5. GREEN FLAGS */}
        <section className="py-10 border-b border-white/5">
          <p className="hw-caps text-[9px] tracking-[0.4em] text-white/20 mb-4">Green Flags</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.greenFlags.map((flag, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-[9px] hw-caps tracking-[0.1em] border border-emerald-500/20 text-emerald-400/60 bg-emerald-500/5"
              >
                {flag}
              </span>
            ))}
          </div>
        </section>

        {/* 6. PERSONALITY */}
        <section className="py-10 border-b border-white/5">
          <p className="hw-caps text-[9px] tracking-[0.4em] text-white/20 mb-4">Personality</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.personality.map((trait, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-[9px] hw-caps tracking-[0.1em] border border-[#DC143C]/20 text-[#DC143C]/60 bg-[#DC143C]/5"
              >
                {trait}
              </span>
            ))}
          </div>
        </section>

        {/* 7. BIO */}
        <section className="py-10">
          <p className="hw-caps text-[9px] tracking-[0.4em] text-white/20 mb-4">About</p>
          <p className="text-sm leading-relaxed text-white/40">{profile.bio}</p>
        </section>
      </div>

      {/* Fixed Like Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/5 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <Button
            data-testid="button-like-profile"
            onClick={() => setLiked(!liked)}
            className={`w-full h-12 rounded-none text-[10px] hw-caps tracking-[0.2em] font-medium transition-all border ${
              liked
                ? "bg-[#DC143C] border-[#DC143C] text-white shadow-[0_0_30px_rgba(220,20,60,0.4)]"
                : "bg-[#DC143C] border-[#DC143C]/50 text-white hover:bg-[#FF1744] hover:shadow-[0_0_30px_rgba(220,20,60,0.3)]"
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
