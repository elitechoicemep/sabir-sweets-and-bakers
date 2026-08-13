/**
 * Auth placeholder for the future /admin dashboard.
 * Never gate admin access on client state alone — replace with a
 * server-verified session and role check when the backend is added.
 */
export type AdminSession = { userId: string; role: "admin" } | null;

export async function getSession(): Promise<AdminSession> {
  return null;
}

export async function signIn(): Promise<AdminSession> {
  throw new Error("Authentication is not configured yet.");
}

export async function signOut(): Promise<void> {
  /* no-op until a backend is connected */
}
