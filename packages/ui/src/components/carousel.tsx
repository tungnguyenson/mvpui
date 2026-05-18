"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/carousel/carousel-base.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * A8 exception: compound namespace API (Carousel.Root, .Content, .Item, …)
 * matches source convention for this component family.
 */

import type {
	CSSProperties,
	ComponentPropsWithRef,
	HTMLAttributes,
	KeyboardEvent,
	ReactNode,
	Ref,
} from "react";
import {
	cloneElement,
	createContext,
	isValidElement,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react";
import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: "horizontal" | "vertical";
	setApi?: (api: CarouselApi) => void;
}

interface CarouselContextProps extends CarouselProps {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
	selectedIndex: number;
	scrollSnaps: number[];
}

export type { CarouselApi };

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

export const CarouselContext = createContext<CarouselContextProps | null>(null);

export const useCarousel = () => {
	const context = useContext(CarouselContext);

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel.Root />");
	}

	return context;
};

/* -------------------------------------------------------------------------- */
/*  CarouselRoot                                                               */
/* -------------------------------------------------------------------------- */

const CarouselRoot = ({
	orientation = "horizontal",
	opts,
	setApi,
	plugins,
	className,
	children,
	...props
}: ComponentPropsWithRef<"div"> & CarouselProps) => {
	const [carouselRef, api] = useEmblaCarousel(
		{ ...opts, axis: orientation === "horizontal" ? "x" : "y" },
		plugins,
	);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const onInit = useCallback((api: CarouselApi) => {
		if (!api) return;
		setScrollSnaps(api.scrollSnapList());
	}, []);

	const onSelect = useCallback((api: CarouselApi) => {
		if (!api) return;
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
		setSelectedIndex(api.selectedScrollSnap());
	}, []);

	const scrollPrev = useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				scrollNext();
			}
		},
		[scrollPrev, scrollNext],
	);

	useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);

	useEffect(() => {
		if (!api) return;
		onInit(api);
		onSelect(api);
		api.on("reInit", onInit);
		api.on("reInit", onSelect);
		api.on("select", onSelect);
		return () => {
			api.off("select", onSelect);
		};
	}, [api, onInit, onSelect]);

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api,
				opts,
				orientation:
					orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
				selectedIndex,
				scrollSnaps,
			}}
		>
			<div
				onKeyDownCapture={handleKeyDown}
				className={cn("relative", className)}
				role="region"
				aria-roledescription="carousel"
				{...props}
			>
				{children}
			</div>
		</CarouselContext.Provider>
	);
};

/* -------------------------------------------------------------------------- */
/*  CarouselContent                                                            */
/* -------------------------------------------------------------------------- */

interface CarouselContentProps extends ComponentPropsWithRef<"div"> {
	overflowHidden?: boolean;
}

const CarouselContent = ({
	className,
	overflowHidden = true,
	...props
}: CarouselContentProps) => {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div
			ref={carouselRef}
			className={cn("h-full w-full", overflowHidden && "overflow-hidden")}
		>
			<div
				className={cn(
					"flex max-h-full",
					orientation === "vertical" && "flex-col",
					className,
				)}
				{...props}
			/>
		</div>
	);
};

/* -------------------------------------------------------------------------- */
/*  CarouselItem                                                               */
/* -------------------------------------------------------------------------- */

const CarouselItem = ({ className, ...props }: ComponentPropsWithRef<"div">) => (
	<div
		role="group"
		aria-roledescription="slide"
		className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
		{...props}
	/>
);

/* -------------------------------------------------------------------------- */
/*  Trigger (prev/next)                                                        */
/* -------------------------------------------------------------------------- */

interface TriggerRenderProps {
	isDisabled: boolean;
	onClick: () => void;
}

interface TriggerProps {
	ref?: Ref<HTMLButtonElement>;
	asChild?: boolean;
	direction: "prev" | "next";
	children: ReactNode | ((props: TriggerRenderProps) => ReactNode);
	style?: CSSProperties;
	className?: string | ((args: { isDisabled: boolean }) => string);
}

