/**
 * Live2D-style whale-maid body bundle.
 *
 * This entry is bundled by esbuild into `live2d-bundle.js` (IIFE, global
 * `FatFishLive2D`). The plugin's plain-JS Client module calls
 * `FatFishLive2D.mountLivePet(root, options)`; textures and model.json are
 * served by the Host under `/fatfish-pet/assets/live2d/`.
 *
 * The body is mounted on a viewport-sized stage so its own walk/run physics
 * move her across the whole screen: the kit's legs, speed ramps, step bob and
 * skid are what the page sees, instead of a DOM transform sliding a still body.
 */
import { createWhaleFigure } from '../live2d-src/whale/figure.js'
import { createBody } from '../live2d-src/kit/body.js'
import { createRig } from '../live2d-src/kit/rig.js'

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`texture failed: ${url}`))
    image.src = String(url)
  })
}

export async function mountLivePet(root, options = {}) {
  const floorPad = Math.max(0, Math.min(80, Number(options.floorPad) || 12))
  let width = Math.max(240, Number(options.width) || 1266)
  let height = Math.max(160, Number(options.height) || 745)
  const assetBase = new URL(options.assetBase || '/fatfish-pet/assets/live2d/', location.href)
  const model = await (await fetch(new URL('model.json', assetBase), { cache: 'force-cache' })).json()
  const figure = await createWhaleFigure(assetBase, {
    model,
    scheme: options.scheme || 'deepseek',
    kit: { createRig },
    loadImage,
  })
  const bounds = {
    W: width,
    H: height,
    floorY: height - floorPad,
    S: Math.max(0.4, Math.min(1.2, Number(options.scale) || 0.68)),
    minX: 0,
    maxX: width,
    minY: 0,
  }
  const startX = Number.isFinite(Number(options.startX))
    ? Number(options.startX)
    : width * 0.55
  const host = {
    root,
    bounds: () => bounds,
    emit: (kind, detail) => { try { options.onEvent?.(kind, detail) } catch (error) { /* ignore */ } },
    sound: () => {},
    start: {
      x: Math.max(0, Math.min(width, startX)),
      facing: options.facing === -1 ? -1 : 1,
    },
  }
  const body = createBody(host, { figure })
  body.set?.({ roam: false, dialogOpen: false })
  return {
    body,
    figure,
    step(dt) { body.step(Math.min(0.05, Math.max(0.001, dt))) },
    layout() { return body.layout?.() },
    do(word) { try { body.do?.(word) } catch (error) { /* ignore */ } },
    set(state) { try { body.set?.(state) } catch (error) { /* ignore */ } },
    pointer(type, point) { try { body.pointer?.(type, point) } catch (error) { /* ignore */ } },
    drop(point) { try { body.drop?.(point) } catch (error) { /* ignore */ } },
    cue(kind) { try { body.cue?.(kind) } catch (error) { /* ignore */ } },
    talk() { try { body.talk?.() } catch (error) { /* ignore */ } },
    /** Trips her over (a real fall held on the floor, then get up). */
    tumble(opts) { try { return body.tumble?.(opts) } catch (error) { return false } },
    /** Stretches her arms toward something (amount 0..1; opts.high for overhead). */
    reach(amount, opts) { try { body.reach?.(amount, opts) } catch (error) { /* ignore */ } },
    /** One floating heart from the kit's particle layer. */
    emitHeart() { try { body.emitHeart?.() } catch (error) { /* ignore */ } },
    setExpr(name, seconds) { try { body.setExpr?.(name, seconds) } catch (error) { /* ignore */ } },
    /** Rescales the whole figure (wheel zoom); the stage bounds stay the viewport. */
    setScale(next) {
      const scale = Math.max(0.35, Math.min(1.15, Number(next) || bounds.S))
      if (Math.abs(scale - bounds.S) < 0.0005) return
      bounds.S = scale
      try { body.resize?.() } catch (error) { /* ignore */ }
    },
    /** Grows/shrinks the stage with the window; the body clamps back into it. */
    resize(nextWidth, nextHeight) {
      width = Math.max(240, Number(nextWidth) || width)
      height = Math.max(160, Number(nextHeight) || height)
      bounds.W = width
      bounds.H = height
      bounds.maxX = width
      bounds.floorY = height - floorPad
      try { body.resize?.() } catch (error) { /* ignore */ }
    },
    scheme() { return figure.scheme },
    destroy() {
      try { body.dispose?.() } catch (error) { /* ignore */ }
      try { figure.dispose?.() } catch (error) { /* ignore */ }
    },
  }
}
