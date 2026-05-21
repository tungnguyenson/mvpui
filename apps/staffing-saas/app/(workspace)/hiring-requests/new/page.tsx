import { HiringRequestCreatePage } from "../../../components/hiring-requests";

export default async function Route({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string }>;
}) {
  const { customerId } = await searchParams;
  return <HiringRequestCreatePage initialCustomerId={customerId} />;
}
