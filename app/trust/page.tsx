export default function TrustPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-slate-800 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">How this navigator earns trust</h1>
      <div className="mt-6 space-y-6 text-sm leading-7">
        <section>
          <h2 className="text-lg font-bold text-ink">What it does</h2>
          <p className="mt-2">This site helps people find public resources related to limb loss, prosthetics, rehabilitation, insurance, peer support, and practical next steps. It is not a medical, legal, insurance, or emergency service.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink">How resources are chosen</h2>
          <p className="mt-2">The current library prioritizes public agencies and established nonprofit or professional organizations. Each resource card identifies its source and the date it was last reviewed. A link should be checked again before relying on it for a time-sensitive decision.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink">Your conversation and privacy</h2>
          <p className="mt-2">The navigator uses session-only context to make the current conversation more coherent. You can review what it understands and start a new conversation at any time. Avoid sharing names, IDs, addresses, or detailed medical information.</p>
        </section>
        <section id="feedback">
          <h2 className="text-lg font-bold text-ink">Suggest a correction</h2>
          <p className="mt-2">We are adding a dedicated correction channel as the resource library grows. Until then, use the organization&apos;s official website to verify a link and refer to the guides and sources page for the design principles behind this prototype.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-ink">What is coming next</h2>
          <p className="mt-2">A reliable local-resource finder and fully reviewed Spanish experience require vetted local data and content review. They will be added only when they can be accurate and maintainable.</p>
        </section>
      </div>
    </main>
  );
}
