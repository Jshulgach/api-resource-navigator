import { describe, expect, test } from "vitest";
import { retrieveResources } from "./retrieveResources";

describe("retrieveResources", () => {
  test("finds Medicare coverage information for insurance questions", () => {
    const matches = retrieveResources("Will Medicare cover a prosthetic leg?");

    expect(matches[0]?.title).toBe("Medicare Prosthetic Device Coverage");
  });

  test("finds the ABC directory for prosthetist searches", () => {
    const matches = retrieveResources("How do I find a certified prosthetist?");

    expect(matches[0]?.title).toBe("ABC Directory");
  });

  test("finds veteran resources for VA questions", () => {
    const matches = retrieveResources("I am a veteran and need prosthetic care from the VA.");

    expect(matches[0]?.title).toBe("VA Prosthetic and Sensory Aids Service");
  });

  test("returns broad trusted resources when no strong match exists", () => {
    const matches = retrieveResources("I have a very unusual question about travel hobbies.");

    expect(matches.length).toBeGreaterThan(0);
    expect(matches.some((resource) => resource.title === "National Limb Loss Resource Center")).toBe(true);
  });
});
