export type IntentCategory =
  | "new_amputee"
  | "find_prosthetist"
  | "insurance"
  | "financial_assistance"
  | "support_groups"
  | "veterans"
  | "caregiver"
  | "pediatric"
  | "work_school"
  | "device_purchase"
  | "medical_urgent"
  | "general_info"
  | "unknown";

export type UrgencyKind = "none" | "medical" | "crisis";

export type UrgencyClassification = {
  isUrgent: boolean;
  kind: UrgencyKind;
  matchedTerms: string[];
};

export type Resource = {
  id: string;
  title: string;
  organization?: string;
  category: string;
  resource_type?: string;
  population?: string;
  geography?: string;
  state?: string;
  insurance_type?: string;
  summary: string;
  url?: string;
  phone?: string;
  tags: string[];
  source_priority?: number;
  last_verified_date?: string;
};

export type ResourceWithScore = Resource & {
  relevanceScore: number;
  matchedTerms: string[];
};
