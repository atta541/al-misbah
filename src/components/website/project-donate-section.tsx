"use client";

import { useEffect, useState, useTransition } from "react";
import { Check, Heart, Sparkles, X } from "lucide-react";
import { submitProjectDonation } from "@/actions/project-donation";
import { formatCategoryPrice } from "@/lib/project-price";
import type { Project, ProjectCategory } from "@/types";

type ProjectDonateSectionProps = {
  project: Pick<Project, "id" | "title" | "currency">;
  categories: Pick<
    ProjectCategory,
    "id" | "name" | "description" | "price" | "priceTo"
  >[];
};

export function ProjectDonateSection({
  project,
  categories,
}: ProjectDonateSectionProps) {
  const [selectedId, setSelectedId] = useState(categories[0]?.id ?? "");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#donate" && categories.length > 0) {
      setModalOpen(true);
    }
  }, [categories.length]);

  if (categories.length === 0) {
    return null;
  }

  const selected = categories.find((category) => category.id === selectedId);

  return (
    <section id="donate" className="mt-14 scroll-mt-28">
      <div className="relative overflow-hidden rounded-[2rem] border border-brand/15 bg-gradient-to-br from-brand/8 via-white to-accent/10 p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-accent/15 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            <Sparkles className="h-4 w-4" />
            Support this project
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Choose a donation option
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
            Select the category that matches how you would like to contribute.
          </p>
        </div>

        <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const isSelected = category.id === selectedId;
            const priceLabel = formatCategoryPrice(
              category.price,
              category.priceTo,
              project.currency,
            );

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedId(category.id)}
                className={[
                  "group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border-2 p-5 text-left transition-all duration-300 sm:p-6",
                  isSelected
                    ? "border-brand bg-white shadow-[0_20px_45px_-22px_rgba(15,92,76,0.45)] ring-4 ring-brand/10"
                    : "border-white/80 bg-white/85 hover:-translate-y-1 hover:border-brand/30 hover:bg-white hover:shadow-[0_16px_40px_-24px_rgba(15,92,76,0.3)]",
                ].join(" ")}
              >
                <div
                  className={[
                    "absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand via-brand-light to-accent transition-opacity duration-300",
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                  ].join(" ")}
                />

                <div className="flex items-start justify-between gap-3">
                  <p className="pr-2 text-lg font-bold tracking-tight text-foreground">
                    {category.name}
                  </p>
                  <span
                    className={[
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isSelected
                        ? "border-brand bg-brand text-white"
                        : "border-border/80 bg-surface-muted text-transparent group-hover:border-brand/40",
                    ].join(" ")}
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                </div>

                {category.description ? (
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                    {category.description}
                  </p>
                ) : (
                  <div className="flex-1" />
                )}

                {priceLabel ? (
                  <div className="mt-5 inline-flex w-fit items-center rounded-full bg-brand/10 px-4 py-2 text-sm font-bold text-brand">
                    {priceLabel}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="relative mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            disabled={!selected}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-light disabled:opacity-60"
          >
            <Heart className="h-4 w-4 fill-current" />
            Donate now
          </button>
        </div>
      </div>

      {modalOpen && selected ? (
        <DonateModal
          project={project}
          category={selected}
          onClose={() => setModalOpen(false)}
        />
      ) : null}
    </section>
  );
}

function DonateModal({
  project,
  category,
  onClose,
}: {
  project: Pick<Project, "id" | "title" | "currency">;
  category: Pick<
    ProjectCategory,
    "id" | "name" | "description" | "price" | "priceTo"
  >;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const priceLabel = formatCategoryPrice(
    category.price,
    category.priceTo,
    project.currency,
  );
  const hasRange =
    category.priceTo != null &&
    category.priceTo.toString() !== category.price.toString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close donation form"
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-modal-title"
        className="relative z-10 w-full max-w-lg rounded-[1.5rem] bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted transition hover:bg-surface-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
          Donate
        </p>
        <h3 id="donate-modal-title" className="mt-2 text-2xl font-bold text-foreground">
          {category.name}
        </h3>
        {priceLabel ? (
          <p className="mt-2 text-sm font-semibold text-brand">{priceLabel}</p>
        ) : null}

        {success ? (
          <div className="mt-6 rounded-2xl border border-brand/20 bg-brand/5 px-4 py-5 text-sm leading-7 text-foreground">
            Thank you. Your donation request for <strong>{project.title}</strong>{" "}
            has been received. Our team will contact you shortly.
          </div>
        ) : (
          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setError(null);
              setFieldErrors({});

              const formData = new FormData(event.currentTarget);

              startTransition(async () => {
                const result = await submitProjectDonation({
                  projectId: project.id,
                  categoryId: category.id,
                  fullName: String(formData.get("fullName") ?? ""),
                  email: String(formData.get("email") ?? ""),
                  phone: String(formData.get("phone") ?? "") || undefined,
                  amount: hasRange
                    ? Number(formData.get("amount"))
                    : undefined,
                  message: String(formData.get("message") ?? "") || undefined,
                });

                if (result.success) {
                  setSuccess(true);
                  return;
                }

                if (result.fieldErrors) {
                  setFieldErrors(result.fieldErrors);
                }

                if (result.error) {
                  setError(result.error);
                }
              });
            }}
          >
            <FormField
              label="Full name"
              name="fullName"
              required
              error={fieldErrors.fullName?.[0]}
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              required
              error={fieldErrors.email?.[0]}
            />
            <FormField
              label="Phone (optional)"
              name="phone"
              error={fieldErrors.phone?.[0]}
            />
            {hasRange ? (
              <FormField
                label="Donation amount"
                name="amount"
                type="number"
                required
                error={fieldErrors.amount?.[0]}
              />
            ) : null}
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                Message (optional)
              </span>
              <textarea
                name="message"
                rows={3}
                className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
              />
            </label>

            {error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-light disabled:opacity-60"
            >
              {isPending ? "Submitting..." : "Submit donation request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </label>
  );
}
