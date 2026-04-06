import { demoCurrentUser } from "@/lib/demo-data";
import { Settings, Edit3, Shield, Bell, ChevronRight, LogOut, Heart, Users, Star } from "lucide-react";
import { BottomNav } from "./browse";

export default function MyProfile() {
  const stats = [
    { label: "LIKES", value: 12, icon: Heart },
    { label: "MATCHES", value: 3, icon: Users },
    { label: "POINTS", value: demoCurrentUser.points, icon: Star },
  ];

  return (
    <div className="min-h-screen bg-[#080808] pb-20 text-[#F5E6C8]">
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <span className="hw-caps text-xs tracking-[0.3em]">Profile</span>
          <button className="w-9 h-9 border border-white/10 bg-black/40 flex items-center justify-center text-white/30">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-8">
        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 border border-[#DC143C]/30 flex items-center justify-center bg-[#DC143C]/5">
              <span className="font-editorial text-3xl font-bold text-[#DC143C]">
                {demoCurrentUser.name[0]}
              </span>
            </div>
            <button
              data-testid="button-edit-avatar"
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#DC143C] text-white flex items-center justify-center border border-[#DC143C]/50 shadow-[0_0_15px_rgba(220,20,60,0.3)]"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="font-editorial text-xl font-bold">{demoCurrentUser.name}</h2>
          <p className="hw-caps text-[9px] tracking-[0.3em] text-white/30 mt-1">
            {demoCurrentUser.role.replace("_", " ")}
          </p>
          {demoCurrentUser.verified && (
            <div className="flex items-center gap-1.5 mt-3 px-3 py-1 border border-emerald-500/20 bg-emerald-500/5">
              <Shield className="w-3 h-3 text-emerald-400/60" />
              <span className="text-[9px] hw-caps tracking-[0.2em] text-emerald-400/60">Verified</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-white/5">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center p-4 bg-black/60 border border-white/5">
              <Icon className="w-4 h-4 text-white/15 mx-auto mb-2" />
              <p className="font-editorial text-xl font-bold text-[#F5E6C8]">{value}</p>
              <p className="hw-caps text-[8px] tracking-[0.2em] text-white/20 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="space-y-px">
          <p className="hw-caps text-[9px] tracking-[0.4em] text-white/15 mb-3 px-1">Settings</p>

          <SettingsRow icon={Bell} label="NOTIFICATIONS" />
          <SettingsRow icon={Shield} label="SAFETY & PRIVACY" />
          <SettingsRow icon={Edit3} label="EDIT PROFILE" />

          <button className="flex items-center gap-3 p-4 border border-white/5 hover:border-[#DC143C]/15 transition-colors w-full text-left bg-white/2 mt-4">
            <LogOut className="w-4 h-4 text-[#DC143C]/50" />
            <span className="hw-caps text-[10px] tracking-[0.15em] text-[#DC143C]/60">Sign Out</span>
          </button>
        </div>
      </main>

      <BottomNav active="profile" />
    </div>
  );
}

function SettingsRow({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="flex items-center justify-between p-4 border border-white/5 hover:border-white/10 transition-colors w-full text-left bg-white/2">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-white/20" />
        <span className="hw-caps text-[10px] tracking-[0.15em] text-white/50">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-white/10" />
    </button>
  );
}
