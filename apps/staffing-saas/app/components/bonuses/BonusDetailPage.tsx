import { BadgeWithDot, Button } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageScaffold } from "../_shell/PageScaffold";
import { SetPageBreadcrumb } from "../_shell/BreadcrumbContext";
import { APP_ROUTES } from "../_shell/nav";
import {
  BONUS_STATUS_LABELS,
  getBonusById,
  formatVnd,
} from "./bonuses-data";
import { BonusDetailIsland } from "./BonusDetailIsland";

export function BonusDetailPage({ id }: { id: string }) {
  const bonus = getBonusById(id);
  if (!bonus) notFound();

  const status = BONUS_STATUS_LABELS[bonus.status];

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4">
          <SetPageBreadcrumb
            items={[
              { label: "Dashboard", href: APP_ROUTES.dashboard },
              { label: "Thưởng", href: APP_ROUTES.bonuses },
              { label: bonus.title },
            ]}
          />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-3">
              <Link
                href="/bonuses"
                className="inline-flex items-center gap-1 text-sm text-fg-tertiary hover:text-fg"
              >
                <ArrowLeft className="size-4" />
                Quay lại
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-fg">{bonus.title}</h1>
                <BadgeWithDot color={status.color} type="pill-color" size="sm">
                  {status.label}
                </BadgeWithDot>
                <span className="text-sm text-fg-tertiary">
                  {bonus.id} • Phụ trách {bonus.manager}
                </span>
              </div>
              <p className="max-w-3xl text-sm text-fg-tertiary">
                {bonus.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button color="tertiary" size="sm">
                Lịch sử thay đổi
              </Button>
              {bonus.status === "running" && (
                <Button color="primary-destructive" size="sm">
                  Hủy thưởng
                </Button>
              )}
              {bonus.status !== "cancelled" && bonus.status !== "ended" && (
                <Button color="primary" size="sm">
                  Cập nhật
                </Button>
              )}
            </div>
          </div>
        </div>
      }
    >
      <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
        <div className="border-b border-border-secondary px-5 py-4">
          <h2 className="text-base font-semibold text-fg">Kết quả thực tế</h2>
          <p className="mt-1 text-sm text-fg-tertiary">
            Số liệu cập nhật theo timesheet đã đối soát; CTV pending chưa được tính.
          </p>
        </div>
        <div className="grid gap-6 px-5 py-5 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-fg-tertiary">Cộng tác viên</p>
            <div className="mt-3 grid grid-cols-3 gap-4">
              <ResultStat label="Yêu cầu" value={`${bonus.requested}`} />
              <ResultStat label="Đã duyệt" value={`${bonus.approved}`} />
              <ResultStat label="Đạt điều kiện" value={`${bonus.qualified}`} />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-fg-tertiary">Ngân sách</p>
            <div className="mt-3 grid grid-cols-3 gap-4">
              <ResultStat label="Chi phí tối đa" value={formatVnd(bonus.budgetMax)} />
              <ResultStat label="Đã áp dụng" value={formatVnd(bonus.appliedAmount)} />
              <ResultStat label="Đã thanh toán" value={formatVnd(bonus.paidAmount)} />
            </div>
          </div>
        </div>
      </div>

      <BonusDetailIsland bonus={bonus} />
    </PageScaffold>
  );
}

function ResultStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-fg-tertiary">{label}</p>
      <p className="mt-1 text-lg font-semibold text-fg">{value}</p>
    </div>
  );
}
