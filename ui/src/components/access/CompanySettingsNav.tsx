import { useTranslation } from "react-i18next";
import { PageTabBar } from "@/components/PageTabBar";
import { Tabs } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "@/lib/router";

const tabs = [
  { value: "general", href: "/company/settings" },
  { value: "environments", href: "/company/settings/environments" },
  { value: "access", href: "/company/settings/access" },
  { value: "invites", href: "/company/settings/invites" },
] as const;

type CompanySettingsTab = (typeof tabs)[number]["value"];

export function getCompanySettingsTab(pathname: string): CompanySettingsTab {
  if (pathname.includes("/company/settings/environments")) {
    return "environments";
  }

  if (pathname.includes("/company/settings/access")) {
    return "access";
  }

  if (pathname.includes("/company/settings/invites")) {
    return "invites";
  }

  return "general";
}

export function CompanySettingsNav() {
  const { t } = useTranslation("company");
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = getCompanySettingsTab(location.pathname);

  const tabLabels: Record<CompanySettingsTab, string> = {
    general: t("settings.sections.general"),
    environments: t("environments.breadcrumb_page"),
    access: t("access.title_short"),
    invites: t("settings.sections.invites"),
  };

  function handleTabChange(value: string) {
    const nextTab = tabs.find((tab) => tab.value === value);
    if (!nextTab || nextTab.value === activeTab) return;
    navigate(nextTab.href);
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <PageTabBar
        items={tabs.map(({ value }) => ({ value, label: tabLabels[value] }))}
        value={activeTab}
        onValueChange={handleTabChange}
        align="start"
      />
    </Tabs>
  );
}
