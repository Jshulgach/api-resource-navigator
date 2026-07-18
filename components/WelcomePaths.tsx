"use client";

const paths = [
  {
    title: "I am new to limb loss",
    prompt: "I am new to limb loss and feel overwhelmed. Please help me start with one small next step."
  },
  {
    title: "I am supporting someone",
    prompt: "I am supporting someone affected by limb loss. What is one helpful way to begin?"
  },
  {
    title: "I need practical help",
    prompt: "I need practical help with prosthetics, insurance, financial assistance, or support resources."
  }
];

type WelcomePathsProps = {
  onChoose: (prompt: string) => void;
};

export function WelcomePaths({ onChoose }: WelcomePathsProps) {
  return (
    <section aria-labelledby="welcome-paths-heading">
      <h2 id="welcome-paths-heading" className="text-xl font-bold text-ink">
        Where would you like to start?
      </h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {paths.map((path) => (
          <button
            className="rounded-md border border-slate-200 bg-white px-3 py-3 text-left text-sm font-semibold text-ink shadow-sm transition hover:border-spruce hover:text-spruce"
            key={path.title}
            type="button"
            onClick={() => onChoose(path.prompt)}
          >
            {path.title}
          </button>
        ))}
      </div>
    </section>
  );
}
