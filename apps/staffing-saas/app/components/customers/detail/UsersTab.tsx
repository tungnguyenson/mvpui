"use client";

import { Button, Input, Table } from "@mvp-ui/ui";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { CustomerUserRecord } from "../customer-detail-data";

interface UsersTabProps {
  users: CustomerUserRecord[];
}

const COLUMNS = [
  { id: "fullName", name: "Tên", isRowHeader: true as const },
  { id: "email", name: "Email" },
  { id: "phone", name: "Số điện thoại" },
];

export function UsersTab({ users }: UsersTabProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submittedFilter, setSubmittedFilter] = useState({ name: "", email: "", phone: "" });

  const filtered = useMemo(() => {
    return users.filter((user) => {
      const matchName = submittedFilter.name
        ? user.fullName.toLowerCase().includes(submittedFilter.name.toLowerCase())
        : true;
      const matchEmail = submittedFilter.email
        ? user.email.toLowerCase().includes(submittedFilter.email.toLowerCase())
        : true;
      const matchPhone = submittedFilter.phone
        ? user.phone.replace(/\s/g, "").includes(submittedFilter.phone.replace(/\s/g, ""))
        : true;
      return matchName && matchEmail && matchPhone;
    });
  }, [users, submittedFilter]);

  function handleReset() {
    setName("");
    setEmail("");
    setPhone("");
    setSubmittedFilter({ name: "", email: "", phone: "" });
  }

  function handleQuery() {
    setSubmittedFilter({ name, email, phone });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            label="Tên"
            placeholder="Please enter"
            value={name}
            onChange={(event) => setName(event.target.value)}
            iconLeading={<Search className="size-4" />}
          />
          <Input
            label="Email"
            placeholder="Please enter"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            label="Số điện thoại"
            placeholder="Please enter"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <Button color="secondary" size="sm" onClick={handleReset}>
            Reset
          </Button>
          <Button color="primary" size="sm" onClick={handleQuery}>
            Query
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
        <div className="flex items-center justify-between gap-4 border-b border-border-secondary px-5 py-4">
          <h2 className="text-base font-semibold text-fg">Danh sách user</h2>
          <Button color="primary" size="sm">
            Thêm user
          </Button>
        </div>
        <Table aria-label="Danh sách user">
          <Table.Header>
            {COLUMNS.map((column) => (
              <Table.Head
                key={column.id}
                id={column.id}
                label={column.name}
                {...(column.isRowHeader && { isRowHeader: true })}
              />
            ))}
          </Table.Header>
          <Table.Body
            items={filtered}
            renderEmptyState={() => (
              <p className="px-6 py-12 text-center text-sm text-fg-tertiary">
                Không có dữ liệu
              </p>
            )}
          >
            {(user) => (
              <Table.Row id={user.id}>
                <Table.Cell>
                  <span className="font-medium text-fg">{user.fullName}</span>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.phone}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <div className="flex items-center justify-end gap-4 border-t border-border-secondary px-5 py-3 text-sm text-fg-tertiary">
          <span>
            1-{filtered.length} of {filtered.length} items
          </span>
          <span className="rounded-md border border-border-secondary px-2 py-1 text-xs text-fg">
            20 / trang
          </span>
        </div>
      </div>
    </div>
  );
}
