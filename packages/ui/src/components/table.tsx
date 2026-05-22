/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/table/table.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import {
	createContext,
	type HTMLAttributes,
	isValidElement,
	type ReactNode,
	useContext,
} from "react";
import {
	Cell as AriaCell,
	type CellProps as AriaCellProps,
	Collection as AriaCollection,
	Column as AriaColumn,
	type ColumnProps as AriaColumnProps,
	Group as AriaGroup,
	Row as AriaRow,
	type RowProps as AriaRowProps,
	Table as AriaTable,
	type TableProps as AriaTableProps,
	TableBody as AriaTableBody,
	type TableBodyProps as AriaTableBodyProps,
	TableHeader as AriaTableHeader,
	type TableHeaderProps as AriaTableHeaderProps,
	useTableOptions,
} from "react-aria-components";
import { cn } from "../lib/cn.js";
import { Badge } from "./badges/badge.js";
import { Checkbox } from "./checkbox.js";

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

const TableContext = createContext<{ size: "sm" | "md" }>({ size: "md" });

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */

function ArrowDownIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<path d="M12 5v14M5 12l7 7 7-7" />
		</svg>
	);
}

function SortIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<path d="M8 9l4-4 4 4M8 15l4 4 4-4" />
		</svg>
	);
}

/* -------------------------------------------------------------------------- */
/*  TableCard                                                                  */
/* -------------------------------------------------------------------------- */

interface TableCardRootProps extends HTMLAttributes<HTMLDivElement> {
	size?: "sm" | "md";
}

const TableCardRoot = ({
	children,
	className,
	size = "md",
	...props
}: TableCardRootProps) => (
	<TableContext.Provider value={{ size }}>
		<div
			{...props}
			className={cn(
				"overflow-hidden bg-bg md:rounded-xl md:shadow-xs md:ring-1 md:ring-border",
				className,
			)}
		>
			{children}
		</div>
	</TableContext.Provider>
);

TableCardRoot.displayName = "TableCard.Root";

interface TableCardHeaderProps {
	title: string;
	badge?: ReactNode;
	description?: string;
	contentTrailing?: ReactNode;
	className?: string;
}

const TableCardHeader = ({
	title,
	badge,
	description,
	contentTrailing,
	className,
}: TableCardHeaderProps) => {
	const { size } = useContext(TableContext);

	return (
		<div
			className={cn(
				"relative flex flex-col items-start gap-4 border-b border-border bg-bg md:flex-row",
				size === "sm" ? "py-4 px-4 md:px-5" : "py-5 px-4 md:px-6",
				className,
			)}
		>
			<div className="flex flex-1 flex-col gap-0.5">
				<div className="flex items-center gap-2">
					<h2 className="text-sm font-semibold text-fg">{title}</h2>
					{badge ? (
						isValidElement(badge) ? (
							badge
						) : (
							<Badge color="gray" size="sm" type="modern">
								{badge}
							</Badge>
						)
					) : null}
				</div>
				{description && (
					<p className="text-sm text-fg-tertiary">{description}</p>
				)}
			</div>
			{contentTrailing}
		</div>
	);
};

TableCardHeader.displayName = "TableCard.Header";

export const TableCard = {
	Root: TableCardRoot,
	Header: TableCardHeader,
};

/* -------------------------------------------------------------------------- */
/*  TableRoot                                                                  */
/* -------------------------------------------------------------------------- */

interface TableRootProps extends AriaTableProps {
	size?: "sm" | "md";
}

const TableRoot = ({ className, size = "md", ...props }: TableRootProps) => {
	const context = useContext(TableContext);

	return (
		<TableContext.Provider value={{ size: context?.size ?? size }}>
			<div className="overflow-x-auto">
				<AriaTable
					className={(state) =>
						cn(
							"w-full overflow-x-hidden",
							typeof className === "function" ? className(state) : className,
						)
					}
					{...props}
				/>
			</div>
		</TableContext.Provider>
	);
};

TableRoot.displayName = "Table";

/* -------------------------------------------------------------------------- */
/*  TableHeader                                                                */
/* -------------------------------------------------------------------------- */

interface TableHeaderProps<T extends object>
	extends AriaTableHeaderProps<T> {
	bordered?: boolean;
	size?: "sm" | "md";
}

const TableHeader = <T extends object>({
	columns,
	children,
	bordered = true,
	className,
	size: sizeProp,
	...props
}: TableHeaderProps<T>) => {
	const context = useContext(TableContext);
	const { selectionBehavior, selectionMode } = useTableOptions();
	const size = sizeProp ?? context.size;

	return (
		<AriaTableHeader
			{...props}
			className={(state) =>
				cn(
					"relative bg-bg-secondary",
					size === "sm" ? "h-9" : "h-11",
					bordered &&
						"[&>tr>th]:after:pointer-events-none [&>tr>th]:after:absolute [&>tr>th]:after:inset-x-0 [&>tr>th]:after:bottom-0 [&>tr>th]:after:h-px [&>tr>th]:after:bg-border [&>tr>th]:focus-visible:after:bg-transparent",
					typeof className === "function" ? className(state) : className,
				)
			}
		>
			{selectionBehavior === "toggle" && (
				<AriaColumn
					className={cn(
						"relative py-2 pr-0 pl-4",
						size === "sm" ? "w-9 md:pl-5" : "w-11 md:pl-6",
					)}
				>
					{selectionMode === "multiple" && (
						<div className="flex items-start">
							<Checkbox slot="selection" />
						</div>
					)}
				</AriaColumn>
			)}
			<AriaCollection {...(columns !== undefined && { items: columns })}>{children}</AriaCollection>
		</AriaTableHeader>
	);
};

