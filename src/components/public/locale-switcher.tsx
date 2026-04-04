"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/lib/locales";

const labels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  ha: "HA",
};

type LocaleSwitcherProps = {
  currentLocale: Locale;
};

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const onLocaleChange = (nextLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }

    fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
    })
      .catch(() => null)
      .finally(() => {
        detailsRef.current?.removeAttribute("open");
        router.push(`/${segments.join("/")}`);
      });
  };

  return (
    <details ref={detailsRef} className="relative">
      <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-[#d8e6df] bg-white/92 text-[#1b6543] shadow-sm transition hover:border-[#bdd4c8] [&::-webkit-details-marker]:hidden">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
          <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
          <path d="M3.75 12h16.5M12 3.75a12 12 0 010 16.5M12 3.75a12 12 0 000 16.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </summary>

      <div className="absolute right-0 top-[calc(100%+0.45rem)] z-50 w-24 rounded-xl border border-[#dfe8e3] bg-white/98 p-1.5 shadow-[0_14px_30px_rgba(16,40,29,0.18)] backdrop-blur">
        {locales.map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => onLocaleChange(locale)}
            className={cn(
              "flex w-full items-center justify-center rounded-lg px-2 py-1.5 text-xs font-bold tracking-[0.08em] transition",
              currentLocale === locale
                ? "bg-[#e9f6ee] text-[#11683f]"
                : "text-[#1b6543] hover:bg-[#f0f6f2]"
            )}
            aria-label={`Switch locale to ${locale}`}
          >
            {labels[locale]}
          </button>
        ))}
      </div>
    </details>
  );
}
