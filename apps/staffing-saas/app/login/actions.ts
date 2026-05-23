const ADMIN_USER =
  process.env.NEXT_PUBLIC_ADMIN_USER || "admin@example.com";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";

const SESSION_COOKIE = "session";

function setSessionCookie(remember: boolean) {
  if (typeof document === "undefined") return;
  const maxAge = remember ? 60 * 60 * 24 * 30 : "";
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  const ageAttr = maxAge ? `; Max-Age=${maxAge}` : "";
  document.cookie = `${SESSION_COOKIE}=true; Path=/; SameSite=Lax${ageAttr}${secure}`;
}

function clearSessionCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export interface LoginState {
  error?: string;
  success?: boolean;
  email?: string;
}

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const remember = formData.get("remember") === "true";

  if (!email || !email.includes("@")) {
    return { error: "Vui lòng nhập email hợp lệ.", email };
  }

  if (!password || password.length < 5) {
    return { error: "Mật khẩu phải chứa ít nhất 5 ký tự.", email };
  }

  if (email === ADMIN_USER && password === ADMIN_PASSWORD) {
    setSessionCookie(remember);
    return { success: true };
  }

  return { error: "Email hoặc mật khẩu không chính xác.", email };
}

export async function logoutAction(): Promise<void> {
  clearSessionCookie();
}
