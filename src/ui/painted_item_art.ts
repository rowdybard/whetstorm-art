import { armorBatchItemImageUrl } from './armor_batch_item_art';
import { armorBatchTwoItemImageUrl } from './armor_batch_two_item_art';
import { earlyDropsItemImageUrl } from './early_drops_item_art';
import { earlyQuestItemImageUrl } from './early_quest_item_art';
import { earlyQuestMaterialItemImageUrl } from './early_quest_material_item_art';
import { starterItemImageUrl } from './starter_item_art';
import { toolBatchItemImageUrl } from './tool_batch_item_art';

// Keep the original-art lookup behind one seam as individual batches grow.
export function paintedItemImageUrl(id: string): string | null {
  return (
    starterItemImageUrl(id) ??
    earlyQuestItemImageUrl(id) ??
    earlyDropsItemImageUrl(id) ??
    armorBatchItemImageUrl(id) ??
    armorBatchTwoItemImageUrl(id) ??
    earlyQuestMaterialItemImageUrl(id) ??
    toolBatchItemImageUrl(id)
  );
}
