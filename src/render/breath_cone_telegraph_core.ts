// Fire Breath ground warning, the pure plan (RENDER_PURE_CORES): is this mob
// mid-breath, and exactly where will the breath land?
//
// The sim resolves a template's `breathCone` (src/sim/mob/locomotion.ts) when
// the cast bar runs out: every living player within `range` yards of the
// mob's centre AND inside the `arcDeg` cone about the mob's facing AT THAT
// MOMENT takes the hit. The plan mirrors that test one to one, so the decal is
// the authoritative footprint rather than a guess: same centre (the entity
// position), same radius (no body allowance), same half-angle, and the LIVE
// facing, so a boss that turns during the bar drags its cone with it. Every
// field it reads rides the entity wire (cast, castRem, castTot, facing), so
// the online mirror draws the same plan the offline sim does. The plan follows
// the cast bar, so it shares the bar's one known gap: a mob that loses its
// last target mid-breath and evades home keeps a frozen bar, and so a frozen
// cone, until it resets (src/sim/mob/targeting.ts; a sim fix, not a render one).

/** The slice of `MobTemplate.breathCone` the telegraph needs. */
export interface BreathConeSpec {
  castId: string;
  range: number;
  arcDeg: number;
}

/** The slice of an entity the telegraph reads. */
export interface BreathConeCaster {
  dead: boolean;
  castingAbility: string | null;
  castTotal: number;
  castRemaining: number;
  facing: number;
  pos: { x: number; z: number };
}

export interface BreathConeTelegraphPlan {
  x: number;
  z: number;
  facing: number;
  range: number;
  /** Half of `arcDeg`, in radians (the sim's own `halfArc`). */
  halfAngle: number;
  /** 0 as the cast bar starts, 1 the instant the breath lands. */
  progress: number;
}

/** The warning to draw for `caster`, or null when it is not breathing. */
export function breathConeTelegraphPlan(
  caster: BreathConeCaster,
  spec: BreathConeSpec | undefined,
): BreathConeTelegraphPlan | null {
  if (!spec || caster.dead || caster.castingAbility !== spec.castId) return null;
  const total = caster.castTotal;
  const progress = total > 0 ? Math.min(1, Math.max(0, 1 - caster.castRemaining / total)) : 1;
  return {
    x: caster.pos.x,
    z: caster.pos.z,
    facing: caster.facing,
    range: spec.range,
    halfAngle: (spec.arcDeg * Math.PI) / 360,
    progress,
  };
}
