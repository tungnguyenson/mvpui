import { Carousel } from "@mvp-ui/ui";

const slides = [
  { label: "Boost team velocity", bg: "bg-primary/10 border-border-brand" },
  { label: "Ship with confidence", bg: "bg-success-bg border-border-success" },
  { label: "Track every metric", bg: "bg-warning-bg border-border" },
  { label: "Scale effortlessly", bg: "bg-bg-secondary border-border" },
];

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="size-4"
  >
    <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
  </svg>
);

export const Basic = () => (
  <div className="mx-auto w-full max-w-sm">
    <Carousel.Root>
      <Carousel.Content>
        {slides.map((slide) => (
          <Carousel.Item key={slide.label}>
            <div
              className={`flex h-40 items-center justify-center rounded-xl border ${slide.bg}`}
            >
              <span className="text-sm font-medium text-fg">{slide.label}</span>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>

      <div className="mt-3 flex items-center justify-between">
        <Carousel.PrevTrigger
          className={({ isDisabled }: { isDisabled: boolean }) =>
            `flex size-8 items-center justify-center rounded-lg border border-border text-fg-secondary transition-colors hover:bg-bg-secondary ${
              isDisabled ? "pointer-events-none opacity-40" : ""
            }`
          }
        >
          <Chevron dir="left" />
        </Carousel.PrevTrigger>

        <Carousel.IndicatorGroup className="flex gap-1.5">
          {({ index }: { index: number }) => (
            <Carousel.Indicator
              key={index}
              index={index}
              className={({ isSelected }: { isSelected: boolean }) =>
                `size-2 rounded-full transition-all ${
                  isSelected ? "w-4 bg-primary" : "bg-border-secondary hover:bg-fg-tertiary"
                }`
              }
            />
          )}
        </Carousel.IndicatorGroup>

        <Carousel.NextTrigger
          className={({ isDisabled }: { isDisabled: boolean }) =>
            `flex size-8 items-center justify-center rounded-lg border border-border text-fg-secondary transition-colors hover:bg-bg-secondary ${
              isDisabled ? "pointer-events-none opacity-40" : ""
            }`
          }
        >
          <Chevron dir="right" />
        </Carousel.NextTrigger>
      </div>
    </Carousel.Root>
  </div>
);

export const FeatureCards = () => {
  const cards = [
    {
      title: "Real-time analytics",
      body: "Track activation, retention, and revenue as events arrive — no nightly batch.",
      tag: "Insights",
    },
    {
      title: "Audience segments",
      body: "Build cohorts from any property and sync them to your favorite tools.",
      tag: "Targeting",
    },
    {
      title: "Funnels & flows",
      body: "See exactly where users drop off across multi-step journeys.",
      tag: "Conversion",
    },
  ];
  return (
    <div className="mx-auto w-full max-w-sm">
      <Carousel.Root>
        <Carousel.Content>
          {cards.map((card) => (
            <Carousel.Item key={card.title}>
              <div className="flex h-40 flex-col justify-between rounded-xl border border-border bg-bg-secondary p-5">
                <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-fg-brand">
                  {card.tag}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-fg">{card.title}</h3>
                  <p className="mt-1 text-sm text-fg-tertiary">{card.body}</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        <div className="mt-3 flex justify-center">
          <Carousel.IndicatorGroup className="flex gap-1.5">
            {({ index }: { index: number }) => (
              <Carousel.Indicator
                key={index}
                index={index}
                className={({ isSelected }: { isSelected: boolean }) =>
                  `size-2 rounded-full transition-all ${
                    isSelected ? "w-4 bg-primary" : "bg-border-secondary"
                  }`
                }
              />
            )}
          </Carousel.IndicatorGroup>
        </div>
      </Carousel.Root>
    </div>
  );
};

export const Overlaid = () => (
  <div className="mx-auto w-full max-w-sm">
    <Carousel.Root>
      <div className="relative">
        <Carousel.Content>
          {["Cape Town", "Lisbon", "Kyoto"].map((label) => (
            <Carousel.Item key={label}>
              <div className="flex h-40 items-center justify-center rounded-xl border border-border bg-bg-secondary">
                <span className="text-lg font-semibold text-fg">{label}</span>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>

        <Carousel.PrevTrigger
          className={({ isDisabled }: { isDisabled: boolean }) =>
            `absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg text-fg shadow-md transition-opacity ${
              isDisabled ? "pointer-events-none opacity-0" : "opacity-100"
            }`
          }
        >
          <Chevron dir="left" />
        </Carousel.PrevTrigger>

        <Carousel.NextTrigger
          className={({ isDisabled }: { isDisabled: boolean }) =>
            `absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg text-fg shadow-md transition-opacity ${
              isDisabled ? "pointer-events-none opacity-0" : "opacity-100"
            }`
          }
        >
          <Chevron dir="right" />
        </Carousel.NextTrigger>
      </div>
    </Carousel.Root>
  </div>
);
