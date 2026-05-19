"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import { Badge, Button, Dropdown, Table, TableCard } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const COLUMNS = [
  { id: "name", name: "Name", isRowHeader: true, allowsSorting: true },
  { id: "status", name: "Status" },
  { id: "role", name: "Role" },
  { id: "email", name: "Email" },
  { id: "actions", name: "" },
];

const ROWS = [
  { id: 1, name: "Olivia Rhye", status: "Active", role: "Designer", email: "olivia@untitledui.com" },
  { id: 2, name: "Phoenix Baker", status: "Invited", role: "Product Manager", email: "phoenix@untitledui.com" },
  { id: 3, name: "Lana Steiner", status: "Active", role: "Engineering", email: "lana@untitledui.com" },
  { id: 4, name: "Demi Wilkinson", status: "Invited", role: "Marketing", email: "demi@untitledui.com" },
  { id: 5, name: "Candice Wu", status: "Active", role: "Design", email: "candice@untitledui.com" },
];

const STATUS_COLOR: Record<string, "success" | "warning"> = {
  Active: "success",
  Invited: "warning",
};

function BasicTable() {
  return (
    <Table aria-label="Team members" selectionMode="none">
      <Table.Header>
        {COLUMNS.slice(0, 4).map((col) => (
          <Table.Head key={col.id} id={col.id} {...(col.isRowHeader && { isRowHeader: true })} label={col.name} />
        ))}
      </Table.Header>
      <Table.Body items={ROWS}>
        {(row) => (
          <Table.Row id={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>
              <Badge color={STATUS_COLOR[row.status] ?? "gray"} type="pill-color" size="sm">
                {row.status}
              </Badge>
            </Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
            <Table.Cell>{row.email}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}

function SelectableTable() {
  const [selected, setSelected] = useState(new Set<number>());
  return (
    <Table
      aria-label="Selectable team members"
      selectionMode="multiple"
    >
      <Table.Header>
        {COLUMNS.slice(0, 4).map((col) => (
          <Table.Head key={col.id} id={col.id} {...(col.isRowHeader && { isRowHeader: true })} label={col.name} />
        ))}
      </Table.Header>
      <Table.Body items={ROWS}>
        {(row) => (
          <Table.Row id={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>
              <Badge color={STATUS_COLOR[row.status] ?? "gray"} type="pill-color" size="sm">
                {row.status}
              </Badge>
            </Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
            <Table.Cell>{row.email}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}

function CardTable() {
  return (
    <TableCard.Root>
      <TableCard.Header
        title="Team members"
        badge="5"
        description="Manage your team members and their permissions."
        contentTrailing={
          <Button color="secondary" size="sm">
            Add member
          </Button>
        }
      />
      <Table aria-label="Team members card">
        <Table.Header>
          {COLUMNS.map((col) => (
            <Table.Head key={col.id} id={col.id} {...(col.isRowHeader && { isRowHeader: true })} label={col.name} />
          ))}
        </Table.Header>
        <Table.Body items={ROWS}>
          {(row) => (
            <Table.Row id={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>
                <Badge color={STATUS_COLOR[row.status] ?? "gray"} type="pill-color" size="sm">
                  {row.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
              <Table.Cell>{row.email}</Table.Cell>
              <Table.Cell>
                <Dropdown.Root>
                  <Dropdown.DotsButton aria-label="Row actions" />
                  <Dropdown.Popover>
                    <Dropdown.Menu>
                      <Dropdown.Item id="edit">Edit</Dropdown.Item>
                      <Dropdown.Item id="copy">Copy link</Dropdown.Item>
                      <Dropdown.Item id="delete">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown.Root>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </TableCard.Root>
  );
}

const SECTIONS: DocExample[] = [
  {
    id: "basic",
    title: "Basic table",
    description:
      "React Aria Table with `selectionMode=\"none\"`. Columns use `Table.Head`, rows use `Table.Row` + `Table.Cell`.",
    preview: (
      <div className="w-full overflow-x-auto rounded-lg ring-1 ring-border">
        <BasicTable />
      </div>
    ),
    code: `<Table aria-label="Team members" selectionMode="none">
  <Table.Header>
    <Table.Head id="name" isRowHeader label="Name" />
    <Table.Head id="status" label="Status" />
    <Table.Head id="role" label="Role" />
    <Table.Head id="email" label="Email" />
  </Table.Header>
  <Table.Body items={ROWS}>
    {(row) => (
      <Table.Row id={row.id}>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell>{row.status}</Table.Cell>
        <Table.Cell>{row.role}</Table.Cell>
        <Table.Cell>{row.email}</Table.Cell>
      </Table.Row>
    )}
  </Table.Body>
</Table>`,
  },
  {
    id: "selectable",
    title: "Row selection",
    description:
      "Pass `selectionMode=\"multiple\"` to enable row checkboxes. `Table.Header` and `Table.Row` auto-inject the checkbox column.",
    preview: (
      <div className="w-full overflow-x-auto rounded-lg ring-1 ring-border">
        <SelectableTable />
      </div>
    ),
    code: `<Table aria-label="Selectable team" selectionMode="multiple">
  <Table.Header>
    <Table.Head id="name" isRowHeader label="Name" />
    <Table.Head id="status" label="Status" />
    <Table.Head id="role" label="Role" />
  </Table.Header>
  <Table.Body items={ROWS}>
    {(row) => (
      <Table.Row id={row.id}>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell>{row.status}</Table.Cell>
        <Table.Cell>{row.role}</Table.Cell>
      </Table.Row>
    )}
  </Table.Body>
</Table>`,
  },
  {
    id: "card",
    title: "TableCard wrapper",
    description:
      "`TableCard.Root` wraps the table in a rounded card. `TableCard.Header` adds title, badge, description, and trailing actions.",
    preview: (
      <div className="w-full">
        <CardTable />
      </div>
    ),
    code: `<TableCard.Root>
  <TableCard.Header
    title="Team members"
    badge="5"
    description="Manage your team."
    contentTrailing={<Button color="secondary" size="sm">Add member</Button>}
  />
  <Table aria-label="Team members">
    <Table.Header>...</Table.Header>
    <Table.Body items={ROWS}>
      {(row) => (
        <Table.Row id={row.id}>
          <Table.Cell>{row.name}</Table.Cell>
          <Table.Cell>
            <Dropdown.Root>
              <Dropdown.DotsButton />
              <Dropdown.Popover>
                <Dropdown.Menu>
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
</TableCard.Root>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Two sizes: `sm` and `md` (default). Pass `size` on `TableCard.Root` or directly on `Table`.",
    preview: (
      <div className="flex w-full flex-col gap-4">
        {(["sm", "md"] as const).map((size) => (
          <TableCard.Root key={size} size={size}>
            <TableCard.Header title={`Size: ${size}`} />
            <Table aria-label={`${size} table`} size={size}>
              <Table.Header>
                <Table.Head id="name" isRowHeader label="Name" />
                <Table.Head id="role" label="Role" />
              </Table.Header>
              <Table.Body items={ROWS.slice(0, 3)}>
                {(row) => (
                  <Table.Row id={row.id}>
                    <Table.Cell>{row.name}</Table.Cell>
                    <Table.Cell>{row.role}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </TableCard.Root>
        ))}
      </div>
    ),
    code: `<Table size="sm" aria-label="Small table">...</Table>
<Table size="md" aria-label="Medium table">...</Table>`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="Table"
      tagline="React Aria-backed data table with row selection, sorting, and a card wrapper."
      install={{
        usage: `import { Table, TableCard } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Surface", value: "bg-bg · ring-border" },
        { label: "Header bg", value: "bg-bg-secondary" },
        { label: "Row border", value: "border-border" },
        { label: "Row hover", value: "bg-bg-secondary" },
        { label: "Focus ring", value: "ring-brand-500/22" },
      ]}
    />
  );
}
