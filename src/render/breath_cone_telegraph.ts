// Fire Breath ground warning: the painter for breath_cone_telegraph_core.ts.
//
// Every mob template with a `breathCone` (Old Peatfire, the Drakemaw
// broodlords, Cindraleth) shows a cast bar while it inhales, but nothing on
// the ground said where the fire would go. While the bar runs this draws the
// exact cone the sim will resolve, draped on the terrain: a red wash over the
// whole footprint, a hard amber rim on its true edge, and a brighter heat front
// that sweeps from the mouth to the rim as the cast completes, so the wedge
// reads both where and when. The 'fireCone' release wave
// (glacial_front_visual.ts) takes over the moment the breath lands.
//
// Actionable, so never gated or hidden: the pooled root is attached at
// construction with every slot idle, and the same root goes to the renderer's
// compile gate so its materials link off the draw path long before the first
// breath (three's compile walks invisible meshes too). For that to be the
// program the breath really draws, every slot is built with its real geometry
// (a position attribute is part of three's program key) at the widest shipped
// cone; a narrower breath rewrites the positions in place, never the
// attribute set. Every slot's materials share one program; they are per slot
// only so two breaths at different points of their bars fade independently.
// The renderer notes each drawn mob that is casting (note) and paints once per
// frame (update).

import * as THREE from 'three';
import { MOBS } from '../sim/data';
import type { Entity } from '../sim/types';
import {
  type BreathConeTelegraphPlan,
  breathConeTelegraphPlan,
} from './breath_cone_telegraph_core';
import { floorVfxRenderOrder } from './floor_vfx_layer';

/** Breaths drawn at once: the Drakelands brood can put four broodlords and the
 *  matriarch in one view, with a slot to spare. Idle slots are invisible and
 *  share the one linked program, so a spare slot costs nothing. */
export const BREATH_CONE_SLOTS = 6;
export const BREATH_CONE_GROUP_NAME = 'breath-cone-telegraph';
/** A vertex about every half yard along a 13 yd rim. */
const ARC_SEGMENTS = 24;
/** A ring of vertices about every 1.3 yd out from the mouth, for the drape. */
const RADIAL_SEGMENTS = 10;
const RIM_WIDTH = 0.3;
const LIFT = 0.12;

interface Slot {
  group: THREE.Group;
  wash: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  front: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  rim: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  entityId: number | null;
  shapeKey: string;
  placeKey: string;
}

