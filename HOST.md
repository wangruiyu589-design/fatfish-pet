# fatfish-pet Host half — wire contract

`index.js` is the Host half of the `@local/fatfish-pet` bundle. It owns one
`prefix` HTTP route on the Harness web server and bridges the floating pet's
chat to the currently selected default model (`ctx.llm`), streaming the reply
back over Server-Sent Events.

This document is the contract the Client half (`client.js`) codes against.
Change the two together.

- **Plugin file:** `fatfish-pet/index.js` (plain ESM, no imports, no dependencies)
- **Exports:** `apply(ctx)` and `export const inject = ['llm', 'webServer', 'agentDefaultModel']`
- **No `Config` export**; the patch row needs no config.
- **Route:** `ctx.webServer.register({ kind: 'prefix', path: '/fatfish-pet', handler })`,
  registered inside `ctx.effect(() => ..., 'fatfish-pet HTTP routes')` so it is
  removed when the plugin fiber unloads.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/fatfish-pet/health` | cheap capability probe |
| `POST` | `/fatfish-pet/chat` | SSE stream of one persona reply |

Matching is by pathname inside the mounted prefix: `/fatfish-pet/health` and
`/fatfish-pet/chat` are exact; any other subpath returns `404`. Query strings are
ignored for routing. Other methods on a known path return `405` with an `Allow`
header (`GET` or `POST`).

Request policy applied to **both** endpoints, in this order:

1. Parse the URL (failure → `400 bad_request`).
2. Path must be one of the two endpoints (otherwise `404 not_found`).
3. Same-origin check (failure → `403 forbidden_origin`). When the request has an
   `Origin` header, its `scheme://host:port` must equal
   `ctx.webServer.getOrigin()`. Requests without `Origin` are allowed (same-origin
   GETs and CLI probes do not send it). `Origin: null` and any other origin fail.
4. Method check (`405 method_not_allowed`).

No CORS headers are ever sent. No cookies or credentials are read; none are
echoed in any response.

### `GET /fatfish-pet/health`

```http
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
cache-control: no-store
```

```json
{ "ok": true, "ai": true, "provider": "deepseek-official", "model": "deepseek-v4-flash", "pet": "fatfish-pet" }
```

- `ai` is `true` **only** when `ctx.agentDefaultModel.currentSelection()` yields a
  non-empty `provider` **and** `model`, **and** that provider currently appears in
  `ctx.llm.listProviders()`. Anything else (no default selection, unregistered
  provider, model-less selection) is `false`.
- `provider` / `model` are the raw default-selection strings, or `null` when the
  selection is missing or unreadable. They are reported even when `ai` is `false`,
  so the UI can show what is configured.
- `pet` is always the literal `"fatfish-pet"`.
- Health requests are **not** rate limited; it is safe to poll (e.g. every 30 s).

### `POST /fatfish-pet/chat`

The accepted request body (JSON, `Content-Type` is not enforced):

```json
{
  "message": "大大肥鱼，我回来啦！",
  "history": [
    { "role": "user", "text": "今天加班好累。" },
    { "role": "pet", "text": "那我把泡泡让给你靠。" }
  ],
  "pet": {
    "name": "大肥鱼",
    "userName": "主人",
    "emotion": "happy",
    "hunger": 72,
    "energy": 41,
    "happiness": 66,
    "affinity": 80,
    "time": "2026-11-03 15:30",
    "events": ["主人今天没吃午饭", "鱼缸刚换过水"]
  }
}
```

Only `message` is required. The Host validates, clamps and truncates instead of
failing on soft problems; it fails only on structural problems.

| Field | Rule | Host behavior on violation |
|---|---|---|
| whole body | raw bytes ≤ **64 KiB** (`content-length` pre-checked, then streaming counted) | `413 body_too_large` |
| `message` | must be a string | `400 invalid_message` |
| `message` | 1..**500** Unicode code points after trimming; control chars → spaces | empty → `400 empty_message`; longer → truncated to 500 |
| `history` | array of `{role: 'user'\|'pet', text: string}` | non-array → `[]`; invalid entries skipped |
| `history` length | at most the last **12** raw entries | extra older entries dropped |
| `history[].text` | ≤ **300** code points | truncated; empty-after-trim entries skipped |
| `pet` | plain object | missing/non-object → defaults |
| `pet.name` | string ≤ **32** code points; `[` `]` stripped | default `"大肥鱼"` |
| `pet.userName` | string ≤ **32** code points; `[` `]` stripped | default `"主人"` |
| `pet.emotion` | one of the 12 emotion tokens (below), case-insensitive | default `"happy"` |
| `pet.hunger` / `energy` / `happiness` / `affinity` | number clamped to **0..100**, rounded | default 50 / 60 / 70 / 20 |
| `pet.time` | string ≤ **64** code points; `[` `]` stripped | `""` (prompt shows 「时间未知」) |
| `pet.events` | array of strings ≤ **5** entries, each ≤ **80** code points | non-array → `[]`; extras dropped |

