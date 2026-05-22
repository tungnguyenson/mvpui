"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { HiringRequestCreatePage } from "../../../components/hiring-requests";

function HiringRequestCreateRouteInner() {
  const sp = useSearchParams();
  const customerId = sp.get("customerId") ?? undefined;
  const shiftId = sp.get("shiftId") ?? undefined;
  return (
    <HiringRequestCreatePage
      {...(customerId ? { initialCustomerId: customerId } : {})}
      {...(shiftId ? { initialShiftId: shiftId } : {})}
    />
  );
}

export default function Route() {
  return (
    <Suspense fallback={null}>
      <HiringRequestCreateRouteInner />
    </Suspense>
  );
}
