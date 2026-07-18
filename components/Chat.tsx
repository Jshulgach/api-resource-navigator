"use client";

import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ChatMessage } from "@/components/ChatMessage";
import { AppointmentPrep } from "@/components/AppointmentPrep";
import { ContextSummary } from "@/components/ContextSummary";
import { QuickStartButtons } from "@/components/QuickStartButtons";
import { ResourceCard } from "@/components/ResourceCard";
import { SavedResources } from "@/components/SavedResources";
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
  const [showCommonQuestions, setShowCommonQuestions] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const seenResourceIds = useRef<Set<string>>(new Set());
  const { messages, input, handleInputChange, handleSubmit, append, isLoading, error, setInput, setMessages } = useChat({
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

  function startOver() {
    setMessages([]);
    setInput("");
    setResources([]);
    seenResourceIds.current.clear();
    setShowCommonQuestions(false);
    setShowContext(false);
  }

  return (
    <section id="chat" className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-5">
        {messages.length === 0 ? <WelcomePaths onChoose={submitPrompt} /> : null}

        {messages.length === 0 ? (
          <div>
            <button className="text-sm font-semibold text-spruce underline" type="button" onClick={() => setShowCommonQuestions((value) => !value)}>
              {showCommonQuestions ? "Hide common questions" : "See common questions"}
            </button>
            {showCommonQuestions ? <div className="mt-3"><QuickStartButtons onSelect={submitPrompt} /></div> : null}
          </div>
        ) : null}

        {messages.length > 0 ? (
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <button className="font-semibold text-spruce underline" type="button" onClick={() => setShowContext((value) => !value)}>{showContext ? "Hide what I remember" : "What I remember"}</button>
            <button className="font-semibold text-spruce underline" type="button" onClick={startOver}>Start a new conversation</button>
          </div>
        ) : null}

        {messages.length > 0 && showContext ? <ContextSummary messages={messages} /> : null}

        {messages.length > 0 || isLoading ? (
          <div className="min-h-[180px] space-y-3 rounded-lg bg-mist p-3" aria-live="polite">
            {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
          {isLoading ? <p className="text-sm text-slate-600">Writing a careful answer...</p> : null}
          </div>
        ) : null}

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

        <SavedResources />

        {messages.length > 0 ? <AppointmentPrep /> : null}

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
            placeholder="Or write what is on your mind..."
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-slate-500">Keep it general - no names, ID numbers, or exact addresses.</p>
            <button
              className="rounded-md bg-spruce px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-400"
              disabled={isLoading}
              type="submit"
            >
              Send question
            </button>
          </div>
        </form>

        {messages.length > 0 ? <div className="flex gap-2 text-sm">
          <button className="rounded-md border border-slate-300 px-3 py-2 text-slate-700" type="button">
            Helpful
          </button>
          <button className="rounded-md border border-slate-300 px-3 py-2 text-slate-700" type="button">
            Not helpful
          </button>
          <a className="px-3 py-2 text-spruce underline" href="/trust#feedback">
            Report a resource concern
          </a>
        </div> : null}
      </div>
    </section>
  );
}
