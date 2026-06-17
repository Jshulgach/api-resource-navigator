import type { UrgencyClassification } from "@/types/resource";

const crisisTerms = ["suicidal thoughts", "self-harm", "i want to die", "i can't go on"];

const medicalTerms = [
  "fever",
  "spreading redness",
  "infection",
  "pus",
  "drainage",
  "wound opening",
  "severe pain",
  "sudden swelling",
  "chest pain",
  "trouble breathing",
  "fall with injury"
];

export function classifyUrgency(message: string): UrgencyClassification {
  const normalized = message.toLowerCase();
  const matchedCrisis = crisisTerms.filter((term) => normalized.includes(term));

  if (matchedCrisis.length > 0) {
    return {
      isUrgent: true,
      kind: "crisis",
      matchedTerms: matchedCrisis
    };
  }

  const matchedMedical = medicalTerms.filter((term) => normalized.includes(term));

  if (matchedMedical.length > 0) {
    return {
      isUrgent: true,
      kind: "medical",
      matchedTerms: matchedMedical
    };
  }

  return {
    isUrgent: false,
    kind: "none",
    matchedTerms: []
  };
}
