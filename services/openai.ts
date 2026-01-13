import { OpenAI } from "openai";
import type { ChatService, ChatMessage } from "../types";

const client = new OpenAI();

export const openaiService: ChatService = {
  name: "OpenAI",
  async chat(messages: ChatMessage[]) {
    const stream = await client.chat.completions.create({
      model: "gpt-4o",
      messages,
      stream: true,
    });

    return (async function* () {
      for await (const chunk of stream) {
        yield chunk.choices[0]?.delta?.content || "";
      }
    })();
  },
};
