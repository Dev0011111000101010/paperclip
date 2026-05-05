import i18n from "@/locales/i18n";

// Default name assigned to local users by the system — not a user-chosen value.
const SYSTEM_DEFAULT_NAME = "Board";

/**
 * Returns a human-readable display name for a user.
 * Falls back to the translated default if the stored name is the system default or empty.
 * Logs a warning to DevTools console if resolution falls all the way to the final fallback.
 */
export function resolveUserDisplayName(name?: string | null, email?: string | null): string {
  try {
    const trimmed = name?.trim();
    if (trimmed && trimmed !== SYSTEM_DEFAULT_NAME) return trimmed;
    if (email?.trim()) return email.trim();
    const fallback = i18n.t("sidebar_account.board_name", { ns: "common" });
    console.warn("[resolveUserDisplayName] No usable name or email — using translated fallback:", fallback);
    return fallback;
  } catch (error) {
    console.error("[resolveUserDisplayName] Unexpected error while resolving display name:", error);
    return name ?? email ?? SYSTEM_DEFAULT_NAME;
  }
}

/**
 * Returns a display name for the primary (bold) label in user tables and lists.
 * Uses the translated default name instead of email when the stored name is the system default.
 * This prevents the email from appearing twice (once as primary, once as subtitle).
 */
export function resolveUserPrimaryName(name?: string | null): string {
  try {
    const trimmed = name?.trim();
    if (trimmed && trimmed !== SYSTEM_DEFAULT_NAME) return trimmed;
    return i18n.t("sidebar_account.board_name", { ns: "common" });
  } catch (error) {
    console.error("[resolveUserPrimaryName] Unexpected error while resolving primary name:", error);
    return name ?? SYSTEM_DEFAULT_NAME;
  }
}

/**
 * Returns the user's name only if it was explicitly set by the user (not a system default).
 * Returns undefined if the name is empty or equals the system default.
 * Use this when you need the name as an optional value (e.g. to chain with email fallback).
 */
export function resolveUserName(name?: string | null): string | undefined {
  try {
    const trimmed = name?.trim();
    if (trimmed && trimmed !== SYSTEM_DEFAULT_NAME) return trimmed;
    return undefined;
  } catch (error) {
    console.error("[resolveUserName] Unexpected error while checking user name:", error);
    return undefined;
  }
}
