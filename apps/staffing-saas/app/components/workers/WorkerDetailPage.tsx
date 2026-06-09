import { AvatarProfilePhoto, Badge, BadgeWithDot, Button, MetricCard } from "@mvp-ui/ui";
import { CalendarCheck, CalendarDays, Receipt, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAvatarFor, getInitials } from "../_shared/assets";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { APP_ROUTES } from "../_shell/nav";
import { PageScaffold } from "../_shell/PageScaffold";
import { WorkerDetailTabs } from "./WorkerDetailTabs";
import { getWorkerById, WORKER_STATUS_LABELS } from "./workers-data";

export function WorkerDetailPage({ id }: { id: string }) {
	const worker = getWorkerById(id);

	if (!worker) {
		notFound();
	}

	const status = WORKER_STATUS_LABELS[worker.status];

	return (
		<PageScaffold
			header={
				<AppPageHeader
					breadcrumbs={[
						{ label: "Dashboard", href: APP_ROUTES.dashboard },
						{ label: "Danh sách CTV", href: APP_ROUTES.workers },
						{ label: worker.name },
					]}
					actions={
						<>
							<Link href="/workers">
								<Button color="secondary" size="sm">
									Quay lại danh sách
								</Button>
							</Link>
							<Link href={`/worker-verifications/${worker.id}`}>
								<Button color="secondary" size="sm">
									Xử lý hồ sơ
								</Button>
							</Link>
							<Button color="primary" size="sm">
								Giao ca mới
							</Button>
						</>
					}
				>
					<div className="flex items-start gap-4">
						<AvatarProfilePhoto
							state={
								worker.status === "active"
									? "verified"
									: worker.status === "locked"
										? "blocked"
										: null
							}
							size="lg"
							src={getAvatarFor(worker.name, worker.id)}
							alt={worker.name}
							initials={getInitials(worker.name)}
						/>

						<div>
							<div className="flex flex-wrap items-center gap-3">
								<h1 className="text-xl font-semibold text-fg">{worker.name}</h1>
								<BadgeWithDot color={status.color} type="pill-color" size="sm">
									{status.label}
								</BadgeWithDot>
							</div>
							<p className="mt-1 text-base text-fg-tertiary">
								{worker.district}, {worker.city} • Gia nhập từ {worker.joinedAt}
							</p>
							<p className="mt-3 max-w-3xl text-sm text-fg-tertiary">{worker.bio}</p>
							<div className="mt-4 flex flex-wrap gap-2">
								{worker.tags.map((tag) => (
									<Badge key={tag} color="gray" type="pill-color" size="sm">
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</div>
				</AppPageHeader>
			}
		>
			<div className="grid gap-4 lg:grid-cols-4">
				<MetricCard
					label="Điểm đánh giá"
					value={`★ ${worker.rating}`}
					valueSize="md"
					iconChip={<Star className="size-5" />}
					iconChipStyle="tint"
					featuredIconColor="warning"
					iconPlacement="inline"
				/>
				<MetricCard
					label="Ca tuần này"
					value={`${worker.weeklyShifts}`}
					valueSize="md"
					iconChip={<CalendarCheck className="size-5" />}
					iconChipStyle="tint"
					featuredIconColor="success"
					iconPlacement="inline"
				/>
				<MetricCard
					label="Tổng số ca"
					value={`${worker.totalShifts}`}
					valueSize="md"
					iconChip={<CalendarDays className="size-5" />}
					iconChipStyle="tint"
					featuredIconColor="brand"
					iconPlacement="inline"
				/>
				<MetricCard
					label="Batch gần nhất"
					value={worker.payment.batchId}
					valueSize="md"
					iconChip={<Receipt className="size-5" />}
					iconChipStyle="tint"
					featuredIconColor="brand"
					iconPlacement="inline"
				/>
			</div>

			<WorkerDetailTabs worker={worker} />
		</PageScaffold>
	);
}
