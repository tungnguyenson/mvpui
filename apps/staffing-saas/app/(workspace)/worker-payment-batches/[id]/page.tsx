import { WorkerPaymentBatchesDetailPage } from "../../../components/worker-payment-batches";

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkerPaymentBatchesDetailPage id={id} />;
}
