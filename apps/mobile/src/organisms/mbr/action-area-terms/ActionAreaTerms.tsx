import { MbrPrimaryCTABar } from "../primary-cta-bar";
import type { ActionAreaTermsProps } from "./ActionAreaTerms.config";

export function ActionAreaTerms({ disabled = true }: ActionAreaTermsProps) {
	return <MbrPrimaryCTABar primaryLabel="다음" disabled={disabled} />;
}
