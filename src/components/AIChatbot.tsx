import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, Sparkles, MessageCircle } from "lucide-react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Hello! I am SK Coaching AI, your intelligent academic support advisor. Ask me anything about admission deadlines, scholar tests, Class 8-12 syllabi, or doubt clearing!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3.5">
      
      {/* WhatsApp Floating Trigger */}
      <a
        href="https://wa.me/919876543210?text=Hi%20SK%20Coaching!%20I%2520am%2520interested%2520in%2520learning%2520more%2520about%2520your%2520coaching%2520classes."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        title="Direct Support on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
      </a>

      {/* AI Chatbot Float Dialog */}
      {isOpen ? (
        <div className="w-[340px] sm:w-[380px] h-[480px] rounded-2xl glass-panel-heavy border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-revealUp">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white relative">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-tight">SK Coaching Academic Support</h4>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                  <span className="text-[10px] text-amber-100 font-medium font-mono uppercase tracking-wider">AI Counselor Active</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-900/40"
          >
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex gap-2.5 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs ${msg.sender === "user" ? "bg-primary text-slate-950 font-bold" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}>
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-xl text-xs line-clamp-none ${msg.sender === "user" ? "bg-primary text-slate-950 font-semibold rounded-tr-none" : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-800 rounded-tl-none shadow-sm"}`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto">
                <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 text-slate-500 rounded-xl rounded-tl-none border border-slate-200/50 dark:border-slate-800 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input form */}
          <form 
            onSubmit={handleSend}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/60 flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask BrightPath AI support..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-100 dark:bg-slate-800 border-none outline-none text-xs rounded-xl px-3.5 py-2.5 text-slate-800 dark:text-white"
            />
            <button 
              type="submit"
              className="w-10 h-10 bg-primary hover:bg-yellow-400 text-slate-950 rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-xl shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group relative cursor-pointer"
          title="Talk with BrightPath AI Academic Helper"
        >
          <MessageSquare className="w-6 h-6 group-hover:scale-105 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">1</span>
        </button>
      )}

    </div>
  );
}
