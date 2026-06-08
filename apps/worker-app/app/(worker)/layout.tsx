import type { ReactNode } from "react";
import { WorkerShell } from "../components/_shell/WorkerShell";

export default function WorkerLayout({ children }: { children: ReactNode }) {
  return <WorkerShell>{children}</WorkerShell>;
}
