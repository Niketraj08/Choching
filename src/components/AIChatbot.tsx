import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, Sparkles } from "lucide-react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Hello! I am SK Coaching AI, your intelligent academic support advisor. Ask me anything about admission deadlines, scholar tests, Class 8-12 syllabi, or doubt clearing!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact SK Coaching AI server");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.content }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { 
          sender: "bot", 
          text: "I am having trouble reaching the SK Coaching core system right now. However, admissions are actively open and you can reach our administrative counselors at counselor@skcoaching.edu or WhatsApp +91 98765 43210!" 
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2.5">
      
      {/* AI Chatbot Float Dialog */}
      {isOpen ? (
        <div className="w-[285px] xs:w-[310px] sm:w-[330px] h-[380px] sm:h-[410px] rounded-2xl glass-panel-heavy border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-revealUp bg-white dark:bg-slate-950">
          
          {/* Header */}
          <div className="p-3 bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white relative">
                <Bot className="w-4 h-4" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold tracking-tight text-white">SK Coaching Support</h4>
                <div className="flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
                  <span className="text-[8px] text-amber-100 font-medium font-mono uppercase tracking-wider">AI Counselor Active</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages list */}
          <div 
            ref={scrollRef}
            className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-50/50 dark:bg-slate-900/40"
          >
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex gap-2 max-w-[88%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] ${msg.sender === "user" ? "bg-primary text-slate-950 font-bold" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}>
                  {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`p-2.5 rounded-xl text-[11px] line-clamp-none ${msg.sender === "user" ? "bg-primary text-slate-950 font-semibold rounded-tr-none" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-800 rounded-tl-none shadow-sm"}`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 max-w-[88%] mr-auto">
                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px]">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-2 bg-white dark:bg-slate-800 text-slate-500 rounded-xl rounded-tl-none border border-slate-200/50 dark:border-slate-800 shadow-sm flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input form */}
          <form 
            onSubmit={handleSend}
            className="p-2 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-850 flex gap-1.5 shrink-0"
          >
            <input
              type="text"
              placeholder="Type message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-100 dark:bg-slate-900 border-none outline-none text-[11px] rounded-lg px-2.5 py-2 text-slate-800 dark:text-white"
            />
            <button 
              type="submit"
              className="w-8 h-8 bg-primary hover:bg-yellow-400 text-slate-950 rounded-lg flex items-center justify-center shadow active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </form>

        </div>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
            setHasUnread(false);
          }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group relative cursor-pointer"
          title="Talk with SK Coaching AI Academic Helper"
        >
          <MessageSquare className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:scale-105 transition-transform" />
          {hasUnread && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-bounce">1</span>
          )}
        </button>
      )}

    </div>
  );
}
