import { Avatar, Badge, Button } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarRange, CircleDollarSign, Gift, Users } from "lucide-react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  RULE_KIND_LABELS,
  RULE_STATUS_LABELS,
  getRewardRuleById,
  type RewardCondition,
  type RewardEligibleGroup,
  type RewardPayoutSample,
} from "./reward-rules-data";
import { getAvatarFor, getInitials } from "../_shared/assets";

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
      <p className="text-sm text-fg-tertiary">{label}</p>
      <p className="mt-2 text-xl font-semibold text-fg">{value}</p>
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
      <div className="border-b border-border-secondary px-5 py-4">
        <h2 className="text-base font-semibold text-fg">{title}</h2>
        <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function ConditionItem({ item }: { item: RewardCondition }) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <p className="text-xs text-fg-tertiary">{item.label}</p>
      <p className="mt-1 text-sm font-medium text-fg">{item.value}</p>
    </div>
  );
}

function GroupItem({ group }: { group: RewardEligibleGroup }) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-fg">{group.name}</p>
          <p className="mt-1 text-sm text-fg-tertiary">{group.description}</p>
        </div>
        <Badge color="success" type="pill-color" size="sm">
          {group.size} CTV
        </Badge>
      </div>
    </div>
  );
}

function PayoutItem({ payout }: { payout: RewardPayoutSample }) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Avatar
            size="md"
            src={getAvatarFor(payout.workerName, payout.workerId)}
            alt={payout.workerName}
            initials={getInitials(payout.workerName)}
          />
          <div>
            {payout.workerId ? (
              <Link
                href={`/workers/${payout.workerId}`}
                className="text-sm font-semibold text-fg hover:text-fg-brand"
              >
                {payout.workerName}
              </Link>
            ) : (
              <p className="text-sm font-semibold text-fg">{payout.workerName}</p>
            )}
            <p className="mt-1 text-sm text-fg-tertiary">{payout.context}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-sm font-semibold text-fg">{payout.amount}</p>
          <p className="text-sm text-fg-tertiary">{payout.paidAt}</p>
        </div>
      </div>
    </div>
  );
}

export function RewardRulesDetailPage({ id }: { id: string }) {
  const rule = getRewardRuleById(id);
  if (!rule) notFound();

  const status = RULE_STATUS_LABELS[rule.status];

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg">
              <Gift className="size-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-fg">{rule.name}</h1>
                <Badge color={status.color} type="pill-color" size="sm">
                  {status.label}
                </Badge>
                <Badge color="gray" type="pill-color" size="sm">
                  {RULE_KIND_LABELS[rule.kind]}
                </Badge>
              </div>
              <p className="mt-1 text-base text-fg-tertiary">
                {rule.code} • Phụ trách {rule.owner}
              </p>
              <p className="mt-3 max-w-3xl text-sm text-fg-tertiary">{rule.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/reward-rules">
              <Button color="secondary" size="sm">
                Quay lại danh sách
              </Button>
            </Link>
            <Button color="primary" size="sm">
              Cập nhật rule
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <SummaryCard label="Mức thưởng" value={rule.amount} />
        <SummaryCard label="Loại rule" value={RULE_KIND_LABELS[rule.kind]} />
        <SummaryCard
          label="Hiệu lực"
          value={`${rule.effectiveFrom} → ${rule.effectiveTo}`}
        />
        <SummaryCard
          label="Worker eligible"
          value={`${rule.eligibleGroups.reduce((s, g) => s + g.size, 0)}`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Thông tin rule"
          description="Loại thưởng, mức chi trả và phạm vi áp dụng."
        >
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <CircleDollarSign className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm font-medium text-fg">{rule.amount}</p>
                <p className="text-sm text-fg-tertiary">{rule.amountNote}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarRange className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm text-fg">Hiệu lực: {rule.effectiveFrom}</p>
                <p className="text-sm text-fg-tertiary">Kết thúc: {rule.effectiveTo}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">Phụ trách: {rule.owner}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Conditions / rule builder summary"
          description="Các điều kiện cần thoả mãn để worker nhận được thưởng theo rule này."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {rule.conditions.map((item) => (
              <ConditionItem key={item.id} item={item} />
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Eligible worker groups"
        description="Nhóm worker có thể nhận thưởng theo rule này."
      >
        <div className="flex flex-col gap-3">
          {rule.eligibleGroups.map((group) => (
            <GroupItem key={group.id} group={group} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Recent reward results"
        description="Ví dụ payout gần nhất đã được rule áp dụng."
      >
        <div className="flex flex-col gap-3">
          {rule.recentPayouts.length > 0 ? (
            rule.recentPayouts.map((payout) => (
              <PayoutItem key={payout.id} payout={payout} />
            ))
          ) : (
            <p className="text-sm text-fg-tertiary">
              Rule chưa phát sinh payout nào hoặc đang ở trạng thái tạm dừng.
            </p>
          )}
        </div>
      </SectionCard>
    </PageScaffold>
  );
}
