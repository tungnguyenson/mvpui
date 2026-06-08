const SESSION_COOKIE = "session";

function setSessionCookie() {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 24 * 30; // 30 days
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${SESSION_COOKIE}=true; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

export interface LoginState {
  success?: boolean;
}

/**
 * Demo login. A real worker scans the QR with the companion app, which hands
 * back a one-time token; here the button just sets the session cookie so the
 * flow is clickable end-to-end.
 */
export async function loginAction(
  _prevState: LoginState | null,
  _formData: FormData,
): Promise<LoginState> {
  setSessionCookie();
  return { success: true };
}
