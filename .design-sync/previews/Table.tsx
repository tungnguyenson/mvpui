import { Badge, Table } from "@mvp-ui/ui";

const COLUMNS = [
  { id: "name", name: "Name", isRowHeader: true },
  { id: "status", name: "Status" },
  { id: "role", name: "Role" },
  { id: "email", name: "Email" },
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

export const Basic = () => (
  <div className="w-full overflow-x-auto rounded-lg ring-1 ring-border">
    <Table aria-label="Team members" selectionMode="none">
      <Table.Header>
        {COLUMNS.map((col) => (
          <Table.Head
            key={col.id}
            id={col.id}
            {...(col.isRowHeader && { isRowHeader: true })}
            label={col.name}
          />
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
  </div>
);

export const Selectable = () => (
  <div className="w-full overflow-x-auto rounded-lg ring-1 ring-border">
    <Table aria-label="Selectable team members" selectionMode="multiple" defaultSelectedKeys={[1, 3]}>
      <Table.Header>
        {COLUMNS.map((col) => (
          <Table.Head
            key={col.id}
            id={col.id}
            {...(col.isRowHeader && { isRowHeader: true })}
            label={col.name}
          />
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
  </div>
);
