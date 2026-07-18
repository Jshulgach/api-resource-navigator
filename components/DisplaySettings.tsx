"use client";

import { useEffect, useState } from "react";

type DisplayPreferences = {
  textSize: "default" | "large";
  contrast: "default" | "high";
  reducedMotion: boolean;
};

const storageKey = "navigator-display-preferences";
const defaultPreferences: DisplayPreferences = { textSize: "default", contrast: "default", reducedMotion: false };

function applyPreferences(preferences: DisplayPreferences) {
  const root = document.documentElement;
  root.dataset.textSize = preferences.textSize === "default" ? "" : preferences.textSize;
  root.dataset.contrast = preferences.contrast === "default" ? "" : preferences.contrast;
  root.dataset.reducedMotion = preferences.reducedMotion ? "true" : "";
}

export function DisplaySettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<DisplayPreferences>(defaultPreferences);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const nextPreferences = { ...defaultPreferences, ...(JSON.parse(saved) as Partial<DisplayPreferences>) };
        setPreferences(nextPreferences);
        applyPreferences(nextPreferences);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  function updatePreferences(nextPreferences: DisplayPreferences) {
    setPreferences(nextPreferences);
    applyPreferences(nextPreferences);
    window.localStorage.setItem(storageKey, JSON.stringify(nextPreferences));
  }

  return (
    <div className="relative">
      <button aria-expanded={isOpen} className="text-sm font-semibold text-slate-600 transition hover:text-spruce" type="button" onClick={() => setIsOpen((value) => !value)}>Display</button>
      {isOpen ? (
        <div className="absolute right-0 z-20 mt-3 w-72 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-sm font-bold text-ink">Display options</p>
          <div className="mt-3 space-y-3 text-sm text-slate-700">
            <label className="flex items-center justify-between gap-3">
              <span>Larger text</span>
              <input checked={preferences.textSize === "large"} type="checkbox" onChange={(event) => updatePreferences({ ...preferences, textSize: event.target.checked ? "large" : "default" })} />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span>Higher contrast</span>
              <input checked={preferences.contrast === "high"} type="checkbox" onChange={(event) => updatePreferences({ ...preferences, contrast: event.target.checked ? "high" : "default" })} />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span>Reduce motion</span>
              <input checked={preferences.reducedMotion} type="checkbox" onChange={(event) => updatePreferences({ ...preferences, reducedMotion: event.target.checked })} />
            </label>
          </div>
        </div>
      ) : null}
    </div>
  );
}
