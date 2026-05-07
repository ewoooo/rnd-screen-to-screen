import { T_LOGO_FILL } from "@pxds/pxds-tokens";
import { type SVGProps, forwardRef } from "react";

/** T 앱 브랜드 로고. 색은 PXDS token 고정 — currentColor 아님. */
export const Logo = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
	function Logo(props, ref) {
		return (
			<svg
				ref={ref}
				width={32}
				height={32}
				viewBox="0 0 32 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<path
					d="M18.5936 14.4842V25H13.4192V11.9074L18.5936 14.4842ZM25 6V10.4992H7V6H25Z"
					fill={T_LOGO_FILL}
				/>
			</svg>
		);
	},
);
