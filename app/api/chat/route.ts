import { streamText, type CoreMessage } from "ai";
import { getChatModel } from "@/lib/ai/model";
import { buildResourceContext } from "@/lib/rag/buildContext";
import { retrieveResources } from "@/lib/rag/retrieveResources";
import { resourceNavigatorSystemPrompt } from "@/lib/prompts/resource-navigator";
import { classifyUrgency } from "@/lib/safety/classifyUrgency";
import { buildSessionContext, formatSessionContext } from "@/lib/conversation/sessionContext";

type ChatRequestBody = {
  messages?: CoreMessage[];
};

function latestUserMessage(messages: CoreMessage[]): string {
  const latest = [...messages].reverse().find((message) => message.role === "user");
  if (!latest) {
    return "";
  }

  if (typeof latest.content === "string") {
    return latest.content;
  }

  return latest.content
    .map((part) => ("text" in part ? part.text : ""))
    .join(" ")
    .trim();
}

function urgencyInstruction(kind: ReturnType<typeof classifyUrgency>["kind"]) {
  if (kind === "crisis") {
    return "The user may be describing self-harm or suicidal thoughts. Respond first with immediate crisis support language. Encourage contacting emergency services if they are in immediate danger, and in the U.S. mention calling or texting 988 for the Suicide & Crisis Lifeline. Do not continue with ordinary resource navigation until safety is addressed.";
  }

  if (kind === "medical") {
    return "The user may be describing urgent symptoms. Say you cannot evaluate symptoms or diagnose what is happening, and advise contacting their clinician, urgent care, or emergency services right away for symptoms such as spreading redness, fever, drainage, sudden swelling, or severe pain.";
  }

  return "";
}

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      {
        error:
          "GROQ_API_KEY is not configured. Add it to your server environment to enable live chat responses."
      },
      { status: 500 }
    );
  }

  const body = (await request.json()) as ChatRequestBody;
  const messages = body.messages ?? [];
  const userMessage = latestUserMessage(messages);
  const urgency = classifyUrgency(userMessage);
  const resources = retrieveResources(userMessage);
  const context = buildResourceContext(resources);
  const sessionContext = formatSessionContext(buildSessionContext(messages));

  const result = streamText({
    model: getChatModel(),
    system: [
      resourceNavigatorSystemPrompt,
      `SAFE SESSION CONTEXT:\n${sessionContext}`,
      "Answer using the provided resource context when making specific recommendations. Include source links for recommended resources.",
      "Use the safe session context to sound continuous and personal. Briefly acknowledge relevant facts the user already shared, but do not repeat or store sensitive identifiers.",
      "Ask at most one clarifying question at a time, and only when it would materially improve the next step.",
      "Avoid repeating the same resource recommendation unless it is directly relevant to the user's latest question.",
      "If there is not a strong matching resource, say: I don't have a strong matching resource in the current library yet. The closest starting points are...",
      urgencyInstruction(urgency.kind),
      `RESOURCE CONTEXT:\n${context}`
    ]
      .filter(Boolean)
      .join("\n\n"),
    messages
  });

  return result.toDataStreamResponse();
}
