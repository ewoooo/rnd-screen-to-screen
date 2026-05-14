import { cn } from "../../lib/cn";
import type { StatusBarProps } from "./StatusBar.types";
import { statusBarVariants } from "./status-bar.variants";

export function StatusBar({
	time = "9:41",
	rightSide,
	className,
}: StatusBarProps) {
	return (
		<header
			data-figma-render="component"
			data-figma-component-id="status-bar"
			className={cn(statusBarVariants(), className)}
		>
			<span className="status-bar__time">{time}</span>
			<span
				className="status-bar__right"
				aria-hidden={rightSide ? undefined : true}
			>
				{rightSide ?? <DefaultSystemIndicators />}
			</span>
		</header>
	);
}

function DefaultSystemIndicators() {
	return (
		<span className="status-bar__indicators">
			<svg
				className="status-bar__cellular"
				width="18"
				height="12"
				viewBox="0 0 18 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Cellular signal</title>
				<path d="M10 3C10 2.44772 10.4477 2 11 2H12C12.5523 2 13 2.44772 13 3V11C13 11.5523 12.5523 12 12 12H11C10.4477 12 10 11.5523 10 11V3Z" fill="currentColor" />
				<path d="M15 1C15 0.447715 15.4477 0 16 0H17C17.5523 0 18 0.447715 18 1V11C18 11.5523 17.5523 12 17 12H16C15.4477 12 15 11.5523 15 11V1Z" fill="currentColor" />
				<path d="M5 6.5C5 5.94772 5.44772 5.5 6 5.5H7C7.55228 5.5 8 5.94772 8 6.5V11C8 11.5523 7.55228 12 7 12H6C5.44772 12 5 11.5523 5 11V6.5Z" fill="currentColor" />
				<path d="M0 9C0 8.44772 0.447715 8 1 8H2C2.55228 8 3 8.44772 3 9V11C3 11.5523 2.55228 12 2 12H1C0.447715 12 0 11.5523 0 11V9Z" fill="currentColor" />
			</svg>
			<svg
				className="status-bar__wifi"
				width="17"
				height="12"
				viewBox="0 0 17 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Wi-Fi</title>
				<path d="M6.11524 9.08476C7.53497 7.85917 9.61438 7.8593 11.0342 9.08476C11.1056 9.1507 11.1475 9.24428 11.1494 9.34257C11.1514 9.44081 11.1136 9.53546 11.0449 9.60429L8.82129 11.8943C8.75619 11.9615 8.66779 11.9997 8.5752 11.9998C8.48249 11.9998 8.3933 11.9616 8.32813 11.8943L6.1045 9.60429C6.03589 9.53543 5.99802 9.44077 6 9.34257C6.00204 9.24428 6.04375 9.15065 6.11524 9.08476ZM3.10938 6.26152C6.16846 3.35693 10.9058 3.35693 13.9648 6.26152C14.0339 6.32962 14.0732 6.42331 14.0742 6.52128C14.0751 6.61915 14.0373 6.71357 13.9697 6.783L12.6846 8.1082C12.5521 8.24347 12.338 8.24678 12.2022 8.11503C11.1977 7.1866 9.89124 6.67165 8.53614 6.67168C7.18182 6.67225 5.87597 7.18713 4.87208 8.11503C4.7362 8.24677 4.52209 8.24355 4.38965 8.1082L3.1045 6.783C3.03675 6.71365 2.99919 6.61921 3 6.52128C3.00091 6.42332 3.04039 6.32961 3.10938 6.26152ZM0.107427 3.44218C4.79928 -1.14743 12.2007 -1.14736 16.8926 3.44218C16.9605 3.51037 16.9994 3.60373 17 3.70097C17.0005 3.79806 16.9625 3.89184 16.8955 3.96074L15.6094 5.28593C15.4769 5.42191 15.2616 5.42362 15.127 5.28984C13.3393 3.55507 10.9666 2.5878 8.5 2.58769C6.03337 2.58781 3.66078 3.55507 1.87305 5.28984C1.73851 5.42373 1.52304 5.42208 1.39063 5.28593L0.103521 3.96074C0.0365511 3.89181 -0.000494197 3.79803 0.00000497989 3.70097C0.0006317 3.60373 0.0394613 3.51032 0.107427 3.44218Z" fill="currentColor" />
			</svg>
			<svg
				className="status-bar__battery"
				width="28"
				height="13"
				viewBox="0 0 28 13"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Battery</title>
				<path opacity="0.35" d="M24.4727 0.527344V12.4727H0.527344V0.527344H24.4727Z" stroke="currentColor" strokeWidth="1.05509" />
				<path opacity="0.4" d="M26 5V9.22034C26.8491 8.86291 27.4012 8.0314 27.4012 7.11017C27.4012 6.18894 26.8491 5.35744 26 5" fill="currentColor" />
				<path d="M2 2H23V11H2V2Z" fill="currentColor" />
			</svg>
		</span>
	);
}
