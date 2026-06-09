import { PublicFormView } from "../../components/recruitment-forms/PublicFormView";

interface PageProps {
	params: Promise<{ slug: string }>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PublicFormPage({ params, searchParams }: PageProps) {
	const { slug } = await params;
	const sp = await searchParams;
	const preview = sp.preview === "1" || sp.preview === "true";
	return <PublicFormView slug={slug} preview={preview} />;
}
