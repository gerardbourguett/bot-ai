import Cerebras from "@cerebras/cerebras_cloud_sdk";
import type { ChatService, ChatMessage } from "../types";

const cerebras = new Cerebras();

export const cerebrasService: ChatService = {
  name: "Cerebras",
  async chat(messages: ChatMessage[]) {
    const chatCompletion = await cerebras.chat.completions.create({
      messages: messages as Parameters<
        typeof cerebras.chat.completions.create
      >[0]["messages"],
      model: "zai-glm-4.6",
      temperature: 0.6,
      max_completion_tokens: 40960,
      top_p: 0.95,
      stream: true,
    });

    return (async function* () {
      for await (const chunk of chatCompletion) {
        yield (chunk as any).choices[0]?.delta?.content || "";
      }
    })();
  },
};
