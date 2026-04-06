import { useState } from "react";
import { useLocation } from "wouter";
import { demoMatches, demoMessages, demoCurrentUser } from "@/lib/demo-data";
import { ArrowLeft, Send, Phone, MoreHorizontal, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "./browse";

export default function Matches() {
  const [, navigate] = useLocation();
  const [activeChat, setActiveChat] = useState<number | null>(null);

  if (activeChat !== null) {
    return <ChatView matchId={activeChat} onBack={() => setActiveChat(null)} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="font-editorial text-xl font-bold">Matches</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Your conversations</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4">
        {demoMatches.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="font-editorial text-lg font-semibold mb-2">No matches yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Keep browsing vetted profiles. When someone you like messages you, they'll appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {demoMatches.map(match => (
              <button
                key={match.id}
                data-testid={`match-${match.id}`}
                onClick={() => setActiveChat(match.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors text-left"
              >
                <div className="relative shrink-0">
                  <img
                    src={match.profile.photoUrls[0]}
                    alt={match.profile.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-border"
                  />
                  {match.unread && (
                    <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className={`text-sm ${match.unread ? "font-bold" : "font-semibold"}`}>
                      {match.profile.name}
                    </h3>
                    <span className="text-[10px] text-muted-foreground">{match.lastMessageTime}</span>
                  </div>
                  <p className={`text-xs truncate ${match.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {match.lastMessage}
                  </p>
                  <Badge variant="secondary" className="mt-1 text-[9px] px-1.5 py-0 bg-primary/8 text-primary border-primary/15">
                    {match.profile.badge}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Pending Likes Preview */}
        <div className="mt-8">
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">
            Waiting for their first message
          </h3>
          <div className="flex gap-3">
            {[3, 4].map(id => {
              const p = demoMatches.find(m => m.profile.id === id)?.profile ||
                        { name: "New Match", photoUrls: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"], badge: "Pending" };
              return (
                <div key={id} className="flex flex-col items-center gap-1.5">
                  <div className="w-16 h-16 rounded-full bg-muted/50 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                    <span className="text-xl text-muted-foreground">?</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Liked</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <BottomNav active="matches" />
    </div>
  );
}

function ChatView({ matchId, onBack }: { matchId: number; onBack: () => void }) {
  const match = demoMatches.find(m => m.id === matchId);
  const [newMsg, setNewMsg] = useState("");
  const [msgs, setMsgs] = useState(demoMessages);

  if (!match) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setMsgs(prev => [...prev, {
      id: prev.length + 1,
      senderId: demoCurrentUser.id,
      content: newMsg,
      time: "Just now",
    }]);
    setNewMsg("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Chat Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            data-testid="button-chat-back"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-muted/40 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <img
            src={match.profile.photoUrls[0]}
            alt=""
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-sm font-semibold">{match.profile.name}</h2>
            <p className="text-[10px] text-muted-foreground">{match.profile.badge}</p>
          </div>
          <button className="w-9 h-9 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Date Safety Tip */}
      <div className="max-w-lg mx-auto w-full px-4 py-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
          <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
          <p className="text-[10px] text-primary/80">
            This profile was vouched by <span className="font-semibold">{match.profile.wingGirlName}</span> ({match.profile.wingGirlRelation})
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-lg mx-auto w-full space-y-3">
        {msgs.map(msg => {
          const isMe = msg.senderId === demoCurrentUser.id;
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMe
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted/60 text-foreground rounded-bl-md"
                }`}
              >
                <p>{msg.content}</p>
                <p className={`text-[10px] mt-1 ${isMe ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-background border-t border-border/50 px-4 py-3">
        <form onSubmit={handleSend} className="max-w-lg mx-auto flex items-center gap-2">
          <Input
            data-testid="input-message"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 h-10 rounded-full bg-muted/40 border-transparent text-sm px-4"
          />
          <Button
            data-testid="button-send"
            type="submit"
            size="icon"
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
