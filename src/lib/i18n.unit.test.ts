import { describe, expect, it } from "vitest";
import { getLocalizedText } from "@/lib/i18n";

describe("getLocalizedText", () => {
  it("returns locale value when available", () => {
    const value = { fr: "Bonjour", en: "Hello", ha: "Sannu" };
    expect(getLocalizedText(value, "en")).toBe("Hello");
  });

  it("falls back to french when locale key is missing", () => {
    const value = { fr: "Bonjour", en: "Hello" };
    expect(getLocalizedText(value, "ha")).toBe("Bonjour");
  });

  it("returns empty string when invalid payload", () => {
    expect(getLocalizedText(null, "fr")).toBe("");
  });
});
