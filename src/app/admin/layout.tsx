import { headers } from "next/headers";
import { AdminSidebar } from "@/components/admin/sidebar";
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

  return (
    <div className="flex min-h-screen bg-zinc-100">
      <AdminSidebar session={session} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
