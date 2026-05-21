"use client";

import {
  AvatarProfilePhoto,
  Badge,
  BadgeWithDot,
  Button,
  Input,
  MetricCard,
  Table,
  TableCard,
} from "@mvp-ui/ui";
import {
  Inbox,
  LayoutGrid,
  Plus,
  Rows3,
  Search,
  Sparkles,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import { getAvatarFor, getInitials } from "../_shared/assets";
import { CandidateQuickView } from "./CandidateQuickView";
import {
  CANDIDATES,
  type CandidateRecord,
  type CandidateSource,
  type CandidateStage,
  SOURCE_LABELS,
  STAGE_LABELS,
  STAGE_ORDER,
  TERMINAL_STAGES,
  fmtSource,
} from "./candidates-data";
import { CandidatesKanban } from "./CandidatesKanban";

const STAGE_FILTERS: { id: "all" | CandidateStage; label: string }[] = [
  { id: "all", label: "Tất cả" },
  ...STAGE_ORDER.map((s) => ({ id: s, label: STAGE_LABELS[s].label })),
  ...TERMINAL_STAGES.map((s) => ({ id: s, label: STAGE_LABELS[s].label })),
];

const SOURCE_FILTERS: { id: "all" | CandidateSource; label: string }[] = [
  { id: "all", label: "Tất cả nguồn" },
  ...(Object.keys(SOURCE_LABELS) as CandidateSource[]).map((s) => ({
    id: s,
    label: SOURCE_LABELS[s],
  })),
];

const COLUMNS = [
  { id: "candidate", name: "Ứng viên", isRowHeader: true as const },
  { id: "applied", name: "Vị trí ứng tuyển" },
  { id: "source", name: "Nguồn" },
  { id: "stage", name: "Stage" },
  { id: "score", name: "Match" },
  { id: "recruiter", name: "Phụ trách" },
  { id: "last", name: "Liên hệ gần nhất" },
];

function ScoreCell({ score }: { score: number }) {
  const color = score >= 85 ? "text-success" : score >= 65 ? "text-fg" : "text-fg-tertiary";
  return <span className={`text-sm font-semibold ${color}`}>{score}</span>;
}

function CandidateRow({
  record,
  onSelect,
}: {
  record: CandidateRecord;
  onSelect: (record: CandidateRecord) => void;
}) {
  const stage = STAGE_LABELS[record.stage];
  return (
    <Table.Row id={record.id} onAction={() => onSelect(record)}>
      <Table.Cell>
        <div className="flex items-center gap-3">
          <AvatarProfilePhoto
            size="sm"
            state={
              record.stage === "hired"
                ? "verified"
                : record.stage === "blacklist"
                  ? "blocked"
                  : null
            }
            src={getAvatarFor(record.fullName, record.id)}
            alt={record.fullName}
            initials={getInitials(record.fullName)}
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{record.fullName}</div>
            <div className="truncate text-sm text-fg-tertiary">
              {record.code} • {record.phone}
            </div>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.appliedPosition}</div>
        {record.hiringRequestCode ? (
          <div className="text-sm text-fg-tertiary">{record.hiringRequestCode}</div>
        ) : null}
      </Table.Cell>
      <Table.Cell>
        <Badge color="gray" type="pill-color" size="sm">
          {fmtSource(record.source)}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <BadgeWithDot color={stage.color} type="pill-color" size="sm">
          {stage.label}
        </BadgeWithDot>
      </Table.Cell>
      <Table.Cell>
        <ScoreCell score={record.score} />
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{record.recruiter}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg-tertiary">{record.lastTouchAt}</div>
      </Table.Cell>
    </Table.Row>
  );
}

type ViewMode = "table" | "kanban";

