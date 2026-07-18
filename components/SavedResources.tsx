"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Resource } from "@/types/resource";

type SavedResourcesContextValue = {
  savedResources: Resource[];
  isSaved: (id: string) => boolean;
  toggleSaved: (resource: Resource) => void;
  removeSaved: (id: string) => void;
  clearSaved: () => void;
};

const SavedResourcesContext = createContext<SavedResourcesContextValue | null>(null);
const storageKey = "navigator-saved-resources";

export function SavedResourcesProvider({ children }: { children: React.ReactNode }) {
  const [savedResources, setSavedResources] = useState<Resource[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        setSavedResources(JSON.parse(stored) as Resource[]);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  function updateSavedResources(nextResources: Resource[]) {
    setSavedResources(nextResources);
    window.localStorage.setItem(storageKey, JSON.stringify(nextResources));
  }

  const value = useMemo<SavedResourcesContextValue>(() => ({
    savedResources,
    isSaved: (id) => savedResources.some((resource) => resource.id === id),
    toggleSaved: (resource) => {
      const nextResources = savedResources.some((saved) => saved.id === resource.id)
        ? savedResources.filter((saved) => saved.id !== resource.id)
        : [...savedResources, resource];
      updateSavedResources(nextResources);
    },
    removeSaved: (id) => updateSavedResources(savedResources.filter((resource) => resource.id !== id)),
    clearSaved: () => updateSavedResources([])
  }), [savedResources]);

  return <SavedResourcesContext.Provider value={value}>{children}</SavedResourcesContext.Provider>;
}

export function useSavedResources() {
  const context = useContext(SavedResourcesContext);
  if (!context) {
    throw new Error("useSavedResources must be used inside SavedResourcesProvider");
  }
  return context;
}

export function SavedResources() {
  const { clearSaved, removeSaved, savedResources } = useSavedResources();

  if (savedResources.length === 0) {
    return null;
  }

  return (
    <aside aria-labelledby="saved-resources-heading" className="rounded-lg border border-skysoft bg-skysoft/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 id="saved-resources-heading" className="text-sm font-bold text-ink">My next steps</h3>
          <p className="mt-1 text-xs leading-5 text-slate-600">Saved only in this browser. Clear them any time.</p>
        </div>
        <button className="text-xs font-semibold text-spruce underline" type="button" onClick={clearSaved}>Clear list</button>
      </div>
      <ul className="mt-3 divide-y divide-white/80">
        {savedResources.map((resource) => (
          <li className="flex items-center justify-between gap-3 py-3 text-sm" key={resource.id}>
            <a className="font-semibold text-spruce underline" href={resource.url} rel="noreferrer" target="_blank">{resource.title}</a>
            <button aria-label={`Remove ${resource.title}`} className="shrink-0 text-xs font-semibold text-slate-600 underline" type="button" onClick={() => removeSaved(resource.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
