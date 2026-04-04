"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";
import { ArtisanButton } from "@/components/ui/artisan-button";

type LeadFormType = "contact" | "circuit";

type LeadFormProps = {
  locale: Locale;
  type: LeadFormType;
};

type LeadState = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: LeadState = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

export function LeadForm({ locale, type }: LeadFormProps) {
  const dictionary = getDictionary(locale);
  const endpoint = useMemo(
    () => (type === "contact" ? "/api/leads/contact" : "/api/leads/circuit-request"),
    [type]
  );

  const [state, setState] = useState<LeadState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const heading = type === "contact" ? dictionary.forms.submitContact : dictionary.forms.submitCircuit;
  const subtitle =
    type === "contact"
      ? "Demandes institutionnelles, partenariats et informations officielles."
      : "Precisez vos besoins de circuit pour un accompagnement par les equipes.";

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state,
          locale,
          metadata: {
            source: "website",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      setState(initialState);
      setNotice(dictionary.forms.success);
    } catch {
      setNotice(dictionary.forms.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="glass-surface relative rounded-3xl p-6">
      <div className="texture-overlay" />
      <div className="relative z-10 grid gap-4">
        <div>
          <p className="section-kicker">{type === "contact" ? "contact" : "circuit"}</p>
          <h3 className="mt-3 font-display text-3xl text-[#123b28]">{heading}</h3>
          <p className="mt-1 text-sm text-[#2f6d4a]">{subtitle}</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-[#123b28]" htmlFor={`${type}-fullName`}>
            {dictionary.forms.fullName}
          </label>
          <input
            id={`${type}-fullName`}
            value={state.fullName}
            onChange={(event) => setState((prev) => ({ ...prev, fullName: event.target.value }))}
            required
            className="institution-field"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-[#123b28]" htmlFor={`${type}-email`}>
            {dictionary.forms.email}
          </label>
          <input
            id={`${type}-email`}
            type="email"
            value={state.email}
            onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
            required
            className="institution-field"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-[#123b28]" htmlFor={`${type}-phone`}>
            {dictionary.forms.phone}
          </label>
          <input
            id={`${type}-phone`}
            value={state.phone}
            onChange={(event) => setState((prev) => ({ ...prev, phone: event.target.value }))}
            required
            className="institution-field"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-[#123b28]" htmlFor={`${type}-message`}>
            {dictionary.forms.message}
          </label>
          <textarea
            id={`${type}-message`}
            value={state.message}
            onChange={(event) => setState((prev) => ({ ...prev, message: event.target.value }))}
            rows={4}
            required
            className="institution-field min-h-[120px] resize-y"
          />
        </div>

        <ArtisanButton type="submit" className="w-full sm:w-fit">
          {isSubmitting
            ? "..."
            : type === "contact"
              ? dictionary.forms.submitContact
              : dictionary.forms.submitCircuit}
        </ArtisanButton>

        {notice ? <p className="text-sm text-[#2f6d4a]">{notice}</p> : null}
      </div>
    </form>
  );
}
