export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatService {
  name: string;
  chat(messages: ChatMessage[]): Promise<AsyncIterable<string>>;
}
