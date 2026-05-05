# Untranslated English Text Map - Paperclip Localization

**Test Server URL:** http://127.0.0.1:3105/
**Date:** 2025-04-25
**Language:** Russian (Русский)
**Status:** Partially translated - navigation and common elements still need work

---

## Summary

The Paperclip application has comprehensive Russian translations for most page content, but several critical areas still contain untranslated English text. The main areas requiring translation are:

1. **Navigation Menu** - Core navigation elements
2. **Command Palette** - Global search interface
3. **Account Menu** - User account controls
4. **Top Bar** - Header elements
5. **Specific Page Elements** - Isolated untranslated text blocks

---

## 1. Navigation Menu (Global - appears on ALL pages)

**Location:** Top left sidebar navigation
**Impact:** HIGH - Visible on every page

| English Text | Context | Translation Needed |
|--------------|---------|-------------------|
| "New Issue" | Button | "Новая задача" |
| "Dashboard" | Link | "Панель" |
| "Inbox" | Link | "Входящие" |
| "Work" | Section header | "Работа" |
| "Issues" | Link | "Задачи" |
| "Routines" | Link | "Процедуры" |
| "Goals" | Link | "Цели" |
| "Projects" | Button | "Проекты" |
| "New project" | Button | "Новый проект" |
| "Onboarding" | Project name | "Обучение" |
| "Agents" | Section header | "Агенты" |
| "New agent" | Button | "Новый агент" |
| "Company" | Section header | "Компания" |
| "Org" | Link | "Оргструктура" |
| "Skills" | Link | "Навыки" |
| "Costs" | Link | "Расходы" |
| "Activity" | Link | "Активность" |
| "Settings" | Link | "Настройки" |

**Note:** Some of these translations may already exist in the locale files but aren't being applied to the navigation menu.

---

## 2. Command Palette (Global - appears on ALL pages)

**Location:** Bottom of page, accessible via keyboard shortcut
**Impact:** HIGH - Global search feature

| English Text | Context | Translation Needed |
|--------------|---------|-------------------|
| "Command Palette" | Heading | "Палитра команд" |
| "Search for a command to run..." | Placeholder text | "Поиск команды для выполнения..." |

---

## 3. Account Menu (Global - appears on ALL pages)

**Location:** Top right corner
**Impact:** MEDIUM - User profile and account settings

| English Text | Context | Translation Needed |
|--------------|---------|-------------------|
| "Open account menu" | Button label | "Открыть меню аккаунта" |
| "BO Board" | Username/display name | "СО Совет" (partially translated) |

---

## 4. Top Bar Elements (Global - appears on ALL pages)

**Location:** Top of page, left side
**Impact:** LOW - Accessibility and utility functions

| English Text | Context | Translation Needed |
|--------------|---------|-------------------|
| "Skip to Main Content" | Accessibility link | "Перейти к основному содержимому" |
| "Add company" | Button | "Добавить компанию" |

---

## 5. Page-Specific Untranslated Text

### 5.1 Costs Page (/CMP/costs)

**Location:** Middle of costs page, in the financial events section

| English Text | Context | Translation Needed |
|--------------|---------|-------------------|
| "Recent financial events Top-ups, fees, credits, commitments, and other non-request charges." | Section heading | "Последние финансовые события Пополнения, сборы, кредиты, обязательства и другие charges, не связанные с запросами." |

### 5.2 Organization Chart Page (/CMP/org)

**Location:** Header and control buttons

| English Text | Context | Translation Needed |
|--------------|---------|-------------------|
| "Org Chart" | Page heading | "Оргструктура" |
| "Import company" | Button/link | "Импортировать компанию" |
| "Export company" | Button/link | "Экспортировать компанию" |
| "Zoom in" | Button | "Увеличить" |
| "Zoom out" | Button | "Уменьшить" |
| "Fit chart to screen" | Button | "Подогнать диаграмму к экрану" |

### 5.3 Skills Page (/CMP/skills)

**Location:** Page heading and skill documentation content

| English Text | Context | Translation Needed |
|--------------|---------|-------------------|
| "Paperclip Skill" | Documentation heading | "Навык Paperclip" |
| "Authentication" | Documentation heading | "Аутентификация" |
| "The Heartbeat Procedure" | Documentation heading | "Процедура сердцебиения" |
| Entire skill documentation content | Multiple paragraphs/sections | Needs comprehensive translation |

