"use client";

import { TextFieldList } from "@pxds/pxds-components/molecules";
import { MembershipContentSection } from "../MembershipContentSection";
import type { FormSectionProps } from "./FormSection.config";

export function MembershipFormSection({ fields }: FormSectionProps) {
	return (
		<MembershipContentSection>
			<TextFieldList fields={fields} values={{}} onChange={() => undefined} />
		</MembershipContentSection>
	);
}
