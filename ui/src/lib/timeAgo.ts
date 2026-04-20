import i18n from "@/locales/i18n";

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;

/**
 * Returns a human-readable relative time string (e.g. "5m ago") in the current UI language.
 * Falls back to a raw seconds string if translation fails.
 */
export function timeAgo(date: Date | string): string {
  try {
    const now = Date.now();
    const then = new Date(date).getTime();
    const seconds = Math.round((now - then) / 1000);

    if (seconds < MINUTE) return i18n.t("time.just_now", { ns: "activity" });
    if (seconds < HOUR) return i18n.t("time.minutes_ago", { ns: "activity", count: Math.floor(seconds / MINUTE) });
    if (seconds < DAY) return i18n.t("time.hours_ago", { ns: "activity", count: Math.floor(seconds / HOUR) });
    if (seconds < WEEK) return i18n.t("time.days_ago", { ns: "activity", count: Math.floor(seconds / DAY) });
    if (seconds < MONTH) return i18n.t("time.weeks_ago", { ns: "activity", count: Math.floor(seconds / WEEK) });
    return i18n.t("time.months_ago", { ns: "activity", count: Math.floor(seconds / MONTH) });
  } catch (error) {
    console.error("[timeAgo] Failed to format relative time for date:", date, error);
    return String(date);
  }
}
