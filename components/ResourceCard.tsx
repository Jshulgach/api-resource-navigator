import type { Resource, ResourceWithScore } from "@/types/resource";

type ResourceCardProps = {
  resource: Resource | ResourceWithScore;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-skysoft px-2.5 py-1 text-xs font-semibold uppercase text-spruce">
          {resource.category.replaceAll("_", " ")}
        </span>
        {resource.geography ? <span className="text-xs text-slate-500">{resource.geography}</span> : null}
      </div>
      <h3 className="mt-3 text-base font-bold text-ink">{resource.title}</h3>
      {resource.organization ? <p className="mt-1 text-sm text-slate-600">{resource.organization}</p> : null}
      <p className="mt-3 text-sm leading-6 text-slate-700">{resource.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {resource.url ? (
          <a
            className="rounded-md bg-spruce px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
            href={resource.url}
            rel="noreferrer"
            target="_blank"
          >
            Open resource
          </a>
        ) : null}
        {resource.phone ? <span className="px-3 py-2 text-sm text-slate-700">{resource.phone}</span> : null}
      </div>
    </article>
  );
}
