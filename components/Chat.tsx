"use client";

import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ChatMessage } from "@/components/ChatMessage";
import { ContextSummary } from "@/components/ContextSummary";
import { HowItWorks } from "@/components/HowItWorks";
import { QuickStartButtons } from "@/components/QuickStartButtons";
import { ResourceCard } from "@/components/ResourceCard";
import { WelcomePaths } from "@/components/WelcomePaths";
import type { ResourceWithScore } from "@/types/resource";

async function fetchResourceCards(prompt: string, excludedIds: string[]) {
  const params = new URLSearchParams({ q: prompt });
  if (excludedIds.length > 0) {
    params.set("exclude", excludedIds.join(","));
  }

  const response = await fetch(`/api/resources?${params.toString()}`);
  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as { resources: ResourceWithScore[] };
  return data.resources.slice(0, 4);
}

export function Chat() {
  const [resources, setResources] = useState<ResourceWithScore[]>([]);
  const seenResourceIds = useRef<Set<string>>(new Set());
  const { messages, input, handleInputChange, handleSubmit, append, isLoading, error } = useChat({
    api: "/api/chat"
  });

  async function submitPrompt(prompt: string) {
    const nextResources = await fetchResourceCards(prompt, Array.from(seenResourceIds.current));
    nextResources.forEach((resource) => seenResourceIds.current.add(resource.id));
    setResources(nextResources);
    await append({ role: "user", content: prompt });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt) {
      return;
    }

    const nextResources = await fetchResourceCards(prompt, Array.from(seenResourceIds.current));
    nextResources.forEach((resource) => seenResourceIds.current.add(resource.id));
    setResources(nextResources);
    handleSubmit(event);
  }

  return (
    <section id="chat" className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold text-ink">Ask the resource navigator</h2>
          <p className="mt-1 text-sm text-slate-600">
            Ask about prosthetics, amputation care, insurance, support groups, financial help, or
            trusted resources.
          </p>
        </div>

        {messages.length === 0 ? <WelcomePaths onChoose={submitPrompt} /> : null}

        <QuickStartButtons onSelect={submitPrompt} />

        <ContextSummary messages={messages} />

        <div className="min-h-[340px] space-y-3 rounded-lg bg-mist p-3" aria-live="polite">
          {messages.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-600">
              <p className="font-semibold text-ink">We can begin with one small next step.</p>
              <p className="mt-2">Choose a path above, select a topic, or write in your own words. You never need to tell your whole story here.</p>
            </div>
          ) : (
            messages.map((message) => <ChatMessage key={message.id} message={message} />)
          )}
          {isLoading ? <p className="text-sm text-slate-600">Writing a careful answer...</p> : null}
        </div>

        {resources.length > 0 ? (
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
              Relevant resources
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            The chat service could not respond. Check the server environment and try again.
          </div>
        ) : null}

        <form className="space-y-3" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="chat-input">
            Ask a resource question
          </label>
          <textarea
            id="chat-input"
            className="min-h-24 w-full resize-y rounded-lg border border-slate-300 bg-white p-3 text-sm leading-6 text-ink shadow-sm"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about prosthetics, amputation care, insurance, support groups, financial help, or trusted resources..."
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-slate-500">
              Avoid entering names, addresses, insurance IDs, medical record numbers, or photos.
            </p>
            <button
              className="rounded-md bg-spruce px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              disabled={isLoading}
              type="submit"
            >
              Send question
            </button>
          </div>
        </form>

        <HowItWorks />

        <div className="flex gap-2 text-sm">
          <button className="rounded-md border border-slate-300 px-3 py-2 text-slate-700" type="button">
            Helpful
          </button>
          <button className="rounded-md border border-slate-300 px-3 py-2 text-slate-700" type="button">
            Not helpful
          </button>
          <a className="px-3 py-2 text-spruce underline" href="mailto:info@example.org">
            Report an issue
          </a>
        </div>
      </div>
    </section>
  );
}
