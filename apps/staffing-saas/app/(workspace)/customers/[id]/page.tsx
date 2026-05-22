import { Suspense } from "react";
import { CustomerDetailPage } from "../../../components/customers";
import { CUSTOMERS } from "../../../components/customers/customers-data";

export function generateStaticParams() {
  return CUSTOMERS.map((c) => ({ id: c.id }));
}

export default async function CustomerDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={null}>
      <CustomerDetailPage id={id} />
    </Suspense>
  );
}
