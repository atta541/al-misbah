"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/auth/password";
import { adminRoutes } from "@/lib/routes";
import { adminService } from "@/services";
import { adminLoginSchema } from "@/validations/auth";

export type LoginState = {
  error?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export async function loginAdmin(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const admin = await adminService.findByEmail(parsed.data.email);

  if (!admin || !(await verifyPassword(parsed.data.password, admin.passwordHash))) {
    return {
      error: "Invalid email or password.",
    };
  }

  await createSession({
    adminId: admin.id,
    email: admin.email,
    fullName: admin.fullName,
  });

  redirect(adminRoutes.dashboard);
}

export async function logoutAdmin() {
  await deleteSession();
  redirect(adminRoutes.login);
}