const Trigger = ({
	className,
	children,
	asChild,
	direction,
	style,
	...props
}: TriggerProps) => {
	const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
		useCarousel();

	const isDisabled = direction === "prev" ? !canScrollPrev : !canScrollNext;

	const handleClick = () => {
		if (isDisabled) return;
		direction === "prev" ? scrollPrev() : scrollNext();
	};

	const computedClassName =
		typeof className === "function" ? className({ isDisabled }) : className;

	const defaultAriaLabel =
		direction === "prev" ? "Previous slide" : "Next slide";

	if (typeof children === "function") {
		return <>{children({ isDisabled, onClick: handleClick })}</>;
	}

	if (asChild && isValidElement(children)) {
		return cloneElement(children, {
			onClick: handleClick,
			disabled: isDisabled,
			"aria-label": defaultAriaLabel,
			style: {
				...(children.props as HTMLAttributes<HTMLElement>).style,
				...style,
			},
			className:
				[
					computedClassName,
					(children.props as HTMLAttributes<HTMLElement>).className,
				]
					.filter(Boolean)
					.join(" ") || undefined,
		} as HTMLAttributes<HTMLElement>);
	}

	return (
		<button
			type="button"
			aria-label={defaultAriaLabel}
			disabled={isDisabled}
			className={computedClassName}
			onClick={handleClick}
			{...(props as ComponentPropsWithRef<"button">)}
		>
			{children}
		</button>
	);
};

const CarouselPrevTrigger = (props: Omit<TriggerProps, "direction">) => (
	<Trigger {...props} direction="prev" />
);

const CarouselNextTrigger = (props: Omit<TriggerProps, "direction">) => (
	<Trigger {...props} direction="next" />
);

/* -------------------------------------------------------------------------- */
/*  Indicators                                                                 */
/* -------------------------------------------------------------------------- */

interface CarouselIndicatorRenderProps {
	isSelected: boolean;
	onClick: () => void;
}

interface CarouselIndicatorProps {
	index: number;
	asChild?: boolean;
	isSelected?: boolean;
	children?: ReactNode | ((props: CarouselIndicatorRenderProps) => ReactNode);
	style?: CSSProperties;
	className?: string | ((args: { isSelected: boolean }) => string);
}

const CarouselIndicator = ({
	index,
	isSelected: isSelectedProp = false,
	children,
	asChild,
	className,
	style,
}: CarouselIndicatorProps) => {
	const { api, selectedIndex } = useCarousel();

	const isSelected = isSelectedProp || selectedIndex === index;

	const handleClick = () => {
		api?.scrollTo(index);
	};

	const computedClassName =
		typeof className === "function" ? className({ isSelected }) : className;
	const defaultAriaLabel = `Go to slide ${index + 1}`;

	if (typeof children === "function") {
		return <>{children({ isSelected, onClick: handleClick })}</>;
	}

	if (asChild && isValidElement(children)) {
		return cloneElement(children, {
			onClick: handleClick,
			"aria-label": defaultAriaLabel,
			"aria-current": isSelected ? "true" : undefined,
			style: {
				...(children.props as HTMLAttributes<HTMLElement>).style,
				...style,
			},
			className:
				[
					computedClassName,
					(children.props as HTMLAttributes<HTMLElement>).className,
				]
					.filter(Boolean)
					.join(" ") || undefined,
		} as HTMLAttributes<HTMLElement>);
	}

	return (
		<button
			type="button"
			aria-label={defaultAriaLabel}
			aria-current={isSelected ? "true" : undefined}
			className={computedClassName}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

interface CarouselIndicatorGroupProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	children: ReactNode | ((props: { index: number }) => ReactNode);
	className?: string;
}

const CarouselIndicatorGroup = ({
	children,
	...props
}: CarouselIndicatorGroupProps) => {
	const { scrollSnaps } = useCarousel();

	if (typeof children === "function") {
		return (
			<nav {...props}>
				{scrollSnaps.map((_, index) => children({ index }))}
			</nav>
		);
	}

	return <nav {...props}>{children}</nav>;
};

/* -------------------------------------------------------------------------- */
/*  Compound export                                                            */
/* -------------------------------------------------------------------------- */

export const Carousel = {
	Root: CarouselRoot,
	Content: CarouselContent,
	Item: CarouselItem,
	PrevTrigger: CarouselPrevTrigger,
	NextTrigger: CarouselNextTrigger,
	IndicatorGroup: CarouselIndicatorGroup,
	Indicator: CarouselIndicator,
};
