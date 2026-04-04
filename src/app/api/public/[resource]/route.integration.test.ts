// @vitest-environment node

import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/public/[resource]/route";

vi.mock("@/lib/content-service", () => ({
  getLocalizedContent: vi.fn(async () => [
    {
      id: "1",
      slug: "agadez",
      title: "Agadez",
    },
  ]),
}));

describe("GET /api/public/[resource]", () => {
  it("returns localized content for known resource", async () => {
    const request = new NextRequest("http://localhost/api/public/destinations?locale=en");
    const response = await GET(request, {
      params: Promise.resolve({ resource: "destinations" }),
    });

    expect(response.status).toBe(200);
    const payload = (await response.json()) as {
      resource: string;
      locale: string;
      items: Array<{ title: string }>;
    };

    expect(payload.resource).toBe("destinations");
    expect(payload.locale).toBe("en");
    expect(payload.items[0]?.title).toBe("Agadez");
  });

  it("returns 404 for unknown resource", async () => {
    const request = new NextRequest("http://localhost/api/public/unknown");
    const response = await GET(request, {
      params: Promise.resolve({ resource: "unknown" }),
    });

    expect(response.status).toBe(404);
  });
});
