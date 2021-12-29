import * as PIXI from "pixi.js";

const ORIGINAL_SIZE = {
  width: 2048,
  height: 1261
} as const

const SONOLUS_SIZE = {
  width: 2048,
  height: 970
} as const

import baseImage from './assets/base.png';
import sideMaskImage from './assets/side-mask.png';
import maskWhiteImage from './assets/mask-white.png';
import dotTileImage from './assets/dot-tile.png';
import bottomMaskImage from './assets/bottom_mask.png';
import minusMaskImage from './assets/minus-mask.png';

export async function generate(jacketImage: Blob): Promise<Blob> {
  const blobToBase64 = (blob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const loader = new PIXI.Loader();
  loader
      .add('base', baseImage)
      .add('sideMask', sideMaskImage)
      .add('maskWhite', maskWhiteImage)
      .add('dotTile', dotTileImage)
      .add('bottomMask', bottomMaskImage)
      .add('minusMask', minusMaskImage)
      .add('jacket', await blobToBase64(jacketImage) )
  
  const app = new PIXI.Application(ORIGINAL_SIZE);

  const resource = await new Promise<PIXI.utils.Dict<PIXI.LoaderResource>>(res => loader.load((_, resource) => res(resource)));

  console.log(resource)

  const container = new PIXI.Container();

  const base = new PIXI.Sprite(resource.base.texture);
  container.addChild(base);
  
  const sideMask = new PIXI.Sprite(resource.maskWhite.texture);
  const sideL = new PIXI.SimplePlane(resource.jacket.texture, 2, 2);
  sideL.geometry.getBuffer("aVertexPosition").update([
    449,
    114,
    1136,
    99,
    465,
    804,
    1152,
    789
  ]);
  sideL.mask = sideMask;
  container.addChild(sideL);
  
  const sideR = new PIXI.SimplePlane(resource.jacket.texture, 2, 2);
  sideR.geometry.getBuffer("aVertexPosition").update([
    1018,
    92,
    1635,
    99,
    1026,
    756,
    1630,
    740
  ]);
  sideR.mask = sideMask;
  container.addChild(sideR);
  
  const jacket = new PIXI.SimplePlane(resource.jacket.texture, 2, 2);
  jacket.geometry.getBuffer("aVertexPosition").update([
    798,
    193,
    1252,
    193,
    801,
    635,
    1246,
    635
  ]);
  container.addChild(jacket);
  
  const dotTile = new PIXI.Sprite(resource.dotTile.texture);
  dotTile.alpha = 0.5;
  dotTile.mask = sideMask;
  dotTile.blendMode = PIXI.BLEND_MODES.MULTIPLY;
  container.addChild(dotTile);
  
  const reflection = new PIXI.SimplePlane(resource.jacket.texture, 2, 2);
  const bottomMask = new PIXI.Sprite(resource.bottomMask.texture);
  reflection.geometry.getBuffer("aVertexPosition").update([
    795 + 10,
    1152,
    1252 - 10,
    1152,
    795,
    713,
    1252,
    713
  ]);
  reflection.alpha = 0.2;
  reflection.mask = bottomMask;
  container.addChild(reflection);

  const minusMask = new PIXI.Sprite(resource.minusMask!.texture);
  // minusMask.alpha = 0.5;
  minusMask.blendMode = PIXI.BLEND_MODES.SCREEN;
  container.addChild(minusMask);

  app.stage.addChild(container);

  const result = PIXI.RenderTexture.create(SONOLUS_SIZE);
  
  app.renderer.render(container, {
  renderTexture: result,
  transform: new PIXI.Matrix(
    1,
    0,
    0,
    1,
    0,
    - (ORIGINAL_SIZE.height - SONOLUS_SIZE.height) / 2
  )
  });
  
  return new Promise(res => app.renderer.plugins.extract.canvas(result).toBlob(res))
}

