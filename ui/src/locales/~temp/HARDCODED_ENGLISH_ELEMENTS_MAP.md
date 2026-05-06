# Hardcoded English Elements - CSS Selectors & HTML Elements

**Test Server URL:** http://127.0.0.1:3105/
**Date (original):** 2026-04-26 | **Post-revert audit:** 2026-05-06
**Language:** Russian (Русский)

---

## POST-REVERT PHASE 1 AUDIT — ZAI-63 (2026-05-06)

### Step A — Git state verification

`git diff master --name-only -- ui/src` (excluding `ui/src/locales/`) shows **89 non-locale files** changed vs master.
These are **intentional i18n wiring changes** from ZAI-30 through ZAI-45 (adding `useTranslation` hooks and replacing hardcoded strings with `t()` calls). ZAI-43 reverts targeted DOM/structural regressions only. Branch state is consistent with expectations.

### Step B + C — Confirmed post-revert findings

Legend: [CONFIRMED] = still hardcoded in current branch | [REVERTED] = now uses t() or key exists | [MISSING KEY] = t() call with no matching key in en/

---

## Global / Sidebar Chrome

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| all | `"Agents"` (section label, h3) | `components/ActiveAgentsPanel.tsx:42` | default prop `title = "Agents"` — no t() wrapper; renders as h3 on Dashboard |
| all | `"No recent agent runs."` | `components/ActiveAgentsPanel.tsx:48` | default prop `emptyMessage` — hardcoded English |
| all | `"Project paused by budget"` | `components/SidebarProjects.tsx:98` | `title=` attribute on BudgetSidebarMarker |
| all | `"New project"` | `components/SidebarProjects.tsx:204` | `aria-label="New project"` on button |
| all | `"Resume agent"` / `"Pause agent"` | `components/SidebarAgents.tsx:65` | ternary for `pauseResumeLabel` — not wrapped in t() |
| all | `"Budget paused"` | `components/SidebarAgents.tsx:70` | button label when budget-paused — hardcoded |
| all | `"Agent paused by budget"` | `components/SidebarAgents.tsx:93` | `title=` attribute on BudgetSidebarMarker |
| all | `"Agent was paused by budget limits"` | `components/SidebarAgents.tsx:145` | `title=` tooltip on budget-paused button |
| all | `"Agent paused"` / `"Agent resumed"` | `components/SidebarAgents.tsx:233` | toast `title:` on pause/resume success |
| all | `"Could not pause agent"` / `"Could not resume agent"` | `components/SidebarAgents.tsx:240` | toast `title:` on pause/resume error |
| all | `"New agent"` | `components/SidebarAgents.tsx:275` | `aria-label="New agent"` on button |
| all | `"Agents"` (mobile nav) | `components/MobileBottomNav.tsx:48` | `label: "Agents"` in mobile nav item config |

---

## Dashboard (/dashboard)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| /dashboard | `"Agents"` h3 section | `components/ActiveAgentsPanel.tsx:42,87` | [CONFIRMED] — default `title` prop rendered as `{title}` in h3 |
| /dashboard | CEO role label | `pages/Dashboard.tsx` | [REVERTED — gone] — activity-format.ts now uses `i18n.t("verbs.*", {ns:"activity"})` for all verb/role strings |

---

## Issues Page (/issues)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| /issues | `"Issues"` | `pages/Issues.tsx:121` | [CONFIRMED] — `setBreadcrumbs([{ label: "Issues" }])` — hardcoded breadcrumb label |

---

## Goals (/goals, /goals/:id)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| /goals | `"company"` / `"active"` enum | `pages/GoalDetail.tsx:152`, `components/GoalProperties.tsx:108,111` | [CONFIRMED] — `StatusBadge` renders `status.replace(/_/g, " ")` without t(); goal statuses ("company", "active", "in_progress"→"in progress") render raw |
| /goals/:id | `"in progress"` badge | `pages/GoalDetail.tsx:221` | [CONFIRMED] — project status via StatusBadge with same raw rendering |

---

## Agent Dashboard / Status Badges (global)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| all (agents) | `"idle"` / `"succeeded"` / `"done"` / `"in progress"` | `components/StatusBadge.tsx:12` | [CONFIRMED] — `{status.replace(/_/g, " ")}` — ALL agent/issue/run status values render as raw English enum text |
| all | `"Blocked"` (aria-label/title) | `components/StatusIcon.tsx:24,57` | [CONFIRMED] — `blockedAttentionLabel()` returns hardcoded English strings for aria-label and title attrs |
| all | `"Blocked · waiting on..."` / `"Blocked · covered by..."` etc. | `components/StatusIcon.tsx:29-54` | [CONFIRMED] — full set of blockerAttentionLabel variants all hardcoded English |

---

## IssueColumns (table headers)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| /issues, /projects/:id/issues | `"Status"`, `"Assignee"`, `"Project"`, `"Workspace"`, `"Parent issue"`, `"Tags"`, `"Last updated"` | `components/IssueColumns.tsx:27-34` | [CONFIRMED] — column header label map hardcoded; no t() |

---

## Issue Run Ledger (global — visible on issue detail)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| /issues/:id | `"Completed"`, `"Advanced"`, `"Plan only"`, `"Empty response"`, `"Blocked"`, `"Failed"` | `components/IssueRunLedger.tsx:74-99` | [CONFIRMED] — run outcome label objects hardcoded |
| /issues/:id | `"Checks after finish"`, `"Retry pending"`, `"No liveness data"` | `components/IssueRunLedger.tsx:111-123` | [CONFIRMED] — liveness label objects hardcoded |
| /issues/:id | `"Silence watch"`, `"Stale run"`, `"Silence snoozed"` | `components/IssueRunLedger.tsx:140-148` | [CONFIRMED] — silence label objects hardcoded |
| /issues/:id | `"Retry pending"`, `"Waiting to start"`, `"Still running"`, `"Unavailable"`, `"No stop reason"` | `components/IssueRunLedger.tsx:326-330` | [CONFIRMED] — run status label return strings hardcoded |
| /issues/:id | `"Waiting for next attempt"`, `"No action recorded yet"`, `"No concrete action"` | `components/IssueRunLedger.tsx:334-338` | [CONFIRMED] — run action description strings hardcoded |

