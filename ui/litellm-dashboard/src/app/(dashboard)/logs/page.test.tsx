import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Logs from "./page";

const { spendLogsSpy } = vi.hoisted(() => ({ spendLogsSpy: vi.fn() }));

vi.mock("@/components/view_logs", () => ({
  default: (props: Record<string, unknown>) => {
    spendLogsSpy(props);
    return null;
  },
}));

vi.mock("@/app/(dashboard)/hooks/useAuthorized", () => ({
  default: () => ({
    accessToken: "test-access-token",
    userRole: "Admin",
    userId: "user-1",
    token: "test-token",
    premiumUser: false,
  }),
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("request_id=req-deep-link"),
}));

describe("Logs", () => {
  beforeEach(() => {
    spendLogsSpy.mockClear();
  });

  it("passes the request_id query parameter to the logs table", () => {
    render(<Logs />);

    expect(spendLogsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        requestId: "req-deep-link",
      }),
    );
  });
});
