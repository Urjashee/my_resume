import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESPONSES = {
  experience: "Urjashee is a Senior AI & Full Stack Engineer with over 12 years of experience. She has worked as a Technical Lead at Simpalm and founded Northeast Software Technologies. She specializes in Python, Node.js, AWS, and AI architectures.",
  projects: "She has built many robust applications! Some highlights include an AI-powered Health Consultation app, a Job Search AI, and enterprise platforms like KAH and ATLAS. You can view her open-source work by clicking 'Open Source' in the navigation.",
  skills: "Her core stack includes Python, Node.js, TypeScript, React, and AWS. She's also highly experienced with AI integrations (LLMs, LangChain), Docker, Kubernetes, and database design.",
  contact: "You can reach her via email or LinkedIn using the links in the Contact section at the bottom of the page! She's always open to discussing new opportunities.",
  default: "Hi! I'm Urjashee's AI assistant. I don't have an LLM brain yet, but I can answer questions about her experience, projects, skills, or how to contact her. What would you like to know?"
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: RESPONSES.default }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate thinking delay
    setTimeout(() => {
      const lowerInput = userMessage.text.toLowerCase();
      let botResponse = RESPONSES.default;

      if (lowerInput.includes("experience") || lowerInput.includes("work") || lowerInput.includes("job")) {
        botResponse = RESPONSES.experience;
      } else if (lowerInput.includes("project") || lowerInput.includes("github") || lowerInput.includes("build")) {
        botResponse = RESPONSES.projects;
      } else if (lowerInput.includes("skill") || lowerInput.includes("tech") || lowerInput.includes("stack")) {
        botResponse = RESPONSES.skills;
      } else if (lowerInput.includes("contact") || lowerInput.includes("hire") || lowerInput.includes("email")) {
        botResponse = RESPONSES.contact;
      } else if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
        botResponse = "Hello! Ask me about Urjashee's skills, projects, or experience.";
      }

      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] transition-all"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] z-50 flex flex-col glass-card rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Urjashee's AI</h3>
                  <p className="text-xs text-muted-foreground">Ask me anything!</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-primary text-white rounded-tr-sm" 
                        : "bg-white/10 text-foreground rounded-tl-sm border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/20 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
              <Button type="submit" size="icon" className="rounded-full bg-primary shrink-0 w-10 h-10">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
