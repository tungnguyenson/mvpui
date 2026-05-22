import { WorkerPaymentBatchesDetailPage } from "../../../components/worker-payment-batches";
import { PAYMENT_BATCHES } from "../../../components/worker-payment-batches/worker-payment-batches-data";

export function generateStaticParams() {
  return PAYMENT_BATCHES.map((b) => ({ id: b.id }));
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkerPaymentBatchesDetailPage id={id} />;
}
