"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { ArrowLeft, CheckCircle2, Minus, Plus } from "lucide-react";
import { submitCheckoutLead } from "@/actions/checkout";
import { formatMoney } from "@/lib/currency";
import { formatCategoryPrice } from "@/lib/project-price";
import { websiteRoutes } from "@/lib/routes";

type CheckoutFormProps = {
  project: {
    id: string;
    title: string;
    slug: string;
    featuredImage: string;
    currency: string;
  };
  category: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    priceTo: number | null;
  };
  quantity: number;
};

export function CheckoutForm({
  project,
  category,
  quantity: initialQuantity,
}: CheckoutFormProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const hasRange =
    category.priceTo != null && category.priceTo !== category.price;
  const unitLabel = formatCategoryPrice(
    category.price,
    category.priceTo,
    project.currency,
  );
  const totalLabel = !hasRange
    ? formatMoney(category.price * quantity, project.currency)
    : unitLabel;

  function setQty(next: number) {
    setQuantity(Math.min(99, Math.max(1, next)));
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-brand/20 bg-brand/5 px-6 py-10 text-center sm:px-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand" />
        <h2 className="mt-4 text-2xl font-bold text-foreground">
          Request received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
          Thank you. Our team will contact you on WhatsApp shortly regarding{" "}
          <strong>{project.title}</strong> — {category.name}.
        </p>
        <Link
          href={`${websiteRoutes.projects}/${project.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-light"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to project
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
      <aside className="h-fit rounded-2xl border border-border bg-surface-muted/40 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Order summary
        </p>
        <div className="mt-4 flex gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
            <Image
              src={project.featuredImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-foreground">{project.title}</h2>
            <p className="mt-1 text-sm text-muted">{category.name}</p>
          </div>
        </div>

        {category.description ? (
          <p className="mt-4 text-sm leading-6 text-muted">
            {category.description}
          </p>
        ) : null}

        <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Quantity</dt>
            <dd>
              <div className="flex h-10 items-stretch overflow-hidden rounded-lg border-2 border-brand-dark/20 bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty(quantity - 1)}
                  className="flex w-9 items-center justify-center bg-surface-muted/80 text-brand-dark transition hover:bg-brand/10"
                >
                  <Minus className="h-4 w-4" strokeWidth={2.5} />
                </button>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={quantity}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    if (!Number.isFinite(next)) return;
                    setQty(next);
                  }}
                  aria-label="Quantity"
                  className="w-10 border-x-2 border-brand-dark/15 bg-transparent text-center text-sm font-bold text-brand-dark outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty(quantity + 1)}
                  className="flex w-9 items-center justify-center bg-surface-muted/80 text-brand-dark transition hover:bg-brand/10"
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </dd>
          </div>
          {unitLabel ? (
            <div className="flex justify-between gap-3">
              <dt className="text-muted">
                {hasRange ? "Price range" : "Unit price"}
              </dt>
              <dd className="font-semibold text-foreground">{unitLabel}</dd>
            </div>
          ) : null}
          {totalLabel ? (
            <div className="flex justify-between gap-3 border-t border-border pt-3 text-base">
              <dt className="font-semibold text-foreground">Total</dt>
              <dd className="font-bold text-brand">{totalLabel}</dd>
            </div>
          ) : null}
        </dl>

        <Link
          href={`${websiteRoutes.projects}/${project.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Change option
        </Link>
      </aside>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Share your details and we will follow up on WhatsApp to complete your
          contribution.
        </p>

        <form
          className="mt-8 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setError(null);
            setFieldErrors({});

            const formData = new FormData(event.currentTarget);

            startTransition(async () => {
              const result = await submitCheckoutLead({
                projectId: project.id,
                categoryId: category.id,
                fullName: String(formData.get("fullName") ?? ""),
                email: String(formData.get("email") ?? ""),
                phone: String(formData.get("phone") ?? ""),
                quantity,
                amount: hasRange
                  ? Number(formData.get("amount"))
                  : undefined,
                message: String(formData.get("message") ?? "") || undefined,
              });

              if (result.success) {
                setSuccess(true);
                return;
              }

              if (result.fieldErrors) setFieldErrors(result.fieldErrors);
              if (result.error) setError(result.error);
            });
          }}
        >
          <Field
            label="Full name"
            name="fullName"
            required
            error={fieldErrors.fullName?.[0]}
          />
          <Field
            label="WhatsApp number"
            name="phone"
            type="tel"
            required
            placeholder="e.g. 0300 1234567"
            error={fieldErrors.phone?.[0]}
          />
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">
              Email
              <span className="font-normal text-muted"> (optional)</span>
            </span>
            <input
              name="email"
              type="email"
              className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
            {fieldErrors.email?.[0] ? (
              <p className="text-sm text-red-600">{fieldErrors.email[0]}</p>
            ) : null}
          </label>
          {hasRange ? (
            <Field
              label="Contribution amount"
              name="amount"
              type="number"
              required
              error={fieldErrors.amount?.[0]}
            />
          ) : null}
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">
              Additional information
              <span className="font-normal text-muted"> (optional)</span>
            </span>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
              placeholder="Any notes for our team…"
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
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-dark px-5 text-sm font-semibold text-white transition hover:bg-brand disabled:opacity-60 sm:w-auto sm:min-w-[12rem] sm:rounded-full"
          >
            {isPending ? "Submitting…" : "Submit request"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </label>
  );
}
