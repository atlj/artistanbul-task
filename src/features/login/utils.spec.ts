import { describe, expect, it } from "vitest";
import { validateUsername } from "./utils";

describe("Login utils", () => {
  it("should not validate an empty username", () => {
    expect(validateUsername("")).toBe(false);
  });

  it("should validate a non-empty username", () => {
    expect(validateUsername("username")).toBe(true);
  });
});
