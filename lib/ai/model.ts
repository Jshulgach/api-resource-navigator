import { createGroq } from "@ai-sdk/groq";

export function getChatModel() {
  const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY
  });

  return groq(process.env.GROQ_MODEL || "llama-3.1-8b-instant");
}
