import { LeadType, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { circuitLeadSchema } from "@/lib/validation/leads";

export async function POST(request: Request) {
  try {
    const payload = circuitLeadSchema.parse(await request.json());

    const lead = await prisma.lead.create({
      data: {
        type: LeadType.CIRCUIT_REQUEST,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        locale: payload.locale,
        payloadJson: (payload.metadata ?? {}) as Prisma.InputJsonValue,
      },
    });

    await sendLeadNotification({
      type: "CIRCUIT_REQUEST",
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
      locale: payload.locale,
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Validation failed" },
      { status: 400 }
    );
  }
}
