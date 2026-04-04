import { describe, expect, it } from "vitest";
import { contactLeadSchema, circuitLeadSchema } from "@/lib/validation/leads";

describe("lead schemas", () => {
  const basePayload = {
    fullName: "Ada Konate",
    email: "ada@example.com",
    phone: "+22790001111",
    message: "Je souhaite obtenir plus d'informations sur les circuits.",
    locale: "fr",
  };

  it("validates contact lead", () => {
    const parsed = contactLeadSchema.parse(basePayload);
    expect(parsed.email).toBe("ada@example.com");
  });

  it("validates circuit lead", () => {
    const parsed = circuitLeadSchema.parse(basePayload);
    expect(parsed.phone).toContain("+227");
  });

  it("rejects invalid email", () => {
    expect(() =>
      contactLeadSchema.parse({
        ...basePayload,
        email: "invalid",
      })
    ).toThrow();
  });
});
