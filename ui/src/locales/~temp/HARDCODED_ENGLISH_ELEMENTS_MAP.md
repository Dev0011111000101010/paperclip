# Hardcoded English Elements - CSS Selectors & HTML Elements

**Test Server URL:** http://127.0.0.1:3105/
**Date:** 2026-04-26
**Language:** Russian (Русский)
**Purpose:** Technical documentation of hardcoded English text with CSS selectors for translation

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
