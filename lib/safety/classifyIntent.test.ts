import { describe, expect, test } from "vitest";
import { classifyIntent } from "./classifyIntent";

describe("classifyIntent", () => {
  test.each([
    ["I just had an amputation and do not know where to start", "new_amputee"],
    ["How do I find a prosthetist near me?", "find_prosthetist"],
    ["Will Medicare cover a prosthetic leg?", "insurance"],
    ["I need help paying for a prosthesis", "financial_assistance"],
    ["Where can I find a support group?", "support_groups"],
    ["I am a veteran and need prosthetic care", "veterans"],
    ["I am a caregiver for my dad", "caregiver"],
    ["Can I buy a prosthetic online?", "device_purchase"]
  ] as const)("classifies %s", (message, expected) => {
    expect(classifyIntent(message)).toBe(expected);
  });
});
