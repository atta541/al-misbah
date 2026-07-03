"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/auth/password";
import { adminRoutes } from "@/lib/routes";
import { adminService } from "@/services";
import { adminLoginSchema } from "@/validations/auth";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginState = {
  error?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
  values?: LoginFormValues;
};

function getFormValues(formData: FormData): LoginFormValues {
  return {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  };
}

export async function loginAdmin(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const values = getFormValues(formData);

  const parsed = adminLoginSchema.safeParse(values);

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  const admin = await adminService.findByEmail(parsed.data.email);

  if (!admin || !(await verifyPassword(parsed.data.password, admin.passwordHash))) {
    return {
      error: "Invalid email or password. Please check your credentials and try again.",
      values,
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
