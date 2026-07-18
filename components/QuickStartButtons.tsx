"use client";

const quickPrompts = [
  "How do I find a prosthetist near me?",
  "Will insurance cover a prosthetic device?",
  "I need help paying for a prosthesis.",
  "Where can I find a support group?",
  "I am a veteran. What resources are available?",
  "I am a caregiver. What should I know?",
  "Can I buy a prosthetic online?"
];

type QuickStartButtonsProps = {
  onSelect: (prompt: string) => void;
};

export function QuickStartButtons({ onSelect }: QuickStartButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3" aria-label="Common questions">
      {quickPrompts.map((prompt) => (
        <button
          className="rounded-full border border-slate-300 bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:border-spruce hover:text-spruce"
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
