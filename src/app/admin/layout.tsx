import { headers } from "next/headers";
import { AdminShell } from "@/components/admin/admin-shell";
import { getSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const routeType = (await headers()).get("x-admin-route");

  if (routeType === "login") {
    return <>{children}</>;
  }

  const session = await getSession();

  return <AdminShell session={session}>{children}</AdminShell>;
}
