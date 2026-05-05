import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { PERMISSION_KEYS, type PermissionKey } from "@paperclipai/shared";
import { ShieldCheck, Users } from "lucide-react";
import { accessApi, type CompanyMember } from "@/api/access";
import { ApiError } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { useCompany } from "@/context/CompanyContext";
import { useToast } from "@/context/ToastContext";
import { queryKeys } from "@/lib/queryKeys";
import { resolveUserName, resolveUserDisplayName, resolveUserPrimaryName } from "@/lib/user-display";
import i18n from "@/locales/i18n";

function getMembershipRoleLabels(t: (key: string) => string): Record<string, string> {
  return {
    owner: t("access.roles.owner"),
    admin: t("access.roles.admin"),
    operator: t("access.roles.operator"),
    viewer: t("access.roles.viewer"),
  };
}

function getMemberStatusLabel(status: string, t: (key: string) => string): string {
  if (status === "active") return t("access.status_active");
  if (status === "pending") return t("access.status_pending");
  if (status === "suspended") return t("access.status_suspended");
  return status.replace("_", " ");
}

function getPermissionLabels(t: (key: string) => string): Record<PermissionKey, string> {
  return {
    "agents:create": t("access.permission_labels.agents_create"),
    "users:invite": t("access.permission_labels.users_invite"),
    "users:manage_permissions": t("access.permission_labels.users_manage_permissions"),
    "tasks:assign": t("access.permission_labels.tasks_assign"),
    "tasks:assign_scope": t("access.permission_labels.tasks_assign_scope"),
    "tasks:manage_active_checkouts": t("access.permission_labels.tasks_manage_active_checkouts"),
    "joins:approve": t("access.permission_labels.joins_approve"),
  };
}

function formatGrantSummary(member: CompanyMember, t: (key: string) => string) {
  if (member.grants.length === 0) return t("access.no_grants");
  const labels = getPermissionLabels(t);
  return member.grants.map((grant) => labels[grant.permissionKey]).join(", ");
}

const implicitRoleGrantMap: Record<NonNullable<CompanyMember["membershipRole"]>, PermissionKey[]> = {
  owner: ["agents:create", "users:invite", "users:manage_permissions", "tasks:assign", "joins:approve"],
  admin: ["agents:create", "users:invite", "tasks:assign", "joins:approve"],
  operator: ["tasks:assign"],
  viewer: [],
};

function getImplicitGrantKeys(role: CompanyMember["membershipRole"]) {
  return role ? implicitRoleGrantMap[role] : [];
}

