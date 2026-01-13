import { GoogleGenAI } from "@google/genai";
import type { ChatService, ChatMessage } from "../types";

const ai = new GoogleGenAI({});

export const geminiService: ChatService = {
  name: "Gemini",
  async chat(messages: ChatMessage[]) {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: messages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : msg.role,
        parts: [{ text: msg.content }],
      })),
    });

    return (async function* () {
      for await (const chunk of response) {
        yield (chunk as any).text() || "";
      }
    })();
  },
};
