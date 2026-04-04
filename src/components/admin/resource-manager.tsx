"use client";

import { useState } from "react";
import type { UserRole } from "@prisma/client";
import type { AdminResource } from "@/lib/validation/content";
import { ArtisanButton } from "@/components/ui/artisan-button";
import { cn } from "@/lib/utils";

type ResourceManagerProps = {
  resource: AdminResource;
  initialItems: Array<Record<string, unknown>>;
  template: Record<string, unknown>;
  role: UserRole;
};

const resourceCopy: Record<
  AdminResource,
  { title: string; intro: string; editorHint: string; label: string }
> = {
  destinations: {
    title: "Destinations",
    intro: "Administrez les sites touristiques, les resumés, les visuels hero et les coordonnees cartographiques.",
    editorHint: "Renseignez les champs i18n, le slug, l'image hero et les coordonnees de la fiche.",
    label: "Destination",
  },
  circuits: {
    title: "Circuits",
    intro: "Structurez les parcours proposes, leurs durees et le contenu descriptif associe.",
    editorHint: "Verifiez la duree, le slug et le contenu du circuit avant publication.",
    label: "Circuit",
  },
  events: {
    title: "Evenements",
    intro: "Pilotez l'agenda institutionnel, les dates clefs et les lieux de chaque evenement.",
    editorHint: "Controlez les dates de debut et de fin ainsi que la localisation i18n.",
    label: "Evenement",
  },
  articles: {
    title: "Actualites",
    intro: "Publiez les communiques, articles et annonces mises en avant sur le site public.",
    editorHint: "Soignez le titre, l'extrait et l'image de couverture pour un rendu propre.",
    label: "Actualite",
  },
  gallery: {
    title: "Galerie",
    intro: "Centralisez la mediatheque publique avec categories, captions et URLs d'images.",
    editorHint: "Ajoutez une categorie claire et une caption i18n pour chaque media.",
    label: "Media",
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getLocalizedValue(value: unknown) {
  if (!isRecord(value)) {
    return "";
  }

  return String(value.fr ?? value.en ?? value.ha ?? "");
}

function formatAdminDate(value: unknown) {
  if (!(typeof value === "string" || value instanceof Date)) {
    return "Non renseigne";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Non renseigne";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function getItemTitle(item: Record<string, unknown>, resource: AdminResource) {
  if (resource === "gallery") {
    return getLocalizedValue(item.captionI18n) || "Media sans legende";
  }

  return getLocalizedValue(item.titleI18n) || String(item.slug ?? item.id ?? "Element sans titre");
}

function getItemSummary(item: Record<string, unknown>, resource: AdminResource) {
  if (resource === "destinations") {
    return getLocalizedValue(item.summaryI18n) || getLocalizedValue(item.bodyI18n);
  }

  if (resource === "articles") {
    return getLocalizedValue(item.excerptI18n) || getLocalizedValue(item.bodyI18n);
  }

  if (resource === "events" || resource === "circuits") {
    return getLocalizedValue(item.bodyI18n);
  }

  return typeof item.imageUrl === "string" ? item.imageUrl : String(item.category ?? "");
}

function getItemMeta(item: Record<string, unknown>, resource: AdminResource) {
  if (resource === "gallery") {
    return String(item.category ?? "Categorie non renseignee");
  }

  if (resource === "circuits") {
    return typeof item.durationDays === "number" ? `${item.durationDays} jours` : "Duree non renseignee";
  }

  if (resource === "events") {
    return getLocalizedValue(item.locationI18n) || "Lieu non renseigne";
  }

  return String(item.slug ?? "Slug non renseigne");
}

export function ResourceManager({ resource, initialItems, template, role }: ResourceManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [editorValue, setEditorValue] = useState(() => JSON.stringify(template, null, 2));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const copy = resourceCopy[resource];
  const publishedCount = items.filter((item) => Boolean(item.publishedAt)).length;
  const draftCount = items.length - publishedCount;

  const refresh = async () => {
    const response = await fetch(`/api/admin/${resource}`);
    const data = (await response.json()) as { items: Array<Record<string, unknown>> };
    setItems(data.items);
  };

  const submit = async () => {
    try {
      const payload = JSON.parse(editorValue) as Record<string, unknown>;
      const method = editingId ? "PATCH" : "POST";
      const endpoint = editingId ? `/api/admin/${resource}/${editingId}` : `/api/admin/${resource}`;

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = (await response.json()) as { error?: string };
        throw new Error(errorPayload.error ?? "Request failed");
      }

      setEditingId(null);
      setEditorValue(JSON.stringify(template, null, 2));
      setNotice("Enregistrement effectue.");
      await refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Payload invalide");
    }
  };

  const edit = (item: Record<string, unknown>) => {
    setEditingId(String(item.id));
    const draft = { ...item };
    delete draft.id;
    delete draft.createdAt;
    delete draft.updatedAt;
    setEditorValue(JSON.stringify(draft, null, 2));
    setNotice(null);
  };

  const remove = async (id: string) => {
    if (role !== "ADMIN") {
      setNotice("Seul le role ADMIN peut supprimer un contenu.");
      return;
    }

    await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    setNotice("Element supprime.");
    await refresh();
  };

  return (
    <section className="space-y-6">
      <div className="admin-hero-panel p-6 md:p-7">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
          <div>
            <span className="section-kicker border-white/15 bg-white/10 text-white">Gestion de contenu</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{copy.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/76 md:text-[0.95rem]">
              {copy.intro}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="admin-mini-stat">
              <p className="admin-mini-label">Total</p>
              <p className="admin-mini-value">{items.length}</p>
              <p className="admin-mini-text">Fiches disponibles dans ce module.</p>
            </div>
            <div className="admin-mini-stat">
              <p className="admin-mini-label">Publies</p>
              <p className="admin-mini-value">{publishedCount}</p>
              <p className="admin-mini-text">Elements visibles cote site public.</p>
            </div>
            <div className="admin-mini-stat">
              <p className="admin-mini-label">Brouillons</p>
              <p className="admin-mini-value">{draftCount}</p>
              <p className="admin-mini-text">Contenus encore hors publication.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
        <div className="admin-panel p-6">
          <div className="texture-overlay" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="section-kicker">Editeur JSON</span>
                <h3 className="mt-4 text-2xl font-bold text-[#123b28]">
                  {editingId ? `Modifier ${copy.label.toLowerCase()}` : `Creer ${copy.label.toLowerCase()}`}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#2d6a4f]">{copy.editorHint}</p>
              </div>
              <span className={cn("admin-status-badge", editingId ? "admin-status-in-progress" : "admin-status-published")}>
                {editingId ? "Edition" : "Creation"}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="admin-subcard">
                <p className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Format</p>
                <p className="mt-2 text-sm font-semibold text-[#123b28]">JSON structure</p>
                <p className="mt-1 text-xs leading-relaxed text-[#2d6a4f]">Conservez les cles i18n et les champs requis.</p>
              </div>
              <div className="admin-subcard">
                <p className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Publication</p>
                <p className="mt-2 text-sm font-semibold text-[#123b28]">Champ `published`</p>
                <p className="mt-1 text-xs leading-relaxed text-[#2d6a4f]">Activez-le uniquement quand la fiche est valide.</p>
              </div>
              <div className="admin-subcard">
                <p className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Acces</p>
                <p className="mt-2 text-sm font-semibold text-[#123b28]">{role}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#2d6a4f]">Le role ADMIN seul peut supprimer les fiches.</p>
              </div>
            </div>

            <textarea
              value={editorValue}
              onChange={(event) => setEditorValue(event.target.value)}
              spellCheck={false}
              className="institution-field admin-code-editor mt-5"
            />

            <div className="mt-5 flex flex-wrap gap-3">
              <ArtisanButton onClick={submit}>{editingId ? "Mettre a jour" : "Creer l'element"}</ArtisanButton>
              {editingId ? (
                <button
                  type="button"
                  className="cross-hover-btn institution-btn rounded-full px-4 py-2 text-sm font-semibold"
                  onClick={() => {
                    setEditingId(null);
                    setEditorValue(JSON.stringify(template, null, 2));
                    setNotice(null);
                  }}
                >
                  Annuler l'edition
                </button>
              ) : null}
            </div>

            {notice ? (
              <p
                className={cn(
                  "admin-notice",
                  /effectue|supprime/i.test(notice) ? "admin-notice-success" : "admin-notice-error"
                )}
              >
                {notice}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <div className="admin-panel p-6">
            <div className="texture-overlay" />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="section-kicker">Catalogue</span>
                <h3 className="mt-4 text-2xl font-bold text-[#123b28]">{copy.title} existants</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2d6a4f]">
                  Parcourez les fiches disponibles, modifiez-les rapidement ou controlez leur statut.
                </p>
              </div>
              <span className="surface-chip">{items.length} element(s)</span>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="admin-empty-state">
              <span className="section-kicker">Aucun element</span>
              <p className="text-base font-semibold text-[#123b28]">Le module est vide pour le moment.</p>
              <p className="text-sm leading-relaxed text-[#2d6a4f]">
                Utilisez l'editeur JSON pour creer la premiere fiche de cette rubrique.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((item) => {
                const title = getItemTitle(item, resource);
                const summary = getItemSummary(item, resource);
                const meta = getItemMeta(item, resource);

                return (
                  <article key={String(item.id)} className="admin-list-card">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={cn("admin-status-badge", item.publishedAt ? "admin-status-published" : "admin-status-draft")}>
                            {item.publishedAt ? "Publie" : "Brouillon"}
                          </span>
                          <span className="surface-chip">{copy.label}</span>
                        </div>

                        <h4 className="mt-4 text-xl font-bold text-[#123b28]">{title}</h4>
                        <p className="mt-1 text-[0.72rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">
                          {String(item.slug ?? item.id)}
                        </p>

                        {summary ? (
                          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#2d6a4f]">{summary}</p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap gap-2 xl:justify-end">
                        <button
                          type="button"
                          className="cross-hover-btn institution-btn rounded-full px-4 py-2 text-sm font-semibold"
                          onClick={() => edit(item)}
                        >
                          Modifier
                        </button>
                        {role === "ADMIN" ? (
                          <button
                            type="button"
                            className="cross-hover-btn institution-btn rounded-full px-4 py-2 text-sm font-semibold"
                            onClick={() => remove(String(item.id))}
                          >
                            Supprimer
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="admin-subcard">
                        <p className="text-[0.66rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Repere</p>
                        <p className="mt-2 text-sm font-semibold text-[#123b28]">{meta}</p>
                      </div>
                      <div className="admin-subcard">
                        <p className="text-[0.66rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Cree le</p>
                        <p className="mt-2 text-sm font-semibold text-[#123b28]">{formatAdminDate(item.createdAt)}</p>
                      </div>
                      <div className="admin-subcard">
                        <p className="text-[0.66rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Maj le</p>
                        <p className="mt-2 text-sm font-semibold text-[#123b28]">{formatAdminDate(item.updatedAt)}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
