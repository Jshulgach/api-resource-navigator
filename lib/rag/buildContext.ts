import type { ResourceWithScore } from "@/types/resource";

export function buildResourceContext(resources: ResourceWithScore[]): string {
  if (resources.length === 0) {
    return "No strong matching resources were found in the current resource library.";
  }

  return resources
    .map((resource, index) => {
      return [
        `RESOURCE ${index + 1}`,
        `Title: ${resource.title}`,
        `Organization: ${resource.organization ?? "Not listed"}`,
        `Category: ${resource.category}`,
        `Summary: ${resource.summary}`,
        `URL: ${resource.url ?? "Not listed"}`,
        `Relevant excerpt: ${resource.summary}`
      ].join("\n");
    })
    .join("\n\n");
}
