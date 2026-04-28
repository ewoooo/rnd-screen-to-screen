import { redirect } from "next/navigation";

import registry from "@/generated/screen-version-registry.json";
import type { Registry } from "@/types/registry";

const typed = registry as Registry;

export default function WithdrawalReasonInputIndex() {
	const screen = typed.screens.find((s) => s.id === "withdrawal-reason-input");
	if (!screen || screen.versions.length === 0) {
		redirect("/");
	}
	redirect(`/${screen.id}/${screen.latest}`);
}
