import { useState, useCallback, useRef } from "react";
import type {
  Message,
  UseGeminiReturn,
} from "@/components/Chatbot/Chatbot.types";
import useSessionStorage from "./useSessionStorage";

const useGemini = (): UseGeminiReturn => {
  const [messages, setMessages] = useSessionStorage<Message[]>("chat", []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  const sendMessage = useCallback(async (input: string) => {
    if (!input.trim() || loadingRef.current) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setError(null);
    loadingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const { text } = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => setMessages([]), []);

  return { messages, loading, error, sendMessage, clearMessages };
};

export default useGemini;
