"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { ArtisanButton } from "@/components/ui/artisan-button";

type LoginFormProps = {
  emailLabel: string;
  passwordLabel: string;
  buttonLabel: string;
};

export function LoginForm({ emailLabel, passwordLabel, buttonLabel }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/admin",
    });

    if (result?.error) {
      setError("Identifiants invalides.");
      setIsSubmitting(false);
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <form onSubmit={onSubmit} className="admin-panel relative w-full max-w-[460px] p-7 md:p-8">
      <div className="texture-overlay" />
      <div className="relative z-10 grid gap-5">
        <div>
          <span className="section-kicker">Back-office</span>
          <h2 className="mt-4 text-2xl font-bold text-[#123b28]">Connexion securisee</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#2d6a4f]">
            Acces reserve aux administrateurs et editeurs du portail institutionnel.
          </p>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#123b28]" htmlFor="admin-email">
              {emailLabel}
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@tourisme.gouv.ne"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="institution-field"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#123b28]" htmlFor="admin-password">
              {passwordLabel}
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="institution-field"
            />
          </div>
        </div>

        <ArtisanButton type="submit" className="w-full justify-center" variant="primary">
          {isSubmitting ? "Connexion..." : buttonLabel}
        </ArtisanButton>

        {error ? <p className="admin-notice admin-notice-error">{error}</p> : null}

        <div className="admin-subcard">
          <p className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Protection</p>
          <p className="mt-2 text-sm leading-relaxed text-[#2d6a4f]">
            Cette interface permet la publication et la mise a jour des contenus visibles sur le site public.
          </p>
        </div>
      </div>
    </form>
  );
}
