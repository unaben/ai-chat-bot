export type Message = {
  sender: "user" | "bot";
  text: string;
};

export interface UseGeminiReturn {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (input: string) => Promise<void>;
  clearMessages: () => void;
}