Control characters (`U+0000`–`U+001F`, `U+007F`–`U+009F`, line separators) are
replaced with spaces everywhere. Square brackets are stripped only from the
label fields (`name`, `userName`, `time`, each event) so client-supplied text
cannot forge the persona control line.

#### JSON error responses (non-SSE)

Any of these means the request never became an SSE stream:

| Status | `error` | When |
|---|---|---|
| `400` | `invalid_json` | body is not parseable JSON |
| `400` | `invalid_body` | JSON is not a plain object |
| `400` | `invalid_message` | `message` missing or not a string |
| `400` | `empty_message` | `message` is empty/whitespace after trimming |
| `400` | `bad_request` | request URL could not be parsed |
| `403` | `forbidden_origin` | `Origin` present and not the server origin |
| `404` | `not_found` | path inside the prefix that is not an endpoint |
| `405` | `method_not_allowed` | wrong method (response carries `Allow`) |
| `413` | `body_too_large` | body > 64 KiB |
| `429` | `rate_limited` | > **12** chat requests / **20 s** per remote address |
| `429` | `too_many_streams` | > **3** concurrent chat streams per remote address |
| `500` | `internal_error` | unexpected Host failure (defensive catch-all) |

Shape:

```json
{ "ok": false, "error": "invalid_json", "message": "请求不是合法的 JSON。" }
```

`405` responses add `allow: GET` / `allow: POST`; `429` responses add
`retry-after: <seconds>`.

## SSE stream contract

Once the request has been accepted, the response is **always** SSE (status
`200`), even when the model is unavailable or the call fails; failures are
reported as an `error` event, never as a non-200 status.

```http
HTTP/1.1 200 OK
content-type: text/event-stream; charset=utf-8
cache-control: no-cache, no-transform
x-accel-buffering: no
x-content-type-options: nosniff
```

Every event is one `data: <json>\n\n` block (JSON is compact, one line).
Comment-only heartbeat blocks (`: ping\n\n`) are written every ~15 s while the
stream is idle; SSE clients ignore comment lines, but a naive parser must skip
blocks that do not start with `data:`.

### Event sequence

1. **`meta`** — always first, exactly once:

   ```json
   {"type":"meta","provider":"deepseek-official","model":"deepseek-v4-flash"}
   ```

   `provider` / `model` are `null` when no default selection is readable.

2. **`delta`** — zero or more, one per model text chunk:

   ```json
   {"type":"delta","text":"[emo:love][act:spin]\n主人你回来啦，"}
   ```

   The forwarded text is the raw model output, **including the control line**;
   the Client accumulates deltas and parses/strips the control line itself.
   Reasoning deltas, tool-call deltas and block boundary chunks are **not**
   forwarded.

3. **Terminal event** — exactly one of:

   - success (including `max-tokens` truncated output):

     ```json
     {"type":"done","usage":{"inputTokens":123,"outputTokens":21,"totalTokens":144}}
     ```

     `usage` is the adapter's `TokenUsage` object when it arrived, else `{}`.
     For a `max-tokens` finish there is additionally `"partial": true`.

   - failure **after** at least one delta (partial reply was rendered):

     ```json
     {"type":"done","partial":true}
     ```

   - failure **before** any delta:

     ```json
     {"type":"error","code":"AUTH","message":"钥匙不太对，我的嘴被锁住了。"}
     ```

   - client disconnect (browser aborted): no terminal event is written; the
     Host aborts `ctx.llm.stream` and just ends the connection. The Client should
     treat its own abort as final and not wait for `done`.

Code values possible on the `error` event:

