import type { ComponentConfig } from "./component";
import type { Registry, RegistryEntryLike } from "./registry";
import type { ScreenConfig } from "./screen";

export function defineComponentConfig<TProps = Record<string, unknown>>(
	config: ComponentConfig<TProps>,
) {
	return config;
}

export function defineScreenConfig<TConfig extends ScreenConfig>(
	config: TConfig,
) {
	return config;
}

export function defineRegistry<TEntry extends RegistryEntryLike>(
	registry: Registry<TEntry>,
) {
	return registry;
}