TableHeader.displayName = "Table.Header";

/* -------------------------------------------------------------------------- */
/*  TableHead                                                                  */
/* -------------------------------------------------------------------------- */

interface TableHeadProps extends AriaColumnProps {
	label?: string;
	tooltip?: string;
}

const TableHead = ({
	className,
	label,
	children,
	...props
}: TableHeadProps) => {
	const { selectionBehavior } = useTableOptions();

	return (
		<AriaColumn
			{...props}
			className={(state) =>
				cn(
					"relative p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-brand-500/22 focus-visible:ring-inset",
					selectionBehavior === "toggle" && "nth-2:pl-3",
					state.allowsSorting && "cursor-pointer",
					typeof className === "function" ? className(state) : className,
				)
			}
		>
			{(state) => (
				<AriaGroup className="flex items-center gap-1">
					<div className="flex items-center gap-1">
						{label && (
							<span className="text-xs font-semibold whitespace-nowrap text-fg-tertiary">
								{label}
							</span>
						)}
						{typeof children === "function" ? children(state) : children}
					</div>

					{state.allowsSorting &&
						(state.sortDirection ? (
							<ArrowDownIcon
								className={cn(
									"size-3 text-fg-tertiary",
									state.sortDirection === "ascending" && "rotate-180",
								)}
							/>
						) : (
							<SortIcon className="size-3 text-fg-tertiary" />
						))}
				</AriaGroup>
			)}
		</AriaColumn>
	);
};

TableHead.displayName = "Table.Head";

/* -------------------------------------------------------------------------- */
/*  TableRow                                                                   */
/* -------------------------------------------------------------------------- */

interface TableRowProps<T extends object> extends AriaRowProps<T> {
	highlightSelectedRow?: boolean;
	size?: "sm" | "md";
}

const TableRow = <T extends object>({
	columns,
	children,
	className,
	highlightSelectedRow = true,
	size: sizeProp,
	...props
}: TableRowProps<T>) => {
	const context = useContext(TableContext);
	const { selectionBehavior } = useTableOptions();
	const size = sizeProp ?? context.size;

	return (
		<AriaRow
			{...props}
			className={(state) =>
				cn(
					"relative outline-hidden transition-colors hover:bg-bg-secondary focus-visible:ring-2 focus-visible:ring-brand-500/22",
					size === "sm" ? "h-14" : "h-18",
					highlightSelectedRow && state.isSelected && "bg-bg-secondary",
					"[&>td]:after:absolute [&>td]:after:inset-x-0 [&>td]:after:bottom-0 [&>td]:after:h-px [&>td]:after:w-full [&>td]:after:bg-border last:[&>td]:after:hidden",
					typeof className === "function" ? className(state) : className,
				)
			}
		>
			{selectionBehavior === "toggle" && (
				<AriaCell
					className={cn(
						"relative py-2 pr-0 pl-4",
						size === "sm" ? "md:pl-5" : "md:pl-6",
					)}
				>
					<div className="flex items-end">
						<Checkbox slot="selection" />
					</div>
				</AriaCell>
			)}
			<AriaCollection {...(columns !== undefined && { items: columns })}>{children}</AriaCollection>
		</AriaRow>
	);
};

TableRow.displayName = "Table.Row";

/* -------------------------------------------------------------------------- */
/*  TableCell                                                                  */
/* -------------------------------------------------------------------------- */

interface TableCellProps extends AriaCellProps {
	size?: "sm" | "md";
}

const TableCell = ({ className, children, size: sizeProp, ...props }: TableCellProps) => {
	const context = useContext(TableContext);
	const { selectionBehavior } = useTableOptions();
	const size = sizeProp ?? context.size;

	return (
		<AriaCell
			{...props}
			className={(state) =>
				cn(
					"relative text-sm text-fg-secondary outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-brand-500/22 focus-visible:ring-inset",
					size === "sm" && "px-5 py-3",
					size === "md" && "px-6 py-4",
					selectionBehavior === "toggle" && "nth-2:pl-3",
					typeof className === "function" ? className(state) : className,
				)
			}
		>
			{children}
		</AriaCell>
	);
};

TableCell.displayName = "Table.Cell";

/* -------------------------------------------------------------------------- */
/*  Compound export                                                            */
/* -------------------------------------------------------------------------- */

const Table = TableRoot as typeof TableRoot & {
	Body: typeof AriaTableBody;
	Cell: typeof TableCell;
	Head: typeof TableHead;
	Header: typeof TableHeader;
	Row: typeof TableRow;
};

Table.Body = AriaTableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Header = TableHeader;
Table.Row = TableRow;

export { Table };
export type {
	TableRootProps,
	TableHeaderProps,
	TableHeadProps,
	TableRowProps,
	TableCellProps,
	TableCardRootProps,
	TableCardHeaderProps,
};
