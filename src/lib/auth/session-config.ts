function getSessionDurationSeconds() {
  const days = Number(process.env.ADMIN_SESSION_DAYS ?? "7");

  if (!Number.isFinite(days) || days <= 0) {
    throw new Error("ADMIN_SESSION_DAYS must be a positive number.");
  }

  return Math.floor(days * 24 * 60 * 60);
}

export function getSessionDurationDays() {
  return Number(process.env.ADMIN_SESSION_DAYS ?? "7");
}

export const SESSION_DURATION_SECONDS = getSessionDurationSeconds();
