import {
  toggleExerciseSelection,
  filterExercises,
  buildRoutinePayload,
  buildExerciseSettingPayload
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

describe("buildExerciseSettingPayload", () => {
  it("creates correct payload with all merged fields", () => {
    const settings = {
      weight: 50,
      reps: 10,
      sets: 3,
      breakInterval: 60,
    };

    const payload = buildExerciseSettingPayload(settings, 5, 12);

    expect(payload).toEqual({
      weight: 50,
      reps: 10,
      sets: 3,
      breakInterval: 60,
      exerciseId: 5,
      workoutRoutineId: 12,
    });
  });

  it("preserves all original user settings fields", () => {
    const settings = {
      weight: 90,
      reps: 5,
      sets: 5,
      breakInterval: 120,
    };

    const payload = buildExerciseSettingPayload(settings, 2, 99);

    expect(payload.weight).toBe(90);
    expect(payload.reps).toBe(5);
    expect(payload.sets).toBe(5);
    expect(payload.breakInterval).toBe(120);
  });

  it("correctly overrides exerciseId and workoutRoutineId even if the settings object contains those keys", () => {
    const settings = {
      weight: 20,
      reps: 8,
      sets: 4,
      breakInterval: 45,

      // these should be ignored and overwritten
      exerciseId: 999 as any,
      workoutRoutineId: 999 as any,
    };

    const payload = buildExerciseSettingPayload(settings, 7, 33);

    expect(payload.exerciseId).toBe(7);
    expect(payload.workoutRoutineId).toBe(33);
  });
});

