"use client";

import { useState } from "react";

export function HowItWorks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 text-left"
        type="button"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span>
          <span className="block text-sm font-bold text-ink">How this navigator supports you</span>
          <span className="mt-1 block text-sm text-slate-600">Clear steps, trusted resources, and no pressure to share more than you want.</span>
        </span>
        <span aria-hidden="true" className="text-lg font-semibold text-spruce">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen ? (
        <ol className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-700 sm:grid-cols-3">
          <li><strong className="block text-ink">1. Choose your pace</strong>Start with a path or ask in your own words.</li>
          <li><strong className="block text-ink">2. Get one next step</strong>We keep recommendations practical and source-linked.</li>
          <li><strong className="block text-ink">3. Stay in control</strong>You can correct or stop sharing context at any time.</li>
        </ol>
      ) : null}
    </section>
  );
}
