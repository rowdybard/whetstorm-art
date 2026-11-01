// Original painting for the stablemaster's riding training service.
export function ridingTrainingItemImageUrl(id: string): string | null {
  return id === 'riding_training' ? '/ui/whetstorm/items/riding_training.webp' : null;
}
