import { useState } from "react";
import { useLocation } from "wouter";
import { demoMatches, demoMessages, demoCurrentUser } from "@/lib/demo-data";
import { ArrowLeft, Send, MoreHorizontal, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BottomNav } from "./browse";

export default function Matches() {
  const [, navigate] = useLocation();
  const [activeChat, setActiveChat] = useState<number | null>(null);

  if (activeChat !== null) {
    return <ChatView matchId={activeChat} onBack={() => setActiveChat(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#080808] pb-20 text-[#F5E6C8]">
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4">
          <span className="hw-caps text-xs tracking-[0.3em]">Matches</span>
          <p className="text-[10px] text-white/20 tracking-wider mt-0.5">Your conversations</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4">
        {demoMatches.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white/20" />
            </div>
            <p className="hw-caps text-xs tracking-[0.2em] text-white/40 mb-2">No matches yet</p>
            <p className="text-xs text-white/20">Keep discovering. They'll appear here.</p>
          </div>
        ) : (
          <div className="space-y-px">
            {demoMatches.map(match => (
              <button
                key={match.id}
                data-testid={`match-${match.id}`}
                onClick={() => setActiveChat(match.id)}
                className="w-full flex items-center gap-3 p-4 bg-white/2 border border-white/5 hover:border-[#DC143C]/15 transition-colors text-left"
              >
                <div className="relative shrink-0">
                  <img
                    src={match.profile.photoUrls[0]}
                    alt={match.profile.name}
                    className="w-12 h-12 object-cover hw-saturate border border-white/10"
                  />
                  {match.unread && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#DC143C] border border-black shadow-[0_0_8px_rgba(220,20,60,0.5)]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className={`text-sm ${match.unread ? "text-[#F5E6C8] font-bold" : "text-[#F5E6C8]/70"}`}>
                      {match.profile.name}
                    </h3>
                    <span className="text-[9px] text-white/20 tracking-wider">{match.lastMessageTime}</span>
                  </div>
                  <p className={`text-xs truncate ${match.unread ? "text-white/50" : "text-white/25"}`}>
                    {match.lastMessage}
                  </p>
                  <span className="inline-block mt-1 text-[8px] hw-caps tracking-[0.2em] text-[#FFD700]/40 border border-[#FFD700]/10 px-1.5 py-0.5">
                    {match.profile.badge}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Pending */}
        <div className="mt-8">
          <p className="hw-caps text-[9px] tracking-[0.3em] text-white/15 mb-3">
            Waiting for first message
          </p>
          <div className="flex gap-3">
            {[1, 2].map(id => (
              <div key={id} className="flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 border border-dashed border-white/10 flex items-center justify-center">
                  <span className="text-lg text-white/10">?</span>
                </div>
                <span className="text-[8px] text-white/15 tracking-wider">LIKED</span>
              </div>
            ))}
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
    <div className="min-h-screen bg-[#080808] flex flex-col text-[#F5E6C8]">
      {/* Chat Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            data-testid="button-chat-back"
            onClick={onBack}
            className="w-9 h-9 border border-white/10 bg-black/40 flex items-center justify-center text-white/50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <img
            src={match.profile.photoUrls[0]}
            alt=""
            className="w-9 h-9 object-cover hw-saturate border border-white/10"
          />
          <div className="flex-1">
            <h2 className="text-sm font-medium">{match.profile.name}</h2>
            <p className="text-[9px] text-white/20 tracking-wider">{match.profile.badge}</p>
          </div>
          <button className="w-9 h-9 border border-white/10 bg-black/40 flex items-center justify-center text-white/30">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Safety Banner */}
      <div className="max-w-lg mx-auto w-full px-4 py-2">
        <div className="flex items-center gap-2 px-3 py-2 border border-[#DC143C]/15 bg-[#DC143C]/5">
          <Shield className="w-3.5 h-3.5 text-[#DC143C]/50 shrink-0" />
          <p className="text-[9px] text-[#DC143C]/50 tracking-wider">
            Vouched by <span className="text-[#DC143C]/70 font-medium">{match.profile.wingGirlName}</span> ({match.profile.wingGirlRelation})
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-lg mx-auto w-full space-y-3">
        {msgs.map(msg => {
          const isMe = msg.senderId === demoCurrentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                  isMe
                    ? "bg-[#DC143C] text-white border border-[#DC143C]/50"
                    : "bg-white/5 text-white/70 border border-white/8"
                }`}
              >
                <p>{msg.content}</p>
                <p className={`text-[9px] mt-1.5 tracking-wider ${isMe ? "text-white/40" : "text-white/20"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-black/90 backdrop-blur-xl border-t border-white/5 px-4 py-3">
        <form onSubmit={handleSend} className="max-w-lg mx-auto flex items-center gap-2">
          <Input
            data-testid="input-message"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="TYPE A MESSAGE..."
            className="flex-1 h-10 rounded-none bg-white/3 border-white/8 text-[#F5E6C8] text-[10px] tracking-[0.1em] px-4 placeholder:text-white/15"
          />
          <Button
            data-testid="button-send"
            type="submit"
            size="icon"
            className="w-10 h-10 rounded-none bg-[#DC143C] text-white border border-[#DC143C]/50 hover:bg-[#FF1744]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