function material(color: number, role: 'wash' | 'front' | 'rim'): THREE.MeshBasicMaterial {
  const mat = new THREE.MeshBasicMaterial({
    name: `breath-cone-telegraph:${role}`,
    color,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  // A flat additive decal needs no back-then-front pass split: one draw per
  // piece, and one program to prepare instead of two.
  mat.forceSinglePass = true;
  return mat;
}

/** The widest cone any shipped breath draws, so a slot is built once at a
 *  shape whose attribute set every breath shares. */
function widestBreath(): { range: number; halfAngle: number } {
  let range = 1;
  let arcDeg = 1;
  for (const mob of Object.values(MOBS)) {
    if (!mob.breathCone) continue;
    range = Math.max(range, mob.breathCone.range);
    arcDeg = Math.max(arcDeg, mob.breathCone.arcDeg);
  }
  return { range, halfAngle: (arcDeg * Math.PI) / 360 };
}

/** Swap a shape in without touching the attribute set: both builders emit a
 *  topology that depends only on the segment counts, never the shape. */
function rewritePositions(geometry: THREE.BufferGeometry, fresh: THREE.BufferGeometry): void {
  const positions = geometry.getAttribute('position') as THREE.BufferAttribute;
  positions.copyArray(fresh.getAttribute('position').array);
  positions.needsUpdate = true;
  fresh.dispose();
}

/** The cone footprint as a polar grid in the slot's local frame (+Z is the
 *  mob's facing), dense enough in both directions to follow the ground. */
export function breathConeSectorGeometry(range: number, halfAngle: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];
  const row = ARC_SEGMENTS + 1;
  for (let ring = 0; ring <= RADIAL_SEGMENTS; ring++) {
    const radius = (range * ring) / RADIAL_SEGMENTS;
    for (let step = 0; step <= ARC_SEGMENTS; step++) {
      const angle = -halfAngle + (2 * halfAngle * step) / ARC_SEGMENTS;
      positions.push(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
    }
  }
  for (let ring = 0; ring < RADIAL_SEGMENTS; ring++) {
    for (let step = 0; step < ARC_SEGMENTS; step++) {
      const a = ring * row + step;
      const b = a + row;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  return geometry;
}

/** The footprint's border: the outer arc and both side edges as bands of
 *  RIM_WIDTH yards laid just inside the true edge, so the rim marks the last
 *  yard that is still hit. Each band is subdivided along its length to drape. */
export function breathConeRimGeometry(range: number, halfAngle: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];
  const quad = (
    ax: number,
    az: number,
    bx: number,
    bz: number,
    cx: number,
    cz: number,
    dx: number,
    dz: number,
  ) => {
    const base = positions.length / 3;
    positions.push(ax, 0, az, bx, 0, bz, cx, 0, cz, dx, 0, dz);
    indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
  };
  const inner = range - RIM_WIDTH;
  for (let step = 0; step < ARC_SEGMENTS; step++) {
    const a0 = -halfAngle + (2 * halfAngle * step) / ARC_SEGMENTS;
    const a1 = -halfAngle + (2 * halfAngle * (step + 1)) / ARC_SEGMENTS;
    quad(
      Math.sin(a0) * inner,
      Math.cos(a0) * inner,
      Math.sin(a0) * range,
      Math.cos(a0) * range,
      Math.sin(a1) * inner,
      Math.cos(a1) * inner,
      Math.sin(a1) * range,
      Math.cos(a1) * range,
    );
  }
  // Side edges: a strip of fixed width parallel to each ray, tapering only
  // near the mouth, where the cone is too narrow for it (the offset never
  // crosses the centre line, so no rim vertex lands outside the footprint).
  const sideSegments = RADIAL_SEGMENTS * 2;
  const offsetAt = (r: number) => Math.min(RIM_WIDTH, r * Math.sin(halfAngle));
  for (const side of [-1, 1]) {
    const angle = side * halfAngle;
    const dirX = Math.sin(angle);
    const dirZ = Math.cos(angle);
    const inX = -side * Math.cos(angle);
    const inZ = side * Math.sin(angle);
    for (let step = 0; step < sideSegments; step++) {
      const r0 = (inner * step) / sideSegments;
      const r1 = (inner * (step + 1)) / sideSegments;
      quad(
        dirX * r0,
        dirZ * r0,
        dirX * r0 + inX * offsetAt(r0),
        dirZ * r0 + inZ * offsetAt(r0),
        dirX * r1,
        dirZ * r1,
        dirX * r1 + inX * offsetAt(r1),
        dirZ * r1 + inZ * offsetAt(r1),
      );
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  return geometry;
}

export class BreathConeTelegraphs {
  private readonly root = new THREE.Group();
  private readonly slots: Slot[] = [];
  private readonly casters: Entity[] = [];
  private readonly plans: { id: number; plan: BreathConeTelegraphPlan }[] = [];

  constructor(
    scene: THREE.Scene,
    private readonly groundY: (x: number, z: number) => number,
    compileGate?: (target: THREE.Object3D) => Promise<unknown>,
  ) {
    this.root.name = BREATH_CONE_GROUP_NAME;
    this.root.userData.renderCategory = 'ui3d';
    this.root.userData.actionable = true;
    const { range, halfAngle } = widestBreath();
    const shapeKey = `${range}|${halfAngle}`;
    for (let i = 0; i < BREATH_CONE_SLOTS; i++) {
      const group = new THREE.Group();
      group.visible = false;
      const wash = new THREE.Mesh(
        breathConeSectorGeometry(range, halfAngle),
        material(0xd91808, 'wash'),
      );
      wash.renderOrder = floorVfxRenderOrder('encounter', 1);
      const front = new THREE.Mesh(
        breathConeSectorGeometry(range, halfAngle),
        material(0xff4a12, 'front'),
      );
      front.renderOrder = floorVfxRenderOrder('encounter', 2);
      // Its heights are rewritten every frame of a bar (not a program input).
      (front.geometry.getAttribute('position') as THREE.BufferAttribute).setUsage(
        THREE.DynamicDrawUsage,
      );
      const rim = new THREE.Mesh(
        breathConeRimGeometry(range, halfAngle),
        material(0xff9b2f, 'rim'),
      );
      rim.renderOrder = floorVfxRenderOrder('encounter', 3);
      group.add(wash, front, rim);
      this.root.add(group);
      this.slots.push({ group, wash, front, rim, entityId: null, shapeKey, placeKey: '' });
    }
    scene.add(this.root);
    compileGate?.(this.root).catch(() => {});
  }

  /** Called for each drawn entity that is casting; cheap for every other cast. */
  note(e: Entity): void {
    if (e.kind === 'mob' && MOBS[e.templateId]?.breathCone) this.casters.push(e);
  }

  /** Paint the breaths noted since the last call, and retire the rest. */
  update(): void {
    this.plans.length = 0;
    for (const e of this.casters) {
      const plan = breathConeTelegraphPlan(e, MOBS[e.templateId]?.breathCone);
      if (plan) this.plans.push({ id: e.id, plan });
    }
    this.casters.length = 0;
    // Keep each breath on the slot it started in, then hand the free slots
    // out. Every live breath stays planned (no cap), so a slot is only ever
    // freed by its own breath ending: with more breaths than slots, a crowd
    // can never blank a warning part-way through its bar, and only a breath
    // that has not been shown yet waits for a free slot.
    for (const slot of this.slots) {
      if (slot.entityId !== null && !this.plans.some((p) => p.id === slot.entityId)) {
        slot.entityId = null;
        slot.group.visible = false;
      }
    }
    for (const { id, plan } of this.plans) {
      const slot =
        this.slots.find((s) => s.entityId === id) ?? this.slots.find((s) => s.entityId === null);
      if (!slot) continue;
      slot.entityId = id;
      this.paint(slot, plan);
    }
  }

  private paint(slot: Slot, plan: BreathConeTelegraphPlan): void {
    const shapeKey = `${plan.range}|${plan.halfAngle}`;
    if (slot.shapeKey !== shapeKey) {
      rewritePositions(slot.wash.geometry, breathConeSectorGeometry(plan.range, plan.halfAngle));
      rewritePositions(slot.front.geometry, breathConeSectorGeometry(plan.range, plan.halfAngle));
      rewritePositions(slot.rim.geometry, breathConeRimGeometry(plan.range, plan.halfAngle));
      slot.shapeKey = shapeKey;
      slot.placeKey = '';
    }
    const baseY = this.groundY(plan.x, plan.z);
    slot.group.position.set(plan.x, baseY, plan.z);
    slot.group.rotation.y = plan.facing;
    slot.group.visible = true;
    // The wash and the rim only move with the mob; the front grows every frame.
    const placeKey = `${plan.x.toFixed(2)}|${plan.z.toFixed(2)}|${plan.facing.toFixed(3)}`;
    if (slot.placeKey !== placeKey) {
      this.drape(slot.wash.geometry, plan, baseY);
      this.drape(slot.rim.geometry, plan, baseY);
      slot.placeKey = placeKey;
    }
    const reach = Math.max(0.02, plan.progress);
    slot.front.scale.set(reach, 1, reach);
    layFrontOnWash(slot.front.geometry, slot.wash.geometry, reach);
    slot.wash.material.opacity = 0.2 + plan.progress * 0.14;
    slot.front.material.opacity = 0.3 + plan.progress * 0.25;
    slot.rim.material.opacity = 0.85 + plan.progress * 0.15;
  }

  /** Lay a local-frame geometry on the terrain under the slot's transform:
   *  each vertex's Y becomes the ground there, relative to the group's own
   *  height, plus a small lift. */
  private drape(
    geometry: THREE.BufferGeometry,
    plan: BreathConeTelegraphPlan,
    baseY: number,
  ): void {
    const positions = geometry.getAttribute('position') as THREE.BufferAttribute;
    const sin = Math.sin(plan.facing);
    const cos = Math.cos(plan.facing);
    for (let i = 0; i < positions.count; i++) {
      const lx = positions.getX(i);
      const lz = positions.getZ(i);
      const wx = plan.x + lx * cos + lz * sin;
      const wz = plan.z - lx * sin + lz * cos;
      positions.setY(i, this.groundY(wx, wz) - baseY + LIFT);
    }
    positions.needsUpdate = true;
    geometry.computeBoundingSphere();
  }
}

/** Seat the heat front (the sector grid, drawn at `reach` of full size) on the
 *  draped wash without sampling the terrain: front vertex (ring, step) lies on
 *  ray `step` at `reach * ring` rings out, and each ray of the wash is a run
 *  of triangle edges, so interpolating the wash's draped heights along it puts
 *  every front vertex on the wash surface (its arcs are chords between them,
 *  as any drape's are). Only the wash re-samples the ground, and only when the
 *  breather moves or turns. */
function layFrontOnWash(
  front: THREE.BufferGeometry,
  wash: THREE.BufferGeometry,
  reach: number,
): void {
  const heights = wash.getAttribute('position') as THREE.BufferAttribute;
  const positions = front.getAttribute('position') as THREE.BufferAttribute;
  const row = ARC_SEGMENTS + 1;
  for (let ring = 0; ring <= RADIAL_SEGMENTS; ring++) {
    const along = ring * reach;
    const inner = Math.floor(along);
    const outer = Math.min(RADIAL_SEGMENTS, inner + 1);
    const t = along - inner;
    for (let step = 0; step < row; step++) {
      const y0 = heights.getY(inner * row + step);
      const y1 = heights.getY(outer * row + step);
      positions.setY(ring * row + step, y0 + (y1 - y0) * t);
    }
  }
  positions.needsUpdate = true;
  front.computeBoundingSphere();
}
