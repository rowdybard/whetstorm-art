export const LOADING_BACKDROP_PATHS = [
  '/website-hero-arena.webp',
  '/website-hero-road.webp',
  '/website-hero-smokewatch.webp',
  '/website-hero-peatfire.webp',
] as const;

function choiceIndex(randomUnit: number, count: number): number {
  if (!Number.isFinite(randomUnit)) return 0;
  const normalized = Math.max(0, Math.min(1, randomUnit));
  return Math.min(count - 1, Math.floor(normalized * count));
}

export function selectLoadingBackdropPath(randomUnit: number, previousPath?: string): string {
  const previousIndex = previousPath
    ? (LOADING_BACKDROP_PATHS as readonly string[]).indexOf(previousPath)
    : -1;
  if (previousIndex < 0) {
    return LOADING_BACKDROP_PATHS[choiceIndex(randomUnit, LOADING_BACKDROP_PATHS.length)];
  }

  const candidateIndex = choiceIndex(randomUnit, LOADING_BACKDROP_PATHS.length - 1);
  const catalogIndex = candidateIndex >= previousIndex ? candidateIndex + 1 : candidateIndex;
  return LOADING_BACKDROP_PATHS[catalogIndex];
}
