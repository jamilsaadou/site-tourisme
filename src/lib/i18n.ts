import { type Locale, defaultLocale } from "@/lib/locales";

type LocalizedText = {
  fr: string;
  en: string;
  ha: string;
};

export function getLocalizedText(value: unknown, locale: Locale): string {
  if (!value || typeof value !== "object") {
    return "";
  }

  const localized = value as Partial<LocalizedText>;

  return (
    localized[locale] ??
    localized[defaultLocale] ??
    localized.en ??
    localized.ha ??
    ""
  );
}

export function createEmptyLocalizedText(): LocalizedText {
  return {
    fr: "",
    en: "",
    ha: "",
  };
}
