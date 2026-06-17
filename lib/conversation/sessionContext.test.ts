import { describe, expect, test } from "vitest";
import type { CoreMessage } from "ai";
import { buildSessionContext, formatSessionContext } from "./sessionContext";

describe("sessionContext", () => {
  test("summarizes safe conversational facts across turns", () => {
    const messages: CoreMessage[] = [
      { role: "user", content: "I am a veteran and a caregiver for my dad." },
      { role: "assistant", content: "I can help with VA and caregiver resources." },
      { role: "user", content: "He has Medicare and we live in Ohio. I prefer step by step." }
    ];

    const context = buildSessionContext(messages);

    expect(context.roles).toEqual(expect.arrayContaining(["caregiver"]));
    expect(context.populations).toEqual(expect.arrayContaining(["veteran"]));
    expect(context.insuranceTypes).toEqual(expect.arrayContaining(["Medicare"]));
    expect(context.locations).toEqual(expect.arrayContaining(["Ohio"]));
    expect(context.preferences).toEqual(expect.arrayContaining(["step-by-step guidance"]));
  });

  test("does not retain sensitive personal identifiers", () => {
    const messages: CoreMessage[] = [
      {
        role: "user",
        content:
          "My name is Jane Smith, my insurance ID is ABC123, my address is 123 Main Street, and I need help."
      }
    ];

    const context = buildSessionContext(messages);
    const formatted = formatSessionContext(context);

    expect(formatted).not.toContain("Jane");
    expect(formatted).not.toContain("ABC123");
    expect(formatted).not.toContain("123 Main");
    expect(context.safetyReminders).toContain("User shared possible sensitive personal information; do not repeat it and remind them not to share identifiers.");
  });

  test("detects insurance terms next to punctuation", () => {
    const context = buildSessionContext([
      { role: "user", content: "I have Medicare. What should I do next?" }
    ]);

    expect(context.insuranceTypes).toEqual(expect.arrayContaining(["Medicare"]));
  });

  test("formats an empty context as no prior safe context", () => {
    expect(formatSessionContext(buildSessionContext([]))).toBe(
      "No prior safe session context has been established yet."
    );
  });
});
