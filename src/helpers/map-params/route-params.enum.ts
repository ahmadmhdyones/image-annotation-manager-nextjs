/**
 * Route Parameters Enum
 *
 * Centralizes dynamic route parameter names:
 * - Prevents hardcoded parameter strings in URLs
 * - Ensures consistent parameter naming across routes
 * - Used with paths mapper for type-safe route generation
 *
 * Usage: RouteParams.ID instead of 'id'
 */

export enum RouteParams {
  ID = 'id',
}
