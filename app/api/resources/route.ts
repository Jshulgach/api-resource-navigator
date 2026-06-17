import { NextResponse } from "next/server";
import { seedResources } from "@/lib/resources/seed";
import { retrieveResources } from "@/lib/rag/retrieveResources";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category")?.toLowerCase();
  const state = searchParams.get("state")?.toLowerCase();
  const insuranceType = searchParams.get("insuranceType")?.toLowerCase();
  const population = searchParams.get("population")?.toLowerCase();
  const query = searchParams.get("q")?.toLowerCase();
  const excludedIds = new Set(searchParams.get("exclude")?.split(",").filter(Boolean) ?? []);

  if (query && !category && !state && !insuranceType && !population) {
    const resources = retrieveResources(query).filter((resource) => !excludedIds.has(resource.id));
    return NextResponse.json({ resources });
  }

  const resources = seedResources.filter((resource) => {
    const haystack = [
      resource.title,
      resource.organization,
      resource.category,
      resource.resource_type,
      resource.population,
      resource.geography,
      resource.state,
      resource.insurance_type,
      resource.summary,
      resource.tags.join(" ")
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      (!category || resource.category.toLowerCase() === category) &&
      (!state || resource.state?.toLowerCase() === state || resource.geography?.toLowerCase() === "national") &&
      (!insuranceType || resource.insurance_type?.toLowerCase() === insuranceType) &&
      (!population || resource.population?.toLowerCase() === population) &&
      (!query || query.split(/\s+/).some((term) => term.length > 2 && haystack.includes(term))) &&
      !excludedIds.has(resource.id)
    );
  });

  return NextResponse.json({ resources });
}
