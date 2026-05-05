# Paperclip Project Design Document
## URL to Code File Mapping

Generated on: 2025-04-25
Purpose: Localization reference - maps URLs/tabs to code files

---

## Table of Contents
1. [Root Routes](#root-routes)
2. [Instance-Level Routes](#instance-level-routes)
3. [Company-Level Routes (board)](#company-level-routes-board)
4. [Page Components](#page-components)
5. [Key Component Libraries](#key-component-libraries)
6. [Localization Files](#localization-files)
7. [Server-Side Code](#server-side-code)

---

## Root Routes

| URL Pattern | Page File | Description |
|-------------|-----------|-------------|
| `/` | App.tsx (CompanyRootRedirect) | Redirects to first company's dashboard or onboarding |
| `/auth` | Auth.tsx | Authentication page |
| `/board-claim/:token` | BoardClaim.tsx | Board claim page |
| `/cli-auth/:id` | CliAuth.tsx | CLI authentication |
| `/invite/:token` | InviteLanding.tsx | Invite landing page |
| `/onboarding` | OnboardingWizard.tsx (component) | New user/company onboarding flow |

---

## Instance-Level Routes

Base path: `/instance`

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/instance/settings/general` | InstanceGeneralSettings.tsx | settings.json | General instance settings |
| `/instance/settings/profile` | ProfileSettings.tsx | settings.json | User profile settings |
| `/instance/settings/access` | InstanceAccess.tsx | settings.json | Access control settings |
| `/instance/settings/heartbeats` | InstanceSettings.tsx | settings.json | Heartbeat configuration |
| `/instance/settings/experimental` | InstanceExperimentalSettings.tsx | settings.json | Experimental features |
| `/instance/settings/plugins` | PluginManager.tsx | - | Plugin management UI |
| `/instance/settings/plugins/:pluginId` | PluginSettings.tsx | - | Individual plugin settings |
| `/instance/settings/adapters` | AdapterManager.tsx | adapters.json | AI adapter configuration (Claude, Codex, etc.) |

---

## Company-Level Routes (board)

Base pattern: `/:companyPrefix/{route}`

### Dashboard & Navigation

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/dashboard` | Dashboard.tsx | dashboard.json | Main company dashboard |
| `/:companyPrefix/companies` | Companies.tsx | company.json | Companies list page |
| `/:companyPrefix/org` | OrgChart.tsx | org.json | Organization chart |

### Agent Management

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/agents/all` | Agents.tsx | agents.json | All agents list |
| `/:companyPrefix/agents/active` | Agents.tsx | agents.json | Active agents |
| `/:companyPrefix/agents/paused` | Agents.tsx | agents.json | Paused agents |
| `/:companyPrefix/agents/error` | Agents.tsx | agents.json | Agents with errors |
| `/:companyPrefix/agents/new` | NewAgent.tsx | agents.json | Create new agent |
| `/:companyPrefix/agents/:agentId` | AgentDetail.tsx | agents.json | Agent detail page (default tab) |
| `/:companyPrefix/agents/:agentId/:tab` | AgentDetail.tsx | agents.json | Agent detail with specific tab (runs, runsHistory, issues, properties) |
| `/:companyPrefix/agents/:agentId/runs/:runId` | AgentDetail.tsx | agents.json | Agent with specific run selected |

### Project Management

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/projects` | Projects.tsx | common.json | Projects list |
| `/:companyPrefix/projects/:projectId` | ProjectDetail.tsx (default overview) | company.json | Project overview |
| `/:companyPrefix/projects/:projectId/overview` | ProjectDetail.tsx | company.json | Project overview tab |
| `/:companyPrefix/projects/:projectId/issues` | ProjectDetail.tsx | issues.json | Project issues tab |
| `/:companyPrefix/projects/:projectId/issues/:filter` | ProjectDetail.tsx | issues.json | Project issues with filter |
| `/:companyPrefix/projects/:projectId/workspaces` | ProjectDetail.tsx | - | Project workspaces tab |
| `/:companyPrefix/projects/:projectId/workspaces/:workspaceId` | ProjectWorkspaceDetail.tsx | - | Specific project workspace detail |
| `/:companyPrefix/projects/:projectId/configuration` | ProjectDetail.tsx | - | Project configuration tab |
| `/:companyPrefix/projects/:projectId/budget` | ProjectDetail.tsx | - | Project budget tab |

### Issues & Tasks

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/issues` | Issues.tsx | issues.json | Issues board (default: backlog) |
| `/:companyPrefix/issues/all` | Issues.tsx (redirect) | issues.json | Redirects to /issues |
| `/:companyPrefix/issues/active` | Issues.tsx (redirect) | issues.json | Redirects to /issues |
| `/:companyPrefix/issues/backlog` | Issues.tsx (redirect) | issues.json | Redirects to /issues |
| `/:companyPrefix/issues/done` | Issues.tsx (redirect) | issues.json | Redirects to /issues |
| `/:companyPrefix/issues/recent` | Issues.tsx (redirect) | issues.json | Redirects to /issues |
| `/:companyPrefix/issues/:issueId` | IssueDetail.tsx | issues.json | Issue detail page |

### Workspaces & Execution

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/workspaces` | Workspaces.tsx | - | Workspaces list |
| `/:companyPrefix/execution-workspaces/:workspaceId` | ExecutionWorkspaceDetail.tsx | - | Execution workspace detail |
| `/:companyPrefix/execution-workspaces/:workspaceId/configuration` | ExecutionWorkspaceDetail.tsx | - | Workspace configuration |
| `/:companyPrefix/execution-workspaces/:workspaceId/runtime-logs` | ExecutionWorkspaceDetail.tsx | - | Workspace runtime logs |
| `/:companyPrefix/execution-workspaces/:workspaceId/issues` | ExecutionWorkspaceDetail.tsx | - | Workspace issues |

### Routines (Cron Jobs)

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/routines` | Routines.tsx | routines.json | Routines list |
| `/:companyPrefix/routines/:routineId` | RoutineDetail.tsx | routines.json | Routine detail |

### Goals

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/goals` | Goals.tsx | goals.json | Goals list |
| `/:companyPrefix/goals/:goalId` | GoalDetail.tsx | goals.json | Goal detail |

### Approvals

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/approvals/pending` | Approvals.tsx | approvals.json | Pending approvals |
| `/:companyPrefix/approvals/all` | Approvals.tsx | approvals.json | All approvals |
| `/:companyPrefix/approvals/:approvalId` | ApprovalDetail.tsx | approvals.json | Approval detail |

### Company Settings

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/company/settings` | CompanySettings.tsx | company.json | Company general settings |
| `/:companyPrefix/company/settings/access` | CompanyAccess.tsx | settings.json | Company access control |
| `/:companyPrefix/company/settings/invites` | CompanyInvites.tsx | - | Company invite management |
| `/:companyPrefix/company/export/*` | CompanyExport.tsx | - | Company export functionality |
| `/:companyPrefix/company/import` | CompanyImport.tsx | - | Company import functionality |
| `/:companyPrefix/skills/*` | CompanySkills.tsx | - | Skills management |

### Inbox & Notifications

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/inbox/mine` | Inbox.tsx | inbox.json | My inbox |
| `/:companyPrefix/inbox/recent` | Inbox.tsx | inbox.json | Recent messages |
| `/:companyPrefix/inbox/unread` | Inbox.tsx | inbox.json | Unread messages |
| `/:companyPrefix/inbox/all` | Inbox.tsx | inbox.json | All messages |
| `/:companyPrefix/inbox/requests` | JoinRequestQueue.tsx | - | Join request queue |

### Cost & Activity Tracking

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/costs` | Costs.tsx | costs.json | Cost tracking |
| `/:companyPrefix/activity` | Activity.tsx | activity.json | Activity log |

### User Profile

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/u/:userSlug` | UserProfile.tsx | - | User profile page |

### Design & Documentation

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/design-guide` | DesignGuide.tsx | - | Design system documentation |

### Plugin Pages

| URL Pattern | Page File | Locale File | Description |
|-------------|-----------|-------------|-------------|
| `/:companyPrefix/plugins/:pluginId` | PluginPage.tsx | - | Plugin-specific page |
| `/:companyPrefix/:pluginRoutePath` | PluginPage.tsx | - | Plugin routes (catch-all) |

---

## Page Components

### Key Page Files and Their Functions

**ui/src/pages/Dashboard.tsx** - Main dashboard showing company overview
- Uses: dashboard.json locale

**ui/src/pages/Agents.tsx** - Agent list with filters (all/active/paused/error)
- Uses: agents.json locale

**ui/src/pages/AgentDetail.tsx** - Single agent view with tabs:
  - runs: Current execution
  - runsHistory: Past runs
  - issues: Issues assigned to this agent
  - properties: Agent configuration
- Uses: agents.json locale

**ui/src/pages/Issues.tsx** - Issues board with Kanban-style columns
- Statuses: backlog, todo, in_progress, blocked, done, cancelled
- Uses: issues.json locale

**ui/src/pages/IssueDetail.tsx** - Single issue view with:
  - Chat thread with AI
  - Documents section
  - Issue properties
  - Run ledger
- Uses: issues.json locale

**ui/src/pages/Projects.tsx** - Projects list
- Uses: common.json locale

**ui/src/pages/ProjectDetail.tsx** - Project view with tabs:
  - overview: Project summary
  - issues: Project issues
  - workspaces: Project workspaces
  - configuration: Project settings
  - budget: Budget tracking
- Uses: company.json locale

**ui/src/pages/Routines.tsx** - Cron job/scheduled tasks list
- Uses: routines.json locale

**ui/src/pages/Costs.tsx** - Cost tracking and billing
- Uses: costs.json locale

**ui/src/pages/Activity.tsx** - Activity feed/log
- Uses: activity.json locale

**ui/src/pages/Inbox.tsx** - Message inbox
- Uses: inbox.json locale

**ui/src/pages/AdapterManager.tsx** - AI adapter management (Claude, Codex, Hermes, etc.)
- Uses: adapters.json locale

**ui/src/pages/CompanySettings.tsx** - Company-level settings
- Uses: company.json locale

---

## Key Component Libraries

### Core UI Components (ui/src/components/)

| Component | File | Locale Dependencies | Purpose |
|-----------|------|---------------------|---------|
| Layout | Layout.tsx | - | Main app layout with sidebar |
| Sidebar | Sidebar.tsx | common.json | Navigation sidebar |
| IssueRow | IssueRow.tsx | issues.json | Single issue row display |
| IssueProperties | IssueProperties.tsx | issues.json | Issue property editor |
| IssueChatThread | IssueChatThread.tsx | issues.json | AI chat interface |
| IssueDocumentsSection | IssueDocumentsSection.tsx | - | Document attachments |
| AgentConfigForm | AgentConfigForm.tsx | agents.json | Agent configuration form |
| CommentThread | CommentThread.tsx | issues.json | Comment/reply system |
| NewIssueDialog | NewIssueDialog.tsx | issues.json | Create issue dialog |
| MarkdownEditor | MarkdownEditor.tsx | common.json | Markdown editor |
| KanbanBoard | KanbanBoard.tsx | - | Kanban-style board view |
| IssuesList | IssuesList.tsx | issues.json | Issues list view |
| IssueFiltersPopover | IssueFiltersPopover.tsx | issues.json | Issue filtering UI |
| InlineEditor | InlineEditor.tsx | - | Inline text editor |
| JsonSchemaForm | JsonSchemaForm.tsx | - | Dynamic form from JSON schema |

### Transcript Components (ui/src/components/transcript/)

Display and interaction with agent execution transcripts

### UI Components (ui/src/components/ui/)

Radix UI-based components (buttons, dialogs, etc.) - typically minimal localization needs

---

## Localization Files

**Location:** `ui/src/locales/{locale}/`

### Current Locales
- `en/` - English (primary/reference)
- `de/` - German
- `el/` - Greek
- `es/` - Spanish
- `pt/` - Portuguese
- `ru/` - Russian
- `uk/` - Ukrainian
- `zh/` - Chinese

### Locale File Structure

| File | Primary Usage |
|------|---------------|
| `common.json` | Shared UI text, buttons, labels |
| `agents.json` | Agent-related text (list, detail, config) |
| `issues.json` | Issue-related text (board, detail, filters) |
| `company.json` | Company/project settings, properties |
| `dashboard.json` | Dashboard widgets and metrics |
| `costs.json` | Cost tracking, billing |
| `activity.json` | Activity log entries |
| `inbox.json` | Inbox, messages |
| `routines.json` | Scheduled tasks/cron jobs |
| `goals.json` | Goal management |
| `approvals.json` | Approval workflow |
| `settings.json` | Instance and profile settings |
| `adapters.json` | AI adapter configuration |
| `org.json` | Organization chart |
| `onboarding.json` | Onboarding wizard text |

---

## Server-Side Code

**Location:** `server/`

### Key Directories

| Directory | Purpose | Localization Relevance |
|-----------|---------|------------------------|
| `src/routes/` | API endpoints | Error messages, validation |
| `src/services/` | Business logic | - |
| `packages/db/` | Database schema | - |
| `packages/shared/` | Shared types/constants | API path constants |

### Server Routes (for localization of API responses)

Server responses should be localized based on Accept-Language header or user preference.
Key areas needing localization:
- Validation error messages
- Success/failure response messages
- Default values for new entities

---

## Test Server

**URL:** http://127.0.0.1:3105/

This is a Vite dev server running the Paperclip UI. All routes defined above are accessible here for testing localization.

---

## Architecture Notes

### Client-Side Routing
- Uses react-router-dom (custom wrapper in `ui/src/lib/router.ts`)
- Routes defined in `App.tsx`
- Company prefix-based scoping (`/:companyPrefix/*`)

### Internationalization (i18n)
- Likely using i18next or similar library
- Translations in `ui/src/locales/`
- Language context in `ui/src/context/`
- Config in `ui/src/locales/i18n.ts`

### State Management
- React Context for:
  - Company selection (`CompanyContext`)
  - Dialog management (`DialogContext`)
  - Other shared state

### Component Hierarchy
```
App.tsx
├── CloudAccessGate
├── Layout
│   ├── Sidebar
│   └── Page Content
│       ├── Dashboard, Agents, Issues, etc.
│       └── Shared Components (IssueRow, AgentConfigForm, etc.)
└── OnboardingWizard
```

---

## Localization Strategy

### Files to Update When Adding New Features:
1. **English locale** (`ui/src/locales/en/{domain}.json`) - Add new translation keys
2. **Page component** - Update to use translation hooks
3. **This design doc** - Update with new URLs/sections

### Translation Key Pattern:
- Follow existing patterns in locale files
- Group by feature/domain (agents, issues, company, etc.)
- Use descriptive keys: `agent.status.active`, `issue.priority.high`, etc.

---

## Testing Localization

To test localization changes:

1. Start dev server: `cd ui && pnpm dev` (runs on http://127.0.0.1:3105/)
2. Navigate through all key pages
3. Check for hardcoded English text in:
   - Page components (`ui/src/pages/*.tsx`)
   - Shared components (`ui/src/components/*.tsx`)
   - Error messages, placeholders, tooltips
4. Verify language switching works correctly
5. Check for missing translation keys in console

---

## Quick Reference: Page to Locale Mapping

```
Dashboard → dashboard.json
Agents, AgentDetail → agents.json
Issues, IssueDetail → issues.json
Projects, ProjectDetail → company.json
Routines → routines.json
Costs → costs.json
Activity → activity.json
Inbox → inbox.json
Goals → goals.json
Approvals → approvals.json
Settings (all) → settings.json
AdapterManager → adapters.json
OrgChart → org.json
Companies → company.json
CompanySettings → company.json
DesignGuide → (minimal, mostly content)
UserProfile → (minimal)
Plugin pages → plugin-specific
```

---

## End of Document

This document serves as the single reference for understanding which URLs map to which code files and locale files. Update it as the project evolves.
