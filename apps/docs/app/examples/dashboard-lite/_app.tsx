/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  ShoppingCart,
  ChevronRight,
  Bell,
  Search,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  ButtonUtility,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dropdown,
  EmptyState,
  ProgressBar,
  Tag,
  TagGroup,
  TagList,
  Tooltip,
  TooltipTrigger,
} from "@mvp-ui/ui";

const STATS = [
  {
    label: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
    sub: "from last month",
  },
  {
    label: "Active Users",
    value: "2,350",
    change: "+15.3%",
    trend: "up" as const,
    icon: Users,
    sub: "from last month",
  },
  {
    label: "New Orders",
    value: "1,247",
    change: "-4.2%",
    trend: "down" as const,
    icon: ShoppingCart,
    sub: "from last month",
  },
  {
    label: "Conversion",
    value: "3.24%",
    change: "+1.1%",
    trend: "up" as const,
    icon: Activity,
    sub: "from last month",
  },
];

const RECENT_ORDERS = [
  { id: "#1234", customer: "Olivia Rhye", email: "olivia@untitledui.com", amount: "$240.00", status: "Paid", avatar: null },
  { id: "#1235", customer: "Phoenix Baker", email: "phoenix@untitledui.com", amount: "$120.00", status: "Pending", avatar: null },
  { id: "#1236", customer: "Lana Steiner", email: "lana@untitledui.com", amount: "$680.00", status: "Paid", avatar: null },
  { id: "#1237", customer: "Demi Wilkinson", email: "demi@untitledui.com", amount: "$340.00", status: "Failed", avatar: null },
  { id: "#1238", customer: "Candice Wu", email: "candice@untitledui.com", amount: "$910.00", status: "Paid", avatar: null },
];

const TEAM_ACTIVITY = [
  { name: "Natali Craig", role: "Closed 3 deals", time: "2h ago", initials: "NC" },
  { name: "Drew Cano", role: "Updated pipeline", time: "4h ago", initials: "DC" },
  { name: "Orlando Diggs", role: "Added 2 contacts", time: "6h ago", initials: "OD" },
  { name: "Andi Lane", role: "Sent 5 proposals", time: "8h ago", initials: "AL" },
];

const CHANNEL_PERFORMANCE = [
  { channel: "Organic Search", value: 68, color: "bg-primary" },
  { channel: "Direct", value: 45, color: "bg-primary" },
  { channel: "Email", value: 32, color: "bg-primary" },
  { channel: "Social", value: 24, color: "bg-primary" },
  { channel: "Referral", value: 18, color: "bg-primary" },
];

const STATUS_BADGE_MAP: Record<string, { color: "success" | "warning" | "error"; label: string }> = {
  Paid: { color: "success", label: "Paid" },
  Pending: { color: "warning", label: "Pending" },
  Failed: { color: "error", label: "Failed" },
};

