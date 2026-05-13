import { PrimaryCTABar } from "@pxds/pxds-components/molecules";
import type { ActionAreaTermsProps } from "./ActionAreaTerms.config";

export function ActionAreaTerms({ disabled = true }: ActionAreaTermsProps) {
	return <PrimaryCTABar primaryLabel="다음" disabled={disabled} />;
}
