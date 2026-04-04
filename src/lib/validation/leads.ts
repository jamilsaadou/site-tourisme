import { z } from "zod";
import { locales } from "@/lib/locales";

const leadBaseSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(40),
  message: z.string().min(10).max(2000),
  locale: z.enum(locales).default("fr"),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const contactLeadSchema = leadBaseSchema.extend({
  type: z.literal("CONTACT").optional(),
});

export const circuitLeadSchema = leadBaseSchema.extend({
  type: z.literal("CIRCUIT_REQUEST").optional(),
});

export const leadStatusSchema = z.enum(["NEW", "IN_PROGRESS", "CLOSED"]);

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;
export type CircuitLeadInput = z.infer<typeof circuitLeadSchema>;
