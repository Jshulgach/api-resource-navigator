"use client";

import { buildSessionContext } from "@/lib/conversation/sessionContext";
import type { Message } from "ai";

type ContextSummaryProps = {
  messages: Message[];
};

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
      {label}
    </span>
  );
}

export function ContextSummary({ messages }: ContextSummaryProps) {
  const context = buildSessionContext(messages);
  const chips = [
    ...context.roles.map((value) => `Role: ${value}`),
    ...context.populations.map((value) => `Population: ${value}`),
    ...context.insuranceTypes.map((value) => `Insurance: ${value}`),
    ...context.locations.map((value) => `Location: ${value}`),
    ...context.preferences.map((value) => `Preference: ${value}`),
    ...context.topics.map((value) => `Topic: ${value}`)
  ];

  if (chips.length === 0 && context.safetyReminders.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
            What I understand so far
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Session-only context used to keep answers continuous. Avoid sharing names, IDs, or
            exact addresses.
          </p>
        </div>
        {chips.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Chip key={chip} label={chip} />
            ))}
          </div>
        ) : null}
        {context.safetyReminders.length > 0 ? (
          <p className="text-xs leading-5 text-amber-800">
            I noticed possible sensitive information. I will not repeat it; please avoid sharing
            identifiers here.
          </p>
        ) : null}
      </div>
    </aside>
  );
}