| `code` | Meaning |
|---|---|
| `AI_UNAVAILABLE` | no usable default model / provider adapter right now |
| `EMPTY_REPLY` | model finished without any text |
| `TIMEOUT` | Host watchdog aborted the call after 90 s with no usable text |
| `AUTH`, `MISSING_CREDENTIAL`, `INVALID_CREDENTIAL` | model credential problems |
| `RATE_LIMIT` | provider-side rate limit |
| `QUOTA`, `ACCOUNT_QUOTA` | provider/account quota exhausted |
| `NO_ADAPTER` | provider route has no adapter (should already be `AI_UNAVAILABLE`) |
| `CONTEXT_WINDOW_EXCEEDED` | request too large for the model |
| `LLM_ERROR` | any other/unknown model failure |

`message` is always friendly Chinese produced by the Host; raw provider error
text and credentials are never forwarded. The Client should render `message` and
may classify by `code`.

### Example transcript

```
data: {"type":"meta","provider":"deepseek-official","model":"deepseek-v4-flash"}

data: {"type":"delta","text":"[emo:love][act:spin]\n"}

data: {"type":"delta","text":"主人你可算回来啦，"}

data: {"type":"delta","text":"我尾巴都快摇断了，快看看有没有带小零食。"}

data: {"type":"done","usage":{"inputTokens":321,"outputTokens":28,"totalTokens":349}}

```

## Model output grammar (Client-side parsing contract)

The persona is instructed to always start its reply with exactly one control
line, then the spoken text:

```
[emo:<emotion>][act:<action>]
<1–2 short sentences, ≤ 60 CJK characters>
```

- `emotion` ∈ `happy, love, shy, curious, thinking, sleepy, hungry, surprised, annoyed, sad, proud, dizzy`
- `action` ∈ `none, wiggle, spin, bounce, shake, nod`

The Host does **not** validate or repair the control line; it streams raw text.
The Client should parse tolerantly (model output can drift):

- Match the first control line with something like
  `/^\s*\[emo:([a-z]+)\]\s*\[act:([a-z]+)\]\s*\n?/i` after accumulating the text.
- Unknown token → keep the pet's current emotion and `act: 'none'`.
- If no control line is found, render the whole text and use the current state.
- Never display the control line itself in the speech bubble.

## What the Host sends to the model

- Provider/model: `ctx.agentDefaultModel.currentSelection()`, after the
  `listProviders()` registration check.
- `ctx.llm.stream({ provider, model, system, messages, temperature: 0.95, maxTokens: 320, signal })`
  - `system`: strong Chinese persona prompt for 「大肥鱼」 — a chubby blue-haired whale-maid companion
    fish in the DSH UI; playful, gluttonous, affectionate, a little sassy; short
    conversational replies; never a customer-service voice; never claims to be an
    AI/assistant; uses state/time/events/history; requires the control line;
    forbids Markdown/code fences/emoji; includes two short examples.
  - `messages`: exactly one request-only user turn
    (`[{role:'user',content:[{type:'text',text}]}]`) containing the clock, pet
    state, recent events, recent history and the user's message, in that order.
    (Single user turn keeps the request free of durable assistant messages, which
    the `llm` service does not accept for request-only input.)
  - `reasoningEffort` is **deliberately omitted**: the stored default selection
    may name an effort the model rejects, and the persona reply does not need it.
  - `maxTokens: 320`, `temperature: 0.95`.
- The `AbortController.signal` is aborted when the HTTP response closes, when the
  client stops accepting writes, or when the 90 s Host watchdog fires.

## Security and resource bounds

- **Same-origin only** for browser requests (`Origin` compared to
  `ctx.webServer.getOrigin()`); no CORS response headers.
- **No credentials in the request path**: no API key or token is read, stored,
  logged or echoed. LLM failures are logged as `code` + `status` only; any Host
  exception log is redacted (`sk-…`, bearer tokens, `token=`/`key=` params) and
  truncated to 200 chars.
- **Bounded input**: 64 KiB body, 500-char message, 12 history turns, 5 events.
- **Bounded load**: 12 chat requests / 20 s and 3 concurrent streams per remote
  address; `/health` is cheap and unlimited.
- **Clean termination**: every handler path ends or errors the response exactly
  once; all handler rejections are caught (the webserver never sees a throw).
- The route has no authentication beyond the same-origin check. The Harness HTTP
  listener binds loopback by default; do not bind it to a network interface while
  this plugin is mounted.

## Client integration notes

