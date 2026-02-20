import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("filters falsy values", () => {
    expect(cn("a", undefined, "b", false, "c")).toBe("a b c");
  });

  it("returns empty string when all falsy", () => {
    expect(cn(undefined, false, "")).toBe("");
  });
});
