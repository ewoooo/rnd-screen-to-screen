import { redirect } from "next/navigation";

import registry from "@/generated/screen-version-registry.json";
import type { Registry } from "@/types/registry";

const typed = registry as Registry;

export default function HomeBenefitIndex() {
	const screen = typed.screens.find((s) => s.id === "home-benefit");
	if (!screen || screen.versions.length === 0) {
		redirect("/");
	}
	redirect(`/${screen.id}/${screen.latest}`);
}