**Note:** The entire documentation content for skills appears to be in English and needs full translation. This includes:
- Authentication sections
- Heartbeat procedures
- Step-by-step instructions
- API documentation
- Code examples and comments

---

## 6. Placeholder/Test Text

**Location:** Various places, appears to be development artifacts
**Impact:** MEDIUM - User experience confusion

| Text | Context | Recommendation |
|------|---------|----------------|
| "Ы" | Button/link text | Remove or replace with proper Russian abbreviation |
| "ыва" | Menu/text | Remove or replace with proper Russian text |

**Note:** These appear to be placeholder characters that should be removed or replaced with proper translations.

---

## 7. Already Translated Sections (For Reference)

The following sections have good Russian translations and should serve as examples:

- Dashboard page content (widgets, metrics, activity feed)
- Issues page content (filters, buttons, labels)
- Company Settings page (comprehensive translations)
- Costs page (mostly translated except for one section)
- Routines page (fully translated)
- Goals page (fully translated)
- Agents page (breadcrumbs and content)
- Issues page (filters, buttons, tabs)

---

## 8. Translation Priority

### HIGH Priority (Core Navigation)
1. Navigation Menu - affects every page
2. Command Palette - global search functionality
3. Account Menu - user settings

### MEDIUM Priority (User Experience)
1. Top bar elements (accessibility)
2. Costs page remaining text
3. Placeholder text removal

### LOW Priority (Edge Cases)
1. Error messages (if any remain)
2. Tooltips (if any remain)

---

## 9. Technical Notes

### Locale Files Structure
The application uses i18n with locale files in:
- `ui/src/locales/ru/` (Russian translations)
- `ui/src/locales/en/` (English reference)

Key locale files:
- `common.json` - shared UI elements
- `settings.json` - settings pages
- `issues.json` - issues-related text
- `agents.json` - agents-related text
- `company.json` - company/project settings
- `dashboard.json` - dashboard widgets
- `costs.json` - cost tracking
- `activity.json` - activity logs
- `routines.json` - routines/cron jobs
- `goals.json` - goal management

### Likely Issue Areas
The untranslated navigation menu elements suggest:
1. Navigation component may not be using translation keys properly
2. Missing translation keys for these elements in locale files
3. Hard-coded English text in navigation component instead of using i18n

### Recommended Approach
1. Check navigation component (`ui/src/components/Sidebar.tsx` or similar)
2. Verify translation keys exist in `common.json` or `settings.json`
3. Add missing translations to appropriate locale files
4. Update component to use translation functions (`t()` or similar)
5. Test language switching functionality

---

## 10. Testing Checklist

To verify complete translation:
- [x] Navigate to Dashboard
- [x] Navigate to Issues
- [x] Navigate to Goals
- [x] Navigate to Routines
- [x] Navigate to Agents (CEO agent detail)
- [x] Navigate to Costs
- [x] Navigate to Activity (brief check via navigation)
- [x] Navigate to Settings (General, full page explored)
- [x] Check Company Settings (Access, Invites sections visible)
- [x] Test language switcher functionality
- [x] Verify Command Palette text
- [x] Check account menu
- [x] Verify all navigation menu items are documented
- [x] Check for any remaining English text in major sections
- [x] Navigate to Inbox
- [x] Navigate to Approvals
- [x] Navigate to Organization Chart (Org)
- [x] Navigate to Skills (with detailed documentation review)

**Completed Testing:** 2025-04-25
**Total Pages Tested:** 13+ major sections
**Comprehensive Coverage:** Navigation, major pages, documentation sections

---

## 11. Next Steps

1. **Immediate Action:** Translate navigation menu elements (HIGH priority)
2. **Secondary Action:** Translate Command Palette text
3. **Follow-up:** Translate account menu and top bar elements
4. **Cleanup:** Remove placeholder text ("Ы", "ыва")
5. **Review:** Check all pages for any remaining English text
6. **Testing:** Complete testing checklist above
7. **Documentation:** Update this file as translations are completed

---

**Report Generated:** 2025-04-25
**Tested By:** CEO Agent
**Server Version:** Running on http://127.0.0.1:3105/
**Language Version:** Russian (Русский) - Partially Complete
