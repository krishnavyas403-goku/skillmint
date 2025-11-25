// lib/userStorage.ts
// Simple localStorage wrapper for onboarding user data

export interface UserProfile {
  name: string;
  interests: string[];
  goal: string;
}

const STORAGE_KEY = "skillmint_user";

export function saveUser(user: UserProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function loadUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
