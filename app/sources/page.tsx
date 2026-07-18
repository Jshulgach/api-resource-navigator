const sources = [
  ["SAMHSA: Trauma-Informed Care", "https://www.samhsa.gov/mental-health/trauma-violence/trauma-informed-care"],
  ["WHO: Psychological First Aid Guide", "https://www.who.int/publications-detail-redirect/9789241548205"],
  ["U.S. Web Design System: Progress Easily", "https://designsystem.digital.gov/patterns/complete-a-complex-form/progress-easily/"],
  ["Healthy People 2030: Health Communication", "https://odphp.health.gov/healthypeople/objectives-and-data/browse-objectives/health-communication"]
];

export default function SourcesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-slate-800 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">Guides and sources</h1>
      <p className="mt-4 text-sm leading-7">These public resources help shape the navigator&apos;s trauma-informed, plain-language approach. They do not replace professional medical or mental-health care.</p>
      <ul className="mt-6 space-y-3">
        {sources.map(([title, url]) => (
          <li key={url}>
            <a className="text-sm font-semibold text-spruce underline" href={url} rel="noreferrer" target="_blank">{title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