---

## Issue Thread Interaction Card (global — visible on issue detail)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| /issues/:id | `"Board"`, `"Unknown"` | `components/IssueThreadInteractionCard.tsx:63,65` | [CONFIRMED] — assignee label fallbacks hardcoded |
| /issues/:id | `"Pending"`, `"Accepted"`, `"Rejected"`, `"Answered"`, `"Cancelled"`, `"Expired"`, `"Failed"` | `components/IssueThreadInteractionCard.tsx:71-83` | [CONFIRMED] — interaction status label returns hardcoded |
| /issues/:id | `"Suggested tasks"`, `"Ask user questions"`, `"Confirmation"` | `components/IssueThreadInteractionCard.tsx:92-96` | [CONFIRMED] — interaction kind labels hardcoded |
| /issues/:id | `"Assignee"`, `"Billing"`, `"Project"`, `"Label"` | `components/IssueThreadInteractionCard.tsx:287-296` | [CONFIRMED] — TaskField `label=` props hardcoded |
| /issues/:id | `"Accept drafts"` / `"Accept selected drafts"` | `components/IssueThreadInteractionCard.tsx:533` | [CONFIRMED] — button text ternary hardcoded |
| /issues/:id | `"Add a short reason for rejecting this suggestion"` | `components/IssueThreadInteractionCard.tsx:562` | [CONFIRMED] — textarea `placeholder=` hardcoded |
| /issues/:id | `"Save rejection"` | `components/IssueThreadInteractionCard.tsx:578` | [CONFIRMED] — button text hardcoded |
| /issues/:id | `"Pick"` / `"Pick many"`, `"Required"` / `"Optional"` | `components/IssueThreadInteractionCard.tsx:763-764` | [CONFIRMED] — question mode labels hardcoded |
| /issues/:id | `"Cancel question"` | `components/IssueThreadInteractionCard.tsx:808` | [CONFIRMED] — button text hardcoded |
| /issues/:id | `"Submit answers"` (fallback) | `components/IssueThreadInteractionCard.tsx:823` | [CONFIRMED] — `interaction.payload.submitLabel ?? "Submit answers"` |
| /issues/:id | `"Expired by comment"` / `"Expired by target change"` | `components/IssueThreadInteractionCard.tsx:985` | [CONFIRMED] — expiry reason labels hardcoded |
| /issues/:id | `"Approve plan"` | `components/IssueThreadInteractionCard.tsx:1051` | [CONFIRMED] — accept label comparison + default hardcoded |
| /issues/:id | `"Confirm"` (fallback) | `components/IssueThreadInteractionCard.tsx:1127` | [CONFIRMED] — `acceptLabel ?? "Confirm"` |
| /issues/:id | `"Decline"` (fallback) | `components/IssueThreadInteractionCard.tsx:1143,1187` | [CONFIRMED] — `rejectLabel ?? "Decline"` |

---

## Adapter Test Panel (Agent Config — /agents/:id)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| /agents/:id | `"Passed"` / `"Warnings"` / `"Failed"` | `components/AgentConfigForm.tsx:1275` | [CONFIRMED] — keys exist in `en/agents.json` (adapter test result badge) but component uses hardcoded ternary, NOT t() — unwired key |
| /agents/:id | `"Hint: "` | `components/AgentConfigForm.tsx:1300` | [CONFIRMED] — `"Hint: {check.hint}"` rendered as JSX text + expression |

---

## Agent Config Form (/agents/:id — configuration tab)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| /agents/:id | `"Auto"`, `"Minimal"`, `"Low"`, `"Medium"`, `"High"`, `"Max"` | `components/AgentConfigForm.tsx:148-163` | [CONFIRMED] — dropdown option `label` objects hardcoded |
| /agents/:id | `"Plan"`, `"Ask"` | `components/AgentConfigForm.tsx:168-169` | [CONFIRMED] — permission mode option labels hardcoded |
| /agents/:id | `"Saving..."` / `"Save"` | `components/AgentConfigForm.tsx:676` | [CONFIRMED] — save button text ternary hardcoded |
| /agents/:id | `label="Name"` | `components/AgentConfigForm.tsx:690` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `placeholder="Agent name"` | `components/AgentConfigForm.tsx:696` | [CONFIRMED] — input placeholder hardcoded |
| /agents/:id | `label="Title"` | `components/AgentConfigForm.tsx:699` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `placeholder="e.g. VP of Engineering"` | `components/AgentConfigForm.tsx:705` | [CONFIRMED] — input placeholder hardcoded |
| /agents/:id | `label="Reports to"` | `components/AgentConfigForm.tsx:708` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `label="Capabilities"` | `components/AgentConfigForm.tsx:717` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `placeholder="Describe what this agent can do..."` | `components/AgentConfigForm.tsx:721` | [CONFIRMED] — textarea placeholder hardcoded |
| /agents/:id | `label="Prompt Template"` | `components/AgentConfigForm.tsx:734` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `placeholder="You are agent {{ agent.name }}..."` | `components/AgentConfigForm.tsx:742` | [CONFIRMED] — textarea placeholder hardcoded |
| /agents/:id | `label="Default environment"` | `components/AgentConfigForm.tsx:769` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `label="Adapter type"` | `components/AgentConfigForm.tsx:818` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `placeholder="/path/to/project"` | `components/AgentConfigForm.tsx:905` | [CONFIRMED] — path input placeholder hardcoded |
| /agents/:id | `label="Command"` | `components/AgentConfigForm.tsx:925` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `"Detect model"` | `components/AgentConfigForm.tsx:987` | [CONFIRMED] — `detectModelLabel="Detect model"` prop default hardcoded |
| /agents/:id | `placeholder="Optional initial setup prompt for the first run"` | `components/AgentConfigForm.tsx:1054` | [CONFIRMED] — textarea placeholder hardcoded |
| /agents/:id | `placeholder="e.g. --verbose, --foo=bar"` | `components/AgentConfigForm.tsx:1087` | [CONFIRMED] — input placeholder hardcoded |
| /agents/:id | `label="Environment variables"` | `components/AgentConfigForm.tsx:1091` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `label="Heartbeat on interval"` | `components/AgentConfigForm.tsx:1154,1176` | [CONFIRMED] — checkbox label hardcoded (appears twice) |
| /agents/:id | `numberPrefix="Run heartbeat every"` | `components/AgentConfigForm.tsx:1161,1183` | [CONFIRMED] — number input prefix hardcoded (appears twice) |
| /agents/:id | `title="Advanced Run Policy"` | `components/AgentConfigForm.tsx:1189` | [CONFIRMED] — section title hardcoded |
| /agents/:id | `label="Wake on demand"` | `components/AgentConfigForm.tsx:1196` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `label="Max concurrent runs"` | `components/AgentConfigForm.tsx:1217` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `label="Continuation attempts"` | `components/AgentConfigForm.tsx:1238` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `label="Model"` | `components/AgentConfigForm.tsx:1492` | [CONFIRMED] — Field label prop hardcoded |
| /agents/:id | `"Default"` / `"Select model (required)"` / `"Select model"` | `components/AgentConfigForm.tsx:1506` | [CONFIRMED] — model dropdown fallback labels hardcoded |
| /agents/:id | `"Detecting..."` / `"Re-detect from config"` / `"Detect from config"` | `components/AgentConfigForm.tsx:1546` | [CONFIRMED] — detect model button labels hardcoded |
| /agents/:id | `"Refreshing..."` / `"Refresh models"` | `components/AgentConfigForm.tsx:1564` | [CONFIRMED] — refresh models button labels hardcoded |
| /agents/:id | `label="Thinking effort"` | `components/AgentConfigForm.tsx:1784` | [CONFIRMED] — Field label prop hardcoded |

