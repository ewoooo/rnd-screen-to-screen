import type { CSSProperties } from "react";

import {
	FieldGroup,
	FieldInput,
	FieldLabel,
	Hero,
	InfoBox,
	PayContent,
	StickyCTA,
} from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { loginV1KitMock as mock } from "./_mock";

export default function LoginV1KitPage() {
	return (
		<DetailShell title={mock.header} bottom={<StickyCTA text={mock.cta} />}>
			<PayContent>
				<Hero title={mock.heroTitle} />
				<div style={formStyle}>
					<FieldGroup>
						<FieldLabel>{mock.fields.userId.label}</FieldLabel>
						<FieldInput value={mock.fields.userId.value} />
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>{mock.fields.password.label}</FieldLabel>
						<FieldInput value={mock.fields.password.value} letterSpacing={4} focused />
					</FieldGroup>
				</div>
				<div style={linkRowStyle}>
					{mock.links.map((l, i) => (
						<span key={l} style={linkStyle}>
							{l}
							{i < mock.links.length - 1 ? <span style={dividerStyle}>·</span> : null}
						</span>
					))}
				</div>
				<InfoBox bullets={mock.infoBullets} />
			</PayContent>
		</DetailShell>
	);
}

const formStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-12)",
};

const linkRowStyle: CSSProperties = {
	display: "flex",
	justifyContent: "center",
	gap: "var(--spacing-8)",
	paddingTop: "var(--spacing-4)",
};

const linkStyle: CSSProperties = {
	fontSize: 13,
	color: "var(--semantic-label-alternative)",
	display: "inline-flex",
	gap: "var(--spacing-8)",
};

const dividerStyle: CSSProperties = {
	color: "var(--semantic-label-assistive)",
};
