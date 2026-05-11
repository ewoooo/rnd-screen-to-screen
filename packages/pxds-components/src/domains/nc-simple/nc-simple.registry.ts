import { authMethodSelectorRegistryEntry } from "./auth-method-selector/registry";
import { finalConsentRowRegistryEntry } from "./final-consent-row/registry";
import { leaveImpactChecklistRegistryEntry } from "./leave-impact-checklist/registry";
import { loginFormRegistryEntry } from "./login-form/registry";
import { reusedInfoListRegistryEntry } from "./reused-info-list/registry";

export const ncSimpleRegistryEntries = [
	authMethodSelectorRegistryEntry,
	loginFormRegistryEntry,
	leaveImpactChecklistRegistryEntry,
	finalConsentRowRegistryEntry,
	reusedInfoListRegistryEntry,
] as const;
