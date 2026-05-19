/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BarChart2,
  Bold,
  CheckSquare,
  Clock,
  ExternalLink,
  FolderOpen,
  Headphones,
  HelpCircle,
  Home,
  Italic,
  LayoutDashboard,
  List,
  Mail,
  Menu,
  Search,
  Settings,
  Underline,
  Upload,
  Users,
  X,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Input,
  ProgressBarCircle,
  Select,
  SidebarNavSimple,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const COUNTRIES = [
  { id: "au", label: "🇦🇺  Australia" },
  { id: "us", label: "🇺🇸  United States" },
  { id: "gb", label: "🇬🇧  United Kingdom" },
  { id: "ca", label: "🇨🇦  Canada" },
  { id: "de", label: "🇩🇪  Germany" },
  { id: "fr", label: "🇫🇷  France" },
  { id: "jp", label: "🇯🇵  Japan" },
  { id: "sg", label: "🇸🇬  Singapore" },
];

const TIMEZONES = [
  { id: "pst", label: "Pacific Standard Time (PST)  UTC−08:00" },
  { id: "mst", label: "Mountain Standard Time (MST)  UTC−07:00" },
  { id: "cst", label: "Central Standard Time (CST)  UTC−06:00" },
  { id: "est", label: "Eastern Standard Time (EST)  UTC−05:00" },
  { id: "utc", label: "Coordinated Universal Time (UTC)  UTC+00:00" },
  { id: "cet", label: "Central European Time (CET)  UTC+01:00" },
  { id: "jst", label: "Japan Standard Time (JST)  UTC+09:00" },
  { id: "aest", label: "Australian Eastern Time (AEST)  UTC+10:00" },
];

/* -------------------------------------------------------------------------- */
/*  Settings app (sidebar + main)                                              */
/* -------------------------------------------------------------------------- */

export function SettingsApp() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden flex-col md:flex-row bg-bg">
      {/* Mobile top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-border-secondary bg-bg px-4 py-3 md:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-fg text-sm font-bold">
            M
          </div>
          <span className="text-sm font-semibold text-fg">MVP UI</span>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-fg-secondary hover:bg-bg-secondary transition-colors"
          aria-label="Open menu"
          onClick={() => setNavOpen(true)}
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Sidebar — desktop only */}
      <div className="hidden md:block shrink-0">
        <AppSidebar />
      </div>

      <SettingsMain />

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

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

