import { Badge, Button, Dropdown, Table, TableCard } from "@mvp-ui/ui";

const COLUMNS = [
  { id: "name", name: "Name", isRowHeader: true },
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

export const CardWrapper = () => (
  <div className="w-full">
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
  </div>
);

export const Sizes = () => (
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
);
