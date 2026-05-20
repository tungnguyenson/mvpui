"use server";

import { cookies } from "next/headers";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const remember = formData.get("remember") === "true";

  const adminUser = process.env.ADMIN_USER || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin";

  if (!email || !email.includes("@")) {
    return { error: "Vui lòng nhập email hợp lệ." };
  }

  if (!password || password.length < 5) {
    return { error: "Mật khẩu phải chứa ít nhất 5 ký tự." };
  }

  if (email === adminUser && password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("session", "true", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: remember ? 60 * 60 * 24 * 30 : undefined, // 30 days or session
    });
    return { success: true };
  }

  return { error: "Email hoặc mật khẩu không chính xác." };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
