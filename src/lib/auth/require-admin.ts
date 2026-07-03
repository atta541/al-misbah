import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { adminRoutes } from "@/lib/routes";

export async function requireAdminSession() {
  const session = await getSession();

  if (!session) {
    redirect(adminRoutes.login);
  }

  return session;
}
