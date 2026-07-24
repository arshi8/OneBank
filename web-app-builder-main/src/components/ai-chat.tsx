import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAIInsight } from "@/lib/ai-chat";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I am your AI Insights assistant. What would you like me to analyze today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await getAIInsight({
        data: {
          prompt: userMessage.content,
          history: messages.slice(1).map(m => ({ role: m.role, content: m.content }))
        }
      });

      if (result.success && result.response) {
        setMessages(prev => [...prev, { role: "assistant", content: result.response as string }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: `Error: ${result.error}` }]);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered a network error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex h-[500px] flex-col border-border bg-card shadow-card">
      <div className="flex items-center gap-2 border-b border-border/60 p-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">AI Assistant</h3>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="flex flex-col gap-4 pb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`max-w-[80%] rounded-lg p-3 text-sm overflow-x-auto ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50"}`}>
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&>h1]:text-lg [&>h1]:font-bold [&>h2]:font-bold [&>h2]:text-base [&>h3]:font-semibold">
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center rounded-lg bg-muted/50 p-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSend} className="flex gap-2 border-t border-border/60 p-4">
        <Input
          placeholder="Ask for an architectural insight..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={!input.trim() || isLoading} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
