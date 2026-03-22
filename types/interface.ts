import type { Message } from "@/components/Chatbot/Chatbot.types";

export interface UseGeminiReturn {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (input: string) => Promise<void>;
  clearMessages: () => void;
}