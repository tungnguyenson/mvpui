import { HiringRequestCreatePage } from "../../../components/hiring-requests";

export default async function Route({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string; shiftId?: string }>;
}) {
  const { customerId, shiftId } = await searchParams;
  return (
    <HiringRequestCreatePage
      {...(customerId ? { initialCustomerId: customerId } : {})}
      {...(shiftId ? { initialShiftId: shiftId } : {})}
    />
  );
}
