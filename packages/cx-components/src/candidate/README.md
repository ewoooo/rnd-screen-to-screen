# Candidate components

Candidate components are the staging area for component decisions that are not
ready to become the active CX component vocabulary.

Before creating a candidate, branch the decision:

- `reuse`: existing `components/*` or `candidate/*` can express the requirement.
- `new`: the requirement needs a new candidate component.

New requirement-derived candidates use the `RQR` identifier until they are
promoted to the active component vocabulary.

```txt
React component: RQR{Name}
folder: rqr-{name}
componentId: rqr-{name}
data-figma-component-id: rqr-{name}
importPath: @pxds/cx-components/candidate/rqr-{name}
```

When a candidate is promoted to `components/*`, remove the `RQR` prefix and
record the reusable component name in the active registry entry.
