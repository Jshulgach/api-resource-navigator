import { DisplaySettings } from "@/components/DisplaySettings";
import { ThemeSettings } from "@/components/ThemeSettings";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 border-b border-white/60 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <a aria-label="Accessible Prosthetics Initiative home" className="shrink-0 text-xs font-bold uppercase tracking-wide text-spruce sm:text-sm" href="#top">
          <span className="sm:hidden">API</span>
          <span className="hidden sm:inline">Accessible Prosthetics Initiative</span>
        </a>
        <nav aria-label="Primary navigation" className="flex items-center gap-3 text-xs text-slate-700 sm:gap-4 sm:text-sm">
          <a className="hover:text-spruce" href="#chat">
            Chat
          </a>
          <a className="hover:text-spruce" href="#resources">
            Resources
          </a>
          <DisplaySettings />
          <ThemeSettings />
        </nav>
      </div>
    </header>
  );
}
