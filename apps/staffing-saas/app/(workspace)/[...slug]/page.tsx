import { EmptyState } from "../../components/_shared";
import { labelForPath } from "../../components/_shell";

export default async function PendingRoutePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const pathname = `/${slug.join("/")}`;

  return (
    <div className="flex min-h-full flex-col">
      <EmptyState title={labelForPath(pathname)} />
    </div>
  );
}
