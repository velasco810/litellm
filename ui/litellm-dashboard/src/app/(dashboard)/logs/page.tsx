"use client";

import SpendLogsTable from "@/components/view_logs";
import useAuthorized from "@/app/(dashboard)/hooks/useAuthorized";
import { useSearchParams } from "next/navigation";

export default function Logs() {
  const { accessToken, userRole, userId, token, premiumUser } = useAuthorized();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("request_id")?.trim() || undefined;
  return (
    <SpendLogsTable
      key={requestId ?? "request-logs"}
      userID={userId}
      userRole={userRole}
      token={token}
      accessToken={accessToken}
      premiumUser={premiumUser}
      requestId={requestId}
    />
  );
}