export function DashboardLiteApp() {
  const [search, setSearch] = useState("");

  const filteredOrders = RECENT_ORDERS.filter(
    (o) =>
      search === "" ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.includes(search)
  );

  return (
    <div className="flex flex-col bg-bg-secondary h-full">
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-bg px-6">
        <h1 className="text-lg font-semibold text-fg">Dashboard</h1>
        <div className="ml-auto flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-tertiary" />
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 rounded-lg border border-border bg-bg pl-9 pr-3 text-sm text-fg placeholder:text-fg-tertiary outline-none focus:ring-2 focus:ring-brand-500/22 focus:border-border-brand"
            />
          </div>
          <Tooltip title="Notifications">
            <TooltipTrigger asChild>
              <ButtonUtility
                size="sm"
                icon={<Bell className="h-4 w-4" />}
                aria-label="Notifications"
              />
            </TooltipTrigger>
          </Tooltip>
          <Avatar
            size="sm"
            src={null}
            alt="Tung Nguyen"
            initials="TN"
          />
        </div>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-fg-secondary">
                    {stat.label}
                  </CardTitle>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg-secondary">
                    <Icon className="h-4 w-4 text-fg-tertiary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-fg">{stat.value}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-fg-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-fg-error" />
                    )}
                    <span
                      className={stat.trend === "up" ? "text-fg-success" : "text-fg-error"}
                    >
                      {stat.change}
                    </span>
                    <span className="text-fg-tertiary">{stat.sub}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent orders table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-fg">
                    Recent Orders
                  </CardTitle>
                  <p className="mt-0.5 text-sm text-fg-tertiary">
                    {filteredOrders.length} orders this period
                  </p>
                </div>
                <Button color="secondary" size="sm">
                  View all
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {filteredOrders.length === 0 ? (
                  <div className="px-6 py-8">
                    <EmptyState
                      icon={<ShoppingCart className="h-6 w-6" />}
                      title="No orders found"
                      description="Try a different search term."
                    />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="px-6 py-3 font-medium text-fg-tertiary">Order</th>
                          <th className="px-6 py-3 font-medium text-fg-tertiary">Customer</th>
                          <th className="px-6 py-3 font-medium text-fg-tertiary hidden sm:table-cell">Amount</th>
                          <th className="px-6 py-3 font-medium text-fg-tertiary">Status</th>
                          <th className="px-6 py-3 w-12" />
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => {
                          const statusInfo = STATUS_BADGE_MAP[order.status];
                          return (
                            <tr
                              key={order.id}
                              className="border-b border-border last:border-0 hover:bg-bg-secondary transition-colors"
                            >
                              <td className="px-6 py-3 font-mono text-fg-secondary">
                                {order.id}
                              </td>
                              <td className="px-6 py-3">
                                <div className="flex items-center gap-3">
                                  <Avatar
                                    size="xs"
                                    alt={order.customer}
                                    initials={order.customer.slice(0, 2).toUpperCase()}
                                  />
                                  <div className="min-w-0">
                                    <div className="truncate font-medium text-fg">
                                      {order.customer}
                                    </div>
                                    <div className="truncate text-xs text-fg-tertiary hidden sm:block">
                                      {order.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-3 font-medium text-fg hidden sm:table-cell">
                                {order.amount}
                              </td>
                              <td className="px-6 py-3">
                                <Badge color={statusInfo?.color ?? "gray"} type="pill-color">
                                  {statusInfo?.label ?? order.status}
                                </Badge>
                              </td>
                              <td className="px-6 py-3">
                                <Dropdown.Root>
                                  <Dropdown.DotsButton aria-label="Order actions" />
                                  <Dropdown.Popover>
                                    <Dropdown.Menu>
                                      <Dropdown.Item id="view">View details</Dropdown.Item>
                                      <Dropdown.Item id="edit">Edit order</Dropdown.Item>
                                      <Dropdown.Item id="cancel">Cancel order</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown.Popover>
                                </Dropdown.Root>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Channel performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold text-fg">
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {CHANNEL_PERFORMANCE.map((ch) => (
                  <div key={ch.channel} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-fg-secondary">{ch.channel}</span>
                      <span className="font-medium text-fg">{ch.value}%</span>
                    </div>
                    <ProgressBar
                      value={ch.value}
                      max={100}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team activity */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold text-fg">
                  Team Activity
                </CardTitle>
                <Tooltip title="More options">
                  <TooltipTrigger asChild>
                    <ButtonUtility
                      size="sm"
                      icon={<MoreHorizontal className="h-4 w-4" />}
                      aria-label="More options"
                    />
                  </TooltipTrigger>
                </Tooltip>
              </CardHeader>
              <CardContent className="space-y-4">
                {TEAM_ACTIVITY.map((member) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <Avatar
                      size="sm"
                      alt={member.name}
                      initials={member.initials}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-fg">
                        {member.name}
                      </div>
                      <div className="truncate text-xs text-fg-tertiary">
                        {member.role}
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-fg-tertiary">
                      {member.time}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold text-fg">
                  Deal Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TagGroup label="Deal tags" selectionMode="multiple">
                  <TagList className="flex flex-wrap gap-1.5 outline-none">
                    {["Enterprise", "SMB", "SaaS", "Renewal", "Expansion", "Inbound"].map(
                      (t) => (
                        <Tag key={t} id={t}>
                          {t}
                        </Tag>
                      )
                    )}
                  </TagList>
                </TagGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
