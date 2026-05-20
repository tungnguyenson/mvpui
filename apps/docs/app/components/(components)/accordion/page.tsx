"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
} from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default (single, collapsible)",
    description:
      "One section open at a time. type=\"single\" + collapsible allows closing the active item.",
    preview: (
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full max-w-xl">
        <AccordionItem value="item-1">
          <AccordionTrigger>Thông tin chung</AccordionTrigger>
          <AccordionContent>
            Ngân sách, tiêu đề, mô tả và người phụ trách của chương trình thưởng.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Áp dụng cho</AccordionTrigger>
          <AccordionContent>
            Danh sách mã công việc / khu vực mà rule này có hiệu lực.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Điều kiện</AccordionTrigger>
          <AccordionContent>
            Số ca tối thiểu, số giờ tối thiểu mỗi ca, ngưỡng vi phạm.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    code: `<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Thông tin chung</AccordionTrigger>
    <AccordionContent>Ngân sách, tiêu đề, mô tả...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Áp dụng cho</AccordionTrigger>
    <AccordionContent>Danh sách mã công việc / khu vực...</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  {
    id: "multiple",
    title: "Multiple open",
    description:
      "type=\"multiple\" allows several panels to stay open simultaneously.",
    preview: (
      <Accordion
        type="multiple"
        defaultValue={["a", "c"]}
        className="w-full max-w-xl"
      >
        <AccordionItem value="a">
          <AccordionTrigger>FAQ 1 — Worker payout cadence</AccordionTrigger>
          <AccordionContent>
            Worker được thanh toán theo batch tuần. Batch khoá vào Chủ nhật 23:59.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>FAQ 2 — Hủy thưởng</AccordionTrigger>
          <AccordionContent>
            Hủy thưởng sẽ rollback toàn bộ payout chưa chi trả. Payout đã chuyển không thu hồi.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="c">
          <AccordionTrigger>FAQ 3 — Điều kiện áp dụng</AccordionTrigger>
          <AccordionContent>
            Điều kiện áp dụng đánh giá theo timesheet đã đối soát, không tính ca pending.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    code: `<Accordion type="multiple" defaultValue={["a", "c"]}>
  <AccordionItem value="a">
    <AccordionTrigger>FAQ 1 — Worker payout cadence</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  {
    id: "trailing",
    title: "Trailing slot",
    description:
      "Use the trailing prop on AccordionTrigger to add badges or counts next to the chevron.",
    preview: (
      <Accordion
        type="single"
        collapsible
        defaultValue="active"
        className="w-full max-w-xl"
      >
        <AccordionItem value="active">
          <AccordionTrigger
            trailing={
              <Badge color="success" type="pill-color" size="sm">
                3 đang chạy
              </Badge>
            }
          >
            Chương trình đang chạy
          </AccordionTrigger>
          <AccordionContent>
            Danh sách chương trình thưởng đang được áp dụng cho batch payout hiện tại.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ended">
          <AccordionTrigger
            trailing={
              <Badge color="gray" type="pill-color" size="sm">
                12 đã kết thúc
              </Badge>
            }
          >
            Lịch sử chương trình
          </AccordionTrigger>
          <AccordionContent>
            Chương trình đã hoàn tất hoặc đã hủy trong 90 ngày gần nhất.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    code: `<AccordionTrigger
  trailing={<Badge color="success" type="pill-color" size="sm">3 đang chạy</Badge>}
>
  Chương trình đang chạy
</AccordionTrigger>`,
  },
  {
    id: "disabled",
    title: "Disabled item",
    description: "Disable an individual section with the disabled prop.",
    preview: (
      <Accordion type="single" collapsible className="w-full max-w-xl">
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Content A.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b" disabled>
          <AccordionTrigger>Section B (disabled)</AccordionTrigger>
          <AccordionContent>Content B.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="c">
          <AccordionTrigger>Section C</AccordionTrigger>
          <AccordionContent>Content C.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    code: `<AccordionItem value="b" disabled>
  <AccordionTrigger>Section B (disabled)</AccordionTrigger>
  <AccordionContent>Content B.</AccordionContent>
</AccordionItem>`,
  },
];

export default function AccordionPage() {
  return (
    <ComponentDocLayout
      name="Accordion"
      tagline="Vertically stacked, expandable panels. Built on Radix Accordion. Mirrors shadcn/ui API, styled with Untitled UI tokens."
      install={{
        usage: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
    />
  );
}
