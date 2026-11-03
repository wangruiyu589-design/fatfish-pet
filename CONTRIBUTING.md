# Contributing

Thanks for helping the whale maid. A few rules keep the project shippable.

## Before you open a PR

1. `node --check index.js src/client.template.js` passes.
2. `node build.mjs` succeeds and `client.js` is regenerated (do not hand-edit it).
3. If you changed the rig, rebuild `live2d-bundle.js` with the command in the README.
4. Run the app and check `/fatfish-pet/health` reports `live` and a fresh `build=`.
5. Do not commit `client.js` hand edits, generated screenshots, personal state, or keys.

## Scope

- Host behavior goes in `index.js`; keep same-origin checks and rate limits on new routes.
- UI/behavior goes in `src/client.template.js`.
- Rig changes go in `live2d-src/` and must be rebuilt into `live2d-bundle.js`.
- New personas need: `PERSONAS`, `PERSONA_SPEECH`, optional `PERSONA_SHY`/`PERSONA_TAIL`,
  idle/angry lines, and locale strings.

## Licensing of contributions

By contributing you agree to license your changes under AGPL-3.0-or-later, consistent
with the repository. Art and rig assets have their own attribution files; do not add
third-party assets without a compatible license and an attribution note.
