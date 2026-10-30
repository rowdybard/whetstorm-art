import { PROFESSION_IMAGE_IDS } from './profession_image_ids';
import { whetstormArchetypeAImageUrl } from './whetstorm_archetype_a_art';
import { whetstormArchetypeBImageUrl } from './whetstorm_archetype_b_art';
import { whetstormCraftingAProfessionImageUrl } from './whetstorm_crafting_a_art';
import { whetstormCraftingBProfessionImageUrl } from './whetstorm_crafting_b_art';
import { whetstormGatheringProfessionImageUrl } from './whetstorm_gathering_art';
import {
  WHETSTORM_MASTERWORK_SEAL_IMAGE_URL,
  whetstormMasterworkProfessionImageUrl,
} from './whetstorm_masterwork_art';
import { whetstormSmithImageUrl } from './whetstorm_smith_art';

const PROFESSION_IMAGE_DIR = '/ui/professions';

export { PROFESSION_IMAGE_IDS } from './profession_image_ids';

/** The commissioned crest for each canonical adjacent profession pair. */
export const ARCHETYPE_IMAGE_ID_BY_PAIR: Readonly<Record<string, string>> = {
  'alchemy+cooking': 'archetype_apothecary',
  'armorcrafting+engineering': 'archetype_cogsmith',
  'cooking+leatherworking': 'archetype_trapper',
  'enchanting+jewelcrafting': 'archetype_gembinder',
  'engineering+alchemy': 'archetype_bombardier',
  'inscription+enchanting': 'archetype_arcanist',
  'jewelcrafting+weaponcrafting': 'archetype_bladewright',
  'leatherworking+tailoring': 'archetype_outfitter',
  'tailoring+inscription': 'archetype_mageweaver',
  'weaponcrafting+armorcrafting': 'archetype_smith',
};

/** Resolve one known profession-side painted image to its public WebP URL. */
export function professionImageUrl(id: string): string | null {
  return (
    whetstormGatheringProfessionImageUrl(id) ??
    whetstormCraftingAProfessionImageUrl(id) ??
    whetstormCraftingBProfessionImageUrl(id) ??
    whetstormArchetypeAImageUrl(id) ??
    whetstormArchetypeBImageUrl(id) ??
    whetstormSmithImageUrl(id) ??
    whetstormMasterworkProfessionImageUrl(id) ??
    (PROFESSION_IMAGE_IDS.has(id) ? `${PROFESSION_IMAGE_DIR}/${id}.webp` : null)
  );
}

/** Resolve a canonical profession pair to its painted archetype crest. */
export function archetypeImageUrl(pairId: string | null): string | null {
  if (pairId === null) return null;
  const imageId = ARCHETYPE_IMAGE_ID_BY_PAIR[pairId];
  return imageId ? professionImageUrl(imageId) : null;
}

export const MASTERWORK_SEAL_IMAGE_URL = WHETSTORM_MASTERWORK_SEAL_IMAGE_URL;
