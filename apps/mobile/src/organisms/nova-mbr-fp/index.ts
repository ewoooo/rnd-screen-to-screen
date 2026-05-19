import { defineRegistry } from "@pxds/cx-spec";
import { authRequestConfig } from "./ogn-mbr-auth-request";
import { authSelectConfig } from "./ogn-mbr-auth-select";

export { AuthSelect } from "./ogn-mbr-auth-select";
export { AuthRequest } from "./ogn-mbr-auth-request";

export const mbrFpOrganismRegistry = defineRegistry([
	authSelectConfig,
	authRequestConfig,
] as const);
