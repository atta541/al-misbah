"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Clock,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Maximize2,
  MapPin,
  Navigation,
  Phone,
  QrCode,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  donateBankAccounts,
  donateLocations,
  donatePageContent,
  type DonateLocation,
} from "@/content/donate";
import { websiteRoutes } from "@/lib/routes";

function mapEmbedUrl(location: DonateLocation) {
  const query = encodeURIComponent(
    `${location.lat},${location.lng}`,
  );
  return `https://maps.google.com/maps?q=${query}&z=15&output=embed`;
}

function directionsUrl(location: DonateLocation) {
  return `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
}

function CopyRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/70 py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
          {label}
        </p>
        <p className="mt-1 break-all text-sm font-semibold text-foreground">
          {value}
        </p>
      </div>
      <button
        type="button"
        aria-label={`Copy ${label}`}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          } catch {
            /* ignore */
          }
        }}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted transition hover:border-brand/30 hover:bg-brand/5 hover:text-brand"
      >
        {copied ? (
          <Check className="h-4 w-4 text-brand" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

export function DonatePageContent() {
  const [activeId, setActiveId] = useState(donateLocations[0]?.id ?? "");
  const [pdfOpen, setPdfOpen] = useState(false);
  const active =
    donateLocations.find((location) => location.id === activeId) ??
    donateLocations[0];

  useEffect(() => {
    if (!pdfOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPdfOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pdfOpen]);

  return (
    <div className="space-y-16 sm:space-y-20">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
          {donatePageContent.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {donatePageContent.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
          {donatePageContent.description}
        </p>
      </header>

      <section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {donatePageContent.bankSectionTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
            {donatePageContent.bankSectionDescription}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {donateBankAccounts.map((account) => (
            <article
              key={account.id}
              className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-white shadow-[0_18px_40px_-28px_rgba(15,92,76,0.35)]"
            >
              <div className="flex items-center gap-3 border-b border-border/70 bg-brand-dark px-5 py-4 text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">{account.bankName}</p>
                  <p className="text-sm text-white/70">
                    {account.currency} account
                  </p>
                </div>
              </div>
              <div className="px-5 py-2">
                <CopyRow label="Account title" value={account.accountTitle} />
                <CopyRow label="Account number" value={account.accountNumber} />
                <CopyRow label="IBAN" value={account.iban} />
                {account.branch ? (
                  <CopyRow label="Branch" value={account.branch} />
                ) : null}
                {account.swift ? (
                  <CopyRow label="SWIFT" value={account.swift} />
                ) : null}
              </div>

              {account.qrImageUrl ? (
                <div className="border-t border-border/70 bg-surface-muted/50 px-5 py-5">
                  <p className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    <QrCode className="h-3.5 w-3.5 text-brand" />
                    {account.qrLabel ?? "Scan QR to pay"}
                  </p>
                  <div className="mx-auto flex max-w-[14rem] items-center justify-center rounded-2xl border border-border bg-white p-3 shadow-sm">
                    <Image
                      src={account.qrImageUrl}
                      alt={account.qrLabel ?? `${account.bankName} payment QR`}
                      width={220}
                      height={220}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            <ShieldCheck className="h-4 w-4" />
            Verified organization
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {donatePageContent.registrationTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
            {donatePageContent.registrationDescription}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-brand/15 bg-gradient-to-br from-brand-dark via-brand to-brand-light p-7 text-white sm:p-9">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/25 blur-3xl"
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <ShieldCheck className="h-8 w-8 text-accent" />
            </div>
            <h3 className="relative mt-6 text-2xl font-bold tracking-tight">
              Official FBR registered
            </h3>
            <p className="relative mt-3 text-sm leading-7 text-white/80">
              Donors can verify our legal registration with Pakistan’s Federal
              Board of Revenue. Transparency first — every contribution is
              backed by a registered organization.
            </p>
            <ul className="relative mt-6 space-y-3 text-sm text-white/90">
              {[
                "Federal Board of Revenue certificate",
                "Viewable online anytime",
                "Downloadable for your records",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setPdfOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-accent hover:text-accent-foreground"
              >
                <Maximize2 className="h-4 w-4" />
                View certificate
              </button>
              <a
                href={donatePageContent.registrationPdfPath}
                download="Al-Misbah-FBR-Registration.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPdfOpen(true)}
            className="group relative mx-auto w-full max-w-xl text-left lg:mx-0"
            aria-label="Open FBR registration certificate"
          >
            <div
              aria-hidden
              className="absolute inset-x-6 top-4 h-full rounded-[1.25rem] bg-brand-dark/10 transition group-hover:translate-y-1"
            />
            <div
              aria-hidden
              className="absolute inset-x-3 top-2 h-full rounded-[1.25rem] bg-brand-dark/15 transition group-hover:translate-y-0.5"
            />
            <div className="relative overflow-hidden rounded-[1.25rem] border border-border bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_30px_70px_-24px_rgba(15,23,42,0.5)]">
              <div className="flex items-center justify-between gap-3 border-b border-border/80 bg-surface-muted/80 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {donatePageContent.registrationPdfLabel}
                    </p>
                    <p className="text-[11px] text-muted">PDF document</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark px-3 py-1.5 text-[11px] font-semibold text-white">
                  <Maximize2 className="h-3 w-3" />
                  Expand
                </span>
              </div>
              <div className="relative h-[22rem] bg-surface-muted sm:h-[26rem]">
                <iframe
                  title={donatePageContent.registrationPdfLabel}
                  src={`${donatePageContent.registrationPdfPath}#toolbar=0&navpanes=0&view=FitH`}
                  className="h-full w-full border-0 pointer-events-none"
                  tabIndex={-1}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent px-4 pb-4 pt-16">
                  <p className="text-center text-sm font-medium text-brand-dark">
                    Tap to open full certificate viewer
                  </p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {pdfOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
          <button
            type="button"
            aria-label="Close certificate viewer"
            className="absolute inset-0 bg-brand-dark/75 backdrop-blur-sm"
            onClick={() => setPdfOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={donatePageContent.registrationPdfLabel}
            className="relative z-10 flex h-[min(92vh,56rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">
                  {donatePageContent.registrationPdfLabel}
                </p>
                <p className="text-xs text-muted">FBR registration proof</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={donatePageContent.registrationPdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-surface-muted sm:inline-flex"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  New tab
                </a>
                <a
                  href={donatePageContent.registrationPdfPath}
                  download="Al-Misbah-FBR-Registration.pdf"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setPdfOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:bg-surface-muted hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <iframe
              title={`${donatePageContent.registrationPdfLabel} full view`}
              src={`${donatePageContent.registrationPdfPath}#view=FitH`}
              className="h-full w-full flex-1 border-0 bg-surface-muted"
            />
          </div>
        </div>
      ) : null}

      <section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {donatePageContent.locationsSectionTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
            {donatePageContent.locationsSectionDescription}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
          <div className="flex flex-col gap-3">
            {donateLocations.map((location) => {
              const isActive = location.id === active?.id;

              return (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => setActiveId(location.id)}
                  className={[
                    "rounded-2xl border p-5 text-left transition",
                    isActive
                      ? "border-brand bg-brand/5 shadow-sm ring-1 ring-brand/20"
                      : "border-border/80 bg-white hover:border-brand/30",
                  ].join(" ")}
                >
                  <p className="font-bold text-foreground">{location.name}</p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-muted">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      {location.address}
                      <br />
                      {location.city}
                    </span>
                  </p>
                  {location.hours ? (
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                      <Clock className="h-4 w-4 shrink-0 text-brand" />
                      {location.hours}
                    </p>
                  ) : null}
                  {location.phone ? (
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                      <Phone className="h-4 w-4 shrink-0 text-brand" />
                      {location.phone}
                    </p>
                  ) : null}
                </button>
              );
            })}
          </div>

          {active ? (
            <div className="flex min-h-[22rem] flex-col overflow-hidden rounded-[1.5rem] border border-border/80 bg-white shadow-[0_18px_40px_-28px_rgba(15,92,76,0.35)] sm:min-h-[28rem]">
              <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {active.name}
                  </p>
                  <p className="truncate text-xs text-muted">{active.city}</p>
                </div>
                <a
                  href={directionsUrl(active)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-dark px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Directions
                </a>
              </div>
              <iframe
                key={active.id}
                title={`Map — ${active.name}`}
                src={mapEmbedUrl(active)}
                className="h-full min-h-[18rem] w-full flex-1 border-0 sm:min-h-[24rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-brand/15 bg-gradient-to-br from-brand/8 via-white to-accent/10 px-6 py-10 text-center sm:px-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {donatePageContent.projectsCtaTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted sm:text-base">
          {donatePageContent.projectsCtaDescription}
        </p>
        <Link
          href={websiteRoutes.projects}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand"
        >
          Browse projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