export function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<(typeof STAGE_FILTERS)[number]["id"]>(
    "all",
  );
  const [sourceFilter, setSourceFilter] = useState<
    (typeof SOURCE_FILTERS)[number]["id"]
  >("all");
  const [view, setView] = useState<ViewMode>("kanban");
  const [selected, setSelected] = useState<CandidateRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    return CANDIDATES.filter((c) => {
      const matchesStage = stageFilter === "all" ? true : c.stage === stageFilter;
      const matchesSource = sourceFilter === "all" ? true : c.source === sourceFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        q === "" ||
        c.fullName.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        (c.email?.toLowerCase().includes(q) ?? false);
      return matchesStage && matchesSource && matchesSearch;
    });
  }, [search, stageFilter, sourceFilter]);

  const inPipeline = CANDIDATES.filter((c) => STAGE_ORDER.includes(c.stage) && c.stage !== "hired").length;
  const newThisWeek = CANDIDATES.filter((c) => c.stage === "new").length;
  const trialingNow = CANDIDATES.filter((c) => c.stage === "onboarding").length;
  const hiredCount = CANDIDATES.filter((c) => c.stage === "hired").length;
  const totalProcessed = CANDIDATES.length;
  const conversion = totalProcessed > 0 ? Math.round((hiredCount / totalProcessed) * 100) : 0;

  const openDrawer = (record: CandidateRecord) => {
    setSelected(record);
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-fg">Ứng viên</h1>
            <p className="max-w-3xl text-base text-fg-tertiary">
              Theo dõi pipeline ứng viên theo từng hiring request, từ lúc nhận đơn đến khi
              kích hoạt thành CTV chính thức.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Button color="secondary" size="sm">Import CSV</Button>
            <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
              Thêm ứng viên
            </Button>
          </div>
        </div>
      }
    >
      {/* <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          label="Đang trong pipeline"
          value={`${inPipeline}`}
          helpText="Số ứng viên đang ở các bước trước khi nhận việc."
          iconChip={<Users className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Mới + sàng lọc"
          value={`${newThisWeek}`}
          helpText="Ứng viên cần chăm sóc ngay trong tuần này."
          iconChip={<Inbox className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
        />
        <MetricCard
          label="Ca thử + onboarding"
          value={`${trialingNow}`}
          helpText="Ứng viên đang chạy ca thử hoặc hoàn tất hồ sơ CTV."
          iconChip={<Sparkles className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="success"
          iconPlacement="inline"
        />
        <MetricCard
          label="Tỉ lệ chuyển thành CTV"
          value={`${conversion}%`}
          helpText={`${hiredCount}/${totalProcessed} ứng viên đã trở thành CTV chính thức.`}
          iconChip={<Trophy className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
      </div> */}

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên, SĐT, email hoặc mã ứng viên"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm ứng viên"
            />
            <div className="flex items-center gap-2 rounded-lg border border-border-secondary bg-bg p-1">
              <button
                type="button"
                onClick={() => setView("table")}
                aria-pressed={view === "table"}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${view === "table"
                  ? "bg-bg-secondary text-fg"
                  : "text-fg-tertiary hover:text-fg"
                  }`}
              >
                <Rows3 className="size-4" />
                Bảng
              </button>
              <button
                type="button"
                onClick={() => setView("kanban")}
                aria-pressed={view === "kanban"}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${view === "kanban"
                  ? "bg-bg-secondary text-fg"
                  : "text-fg-tertiary hover:text-fg"
                  }`}
              >
                <LayoutGrid className="size-4" />
                Kanban
              </button>
            </div>
            <select
              value={sourceFilter}
              onChange={(event) =>
                setSourceFilter(event.target.value as typeof sourceFilter)
              }
              aria-label="Lọc theo nguồn ứng viên"
              className="rounded-lg border border-border-secondary bg-bg px-3 py-2 text-sm text-fg shadow-xs focus:outline-none focus:ring-2 focus:ring-border-brand"
            >
              {SOURCE_FILTERS.map((source) => (
                <option key={source.id} value={source.id}>
                  {source.label}
                </option>
              ))}
            </select>
          </div>
          {view === "table" && (
            <div className="flex flex-wrap gap-2">
              {STAGE_FILTERS.map((filter) => {
                const active = filter.id === stageFilter;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setStageFilter(filter.id)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${active
                      ? "border-border-brand bg-bg-secondary text-fg"
                      : "border-border-secondary bg-bg text-fg-tertiary hover:text-fg"
                      }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          )}
          <div className="flex items-center justify-between gap-2 text-sm text-fg-tertiary">
            <span>{filtered.length} ứng viên phù hợp với bộ lọc hiện tại.</span>
            <span className="inline-flex items-center gap-1.5">
              <UserPlus className="size-4" />
              Click vào ứng viên để xem nhanh
            </span>
          </div>
        </div>

        {view === "table" ? (
          <div className="overflow-x-auto">
            <Table aria-label="Danh sách ứng viên">
              <Table.Header>
                {COLUMNS.map((column) => (
                  <Table.Head
                    key={column.id}
                    id={column.id}
                    label={column.name}
                    {...(column.isRowHeader && { isRowHeader: true })}
                  />
                ))}
              </Table.Header>
              <Table.Body items={filtered}>
                {(record) => (
                  <CandidateRow record={record} onSelect={openDrawer} />
                )}
              </Table.Body>
            </Table>
          </div>
        ) : (
          <div className="px-4 py-4">
            <CandidatesKanban candidates={filtered} onSelect={openDrawer} />
          </div>
        )}
      </TableCard.Root>

      <CandidateQuickView
        candidate={selected}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </PageScaffold>
  );
}
