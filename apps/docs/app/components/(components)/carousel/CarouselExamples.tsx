"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Carousel } from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  BasicCarouselDemo                                                          */
/* -------------------------------------------------------------------------- */

const slides = [
	{ label: "Slide 1", bg: "bg-primary/10 border-border-brand" },
	{ label: "Slide 2", bg: "bg-success-bg border-border-success" },
	{ label: "Slide 3", bg: "bg-warning-bg border-border" },
	{ label: "Slide 4", bg: "bg-bg-secondary border-border" },
];

export function BasicCarouselDemo() {
	return (
		<div className="w-full max-w-sm mx-auto">
			<Carousel.Root>
				<Carousel.Content>
					{slides.map((slide) => (
						<Carousel.Item key={slide.label}>
							<div
								className={`flex h-40 items-center justify-center rounded-xl border ${slide.bg}`}
							>
								<span className="text-sm font-medium text-fg">
									{slide.label}
								</span>
							</div>
						</Carousel.Item>
					))}
				</Carousel.Content>

				{/* Nav buttons */}
				<div className="mt-3 flex items-center justify-between">
					<Carousel.PrevTrigger
						className={({ isDisabled }) =>
							`flex size-8 items-center justify-center rounded-lg border border-border text-fg-secondary transition-colors
              hover:bg-bg-secondary ${isDisabled ? "opacity-40 pointer-events-none" : ""}`
						}
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
							<path d="M15 18l-6-6 6-6" />
						</svg>
					</Carousel.PrevTrigger>

					{/* Dot indicators */}
					<Carousel.IndicatorGroup className="flex gap-1.5">
						{({ index }) => (
							<Carousel.Indicator
								key={index}
								index={index}
								className={({ isSelected }) =>
									`size-2 rounded-full transition-all ${isSelected ? "bg-primary w-4" : "bg-border-secondary hover:bg-fg-tertiary"}`
								}
							/>
						)}
					</Carousel.IndicatorGroup>

					<Carousel.NextTrigger
						className={({ isDisabled }) =>
							`flex size-8 items-center justify-center rounded-lg border border-border text-fg-secondary transition-colors
              hover:bg-bg-secondary ${isDisabled ? "opacity-40 pointer-events-none" : ""}`
						}
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
							<path d="M9 18l6-6-6-6" />
						</svg>
					</Carousel.NextTrigger>
				</div>
			</Carousel.Root>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  MultiSlideDemo                                                             */
/* -------------------------------------------------------------------------- */

export function MultiSlideDemo() {
	const items = Array.from({ length: 6 }, (_, i) => ({
		id: i + 1,
		label: `Card ${i + 1}`,
	}));

	return (
		<div className="w-full max-w-lg mx-auto">
			<Carousel.Root opts={{ align: "start" }}>
				<Carousel.Content className="gap-3">
					{items.map((item) => (
						<Carousel.Item
							key={item.id}
							className="basis-1/3"
						>
							<div className="flex h-28 items-center justify-center rounded-xl border border-border bg-bg-secondary">
								<span className="text-sm font-medium text-fg">
									{item.label}
								</span>
							</div>
						</Carousel.Item>
					))}
				</Carousel.Content>

				<div className="mt-3 flex justify-center gap-1.5">
					<Carousel.IndicatorGroup className="flex gap-1.5">
						{({ index }) => (
							<Carousel.Indicator
								key={index}
								index={index}
								className={({ isSelected }) =>
									`size-2 rounded-full transition-all ${isSelected ? "bg-primary" : "bg-border-secondary"}`
								}
							/>
						)}
					</Carousel.IndicatorGroup>
				</div>
			</Carousel.Root>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  AsChildDemo                                                                */
/* -------------------------------------------------------------------------- */

export function AsChildDemo() {
	return (
		<div className="w-full max-w-sm mx-auto">
			<Carousel.Root>
				<div className="relative">
					<Carousel.Content>
						{["One", "Two", "Three"].map((label) => (
							<Carousel.Item key={label}>
								<div className="flex h-40 items-center justify-center rounded-xl bg-bg-secondary border border-border">
									<span className="text-lg font-semibold text-fg">{label}</span>
								</div>
							</Carousel.Item>
						))}
					</Carousel.Content>

					<Carousel.PrevTrigger
						asChild
						className={({ isDisabled }) =>
							`absolute left-2 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-bg shadow-md border border-border text-fg transition-opacity ${isDisabled ? "opacity-0 pointer-events-none" : "opacity-100"}`
						}
					>
						<button type="button">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
								<path d="M15 18l-6-6 6-6" />
							</svg>
						</button>
					</Carousel.PrevTrigger>

					<Carousel.NextTrigger
						asChild
						className={({ isDisabled }) =>
							`absolute right-2 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-bg shadow-md border border-border text-fg transition-opacity ${isDisabled ? "opacity-0 pointer-events-none" : "opacity-100"}`
						}
					>
						<button type="button">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
								<path d="M9 18l6-6-6-6" />
							</svg>
						</button>
					</Carousel.NextTrigger>
				</div>
			</Carousel.Root>
		</div>
	);
}
