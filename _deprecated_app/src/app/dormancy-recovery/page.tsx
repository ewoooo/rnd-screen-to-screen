import { redirect } from "next/navigation";

import registry from "@/generated/screen-version-registry.json";
import type { Registry } from "@/types/registry";

const typed = registry as Registry;

export default function DormancyRecoveryIndex() {
	const screen = typed.screens.find((s) => s.id === "dormancy-recovery");
	if (!screen || screen.versions.length === 0) {
		redirect("/");
	}
	redirect(`/${screen.id}/${screen.latest}`);
}
