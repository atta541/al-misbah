"use client";

export function useMounted() {
  return typeof window !== "undefined";
}
