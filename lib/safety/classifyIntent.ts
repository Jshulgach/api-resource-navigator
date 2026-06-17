import type { IntentCategory } from "@/types/resource";
import { classifyUrgency } from "./classifyUrgency";

const intentRules: Array<{ intent: IntentCategory; terms: string[] }> = [
  { intent: "veterans", terms: ["veteran", " va ", "department of veterans", "military"] },
  { intent: "support_groups", terms: ["support group", "peer support", "community", "group"] },
  { intent: "find_prosthetist", terms: ["prosthetist", "clinic", "certified", "provider", "near me"] },
  { intent: "insurance", terms: ["insurance", "medicare", "medicaid", "coverage", "covered", "claim"] },
  { intent: "financial_assistance", terms: ["afford", "paying", "financial", "cost", "grant", "assistance"] },
  { intent: "caregiver", terms: ["caregiver", "my dad", "my mom", "my child", "family member"] },
  { intent: "pediatric", terms: ["child", "pediatric", "kid", "teen"] },
  { intent: "work_school", terms: ["work", "school", "employment", "job", "vocational"] },
  { intent: "device_purchase", terms: ["buy", "online", "purchase", "used prosthetic"] },
  { intent: "new_amputee", terms: ["just had an amputation", "new to limb loss", "where to start", "new amputee"] }
];

export function classifyIntent(message: string): IntentCategory {
  const urgency = classifyUrgency(message);
  if (urgency.kind === "medical") {
    return "medical_urgent";
  }

  const normalized = ` ${message.toLowerCase()} `;
  const match = intentRules.find((rule) => rule.terms.some((term) => normalized.includes(term)));

  return match?.intent ?? "general_info";
}
