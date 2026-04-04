"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/lib/locales";

export type InstitutionalIndicatorIcon =
  | "culture"
  | "map"
  | "community"
  | "target"
  | "calendar"
  | "globe";

export type InstitutionalIndicatorItem = {
  value: string;
  label: string;
  sub: string;
  icon: InstitutionalIndicatorIcon;
  tone: string;
};

type InstitutionalIndicatorsProps = {
  locale: Locale;
  items: InstitutionalIndicatorItem[];
};

function IndicatorIcon({ icon, className }: { icon: InstitutionalIndicatorIcon; className?: string }) {
  if (icon === "culture") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path d="M3 20h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M5 20V9M9 20V9M15 20V9M19 20V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M5 9L12 4l7 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "map") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path d="M3.5 6.5l5-2 7 2 5-2v13l-5 2-7-2-5 2v-13z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M8.5 4.5v13M15.5 6.5v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "community") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "target") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="1.3" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "calendar") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7.5 3.5v4M16.5 3.5v4M3.5 9.5h17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function parseAnimatedValue(value: string) {
  const match = value.match(/^([^0-9]*)([0-9][0-9\s.,]*)([^0-9]*)$/);
  if (!match) {
    return { animate: false, prefix: "", suffix: "", target: 0 };
  }

  const rawNumber = match[2].replace(/[^0-9]/g, "");
  if (!rawNumber) {
    return { animate: false, prefix: "", suffix: "", target: 0 };
  }

  return {
    animate: true,
    prefix: match[1],
    suffix: match[3],
    target: Number.parseInt(rawNumber, 10),
  };
}

function AnimatedIndicatorValue({
  value,
  locale,
}: {
  value: string;
  locale: Locale;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const parsed = useMemo(() => parseAnimatedValue(value), [value]);

  useEffect(() => {
    if (!parsed.animate || !ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [parsed.animate]);

  useEffect(() => {
    if (!parsed.animate || !started) {
      return;
    }

    let frame = 0;
    const duration = parsed.target > 500 ? 1600 : 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(parsed.target * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [parsed.animate, parsed.target, started]);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale === "fr" ? "fr-FR" : locale === "en" ? "en-US" : "ha-NE"),
    [locale]
  );

  const display = parsed.animate
    ? `${parsed.prefix}${formatter.format(count)}${parsed.suffix}`
    : value;

  return <span ref={ref}>{display}</span>;
}

export function InstitutionalIndicators({ locale, items }: InstitutionalIndicatorsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {items.map((item) => (
        <article
          key={`${item.label}-${item.value}`}
          className="indicator-card"
          style={{ "--indicator-tone": item.tone } as CSSProperties}
        >
          <span className="indicator-card-icon">
            <IndicatorIcon icon={item.icon} className="h-5 w-5" />
          </span>
          <p className="indicator-card-value">
            <AnimatedIndicatorValue value={item.value} locale={locale} />
          </p>
          <p className="indicator-card-label">{item.label}</p>
          <p className="indicator-card-sub">{item.sub}</p>
        </article>
      ))}
    </div>
  );
}
