import { redirect } from "next/navigation";

type ComponentsPreviewRoutePageProps = {
	params: Promise<{
		componentId: string;
	}>;
};

export default async function ComponentsPreviewRoutePage({
	params,
}: ComponentsPreviewRoutePageProps) {
	const { componentId } = await params;
	redirect(`/components?id=${componentId}`);
}
