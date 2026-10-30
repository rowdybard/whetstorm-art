// Original Whetstorm masterwork seal, keyed by exact profession-art identity.
export const WHETSTORM_MASTERWORK_SEAL_IMAGE_URL = '/ui/whetstorm/professions/masterwork_seal.webp';

export function whetstormMasterworkProfessionImageUrl(id: string): string | null {
  return id === 'masterwork_seal' ? WHETSTORM_MASTERWORK_SEAL_IMAGE_URL : null;
}
