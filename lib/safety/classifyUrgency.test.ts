import { describe, expect, test } from "vitest";
import { classifyUrgency } from "./classifyUrgency";

describe("classifyUrgency", () => {
  test("flags urgent residual limb symptoms", () => {
    const result = classifyUrgency("My residual limb has spreading redness, drainage, and severe pain.");

    expect(result.isUrgent).toBe(true);
    expect(result.kind).toBe("medical");
    expect(result.matchedTerms).toEqual(
      expect.arrayContaining(["spreading redness", "drainage", "severe pain"])
    );
  });

  test("flags crisis language separately from medical urgency", () => {
    const result = classifyUrgency("I can't go on and I want to die.");

    expect(result.isUrgent).toBe(true);
    expect(result.kind).toBe("crisis");
    expect(result.matchedTerms).toEqual(expect.arrayContaining(["i can't go on", "i want to die"]));
  });

  test("does not flag ordinary resource questions", () => {
    const result = classifyUrgency("How can I find a support group?");

    expect(result.isUrgent).toBe(false);
    expect(result.kind).toBe("none");
    expect(result.matchedTerms).toEqual([]);
  });
});
