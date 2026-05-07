"use client";

import { Card, CardContent } from "@pxds/pxds-components/core";

import { HStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/typography";
import { Checkbox } from "@pxds/pxds-components/patterns";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

type Props = {
	label: string;
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (next: boolean) => void;
};

export function FinalConsentRow({
	label,
	checked,
	defaultChecked,
	onCheckedChange,
}: Props) {
	return (
		<ContentSection>
			<Card>
				<CardContent>
					<HStack gap="row" align="center">
						<Checkbox
							checked={checked}
							defaultChecked={defaultChecked}
							onCheckedChange={onCheckedChange}
						/>
						<TextBlock
							variant="body"
							color="semantic.status.negative"
							text={label}
						/>
					</HStack>
				</CardContent>
			</Card>
		</ContentSection>
	);
}
