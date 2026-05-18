# RQRNotice

## Role

`RQRNotice` is a requirement-derived candidate component. It exists to keep a
new component branch visible while screen generation decides whether the
requirement should become a reusable CX component or be replaced by an existing
component such as `Callout`.

## Candidate Branch

| Field | Value |
| --- | --- |
| Status | `candidate` |
| Candidate kind | `new` |
| React export | `RQRNotice` |
| Folder | `packages/cx-components/src/candidate/rqr-notice` |
| Import path | `@pxds/cx-components/candidate/rqr-notice` |
| Component id | `rqr-notice` |
| Figma id | `data-figma-component-id="rqr-notice"` |

## Promotion Rule

Keep the `RQR` prefix while this component is a generated candidate. If it is
promoted into `packages/cx-components/src/components`, remove the prefix and
promote it as the reusable component name selected by the design system.

## Reuse Check

Before adding another notice-like candidate, compare the requirement against
existing `Callout`, `RQRNotice`, and layout pattern slots. Create a new
`RQR{Name}` candidate only when those options cannot represent the policy
meaning, state, slot contract, or Figma bridge identity.