function AppSidebar({ className }: { className?: string }) {
  const [showUsedSpace, setShowUsedSpace] = useState(true);

  return (
    <SidebarNavSimple
      className={`border-border-secondary ${className ?? ""}`}
      logo={
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-fg text-sm font-bold">
              M
            </div>
            <span className="text-sm font-semibold text-fg">MVP UI</span>
          </div>
          <Input
            placeholder="Search"
            iconLeading={<Search className="size-4" />}
            shortcut="⌘K"
            aria-label="Search"
          />
        </div>
      }
      items={[
        { id: "home", label: "Home", href: "#", icon: <Home className="size-5" />, items: [] },
        { id: "dashboard", label: "Dashboard", href: "#", icon: <LayoutDashboard className="size-5" />, items: [] },
        { id: "projects", label: "Projects", href: "#", icon: <FolderOpen className="size-5" />, items: [] },
        { id: "tasks", label: "Tasks", href: "#", icon: <CheckSquare className="size-5" />, items: [], badge: 8 },
        { id: "reporting", label: "Reporting", href: "#", icon: <BarChart2 className="size-5" />, items: [] },
        { id: "users", label: "Users", href: "#", icon: <Users className="size-5" />, items: [] },
      ]}
      activeHref="#settings"
      footerItems={[
        { id: "settings", label: "Settings", href: "#settings", icon: <Settings className="size-5" /> },
        { id: "support", label: "Support", href: "#support", icon: <Headphones className="size-5" />, badge: "Online" },
        { id: "open-in-browser", label: "Open in browser", href: "#open", icon: <ExternalLink className="size-5" /> },
      ]}
      featureCard={
        showUsedSpace ? (
          <div className="rounded-xl border border-border-secondary bg-bg p-4">
            <div className="mb-3 flex items-start justify-between">
              <ProgressBarCircle value={80} size="xxs" />
              <button
                onClick={() => setShowUsedSpace(false)}
                className="rounded p-0.5 text-fg-tertiary hover:text-fg transition-colors"
                aria-label="Dismiss"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="text-sm font-semibold text-fg">Used space</p>
            <p className="mt-0.5 text-xs text-fg-tertiary">
              Your team has used 80% of your available space. Need more?
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() => setShowUsedSpace(false)}
                className="text-xs font-medium text-fg-secondary hover:text-fg transition-colors"
              >
                Dismiss
              </button>
              <button className="text-xs font-medium text-fg-brand hover:text-primary transition-colors">
                Upgrade plan
              </button>
            </div>
          </div>
        ) : undefined
      }
      account={{
        name: "Caitlyn King",
        email: "caitlyn@untitledui.com",
        avatarSrc: "https://i.pravatar.cc/80?u=caitlyn",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Main content                                                               */
/* -------------------------------------------------------------------------- */

const TAB_OPTIONS = [
  { id: "my-details", label: "My details" },
  { id: "profile", label: "Profile" },
  { id: "password", label: "Password" },
  { id: "team", label: "Team" },
  { id: "plan", label: "Plan" },
  { id: "billing", label: "Billing" },
  { id: "email", label: "Email" },
  { id: "notifications", label: "Notifications" },
  { id: "integrations", label: "Integrations" },
  { id: "api", label: "API" },
];

function SettingsMain() {
  const [activeTab, setActiveTab] = useState("my-details");

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
      {/* Desktop top bar */}
      <div className="hidden md:flex shrink-0 items-center justify-between bg-bg px-6 py-4">
        <h1 className="text-xl font-semibold text-fg">Settings</h1>
        <div className="w-56">
          <Input
            placeholder="Search"
            iconLeading={<Search className="size-4" />}
            shortcut="⌘K"
            aria-label="Search settings"
          />
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden shrink-0 px-4 pt-4 pb-2 space-y-3">
        <h1 className="text-2xl font-semibold text-fg">Settings</h1>
        <Input
          placeholder="Search"
          iconLeading={<Search className="size-4" />}
          aria-label="Search settings"
        />
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-y-auto bg-bg">
        <Tabs selectedKey={activeTab} onSelectionChange={(k) => setActiveTab(String(k))} variant="pill" className="flex flex-col" size="sm">
          {/* Mobile tab selector */}
          <div className="md:hidden shrink-0 px-4 py-3">
            <Select
              value={activeTab}
              onChange={(k) => setActiveTab(String(k))}
              items={TAB_OPTIONS}
              aria-label="Settings section"
            >
              {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
            </Select>
          </div>

          {/* Desktop tab list */}
          <div className="hidden md:block shrink-0 px-6 py-3">
            <TabList aria-label="Settings sections">
              <Tab id="my-details">My details</Tab>
              <Tab id="profile">Profile</Tab>
              <Tab id="password">Password</Tab>
              <Tab id="team">Team</Tab>
              <Tab id="plan">Plan</Tab>
              <Tab id="billing">Billing</Tab>
              <Tab id="email">Email</Tab>
              <Tab id="notifications">
                <span className="flex items-center gap-1.5">
                  Notifications
                  <Badge color="brand" type="pill-color" size="sm">
                    2
                  </Badge>
                </span>
              </Tab>
              <Tab id="integrations">Integrations</Tab>
              <Tab id="api">API</Tab>
            </TabList>
          </div>

          <TabPanel id="my-details" className="outline-none">
            <MyDetailsForm />
          </TabPanel>
          <TabPanel id="profile" className="outline-none">
            <EmptyTabPanel label="Profile" />
          </TabPanel>
          <TabPanel id="password" className="outline-none">
            <EmptyTabPanel label="Password" />
          </TabPanel>
          <TabPanel id="team" className="outline-none">
            <EmptyTabPanel label="Team" />
          </TabPanel>
          <TabPanel id="plan" className="outline-none">
            <EmptyTabPanel label="Plan" />
          </TabPanel>
          <TabPanel id="billing" className="outline-none">
            <EmptyTabPanel label="Billing" />
          </TabPanel>
          <TabPanel id="email" className="outline-none">
            <EmptyTabPanel label="Email" />
          </TabPanel>
          <TabPanel id="notifications" className="outline-none">
            <EmptyTabPanel label="Notifications" />
          </TabPanel>
          <TabPanel id="integrations" className="outline-none">
            <EmptyTabPanel label="Integrations" />
          </TabPanel>
          <TabPanel id="api" className="outline-none">
            <EmptyTabPanel label="API" />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

function EmptyTabPanel({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-20 text-sm text-fg-tertiary">
      {label} settings
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  My details form                                                            */
/* -------------------------------------------------------------------------- */

function MyDetailsForm() {
  const [firstName, setFirstName] = useState("Olivia");
  const [lastName, setLastName] = useState("Rhye");
  const [email, setEmail] = useState("olivia@untitledui.com");
  const [role, setRole] = useState("Product Designer");
  const [country, setCountry] = useState<string>("au");
  const [timezone, setTimezone] = useState<string>("pst");
  const [bio, setBio] = useState(
    "I'm a Product Designer based in Melbourne, Australia. I specialize in UX/UI design, brand strategy, and Webflow development.",
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-6 py-0">
      {/* Section header */}
      <div className="flex items-start justify-between gap-4 pb-5">
        <div>
          <h2 className="text-base font-semibold text-fg">Personal info</h2>
          <p className="mt-0.5 text-sm text-fg-tertiary">
            Update your photo and personal details here.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button color="secondary" size="sm">
            Cancel
          </Button>
          <Button color="primary" size="sm" onClick={handleSave} disabled={saved}>
            {saved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      {/* Form rows */}
      <div className="divide-y divide-border-secondary border-t border-border-secondary max-w-3xl">
        {/* Name */}
        <FormRow label="Name" required>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              aria-label="First name"
            />
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              aria-label="Last name"
            />
          </div>
        </FormRow>

        {/* Email */}
        <FormRow label="Email address" required>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            iconLeading={<Mail className="size-4" />}
          />
        </FormRow>

        {/* Photo */}
        <FormRow
          label="Your photo"
          required
          hint="This will be displayed on your profile."
          tooltip="Recommended: square image, at least 400×400px."
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Avatar
              size="xl"
              src="https://i.pravatar.cc/150?u=olivia"
              alt="Olivia Rhye"
              initials="OR"
            />
            <label className="flex flex-1 cursor-pointer flex-col items-center gap-1.5 rounded-xl border border-dashed border-border-secondary bg-bg px-6 py-4 text-center transition-colors hover:bg-bg-secondary">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-secondary bg-bg shadow-xs">
                <Upload className="size-4 text-fg-tertiary" />
              </div>
              <p className="text-sm text-fg-secondary">
                <span className="font-semibold text-fg-brand">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-fg-tertiary">
                SVG, PNG, JPG or GIF (max. 800×400px)
              </p>
              <input type="file" className="sr-only" accept="image/*" />
            </label>
          </div>
        </FormRow>

        {/* Role */}
        <FormRow label="Role">
          <Input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Your role"
          />
        </FormRow>

        {/* Country */}
        <FormRow label="Country">
          <Select
            value={country}
            onChange={(k) => setCountry(String(k))}
            items={COUNTRIES}
            aria-label="Country"
          >
            {(item) => (
              <Select.Item id={item.id}>{item.label}</Select.Item>
            )}
          </Select>
        </FormRow>

        {/* Timezone */}
        <FormRow label="Timezone" tooltip="Used for scheduling and notifications.">
          <Select
            value={timezone}
            onChange={(k) => setTimezone(String(k))}
            items={TIMEZONES}
            aria-label="Timezone"
          >
            {(item) => (
              <Select.Item id={item.id}>
                <span className="flex items-center gap-2">
                  <Clock className="size-4 text-fg-tertiary" />
                  {item.label}
                </span>
              </Select.Item>
            )}
          </Select>
        </FormRow>

        {/* Bio */}
        <FormRow label="Bio" required hint="Write a short introduction.">
          <div className="overflow-hidden rounded-lg border border-border-secondary bg-bg shadow-xs focus-within:border-border-brand focus-within:ring-4 focus-within:ring-brand-500/22 transition-shadow">
            <div className="flex items-center gap-0.5 border-b border-border-secondary px-2 py-1.5">
              <ToolbarButton aria-label="Bold">
                <Bold className="size-3.5" />
              </ToolbarButton>
              <ToolbarButton aria-label="Italic">
                <Italic className="size-3.5" />
              </ToolbarButton>
              <ToolbarButton aria-label="Underline">
                <Underline className="size-3.5" />
              </ToolbarButton>
              <span className="mx-1 h-4 w-px bg-border" />
              <ToolbarButton aria-label="Color" className="relative">
                <span className="size-3.5 rounded-sm bg-fg" />
              </ToolbarButton>
              <span className="mx-1 h-4 w-px bg-border" />
              <ToolbarButton aria-label="Align left">
                <AlignLeft className="size-3.5" />
              </ToolbarButton>
              <ToolbarButton aria-label="Align center">
                <AlignCenter className="size-3.5" />
              </ToolbarButton>
              <ToolbarButton aria-label="Align right">
                <AlignRight className="size-3.5" />
              </ToolbarButton>
              <span className="mx-1 h-4 w-px bg-border" />
              <ToolbarButton aria-label="List">
                <List className="size-3.5" />
              </ToolbarButton>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full resize-none bg-transparent px-3 py-2.5 text-sm text-fg outline-none placeholder:text-fg-tertiary"
              placeholder="Write a short introduction…"
            />
          </div>
        </FormRow>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

interface FormRowProps {
  label: string;
  required?: boolean;
  hint?: string;
  tooltip?: string;
  children: React.ReactNode;
}

function FormRow({ label, required, hint, tooltip, children }: FormRowProps) {
  return (
    <div className="grid grid-cols-1 gap-3 py-5 md:grid-cols-[280px_1fr] md:items-start">
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-fg">
            {label}
            {required && <span className="ml-0.5 text-fg-error"> *</span>}
          </span>
          {tooltip && (
            <HelpCircle className="size-3.5 text-fg-quaternary" aria-hidden />
          )}
        </div>
        {hint && <p className="mt-0.5 text-sm text-fg-tertiary">{hint}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function ToolbarButton({ children, className, ...props }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-6 w-6 items-center justify-center rounded text-fg-tertiary transition-colors hover:bg-bg-secondary hover:text-fg ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
