"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateCheckoutLeadStatus } from "@/actions/checkout";
import { decimalToNumber, formatMoney } from "@/lib/currency";
import {
  CHECKOUT_LEAD_STATUSES,
  CHECKOUT_LEAD_STATUS_LABELS,
  type CheckoutLeadStatusValue,
} from "@/validations/checkout";

type LeadRow = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  quantity: number;
  amount: { toString(): string } | number | null;
  message: string | null;
  status: CheckoutLeadStatusValue;
  createdAt: Date | string;
  project: { title: string; slug: string };
  category: { name: string };
};

const STATUS_STYLES: Record<CheckoutLeadStatusValue, string> = {
  pending: "bg-amber-50 text-amber-800 border-amber-200",
  contacted: "bg-sky-50 text-sky-800 border-sky-200",
  confirmed: "bg-emerald-50 text-emerald-800 border-emerald-200",
  completed: "bg-slate-100 text-slate-700 border-slate-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  const normalized = digits.startsWith("0")
    ? `92${digits.slice(1)}`
    : digits;
  return `https://wa.me/${normalized}`;
}

function formatDate(value: Date | string) {
  const date = new Date(value);
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        No checkout leads yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => {
              const amount = decimalToNumber(lead.amount);
              const wa = lead.phone ? whatsappHref(lead.phone) : null;

              return (
                <tr key={lead.id} className="align-top">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-900">
                      {lead.fullName}
                    </p>
                    <p className="mt-1 text-slate-500">{lead.email}</p>
                    {lead.phone ? (
                      <p className="mt-1">
                        {wa ? (
                          <a
                            href={wa}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-emerald-700 hover:underline"
                          >
                            {lead.phone}
                          </a>
                        ) : (
                          <span className="text-slate-500">{lead.phone}</span>
                        )}
                      </p>
                    ) : null}
                    {lead.message ? (
                      <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">
                        {lead.message}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-slate-900">
                      {lead.project.title}
                    </p>
                    <p className="mt-1 text-slate-500">{lead.category.name}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Qty {lead.quantity}
                    </p>
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    {amount != null ? formatMoney(amount, "PKR") : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={lead.status}
                      disabled={isPending}
                      onChange={(event) => {
                        const status = event.target
                          .value as CheckoutLeadStatusValue;
                        startTransition(async () => {
                          await updateCheckoutLeadStatus({
                            id: lead.id,
                            status,
                          });
                          router.refresh();
                        });
                      }}
                      className={[
                        "rounded-lg border px-2.5 py-1.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-200",
                        STATUS_STYLES[lead.status],
                      ].join(" ")}
                    >
                      {CHECKOUT_LEAD_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {CHECKOUT_LEAD_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
