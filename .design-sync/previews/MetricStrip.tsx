import {
  AlertOctagon,
  Briefcase,
  Clock,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { MetricStrip } from "@mvp-ui/ui";

export const Stack = () => (
  <MetricStrip
    mobileLayout="stack"
    items={[
      { icon: <Users className="size-4" />, color: "brand", value: "1,284", label: "Total customers" },
      { icon: <TrendingUp className="size-4" />, color: "success", value: "438", label: "Active workers" },
      { icon: <Clock className="size-4" />, color: "warning", value: "12h", label: "Avg fill time" },
    ]}
  />
);

export const Scroll = () => (
  <MetricStrip
    mobileLayout="scroll"
    items={[
      { icon: <Briefcase className="size-4" />, color: "brand", value: "2", label: "Open requests" },
      { icon: <AlertOctagon className="size-4" />, color: "error", value: "1", label: "Overdue" },
      { icon: <UserPlus className="size-4" />, color: "warning", value: "18", label: "Seats to fill" },
      { icon: <Clock className="size-4" />, color: "success", value: "24", label: "Active clients" },
    ]}
  />
);

export const Linked = () => (
  <MetricStrip
    items={[
      { icon: <Briefcase className="size-4" />, color: "brand", value: "12", label: "Open jobs", href: "#" },
      { icon: <Zap className="size-4" />, color: "warning", value: "5", label: "Need review", href: "#" },
    ]}
  />
);

export const NoIcons = () => (
  <MetricStrip
    items={[
      { value: "342", label: "Workers" },
      { value: "28", label: "Active jobs" },
      { value: "$48k", label: "Payroll" },
      { value: "92%", label: "Fill rate" },
    ]}
  />
);
