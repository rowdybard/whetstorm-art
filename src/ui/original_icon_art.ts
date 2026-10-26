// Original Whetstorm artwork. Semantic recipes are metadata, never inherited bitmaps.
// The same polygon source paints SVG and synchronous/worker canvas surfaces.
export interface OriginalIconRecipe {
  bg: string;
  pal: string;
  prims: readonly { p: string; x?: number; y?: number; s?: number; rot?: number;
    alpha?: number; pal?: string }[];
}
type Polygon = readonly number[];
const SHAPES: Record<string, readonly Polygon[]> = {
  crown: [[15,29,35,45,50,18,65,45,85,29,75,80,25,80]],
  book: [[50,30,32,20,14,23,14,78,33,76,50,85,67,76,86,78,86,23,68,20],[48,31,52,31,52,81,48,81]],
  map: [[12,25,36,15,64,28,88,17,88,79,64,90,36,77,12,88]],
  people: [[38,14,62,14,66,37,58,45,42,45,34,37],[30,52,70,52,82,82,18,82],[13,30,29,30,31,47,15,49],[71,30,87,30,85,49,69,47]],
  mask: [[18,19,50,28,82,19,80,63,67,83,50,92,33,83,20,63],[30,42,43,42,43,50,30,50],[57,42,70,42,70,50,57,50]],
  totem: [[40,15,60,15,60,84,40,84],[20,27,80,27,74,42,26,42],[27,58,73,58,73,69,27,69]],
  trap: [[18,30,29,48,40,31,50,50,60,31,71,48,82,30,82,69,68,83,32,83,18,69]],
  hourglass_ring: [[18,18,82,18,82,28,58,48,58,55,82,76,82,86,18,86,18,76,42,55,42,48,18,28]],
  sword: [[46,12,54,12,58,27,54,66,46,66,42,27],[31,62,69,62,69,69,31,69],[46,69,54,69,54,88,46,88]],
  greatsword: [[42,9,58,9,63,31,57,67,43,67,37,31],[26,62,74,62,74,72,26,72],[45,72,55,72,55,93,45,93]],
  dagger: [[44,15,57,11,60,33,52,65,44,65],[33,62,67,62,67,69,33,69],[45,69,53,69,53,86,45,86]],
  axe: [[46,18,54,18,54,89,46,89],[25,23,45,28,45,50,22,56,17,42],[55,28,75,23,83,42,78,56,55,50]],
  mace: [[35,16,65,16,73,36,56,44,56,86,44,86,44,44,27,36]],
  staff: [[44,28,56,28,54,88,46,88],[50,9,65,24,50,39,35,24]],
  bow: [[34,14,55,24,68,43,68,57,55,76,34,86,45,66,51,50,45,34],[34,16,37,16,37,84,34,84]],
  arrow: [[18,75,67,26,57,16,87,13,84,43,74,33,25,82],[19,66,31,79,23,87,11,74]],
  shield: [[50,13,79,25,74,62,64,77,50,88,36,77,26,62,21,25]],
  flame: [[52,10,62,32,76,45,82,64,74,80,58,88,38,85,24,72,22,54,35,35,36,55,47,43]],
  bolt: [[56,8,25,53,47,53,38,92,78,39,55,39]],
  lightning: [[56,8,25,53,47,53,38,92,78,39,55,39]],
  snowflake: [[47,12,53,12,53,42,77,25,81,31,57,48,87,48,87,54,57,54,81,72,77,78,53,60,53,89,47,89,47,60,23,78,19,72,43,54,13,54,13,48,43,48,19,31,23,25,47,42]],
  leaf: [[20,81,23,49,44,23,80,15,77,50,56,75],[27,78,69,30,73,34,31,82]],
  claw_slash: [[24,13,38,22,35,75,22,88],[46,10,60,20,58,80,44,91],[70,18,84,28,79,73,65,86]],
  hand: [[27,45,35,45,35,19,43,19,43,45,47,45,47,13,55,13,55,45,59,45,59,20,67,20,67,50,71,43,80,48,71,76,57,88,37,83,20,60]],
  fist: [[25,43,31,30,43,30,43,23,55,23,55,28,68,28,68,34,78,37,81,61,65,82,39,80,24,61]],
  cross: [[42,17,58,17,58,41,82,41,82,57,58,57,58,84,42,84,42,57,18,57,18,41,42,41]],
  sunburst: [[50,9,58,32,80,20,68,42,91,50,68,58,80,80,58,68,50,91,42,68,20,80,32,58,9,50,32,42,20,20,42,32]],
  moon: [[70,13,53,20,43,35,43,54,53,69,70,75,82,71,73,84,52,89,31,80,19,62,18,41,30,22,50,12]],
  eye: [[12,50,31,31,50,23,69,31,88,50,69,69,50,77,31,69],[50,32,61,50,50,68,39,50]],
  helm: [[23,74,26,35,40,17,60,17,74,35,77,74,58,83,58,56,42,56,42,83]],
  chestplate: [[35,15,44,22,56,22,65,15,85,31,74,47,65,40,68,85,32,85,35,40,26,47,15,31]],
  trousers: [[30,15,70,15,78,85,56,85,50,49,44,85,22,85]],
  boot: [[40,14,68,14,65,57,83,71,83,85,23,85,22,72,40,55]],
  belt: [[14,39,86,39,86,62,14,62],[39,31,61,31,61,70,39,70]],
  gauntlet: [[35,15,66,15,68,45,80,54,73,78,58,88,34,80,23,58,35,48]],
  pauldron: [[13,48,30,23,57,16,78,31,87,55,67,73,43,69,25,77]],
  potion: [[39,13,61,13,61,24,56,27,56,41,74,59,78,75,69,87,31,87,22,75,26,59,44,41,44,27,39,24]],
  droplet: [[50,12,59,31,76,55,80,70,72,84,50,91,28,84,20,70,24,55,41,31]],
  scroll: [[27,19,76,19,84,29,79,39,70,39,70,75,59,84,18,84,15,73,24,65,31,65,31,31,23,31]],
  gem: [[29,18,71,18,87,43,50,89,13,43],[31,20,50,43,69,20]],
  sack: [[32,16,68,16,61,33,73,51,82,75,71,88,29,88,18,75,27,51,39,33]],
  bread: [[17,66,20,43,32,25,48,20,65,25,80,42,84,66,78,83,23,83]],
  meat: [[26,22,48,15,66,24,69,42,61,57,83,72,74,86,51,67,35,72,17,59,16,39]],
  pelt: [[31,15,43,23,57,23,69,15,83,29,73,45,80,61,64,72,57,88,43,88,36,72,20,61,27,45,17,29]],
  coin: [[50,13,73,22,85,43,82,65,65,83,42,87,22,74,14,53,21,31],[50,30,65,50,50,70,35,50]],
  crate: [[19,22,81,22,81,83,19,83],[21,24,79,81,79,73,28,24],[79,24,21,81,21,73,72,24]],
  skull: [[29,19,50,13,71,19,82,36,79,59,68,65,65,86,35,86,32,65,21,59,18,36],[30,40,43,40,40,54,30,52],[57,40,70,40,70,52,60,54]],
  heart: [[50,87,20,59,15,40,23,24,39,21,50,32,61,21,77,24,85,40,80,59]],
  sigil_rune: [[50,12,83,31,83,69,50,88,17,69,17,31],[50,31,66,50,50,69,34,50]],
  hourglass: [[28,16,72,16,72,25,59,44,59,56,72,75,72,84,28,84,28,75,41,56,41,44,28,25]],
  gear: [[43,13,57,13,61,25,73,22,83,32,78,44,89,49,86,63,73,65,72,78,58,85,49,76,38,84,25,77,27,64,15,59,17,45,29,41,27,28,39,23]],
  fish: [[16,49,35,29,57,25,77,38,90,27,87,50,90,73,77,62,57,75,35,71]],
  paw: [[31,54,47,42,61,45,77,65,72,82,54,76,36,83,23,75],[17,35,23,23,33,27,34,43,25,48],[42,18,49,13,57,20,55,36,45,38],[65,22,74,20,82,30,77,46,67,44]],
};
const ALIASES: Record<string,string> = {
  robe:'chestplate', cape:'pelt', ring:'coin', necklace:'gem', water:'droplet', waterskin:'potion',
  star:'sunburst', ascension_seal:'sunburst', wing:'leaf', needle:'arrow', pickaxe:'axe',
  crosshair:'eye', bone:'staff', fang:'dagger', web:'sigil_rune', candle:'staff',
  meteor:'flame', roar:'paw', imp_head:'skull', sheep_head:'paw', void_brute:'skull',
  tendrils:'claw_slash', bell:'helm', gauntlets:'gauntlet', bag:'sack',
};
const COLORS: Record<string, readonly [string,string]> = {
  fire:['#54281c','#ffbe86'], fury:['#54281c','#ffbd8b'], blood:['#4e1924','#ffa9ac'],
  frost:['#123d55','#b8edff'], storm:['#153e4c','#9de7ed'], arcane:['#38224f','#dfb7ff'],
  shadow:['#2b1b43','#c8b0ef'], holy:['#493a17','#fff0b9'], nature:['#123b2c','#a8efc6'],
  earth:['#45341c','#e3c795'], steel:['#233a43','#daeaf0'], wood:['#39311d','#e6cb91'],
  leather:['#423020','#ebc194'], cloth:['#352c49','#d8c4ec'], food:['#49341e','#f4d19b'],
  drink:['#153c4e','#b9e9f4'], junk:['#303a35','#c7d2c8'], treasure:['#493b1c','#f8dfa1'],
  parchment:['#42371f','#f6e0ab'],
};
function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}
function subject(name: string): readonly Polygon[] {
  const key=Object.hasOwn(SHAPES,name)?name:Object.hasOwn(ALIASES,name)?ALIASES[name]:'sigil_rune';
  return SHAPES[key];
}
function color(bg: string): readonly [string,string] {
  const aliases: Record<string,string> = { gold:'treasure', bone:'parchment', ember:'fire', ice:'frost',
    venom:'nature', arcanePink:'arcane', shadowPurple:'shadow', holyGold:'holy', leafGreen:'nature',
    sky:'storm', earthBrown:'earth', silverWhite:'steel', pink:'arcane' };
  const key = Object.hasOwn(COLORS,bg) ? bg : Object.hasOwn(aliases,bg) ? aliases[bg] : 'steel';
  return COLORS[key];
}
function sizeOf(size: number): number { return Number.isFinite(size) ? Math.max(16,Math.min(512,Math.round(size))) : 96; }
function placed(recipe: OriginalIconRecipe): OriginalIconRecipe['prims'] { return recipe.prims.length ? recipe.prims : [{p:'sigil_rune'}]; }
const cache = new Map<string,string>();
export function originalIconSvg(recipe: OriginalIconRecipe, identity: string, size = 96): string {
  const px=sizeOf(size), [field,ink]=color(recipe.bg), seed=hash(identity.replace(/\|\d+$/,''));
  const parts=placed(recipe).map(p => {
    const scale=p.s ?? 1, angle=(p.rot ?? 0)*180/Math.PI;
    const shapes=subject(p.p).map(points=>`<polygon points="${points.join(' ')}"/>`).join('');
    return `<g transform="translate(${p.x ?? 0} ${p.y ?? 0}) translate(50 50) rotate(${angle}) scale(${scale}) translate(-50 -50)" opacity="${p.alpha ?? 1}" fill="${color(p.pal ?? recipe.bg)[1]}">${shapes}</g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 100 100"><defs><linearGradient id="field" x2="1" y2="1"><stop stop-color="${field}"/><stop offset="1" stop-color="#071512"/></linearGradient></defs><rect x="1" y="1" width="98" height="98" rx="10" fill="url(#field)" stroke="#a18d60" stroke-width="1.5"/><path d="M12 7H35M65 93h23" stroke="${ink}" opacity=".6"/><g stroke="#071512" stroke-width="1.5" stroke-linejoin="round">${parts}</g><path d="M${12+seed%12} 88h${4+(seed>>>8)%8}" stroke="${ink}" stroke-width="2"/></svg>`;
}
export function originalIconUrl(recipe: OriginalIconRecipe, identity: string, size = 96): string {
  const key=`${identity}|${sizeOf(size)}`;
  const existing=cache.get(key); if(existing)return existing;
  const url='data:image/svg+xml,'+encodeURIComponent(originalIconSvg(recipe,identity,size));
  if(cache.size>=4096)cache.delete(cache.keys().next().value!);
  cache.set(key,url);return url;
}
export function paintOriginalIcon(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  recipe: OriginalIconRecipe, identity: string, size: number): void {
  const px=sizeOf(size), [field,ink]=color(recipe.bg), seed=hash(identity.replace(/\|\d+$/,''));
  ctx.save();ctx.scale(px/100,px/100);ctx.clearRect(0,0,100,100);
  const bg=ctx.createLinearGradient(0,0,100,100);bg.addColorStop(0,field);bg.addColorStop(1,'#071512');
  ctx.fillStyle=bg;ctx.beginPath();ctx.moveTo(11,1);ctx.arcTo(99,1,99,99,10);ctx.arcTo(99,99,1,99,10);ctx.arcTo(1,99,1,1,10);ctx.arcTo(1,1,99,1,10);ctx.closePath();ctx.fill();ctx.strokeStyle='#a18d60';ctx.lineWidth=1.5;ctx.stroke();
  ctx.strokeStyle=ink;ctx.globalAlpha=.6;ctx.beginPath();ctx.moveTo(12,7);ctx.lineTo(35,7);ctx.moveTo(65,93);ctx.lineTo(88,93);ctx.stroke();
  for(const p of placed(recipe)){
    ctx.save();ctx.globalAlpha=p.alpha ?? 1;ctx.translate(p.x ?? 0,p.y ?? 0);ctx.translate(50,50);ctx.rotate(p.rot ?? 0);ctx.scale(p.s ?? 1,p.s ?? 1);ctx.translate(-50,-50);
    ctx.fillStyle=color(p.pal ?? recipe.bg)[1];ctx.strokeStyle='#071512';ctx.lineWidth=1.5;ctx.lineJoin='round';
    for(const poly of subject(p.p)){ctx.beginPath();ctx.moveTo(poly[0],poly[1]);for(let i=2;i<poly.length;i+=2)ctx.lineTo(poly[i],poly[i+1]);ctx.closePath();ctx.fill();ctx.stroke();}
    ctx.restore();
  }
  ctx.globalAlpha=1;ctx.strokeStyle=ink;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(12+seed%12,88);ctx.lineTo(16+seed%12+(seed>>>8)%8,88);ctx.stroke();ctx.restore();
}
