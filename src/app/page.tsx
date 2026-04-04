import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { coerceLocale } from "@/lib/locales";

export default async function RootPage() {
  const locale = coerceLocale((await cookies()).get("locale")?.value);
  redirect(`/${locale}`);
}
