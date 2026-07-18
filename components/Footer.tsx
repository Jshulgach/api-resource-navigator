export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-600 sm:px-6 md:flex-row md:items-end md:justify-between">
        <p>
          This prototype provides general resource navigation only. It is not medical advice,
          diagnosis, treatment, legal advice, insurance advice, or emergency support.
        </p>
        <nav aria-label="Footer navigation" className="flex shrink-0 flex-wrap gap-x-4 gap-y-2 text-sm">
          <a className="text-spruce underline" href="/terms">Terms of use</a>
          <a className="text-spruce underline" href="/privacy">Privacy</a>
          <a className="text-spruce underline" href="/sources">Guides and sources</a>
        </nav>
      </div>
    </footer>
  );
}
