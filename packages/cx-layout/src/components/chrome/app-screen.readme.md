# AppScreen

Mobile screen chrome layout. `AppScreen` owns system header, app header, content scroll boundary, and bottom action slot metrics.

Use semantic presets such as `headerPreset="form-entry"` and `ActionBar preset="primary-cta"` in new screens. Numeric legacy preset names remain compatibility aliases only.

`AppScreen` is the Screen-level container in the `Component -> Pattern -> Organism -> Screen` hierarchy. Routes should place domain organisms and layout patterns into `SystemHeader`, `Header`, `Content`, and `Bottom` slots instead of recreating chrome with raw `position`, `margin`, or `padding`.

Width/spacing rails follow `DESIGN_FOUNDATION.md` and : full screen is 393px, section/card rail is 369px, general content rail is 361px, and inner content rail is 329px.
