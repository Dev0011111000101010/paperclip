import type { Agent } from "@paperclipai/shared";
import type { CompanyUserProfile } from "./company-members";
import i18n from "@/locales/i18n";

type ActivityDetails = Record<string, unknown> | null | undefined;

type ActivityParticipant = {
  type: "agent" | "user";
  agentId?: string | null;
  userId?: string | null;
};

type ActivityIssueReference = {
  id?: string | null;
  identifier?: string | null;
  title?: string | null;
};

interface ActivityFormatOptions {
  agentMap?: Map<string, Agent>;
  userProfileMap?: Map<string, CompanyUserProfile>;
  currentUserId?: string | null;
}

/**
 * Returns the map of activity event action keys to their translated verb strings.
 * Called at render time so translations reflect the current language.
 */
function getActivityRowVerbs(): Record<string, string> {
  try {
    return {
      "issue.created": i18n.t("verbs.issue_created", { ns: "activity" }),
      "issue.updated": i18n.t("verbs.issue_updated", { ns: "activity" }),
      "issue.checked_out": i18n.t("verbs.issue_checked_out", { ns: "activity" }),
      "issue.released": i18n.t("verbs.issue_released", { ns: "activity" }),
      "issue.comment_added": i18n.t("verbs.issue_comment_added", { ns: "activity" }),
      "issue.comment_cancelled": i18n.t("verbs.issue_comment_cancelled", { ns: "activity" }),
      "issue.attachment_added": i18n.t("verbs.issue_attachment_added", { ns: "activity" }),
      "issue.attachment_removed": i18n.t("verbs.issue_attachment_removed", { ns: "activity" }),
      "issue.document_created": i18n.t("verbs.issue_document_created", { ns: "activity" }),
      "issue.document_updated": i18n.t("verbs.issue_document_updated", { ns: "activity" }),
      "issue.document_deleted": i18n.t("verbs.issue_document_deleted", { ns: "activity" }),
      "issue.commented": i18n.t("verbs.issue_commented", { ns: "activity" }),
      "issue.deleted": i18n.t("verbs.issue_deleted", { ns: "activity" }),
      "agent.created": i18n.t("verbs.agent_created", { ns: "activity" }),
      "agent.updated": i18n.t("verbs.agent_updated", { ns: "activity" }),
      "agent.paused": i18n.t("verbs.agent_paused", { ns: "activity" }),
      "agent.resumed": i18n.t("verbs.agent_resumed", { ns: "activity" }),
      "agent.terminated": i18n.t("verbs.agent_terminated", { ns: "activity" }),
      "agent.key_created": i18n.t("verbs.agent_key_created", { ns: "activity" }),
      "agent.budget_updated": i18n.t("verbs.agent_budget_updated", { ns: "activity" }),
      "agent.runtime_session_reset": i18n.t("verbs.agent_runtime_session_reset", { ns: "activity" }),
      "heartbeat.invoked": i18n.t("verbs.heartbeat_invoked", { ns: "activity" }),
      "heartbeat.cancelled": i18n.t("verbs.heartbeat_cancelled", { ns: "activity" }),
      "approval.created": i18n.t("verbs.approval_created", { ns: "activity" }),
      "approval.approved": i18n.t("verbs.approval_approved", { ns: "activity" }),
      "approval.rejected": i18n.t("verbs.approval_rejected", { ns: "activity" }),
      "project.created": i18n.t("verbs.project_created", { ns: "activity" }),
      "project.updated": i18n.t("verbs.project_updated", { ns: "activity" }),
      "project.deleted": i18n.t("verbs.project_deleted", { ns: "activity" }),
      "goal.created": i18n.t("verbs.goal_created", { ns: "activity" }),
      "goal.updated": i18n.t("verbs.goal_updated", { ns: "activity" }),
      "goal.deleted": i18n.t("verbs.goal_deleted", { ns: "activity" }),
      "cost.reported": i18n.t("verbs.cost_reported", { ns: "activity" }),
      "cost.recorded": i18n.t("verbs.cost_recorded", { ns: "activity" }),
      "company.created": i18n.t("verbs.company_created", { ns: "activity" }),
      "company.updated": i18n.t("verbs.company_updated", { ns: "activity" }),
      "company.archived": i18n.t("verbs.company_archived", { ns: "activity" }),
      "company.budget_updated": i18n.t("verbs.company_budget_updated", { ns: "activity" }),
      "invite.created": i18n.t("verbs.invite_created", { ns: "activity" }),
      "invite.accepted": i18n.t("verbs.invite_accepted", { ns: "activity" }),
      "invite.cancelled": i18n.t("verbs.invite_cancelled", { ns: "activity" }),
      "invite.expired": i18n.t("verbs.invite_expired", { ns: "activity" }),
    };
  } catch (error) {
    console.error("[getActivityRowVerbs] Failed to build verb map:", error);
    return {};
  }
}

