import i18n from "@/locales/i18n";

/**
 * Maps known backend error strings to i18n keys.
 * Returns null if the string is not recognised (show original only).
 */
export function translateRunError(error: string | null | undefined): string | null {
  if (!error) return null;

  const exitMatch = error.match(/Claude exited with code (\d+)/);
  if (exitMatch) {
    return i18n.t("run_errors.exited_with_code", { ns: "agents", code: exitMatch[1] });
  }

  const subtypeMatch = error.match(/Claude run failed: subtype=(\w+)/);
  if (subtypeMatch) {
    return i18n.t("run_errors.failed_subtype", { ns: "agents", subtype: subtypeMatch[1] });
  }

  if (error.trim() === "run started") {
    return i18n.t("run_errors.run_started", { ns: "agents" });
  }

  if (error.trim() === "run finished") {
    return i18n.t("run_errors.run_finished", { ns: "agents" });
  }

  if (error.trim() === "run cancelled") {
    return i18n.t("run_errors.run_cancelled", { ns: "agents" });
  }

  if (error.trim() === "adapter invocation") {
    return i18n.t("run_errors.adapter_invocation", { ns: "agents" });
  }

  return null;
}
