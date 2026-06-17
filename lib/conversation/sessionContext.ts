export type SessionContext = {
  roles: string[];
  populations: string[];
  insuranceTypes: string[];
  locations: string[];
  preferences: string[];
  topics: string[];
  safetyReminders: string[];
};

type ConversationMessage = {
  role: string;
  content: unknown;
};

const stateNames = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

const sensitivePatterns = [
  /\bmy name is\b/i,
  /\binsurance id\b/i,
  /\bmember id\b/i,
  /\bmedical record\b/i,
  /\bclaim number\b/i,
  /\baddress is\b/i,
  /\b\d{1,6}\s+[a-z0-9\s]+(?:street|st\.|avenue|ave\.|road|rd\.|drive|dr\.)\b/i
];

function uniquePush(target: string[], value: string) {
  if (!target.includes(value)) {
    target.push(value);
  }
}

function messageText(message: ConversationMessage): string {
  if (typeof message.content === "string") {
    return message.content;
  }

  if (Array.isArray(message.content)) {
    return message.content
      .map((part) => {
        if (part && typeof part === "object" && "text" in part && typeof part.text === "string") {
          return part.text;
        }
        return "";
      })
      .join(" ")
      .trim();
  }

  return "";
}

export function buildSessionContext(messages: ConversationMessage[]): SessionContext {
  const context: SessionContext = {
    roles: [],
    populations: [],
    insuranceTypes: [],
    locations: [],
    preferences: [],
    topics: [],
    safetyReminders: []
  };

  for (const message of messages) {
    if (message.role !== "user") {
      continue;
    }

    const text = messageText(message);
    const normalized = ` ${text.toLowerCase()} `;

    if (sensitivePatterns.some((pattern) => pattern.test(text))) {
      uniquePush(
        context.safetyReminders,
        "User shared possible sensitive personal information; do not repeat it and remind them not to share identifiers."
      );
    }

    if (normalized.includes(" caregiver ") || normalized.includes(" caring for ")) {
      uniquePush(context.roles, "caregiver");
    }
    if (normalized.includes(" clinician ") || normalized.includes(" therapist ")) {
      uniquePush(context.roles, "clinician");
    }
    if (normalized.includes(" patient ") || normalized.includes(" for myself ")) {
      uniquePush(context.roles, "person seeking resources");
    }

    if (normalized.includes(" veteran ") || normalized.includes(" va ")) {
      uniquePush(context.populations, "veteran");
    }
    if (normalized.includes(" child ") || normalized.includes(" pediatric ") || normalized.includes(" teen ")) {
      uniquePush(context.populations, "pediatric");
    }
    if (normalized.includes(" new to limb loss ") || normalized.includes(" just had an amputation ")) {
      uniquePush(context.topics, "new limb loss");
    }

    if (/\bmedicare\b/.test(normalized)) {
      uniquePush(context.insuranceTypes, "Medicare");
    }
    if (/\bmedicaid\b/.test(normalized)) {
      uniquePush(context.insuranceTypes, "Medicaid");
    }
    if (/\bprivate insurance\b/.test(normalized)) {
      uniquePush(context.insuranceTypes, "private insurance");
    }
    if (/\bno insurance\b/.test(normalized) || /\buninsured\b/.test(normalized)) {
      uniquePush(context.insuranceTypes, "uninsured");
    }

    for (const state of stateNames) {
      const statePattern = new RegExp(`\\b${state.toLowerCase()}\\b`);
      if (statePattern.test(normalized)) {
        uniquePush(context.locations, state);
      }
    }
    const zipMatch = normalized.match(/\b\d{5}\b/);
    if (zipMatch) {
      uniquePush(context.locations, `ZIP ${zipMatch[0]}`);
    }

    if (/\bstep by step\b/.test(normalized) || /\bstep-by-step\b/.test(normalized)) {
      uniquePush(context.preferences, "step-by-step guidance");
    }
    if (normalized.includes(" short answer ") || normalized.includes(" keep it short ")) {
      uniquePush(context.preferences, "brief answers");
    }
    if (normalized.includes(" spanish ") || normalized.includes(" en español ")) {
      uniquePush(context.preferences, "Spanish language support");
    }
  }

  return context;
}

export function formatSessionContext(context: SessionContext): string {
  const lines: string[] = [];

  if (context.roles.length > 0) {
    lines.push(`User role or perspective: ${context.roles.join(", ")}`);
  }
  if (context.populations.length > 0) {
    lines.push(`Relevant population: ${context.populations.join(", ")}`);
  }
  if (context.insuranceTypes.length > 0) {
    lines.push(`Insurance context: ${context.insuranceTypes.join(", ")}`);
  }
  if (context.locations.length > 0) {
    lines.push(`Location context: ${context.locations.join(", ")}`);
  }
  if (context.preferences.length > 0) {
    lines.push(`Communication preferences: ${context.preferences.join(", ")}`);
  }
  if (context.topics.length > 0) {
    lines.push(`Known topics: ${context.topics.join(", ")}`);
  }
  if (context.safetyReminders.length > 0) {
    lines.push(`Safety reminders: ${context.safetyReminders.join(" ")}`);
  }

  return lines.length > 0 ? lines.join("\n") : "No prior safe session context has been established yet.";
}
