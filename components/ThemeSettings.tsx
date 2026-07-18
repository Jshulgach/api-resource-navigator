"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "default", label: "Red, silver, white", colors: ["#7e1d29", "#e5e7eb", "#ffffff"] },
  { id: "meadow", label: "Meadow", colors: ["#33684c", "#b3464b", "#dbeddb"] },
  { id: "harbor", label: "Harbor", colors: ["#2a5b80", "#b6525b", "#dcebf7"] }
];

type ThemeId = (typeof themes)[number]["id"];

export function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [theme, setTheme] = useState<ThemeId>("default");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("navigator-theme") as ThemeId | null;
    if (savedTheme && themes.some((candidate) => candidate.id === savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme === "default" ? "" : savedTheme;
    }
  }, []);

  function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== "1234") {
      setHasError(true);
      return;
    }
    setHasError(false);
    setIsUnlocked(true);
    setPassword("");
  }

  function chooseTheme(nextTheme: ThemeId) {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme === "default" ? "" : nextTheme;
    window.localStorage.setItem("navigator-theme", nextTheme);
  }

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        className="text-sm font-semibold text-slate-600 transition hover:text-spruce"
        type="button"
        onClick={() => setIsOpen((value) => !value)}
      >
        Preview
      </button>
      {isOpen ? (
        <div className="absolute right-0 z-20 mt-3 w-72 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
          {!isUnlocked ? (
            <form className="space-y-3" onSubmit={unlock}>
              <div>
                <p className="text-sm font-bold text-ink">Theme preview</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">Enter the preview passcode to adjust this browser&apos;s color theme.</p>
              </div>
              <label className="block text-sm font-semibold text-slate-700" htmlFor="theme-password">
                Passcode
                <input
                  autoFocus
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  id="theme-password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setHasError(false);
                  }}
                  type="password"
                  value={password}
                />
              </label>
              {hasError ? <p className="text-xs text-red-700">That passcode did not match.</p> : null}
              <button className="rounded-md bg-spruce px-3 py-2 text-sm font-semibold text-white" type="submit">Open previews</button>
            </form>
          ) : (
            <div>
              <p className="text-sm font-bold text-ink">Theme preview</p>
              <div className="mt-3 space-y-2">
                {themes.map((candidate) => (
                  <button
                    aria-pressed={theme === candidate.id}
                    className="flex w-full items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-left text-sm font-semibold text-ink transition hover:border-spruce"
                    key={candidate.id}
                    type="button"
                    onClick={() => chooseTheme(candidate.id)}
                  >
                    {candidate.label}
                    <span aria-hidden="true" className="flex gap-1">
                      {candidate.colors.map((color) => <span className="h-3 w-3 rounded-full" key={color} style={{ backgroundColor: color }} />)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
