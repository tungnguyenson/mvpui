"use client";

import { useState } from "react";
import { Check, ChevronRight, Copy, Download, Image as ImageIcon, Link2, QrCode, ScanLine, Share2, Trophy } from "lucide-react";
import Link from "next/link";
import {
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Card,
  CardContent,
  QRCode,
  toast,
} from "@mvp-ui/ui";
import { CTV, EARNINGS, money } from "../../data/ctv-referral";
import { ColorPicker } from "./ColorPicker";
import { downloadPosterPng, downloadQrPng } from "./qr-export";
import { ScreenHeader } from "./ScreenHeader";
import { useFormColor } from "./useFormColor";

/** Tuỳ chọn QR cho hiển thị trên màn — module dày, đen navy, ECC H. */
const QR_OPTIONS = {
  width: 172,
  height: 172,
  margin: 0,
  qrOptions: { errorCorrectionLevel: "H" as const },
  dotsOptions: { type: "rounded" as const, color: "#0D1526" },
  cornersSquareOptions: { type: "extra-rounded" as const, color: "#0D1526" },
  cornersDotOptions: { type: "dot" as const, color: "#0D1526" },
  backgroundOptions: { color: "#ffffff" },
};

interface Channel {
  id: string;
  label: string;
  /** Màu nền ô — giữ màu thương hiệu thật của kênh (mode-independent). */
  background: string;
  path: string;
}

const CHANNELS: Channel[] = [
  { id: "zalo", label: "Zalo", background: "#0068FF", path: "M12 2C6.2 2 1.5 6.03 1.5 11c0 2.77 1.46 5.25 3.76 6.92-.15 1.2-.66 2.4-1.5 3.36-.27.31-.04.8.37.73 1.96-.34 3.6-1.13 4.74-2.02 1.13.32 2.34.49 3.63.49 5.8 0 10.5-4.03 10.5-9S17.8 2 12 2z" },
  { id: "fb", label: "Facebook", background: "#1877F2", path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" },
  { id: "tt", label: "TikTok", background: "#010101", path: "M16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
  { id: "mess", label: "Messenger", background: "linear-gradient(135deg,#00B2FF,#006AFF)", path: "M12 2C6.3 2 2 6.2 2 11.7c0 2.9 1.2 5.4 3.1 7.1.2.1.3.3.3.6l.1 1.8c0 .5.6.9 1.1.7l2-.9c.2-.1.4-.1.6-.1 1 .3 2 .4 3.1.4 5.7 0 10-4.2 10-9.7S17.7 2 12 2zm6 7.5l-2.9 4.6c-.5.7-1.4.9-2.1.4l-2.3-1.7c-.2-.2-.5-.2-.8 0l-3.1 2.4c-.4.3-.9-.2-.7-.6l2.9-4.6c.5-.7 1.4-.9 2.1-.4l2.3 1.7c.2.2.5.2.8 0l3.1-2.4c.4-.3.9.2.7.6z" },
];

async function nativeShareOr(fallbackLabel: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: "viec.co",
        text: "Đăng ký đi làm cùng mình, việc gần nhà — chỉ 2 phút:",
        url: CTV.fullLink,
      });
      return;
    } catch {
      return; // người dùng huỷ — không báo lỗi.
    }
  }
  try {
    await navigator.clipboard?.writeText(CTV.fullLink);
  } catch {
    // bỏ qua.
  }
  toast.success(`Đã sao chép link — mở ${fallbackLabel} và dán để chia sẻ`);
}

