import Link from "next/link";
import {
  CalendarClock,
  ChevronRight,
  CircleHelp,
  Clock,
  History,
  MapPin,
  ShieldCheck,
  Star,
  UserPen,
  Wallet,
} from "lucide-react";
import {
  AvatarLabelGroup,
  Badge,
  Button,
  Card,
  CardContent,
  MetricStrip,
} from "@mvp-ui/ui";
import { CURRENT_WORKER } from "../data/worker";

const VERIFICATION_BADGE = {
  verified: { color: "success", label: "Đã xác thực" },
  pending: { color: "warning", label: "Chờ bổ sung" },
  missing: { color: "error", label: "Chưa xác thực" },
} as const;

const QUICK_ACTIONS = [
  { href: "/profile", label: "Chỉnh sửa hồ sơ", icon: UserPen },
  { href: "/profile", label: "Xác thực CCCD", icon: ShieldCheck },
  { href: "/", label: "Lịch sử ca", icon: History },
  { href: "/", label: "Hỗ trợ", icon: CircleHelp },
] as const;

export default function HomePage() {
  const worker = CURRENT_WORKER;
  const verification = VERIFICATION_BADGE[worker.verification];

  return (
    <div className="flex flex-col gap-6 px-4 py-5 lg:mx-auto lg:max-w-5xl lg:gap-7 lg:px-8 lg:py-8">
      {/* Greeting */}
      <section className="flex items-center justify-between gap-3">
        <AvatarLabelGroup
          size="lg"
          src={worker.avatar}
          alt={worker.name}
          state="verified"
          title={worker.name}
          subtitle={`Mã CTV · ${worker.id}`}
        />
        <Badge color={verification.color} type="pill-color" size="sm">
          {verification.label}
        </Badge>
      </section>

      {/* Earnings / activity strip */}
      <MetricStrip
        items={[
          {
            icon: <Wallet className="size-4" />,
            color: "brand",
            value: worker.monthlyEarnings,
            label: "Thu nhập tháng",
          },
          {
            icon: <CalendarClock className="size-4" />,
            color: "success",
            value: worker.weeklyShifts,
            label: "Ca tuần này",
          },
          {
            icon: <Star className="size-4" />,
            color: "warning",
            value: worker.rating,
            label: "Đánh giá",
          },
        ]}
      />

      {/* Next shift + quick actions — side by side on desktop */}
      <div className="contents lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
      {/* Next shift */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-fg">Ca làm sắp tới</h2>
          <Badge color="brand" type="pill-color" size="sm">
            {worker.nextShift.status}
          </Badge>
        </div>
        <Card className="shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 pt-5">
            <div>
              <p className="text-base font-semibold text-fg">{worker.nextShift.customer}</p>
              <p className="mt-0.5 text-sm text-fg-tertiary">{worker.nextShift.role}</p>
            </div>
            <dl className="flex flex-col gap-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-fg-secondary">
                <Clock className="size-4 shrink-0 text-fg-quaternary" />
                <span>{worker.nextShift.schedule}</span>
              </div>
              <div className="flex items-center gap-2.5 text-fg-secondary">
                <MapPin className="size-4 shrink-0 text-fg-quaternary" />
                <span>{worker.nextShift.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-fg-secondary">
                <Wallet className="size-4 shrink-0 text-fg-quaternary" />
                <span className="font-semibold text-fg">{worker.nextShift.payout}</span>
              </div>
            </dl>
            <Button color="secondary" size="md" className="w-full justify-center">
              Xem chi tiết ca
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Quick actions */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-fg">Truy cập nhanh</h2>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="group flex items-center gap-3 rounded-xl border border-border-secondary bg-bg p-4 transition-colors hover:border-border-brand hover:bg-bg-secondary"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-bg-secondary text-fg-brand">
                  <Icon className="size-5" />
                </span>
                <span className="flex-1 text-sm font-medium text-fg">{action.label}</span>
                <ChevronRight className="size-4 text-fg-quaternary transition-colors group-hover:text-fg-tertiary" />
              </Link>
            );
          })}
        </div>
      </section>
      </div>
    </div>
  );
}
