"use client";

import { useSavedResources } from "@/components/SavedResources";
import type { Resource, ResourceWithScore } from "@/types/resource";

type ResourceCardProps = {
  resource: Resource | ResourceWithScore;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const { isSaved, toggleSaved } = useSavedResources();
  const saved = isSaved(resource.id);

  return (
    <article className="border-t border-slate-200 py-5 first:border-t-0">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-spruce">
          {resource.category.replaceAll("_", " ")}
        </span>
        {resource.geography ? <span className="text-xs text-slate-500">{resource.geography}</span> : null}
      </div>
      <h3 className="mt-3 text-base font-bold text-ink">{resource.title}</h3>
      {resource.organization ? <p className="mt-1 text-sm text-slate-600">Source: {resource.organization}</p> : null}
      <p className="mt-3 text-sm leading-6 text-slate-700">{resource.summary}</p>
      {resource.last_verified_date ? <p className="mt-3 text-xs text-slate-500">Last reviewed: {new Date(`${resource.last_verified_date}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {resource.url ? (
          <a
            className="rounded-md bg-spruce px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            href={resource.url}
            rel="noreferrer"
            target="_blank"
          >
            Open resource
          </a>
        ) : null}
        {resource.url ? <button className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-spruce transition hover:border-spruce hover:bg-skysoft/30" type="button" onClick={() => toggleSaved(resource)}>{saved ? "Saved" : "Save step"}</button> : null}
        {resource.phone ? <span className="px-3 py-2 text-sm text-slate-700">{resource.phone}</span> : null}
      </div>
    </article>
  );
}
