import { demoCurrentUser } from "@/lib/demo-data";
import { Sparkles, Zap, Eye, Filter, MessageSquare, Heart, Star, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BottomNav } from "./browse";

export default function Rewards() {
  const points = demoCurrentUser.points;
  const nextTier = 500;
  const progress = (points / nextTier) * 100;

  const rewards = [
    { icon: Zap, name: "Profile Boost", desc: "Get seen first for 30 minutes", cost: 100, unlocked: true },
    { icon: Eye, name: "Seen First", desc: "Priority in the browse feed", cost: 150, unlocked: true },
    { icon: Filter, name: "Advanced Filters", desc: "Filter by values, intentions, energy", cost: 200, unlocked: true },
    { icon: MessageSquare, name: "Read Receipts", desc: "See when your messages are read", cost: 300, unlocked: false },
    { icon: Heart, name: "Anonymous Compliment", desc: "Send a kind note without revealing yourself", cost: 350, unlocked: false },
    { icon: Star, name: "Exclusive Profiles", desc: "Access curated premium profiles", cost: 500, unlocked: false },
  ];

  const recentActivity = [
    { action: "Match + conversation reply", points: 25, time: "2 hours ago" },
    { action: "Profile liked by Jordan", points: 10, time: "5 hours ago" },
    { action: "Completed a date check-in", points: 50, time: "Yesterday" },
    { action: "Wing Girl referral", points: 100, time: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="font-editorial text-xl font-bold">Rewards</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Earn by making real connections</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 space-y-6">
        {/* Points Card */}
        <div className="relative rounded-2xl overflow-hidden bg-sidebar text-sidebar-foreground p-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">Your Points</span>
            </div>
            <p className="font-editorial text-4xl font-bold mb-4">{points}</p>

            <div className="mb-2">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-sidebar-foreground/60">Progress to next tier</span>
                <span className="font-medium">{points}/{nextTier}</span>
              </div>
              <div className="h-2 rounded-full bg-sidebar-foreground/10 overflow-hidden">
                <div
                  className="h-full rounded-full gold-shimmer transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <p className="text-[10px] text-sidebar-foreground/40">
              {nextTier - points} points to unlock Exclusive Profiles
            </p>
          </div>
        </div>

        {/* How to Earn */}
        <div>
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">How to Earn</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Match + Reply", pts: "+25" },
              { label: "Date Check-In", pts: "+50" },
              { label: "Refer a Wing Girl", pts: "+100" },
              { label: "Profile Liked", pts: "+10" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/40">
                <span className="text-xs text-foreground/80">{item.label}</span>
                <span className="text-xs font-bold text-accent">{item.pts}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Rewards */}
        <div>
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">Rewards</h3>
          <div className="space-y-2">
            {rewards.map((reward, i) => {
              const Icon = reward.icon;
              const canAfford = points >= reward.cost;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-colors ${
                    reward.unlocked && canAfford
                      ? "bg-card border-border/50 hover:border-border"
                      : "bg-muted/20 border-border/30 opacity-60"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    reward.unlocked ? "bg-primary/10 text-primary" : "bg-muted/40 text-muted-foreground"
                  }`}>
                    {reward.unlocked ? <Icon className="w-4.5 h-4.5" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{reward.name}</p>
                    <p className="text-[10px] text-muted-foreground">{reward.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold">{reward.cost} pts</p>
                    {reward.unlocked && canAfford && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-[10px] text-primary hover:text-primary font-medium"
                      >
                        Redeem <ChevronRight className="w-3 h-3 ml-0.5" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">Recent Activity</h3>
          <div className="space-y-1">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 px-1">
                <div>
                  <p className="text-sm">{item.action}</p>
                  <p className="text-[10px] text-muted-foreground">{item.time}</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+{item.points}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav active="rewards" />
    </div>
  );
}