/**
 * Returns the map of activity event action keys to their translated label strings
 * used in the issue detail view.
 */
function getIssueActivityLabels(): Record<string, string> {
  try {
    return {
      "issue.created": i18n.t("issue_labels.issue_created", { ns: "activity" }),
      "issue.updated": i18n.t("issue_labels.issue_updated", { ns: "activity" }),
      "issue.checked_out": i18n.t("issue_labels.issue_checked_out", { ns: "activity" }),
      "issue.released": i18n.t("issue_labels.issue_released", { ns: "activity" }),
      "issue.comment_added": i18n.t("issue_labels.issue_comment_added", { ns: "activity" }),
      "issue.comment_cancelled": i18n.t("issue_labels.issue_comment_cancelled", { ns: "activity" }),
      "issue.feedback_vote_saved": i18n.t("issue_labels.issue_feedback_vote_saved", { ns: "activity" }),
      "issue.attachment_added": i18n.t("issue_labels.issue_attachment_added", { ns: "activity" }),
      "issue.attachment_removed": i18n.t("issue_labels.issue_attachment_removed", { ns: "activity" }),
      "issue.document_created": i18n.t("issue_labels.issue_document_created", { ns: "activity" }),
      "issue.document_updated": i18n.t("issue_labels.issue_document_updated", { ns: "activity" }),
      "issue.document_deleted": i18n.t("issue_labels.issue_document_deleted", { ns: "activity" }),
      "issue.deleted": i18n.t("issue_labels.issue_deleted", { ns: "activity" }),
      "agent.created": i18n.t("issue_labels.agent_created", { ns: "activity" }),
      "agent.updated": i18n.t("issue_labels.agent_updated", { ns: "activity" }),
      "agent.paused": i18n.t("issue_labels.agent_paused", { ns: "activity" }),
      "agent.resumed": i18n.t("issue_labels.agent_resumed", { ns: "activity" }),
      "agent.terminated": i18n.t("issue_labels.agent_terminated", { ns: "activity" }),
      "heartbeat.invoked": i18n.t("issue_labels.heartbeat_invoked", { ns: "activity" }),
      "heartbeat.cancelled": i18n.t("issue_labels.heartbeat_cancelled", { ns: "activity" }),
      "approval.created": i18n.t("issue_labels.approval_created", { ns: "activity" }),
      "approval.approved": i18n.t("issue_labels.approval_approved", { ns: "activity" }),
      "approval.rejected": i18n.t("issue_labels.approval_rejected", { ns: "activity" }),
    };
  } catch (error) {
    console.error("[getIssueActivityLabels] Failed to build label map:", error);
    return {};
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

/**
 * Converts a raw value to a human-readable string, replacing underscores with spaces.
 * Returns the translated "none" string for null/undefined values.
 */
function humanizeValue(value: unknown): string {
  try {
    if (typeof value !== "string") return String(value ?? i18n.t("changes.none", { ns: "activity" }));
    return value.replace(/_/g, " ");
  } catch (error) {
    console.error("[humanizeValue] Failed to humanize value:", value, error);
    return String(value ?? "");
  }
}

function isActivityParticipant(value: unknown): value is ActivityParticipant {
  const record = asRecord(value);
  if (!record) return false;
  return record.type === "agent" || record.type === "user";
}

function isActivityIssueReference(value: unknown): value is ActivityIssueReference {
  return asRecord(value) !== null;
}

function readParticipants(details: ActivityDetails, key: string): ActivityParticipant[] {
  const value = details?.[key];
  if (!Array.isArray(value)) return [];
  return value.filter(isActivityParticipant);
}

function readIssueReferences(details: ActivityDetails, key: string): ActivityIssueReference[] {
  const value = details?.[key];
  if (!Array.isArray(value)) return [];
  return value.filter(isActivityIssueReference);
}

/**
 * Resolves a user ID to a display label.
 * Returns the translated "Board" default for the local-board user, "You" for the current user,
 * or a short user ID snippet as fallback.
 */
function formatUserLabel(userId: string | null | undefined, options: ActivityFormatOptions = {}): string {
  try {
    if (!userId || userId === "local-board") return i18n.t("actor.board", { ns: "activity" });
    if (options.currentUserId && userId === options.currentUserId) return i18n.t("actor.you", { ns: "activity" });
    const profile = options.userProfileMap?.get(userId);
    if (profile) return profile.label;
    return i18n.t("actor.user_short", { ns: "activity", id: userId.slice(0, 5) });
  } catch (error) {
    console.error("[formatUserLabel] Failed to resolve user label for userId:", userId, error);
    return userId ?? i18n.t("actor.unknown", { ns: "activity" });
  }
}

/**
 * Resolves a participant (agent or user) to a display label.
 */
function formatParticipantLabel(participant: ActivityParticipant, options: ActivityFormatOptions): string {
  try {
    if (participant.type === "agent") {
      const agentId = participant.agentId ?? "";
      return options.agentMap?.get(agentId)?.name ?? i18n.t("actor.agent_fallback", { ns: "activity" });
    }
    return formatUserLabel(participant.userId, options);
  } catch (error) {
    console.error("[formatParticipantLabel] Failed to resolve participant label:", participant, error);
    return i18n.t("actor.unknown", { ns: "activity" });
  }
}

/**
 * Resolves an issue reference to a short display label (identifier, title, or id snippet).
 */
function formatIssueReferenceLabel(reference: ActivityIssueReference): string {
  try {
    if (reference.identifier) return reference.identifier;
    if (reference.title) return reference.title;
    if (reference.id) return reference.id.slice(0, 8);
    return i18n.t("actor.issue_fallback", { ns: "activity" });
  } catch (error) {
    console.error("[formatIssueReferenceLabel] Failed to resolve issue reference label:", reference, error);
    return i18n.t("actor.issue_fallback", { ns: "activity" });
  }
}

/**
 * Formats a summary of changed entities (e.g. "2 blockers" or "blocker PAP-12").
 */
function formatChangedEntityLabel(singular: string, plural: string, labels: string[]): string {
  try {
    if (labels.length <= 0) return plural;
    if (labels.length === 1) return `${singular} ${labels[0]}`;
    return `${labels.length} ${plural}`;
  } catch (error) {
    console.error("[formatChangedEntityLabel] Failed to format entity label:", { singular, plural, labels }, error);
    return plural;
  }
}

/**
 * Formats the verb for an "issue.updated" event in the activity feed row context.
 * Returns null if the details do not contain a recognized field change.
 */
function formatIssueUpdatedVerb(details: ActivityDetails): string | null {
  try {
    if (!details) return null;
    const previous = asRecord(details._previous) ?? {};
    if (details.status !== undefined) {
      const from = previous.status;
      return from
        ? i18n.t("changes.changed_status_from", { ns: "activity", from: humanizeValue(from), to: humanizeValue(details.status) })
        : i18n.t("changes.changed_status_to", { ns: "activity", to: humanizeValue(details.status) });
    }
    if (details.priority !== undefined) {
      const from = previous.priority;
      return from
        ? i18n.t("changes.changed_priority_from", { ns: "activity", from: humanizeValue(from), to: humanizeValue(details.priority) })
        : i18n.t("changes.changed_priority_to", { ns: "activity", to: humanizeValue(details.priority) });
    }
    return null;
  } catch (error) {
    console.error("[formatIssueUpdatedVerb] Failed to format issue updated verb:", details, error);
    return null;
  }
}

/**
 * Resolves the assignee display name from issue update details.
 */
function formatAssigneeName(details: ActivityDetails, options: ActivityFormatOptions): string | null {
  try {
    if (!details) return null;
    const agentId = details.assigneeAgentId;
    const userId = details.assigneeUserId;
    if (typeof agentId === "string" && agentId) {
      return options.agentMap?.get(agentId)?.name ?? i18n.t("actor.agent_fallback", { ns: "activity" });
    }
    if (typeof userId === "string" && userId) {
      return formatUserLabel(userId, options);
    }
    return null;
  } catch (error) {
    console.error("[formatAssigneeName] Failed to resolve assignee name:", details, error);
    return null;
  }
}

/**
 * Formats a human-readable action description for an "issue.updated" event in issue detail view.
 * Returns null if no recognized field changes are found in details.
 */
function formatIssueUpdatedAction(details: ActivityDetails, options: ActivityFormatOptions = {}): string | null {
  try {
    if (!details) return null;
    const previous = asRecord(details._previous) ?? {};
    const parts: string[] = [];

    if (details.status !== undefined) {
      const from = previous.status;
      parts.push(
        from
          ? i18n.t("changes.changed_status_from_detail", { ns: "activity", from: humanizeValue(from), to: humanizeValue(details.status) })
          : i18n.t("changes.changed_status_to_detail", { ns: "activity", to: humanizeValue(details.status) }),
      );
    }
    if (details.priority !== undefined) {
      const from = previous.priority;
      parts.push(
        from
          ? i18n.t("changes.changed_priority_from_detail", { ns: "activity", from: humanizeValue(from), to: humanizeValue(details.priority) })
          : i18n.t("changes.changed_priority_to_detail", { ns: "activity", to: humanizeValue(details.priority) }),
      );
    }
    if (details.assigneeAgentId !== undefined || details.assigneeUserId !== undefined) {
      const assigneeName = formatAssigneeName(details, options);
      parts.push(
        assigneeName
          ? i18n.t("changes.assigned_to", { ns: "activity", name: assigneeName })
          : i18n.t("changes.unassigned", { ns: "activity" }),
      );
    }
    if (details.title !== undefined) parts.push(i18n.t("changes.updated_title", { ns: "activity" }));
    if (details.description !== undefined) parts.push(i18n.t("changes.updated_description", { ns: "activity" }));

    return parts.length > 0 ? parts.join(", ") : null;
  } catch (error) {
    console.error("[formatIssueUpdatedAction] Failed to format issue updated action:", details, error);
    return null;
  }
}

/**
 * Formats a structured label for issue blocker/reviewer/approver change events.
 * Returns null for unrecognized action types.
 */
function formatStructuredIssueChange(input: {
  action: string;
  details: ActivityDetails;
  options: ActivityFormatOptions;
  forIssueDetail: boolean;
}): string | null {
  try {
    const details = input.details;
    if (!details) return null;

    if (input.action === "issue.blockers_updated") {
      const singular = i18n.t("changes.blocker_singular", { ns: "activity" });
      const plural = i18n.t("changes.blocker_plural", { ns: "activity" });
      const added = readIssueReferences(details, "addedBlockedByIssues").map(formatIssueReferenceLabel);
      const removed = readIssueReferences(details, "removedBlockedByIssues").map(formatIssueReferenceLabel);
      if (added.length > 0 && removed.length === 0) {
        const changed = formatChangedEntityLabel(singular, plural, added);
        return input.forIssueDetail
          ? i18n.t("changes.added", { ns: "activity", changed })
          : i18n.t("changes.added_to", { ns: "activity", changed });
      }
      if (removed.length > 0 && added.length === 0) {
        const changed = formatChangedEntityLabel(singular, plural, removed);
        return input.forIssueDetail
          ? i18n.t("changes.removed", { ns: "activity", changed })
          : i18n.t("changes.removed_from", { ns: "activity", changed });
      }
      return input.forIssueDetail
        ? i18n.t("changes.updated_blockers", { ns: "activity" })
        : i18n.t("changes.updated_blockers_on", { ns: "activity" });
    }

    if (input.action === "issue.reviewers_updated" || input.action === "issue.approvers_updated") {
      const isReviewer = input.action === "issue.reviewers_updated";
      const singular = isReviewer
        ? i18n.t("changes.reviewer_singular", { ns: "activity" })
        : i18n.t("changes.approver_singular", { ns: "activity" });
      const plural = isReviewer
        ? i18n.t("changes.reviewer_plural", { ns: "activity" })
        : i18n.t("changes.approver_plural", { ns: "activity" });
      const added = readParticipants(details, "addedParticipants").map((p) => formatParticipantLabel(p, input.options));
      const removed = readParticipants(details, "removedParticipants").map((p) => formatParticipantLabel(p, input.options));
      if (added.length > 0 && removed.length === 0) {
        const changed = formatChangedEntityLabel(singular, plural, added);
        return input.forIssueDetail
          ? i18n.t("changes.added", { ns: "activity", changed })
          : i18n.t("changes.added_to", { ns: "activity", changed });
      }
      if (removed.length > 0 && added.length === 0) {
        const changed = formatChangedEntityLabel(singular, plural, removed);
        return input.forIssueDetail
          ? i18n.t("changes.removed", { ns: "activity", changed })
          : i18n.t("changes.removed_from", { ns: "activity", changed });
      }
      return input.forIssueDetail
        ? i18n.t("changes.updated", { ns: "activity", plural })
        : i18n.t("changes.updated_on", { ns: "activity", plural });
    }

    return null;
  } catch (error) {
    console.error("[formatStructuredIssueChange] Failed to format structured change:", input.action, error);
    return null;
  }
}

export function formatActivityVerb(
  action: string,
  details?: Record<string, unknown> | null,
  options: ActivityFormatOptions = {},
): string {
  try {
    if (action === "issue.updated") {
      const issueUpdatedVerb = formatIssueUpdatedVerb(details);
      if (issueUpdatedVerb) return issueUpdatedVerb;
    }

    const structuredChange = formatStructuredIssueChange({ action, details, options, forIssueDetail: false });
    if (structuredChange) return structuredChange;

    return getActivityRowVerbs()[action] ?? action.replace(/[._]/g, " ");
  } catch (error) {
    console.error("[formatActivityVerb] Failed to format activity verb for action:", action, error);
    return action.replace(/[._]/g, " ");
  }
}

export function formatIssueActivityAction(
  action: string,
  details?: Record<string, unknown> | null,
  options: ActivityFormatOptions = {},
): string {
  try {
    if (action === "issue.updated") {
      const issueUpdatedAction = formatIssueUpdatedAction(details, options);
      if (issueUpdatedAction) return issueUpdatedAction;
    }

    const structuredChange = formatStructuredIssueChange({ action, details, options, forIssueDetail: true });
    if (structuredChange) return structuredChange;

    if (
      (action === "issue.document_created" || action === "issue.document_updated" || action === "issue.document_deleted") &&
      details
    ) {
      const key = typeof details.key === "string" ? details.key : i18n.t("actor.issue_fallback", { ns: "activity" });
      const title = typeof details.title === "string" && details.title ? ` (${details.title})` : "";
      return `${getIssueActivityLabels()[action] ?? action} ${key}${title}`;
    }

    return getIssueActivityLabels()[action] ?? action.replace(/[._]/g, " ");
  } catch (error) {
    console.error("[formatIssueActivityAction] Failed to format issue activity action for action:", action, error);
    return action.replace(/[._]/g, " ");
  }
}
