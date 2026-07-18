"use client";

const paths = [
  {
    title: "I am new to limb loss",
    description: "Start with one manageable next step.",
    prompt: "I am new to limb loss and feel overwhelmed. Please help me start with one small next step."
  },
  {
    title: "I am supporting someone",
    description: "Find guidance for a family member, friend, or patient.",
    prompt: "I am supporting someone affected by limb loss. What is one helpful way to begin?"
  },
  {
    title: "I need practical help",
    description: "Explore care, coverage, financial, or community support.",
    prompt: "I need practical help with prosthetics, insurance, financial assistance, or support resources."
  }
];

type WelcomePathsProps = {
  onChoose: (prompt: string) => void;
};

export function WelcomePaths({ onChoose }: WelcomePathsProps) {
  return (
    <section aria-labelledby="welcome-paths-heading" className="rounded-lg border border-teal-100 bg-teal-50/70 p-4">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-wide text-spruce">Start where you are</p>
        <h2 id="welcome-paths-heading" className="mt-1 text-xl font-bold text-ink">
          You do not have to figure this out alone.
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Choose a starting point, share only what feels comfortable, and we will take this one step at a time.
        </p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {paths.map((path) => (
          <button
            className="group rounded-lg border border-white bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-spruce hover:shadow-md"
            key={path.title}
            type="button"
            onClick={() => onChoose(path.prompt)}
          >
            <span className="text-sm font-bold text-ink group-hover:text-spruce">{path.title}</span>
            <span className="mt-2 block text-sm leading-5 text-slate-600">{path.description}</span>
            <span className="mt-4 block text-sm font-semibold text-spruce">Begin here</span>
          </button>
        ))}
      </div>
    </section>
  );
}
