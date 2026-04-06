import { useState } from "react";
import { demoCurrentUser } from "@/lib/demo-data";
import { Settings, Edit3, Shield, Bell, Moon, Sun, ChevronRight, LogOut, Heart, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BottomNav } from "./browse";

export default function MyProfile() {
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const stats = [
    { label: "Likes Given", value: 12, icon: Heart },
    { label: "Matches", value: 3, icon: Users },
    { label: "Points", value: demoCurrentUser.points, icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-editorial text-xl font-bold">Profile</h1>
          <button className="w-9 h-9 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Avatar & Info */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <span className="font-editorial text-3xl font-bold text-primary">
                {demoCurrentUser.name[0]}
              </span>
            </div>
            <button
              data-testid="button-edit-avatar"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="font-editorial text-xl font-bold">{demoCurrentUser.name}</h2>
          <p className="text-sm text-muted-foreground capitalize mt-0.5">
            {demoCurrentUser.role.replace("_", " ")}
          </p>
          {demoCurrentUser.verified && (
            <div className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/15">
              <Shield className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">Verified</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center p-3 rounded-xl bg-card border border-border/40">
              <Icon className="w-4 h-4 text-muted-foreground mx-auto mb-1.5" />
              <p className="font-editorial text-lg font-bold">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 px-1">Preferences</h3>

          <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-4 h-4 text-muted-foreground" /> : <Sun className="w-4 h-4 text-muted-foreground" />}
              <span className="text-sm">Dark Mode</span>
            </div>
            <Switch
              data-testid="switch-dark-mode"
              checked={darkMode}
              onCheckedChange={toggleDark}
            />
          </div>

          <SettingsRow icon={Bell} label="Notifications" />
          <SettingsRow icon={Shield} label="Safety & Privacy" />
          <SettingsRow icon={Edit3} label="Edit Profile" />

          <button className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-destructive/5 transition-colors w-full text-left group">
            <LogOut className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive">Sign Out</span>
          </button>
        </div>
      </main>

      <BottomNav active="profile" />
    </div>
  );
}

function SettingsRow({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="flex items-center justify-between p-3.5 rounded-xl hover:bg-muted/30 transition-colors w-full text-left">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}
