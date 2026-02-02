# Next Phase Plan (NETRUNNER)

## Goals
- Make the UI a pleasure to work with (smooth, discoverable, forgiving interactions).
- Implement Node-RED-like connections (drag wires, snap, clear affordances).
- Add validation-driven instruction walkthroughs (award completion only when state is correct).
- Establish testing best practices (unit + component + minimal e2e).

## High-Level Sequence
1. Fix current build issue in `NetworkCanvas.jsx` (imports below code).
2. Define Node-RED-style connection UX + data model spec.
3. Implement connection controller + port metadata updates.
4. Add lesson validation selectors and wire into lesson progression.
5. Establish tests for stores and lesson validation; add 1–2 e2e smoke tests.

## Validation Gates (Instruction Walkthrough)
- Each lesson step defines explicit preconditions and target state.
- Completion is only awarded if selectors confirm state is correct.
- Failures should show actionable hints (what to fix, not just “wrong”).

## Deliverables
- `docs/connection-spec.md`
- `docs/ui-review.md`
- `docs/testing-plan.md`
- Implementation changes in `src/` for connection UX + lesson validation
- Tests for `networkStore` and lesson validation selectors
