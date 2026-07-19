import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { LeadsTable } from "@/components/admin/leads-table";
import { adminNavItems } from "@/components/admin/nav-config";
import { adminRoutes } from "@/lib/routes";
import { projectService } from "@/services/project.service";
import {
  CHECKOUT_LEAD_STATUSES,
  CHECKOUT_LEAD_STATUS_LABELS,
  type CheckoutLeadStatusValue,
} from "@/validations/checkout";
import Link from "next/link";

const page = adminNavItems.find((item) => item.href === adminRoutes.leads)!;

type AdminLeadsPageProps = {
  searchParams: Promise<{ status?: string; q?: string }>;
};

export default async function AdminLeadsPage({
  searchParams,
}: AdminLeadsPageProps) {
  const params = await searchParams;
  const statusFilter = CHECKOUT_LEAD_STATUSES.includes(
    params.status as CheckoutLeadStatusValue,
  )
    ? (params.status as CheckoutLeadStatusValue)
    : undefined;
  const q = params.q?.trim() || undefined;

  const leads = await projectService.listLeads({
    status: statusFilter,
    q,
  });

  return (
    <AdminPageShell description={page.description}>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-slate-500">
          {leads.length} lead{leads.length === 1 ? "" : "s"}
          {statusFilter
            ? ` · ${CHECKOUT_LEAD_STATUS_LABELS[statusFilter]}`
            : ""}
        </p>

        <form className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search name, email, WhatsApp"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
          <select
            name="status"
            defaultValue={statusFilter ?? ""}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="">All statuses</option>
            {CHECKOUT_LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {CHECKOUT_LEAD_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Filter
          </button>
          {statusFilter || q ? (
            <Link
              href={adminRoutes.leads}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Clear
            </Link>
          ) : null}
        </form>
      </div>

      <LeadsTable
        leads={leads.map((lead) => ({
          ...lead,
          status: lead.status as CheckoutLeadStatusValue,
        }))}
      />
    </AdminPageShell>
  );
}
