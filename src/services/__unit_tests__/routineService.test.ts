import { describe, it, expect, vi } from "vitest";
import { routineService } from "../routineService";
import { getRequest } from "../../utils/apiRequests";
import type { Routine } from "../../types/api";

vi.mock("../../utils/apiRequests", () => ({
  getRequest: vi.fn(),
}));

describe("routineService.getRoutinesByIds", () => {
  const mockRoutine = (id: number): Routine => ({
    id,
    name: `Routine ${id}`,
    description: "",
    exerciseIds: [],
    createdAt: "2025-11-28T12:00:00.000Z",
    isActive: true,
    userId: 123,
  });

  it("returns routines for given ids", async () => {
    (getRequest as any).mockImplementation((url: string) => {
      const id = Number(url.split("/").pop());
      return Promise.resolve({ data: mockRoutine(id) });
    });

    const result = await routineService.getRoutinesByIds([1, 2, 3]);

    expect(result).toEqual([
      mockRoutine(1),
      mockRoutine(2),
      mockRoutine(3),
    ]);
  });

  it("propagates errors thrown by getRequest", async () => {
    (getRequest as any).mockRejectedValue(new Error("Network error"));

    await expect(
      routineService.getRoutinesByIds([10])
    ).rejects.toThrow("Network error");
  });
});
