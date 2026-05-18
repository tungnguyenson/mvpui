/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import {
	BoltIcon,
	ChatGPTIcon,
	ClaudeIcon,
	CursorIcon,
	FigmaIntegrationIcon,
	GeminiIcon,
	GitHubIntegrationIcon,
	GrokIcon,
	LovableIcon,
	NextjsIcon,
	PerplexityIcon,
	ReactIcon,
	ReplitIcon,
	TailwindCSSIcon,
	V0Icon,
	ViteIcon,
} from "@mvp-ui/ui";

const ALL_ICONS = [
	{ name: "BoltIcon", Component: BoltIcon },
	{ name: "ChatGPTIcon", Component: ChatGPTIcon },
	{ name: "ClaudeIcon", Component: ClaudeIcon },
	{ name: "CursorIcon", Component: CursorIcon },
	{ name: "FigmaIntegrationIcon", Component: FigmaIntegrationIcon },
	{ name: "GeminiIcon", Component: GeminiIcon },
	{ name: "GitHubIntegrationIcon", Component: GitHubIntegrationIcon },
	{ name: "GrokIcon", Component: GrokIcon },
	{ name: "LovableIcon", Component: LovableIcon },
	{ name: "NextjsIcon", Component: NextjsIcon },
	{ name: "PerplexityIcon", Component: PerplexityIcon },
	{ name: "ReactIcon", Component: ReactIcon },
	{ name: "ReplitIcon", Component: ReplitIcon },
	{ name: "TailwindCSSIcon", Component: TailwindCSSIcon },
	{ name: "V0Icon", Component: V0Icon },
	{ name: "ViteIcon", Component: ViteIcon },
];

export default function IntegrationIconsPage() {
	return (
		<div className="space-y-10 p-8">
			<div>
				<h1 className="text-fg text-2xl font-semibold">Integration Icons</h1>
				<p className="text-fg-secondary mt-1 text-sm">
					16 integration brand icons. Each accepts a{" "}
					<code className="text-fg-brand bg-bg-secondary rounded px-1 py-0.5 text-xs">
						grayscale
					</code>{" "}
					prop to render in{" "}
					<code className="text-fg-brand bg-bg-secondary rounded px-1 py-0.5 text-xs">
						fill-fg-quaternary
					</code>
					.
				</p>
				<pre className="bg-bg-secondary text-fg-secondary mt-3 rounded-lg p-3 text-xs">
					{`import { BoltIcon, ClaudeIcon } from "@mvp-ui/ui";`}
				</pre>
			</div>

			<section>
				<h2 className="text-fg mb-4 text-base font-medium">Full color</h2>
				<div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-8">
					{ALL_ICONS.map(({ name, Component }) => (
						<div
							key={name}
							className="border-border bg-bg flex flex-col items-center gap-2 rounded-xl border p-4"
						>
							<Component className="h-8 w-8" />
							<span className="text-fg-tertiary text-center text-xs">
								{name}
							</span>
						</div>
					))}
				</div>
			</section>

			<section>
				<h2 className="text-fg mb-4 text-base font-medium">
					Grayscale{" "}
					<code className="text-fg-secondary bg-bg-secondary rounded px-1 py-0.5 text-sm font-normal">
						grayscale
					</code>
				</h2>
				<div className="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-8">
					{ALL_ICONS.map(({ name, Component }) => (
						<div
							key={name}
							className="border-border bg-bg flex flex-col items-center gap-2 rounded-xl border p-4"
						>
							<Component className="h-8 w-8" grayscale />
							<span className="text-fg-tertiary text-center text-xs">
								{name}
							</span>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
