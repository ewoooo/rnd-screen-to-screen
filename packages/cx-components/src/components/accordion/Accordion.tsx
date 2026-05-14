import { forwardRef, useId, useState } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { Text } from "../text";
import type { AccordionProps } from "./Accordion.types";
import { accordionVariants } from "./accordion.variants";

const boolAttr = (value: boolean) => (value ? "true" : "false");

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
	function Accordion(
		{
			children,
			className,
			defaultOpen = false,
			disabled = false,
			id,
			leftText,
			onOpenChange,
			open,
			title,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "accordion",
			"data-figma-property-state": dataFigmaState,
			"data-figma-property-left-text": dataFigmaLeftText,
			...props
		},
		ref,
	) {
		const generatedId = useId();
		const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
		const isControlled = open !== undefined;
		const resolvedOpen = isControlled ? open : uncontrolledOpen;
		const resolvedState = resolvedOpen ? "open" : "close";
		const hasLeftText = Boolean(leftText);
		const contentId = `${id ?? generatedId}-content`;

		function handleToggle() {
			if (disabled) {
				return;
			}

			const nextOpen = !resolvedOpen;

			if (!isControlled) {
				setUncontrolledOpen(nextOpen);
			}

			onOpenChange?.(nextOpen);
		}

		return (
			<div
				ref={ref}
				id={id}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-state={dataFigmaState ?? resolvedState}
				data-figma-property-left-text={dataFigmaLeftText ?? boolAttr(hasLeftText)}
				data-state={resolvedState}
				data-disabled={disabled ? "" : undefined}
				className={cn(
					accordionVariants({
						state: resolvedState,
						leftText: hasLeftText,
					}),
					className,
				)}
				{...props}
			>
				<button
					aria-controls={children ? contentId : undefined}
					aria-expanded={resolvedOpen}
					className="accordion__header"
					data-figma-render="ignore"
					disabled={disabled}
					onClick={handleToggle}
					type="button"
				>
					<span className="accordion__label-group" data-figma-render="ignore">
						{hasLeftText ? (
							<Text
								as="span"
								className="accordion__left-text"
								data-figma-render="primitive"
								variant="bodySubtle"
							>
								{leftText}
							</Text>
						) : null}
						<Text
							as="span"
							className="accordion__title"
							data-figma-render="primitive"
							variant="listTitle"
						>
							{title}
						</Text>
					</span>
					<Icon
						aria-hidden
						className="accordion__icon"
						color={disabled ? "disabled" : "tertiary"}
						size={16}
						type={resolvedOpen ? "arrow-up" : "arrow-down"}
					/>
				</button>
				{resolvedOpen && children ? (
					<div
						id={contentId}
						className="accordion__content"
						data-figma-render="slot"
						data-figma-property-txt=""
					>
						{children}
					</div>
				) : null}
			</div>
		);
	},
);
