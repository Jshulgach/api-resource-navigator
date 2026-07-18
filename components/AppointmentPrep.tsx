"use client";

import { useState } from "react";

const plans = {
  prosthetist: {
    label: "Prosthetist visit",
    questions: [
      "What are the next steps in my fitting or rehabilitation plan?",
      "What should I bring or prepare before the next visit?",
      "Who should I contact if comfort, fit, or skin concerns change?"
    ]
  },
  insurance: {
    label: "Insurance call",
    questions: [
      "What prosthetic and rehabilitation services are covered under my plan?",
      "Do I need prior authorization, a referral, or specific documentation?",
      "What is the next step if a request is delayed or denied?"
    ]
  },
  support: {
    label: "Support conversation",
    questions: [
      "What support options are available for someone in my situation?",
      "Is there a peer group or local program I can contact?",
      "What is one small next step I can take this week?"
    ]
  }
};

type PlanKey = keyof typeof plans;

export function AppointmentPrep() {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null);
  const plan = selectedPlan ? plans[selectedPlan] : null;

  return (
    <section aria-labelledby="appointment-prep-heading" className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 id="appointment-prep-heading" className="text-sm font-bold text-ink">Prepare for a conversation</h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">Choose one situation to make a short question sheet. Nothing from this chat is added to it.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(Object.entries(plans) as [PlanKey, (typeof plans)[PlanKey]][]).map(([key, item]) => (
          <button
            aria-pressed={selectedPlan === key}
            className={`rounded-md border px-3 py-2 text-sm font-semibold ${selectedPlan === key ? "border-spruce bg-skysoft/40 text-spruce" : "border-slate-300 text-slate-700"}`}
            key={key}
            type="button"
            onClick={() => setSelectedPlan(key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {plan ? (
        <div className="appointment-plan mt-4 rounded-md bg-mist p-4" data-print-plan>
          <p className="text-xs font-bold uppercase tracking-wide text-spruce">My preparation sheet</p>
          <h4 className="mt-1 text-base font-bold text-ink">{plan.label}</h4>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
            {plan.questions.map((question) => <li key={question}>{question}</li>)}
          </ol>
          <div className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-600">
            <p className="font-semibold text-ink">Notes</p>
            <div className="mt-2 h-16 border-b border-dashed border-slate-300" />
          </div>
          <button className="no-print mt-4 rounded-md bg-spruce px-3 py-2 text-sm font-semibold text-white" type="button" onClick={() => window.print()}>Print this sheet</button>
        </div>
      ) : null}
    </section>
  );
}
