import {
  toggleExerciseSelection,
  filterExercises,
  buildRoutinePayload,
} from "../routineHelpers";
import { describe, it, expect } from "vitest";

describe("toggleExerciseSelection", () => {
  const ex1 = { id: 1, name: "Push-up" };
  const ex2 = { id: 2, name: "Squat" };

  it("adds exercise if not selected", () => {
    const result = toggleExerciseSelection([], ex1);
    expect(result).toEqual([ex1]);
  });

  it("removes exercise if already selected", () => {
    const result = toggleExerciseSelection([ex1], ex1);
    expect(result).toEqual([]);
  });

  it("keeps others when removing one", () => {
    const result = toggleExerciseSelection([ex1, ex2], ex1);
    expect(result).toEqual([ex2]);
  });
});

describe("filterExercises", () => {
  const exercises = [
    { id: 1, name: "Push-up", targets: ["chest", "arms"] },
    { id: 2, name: "Sit-up", targets: ["abs"] },
  ];

  it("returns all if query empty", () => {
    expect(filterExercises(exercises, "")).toEqual(exercises);
  });

  it("filters by name", () => {
    expect(filterExercises(exercises, "push")).toEqual([exercises[0]]);
  });

  it("filters by target", () => {
    expect(filterExercises(exercises, "abs")).toEqual([exercises[1]]);
  });
});

describe("buildRoutinePayload", () => {
  it("creates correct payload", () => {
    const payload = buildRoutinePayload("Morning Routine", [
      { id: 1 },
      { id: 2 },
    ]);
    expect(payload).toEqual({ name: "Morning Routine", exerciseIds: [1, 2] });
  });

  it("trims name", () => {
    const payload = buildRoutinePayload("  Routine X  ", []);
    expect(payload.name).toBe("Routine X");
  });
});
