// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/leads/contact/route";

const createMock = vi.fn();
const notifyMock = vi.fn();

vi.mock("@/lib/prisma", () => ({
  prisma: {
    lead: {
      create: (...args: unknown[]) => createMock(...args),
    },
  },
}));

vi.mock("@/lib/email", () => ({
  sendLeadNotification: (...args: unknown[]) => notifyMock(...args),
}));

describe("POST /api/leads/contact", () => {
  beforeEach(() => {
    createMock.mockReset();
    notifyMock.mockReset();
  });

  it("creates lead and sends notification", async () => {
    createMock.mockResolvedValue({ id: "lead_1" });
    notifyMock.mockResolvedValue(undefined);

    const request = new Request("http://localhost/api/leads/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fullName: "Ada Konate",
        email: "ada@example.com",
        phone: "+22790001111",
        message: "Bonjour je suis interesse.",
        locale: "fr",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(201);

    const payload = (await response.json()) as { ok: boolean; id: string };
    expect(payload.ok).toBe(true);
    expect(payload.id).toBe("lead_1");
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(notifyMock).toHaveBeenCalledTimes(1);
  });

  it("returns 400 for invalid payload", async () => {
    const request = new Request("http://localhost/api/leads/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fullName: "A",
        email: "invalid",
        phone: "1",
        message: "short",
        locale: "fr",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
