"use client";

import { Fragment, forwardRef, useState } from "react";
import { cn } from "../../lib/cn";
import { Accordion } from "../accordion";
import { Divider } from "../divider";
import type { AccordionListProps } from "./AccordionList.types";
import { accordionListVariants } from "./accordion-list.variants";

export const AccordionList = forwardRef<HTMLDivElement, AccordionListProps>(
	function AccordionList(
		{
			allowMultiple = true,
			className,
			defaultOpenIds = [],
			items,
			onOpenIdsChange,
			openIds,
			showTrailingDivider = true,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "accordion-list",
			...props
		},
		ref,
	) {
		const [uncontrolledOpenIds, setUncontrolledOpenIds] =
			useState(defaultOpenIds);
		const isControlled = openIds !== undefined;
		const resolvedOpenIds = isControlled ? openIds : uncontrolledOpenIds;

		function handleItemOpenChange(itemId: string, nextOpen: boolean) {
			const nextOpenIds = nextOpen
				? allowMultiple
					? [...resolvedOpenIds.filter((openId) => openId !== itemId), itemId]
					: [itemId]
				: resolvedOpenIds.filter((openId) => openId !== itemId);

			if (!isControlled) {
				setUncontrolledOpenIds(nextOpenIds);
			}

			onOpenIdsChange?.(nextOpenIds);
		}

		return (
			<div
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				className={cn(accordionListVariants(), className)}
				{...props}
			>
				{items.map((item, index) => {
					const showDivider = showTrailingDivider || index < items.length - 1;

					return (
						<Fragment key={item.id}>
							<Accordion
								disabled={item.disabled}
								leftText={item.leftText}
								onOpenChange={(nextOpen) =>
									handleItemOpenChange(item.id, nextOpen)
								}
								open={resolvedOpenIds.includes(item.id)}
								title={item.title}
							>
								{item.content}
							</Accordion>
							{showDivider ? <Divider type="contents" /> : null}
						</Fragment>
					);
				})}
			</div>
		);
	},
);
