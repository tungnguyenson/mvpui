/**
 * Adapted from Untitled UI Figma reference (PRO license).
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import { AVATARS } from "@/lib/avatars";
import { LOGOS_BY_SLUG } from "@/lib/logos";
import {
  BarChart2,
  Calendar,
  Filter,
  Home,
  LayoutDashboard,
  Menu,
  MoreVertical,
  Plus,
  Search,
  Settings,
  TrendingDown,
  TrendingUp,
  Upload,
  Users,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  ButtonUtility,
  Drawer,
  Dropdown,
  Input,
  Pagination,
  ProgressBar,
  SidebarNavCollapsible,
  Table,
  TableCard,
} from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  Sparkline                                                                  */
/* -------------------------------------------------------------------------- */

function Sparkline({
  points,
  color,
}: {
  points: [number, number][];
  color: "success" | "error";
}) {
  const W = 300;
  const H = 56;
  const PAD = 4;

  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scaleX = (x: number) =>
    PAD + ((x - minX) / (maxX - minX || 1)) * (W - PAD * 2);
  const scaleY = (y: number) =>
    (H - PAD) - ((y - minY) / (maxY - minY || 1)) * (H - PAD * 2);

  const scaled = points.map(([x, y]) => [scaleX(x), scaleY(y)] as [number, number]);

  const first = scaled[0];
  if (!first) return null;

  let d = `M ${first[0]},${first[1]}`;
  for (let i = 1; i < scaled.length; i++) {
    const prev = scaled[i - 1]!;
    const curr = scaled[i]!;
    const cpx = (prev[0] + curr[0]) / 2;
    d += ` C ${cpx},${prev[1]} ${cpx},${curr[1]} ${curr[0]},${curr[1]}`;
  }

  const last = scaled[scaled.length - 1]!;
  const areaD = d + ` L ${last[0]},${H} L ${first[0]},${H} Z`;

  const stroke = color === "success" ? "#16a34a" : "#dc2626";
  const fill = color === "success" ? "#16a34a" : "#dc2626";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-14"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d={areaD} fill={fill} opacity={0.08} />
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const METRICS = [
  {
    label: "Total customers",
    value: "2,420",
    change: "40%",
    trend: "up" as const,
    sparkPoints: [
      [0, 10], [1, 14], [2, 11], [3, 17], [4, 15], [5, 21], [6, 19],
      [7, 24], [8, 22], [9, 28], [10, 26], [11, 32],
    ] as [number, number][],
  },
  {
    label: "Members",
    value: "1,210",
    change: "10%",
    trend: "down" as const,
    sparkPoints: [
      [0, 32], [1, 28], [2, 31], [3, 25], [4, 28], [5, 22], [6, 24],
      [7, 18], [8, 21], [9, 15], [10, 18], [11, 10],
    ] as [number, number][],
  },
  {
    label: "Active now",
    value: "316",
    change: "20%",
    trend: "up" as const,
    sparkPoints: [
      [0, 12], [1, 18], [2, 14], [3, 22], [4, 16], [5, 24], [6, 20],
      [7, 28], [8, 22], [9, 30], [10, 26], [11, 32],
    ] as [number, number][],
  },
];

type StatusKey = "Active" | "Trial" | "Inactive";


const COMPANIES: {
  id: number;
  name: string;
  domain: string;
  logoSlug: string;
  license: number;
  status: StatusKey;
  users: number;
  about: string;
}[] = [
    { id: 1, name: "Ephemeral", domain: "ephemeral.io", logoSlug: "ephemeral", license: 75, status: "Active", users: 6, about: "Cloud-native ephemeral computing" },
    { id: 2, name: "Stack3d Lab", domain: "stack3dlab.com", logoSlug: "stack3d-lab", license: 66, status: "Active", users: 4, about: "3D modeling and spatial design" },
    { id: 3, name: "Warpspeed", domain: "getwarpspeed.com", logoSlug: "warpspeed", license: 40, status: "Trial", users: 8, about: "High-performance code acceleration" },
    { id: 4, name: "CloudWatch", domain: "cloudwatch.app", logoSlug: "cloud-watch", license: 83, status: "Active", users: 12, about: "Infrastructure monitoring platform" },
    { id: 5, name: "ContrastAI", domain: "contrastai.com", logoSlug: "contrast-ai", license: 32, status: "Inactive", users: 3, about: "AI-powered accessibility tools" },
    { id: 6, name: "Convergence", domain: "convergence.io", logoSlug: "convergence", license: 22, status: "Trial", users: 7, about: "Cross-platform data synchronization" },
    { id: 7, name: "Sisyphus", domain: "sisyphus.com", logoSlug: "sisyphus", license: 49, status: "Active", users: 5, about: "Automated workflow management" },
  ];

const PAGE_SIZE = 7;

const STATUS_BADGE: Record<StatusKey, { color: "success" | "warning" | "error"; label: string }> = {
  Active: { color: "success", label: "Active" },
  Trial: { color: "warning", label: "Trial" },
  Inactive: { color: "error", label: "Inactive" },
};

const TABLE_COLUMNS = [
  { id: "company", name: "Company", isRowHeader: true as const },
  { id: "license", name: "License use" },
  { id: "status", name: "Status" },
  { id: "users", name: "Users" },
  { id: "about", name: "About" },
  { id: "actions", name: "" },
];

/* -------------------------------------------------------------------------- */
/*  Metric card                                                                */
/* -------------------------------------------------------------------------- */

function MetricCard({
  label,
  value,
  change,
  trend,
  sparkPoints,
}: (typeof METRICS)[number]) {
  return (
    <div className="flex flex-col bg-bg-secondary border border-border-secondary rounded-xl shadow-xs overflow-hidden flex-1 min-w-64">
      <div className="px-5 pt-3 pb-2">
        <span className="text-sm font-semibold text-fg">{label}</span>
      </div>
      <div className="relative bg-bg border border-border-secondary rounded-xl shadow-xs m-0 flex flex-col gap-5 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[30px] font-semibold leading-[38px] text-fg">{value}</span>
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1 text-sm font-medium ${trend === "up" ? "text-fg-success" : "text-fg-error"}`}
            >
              {trend === "up" ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
              {change}
            </span>
            <span className="text-sm font-medium text-fg-tertiary">vs last month</span>
          </div>
        </div>
        <Sparkline
          points={sparkPoints}
          color={trend === "up" ? "success" : "error"}
        />
        <button
          className="absolute top-[19px] right-[19px] flex items-center justify-center size-5 text-fg-tertiary hover:text-fg transition-colors"
          aria-label="More options"
        >
          <MoreVertical className="size-4" />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

function AppSidebar({ className }: { className?: string }) {
  return (
    <SidebarNavCollapsible
      className={`border-border-secondary ${className ?? ""}`}
      logo={
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-fg text-sm font-bold select-none">
            M
          </div>
          <span className="text-sm font-semibold text-fg">MVP UI</span>
        </div>
      }
      sections={[
        {
          label: "",
          items: [
            { id: "home", label: "Home", href: "#", icon: <Home className="size-5" /> },
            { id: "dashboard", label: "Dashboard", href: "#dashboard", icon: <LayoutDashboard className="size-5" /> },
            {
              id: "customers",
              label: "Customers",
              href: "#customers",
              icon: <Users className="size-5" />,
              items: [
                { id: "customers-overview", label: "Overview", href: "#customers" },
                { id: "customers-new", label: "New customers", href: "#customers-new" },
                { id: "customers-segments", label: "Segments", href: "#customers-segments" },
              ],
            },
            {
              id: "reporting",
              label: "Reporting",
              href: "#reporting",
              icon: <BarChart2 className="size-5" />,
              items: [
                { id: "reporting-overview", label: "Overview", href: "#reporting" },
                { id: "reporting-analytics", label: "Analytics", href: "#reporting-analytics" },
                { id: "reporting-exports", label: "Exports", href: "#reporting-exports" },
              ],
            },
          ],
        },
        {
          label: "",
          items: [
            { id: "settings", label: "Settings", href: "#settings", icon: <Settings className="size-5" /> },
          ],
        },
      ]}
      activeHref="#dashboard"
      account={{
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        avatarSrc: AVATARS[0]!.src,
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Main app                                                                   */
/* -------------------------------------------------------------------------- */

export function DashboardLiteApp() {
  const [navOpen, setNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set<number>());

  const filtered = COMPANIES.filter(
    (c) =>
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.domain.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex h-screen overflow-hidden flex-col md:flex-row bg-bg">
      {/* Mobile top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-border-secondary bg-bg px-4 py-3 md:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-fg text-sm font-bold select-none">
            M
          </div>
          <span className="text-sm font-semibold text-fg">MVP UI</span>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-fg-secondary hover:bg-bg-secondary transition-colors"
          aria-label="Open navigation"
          onClick={() => setNavOpen(true)}
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block shrink-0">
        <AppSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-bg">
        <div className="flex flex-col gap-8 px-4 py-8 md:px-8">
          {/* Page header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-xl font-semibold text-fg">Welcome back, Olivia</h1>
              <p className="text-base text-fg-tertiary">
                Track, manage and forecast your customers and orders.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                color="secondary"
                size="sm"
                iconLeading={<Upload className="size-4" />}
              >
                Import
              </Button>
              <Button
                color="primary"
                size="sm"
                iconLeading={<Plus className="size-4" />}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Metric cards */}
          <div className="flex flex-col gap-5 sm:flex-row">
            {METRICS.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>

          {/* Table section */}
          <TableCard.Root>
            {/* Filters bar */}
            <div className="flex flex-col gap-3 px-4 py-3 border-b border-border-secondary sm:flex-row sm:items-center sm:gap-3">
              {/* Date range */}
              <button
                type="button"
                className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border bg-bg text-sm font-semibold text-fg-secondary shadow-xs hover:bg-bg-secondary transition-colors shrink-0"
                aria-label="Select date range"
              >
                <Calendar className="size-4 text-fg-tertiary" />
                <span>Jan 8, 2027 – Jan 14, 2027</span>
              </button>

              {/* Search */}
              <div className="flex-1 min-w-0">
                <Input
                  placeholder="Search"
                  iconLeading={<Search className="size-4" />}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Search companies"
                />
              </div>

              {/* Filter button */}
              <ButtonUtility
                size="sm"
                color="secondary"
                icon={<Filter className="size-4" />}
                aria-label="Filter"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table
                aria-label="Customers"
                selectionMode="multiple"
                selectedKeys={selected}
                onSelectionChange={(keys) => {
                  if (keys === "all") {
                    setSelected(new Set(pageRows.map((r) => r.id)));
                  } else {
                    setSelected(keys as Set<number>);
                  }
                }}
              >
                <Table.Header>
                  {TABLE_COLUMNS.map((col) => (
                    <Table.Head
                      key={col.id}
                      id={col.id}
                      label={col.name}
                      {...(col.isRowHeader && { isRowHeader: true })}
                    />
                  ))}
                </Table.Header>
                <Table.Body items={pageRows}>
                  {(row) => (
                    <Table.Row id={row.id}>
                      {/* Company */}
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-bg overflow-hidden p-1">
                            <img
                              src={LOGOS_BY_SLUG[row.logoSlug]?.logomark ?? `/logos/logomark/${row.logoSlug}.svg`}
                              alt={row.name}
                              className="size-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-fg truncate">
                              {row.name}
                            </div>
                            <div className="text-sm text-fg-tertiary truncate">
                              {row.domain}
                            </div>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* License use */}
                      <Table.Cell>
                        <div className="min-w-28 flex flex-col gap-1">
                          <span className="text-xs text-fg-tertiary">{row.license}%</span>
                          <ProgressBar value={row.license} max={100} />
                        </div>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell>
                        <Badge
                          color={STATUS_BADGE[row.status].color}
                          type="pill-color"
                          size="sm"
                        >
                          {STATUS_BADGE[row.status].label}
                        </Badge>
                      </Table.Cell>

                      {/* Users */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1">
                            {Array.from({ length: Math.min(row.users, 4) }).map((_, i) => {
                              const av = AVATARS[(row.id * 7 + i) % AVATARS.length]!;
                              return (
                                <Avatar
                                  key={i}
                                  size="xs"
                                  src={av.src}
                                  alt={av.name}
                                  className="ring-2 ring-bg"
                                />
                              );
                            })}
                          </div>
                          <span className="text-sm text-fg-secondary">{row.users} users</span>
                        </div>
                      </Table.Cell>

                      {/* About */}
                      <Table.Cell>
                        <span className="text-sm text-fg-tertiary max-w-56 truncate block">
                          {row.about}
                        </span>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell>
                        <Dropdown.Root>
                          <Dropdown.DotsButton aria-label={`Actions for ${row.name}`} />
                          <Dropdown.Popover>
                            <Dropdown.Menu>
                              <Dropdown.Item id="view">View details</Dropdown.Item>
                              <Dropdown.Item id="edit">Edit</Dropdown.Item>
                              <Dropdown.Item id="delete">Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown.Popover>
                        </Dropdown.Root>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border-secondary">
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
                compact
              />
            </div>
          </TableCard.Root>
        </div>
      </main>

      {/* Mobile nav drawer */}
      <Drawer
        side="left"
        size="sm"
        isOpen={navOpen}
        onOpenChange={setNavOpen}
        aria-label="Navigation menu"
        showCloseButton
      >
        <AppSidebar className="border-r-0 w-full" />
      </Drawer>
    </div>
  );
}