- Fetch the endpoints with **relative, same-origin URLs** from the Harness page:
  `fetch('./fatfish-pet/health')` / `fetch('./fatfish-pet/chat', ...)` or
  `new URL('/fatfish-pet/chat', location.origin)`.
  The page must be loaded from `ctx.webServer.getOrigin()`; loading the GUI under
  a different authority (e.g. `localhost` while the server advertises `127.0.0.1`)
  is rejected with `403`.
- For the stream, use `fetch` + `response.body.getReader()` (or `EventSource`
  cannot POST, so no). Decode SSE blocks, ignore `:` comments, stop on the first
  `done`/`error` event, and call `AbortController.abort()` when the pet bubble is
  closed or a new message supersedes the old one.
- Show a typing/“fish is thinking” state between POST and the first `delta`.
- `ai: false` on `/health` means the chat would immediately produce an
  `AI_UNAVAILABLE` error event — show the “go pick a model” hint instead of
  streaming.
- Treat HTTP errors as JSON `{ok:false,error,message}` and render `message` (or a
  local fallback for `429`/`403`); never retry a `403` in a loop.

## Verification performed (Host half only)

- `node --check E:\deepseek_make\fatfish-pet\index.js` → exit 0
  (Node v24.21.0 from `dsh-primary-runtime`; the script runs unchanged on the
  documented Node 22 runtime).
- Local harness against fake `webServer` / `llm` / `agentDefaultModel` services
  plus a real `node:http` server: 30/30 checks — health shape/`ai` gating,
  405/404/403/400/413/429 paths, SSE headers and event order, delta passthrough
  (reasoning not leaked), `done` usage, partial→`done partial`, terminal error
  sanitization (no provider message/secret in the stream), empty reply,
  max-tokens, client-abort → `AbortSignal` propagation, per-address rate limit,
  concurrency cap, clamping/truncation/defaults, and Unicode integrity.
- Not yet verified: end-to-end inside the installed profile (installation is the
  Lead's step; this Host half was not installed via `plugin_manager`).

## API uncertainties / notes for the Lead

1. `ctx.webServer.register`'s `WebRoute.handler` is documented as
   `(req: IncomingMessage, res: ServerResponse) => void | Promise<void>`; this
   implementation assumes the Node `http` server objects (via
   `ctx.webServer.register` in `@deepseek-ai/dsh-host-webserver`) and uses
   `writeHead`/`write`/`end`/`writableEnded`/`destroyed` on `res`. The SSE
   headers include `cache-control: no-transform` so the web server's optional
   gzip never buffers the stream (the webserver README explicitly exempts SSE).
2. `ctx.llm.listProviders()` is treated as **synchronous** (its inspect signature
   has no `Promise`), matching the Host bridge contract.
3. `agentDefaultModel.currentSelection()` is treated as synchronous and is
   wrapped in `try/catch`; `reasoningEffort` is ignored on purpose.
4. `StreamChunk` handling assumes the documented shapes: `text-delta` carries
   `{index, text}`, `usage` carries `{usage}`, `finish` carries
   `{reason:{kind, failure?}}`; every stream is documented to end with exactly one
   `finish`, but an adapter/middleware throw is also handled as a failure.
   `usage` is forwarded verbatim; the Client must not depend on extra token
   fields.
5. The persona's control-line grammar lives in three places and must stay in
   sync: `index.js` (`EMOTIONS`/`ACTIONS` + system prompt), this document, and
   the Client parser.
6. Electron file:// loading vs. HTTP origin: the contract above assumes the page
   is served by the Harness web server (the shipped Web GUI case). If the Client
   ever runs from a `file://` document, `fetch('/fatfish-pet/...')` has no HTTP
   origin; it must resolve the Host origin from the boot payload instead. Not
   needed for the current Web GUI deployment.


## 附加路由（v1.2 Live2D）

| 方法 | 路径 | 用途 |
|---|---|---|
| GET | /fatfish-pet/assets/live2d/<path> | 提供 live2d/ 下的 model.json、tex/*.png、feat/*.png；仅 GET/HEAD，路径越界/未知类型拒绝 |
| POST | /fatfish-pet/client-state | 页面诊断回传 {live, message}；仅用于确认 rig 是 live 还是精灵 fallback，不存敏感数据；/health 的 client 字段返回最后状态 |

/health 现在额外带 client: { live, message, at } | null，方便排查 Live2D 是否成功挂载。
