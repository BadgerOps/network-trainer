# Testing Plan

## Goals
- Verify core network state mutations are correct.
- Ensure lesson progression only completes when requirements are met.
- Prevent regressions in connection rules and validation logic.

## Unit Tests (Priority)
- `networkStore` actions:
  - add/remove device
  - start/complete/cancel connection
  - connection rule enforcement (self-connect, duplicate, port availability)
  - interface status updates on connect/disconnect
- Lesson validation selectors (pure functions):
  - add-devices: required devices exist
  - create-connection: correct devices connected
  - configure-ip: IPs/subnets set correctly

## Component Tests
- `LessonViewer` should not advance on invalid state.
- Connection UI should reflect valid/invalid targets.

## E2E Smoke Tests (Minimal)
- Create devices → connect ports → configure IP → send packet.
- Load demo network → validate that lesson checks pass.

## Tooling Options
- Unit + component: Vitest + React Testing Library + jsdom.
- E2E: Playwright.

## Acceptance Criteria
- New tests cover connection rules and lesson validation.
- Basic user flows pass in CI/dev.
