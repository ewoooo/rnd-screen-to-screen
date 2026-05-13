"use client";

import { TextFieldList } from "@pxds/pxds-components/molecules";
import { MembershipOgnSectionLayout } from "../_layout";
import type { FormSectionProps } from "./FormSection.config";

export function MembershipFormSection({ fields }: FormSectionProps) {
	return (
		<MembershipOgnSectionLayout>
			<TextFieldList fields={fields} values={{}} onChange={() => undefined} />
		</MembershipOgnSectionLayout>
	);
}
