# Architecture

This document describes how the desktop pet is put together and where to extend it.
The project is a DSH/Cordis plugin bundle: one Host half and one Client half.

## Runtime pieces

| Piece | File(s) | Responsibility |
| --- | --- | --- |
| Host plugin | `index.js` | HTTP API under `/fatfish-pet`, LLM calls, assets, agent loop, telemetry |
| Client bundle | `src/client.template.js` → `client.js` | React overlay, chat, menus, mood engine, speech pipeline, agent client |
| Live2D rig | `live2d-src/` → `live2d-bundle.js` | Coopanion-derived body/physics, walk/run/tumble, arm reach, expressions |
| Assets | `live2d/`, `art/whale/` | model JSON, textures, avatar, credits |

The Host serves the client bundle under `/fatfish-pet/assets/` and mounts the client
into the `shell.overlay` slot. The client renders a transparent full-viewport stage; the
rig's feet own the floor position, so movement is produced by gait physics rather than
CSS translation.

## Data flow

```
browser events ──► client mood/speech engine ──► UI (bubble / face / gesture)
       │                     │
       │                     ├─ POST /brain  (instant reaction director)
       │                     ├─ POST /agent  (bounded tool-using pet agent)
       │                     ├─ POST /reflect (slow personality reflection)
       │                     └─ POST /client-state (diagnostics heartbeat)
       ▼
localStorage "dsh.fatfish-pet.state.v1"
```

The Host only ever receives the pet's own state and interaction labels. It never reads
the page DOM, chat history, files, or clipboard.

## Personality model (client)

Persistent `soul` object (versioned in localStorage):

- **OCEAN** Big Five traits seeded from a persona preset or free-text description;
  changed in small steps by reflection only.
- **Mood** valence/arousal/stress with decay toward a baseline.
- **Needs** belonging / autonomy / competence.
- **Relation** trust / resentment / security.
- **User model** responsiveness / care / presence / active hours (EMA).
- **Appraisal weights** learned online from repeated events.
- **Emotion** derived from OCC-style appraisal scores.
- **Mood stage** one of `joyful / calm / low / angry / shy / clingy / scared`.
  A stage owns its expression pool; stage changes drop the previous pool.
- **Memory, beliefs, self-narrative** written by events and reflection.

### Speech pipeline

`say(text, emotion?)` → `styleSpeech`:

1. Keyword-intent inference (`greet / happy / sad / angry / shy / love / proud / hungry / tease / ...`).
2. Persona table `PERSONA_SPEECH[persona][intent]` → `[face, gesture]`, so the same
   sentence is delivered differently by each personality.
3. Mood-stage tint (low mood dims positive lines; angry stage turns neutral lines pouty).
4. Explicit line emotion wins over tinting.
5. Bubble duration and face lock share one timer; a gesture starts with the line.

`PERSONA_SHY` / `PERSONA_TAIL` override the generic intent for head pats and tail
touches, so "shy" is never a single canned shiver.

### Expression controller

A single 1.3s tick chooses the face:

- current speech reaction, if any;
- otherwise a random face from the **current mood stage pool**, held 3.6–7.2s;
- the kit's own random-expression decision is disabled so it cannot race the controller.

## Agent

See [AGENT.md](AGENT.md). In short: `/fatfish-pet/agent` runs a bounded (max 4 steps)
ReAct-style loop with a fixed tool set and returns UI actions. The client executes them
as bubble/gesture/memory/reminder actions. Optional delegation into the main coding
agent is off unless the user enables it.

## Persistence and privacy

- All personality/relationship/chat state is local (`localStorage`), keyed by browser
  origin. No server database.
- The Host has no persistence of its own (except in-memory recent feedback for the
  `pet_feedback` tool).
- All endpoints are loopback and same-origin checked; request bodies are size-limited.
- Model calls use the Harness' currently selected model; there is no bundled API key.

## Extending

- **New Host endpoint**: add a route in `index.js` near the other paths, keep same-origin
  and a rate limit, return JSON.
- **New persona**: add a preset in `PERSONAS`, a speech table entry in `PERSONA_SPEECH`
  (and optionally `PERSONA_SHY` / `PERSONA_TAIL`), plus idle lines.
- **New gesture/face**: add tokens to `ACTIONS`/`EMOTIONS`, map them in `LIVE_ACTION` /
  `LIVE_EMOTION`, then back them in the rig.
- **New agent tool**: add the name to `AGENT_TOOLS`, describe it in the Host system
  prompt, handle it in `runAgentTool`, and handle the returned action kind in client
  `applyAgentAction`.
