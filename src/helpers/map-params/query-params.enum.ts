/**
 * Query Parameters Enum
 *
 * Centralizes URL query parameter names:
 * - Prevents hardcoded query strings in URLs
 * - Ensures consistent parameter naming across filters
 * - Used with paths mapper for type-safe URL generation
 *
 * Usage: QueryParams.CATEGORY instead of 'category'
 */

export enum QueryParams {
  CATEGORY = 'category',
  FORMAT = 'format',
  NAME = 'name',
  RESOLUTION = 'resolution',
}
