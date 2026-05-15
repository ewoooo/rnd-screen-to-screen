# BottomSheet

Layout boundary for bottom-sheet overlays. The current implementation wraps WDS modal primitives behind the `@pxds/pxds-layout` package boundary.

BottomSheet owns the overlay runtime and pattern slot contract. Domain content comes from app organisms through the `Con`/children slot; routes should not add compensating raw margin or padding around sheet content.

Spacing is interpreted through `DESIGN_FOUNDATION.md` and `SPACING_PATTERNS.md`: title rail uses x=32 / w=329, general content rail uses x=20 / w=353 unless a child component owns its own padding, and action-area spacing stays inside the sheet/action pattern.
