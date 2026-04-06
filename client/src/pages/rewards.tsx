import { demoCurrentUser } from "@/lib/demo-data";
import { Sparkles, Zap, Eye, Filter, MessageSquare, Heart, Star, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./browse";

export default function Rewards() {
  const points = demoCurrentUser.points;
  const nextTier = 500;
  const progress = (points / nextTier) * 100;

  const rewards = [
    { icon: Zap, name: "PROFILE BOOST", desc: "Get seen first for 30 minutes", cost: 100, unlocked: true },
    { icon: Eye, name: "SEEN FIRST", desc: "Priority in the browse feed", cost: 150, unlocked: true },
    { icon: Filter, name: "ADVANCED FILTERS", desc: "Filter by values, intentions, energy", cost: 200, unlocked: true },
    { icon: MessageSquare, name: "READ RECEIPTS", desc: "See when your messages are read", cost: 300, unlocked: false },
    { icon: Heart, name: "ANON COMPLIMENT", desc: "Send a kind note anonymously", cost: 350, unlocked: false },
    { icon: Star, name: "EXCLUSIVE ACCESS", desc: "Access curated premium profiles", cost: 500, unlocked: false },
  ];

  const recentActivity = [
    { action: "Match + conversation reply", points: 25, time: "2 hours ago" },
    { action: "Profile liked by Jordan", points: 10, time: "5 hours ago" },
    { action: "Completed a date check-in", points: 50, time: "Yesterday" },
    { action: "Wing Girl referral", points: 100, time: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-[#080808] pb-20 text-[#F5E6C8]">
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4">
          <span className="hw-caps text-xs tracking-[0.3em]">Rewards</span>
          <p className="text-[10px] text-white/20 tracking-wider mt-0.5">Earn by making real connections</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-6">
        {/* Points Card — Cinematic */}
        <div className="relative overflow-hidden border border-white/5 bg-gradient-to-br from-[#0a0000] to-black p-6">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#DC143C]/8 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-[60px]" />
          <div className="absolute inset-0 scanlines" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
              <span className="hw-caps text-[9px] tracking-[0.4em] text-white/30">Your Points</span>
            </div>
            <p className="font-editorial text-5xl font-bold text-[#F5E6C8] mb-5">{points}</p>

            <div className="mb-2">
              <div className="flex items-center justify-between text-[9px] tracking-wider mb-2">
                <span className="text-white/20">Progress to next tier</span>
                <span className="text-[#FFD700]/60">{points}/{nextTier}</span>
              </div>
              <div className="h-1.5 bg-white/5 overflow-hidden">
                <div
                  className="h-full gold-shimmer transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <p className="text-[9px] text-white/15 tracking-wider">
              {nextTier - points} points to Exclusive Access
            </p>
          </div>
        </div>

        {/* How to Earn */}
        <div>
          <p className="hw-caps text-[9px] tracking-[0.4em] text-white/20 mb-3">How to Earn</p>
          <div className="grid grid-cols-2 gap-px bg-white/5">
            {[
              { label: "Match + Reply", pts: "+25" },
              { label: "Date Check-In", pts: "+50" },
              { label: "Refer Wing Girl", pts: "+100" },
              { label: "Profile Liked", pts: "+10" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-black/60 border border-white/5">
                <span className="text-[10px] text-white/40 tracking-wider">{item.label}</span>
                <span className="text-[10px] font-bold text-[#FFD700]/60">{item.pts}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div>
          <p className="hw-caps text-[9px] tracking-[0.4em] text-white/20 mb-3">Rewards</p>
          <div className="space-y-px">
            {rewards.map((reward, i) => {
              const Icon = reward.icon;
              const canAfford = points >= reward.cost;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-4 border border-white/5 transition-colors ${
                    reward.unlocked && canAfford
                      ? "bg-white/2 hover:border-[#DC143C]/15"
                      : "bg-black/40 opacity-40"
                  }`}
                >
                  <div className={`w-9 h-9 border flex items-center justify-center shrink-0 ${
                    reward.unlocked ? "border-[#DC143C]/20 text-[#DC143C]/60" : "border-white/10 text-white/20"
                  }`}>
                    {reward.unlocked ? <Icon className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="hw-caps text-[10px] tracking-[0.15em] text-[#F5E6C8]/70">{reward.name}</p>
                    <p className="text-[9px] text-white/20 tracking-wider">{reward.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-bold text-white/40">{reward.cost}</p>
                    {reward.unlocked && canAfford && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-5 px-1 text-[8px] hw-caps tracking-[0.15em] text-[#DC143C]/60 hover:text-[#DC143C]"
                      >
                        Redeem <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
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
          <p className="hw-caps text-[9px] tracking-[0.4em] text-white/20 mb-3">Activity</p>
          <div className="space-y-px">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 px-1 border-b border-white/3">
                <div>
                  <p className="text-xs text-white/40">{item.action}</p>
                  <p className="text-[9px] text-white/15 tracking-wider">{item.time}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-400/60">+{item.points}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav active="rewards" />
    </div>
  );
}
