import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getSession, getSessionDurationDays } from "@/lib/auth";
import { adminRoutes } from "@/lib/routes";

export default async function AdminLoginPage() {
  const session = await getSession();

  if (session) {
    redirect(adminRoutes.dashboard);
  }

  const sessionDays = getSessionDurationDays();

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#052e24] px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-bold shadow-lg shadow-emerald-500/30">
              AM
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight">
              Al-Misbah Center
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
              Secure admin access to manage projects, gallery, pages, messages,
              and site settings for your NGO website.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300 backdrop-blur-sm">
            <p className="font-medium text-white">Session duration</p>
            <p className="mt-2 leading-6">
              You stay signed in for{" "}
              <span className="font-semibold text-emerald-300">
                {sessionDays} day{sessionDays === 1 ? "" : "s"}
              </span>{" "}
              unless you log out manually.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-bold text-white">
                AM
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                Admin Login
              </h1>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
              <div className="mb-8 hidden lg:block">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-600">
                  Welcome back
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  Sign in to admin
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter your admin email and password to continue.
                </p>
              </div>

              <p className="mb-6 text-sm text-slate-500 lg:hidden">
                Sign in to manage website content.
              </p>

              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
