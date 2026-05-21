import { defineRegistry } from "@pxds/cx-spec";
import { authRequestConfig } from "./ogn-mbr-auth-request";
import { authSelectConfig } from "./ogn-mbr-auth-select";
import { authRequestCopyConfig } from "./ogn-mbr-auth-request-copy";
import { authSelectCopyConfig } from "./ogn-mbr-auth-select-copy";

export { AuthSelect } from "./ogn-mbr-auth-select";
export { AuthRequest } from "./ogn-mbr-auth-request";
export { AuthSelectCopy } from "./ogn-mbr-auth-select-copy";
export { AuthRequestCopy } from "./ogn-mbr-auth-request-copy";

export const mbrFpOrganismRegistry = defineRegistry([
	authSelectConfig,
	authRequestConfig,
	authSelectCopyConfig,
	authRequestCopyConfig,
] as const);
