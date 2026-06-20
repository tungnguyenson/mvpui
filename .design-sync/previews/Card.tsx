import { MoreHorizontal } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
} from "@mvp-ui/ui";

const STATS = [
  { label: "Total users", value: "12,430", delta: "+12%", color: "success" as const },
  { label: "Revenue", value: "$48,295", delta: "+8.2%", color: "success" as const },
  { label: "Churn rate", value: "2.4%", delta: "+0.3%", color: "error" as const },
];

export const FullCard = () => (
  <Card className="w-full max-w-sm">
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle>Project Aurora</CardTitle>
          <CardDescription>
            Design system for the next-gen app platform.
          </CardDescription>
        </div>
        <button className="text-fg-tertiary transition-colors hover:text-fg">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-fg-secondary">
        Last updated 2 hours ago. 12 open issues, 3 pull requests pending review.
      </p>
    </CardContent>
    <CardFooter>
      <Button size="sm">View project</Button>
      <Button size="sm" color="tertiary">
        Archive
      </Button>
    </CardFooter>
  </Card>
);

export const ContentOnly = () => (
  <Card className="w-full max-w-sm">
    <CardContent className="p-6">
      <p className="text-sm leading-relaxed text-fg-secondary">
        This is a minimal card with only content. Useful for simple information
        containers, callouts, or embedded media.
      </p>
    </CardContent>
  </Card>
);

export const StatsCards = () => (
  <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
    {STATS.map((stat) => (
      <Card key={stat.label}>
        <CardHeader className="pb-2">
          <CardDescription>{stat.label}</CardDescription>
        </CardHeader>
        <CardContent className="pb-4 pt-0">
          <p className="text-2xl font-semibold text-fg">{stat.value}</p>
          <Badge color={stat.color} className="mt-2">
            {stat.delta} vs last month
          </Badge>
        </CardContent>
      </Card>
    ))}
  </div>
);

export const CardGrid = () => (
  <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
    {["Getting started", "API reference", "Examples", "Changelog"].map((title) => (
      <Card
        key={title}
        className="cursor-pointer transition-all duration-250 hover:border-border-brand hover:shadow-md"
      >
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>
            Explore the {title.toLowerCase()} to learn more.
          </CardDescription>
        </CardHeader>
      </Card>
    ))}
  </div>
);
