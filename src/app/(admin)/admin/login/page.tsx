import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { LoginForm } from "@/app/(admin)/admin/login/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  const dictionary = getDictionary("fr");

  return (
    <main className="admin-shell-bg flex min-h-screen items-center px-4 py-10 md:px-8">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_460px] lg:items-stretch">
        <section className="admin-hero-panel p-7 md:p-9">
          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div>
              <span className="section-kicker border-white/15 bg-white/10 text-white">Ministere du Tourisme</span>
              <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight text-white md:text-5xl">
                {dictionary.admin.loginTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/76 md:text-[0.98rem]">
                Connectez-vous pour superviser les contenus institutionnels, les visuels et les demandes recues depuis le site.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="admin-mini-stat">
                <p className="admin-mini-label">Contenus</p>
                <p className="admin-mini-value">5 modules</p>
                <p className="admin-mini-text">Destinations, circuits, actualites, galerie et evenements.</p>
              </div>
              <div className="admin-mini-stat">
                <p className="admin-mini-label">Suivi</p>
                <p className="admin-mini-value">Leads</p>
                <p className="admin-mini-text">Demandes de contact et besoins de circuits centralises.</p>
              </div>
              <div className="admin-mini-stat">
                <p className="admin-mini-label">Acces</p>
                <p className="admin-mini-value">Securise</p>
                <p className="admin-mini-text">Authentification reservee aux administrateurs et editeurs.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-center">
          <LoginForm
            emailLabel={dictionary.admin.email}
            passwordLabel={dictionary.admin.password}
            buttonLabel={dictionary.admin.loginButton}
          />
        </div>
      </div>
    </main>
  );
}
