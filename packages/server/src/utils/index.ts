/**
 * @module utils
 * Utility functions
 */

export function getEmailFilter(domain: string) {
  return `@${domain}.*`;
}
