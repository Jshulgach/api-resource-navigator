import { seedResources } from "@/lib/resources/seed";
import { classifyIntent } from "@/lib/safety/classifyIntent";
import type { Resource, ResourceWithScore } from "@/types/resource";

const broadFallbackIds = new Set([
  "national-limb-loss-resource-center",
  "amputee-coalition-support-group-finder",
  "abc-directory"
]);

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function searchableText(resource: Resource): string {
  return [
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
}

export function retrieveResources(query: string, limit = 4): ResourceWithScore[] {
  const intent = classifyIntent(query);
  const queryTokens = tokenize(query);

  const scored = seedResources.map((resource) => {
    const haystack = searchableText(resource);
    const matchedTerms = queryTokens.filter((token) => haystack.includes(token));
    let relevanceScore = matchedTerms.length;

    if (resource.category === intent) {
      relevanceScore += 8;
    }

    if (intent === "insurance" && resource.insurance_type) {
      relevanceScore += 4;
    }

    if (intent === "general_info" && resource.id === "national-limb-loss-resource-center") {
      relevanceScore += 3;
    }

    relevanceScore += Math.max(0, 4 - (resource.source_priority ?? 3));

    return {
      ...resource,
      relevanceScore,
      matchedTerms
    };
  });

  const strongMatches = scored
    .filter((resource) => resource.relevanceScore >= 3)
    .sort((a, b) => b.relevanceScore - a.relevanceScore || a.title.localeCompare(b.title));

  if (strongMatches.length > 0) {
    return strongMatches.slice(0, limit);
  }

  return scored
    .filter((resource) => broadFallbackIds.has(resource.id))
    .sort((a, b) => (a.source_priority ?? 3) - (b.source_priority ?? 3))
    .slice(0, limit);
}
