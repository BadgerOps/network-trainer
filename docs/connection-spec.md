# Node-RED-Style Connection Spec

## Interaction Model
- Drag from a port handle to create a wire.
- Wire follows cursor with a live preview; snaps to valid target ports.
- Release on a valid target port to connect.
- Release on empty space or press Esc to cancel.

## Visual Behavior
- Default wire: curved (bezier) or orthogonal with smooth corners.
- Hover wire: subtle glow + thicker stroke.
- Invalid target: red dashed preview.
- Valid target highlight: port glow + pulse.

## Connection Rules
- Ports have direction/type (bidirectional for ethernet).
- Default: one wire per port (ethernet constraint).
- Prevent self-connection unless explicitly allowed by device type.
- Prevent duplicate connections between the same port pair.

## Data Model Additions
- Port metadata: `direction`, `type`, `maxConnections`.
- Connection: `{ id, source: { deviceId, portId }, target: { deviceId, portId }, status, speed }`.
- Controller state: `{ dragSource, cursorPos, isValidTarget }`.

## Store/Controller Responsibilities
- Validate connect rules (port availability, direction, device compatibility).
- Update interface `status` and `connectedTo` on connect/disconnect.
- Expose selectors for “canConnect(source, target)” used in UI.

## Acceptance Criteria
- Users can create a connection in one continuous drag.
- Clear visual feedback for valid/invalid targets.
- Cancelling connection always returns to idle state.
- No port can exceed its max connections.