export function ShareScreen() {
  const [color, setColor] = useFormColor();
  const [mode, setMode] = useState<"qr" | "poster">("qr");
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(CTV.fullLink);
    } catch {
      // bỏ qua — vẫn báo đã chép cho UX nhất quán prototype.
    }
    setCopied(true);
    toast.success("Đã sao chép link giới thiệu");
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="ctv-referral" style={{ ["--bp" as string]: color }}>
      <ScreenHeader
        title="Giới thiệu bạn bè"
        subtitle="Chia sẻ link hoặc mã QR trang giới thiệu của bạn để mời người đi làm. Mỗi người đi làm buổi đầu — bạn nhận thưởng."
      />

      <div className="relative z-10 -mt-14.5 flex flex-col gap-3.5 px-4 pb-6">
        {/* Share card */}
        <Card className="shadow-lg">
          <CardContent className="flex flex-col items-center gap-4 p-[18px]">
            <div className="flex w-full items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-fg-brand [&_svg]:size-3.5">
                {mode === "poster" ? <ImageIcon /> : <QrCode />}
                {mode === "poster" ? "Ảnh chia sẻ của bạn" : "Trang giới thiệu của bạn"}
              </span>
              <ButtonGroup
                size="sm"
                selectedKeys={new Set([mode])}
                disallowEmptySelection
                onSelectionChange={(keys) => {
                  const next = [...keys][0];
                  if (next === "qr" || next === "poster") setMode(next);
                }}
              >
                <ButtonGroupItem id="qr">Mã QR</ButtonGroupItem>
                <ButtonGroupItem id="poster">Ảnh</ButtonGroupItem>
              </ButtonGroup>
            </div>

            {mode === "poster" ? (
              <div className="flex w-full flex-col items-center">
                <SharePoster brand={color} />
                <div className="mt-4 flex w-full gap-2">
                  <Button color="secondary" size="md" className="flex-1 justify-center" iconLeading={Share2} onClick={() => nativeShareOr("ứng dụng")}>
                    Chia sẻ
                  </Button>
                  <Button
                    color="primary"
                    size="md"
                    className="flex-1 justify-center"
                    iconLeading={Download}
                    onClick={() => {
                      toast.success("Đang tải ảnh poster…");
                      void downloadPosterPng(CTV, color, `poster-${CTV.slug}.png`);
                    }}
                  >
                    Tải ảnh
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="rounded-2xl border border-border-secondary bg-bg p-3">
                  <QRCode size="lg" value={CTV.fullLink} options={QR_OPTIONS} className="border-0 p-0" />
                </div>
                <p className="inline-flex items-center gap-1.5 text-[13px] text-fg-tertiary [&_svg]:size-4 [&_svg]:text-fg-brand">
                  <ScanLine />
                  Đưa máy quét mã để mở trang đăng ký
                </p>
              </>
            )}

            {/* Link row */}
            <div className="flex w-full items-center gap-2.5">
              <div className="flex h-[46px] min-w-0 flex-1 items-center gap-2 rounded-lg bg-bg-secondary px-3.5">
                <Link2 className="size-4 shrink-0 text-fg-brand" />
                <span className="ctv-mono min-w-0 flex-1 truncate text-[13.5px] font-semibold text-fg-secondary">
                  {CTV.link}
                </span>
              </div>
              <Button
                color="primary"
                size="md"
                iconLeading={copied ? Check : Copy}
                onClick={copyLink}
                className={copied ? "bg-success-600! text-white! ring-success-600! hover:bg-success-600!" : undefined}
              >
                {copied ? "Đã chép" : "Sao chép"}
              </Button>
            </div>

            {/* Channels */}
            <div className="grid w-full grid-cols-5 gap-2">
              {CHANNELS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => nativeShareOr(c.label)}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span
                    className="flex size-11 items-center justify-center rounded-[14px] text-white transition-transform active:scale-95"
                    style={{ background: c.background }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" role="img" aria-label={c.label}>
                      <path d={c.path} />
                    </svg>
                  </span>
                  <span className="text-[11px] text-fg-secondary">{c.label}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  toast.success("Đang tải mã QR…");
                  void downloadQrPng(CTV.fullLink, `qr-${CTV.slug}.png`);
                }}
                className="flex flex-col items-center gap-1.5"
              >
                <span className="flex size-11 items-center justify-center rounded-[14px] bg-bg-tertiary text-fg-secondary transition-transform active:scale-95">
                  <Download className="size-5" />
                </span>
                <span className="text-[11px] text-fg-secondary">Tải QR</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Color picker */}
        <ColorPicker color={color} onChange={setColor} />

        {/* Stat strip */}
        <div className="grid grid-cols-3 gap-2.5">
          <StatCard value={CTV.totalReferred} label="Đã giới thiệu" />
          <StatCard value={CTV.totalWorking} label="Đã đi làm" tone="success" />
          <StatCard value={`${CTV.successRate}%`} label="Tỷ lệ thành công" tone="brand" />
        </div>

        {/* Reward teaser → /thuong */}
        <Link
          href="/thuong"
          className="flex items-center gap-3 rounded-2xl border border-(--brand-100) bg-info-bg p-4 transition-colors hover:bg-info-bg/70"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#FFD976,#F0B429)] text-[#7a4b00]">
            <Trophy className="size-5" />
          </span>
          <span className="flex-1">
            <span className="block text-[12px] font-medium text-fg-tertiary">
              Thưởng {EARNINGS.monthLabel.toLowerCase()}
            </span>
            <span className="block text-[18px] font-bold text-fg">{money(EARNINGS.thisMonth)}</span>
          </span>
          <span className="inline-flex items-center gap-0.5 text-[13px] font-semibold text-fg-brand">
            Xem thưởng
            <ChevronRight className="size-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ value, label, tone }: { value: string | number; label: string; tone?: "success" | "brand" }) {
  const valueColor = tone === "success" ? "text-fg-success" : tone === "brand" ? "text-fg-brand" : "text-fg";
  return (
    <div className="rounded-2xl border border-border-secondary bg-bg p-3.5 text-center shadow-xs">
      <div className={`text-[22px] font-bold ${valueColor}`}>{value}</div>
      <div className="mt-0.5 text-[11px] text-fg-tertiary">{label}</div>
    </div>
  );
}

/** Poster xem trên màn — recolor theo --bp. */
function SharePoster({ brand }: { brand: string }) {
  return (
    <div className="ctv-poster" style={{ ["--bp" as string]: brand }}>
      <div className="pgrid" aria-hidden />
      <div className="ptop">
        {/* biome-ignore lint/performance/noImgElement: poster trang trí */}
        <img className="plogo" src="/viec-logo.png" alt="viec.co" />
        <div className="pav">
          {/* biome-ignore lint/performance/noImgElement: avatar poster */}
          <img src={CTV.avatar} alt={CTV.name} />
        </div>
        <div className="pname">{CTV.name}</div>
        <div className="prole">CTV viec.co · {CTV.joinedYears} năm kinh nghiệm</div>
      </div>
      <div className="phead">
        Tìm việc gần nhà,
        <br />
        <span>đăng ký 2 phút</span>
      </div>
      <div className="psub">Quét mã QR hoặc bấm vào link bên dưới để đăng ký. Mình hỗ trợ bạn xếp việc tận nơi.</div>
      <div className="pqr">
        <QRCode size="md" value={CTV.fullLink} options={{ ...QR_OPTIONS, width: 132, height: 132 }} className="border-0 p-0" />
      </div>
      <div className="pfoot">
        <div className="plink">{CTV.link}</div>
        <div className="pcta">
          <Check className="size-3.5" />
          Miễn phí 100% với người lao động
        </div>
      </div>
    </div>
  );
}
