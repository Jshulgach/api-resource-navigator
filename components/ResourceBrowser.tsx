"use client";

import { useEffect, useMemo, useState } from "react";
import { ResourceCard } from "@/components/ResourceCard";
import type { Resource } from "@/types/resource";

const categories = [
  ["", "All categories"],
  ["general_navigation", "General navigation"],
  ["find_prosthetist", "Find a prosthetist"],
  ["insurance", "Insurance"],
  ["support_groups", "Support groups"],
  ["veterans", "Veterans"],
  ["financial_assistance", "Financial assistance"],
  ["employment_support", "Work and school"]
];

export function ResourceBrowser() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

  const url = useMemo(() => {
    const params = new URLSearchParams();
    if (category) {
      params.set("category", category);
    }
    if (query) {
      params.set("q", query);
    }

    return `/api/resources?${params.toString()}`;
  }, [category, query]);

  useEffect(() => {
    let isCurrent = true;
    fetch(url)
      .then((response) => response.json())
      .then((data: { resources: Resource[] }) => {
        if (isCurrent) {
          setResources(data.resources);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [url]);

  return (
    <section id="resources" className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-ink">Browse trusted starting points</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          These are the national resources seeded into the first prototype. More local and
          state-specific resources can be added as the library grows.
        </p>
      </div>

      <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-[220px_1fr]">
        <label className="text-sm font-semibold text-slate-700">
          Category
          <select
            className="mt-1 w-full rounded-md border border-slate-300 bg-white p-2 text-sm"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Search
          <input
            className="mt-1 w-full rounded-md border border-slate-300 bg-white p-2 text-sm"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by topic, organization, insurance, or need"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
