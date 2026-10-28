import { armorBatchEightItemImageUrl } from './armor_batch_eight_item_art';
import { armorBatchElevenItemImageUrl } from './armor_batch_eleven_item_art';
import { armorBatchFifteenItemImageUrl } from './armor_batch_fifteen_item_art';
import { armorBatchFiveItemImageUrl } from './armor_batch_five_item_art';
import { armorBatchFourItemImageUrl } from './armor_batch_four_item_art';
import { armorBatchFourteenItemImageUrl } from './armor_batch_fourteen_item_art';
import { armorBatchItemImageUrl } from './armor_batch_item_art';
import { armorBatchNineItemImageUrl } from './armor_batch_nine_item_art';
import { armorBatchSevenItemImageUrl } from './armor_batch_seven_item_art';
import { armorBatchSeventeenItemImageUrl } from './armor_batch_seventeen_item_art';
import { armorBatchSixItemImageUrl } from './armor_batch_six_item_art';
import { armorBatchTenItemImageUrl } from './armor_batch_ten_item_art';
import { armorBatchThirteenItemImageUrl } from './armor_batch_thirteen_item_art';
import { armorBatchThreeItemImageUrl } from './armor_batch_three_item_art';
import { armorBatchTwelveItemImageUrl } from './armor_batch_twelve_item_art';
import { armorBatchTwoItemImageUrl } from './armor_batch_two_item_art';
import { earlyDropsItemImageUrl } from './early_drops_item_art';
import { earlyMaterialEightItemImageUrl } from './early_material_eight_item_art';
import { earlyMaterialElevenItemImageUrl } from './early_material_eleven_item_art';
import { earlyMaterialFiveItemImageUrl } from './early_material_five_item_art';
import { earlyMaterialFourItemImageUrl } from './early_material_four_item_art';
import { earlyMaterialFourteenItemImageUrl } from './early_material_fourteen_item_art';
import { earlyMaterialNineItemImageUrl } from './early_material_nine_item_art';
import { earlyMaterialSevenItemImageUrl } from './early_material_seven_item_art';
import { earlyMaterialSixItemImageUrl } from './early_material_six_item_art';
import { earlyMaterialTenItemImageUrl } from './early_material_ten_item_art';
import { earlyMaterialThirteenItemImageUrl } from './early_material_thirteen_item_art';
import { earlyMaterialTwelveItemImageUrl } from './early_material_twelve_item_art';
import { earlyQuestItemImageUrl } from './early_quest_item_art';
import { earlyQuestMaterialItemImageUrl } from './early_quest_material_item_art';
import { marshBatchSeventeenItemImageUrl } from './marsh_batch_seventeen_item_art';
import { questBatchSixteenItemImageUrl } from './quest_batch_sixteen_item_art';
import { starterItemImageUrl } from './starter_item_art';
import { toolBatchFiveItemImageUrl } from './tool_batch_five_item_art';
import { toolBatchFourItemImageUrl } from './tool_batch_four_item_art';
import { toolBatchItemImageUrl } from './tool_batch_item_art';
import { toolBatchThreeItemImageUrl } from './tool_batch_three_item_art';
import { weaponBatchEightItemImageUrl } from './weapon_batch_eight_item_art';
import { weaponBatchElevenItemImageUrl } from './weapon_batch_eleven_item_art';
import { weaponBatchFifteenItemImageUrl } from './weapon_batch_fifteen_item_art';
import { weaponBatchFourteenItemImageUrl } from './weapon_batch_fourteen_item_art';
import { weaponBatchNineItemImageUrl } from './weapon_batch_nine_item_art';
import { weaponBatchSevenItemImageUrl } from './weapon_batch_seven_item_art';
import { weaponBatchSixItemImageUrl } from './weapon_batch_six_item_art';
import { weaponBatchTenItemImageUrl } from './weapon_batch_ten_item_art';
import { weaponBatchThirteenItemImageUrl } from './weapon_batch_thirteen_item_art';
import { weaponBatchTwelveItemImageUrl } from './weapon_batch_twelve_item_art';

// Keep the original-art lookup behind one seam as individual batches grow.
export function paintedItemImageUrl(id: string): string | null {
  return (
    starterItemImageUrl(id) ??
    earlyQuestItemImageUrl(id) ??
    earlyDropsItemImageUrl(id) ??
    armorBatchItemImageUrl(id) ??
    armorBatchTwoItemImageUrl(id) ??
    armorBatchThreeItemImageUrl(id) ??
    armorBatchFourItemImageUrl(id) ??
    armorBatchFiveItemImageUrl(id) ??
    armorBatchSixItemImageUrl(id) ??
    armorBatchSevenItemImageUrl(id) ??
    armorBatchEightItemImageUrl(id) ??
    armorBatchNineItemImageUrl(id) ??
    armorBatchTenItemImageUrl(id) ??
    armorBatchElevenItemImageUrl(id) ??
    armorBatchTwelveItemImageUrl(id) ??
    armorBatchThirteenItemImageUrl(id) ??
    armorBatchFourteenItemImageUrl(id) ??
    armorBatchFifteenItemImageUrl(id) ??
    armorBatchSeventeenItemImageUrl(id) ??
    earlyMaterialFourItemImageUrl(id) ??
    earlyMaterialFiveItemImageUrl(id) ??
    earlyMaterialSixItemImageUrl(id) ??
    earlyMaterialSevenItemImageUrl(id) ??
    earlyMaterialEightItemImageUrl(id) ??
    earlyMaterialNineItemImageUrl(id) ??
    earlyMaterialTenItemImageUrl(id) ??
    earlyMaterialElevenItemImageUrl(id) ??
    earlyMaterialTwelveItemImageUrl(id) ??
    earlyMaterialThirteenItemImageUrl(id) ??
    earlyMaterialFourteenItemImageUrl(id) ??
    earlyQuestMaterialItemImageUrl(id) ??
    toolBatchItemImageUrl(id) ??
    toolBatchThreeItemImageUrl(id) ??
    toolBatchFourItemImageUrl(id) ??
    toolBatchFiveItemImageUrl(id) ??
    weaponBatchSixItemImageUrl(id) ??
    weaponBatchSevenItemImageUrl(id) ??
    weaponBatchEightItemImageUrl(id) ??
    weaponBatchNineItemImageUrl(id) ??
    weaponBatchTenItemImageUrl(id) ??
    weaponBatchElevenItemImageUrl(id) ??
    weaponBatchTwelveItemImageUrl(id) ??
    weaponBatchThirteenItemImageUrl(id) ??
    weaponBatchFourteenItemImageUrl(id) ??
    weaponBatchFifteenItemImageUrl(id) ??
    questBatchSixteenItemImageUrl(id) ??
    marshBatchSeventeenItemImageUrl(id)
  );
}
