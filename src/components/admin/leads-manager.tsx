"use client";

import { useState } from "react";
import type { LeadStatus, LeadType } from "@prisma/client";
import { cn, formatDate } from "@/lib/utils";

type Lead = {
  id: string;
  type: LeadType;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  status: LeadStatus;
  locale: string;
  createdAt: string;
};

type LeadsManagerProps = {
  initialLeads: Lead[];
};

const statuses: LeadStatus[] = ["NEW", "IN_PROGRESS", "CLOSED"];

function statusLabel(status: LeadStatus) {
  if (status === "NEW") {
    return "Nouveau";
  }

  if (status === "IN_PROGRESS") {
    return "En cours";
  }

  return "Clos";
}

function statusClass(status: LeadStatus) {
  if (status === "NEW") {
    return "admin-status-new";
  }

  if (status === "IN_PROGRESS") {
    return "admin-status-in-progress";
  }

  return "admin-status-closed";
}

function typeLabel(type: LeadType) {
  return type === "CONTACT" ? "Contact institutionnel" : "Demande de circuit";
}

export function LeadsManager({ initialLeads }: LeadsManagerProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });
  const [notice, setNotice] = useState<string | null>(null);

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "NEW").length;
  const inProgressLeads = leads.filter((lead) => lead.status === "IN_PROGRESS").length;
  const closedLeads = leads.filter((lead) => lead.status === "CLOSED").length;

  const loadLeads = async (
    nextFilters: { type: string; status: string; dateFrom: string; dateTo: string },
    successMessage: string
  ) => {
    const searchParams = new URLSearchParams();

    if (nextFilters.type) searchParams.set("type", nextFilters.type);
    if (nextFilters.status) searchParams.set("status", nextFilters.status);
    if (nextFilters.dateFrom) searchParams.set("dateFrom", nextFilters.dateFrom);
    if (nextFilters.dateTo) searchParams.set("dateTo", nextFilters.dateTo);

    const response = await fetch(`/api/admin/leads?${searchParams.toString()}`);
    const data = (await response.json()) as { leads: Lead[] };
    setLeads(data.leads);
    setNotice(successMessage);
  };

  const fetchLeads = async () => {
    await loadLeads(filters, "Filtres appliques.");
  };

  const resetFilters = async () => {
    const clearedFilters = {
      type: "",
      status: "",
      dateFrom: "",
      dateTo: "",
    };

    setFilters(clearedFilters);
    await loadLeads(clearedFilters, "Filtres reinitialises.");
  };

  const updateStatus = async (id: string, status: LeadStatus) => {
    const response = await fetch(`/api/admin/leads/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      setNotice("Echec de mise a jour du statut.");
      return;
    }

    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    setNotice("Statut mis a jour.");
  };

  return (
    <section className="space-y-6">
      <div className="admin-hero-panel p-6 md:p-7">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
          <div>
            <span className="section-kicker border-white/15 bg-white/10 text-white">Demandes entrantes</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Gestion des leads</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/76 md:text-[0.95rem]">
              Centralisez les formulaires recus, filtrez les demandes et suivez leur traitement depuis un seul espace.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            <div className="admin-mini-stat">
              <p className="admin-mini-label">Total</p>
              <p className="admin-mini-value">{totalLeads}</p>
              <p className="admin-mini-text">Demandes affichees apres filtrage.</p>
            </div>
            <div className="admin-mini-stat">
              <p className="admin-mini-label">Nouveaux</p>
              <p className="admin-mini-value">{newLeads}</p>
              <p className="admin-mini-text">A prendre en charge.</p>
            </div>
            <div className="admin-mini-stat">
              <p className="admin-mini-label">En cours</p>
              <p className="admin-mini-value">{inProgressLeads}</p>
              <p className="admin-mini-text">En traitement par l'equipe.</p>
            </div>
            <div className="admin-mini-stat">
              <p className="admin-mini-label">Clos</p>
              <p className="admin-mini-value">{closedLeads}</p>
              <p className="admin-mini-text">Demandes finalisees.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-panel p-6">
        <div className="texture-overlay" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="section-kicker">Filtres</span>
              <h3 className="mt-4 text-2xl font-bold text-[#123b28]">Affinage des demandes</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2d6a4f]">
                Triez les leads par type, statut ou periode afin de prioriser le traitement.
              </p>
            </div>
            <span className="surface-chip">{totalLeads} resultat(s)</span>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-4">
            <select
              value={filters.type}
              onChange={(event) => setFilters((prev) => ({ ...prev, type: event.target.value }))}
              className="institution-field"
            >
              <option value="">Tous les types</option>
              <option value="CONTACT">CONTACT</option>
              <option value="CIRCUIT_REQUEST">CIRCUIT_REQUEST</option>
            </select>

            <select
              value={filters.status}
              onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
              className="institution-field"
            >
              <option value="">Tous les statuts</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={filters.dateFrom}
              onChange={(event) => setFilters((prev) => ({ ...prev, dateFrom: event.target.value }))}
              className="institution-field"
            />

            <input
              type="date"
              value={filters.dateTo}
              onChange={(event) => setFilters((prev) => ({ ...prev, dateTo: event.target.value }))}
              className="institution-field"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchLeads}
              className="cross-hover-btn institution-btn rounded-full px-4 py-2 text-sm font-semibold"
            >
              Appliquer les filtres
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="cross-hover-btn institution-btn rounded-full px-4 py-2 text-sm font-semibold"
            >
              Reinitialiser
            </button>
          </div>

          {notice ? (
            <p
              className={cn(
                "admin-notice",
                /mis a jour|appliques|reinitialises/i.test(notice) ? "admin-notice-success" : "admin-notice-error"
              )}
            >
              {notice}
            </p>
          ) : null}
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="admin-empty-state">
          <span className="section-kicker">Aucun lead</span>
          <p className="text-base font-semibold text-[#123b28]">Aucune demande ne correspond aux filtres actifs.</p>
          <p className="text-sm leading-relaxed text-[#2d6a4f]">
            Elargissez les criteres ou reinitialisez les filtres pour revenir a l'ensemble des leads.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {leads.map((lead) => (
            <article key={lead.id} className="admin-list-card">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn("admin-status-badge", statusClass(lead.status))}>{statusLabel(lead.status)}</span>
                    <span className="surface-chip">{typeLabel(lead.type)}</span>
                    <span className="text-[0.72rem] font-extrabold tracking-[0.12em] text-[#5a9478] uppercase">
                      {formatDate(lead.createdAt, lead.locale)} • {lead.locale.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#123b28]">{lead.fullName}</h3>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#2d6a4f]">
                    <a href={`mailto:${lead.email}`} className="admin-link-inline">
                      {lead.email}
                    </a>
                    <a href={`tel:${lead.phone}`} className="admin-link-inline">
                      {lead.phone}
                    </a>
                  </div>

                  <div className="mt-4 admin-subcard">
                    <p className="text-[0.66rem] font-extrabold tracking-[0.14em] text-[#5a9478] uppercase">Message</p>
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[#123b28]">{lead.message}</p>
                  </div>
                </div>

                <div className="w-full xl:max-w-[220px]">
                  <label className="mb-1.5 block text-sm font-semibold text-[#123b28]" htmlFor={`status-${lead.id}`}>
                    Statut
                  </label>
                  <select
                    id={`status-${lead.id}`}
                    value={lead.status}
                    onChange={(event) => updateStatus(lead.id, event.target.value as LeadStatus)}
                    className="institution-field"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
