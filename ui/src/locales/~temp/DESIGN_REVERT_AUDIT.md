# Design Revert Audit — ZAI-43

**Branch:** `vib-1171-2652-2760-3582-localization` (checked out as `temp-merge-test`)
**Audit date:** 2026-05-06
**Auditor:** CTO (ZAI-43)
**Rule:** Localization commits must be string-replacement only. Any non-string change not strictly required to call `t()` must be reverted.

---

## Result: 35 files require revert action

`git diff master --stat` (excluding `ui/src/locales/` and `pnpm-lock.yaml`) shows **98 files changed, 3,916 insertions, 3,500 deletions**. The net-deletion count confirms significant out-of-scope changes.

---

## Files to KEEP (i18n-only changes)

The following 52 files contain only `string → t()` replacements, `useTranslation` imports, or strictly-required i18n plumbing. No action needed.

| File | Notes |
|------|-------|
| AGENTS.md | §5a commit rules added under ZAI-21 governance — authorized, not a loc change |
| server/src/routes/org-chart-svg.ts | STROKE_WIDTH constant extraction only |
| ui/package.json | i18next / react-i18next deps added |
| ui/src/adapters/openclaw-gateway/config-fields.tsx | ⚠️ SEE REVERT GROUP J |
| ui/src/components/AgentActionButtons.tsx | Pure i18n |
| ui/src/components/CodexSubscriptionPanel.tsx | i18n.language + hour12 (date formatting only) |
| ui/src/components/CommandPalette.tsx | Pure i18n |
| ui/src/components/CompanyRail.tsx | Pure i18n |
| ui/src/components/InstanceSidebar.tsx | Pure i18n |
| ui/src/components/IssueRow.tsx | Pure i18n |
| ui/src/components/Layout.tsx | Pure i18n |
| ui/src/components/PathInstructionsModal.tsx | Pure i18n |
| ui/src/components/PropertiesPanel.tsx | Pure i18n |
| ui/src/components/RoutineVariablesEditor.tsx | Pure i18n |
| ui/src/components/StatusIcon.tsx | Pure i18n |
| ui/src/components/transcript/RunTranscriptView.tsx | Pure i18n |
| ui/src/components/Sidebar.tsx | Pure i18n |
| ui/src/components/SidebarCompanyMenu.tsx | Pure i18n |
| ui/src/components/IssuesList.tsx | Pure i18n |
| ui/src/components/CommentThread.tsx | Pure i18n |
| ui/src/lib/activity-format.ts | Pure i18n |
| ui/src/lib/assignees.ts | Pure i18n |
| ui/src/lib/issue-chat-messages.ts | Pure i18n |
| ui/src/lib/run-error-translate.ts | NEW FILE — i18n enabler for error string translation; keep |
| ui/src/lib/timeAgo.ts | Pure i18n |
| ui/src/lib/user-display.ts | NEW FILE — i18n-aware user name resolution; keep (review callers) |
| ui/src/lib/utils.ts | Pure i18n |
| ui/src/main.tsx | i18n init import only |
| ui/src/pages/Activity.tsx | Pure i18n |
| ui/src/pages/Agents.tsx | Pure i18n |
| ui/src/pages/ApprovalDetail.tsx | Pure i18n |
| ui/src/pages/Approvals.tsx | Pure i18n |
| ui/src/pages/Auth.tsx | Pure i18n |
| ui/src/pages/BoardClaim.tsx | Pure i18n |
| ui/src/pages/CliAuth.tsx | Pure i18n |
| ui/src/pages/Companies.tsx | Pure i18n |
| ui/src/pages/CompanyExport.tsx | Pure i18n |
| ui/src/pages/CompanyImport.tsx | Pure i18n |
| ui/src/pages/DashboardLive.tsx | Pure i18n |
| ui/src/pages/ExecutionWorkspaceDetail.tsx | Pure i18n |
| ui/src/pages/GoalDetail.tsx | Pure i18n |
| ui/src/pages/Goals.tsx | Pure i18n |
| ui/src/pages/InstanceExperimentalSettings.tsx | Pure i18n |
| ui/src/pages/InstanceSettings.tsx | Pure i18n (but see Gap #1 below) |
| ui/src/pages/InviteLanding.tsx | Pure i18n |
| ui/src/pages/InviteUxLab.tsx | Pure i18n |
| ui/src/pages/Issues.tsx | Pure i18n |
| ui/src/pages/JoinRequestQueue.tsx | Pure i18n |
| ui/src/pages/MyIssues.tsx | Pure i18n |
| ui/src/pages/NewAgent.tsx | Pure i18n |
| ui/src/pages/NotFound.tsx | Pure i18n |
| ui/src/pages/Org.tsx | Pure i18n |
| ui/src/pages/OrgChart.tsx | Pure i18n |
| ui/src/pages/PluginPage.tsx | Pure i18n |
| ui/src/pages/ProfileSettings.tsx | Pure i18n |
| ui/src/pages/ProjectDetail.tsx | Pure i18n |
| ui/src/pages/Projects.tsx | Pure i18n |
| ui/src/pages/AdapterManager.tsx | Pure i18n |
| ui/src/pages/PluginManager.tsx | Pure i18n |
| ui/src/pages/UserProfile.tsx | Pure i18n |
| ui/src/pages/Workspaces.tsx | Pure i18n |
| ui/src/components/OnboardingWizard.tsx | Language switcher = the ONE permitted UI addition; minor DEFAULT_TASK_TITLE refactor negligible |

---

## Known Gap (not a regression — clean miss from initial sweep)

**Gap #1 — `ui/src/pages/InstanceSettings.tsx:241`**
`{humanize(agent.title ?? agent.role)}` still renders `"ceo"` untranslated for non-English locales. This was on master too; not introduced by the loc branch. Tracked in child issue **ZAI-43-D**.

---

## Files Requiring Revert — Grouped by Child Issue

### ZAI-43-A · Restore CompanyAccess member management feature ⚠️ CRITICAL

**File:** `ui/src/pages/CompanyAccess.tsx`

**Change:** ~150 lines of member removal/archival/reassignment UI was deleted. Removed: `agentsApi` query, removal dialog UI, helper functions `isAssignableAgent`, `isEditableMemberStatus`, `memberDisplayName`, and the entire reassignment workflow. This is a major feature deletion, not i18n.

**Fix:** Restore all deleted functional code. Apply only the string→t() replacements surgically on top of master's structure.

---

### ZAI-43-B · Restore getRecentProjectIds usage

**Files:**
- `ui/src/components/NewIssueDialog.tsx`
- `ui/src/components/RoutineRunVariablesDialog.tsx`
- `ui/src/pages/RoutineDetail.tsx`
- `ui/src/pages/Routines.tsx`

**Change:** All four files removed imports/calls of `getRecentProjectIds` and `trackRecentProject`. NewIssueDialog also removed `recentOptionIds` prop from entity selectors. RoutineRunVariablesDialog removed auto-fill workspace branch variable logic. RoutineDetail/Routines changed `buildRoutineGroups()` signature and removed policy description objects.

**Fix:** Restore the recent-projects tracking and policy description code. Wire i18n strings surgically on top.

---

### ZAI-43-C · Restore SidebarAccountMenu design

**File:** `ui/src/components/SidebarAccountMenu.tsx`

**Change:** "View profile" MenuAction entry deleted. Controlled `open`/`onOpenChange` props removed from component signature (replaced with internal state only). `profileHref` variable and `Link to /u/{slug}` deleted. This causes a 4-entry popover instead of the master 5-entry layout — the size/positioning regression the board flagged.

**Fix:** Restore `open: controlledOpen, onOpenChange` props. Restore `profileHref` and the View profile MenuAction entry with `deriveUserSlug` and `UserRound` icon. Wire new `common.sidebar_account.view_profile` and `view_profile_desc` locale keys in all 8 locales.

---

### ZAI-43-D · Wire InstanceSettings role label to t()

**File:** `ui/src/pages/InstanceSettings.tsx:241`

**Change:** This is a pre-existing gap, not a regression. `{humanize(agent.title ?? agent.role)}` renders `"ceo"` untranslated.

**Fix:** Use the `roleLabels` pattern from `AgentDetail.tsx:937-938`. Add `role.*` keys to all 8 locales. Verify in dev server (Russian locale, `/instance/settings/heartbeats`).

---

### ZAI-43-E · Revert IssueChatThread + ActivityCharts structural refactoring

**Files:**
- `ui/src/components/IssueChatThread.tsx`
- `ui/src/components/ActivityCharts.tsx`
- `ui/src/components/ActivityCharts.test.tsx`

**IssueChatThread changes:** Import restructuring with new primitives (MessagePrimitive, ThreadPrimitive, ActionBarPrimitive). Changed MessagePrimitive.Root and ThreadPrimitive.Root DOM wrappers. Removed copy state management and replaced with ActionBarPrimitive.Copy (feature refactor). Changed IssueChatChainOfThought to use useMessage hook instead of props.

**ActivityCharts changes:** Removed DashboardRunActivityDay type and RunChartProps union. Removed `aggregateRuns` and `resolveRunActivity` functions. Changed both charts to accept only `{runs}` parameter. StatusLabels converted from static constant to `getStatusLabels()` function.

**Fix:** Restore master's component structure. Apply only string→t() on top.

---

### ZAI-43-F · Revert WorkspaceRuntimeControls square prop removal

**Files:**
- `ui/src/components/WorkspaceRuntimeControls.tsx`
- `ui/src/components/WorkspaceRuntimeControls.test.tsx`
- `ui/storybook/stories/projects-goals-workspaces.stories.tsx`

**Change:** `square` prop removed from component interface and implementation. Filtering logic in `buildWorkspaceRuntimeControlSections` changed (status check removed).

**Fix:** Restore the `square` prop and original filtering logic. Update tests and stories to match.

---

### ZAI-43-G · Revert ScheduleEditor structural refactor

**File:** `ui/src/components/ScheduleEditor.tsx`

**Change:** `ChevronDown` import removed. Static constants (`PRESETS`, `HOURS`, `DAYS_OF_WEEK`) converted to `useMemo` hooks. `ordinalSuffix` helper removed. New helpers added: `formatHourLabel`, `formatTimeStr`. `describeSchedule` function completely reimplemented with `Intl.DateTimeFormat` and `i18n.language` (significant logic change beyond string replacement).

**Fix:** Restore master's `describeSchedule` implementation and static constants. Apply t() to string literals only.

---

### ZAI-43-H · Revert Dashboard scope creep

**File:** `ui/src/pages/Dashboard.tsx`

**Change:** Added `heartbeatsApi` import, new `DASHBOARD_HEARTBEAT_RUN_LIMIT` constant, new `useQuery` call for runs data, changed `RunActivityChart` and `SuccessRateChart` component signatures from `activity` prop to `runs` prop. This is a feature addition, not i18n.

**Fix:** Restore master's chart invocation with `activity` props. Remove the new API query.

---

### ZAI-43-I · Strip unauthorized additions from CompanySettings + InstanceGeneralSettings

**Files:**
- `ui/src/pages/CompanySettings.tsx`
- `ui/src/pages/InstanceGeneralSettings.tsx`

**Permitted:** The language selector UI (Select component for language switching). This is the one allowed UI addition per ZAI-43.

**Non-i18n additions to revert:** Both files added a "feedback data sharing" feature section (~40 lines of new UI and logic each) with new API calls.

**Fix:** Surgically remove the feedback data sharing section from each file. Keep the language selector intact.

---

### ZAI-43-J · Revert openclaw-gateway/config-fields WebSocket URL logic

**File:** `ui/src/adapters/openclaw-gateway/config-fields.tsx`

**Change:** Added dynamic WebSocket URL derivation logic inside the placeholder — computes protocol/port transformation from adapter config. This is a feature enhancement, not i18n.

**Fix:** Restore master's static placeholder. Apply only t() to string literals.

---

### ZAI-43-K · Revert misc component structural/API changes

**Files:**
- `ui/src/components/BudgetIncidentCard.tsx` — Removed `incidentStateLabel()` function and Badge import; simplified incident state display (DOM regression)
- `ui/src/components/FinanceTimelineCard.tsx` — Removed `financeDirectionDisplayName` and `financeEventKindDisplayName` imports; changed to direct i18n key interpolation (helper removal)
- `ui/src/components/GoalProperties.tsx` — Added `getLabel` parameter to PickerButton (API change)
- `ui/src/components/IssueColumns.tsx` — Moved `issueColumnLabels`/`issueColumnDescriptions` from module-level to inside component (module structure change)
- `ui/src/components/KanbanBoard.tsx` — Moved `statusLabel()` inside component (code organization change)
- `ui/src/components/JsonSchemaForm.tsx` — EnumField and SecretField changed from arrow function to explicit return; ArrayField callback restructured (code style changes)
- `ui/src/components/ActiveAgentsPanel.tsx` — Removed `memo` from AgentRunCard; changed `relativeTime()` to `timeAgo()`; modified query `enabled` condition and transcript fetch parameters
- `ui/src/components/IssueDocumentsSection.tsx` — Removed `isSystemIssueDocumentKey` check; all documents now visible including system documents (business logic change)

**Fix:** Restore each file to master's structure. Apply only string→t() on top.

---

### ZAI-43-L · Revert user-display callers + minor CSS/format changes

**Files:**
- `ui/src/components/ActivityRow.tsx` — Added `resolveUserPrimaryName()` import and logic restructuring
- `ui/src/pages/CompanyInvites.tsx` — Converted `inviteRoleOptions` constant to `getInviteRoleOptions()` function; added `resolveUserName` import
- `ui/src/pages/InstanceAccess.tsx` — Added `resolveUserPrimaryName()` import and changed display logic
- `ui/src/pages/ProjectWorkspaceDetail.tsx` — CSS class changed from `bg-background` to `bg-muted/20` (unauthorized visual change)
- `ui/src/components/ClaudeSubscriptionPanel.tsx` — `detailText()` function moved inside component; `hour12: false` added to date formatting (format change)
- `ui/src/components/IssueFiltersPopover.tsx` — Import reorder only (minor but out of scope)
- `ui/storybook/stories/navigation-layout.stories.tsx` — Removed `open`/`onOpenChange` props from SidebarAccountMenu story (reflects component change)

**Note on user-display.ts:** The new `ui/src/lib/user-display.ts` file itself is a legitimate i18n helper (KEEP). The question is whether callers were using it as a pure i18n lookup or as a logic refactor. On review these are refactors — restore the original display logic in each caller.

**Fix:** Restore caller display logic to master's pattern. Keep user-display.ts but wire it only where strictly required for locale-aware display (if any). Revert CSS and format changes.

---

## Summary Table

| Child Issue | Files | Severity |
|-------------|-------|----------|
| ZAI-43-A | CompanyAccess.tsx | CRITICAL — feature deleted |
| ZAI-43-B | NewIssueDialog, RoutineRunVariablesDialog, RoutineDetail, Routines | HIGH — feature deleted |
| ZAI-43-C | SidebarAccountMenu.tsx | HIGH — board-named regression |
| ZAI-43-D | InstanceSettings.tsx | MEDIUM — i18n gap (new work) |
| ZAI-43-E | IssueChatThread, ActivityCharts + test | HIGH — component refactoring |
| ZAI-43-F | WorkspaceRuntimeControls + test + storybook | MEDIUM — prop deletion |
| ZAI-43-G | ScheduleEditor.tsx | MEDIUM — logic restructuring |
| ZAI-43-H | Dashboard.tsx | MEDIUM — scope creep |
| ZAI-43-I | CompanySettings, InstanceGeneralSettings | MEDIUM — partial revert (keep lang switcher) |
| ZAI-43-J | openclaw-gateway/config-fields.tsx | MEDIUM — feature addition |
| ZAI-43-K | BudgetIncidentCard, FinanceTimelineCard, GoalProperties, IssueColumns, KanbanBoard, JsonSchemaForm, ActiveAgentsPanel, IssueDocumentsSection | MEDIUM — misc structural |
| ZAI-43-L | ActivityRow, CompanyInvites, InstanceAccess, ProjectWorkspaceDetail, ClaudeSubscriptionPanel, IssueFiltersPopover, navigation-layout.stories | LOW-MEDIUM — callers + minor |

**Total revert files: 35**
**Files verified clean (i18n-only): 52**
**New files to keep: 2** (run-error-translate.ts, user-display.ts)
**Unchanged/non-code: 9** (locale JSON, lock file — out of scope)

---

## Next Steps

1. Board reviews this audit (posted to ZAI-43 thread)
2. Grandchild issues ZAI-43-A through ZAI-43-L created and assigned
3. Each child does the revert commit with prefix `revert(i18n-scope):`
4. Browser Tester signs off on ZAI-43-A/C/E/F/K (visual pages)
5. After all children done: verify `git diff master --stat` (excl. locales) shows near-symmetric add/delete and <500 net lines
