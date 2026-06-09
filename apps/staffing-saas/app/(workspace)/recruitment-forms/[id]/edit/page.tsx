import { FormBuilder } from "../../../../components/recruitment-forms/FormBuilder";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function Route({ params }: PageProps) {
	const { id } = await params;
	return <FormBuilder formId={id} />;
}
