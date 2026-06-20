import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Badge,
} from "@mvp-ui/ui";

const box: React.CSSProperties = { width: 560, maxWidth: "100%" };

export const Single = () => (
  <div style={box}>
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is your refund policy?</AccordionTrigger>
        <AccordionContent>
          We offer a 30-day money-back guarantee on all annual plans. Monthly plans can
          be cancelled at any time and stop billing at the end of the cycle.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Do you offer team discounts?</AccordionTrigger>
        <AccordionContent>
          Teams of 10 or more get 20% off. Contact sales for enterprise pricing.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How does billing work?</AccordionTrigger>
        <AccordionContent>
          You're billed on the date you subscribed. Invoices are emailed automatically.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export const Multiple = () => (
  <div style={box}>
    <Accordion type="multiple" defaultValue={["a", "c"]}>
      <AccordionItem value="a">
        <AccordionTrigger>Shipping &amp; delivery</AccordionTrigger>
        <AccordionContent>
          Orders ship within 2 business days. Tracking is emailed on dispatch.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>
          Unworn items can be returned within 14 days for a full refund.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Warranty</AccordionTrigger>
        <AccordionContent>
          All products carry a 2-year limited manufacturer warranty.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export const TrailingSlot = () => (
  <div style={box}>
    <Accordion type="single" collapsible defaultValue="active">
      <AccordionItem value="active">
        <AccordionTrigger
          trailing={
            <Badge color="success" type="pill-color" size="sm">
              3 active
            </Badge>
          }
        >
          Running campaigns
        </AccordionTrigger>
        <AccordionContent>
          Campaigns currently applied to the live audience segment.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="ended">
        <AccordionTrigger
          trailing={
            <Badge color="gray" type="pill-color" size="sm">
              12 ended
            </Badge>
          }
        >
          Campaign history
        </AccordionTrigger>
        <AccordionContent>
          Completed or cancelled campaigns from the last 90 days.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export const DisabledItem = () => (
  <div style={box}>
    <Accordion type="single" collapsible defaultValue="a">
      <AccordionItem value="a">
        <AccordionTrigger>Account</AccordionTrigger>
        <AccordionContent>Manage your account details and email.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b" disabled>
        <AccordionTrigger>Billing (coming soon)</AccordionTrigger>
        <AccordionContent>Billing settings.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Notifications</AccordionTrigger>
        <AccordionContent>Choose what you want to be notified about.</AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);
