import { useState } from "react";
import { useLocation } from "wouter";
import { demoProfiles, demoCurrentUser } from "@/lib/demo-data";
import { Heart, MessageCircle, Trophy, Search, Home, User, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Browse() {
  const [, navigate] = useLocation();
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [filter, setFilter] = useState("");

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedIds.has(id)) return;
    setAnimatingId(id);
    setTimeout(() => {
      setLikedIds(prev => new Set(prev).add(id));
      setAnimatingId(null);
    }, 400);
  };

  const filteredProfiles = demoProfiles.filter(p =>
    !filter || p.city.toLowerCase().includes(filter.toLowerCase()) ||
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080808] pb-20 text-[#F5E6C8]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <span className="hw-caps text-xs tracking-[0.3em]">Discover</span>
            <div className="flex items-center gap-1.5 px-3 py-1 border border-[#FFD700]/20 bg-[#FFD700]/5 text-[10px] hw-caps tracking-[0.15em] text-[#FFD700]">
              <Sparkles className="w-3 h-3" />
              <span>{demoCurrentUser.points}</span>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
            <Input
              data-testid="input-search"
              placeholder="SEARCH..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9 h-9 rounded-none bg-white/3 border-white/8 text-[#F5E6C8] text-[10px] tracking-[0.15em] placeholder:text-white/15 focus:border-[#DC143C]/30"
            />
          </div>
        </div>
      </header>

      {/* Feed */}
      <main className="max-w-lg mx-auto px-4 py-5 space-y-6">
        <p className="hw-caps text-[9px] tracking-[0.4em] text-white/20">
          {filteredProfiles.length} Vetted Profiles
        </p>

        {filteredProfiles.map((profile, index) => (
          <article
            key={profile.id}
            data-testid={`card-profile-${profile.id}`}
            onClick={() => navigate(`/profile/${profile.id}`)}
            className="group relative bg-black border border-white/5 overflow-hidden cursor-pointer transition-all hover:border-[#DC143C]/20 profile-enter"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            {/* Hero Image — Cinematic */}
            <div className="relative aspect-[3/4] overflow-hidden vignette">
              <img
                src={profile.photoUrls[0]}
                alt={profile.name}
                className="w-full h-full object-cover hw-image slow-zoom"
              />
              {/* Heavy gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[2]" />
              {/* Red wash */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#DC143C]/10 via-transparent to-transparent z-[2] mix-blend-overlay" />
              {/* Scanlines */}
              <div className="absolute inset-0 scanlines" />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-[6]">
                <span className="hw-caps text-[8px] tracking-[0.3em] text-[#FFD700] bg-black/60 backdrop-blur-md px-3 py-1.5 border border-[#FFD700]/20">
                  {profile.badge}
                </span>
              </div>

              {/* Like button */}
              <button
                data-testid={`button-like-${profile.id}`}
                onClick={(e) => handleLike(profile.id, e)}
                className={`absolute top-4 right-4 z-[6] w-10 h-10 flex items-center justify-center transition-all border ${
                  likedIds.has(profile.id)
                    ? "bg-[#DC143C] border-[#DC143C] text-white shadow-[0_0_20px_rgba(220,20,60,0.5)]"
                    : "bg-black/40 backdrop-blur-md border-white/10 text-white/60 hover:border-[#DC143C]/50 hover:text-[#DC143C]"
                } ${animatingId === profile.id ? "scale-125" : ""}`}
              >
                <Heart className={`w-4 h-4 ${likedIds.has(profile.id) ? "fill-current" : ""}`} />
              </button>

              {/* Bottom info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-[6]">
                {profile.tagline && (
                  <p className="hw-caps text-[8px] tracking-[0.4em] text-[#FFD700]/70 mb-1">
                    {profile.tagline}
                  </p>
                )}
                <h2 className="font-editorial text-3xl font-bold text-white mb-0.5">
                  {profile.name}, <span className="font-light">{profile.age}</span>
                </h2>
                <p className="text-[10px] tracking-wider text-white/40">{profile.city}</p>

                {/* Song bar */}
                {profile.songTitle && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex gap-[2px] items-end h-3">
                      {[0.4, 0.7, 1, 0.6, 0.9, 0.5].map((h, i) => (
                        <div
                          key={i}
                          className="w-[2px] bg-[#DC143C]/60 rounded-full waveform-bar"
                          style={{ height: `${h * 12}px`, animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] text-white/30 tracking-wider">
                      {profile.songArtist}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Wing Girl Quote */}
            <div className="p-5 border-t border-white/5 bg-black/60">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 border border-[#DC143C]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-[#DC143C]">{profile.wingGirlName?.[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-white/30 mb-1">
                    <span className="text-[#F5E6C8]/60 font-medium">{profile.wingGirlName}</span>
                    <span className="mx-1.5 text-white/10">·</span>
                    <span className="capitalize">{profile.wingGirlRelation}</span>
                  </p>
                  <p className="font-editorial text-sm italic text-white/50 leading-relaxed line-clamp-2">
                    "{profile.wingGirlNote}"
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="px-5 pb-4 flex flex-wrap gap-1.5">
              {profile.greenFlags.slice(0, 3).map((flag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[9px] hw-caps tracking-[0.1em] border border-white/8 text-white/30 bg-white/2"
                >
                  {flag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </main>

      <BottomNav active="browse" />
    </div>
  );
}

export function BottomNav({ active }: { active: string }) {
  const [, navigate] = useLocation();

  const tabs = [
    { id: "home", icon: Home, label: "HOME", path: "/" },
    { id: "browse", icon: Search, label: "DISCOVER", path: "/browse" },
    { id: "matches", icon: MessageCircle, label: "MATCHES", path: "/matches" },
    { id: "rewards", icon: Trophy, label: "REWARDS", path: "/rewards" },
    { id: "profile", icon: User, label: "PROFILE", path: "/me" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/5">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {tabs.map(({ id, icon: Icon, label, path }) => (
          <button
            key={id}
            data-testid={`nav-${id}`}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${
              active === id
                ? "text-[#DC143C]"
                : "text-white/20 hover:text-white/40"
            }`}
          >
            <Icon className="w-4.5 h-4.5" />
            <span className="text-[8px] tracking-[0.15em] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
