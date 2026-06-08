"use client";

import { Suspense, useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ScanLine, ShieldCheck, Smartphone } from "lucide-react";
import { Button, GradientScan, QRCode } from "@mvp-ui/ui";
import { loginAction } from "./actions";

const STEPS = [
  { icon: Smartphone, text: "Mở app MVP trên điện thoại của bạn" },
  { icon: ScanLine, text: "Chọn “Quét mã” và hướng camera vào mã QR" },
  { icon: ShieldCheck, text: "Xác nhận đăng nhập — phiên sẽ mở tại đây" },
];

// Demo handshake token the companion app would scan.
const QR_PAYLOAD = "mvp-worker://login?session=demo-2048&ts=fixed";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
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
    <div className="flex min-h-dvh w-full items-center justify-center bg-bg-secondary px-4 py-8">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-border-secondary bg-bg shadow-sm">
        {/* Brand header */}
        <div className="flex flex-col items-center gap-3 bg-linear-to-br from-primary to-brand-800 px-6 py-8 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-fg/15 text-lg font-bold text-primary-fg">
            W
          </span>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-primary-fg">
              MVP Worker
            </h1>
            <p className="mt-1 text-sm text-primary-fg/80">
              Đăng nhập bằng mã QR từ app
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 px-6 py-7">
          {/* QR plate — kept light so the code stays scannable in any theme */}
          <div className="relative overflow-hidden rounded-xl border border-border-secondary bg-white p-4">
            {/* dark-ok: QR plate is print-style, mode-independent */}
            <QRCode
              size="lg"
              value={QR_PAYLOAD}
              options={{
                dotsOptions: { color: "#3730a3", type: "rounded" },
                backgroundOptions: { color: "#ffffff" },
                cornersSquareOptions: { color: "#4f46e5", type: "extra-rounded" },
              }}
            />
            <GradientScan />
          </div>

          {/* Steps */}
          <ol className="flex w-full flex-col gap-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.text} className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-bg-secondary text-fg-brand">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm text-fg-secondary">
                    <span className="font-medium text-fg">{i + 1}.</span> {step.text}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* Demo bypass */}
          <form action={formAction} className="w-full">
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full justify-center"
              disabled={isPending}
            >
              {isPending ? "Đang đăng nhập…" : "Đăng nhập demo (bỏ qua quét)"}
            </Button>
          </form>

          <p className="text-center text-xs text-fg-tertiary">
            Demo · không cần camera. Nút trên mô phỏng phiên sau khi quét mã.
          </p>
        </div>
      </div>
    </div>
  );
}
