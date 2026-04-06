import { useState } from "react";
import { useLocation } from "wouter";
import { demoProfiles, demoCurrentUser } from "@/lib/demo-data";
import { Heart, MessageCircle, Trophy, Search, SlidersHorizontal, Home, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.datingIntent.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-editorial text-xl font-bold">Discover</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-xs font-medium">
                <Sparkles className="w-3 h-3 text-accent" />
                <span>{demoCurrentUser.points} pts</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-testid="input-search"
              placeholder="Filter by city, name, or intent..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9 pr-10 h-9 rounded-full bg-muted/50 border-transparent text-sm placeholder:text-muted-foreground/60"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <SlidersHorizontal className="w-3 h-3" />
            </button>
          </div>
        </div>
      </header>

      {/* Profile Feed */}
      <main className="max-w-lg mx-auto px-4 py-4 space-y-5">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {filteredProfiles.length} vetted profiles near you
        </p>

        {filteredProfiles.map((profile, index) => (
          <article
            key={profile.id}
            data-testid={`card-profile-${profile.id}`}
            onClick={() => navigate(`/profile/${profile.id}`)}
            className="group relative bg-card rounded-2xl border border-border/50 overflow-hidden cursor-pointer transition-all hover:border-border profile-enter"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Hero Image */}
            <div className="relative aspect-[4/5] overflow-hidden grain-overlay">
              <img
                src={profile.photoUrls[0]}
                alt={profile.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[2]" />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-[3]">
                <Badge
                  variant="secondary"
                  className="bg-white/15 backdrop-blur-md text-white border-white/20 text-[10px] font-medium tracking-wide uppercase px-2.5 py-1"
                >
                  {profile.badge}
                </Badge>
              </div>

              {/* Like button */}
              <button
                data-testid={`button-like-${profile.id}`}
                onClick={(e) => handleLike(profile.id, e)}
                className={`absolute top-4 right-4 z-[3] w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  likedIds.has(profile.id)
                    ? "bg-primary text-white scale-110"
                    : "bg-white/15 backdrop-blur-md text-white hover:bg-white/25"
                } ${animatingId === profile.id ? "animate-bounce" : ""}`}
              >
                <Heart className={`w-4.5 h-4.5 ${likedIds.has(profile.id) ? "fill-current" : ""}`} />
              </button>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-[3]">
                <div className="flex items-end justify-between">
                  <div>
                    {profile.tagline && (
                      <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] mb-1">
                        {profile.tagline}
                      </p>
                    )}
                    <h2 className="font-editorial text-2xl font-bold text-white mb-0.5">
                      {profile.name}, {profile.age}
                    </h2>
                    <p className="text-white/70 text-xs">{profile.city}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/50 font-medium">{profile.datingIntent}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Wing Girl Note */}
            <div className="p-5 border-t border-border/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">{profile.wingGirlName?.[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    <span className="font-semibold text-foreground">{profile.wingGirlName}</span>
                    {" · "}
                    <span className="capitalize">{profile.wingGirlRelation}</span>
                  </p>
                  <p className="font-editorial text-sm italic text-foreground/80 leading-relaxed line-clamp-2">
                    "{profile.wingGirlNote}"
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Tags */}
            <div className="px-5 pb-4 flex flex-wrap gap-1.5">
              {profile.greenFlags.slice(0, 3).map((flag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-emerald-500/8 text-emerald-700 dark:text-emerald-400 text-[10px] font-medium border border-emerald-500/15"
                >
                  {flag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </main>

      {/* Bottom Nav */}
      <BottomNav active="browse" />
    </div>
  );
}

export function BottomNav({ active }: { active: string }) {
  const [, navigate] = useLocation();

  const tabs = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "browse", icon: Search, label: "Discover", path: "/browse" },
    { id: "matches", icon: MessageCircle, label: "Matches", path: "/matches" },
    { id: "rewards", icon: Trophy, label: "Rewards", path: "/rewards" },
    { id: "profile", icon: User, label: "Profile", path: "/me" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {tabs.map(({ id, icon: Icon, label, path }) => (
          <button
            key={id}
            data-testid={`nav-${id}`}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
              active === id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
