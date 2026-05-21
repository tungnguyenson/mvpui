"use client";

import { Suspense, useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle, Button, Checkbox, HintText, Input, Label, BackgroundPattern } from "@mvp-ui/ui";
import { loginAction } from "./actions";

const FEATURE_BULLETS = [
  "Tự động sắp xếp ca làm việc & điều phối nhân sự",
  "Số hóa bảng công & chấm công thời gian thực",
  "Tính lương tự động & xuất báo cáo tức thì",
  "Đồng bộ hóa hồ sơ cộng tác viên và hợp đồng",
];

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (state?.success) {
      router.push(callbackUrl);
      router.refresh();
    }
  }, [state, router, callbackUrl]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg">

      {/* Right — form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-bg relative">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-fg text-sm font-bold">
              S
            </div>
            <span className="text-lg font-semibold text-fg tracking-tight">Staffing SaaS</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-fg tracking-tight">
              Đăng nhập hệ thống
            </h2>
            <p className="mt-1.5 text-sm text-fg-tertiary">
              Chào mừng quay trở lại. Vui lòng nhập thông tin đăng nhập của bạn.
            </p>
          </div>

          {state?.error && (
            <Alert variant="error">
              <AlertTitle>Đăng nhập thất bại</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <form action={formAction} className="space-y-5" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email" isRequired>
                Email đăng nhập
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                autoComplete="email"
                required
                isInvalid={!!state?.error}
              />
            </div>

            <div className="space-y-1.5 relative">
              <Label htmlFor="password" isRequired>
                Mật khẩu
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                isInvalid={!!state?.error}
              />
              <a
                href="#"
                className="absolute top-0 right-0 text-sm font-medium text-fg-brand hover:text-primary transition-colors"
              >
                Quên mật khẩu?
              </a>
              <HintText>Nhập mật khẩu được cấp bởi quản trị viên.</HintText>
            </div>

            <Checkbox
              name="remember"
              value="true"
              label="Ghi nhớ đăng nhập trong 30 ngày"
            />

            <Button
              type="submit"
              color="primary"
              className="w-full justify-center mt-6 cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Đang đăng nhập…" : "Đăng nhập"}
            </Button>
          </form>

          <p className="text-center text-sm text-fg-tertiary">
            Chưa có tài khoản đăng ký?{" "}
            <a
              href="#"
              className="font-medium text-fg-brand hover:text-primary transition-colors"
            >
              Liên hệ Admin
            </a>
          </p>
        </div>
      </div>

      {/* Left — brand panel (desktop only) */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between bg-linear-to-br from-primary to-brand-800 p-12 overflow-hidden select-none">
        {/* Decorative Grid Background Pattern */}
        <BackgroundPattern
          pattern="grid"
          size="lg"
          className="absolute inset-0 opacity-15 text-primary-fg mix-blend-overlay"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-fg/15 text-primary-fg text-sm font-bold">
              S
            </div>
            <span className="text-lg font-semibold text-primary-fg tracking-tight">
              Staffing Admin
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary-fg leading-tight tracking-tight">
              Quản lý nhân sự.
              <br />
              Tối ưu vận hành.
            </h1>
            <p className="mt-4 text-base text-primary-fg/80 leading-relaxed max-w-md">
              Hệ thống quản lý cộng tác viên toàn diện từ tuyển dụng, sắp ca, chấm công thời gian thực đến tính lương tự động.
            </p>
          </div>

          <ul className="space-y-4">
            {FEATURE_BULLETS.map((text) => (
              <li key={text} className="flex items-center gap-3 text-sm text-primary-fg/90">
                <svg
                  className="h-5 w-5 shrink-0 text-primary-fg bg-primary-fg/10 rounded-full p-0.5"
                  fill="none"
                  viewBox="0 0 16 16"
                  aria-hidden
                >
                  <path
                    d="M3 8l3.5 3.5L13 4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-primary-fg/50">© 2026 Staffing SaaS. Tất cả quyền được bảo lưu.</p>
      </div>


    </div>
  );
}
