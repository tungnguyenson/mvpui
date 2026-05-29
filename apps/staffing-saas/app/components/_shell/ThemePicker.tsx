"use client";

import { Dropdown } from "@mvp-ui/ui";
import { Moon, PanelLeft, PanelTop, Sun, SunMoon } from "lucide-react";
import type { CSSProperties, FC } from "react";
import { MenuItem as AriaMenuItem } from "react-aria-components";
import { type NavLayout, useNavLayout } from "./NavLayoutContext";
import { type AppearanceMode, useAppearance } from "./ThemeContext";

const PANEL_STYLES = {
	light: {
		"--color-bg": "#ffffff",
		"--color-bg-secondary": "var(--gray-25)",
		"--color-border-secondary": "var(--gray-200)",
		"--color-fg-tertiary": "var(--gray-500)",
	} as CSSProperties,
	dark: {
		"--color-bg": "var(--gray-950)",
		"--color-bg-secondary": "var(--gray-900)",
		"--color-border-secondary": "var(--gray-800)",
		"--color-fg-tertiary": "var(--gray-400)",
	} as CSSProperties,
} as const;

interface ModeOption {
	id: AppearanceMode;
	label: string;
	description: string;
	icon: FC<{ className?: string }>;
	navTheme: "light" | "dark";
	contentTheme: "light" | "dark";
}

const MODE_OPTIONS = [
	{
		id: "light",
		label: "Sáng",
		description: "Toàn bộ giao diện nền sáng.",
		icon: Sun,
		navTheme: "light",
		contentTheme: "light",
	},
	{
		id: "dark",
		label: "Tối",
		description: "Toàn bộ giao diện nền tối.",
		icon: Moon,
		navTheme: "dark",
		contentTheme: "dark",
	},
	{
		id: "mixed",
		label: "Hỗn hợp",
		description: "Sidebar tối, nội dung sáng.",
		icon: SunMoon,
		navTheme: "dark",
		contentTheme: "light",
	},
] as const satisfies readonly ModeOption[];

const LIGHT_OPTION = MODE_OPTIONS[0];

const LAYOUT_OPTIONS = [
	{ id: "sidebar", label: "Thanh bên", icon: PanelLeft },
	{ id: "header", label: "Thanh trên", icon: PanelTop },
] as const satisfies readonly {
	id: NavLayout;
	label: string;
	icon: FC<{ className?: string }>;
}[];

function ModeThumbnail({ option }: { option: ModeOption }) {
	return (
		<div className="flex h-9 w-14 shrink-0 overflow-hidden rounded-md border border-border-secondary">
			<div
				style={PANEL_STYLES[option.navTheme]}
				className="flex w-4 flex-col gap-0.5 border-r border-border-secondary bg-bg p-1"
			>
				<span className="block h-0.5 rounded-full bg-fg-tertiary/60" />
				<span className="block h-0.5 rounded-full bg-fg-tertiary/40" />
				<span className="block h-0.5 rounded-full bg-fg-tertiary/40" />
			</div>
			<div
				style={PANEL_STYLES[option.contentTheme]}
				className="flex flex-1 flex-col gap-0.5 bg-bg-secondary p-1"
			>
				<span className="block h-0.5 w-3/4 rounded-full bg-fg-tertiary/50" />
				<span className="block h-0.5 w-1/2 rounded-full bg-fg-tertiary/30" />
			</div>
		</div>
	);
}

function TriggerIcon({ mode }: { mode: AppearanceMode }) {
	const option = MODE_OPTIONS.find((o) => o.id === mode) ?? LIGHT_OPTION;
	const Icon = option.icon;
	return <Icon className="size-5" />;
}

export function ThemePicker() {
	const { mode, setMode } = useAppearance();
	const { navLayout, setNavLayout } = useNavLayout();
	const currentLabel = MODE_OPTIONS.find((o) => o.id === mode)?.label ?? "Giao diện";

	return (
		<Dropdown.Root>
			<Dropdown.Trigger
				color="tertiary"
				size="lg"
				aria-label={`Giao diện: ${currentLabel}`}
				className="p-3"
			>
				<TriggerIcon mode={mode} />
			</Dropdown.Trigger>
			<Dropdown.Popover className="w-72">
				<Dropdown.Menu
					onAction={(key) => setMode(key as AppearanceMode)}
					aria-label="Chọn chế độ giao diện"
				>
					{MODE_OPTIONS.map((option) => (
						<AriaMenuItem
							key={option.id}
							id={option.id}
							textValue={option.label}
							className="group block cursor-pointer px-1.5 py-px outline-hidden"
						>
							<div className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors group-data-hovered:bg-bg-secondary group-data-focused:bg-bg-secondary">
								<ModeThumbnail option={option} />
								<div className="flex min-w-0 flex-col">
									<span className="text-sm font-semibold text-fg">{option.label}</span>
									<span className="truncate text-xs text-fg-tertiary">{option.description}</span>
								</div>
								{mode === option.id && (
									<span className="ml-auto size-2 shrink-0 rounded-full bg-primary" />
								)}
							</div>
						</AriaMenuItem>
					))}
				</Dropdown.Menu>

				<div className="mt-1 border-t border-border-secondary px-3 pt-2.5 pb-1.5">
					<p className="px-0.5 pb-1.5 text-xs font-semibold text-fg-tertiary">Bố cục điều hướng</p>
					<div className="flex gap-1 rounded-lg bg-bg-secondary p-1">
						{LAYOUT_OPTIONS.map((option) => {
							const Icon = option.icon;
							const active = navLayout === option.id;
							return (
								<button
									key={option.id}
									type="button"
									onClick={() => setNavLayout(option.id)}
									aria-pressed={active}
									className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
										active
											? "bg-bg text-fg shadow-xs ring-1 ring-border"
											: "text-fg-tertiary hover:text-fg"
									}`}
								>
									<Icon className="size-4" />
									{option.label}
								</button>
							);
						})}
					</div>
				</div>
			</Dropdown.Popover>
		</Dropdown.Root>
	);
}