---

## Inbox Filters (/inbox/*)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| /inbox/* | `access_roles.board`, `access_roles.me` | `pages/Inbox.tsx:878` | [REVERTED — keys now exist in en/common.json at lines 528-529; added by ZAI-61] |
| /inbox/* | `"Run exited with an error."` | `pages/Inbox.tsx:174` | [CONFIRMED] — fallback error message in run display, hardcoded English |

---

## Company Access Settings (/company/settings/access)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| /company/settings/access | `"Member removed"` | `pages/CompanyAccess.tsx:226` | [CONFIRMED] — toast `title:` on successful member removal |
| /company/settings/access | `"Failed to remove member"` | `pages/CompanyAccess.tsx:236` | [CONFIRMED] — toast `title:` on member removal error |
| /company/settings/access | `"Humans"` / `"Agents"` | `pages/CompanyAccess.tsx:586,595` | [CONFIRMED] — `<optgroup label="...">` hardcoded group labels |
| /company/settings/access | `"Removing..."` / `"Remove member"` | `pages/CompanyAccess.tsx:636` | [CONFIRMED] — button text ternary hardcoded |

---

## Company Settings (/company/settings)

| URL | Exact text | File | Notes |
|-----|-----------|------|-------|
| /company/settings | `"Attachment size limit"` | `pages/CompanySettings.tsx:378` | [CONFIRMED] — `label="Attachment size limit"` Field prop hardcoded |

---

### Step C — Key-parity summary

| File:line | t() call | Status |
|-----------|----------|--------|
| `Inbox.tsx:878` | `t("access_roles.board")` | [KEY EXISTS] — key at `en/common.json:528` |
| `Inbox.tsx:878` | `t("access_roles.me")` | [KEY EXISTS] — key at `en/common.json:529` |
| `AgentConfigForm.tsx:1275` | hardcoded `"Passed"/"Warnings"/"Failed"` | [UNWIRED KEY] — keys in `en/agents.json` for adapter test but `t()` not called |

---

### Findings summary

- **Confirmed hardcoded strings:** ~70+ individual English strings across 10 files
- **Reverted findings (no longer hardcoded):** 2 items — `access_roles.board`/`.me` keys now exist; Dashboard activity verbs now use `i18n.t()`  
- **Missing-key bugs:** 0 (the `access_roles.board`/`.me` keys DO exist in en/common.json — pre-collected evidence was wrong)
- **Unwired key (not missing-key):** 1 — `AgentConfigForm.tsx:1275` Passed/Warnings/Failed

**Highest-priority clusters for Phase 2:**
1. `StatusBadge.tsx` — affects every status display across all pages
2. `AgentConfigForm.tsx` — ~30 labels in agent configuration form
3. `IssueRunLedger.tsx` — ~15 run outcome/liveness labels
4. `IssueThreadInteractionCard.tsx` — ~12 interaction type/status labels
5. `SidebarAgents.tsx` — 8 pause/resume/toast labels
**Purpose:** Technical documentation of hardcoded English text with CSS selectors for translation

---

## POST-REVERT AUDIT SUMMARY (ZAI-63, 2026-05-06)

**Revert state:** CONFIRMED CLEAN — all 85 non-locale files in diff show only i18n wiring changes (useTranslation + t() calls). No DOM/structural/className changes from ZAI-43.

### PRE-REVERT CLUSTER STATUS

| Section | Area | Status |
|---------|------|--------|
| § 1 Global (skip link, logo, add company) | Layout.tsx | TRANSLATED ✓ (useTranslation in diff) |
| § 2 Navigation sidebar (17 items) | Sidebar.tsx | TRANSLATED ✓ (CLEAN) |
| § 3 Account menu | SidebarAccountMenu.tsx | TRANSLATED ✓ (CLEAN) |
| § 4 Command palette | CommandPalette.tsx | TRANSLATED ✓ (useTranslation in diff) |
| § 5.1 Org chart controls | OrgChart.tsx | TRANSLATED ✓ (useTranslation in diff) |
| § 5.2 Skills page | CompanySkills.tsx | TRANSLATED ✓ (CLEAN) |
| § 5.3 Costs page | Costs.tsx | TRANSLATED ✓ (useTranslation in diff) |

### CONFIRMED REMAINING GAPS (post-revert)

| File | Route | Gap Count | Severity | Notes |
|------|-------|-----------|----------|-------|
| `CompanyEnvironments.tsx` | `/company/settings/environments` | 30+ | **CRITICAL** | NO useTranslation import; board-flagged page |
| `CompanyAccess.tsx` | `/company/settings/access` | 14+ | MEDIUM | Remove-member dialog & toasts |
| `CompanySettings.tsx` | `/company/settings` | 3 | MINOR | Attachment size limit field |
| `OnboardingWizard.tsx` | `/onboarding` | 3 | MINOR | DEFAULT_TASK_TITLE/DESCRIPTION constants |

---

---

## 1. GLOBAL ELEMENTS (Appear on ALL pages)

### 1.1 Skip to Main Content Link
**CSS Selector:** `a[href="#main-content"]`
**HTML Element:** `<a href="#main-content">Skip to Main Content</a>`
**Location:** Top of page, first element
**Translation:** "Перейти к основному содержимому"
**Priority:** LOW (accessibility feature)

### 1.2 Logo Button (Test Character)
**CSS Selector:** `button > a[href="/CMP/dashboard"]`
**HTML Element:** `<button><a href="/CMP/dashboard">Ы</a></button>`
**Location:** Top bar, left side
**Text Content:** "Ы"
**Issue:** Appears to be a test/placeholder character
**Action:** Should be removed or replaced with proper logo/icon
**Priority:** LOW

### 1.3 Add Company Button
**CSS Selector:** `button` (contains "Add company" text)
**HTML Element:** `<button>Add company</button>`
**Location:** Top bar, right side
**Translation:** "Добавить компанию"
**Priority:** MEDIUM

### 1.4 Open Menu Button (With Test Text)
**CSS Selector:** `button > a` (contains "ыва" text)
**HTML Element:** `<button><a href="/CMP/dashboard">ыва</a></button>`
**Location:** Sidebar menu toggle
**Text Content:** "ыва"
**Issue:** Test/placeholder text
**Action:** Should be removed or replaced with proper icon/text
**Priority:** LOW

---

## 2. NAVIGATION MENU (Sidebar - ALL pages)

**Container:** `nav[role="navigation"]` inside `aside[aria-label="complementary"]`

### 2.1 New Issue Button
**CSS Selector:** `button:contains("New Issue")`
**HTML Element:** `<button>New Issue</button>`
**Location:** Top of navigation menu
**Translation:** "Новая задача"
**Priority:** HIGH

### 2.2 Dashboard Link
**CSS Selector:** `a[href="/CMP/dashboard"]`
**HTML Element:** `<a href="/CMP/dashboard">Dashboard</a>`
**Location:** Navigation menu under Work section
**Translation:** "Панель"
**Priority:** HIGH

### 2.3 Inbox Link
**CSS Selector:** `a[href="/CMP/inbox"]`
**HTML Element:** `<a href="/CMP/inbox">Inbox</a>`
**Location:** Navigation menu under Work section
**Translation:** "Входящие"
**Priority:** HIGH

### 2.4 Work Section Header
**CSS Selector:** `nav button + *:contains("Work")` or sibling text node
**HTML Element:** Text node in navigation
**Location:** Section header in navigation menu
**Translation:** "Работа"
**Priority:** HIGH

### 2.5 Issues Link
**CSS Selector:** `a[href="/CMP/issues"]`
**HTML Element:** `<a href="/CMP/issues">Issues</a>`
**Location:** Navigation menu under Work section
**Translation:** "Задачи"
**Priority:** HIGH

### 2.6 Routines Link
**CSS Selector:** `a[href="/CMP/routines"]`
**HTML Element:** `<a href="/CMP/routines">Routines</a>`
**Location:** Navigation menu under Work section
**Translation:** "Процедуры"
**Priority:** HIGH

### 2.7 Goals Link
**CSS Selector:** `a[href="/CMP/goals"]`
**HTML Element:** `<a href="/CMP/goals">Goals</a>`
**Location:** Navigation menu under Work section
**Translation:** "Цели"
**Priority:** HIGH

### 2.8 Projects Button
**CSS Selector:** `button:contains("Projects")`
**HTML Element:** `<button>Projects</button>` (expanded state)
**Location:** Navigation menu section
**Translation:** "Проекты"
**Priority:** HIGH

### 2.9 New Project Button
**CSS Selector:** `button:contains("New project")`
**HTML Element:** `<button>New project</button>`
**Location:** Under Projects section
**Translation:** "Новый проект"
**Priority:** HIGH

### 2.10 Onboarding Button
**CSS Selector:** `button:contains("Onboarding")`
**HTML Element:** `<button>Onboarding</button>`
**Location:** Under Projects section
**Translation:** "Обучение"
**Priority:** MEDIUM (project-specific name)

### 2.11 Agents Button
**CSS Selector:** `button:contains("Agents")`
**HTML Element:** `<button>Agents</button>` (expanded state)
**Location:** Navigation menu section
**Translation:** "Агенты"
**Priority:** HIGH

### 2.12 New Agent Button
**CSS Selector:** `button:contains("New agent")`
**HTML Element:** `<button>New agent</button>`
**Location:** Under Agents section
**Translation:** "Новый агент"
**Priority:** HIGH

### 2.13 Company Section Header
**CSS Selector:** `nav button + *:contains("Company")` or sibling text node
**HTML Element:** Text node in navigation
**Location:** Section header in navigation menu
**Translation:** "Компания"
**Priority:** HIGH

### 2.14 Org Link
**CSS Selector:** `a[href="/CMP/org"]`
**HTML Element:** `<a href="/CMP/org">Org</a>`
**Location:** Navigation menu under Company section
**Translation:** "Оргструктура"
**Priority:** HIGH

### 2.15 Skills Link
**CSS Selector:** `a[href="/CMP/skills"]`
**HTML Element:** `<a href="/CMP/skills">Skills</a>`
**Location:** Navigation menu under Company section
**Translation:** "Навыки"
**Priority:** HIGH

### 2.16 Costs Link
**CSS Selector:** `a[href="/CMP/costs"]`
**HTML Element:** `<a href="/CMP/costs">Costs</a>`
**Location:** Navigation menu under Company section
**Translation:** "Расходы"
**Priority:** HIGH

### 2.17 Activity Link
**CSS Selector:** `a[href="/CMP/activity"]`
**HTML Element:** `<a href="/CMP/activity">Activity</a>`
**Location:** Navigation menu under Company section
**Translation:** "Активность"
**Priority:** HIGH

### 2.18 Settings Link
**CSS Selector:** `a[href="/CMP/company/settings"]`
**HTML Element:** `<a href="/CMP/company/settings">Settings</a>`
**Location:** Navigation menu under Company section
**Translation:** "Настройки"
**Priority:** HIGH

---

## 3. ACCOUNT MENU (Top Right - ALL pages)

### 3.1 Open Account Menu Button
**CSS Selector:** `button[aria-label*="account"]` or `button:contains("Open account menu")`
**HTML Element:** `<button>BO Board</button>` (username displayed)
**Aria Label:** "Open account menu"
**Location:** Top right corner
**Translation:** "Открыть меню аккаунта" (for aria-label)
**Priority:** HIGH

---

## 4. COMMAND PALETTE (Global - Bottom of ALL pages)

### 4.1 Command Palette Heading
**CSS Selector:** `h2:contains("Command Palette")`
**HTML Element:** `<h2>Command Palette</h2>`
**Location:** Bottom of page, in dialog/palette
**Translation:** "Палитра команд"
**Priority:** HIGH

### 4.2 Search Placeholder
**CSS Selector:** `input[placeholder*="command"]` or `p:contains("Search for a command to run")`
**HTML Element:** `<input placeholder="Search for a command to run...">` or `<p>Search for a command to run...</p>`
**Location:** Command palette input field
**Translation:** "Поиск команды для выполнения..."
**Priority:** HIGH

---

## 5. PAGE-SPECIFIC ELEMENTS

### 5.1 ORGANIZATION CHART PAGE (/CMP/org)

#### 5.1.1 Page Heading
**CSS Selector:** `h1:contains("Org Chart")`
**HTML Element:** `<h1>Org Chart</h1>`
**Location:** Main heading on Org page
**Translation:** "Оргструктура"
**Priority:** MEDIUM

#### 5.1.2 Import Company Button
**CSS Selector:** `a[href="/CMP/company/import"] > button`
**HTML Element:** `<button>Import company</button>`
**Location:** Top of Org chart page
**Translation:** "Импортировать компанию"
**Priority:** MEDIUM

#### 5.1.3 Export Company Button
**CSS Selector:** `a[href="/CMP/company/export"] > button`
**HTML Element:** `<button>Export company</button>`
**Location:** Top of Org chart page
**Translation:** "Экспортировать компанию"
**Priority:** MEDIUM

#### 5.1.4 Zoom In Button
**CSS Selector:** `button:contains("Zoom in")`
**HTML Element:** `<button>Zoom in</button>`
**Location:** Org chart controls
**Translation:** "Увеличить"
**Priority:** MEDIUM

#### 5.1.5 Zoom Out Button
**CSS Selector:** `button:contains("Zoom out")`
**HTML Element:** `<button>Zoom out</button>`
**Location:** Org chart controls
**Translation:** "Уменьшить"
**Priority:** MEDIUM

#### 5.1.6 Fit Chart Button
**CSS Selector:** `button:contains("Fit chart to screen")`
**HTML Element:** `<button>Fit chart to screen</button>`
**Location:** Org chart controls
**Translation:** "Подогнать диаграмму к экрану"
**Priority:** MEDIUM

### 5.2 SKILLS PAGE (/CMP/skills)

#### 5.2.1 Page Heading
**CSS Selector:** `h1:contains("Skills")` (already translated)
**Status:** ALREADY TRANSLATED - "Навыки"

#### 5.2.2 Scan Button
**CSS Selector:** `button:contains("Scan project workspaces for skills")`
**HTML Element:** `<button>Scan project workspaces for skills</button>`
**Location:** Skills page header
**Translation:** "Сканировать рабочие пространства проектов на наличие навыков"
**Priority:** MEDIUM

#### 5.2.3 Filter Skills Placeholder
**CSS Selector:** `input[placeholder*="Filter skills"]`
**HTML Element:** `<input placeholder="Filter skills">`
**Location:** Skills page search field
**Translation:** "Фильтр навыков"
**Priority:** MEDIUM

#### 5.2.4 Add Button
**CSS Selector:** `button:contains("Add")` (next to input field)
**HTML Element:** `<button>Add</button>`
**Location:** Skills page, next to input field
**Translation:** "Добавить"
**Priority:** MEDIUM

#### 5.2.5 Placeholder Text Input
**CSS Selector:** `input[placeholder*="Paste path"]`
**HTML Element:** `<input placeholder="Paste path, GitHub URL, or skills.sh command">`
**Location:** Skills page input field
**Translation:** "Вставьте путь, URL GitHub или команду skills.sh"
**Priority:** MEDIUM

#### 5.2.6 Collapse Button
**CSS Selector:** `button:contains("Collapse")`
**HTML Element:** `<button>Collapse [skill-name]</button>`
**Location:** Skills page, next to skill items
**Translation:** "Свернуть"
**Priority:** LOW (UI control)

#### 5.2.7 Expand Button
**CSS Selector:** `button:contains("Expand")`
**HTML Element:** `<button>Expand [skill-name]</button>`
**Location:** Skills page, next to skill items
**Translation:** "Развернуть"
**Priority:** LOW (UI control)

#### 5.2.8 References Button
**CSS Selector:** `button:contains("references")`
**HTML Element:** `<button>references</button>`
**Location:** Skills page, next to skill items
**Translation:** "ссылки"
**Priority:** LOW (technical term)

### 5.3 COSTS PAGE (/CMP/costs)

#### 5.3.1 Financial Events Heading
**CSS Selector:** Text containing "Recent financial events"
**HTML Element:** Text node or heading
**Location:** Costs page, financial events section
**Text Content:** "Recent financial events Top-ups, fees, credits, commitments, and other non-request charges."
**Translation:** "Последние финансовые события. Пополнения, сборы, кредиты, обязательства и другие платежи, не связанные с запросами."
**Priority:** MEDIUM

---

## 6. COMPONENT PATTERNS

### 6.1 Navigation Link Pattern
**Pattern:** `nav[role="navigation"] a[href="/CMP/{page}"]`
**Affected Pages:** All navigation links
**Solution:** Update locale keys for navigation items

### 6.2 Button Pattern
**Pattern:** `button` with hardcoded English text
**Affected Pages:** Throughout application
**Solution:** Replace with translation function calls (e.g., `t('button.label')`)

### 6.3 Text Node Pattern
**Pattern:** Direct text nodes in components (not wrapped in translation function)
**Affected Pages:** Section headers, labels, descriptions
**Solution:** Wrap text nodes in translation functions

---

## 7. TECHNICAL NOTES

### 7.1 Ref ID Mapping
The browser tool assigns temporary ref IDs (e1, e2, e3, etc.) to interactive elements. These are NOT stable CSS selectors.

### 7.2 Recommended CSS Selectors
For stable element targeting, use:
- **Attribute-based selectors:** `[href="/path"]`, `[placeholder="text"]`
- **Text-based pseudo-selectors:** `:contains("text")` (JavaScript-based)
- **Role-based selectors:** `[role="navigation"]`, `[role="button"]`
- **Aria-label selectors:** `[aria-label="text"]`

### 7.3 File Locations for Translation Updates
Based on PROJECT_DESIGN.md, update these locale files:
- `ui/src/locales/ru/common.json` - Navigation, common elements
- `ui/src/locales/ru/settings.json` - Settings pages
- `ui/src/locales/ru/dashboard.json` - Dashboard elements
- `ui/src/locales/ru/org.json` - Organization chart
- `ui/src/locales/ru/skills.json` - Skills page

### 7.4 Component Files to Update
Likely component files needing updates:
- `ui/src/components/Sidebar.tsx` - Navigation menu
- `ui/src/components/Layout.tsx` - Top bar, Command palette
- `ui/src/pages/CompanySettings.tsx` - Settings page
- `ui/src/pages/OrgChart.tsx` - Org chart page
- `ui/src/pages/Skills.tsx` - Skills page
- `ui/src/components/CommandPalette.tsx` - Command palette

---

## 8. PRIORITY MATRIX

### HIGH PRIORITY (Affects ALL pages, core navigation)
1. Navigation menu items (17 items)
2. Command palette heading and placeholder
3. Account menu button
4. Add company button

### MEDIUM PRIORITY (Page-specific functionality)
1. Organization chart controls (5 items)
2. Skills page controls (7 items)
3. Costs page section heading

### LOW PRIORITY (Accessibility, placeholders, technical terms)
1. Skip to main content link
2. Test/placeholder characters ("Ы", "ыва")
3. Collapse/expand buttons (UI controls)
4. References button (technical term)

---

## 9. NEXT STEPS

1. **Update Navigation Component** (`Sidebar.tsx`)
   - Replace hardcoded text with translation function calls
   - Use locale keys from `common.json`

2. **Update Layout Components** (`Layout.tsx`, `CommandPalette.tsx`)
   - Replace hardcoded text with translation function calls
   - Add aria-labels with translations

3. **Update Page Components**
   - `CompanySettings.tsx` - Settings elements
   - `OrgChart.tsx` - Org chart controls
   - `Skills.tsx` - Skills page elements

4. **Add Missing Locale Keys**
   - Ensure all needed keys exist in `ru/*.json` files
   - Verify translations are appropriate

5. **Remove Test/Placeholder Text**
   - Remove "Ы" character from logo button
   - Remove "ыва" text from menu button
   - Replace with proper icons or text

6. **Testing**
   - Test all pages after updates
   - Verify language switching works correctly
   - Check for any remaining English text

---

**Report Generated:** 2026-04-26
**Tested By:** CEO Agent
**Server Version:** Running on http://127.0.0.1:3105/
**Total Elements Documented:** 40+ hardcoded English elements with CSS selectors

---

## POST-REVERT DETAILED GAP FINDINGS (ZAI-63, 2026-05-06)

### GAP-1: CompanyEnvironments.tsx — CRITICAL (No i18n wiring at all)

**File:** `ui/src/pages/CompanyEnvironments.tsx`
**Route:** `/company/settings/environments`
**Namespace needed:** `company` (or new `environments` namespace)
**useTranslation:** NOT IMPORTED

Board-flagged strings confirmed present:

| Line | Hardcoded String | JSX Context |
|------|-----------------|-------------|
| 408 | `"Company Environments"` | `<h1>` title (environments disabled state) |
| 411 | `"Enable Environments in instance experimental settings to manage company execution targets."` | Body text (environments disabled state) |
| 422 | `"Company Environments"` | `<h1>` title (environments enabled state) |
| 172 | `"Company"` | Breadcrumb label |
| 173 | `"Settings"` | Breadcrumb label |
| 174 | `"Environments"` | Breadcrumb label |

Additional hardcoded strings (form/editor not visible without environments enabled):
- `"Yes"` — support mark text
- `"Select a company to manage environments."` — no-company state
- `"Define reusable execution targets..."` — section description
- Form field labels: `"Name"`, `"Description"`, `"Driver"`, SSH/Sandbox config fields
- Select options: `"SSH"`, `"Sandbox"`, `"Local"`
- Button labels: `"Testing..."`, `"Test connection"`, `"Test provider"`, `"Edit"`, `"Editing"`
- Dialog heading: `"Edit environment"` / `"Add environment"`
- Error fallback: `"Failed to save environment"`

**Total estimated strings:** 30+
**Action required:** Add `useTranslation("company")` (or new `environments` namespace), wire all strings with `t()`.

---

### GAP-2: CompanyAccess.tsx — Member Removal Dialog (14+ strings)

**File:** `ui/src/pages/CompanyAccess.tsx`
**Route:** `/company/settings/access`
**Namespace:** `company` (access.* section)
**useTranslation:** Present — `useTranslation("company")` — but removal dialog not wired

Remaining hardcoded strings:

| Line | Hardcoded String | JSX Context |
|------|-----------------|-------------|
| 226 | `"Member removed"` | Toast title on successful removal |
| 229 | `` `${count} assigned issue${count===1?"":"s"} cleaned up.` `` | Toast body (needs i18n plural) |
| 236 | `"Failed to remove member"` | Toast error title |
| 237 | `"Unknown error"` | Toast error fallback |
| 559 | `"Remove member"` | `<DialogTitle>` |
| 561 | `` `Archive ${name} and move active assignments...` `` | `<DialogDescription>` (dynamic name) |
| 571 | `"Checking assigned issues..."` | Loading state in dialog |
| 578 | `"Issue reassignment"` | Section heading in dialog |
| 584 | `"Leave unassigned"` | `<option>` label |
| 586 | `"Humans"` | `<optgroup label>` |
| 595 | `"Agents"` | `<optgroup label>` |
| 623 | `"Cancel"` | Cancel button |
| 636 | `"Removing..."` / `"Remove member"` | Submit button (pending/idle state) |

**Missing en/company.json keys:** `access.remove_member_*` keys (none exist yet)
**Action required:** Add ~13 new keys to `company.json` + wire dialog with `t()`.

---

### GAP-3: CompanySettings.tsx — Attachment Size Limit (3 strings)

**File:** `ui/src/pages/CompanySettings.tsx`
**Route:** `/company/settings`
**Namespace:** `company` (settings.form.* section)
**useTranslation:** Present

| Line | Hardcoded String | JSX Context |
|------|-----------------|-------------|
| 378 | `"Attachment size limit"` | `<Field label>` |
| 379 | `` `Accepted range: 1-${MAX} MiB.` `` | `<Field hint>` (needs interpolation) |
| 396 | `"Enter a whole number from 1 to {MAX}."` | Validation error message |

**Missing en/company.json keys:** `settings.form.attachment_limit`, `settings.form.attachment_limit_hint`, `settings.form.attachment_limit_error`
**Action required:** Add 3 keys + wire with `t()`.

---

### GAP-4: OnboardingWizard.tsx — Default Task Constants (3 strings)

**File:** `ui/src/components/OnboardingWizard.tsx`
**Route:** `/onboarding`
**Namespace:** `onboarding`
**useTranslation:** Present

| Location | Hardcoded String | Context |
|----------|-----------------|---------|
| Line ~69 | `"Hire your first engineer and create a hiring plan"` | `DEFAULT_TASK_TITLE` constant |
| Lines ~71-75 | `"You are the CEO..."` (multi-line) | `DEFAULT_TASK_DESCRIPTION` constant |
| Line ~1056 | `"If login is required, run ..." ` | Conditional message |

**Action required:** Move constants to locale keys under `onboarding` namespace.

---

### KEY PARITY AUDIT

| Namespace file | t() calls checked | Status |
|----------------|-------------------|--------|
| `en/settings.json` (experimental.*) | All 32 keys matched | PARITY ✓ |
| `en/company.json` (invites.*, access.*, settings.*) | Full key list, 606 keys | GAPS: attachment_limit, remove_member_* keys MISSING |
| `en/common.json` (sidebar.*, nav.*) | Sampled via Sidebar.tsx | PARITY ✓ |
| `en/onboarding.json` | Not checked (gap is in constants) | SKIP |

---

**Post-Revert Audit Date:** 2026-05-06
**Audited By:** Browser Tester Agent (ZAI-63)
**Method:** git diff analysis + component file grep + key parity check
**Total new gaps documented:** 4 files, ~50+ hardcoded strings

---

## GAP-5: Routines.tsx + IssueFiltersPopover — Sort UI (7 strings)

**File:** `ui/src/pages/Routines.tsx`
**Route:** `/routines`

| Line | Hardcoded String | JSX Context |
|------|-----------------|-------------|
| 664 | `title="Sort"` | Button title attribute |
| 666 | `Sort` | Button text content |
| 672 | `"Updated"` | Sort option label |
| 673 | `"Created"` | Sort option label |
| 674 | `"Last run"` | Sort option label |
| 675 | `"Title"` | Sort option label |
| 695 | `"Asc"` / `"Desc"` | Sort direction indicators (ternary) |

**Status:** [CONFIRMED] — pre-collected "Sort button" finding confirmed, plus all sort option labels

---

## GAP-6: ProjectProperties.tsx — Project Config Tab (~50 strings)

**File:** `ui/src/components/ProjectProperties.tsx`
**Route:** `/:companyPrefix/projects/:projectId/configuration`
**Namespace needed:** `company` (project.config.* section)

| Line | Hardcoded String | JSX Context |
|------|-----------------|-------------|
| 64 | `"Saving"` | SaveIndicator text |
| 72 | `"Saved"` | SaveIndicator text |
| 80 | `"Failed"` | SaveIndicator error text |
| 136 | `{status.replace("_", " ")}` | Project status raw enum render |
| 170 | `"Archive"` / `"Unarchive"` | Danger zone action variable |
| 176-177 | `"Archive this project..."` / `"Unarchive this project..."` | Danger zone description text |
| 182 | `"Archiving..."` / `"Unarchiving..."` | Button pending text (ternary) |
| 197 | `"Confirm"` | Confirmation button text |
| 204 | `"Cancel"` | Cancel button text |
| 214 | `"Archive project"` / `"Unarchive project"` | Button text with icon |
| 508 | `"Name"` | FieldLabel text |
| 515 | `placeholder="Project name"` | DraftInput placeholder |
| 522 | `"Description"` | FieldLabel text |
| 533 | `placeholder="Add a description..."` | InlineEditor placeholder |
| 538 | `"No description"` | Empty state fallback text |
| 542 | `"Status"` | FieldLabel text |
| 553 | `"Lead"` | PropertyRow label |
| 558 | `"Goals"` | FieldLabel text |
| 577 | `` aria-label="Remove goal ${goal.title}" `` | aria-label (template string) |
| 596 | `"Goal"` | Button text in popover |
| 602 | `"All goals linked."` | Empty state in popover |
| 620 | `"Env"` | FieldLabel text |
| 635 | `"Applied to all runs..."` | Help text for env vars |
| 639 | `"Created"` | FieldLabel text |
| 642 | `"Updated"` | FieldLabel text |
| 646 | `"Target Date"` | FieldLabel text |
| 657 | `"Codebase"` | Section heading |
| 663 | `aria-label="Codebase help"` | aria-label attribute |
| 669 | `"Repo identifies the source of truth..."` | Tooltip content |
| 675 | `"Repo"` | Section label |
| 706 | `"Change repo"` | Button text |
| 712 | `aria-label="Clear repo"` | aria-label attribute |
| 720 | `"Not set."` | Empty state text |
| 731 | `"Set repo"` | Button text |
| 738 | `"Local folder"` | Section label |
| 745 | `"Paperclip-managed folder."` | Info text |
| 759 | `"Change local folder"` / `"Set local folder"` | Button text (ternary) |
| 766 | `aria-label="Clear local folder"` | aria-label attribute |
| 777 | `"Additional legacy workspace records exist..."` | Info message |
| 834 | `placeholder="/absolute/path/to/workspace"` | Input placeholder |
| 846 | `"Save"` | Button text |
| 858 | `"Cancel"` | Button text |
| 869 | `placeholder="https://github.com/org/repo"` | Input placeholder |
| 879 | `"Save"` | Button text |
| 891 | `"Cancel"` | Button text |
| 900 | `"Failed to save workspace."` | Error message |
| 903 | `"Failed to delete workspace."` | Error message |
| 906 | `"Failed to update workspace."` | Error message |
| 916 | `"Execution Workspaces"` | Section heading |
| 922 | `aria-label="Execution workspaces help"` | aria-label attribute |
| 928 | `"Project-owned defaults for isolated issue checkouts..."` | Tooltip content |
| 936 | `"Enable isolated issue checkouts"` | Toggle label |
| 940 | `"Let issues choose between..."` | Help text |
| 954 | `"Enabled"` / `"Disabled"` | Status text (ternary) |
| 964 | `"New issues default to isolated checkout"` | Label text |
| 968 | `"If disabled, new issues stay on..."` | Help text |
| 993-994 | `"Hide advanced checkout settings"` / `"Show advanced checkout settings"` | Button text (ternary) |
| 1001 | `"Git worktree"` | Implementation type text |
| 1007 | `"Environment"` | Label text |
| 1022 | `"No environment"` | Select option text |
| 1034 | `"Base ref"` | Label text |
| 1052 | `placeholder="origin/main"` | DraftInput placeholder |
| 1058 | `"Branch template"` | Label text |
| 1076 | `placeholder="{{issue.identifier}}-{{slug}}"` | DraftInput placeholder |
| 1082 | `"Worktree parent dir"` | Label text |
| 1100 | `placeholder=".paperclip/worktrees"` | DraftInput placeholder |
| 1106 | `"Provision command"` | Label text |
| 1124 | `placeholder="bash ./scripts/provision-worktree.sh"` | DraftInput placeholder |
| 1130 | `"Teardown command"` | Label text |
| 1148 | `placeholder="bash ./scripts/teardown-worktree.sh"` | DraftInput placeholder |
| 1151-1153 | `"Provision runs inside the derived worktree..."` | Help text |
| 1171 | `"Danger Zone"` | Section heading |

**Total estimated strings:** 60+
**Action required:** Add `useTranslation("company")` wiring for all config tab strings.

---

## GAP-7: BudgetPolicyCard.tsx — Project Budget Tab (~20 strings)

**File:** `ui/src/components/BudgetPolicyCard.tsx`
**Route:** `/:companyPrefix/projects/:projectId/budget`
**Namespace needed:** `company` (project.budget.* section)

| Line | Hardcoded String | JSX Context |
|------|-----------------|-------------|
| 22 | `"Lifetime budget"` / `"Monthly UTC budget"` | windowLabel function return (ternary) |
| 59 | `"Observed"` | Label text |
| 62 | `"No cap configured"` | Help text (ternary) |
| 66 | `"Budget"` | Label text |
| 68 | `"Disabled"` | Status text (ternary) |
| 71 | `"Soft alert at "` | Label text (template string) |
| 78 | `"Observed"` | Label text (card variant) |
| 81 | `"No cap configured"` | Help text (card variant, ternary) |
| 85 | `"Budget"` | Label text (card variant) |
| 87 | `"Disabled"` | Status text (card variant, ternary) |
| 99 | `"Remaining"` | Progress label |
| 100 | `"Unlimited"` | Progress text when no budget (ternary) |
| 123-124 | `"Execution is paused for this project..."` / `"Heartbeats are paused..."` | Paused state alert messages |
| 133 | `"Budget (USD)"` | Label text |
| 140 | `placeholder="0.00"` | Input placeholder |
| 149 | `"Saving..."` / `"Update budget"` / `"Set budget"` | Button text (multiple ternaries) |
| 176 | `"Paused"` / `"Warning"` / `"Hard stop"` / `"Healthy"` | Status badge text (ternary) |
| 185 | `"Enter a valid non-negative dollar amount."` | Error message |
| 204 | `"Paused"` / `"Warning"` / `"Hard stop"` / `"Healthy"` | Status badge text (card variant) |
| 214 | `"Enter a valid non-negative dollar amount."` | Error message (card variant) |

**Total estimated strings:** 20+
**Action required:** Add `useTranslation("company")` wiring for all budget tab strings.

---

**Post-Revert Audit Date:** 2026-05-06 (final)
**Audited By:** Browser Tester Agent ([ZAI-63](/ZAI/issues/ZAI-63))
**Method:** git diff analysis + component file grep + key parity check
**Total gaps documented:** 7 files (4 page gaps + 3 component gaps), ~130+ hardcoded strings confirmed
