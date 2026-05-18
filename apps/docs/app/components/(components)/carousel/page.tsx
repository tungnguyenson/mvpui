/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { ComponentDocLayout, type DocExample } from "../../../_components/docs/ComponentDocLayout";
import { BasicCarouselDemo, MultiSlideDemo, AsChildDemo } from "./CarouselExamples";

const SECTIONS: DocExample[] = [
	{
		id: "basic",
		title: "Basic",
		description:
			"Single-slide carousel with prev/next buttons and dot indicators. Arrow keys also navigate.",
		preview: <BasicCarouselDemo />,
		code: `<Carousel.Root>
  <Carousel.Content>
    <Carousel.Item>
      <div className="h-40 rounded-xl border bg-bg-secondary flex items-center justify-center">
        Slide 1
      </div>
    </Carousel.Item>
    {/* more slides... */}
  </Carousel.Content>

  <Carousel.PrevTrigger className={({ isDisabled }) => \`... \${isDisabled ? "opacity-40" : ""}\`}>
    <ChevronLeftIcon />
  </Carousel.PrevTrigger>

  <Carousel.IndicatorGroup className="flex gap-1.5">
    {({ index }) => (
      <Carousel.Indicator
        key={index}
        index={index}
        className={({ isSelected }) => isSelected ? "bg-primary w-4 h-2 rounded-full" : "size-2 bg-border-secondary rounded-full"}
      />
    )}
  </Carousel.IndicatorGroup>

  <Carousel.NextTrigger className={({ isDisabled }) => \`... \${isDisabled ? "opacity-40" : ""}\`}>
    <ChevronRightIcon />
  </Carousel.NextTrigger>
</Carousel.Root>`,
	},
	{
		id: "multi-slide",
		title: "Multi-slide",
		description:
			'Pass `opts={{ align: "start" }}` and set `basis-1/N` on `Carousel.Item` to show multiple slides at once.',
		preview: <MultiSlideDemo />,
		code: `<Carousel.Root opts={{ align: "start" }}>
  <Carousel.Content className="gap-3">
    {items.map(item => (
      <Carousel.Item key={item.id} className="basis-1/3">
        {/* card */}
      </Carousel.Item>
    ))}
  </Carousel.Content>
</Carousel.Root>`,
	},
	{
		id: "as-child",
		title: "Overlay buttons (asChild)",
		description:
			"Use `asChild` to forward carousel props onto your own button element. Useful for overlaid arrow controls.",
		preview: <AsChildDemo />,
		code: `<Carousel.PrevTrigger
  asChild
  className={({ isDisabled }) => \`absolute left-2 top-1/2 -translate-y-1/2 ... \${isDisabled ? "opacity-0" : ""}\`}
>
  <button type="button">
    <ChevronLeftIcon />
  </button>
</Carousel.PrevTrigger>`,
	},
];

export default function CarouselPage() {
	return (
		<ComponentDocLayout
			name="Carousel"
			tagline="Embla-powered carousel with compound namespace API, keyboard navigation, and flexible trigger / indicator slots."
			install={{
				usage: `import { Carousel, useCarousel } from "@mvp-ui/ui";`,
			}}
			sections={SECTIONS}
			tokenReference={[
				{ label: "Primitive", value: "embla-carousel-react" },
				{ label: "Orientation", value: "horizontal | vertical" },
				{ label: "API access", value: "useCarousel() hook" },
			]}
		/>
	);
}