export function CompanyAccess() {
  const { selectedCompany, selectedCompanyId } = useCompany();
  const { setBreadcrumbs } = useBreadcrumbs();
  const { t } = useTranslation("company");
  const { pushToast } = useToast();
  const queryClient = useQueryClient();
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [draftRole, setDraftRole] = useState<CompanyMember["membershipRole"]>(null);
  const [draftStatus, setDraftStatus] = useState<"pending" | "active" | "suspended">("active");
  const [draftGrants, setDraftGrants] = useState<Set<PermissionKey>>(new Set());

  useEffect(() => {
    setBreadcrumbs([
      { label: selectedCompany?.name ?? t("settings.breadcrumb_company"), href: "/dashboard" },
      { label: t("settings.title"), href: "/company/settings" },
      { label: t("access.title") },
    ]);
  }, [selectedCompany?.name, setBreadcrumbs, t]);

  const membersQuery = useQuery({
    queryKey: queryKeys.access.companyMembers(selectedCompanyId ?? ""),
    queryFn: () => accessApi.listMembers(selectedCompanyId!),
    enabled: !!selectedCompanyId,
  });

  const joinRequestsQuery = useQuery({
    queryKey: queryKeys.access.joinRequests(selectedCompanyId ?? "", "pending_approval"),
    queryFn: () => accessApi.listJoinRequests(selectedCompanyId!, "pending_approval"),
    enabled: !!selectedCompanyId && !!membersQuery.data?.access.canApproveJoinRequests,
  });

  const refreshAccessData = async () => {
    if (!selectedCompanyId) return;
    await queryClient.invalidateQueries({ queryKey: queryKeys.access.companyMembers(selectedCompanyId) });
    await queryClient.invalidateQueries({ queryKey: queryKeys.access.companyUserDirectory(selectedCompanyId) });
    await queryClient.invalidateQueries({ queryKey: queryKeys.access.joinRequests(selectedCompanyId, "pending_approval") });
  };

  const updateMemberMutation = useMutation({
    mutationFn: async (input: { memberId: string; membershipRole: CompanyMember["membershipRole"]; status: "pending" | "active" | "suspended"; grants: PermissionKey[] }) => {
      return accessApi.updateMemberAccess(selectedCompanyId!, input.memberId, {
        membershipRole: input.membershipRole,
        status: input.status,
        grants: input.grants.map((permissionKey) => ({ permissionKey })),
      });
    },
    onSuccess: async () => {
      setEditingMemberId(null);
      await refreshAccessData();
      pushToast({
        title: t("access.toast_member_updated"),
        tone: "success",
      });
    },
    onError: (error) => {
      pushToast({
        title: t("access.toast_member_update_failed"),
        body: error instanceof Error ? error.message : t("common:errors.unknown"),
        tone: "error",
      });
    },
  });

  const approveJoinRequestMutation = useMutation({
    mutationFn: (requestId: string) => accessApi.approveJoinRequest(selectedCompanyId!, requestId),
    onSuccess: async () => {
      await refreshAccessData();
      pushToast({
        title: t("access.toast_join_approved"),
        tone: "success",
      });
    },
    onError: (error) => {
      pushToast({
        title: t("access.toast_join_approve_failed"),
        body: error instanceof Error ? error.message : t("common:errors.unknown"),
        tone: "error",
      });
    },
  });

  const rejectJoinRequestMutation = useMutation({
    mutationFn: (requestId: string) => accessApi.rejectJoinRequest(selectedCompanyId!, requestId),
    onSuccess: async () => {
      await refreshAccessData();
      pushToast({
        title: t("access.toast_join_rejected"),
        tone: "success",
      });
    },
    onError: (error) => {
      pushToast({
        title: t("access.toast_join_reject_failed"),
        body: error instanceof Error ? error.message : t("common:errors.unknown"),
        tone: "error",
      });
    },
  });

  const editingMember = useMemo(
    () => membersQuery.data?.members.find((member) => member.id === editingMemberId) ?? null,
    [editingMemberId, membersQuery.data?.members],
  );

  useEffect(() => {
    if (!editingMember) return;
    setDraftRole(editingMember.membershipRole);
    const status = editingMember.status === "archived" ? "suspended" : editingMember.status;
    setDraftStatus(status);
    setDraftGrants(new Set(editingMember.grants.map((grant) => grant.permissionKey)));
  }, [editingMember]);

  if (!selectedCompanyId) {
    return <div className="text-sm text-muted-foreground">{t("access.no_company")}</div>;
  }

  if (membersQuery.isLoading) {
    return <div className="text-sm text-muted-foreground">{t("common:actions.loading")}</div>;
  }

  if (membersQuery.error) {
    const message =
      membersQuery.error instanceof ApiError && membersQuery.error.status === 403
        ? t("access.error_no_permission")
        : membersQuery.error instanceof Error
          ? membersQuery.error.message
          : t("access.error_load_failed");
    return <div className="text-sm text-destructive">{message}</div>;
  }

  const members = membersQuery.data?.members ?? [];
  const access = membersQuery.data?.access;
  const pendingHumanJoinRequests =
    joinRequestsQuery.data?.filter((request) => request.requestType === "human") ?? [];
  const joinRequestActionPending =
    approveJoinRequestMutation.isPending || rejectJoinRequestMutation.isPending;
  const implicitGrantKeys = getImplicitGrantKeys(draftRole);
  const implicitGrantSet = new Set(implicitGrantKeys);

  return (
    <div className="max-w-6xl space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-lg font-semibold">{t("access.title")}</h1>
        </div>
        <p className="max-w-3xl text-sm text-muted-foreground">
          {t("access.description", { company: selectedCompany?.name })}
        </p>
      </div>

      {access && !access.currentUserRole && (
        <div className="rounded-xl border border-amber-500/40 px-4 py-3 text-sm text-amber-200">
          {t("access.instance_admin_notice")}
        </div>
      )}

      <section className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">{t("access.humans_title")}</h2>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">
            {t("access.humans_desc")}
          </p>
        </div>

        {access?.canApproveJoinRequests && pendingHumanJoinRequests.length > 0 ? (
          <div className="space-y-3 rounded-xl border border-border px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold">{t("access.pending_joins_title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("access.pending_joins_desc")}
                </p>
              </div>
              <Badge variant="outline">{t("access.pending_count", { count: pendingHumanJoinRequests.length })}</Badge>
            </div>
            <div className="space-y-3">
              {pendingHumanJoinRequests.map((request) => (
                <PendingJoinRequestCard
                  key={request.id}
                  title={
                    resolveUserName(request.requesterUser?.name) ||
                    request.requestEmailSnapshot ||
                    request.requestingUserId ||
                    t("access.unknown_requester")
                  }
                  subtitle={
                    request.requesterUser?.email ||
                    request.requestEmailSnapshot ||
                    request.requestingUserId ||
                    t("access.no_email")
                  }
                  context={
                    request.invite
                      ? (request.invite.humanRole
                          ? t("access.join_invite_with_role", { type: request.invite.allowedJoinTypes, role: request.invite.humanRole })
                          : t("access.join_invite_context", { type: request.invite.allowedJoinTypes }))
                      : t("access.invite_meta_unavailable")
                  }
                  detail={t("access.submitted", { date: new Date(request.createdAt).toLocaleString(i18n.language, { hour12: false }) })}
                  approveLabel={t("access.approve_human")}
                  rejectLabel={t("access.reject_human")}
                  disabled={joinRequestActionPending}
                  onApprove={() => approveJoinRequestMutation.mutate(request.id)}
                  onReject={() => rejectJoinRequestMutation.mutate(request.id)}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-[minmax(0,1.5fr)_120px_120px_minmax(0,1.2fr)_120px] gap-3 border-b border-border px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <div>{t("access.table.user_account")}</div>
            <div>{t("access.table.role")}</div>
            <div>{t("access.table.status")}</div>
            <div>{t("access.table.grants")}</div>
            <div className="text-right">{t("access.table.action")}</div>
          </div>
          {members.length === 0 ? (
            <div className="px-4 py-8 text-sm text-muted-foreground">{t("access.no_members")}</div>
          ) : (
            members.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-[minmax(0,1.5fr)_120px_120px_minmax(0,1.2fr)_120px] gap-3 border-b border-border px-4 py-3 last:border-b-0"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">{resolveUserPrimaryName(member.user?.name) || member.principalId}</div>
                  <div className="truncate text-xs text-muted-foreground">{member.user?.email || member.principalId}</div>
                </div>
                <div className="text-sm">
                  {member.membershipRole
                    ? getMembershipRoleLabels(t)[member.membershipRole]
                    : t("access.role_unset")}
                </div>
                <div>
                  <Badge variant={member.status === "active" ? "secondary" : member.status === "suspended" ? "destructive" : "outline"}>
                    {getMemberStatusLabel(member.status, t)}
                  </Badge>
                </div>
                <div className="min-w-0 text-sm text-muted-foreground">{formatGrantSummary(member, t)}</div>
                <div className="text-right">
                  <Button size="sm" variant="outline" onClick={() => setEditingMemberId(member.id)}>
                    {t("access.edit_btn")}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Dialog open={!!editingMember} onOpenChange={(open) => !open && setEditingMemberId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("access.edit_member")}</DialogTitle>
            <DialogDescription>
              {t("access.dialog_description", { name: resolveUserDisplayName(editingMember?.user?.name, editingMember?.user?.email) || editingMember?.principalId })}
            </DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="font-medium">{t("access.company_role_label")}</span>
                  <select
                    className="w-full rounded-md border border-border bg-background px-3 py-2"
                    value={draftRole ?? ""}
                    onChange={(event) =>
                      setDraftRole((event.target.value || null) as CompanyMember["membershipRole"])
                    }
                  >
                    <option value="">{t("access.role_unset")}</option>
                    {Object.entries(getMembershipRoleLabels(t)).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-medium">{t("access.membership_status_label")}</span>
                  <select
                    className="w-full rounded-md border border-border bg-background px-3 py-2"
                    value={draftStatus}
                    onChange={(event) =>
                      setDraftStatus(event.target.value as "pending" | "active" | "suspended")
                    }
                  >
                    <option value="active">{t("access.status_active")}</option>
                    <option value="pending">{t("access.status_pending")}</option>
                    <option value="suspended">{t("access.status_suspended")}</option>
                  </select>
                </label>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium">{t("access.grants_section")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("access.grants_desc")}
                  </p>
                </div>
                <div className="rounded-lg border border-border px-3 py-3">
                  <div className="text-sm font-medium">{t("access.implicit_grants_title")}</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {draftRole
                      ? t("access.implicit_grants_with_role", { role: getMembershipRoleLabels(t)[draftRole] })
                      : t("access.implicit_grants_no_role")}
                  </p>
                  {implicitGrantKeys.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {implicitGrantKeys.map((permissionKey) => (
                        <Badge key={permissionKey} variant="outline">
                          {getPermissionLabels(t)[permissionKey]}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {PERMISSION_KEYS.map((permissionKey) => {
                    const permissionLabels = getPermissionLabels(t);
                    return (
                      <label
                        key={permissionKey}
                        className="flex items-start gap-3 rounded-lg border border-border px-3 py-2"
                      >
                        <Checkbox
                          checked={draftGrants.has(permissionKey)}
                          onCheckedChange={(checked) => {
                            setDraftGrants((current) => {
                              const next = new Set(current);
                              if (checked) next.add(permissionKey);
                              else next.delete(permissionKey);
                              return next;
                            });
                          }}
                        />
                        <span className="space-y-1">
                          <span className="block text-sm font-medium">{permissionLabels[permissionKey]}</span>
                          <span className="block text-xs text-muted-foreground">{permissionKey}</span>
                          {implicitGrantSet.has(permissionKey) ? (
                            <span className="block text-xs text-muted-foreground">
                              {t("access.implicit_by_role", { role: draftRole ? getMembershipRoleLabels(t)[draftRole] : t("access.role_unset") })}
                            </span>
                          ) : null}
                          {draftGrants.has(permissionKey) ? (
                            <span className="block text-xs text-muted-foreground">
                              {t("access.explicit_grant")}
                            </span>
                          ) : null}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingMemberId(null)}>
              {t("common:actions.cancel")}
            </Button>
            <Button
              onClick={() => {
                if (!editingMember) return;
                updateMemberMutation.mutate({
                  memberId: editingMember.id,
                  membershipRole: draftRole,
                  status: draftStatus,
                  grants: [...draftGrants],
                });
              }}
              disabled={updateMemberMutation.isPending}
            >
              {updateMemberMutation.isPending ? t("access.saving") : t("access.save_access")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PendingJoinRequestCard({
  title,
  subtitle,
  context,
  detail,
  detailSecondary,
  approveLabel,
  rejectLabel,
  disabled,
  onApprove,
  onReject,
}: {
  title: string;
  subtitle: string;
  context: string;
  detail: string;
  detailSecondary?: string;
  approveLabel: string;
  rejectLabel: string;
  disabled: boolean;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="rounded-xl border border-border px-4 py-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <div>
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">{subtitle}</div>
          </div>
          <div className="text-sm text-muted-foreground">{context}</div>
          <div className="text-sm text-muted-foreground">{detail}</div>
          {detailSecondary ? <div className="text-sm text-muted-foreground">{detailSecondary}</div> : null}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onReject} disabled={disabled}>
            {rejectLabel}
          </Button>
          <Button type="button" onClick={onApprove} disabled={disabled}>
            {approveLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
