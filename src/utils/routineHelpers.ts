export function toggleExerciseSelection(currentSelected: any[], exercise: any) {
  if (currentSelected.some((e) => e.id === exercise.id)) {
    return currentSelected.filter((e) => e.id !== exercise.id);
  }
  return [...currentSelected, exercise];
}

export function filterExercises(exercises: any[], query: string) {
  if (!query.trim()) return exercises;

  return exercises.filter((exercise) => {
    const targetsStr = Array.isArray(exercise.targets)
      ? exercise.targets.join(", ")
      : String(exercise.targets);
    return (
      exercise.name.toLowerCase().includes(query.toLowerCase()) ||
      targetsStr.toLowerCase().includes(query.toLowerCase())
    );
  });
}

export function buildRoutinePayload(name: string, selectedExercises: any[]) {
  return {
    name: name.trim(),
    exerciseIds: selectedExercises.map((e) => e.id),
  };
}
