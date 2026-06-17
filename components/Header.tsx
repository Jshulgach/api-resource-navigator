export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a className="text-sm font-bold uppercase tracking-wide text-spruce" href="#">
          Accessible Prosthetics Initiative
        </a>
        <nav aria-label="Primary navigation" className="flex items-center gap-4 text-sm text-slate-700">
          <a className="hover:text-spruce" href="#chat">
            Chat
          </a>
          <a className="hover:text-spruce" href="#resources">
            Resources
          </a>
        </nav>
      </div>
    </header>
  );
}
