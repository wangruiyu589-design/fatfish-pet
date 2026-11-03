# Pet Agent

The pet has a small, bounded agent loop so "帮忙" is not just a chat completion.

## Why bounded

A desktop pet runs on the same machine as the user and may be invoked often. An
unbounded autonomous agent would be expensive, hard to reason about, and a privacy
risk. The pet agent is therefore:

- **event driven** — only runs after an explicit user action (accepting help, context
  menu "让她想想办法", future triggers);
- **bounded** — max 4 steps, max ~30s per model call, one `finish` ends the run;
- **tool-using** — it must emit a tool call each step, so its behavior is auditable;
- **side-effect free on the host** — tools only produce UI actions; no file edits,
  shell commands, or desktop control;
- **separate from the coding agent** — by default nothing is injected into the user's
  main chat. Delegation is a separate, opt-in action.

## 在界面里怎么用

- 聊天右上角 ✨ 按钮：打开「让她帮忙」任务框；
- 直接聊天：消息以「帮我/帮忙/请帮我/你帮我/能不能帮我」开头时，会自动交给 Agent；也可以输入 `/agent 任务`；
- 普通聊天（问候、撒娇）仍走 persona 聊天，不会乱触发 Agent。

- 入口：右键桌宠 →「让她想想办法」；会打开任务输入框，可直接输入目标或用快捷建议。
- 前提：设置里开启「Agent 模式」；文件操作需要把「Agent 权限」提到 1 以上并填写工作区。
- 结果：她先在气泡里回应，然后把完整回应追加到聊天记录；工具调用进度用 toast 显示。
- 转交：只有开启「任务交给主 Agent」时才会走 delegate；否则她会明确说明能力边界，不会假装完成。
- 典型任务：查看/总结工作区文件、写笔记、设置提醒、执行工作区命令、整理下一步计划、联网搜索并引用来源。
- 联网工具：`web_search` + `web_fetch`，权限 >= 1 时开放；回答中会列出 URL。
- 展示：Agent 的长回答只写入聊天记录，避免在桌宠上方出现很长的气泡。

## 可调参数

设置 →「Agent 高级参数 / 休眠」：

| 参数 | 默认 | 范围 | 作用 |
| --- | --- | --- | --- |
| 最大工具步数 | 6 | 1-20 | 资料研究深度/耗时 |
| 搜索条数 | 4 | 1-10 | 每次 web_search 返回结果 |
| 网页正文上限 | 6000 | 1000-20000 | 单次 web_fetch 保留字符 |
| 单步超时 | 45s | 10-180 | 模型/工具等待上限 |
| 回答长度 | 1200 | 200-4000 | Agent 回答写入聊天的长度 |
| 模型温度 | 0.6 | 0-1.2 | 发散程度 |
| 联网工具 | 开 | 开/关 | 关闭后不提供 web_search/web_fetch |
| 息屏后沉睡 | 开 | 开/关 | 息屏/锁屏/挂起时进入沉睡 |
| 无操作休眠 | 15min | 0-120，0=关 | 无输入后自动沉睡 |

## 沉睡机制

- 插件版：visibilitychange 隐藏 + 无操作定时器；
- 独立版：额外监听 Electron powerMonitor 的 lock-screen / suspend / unlock-screen / resume；
- 沉睡时：中断 Agent 请求、暂停心情/大脑/主动发言 tick、关闭聊天/设置/任务框、桌宠变暗并显示睡眠状态；解锁或任意输入自动唤醒。

## Protocol

Host: `POST /fatfish-pet/agent`

```json
{
  "goal": "主人接受了你的帮忙请求……",
  "context": { "task": "当前任务标题", "trigger": "help_accept" },
  "state": { "persona": "tsundere", "moodStage": "low", "favor": 62, "mood": { "...": 0 } }
}
```

Response:

```json
{
  "ok": true,
  "actions": [
    { "kind": "say", "text": "哼，卡住就歇一下嘛。", "emotion": "pout", "action": "" },
    { "kind": "remember", "note": "主人写代码卡住时会皱眉" },
    { "kind": "remind", "minutes": 25, "text": "起来喝口水" },
    { "kind": "delegate", "task": "把 tests/foo.test.ts 的失败用例修掉" }
  ],
  "steps": [ { "thought": "...", "tool": "say", "args": { "...": "" } } ],
  "summary": "关心并给出一条建议"
}
```

The model emits one JSON command per step:

```json
{ "thought": "...", "tool": "say|act|remember|remind|delegate|finish", "args": { } }
```

The Host parses a strict JSON object first; if the stream is truncated it falls back to
regex extraction of `tool`/`text`/`emotion`/`action`, and finally to treating plain text
as a `say` line. This keeps a long-thinking model from producing an empty run.

## Tools

| Tool | Args | Effect |
| --- | --- | --- |
| `say` | `text` ≤80, optional `emotion`, optional `action` | bubble + face + gesture |
| `act` | `action` | play one gesture |
| `remember` | `note` ≤40 | append to the pet's long-term memory |
| `remind` | `minutes` 1–180, `text` ≤40 | in-page reminder while this tab stays open |
| `delegate` | `task` ≤160 | opt-in hand-off to the main coding agent |
| `finish` | `summary` | end the run |

## Client execution

`runPetAgent(goal, context)` posts the request and applies actions sequentially
(~1.4s apart) through `applyAgentAction`:

- `say` → existing speech pipeline (persona + mood + face/gesture lock);
- `remember` → persisted memory entry;
- `remind` → browser timer + toast;
- `delegate` → `POST /fatfish-pet/feedback` **only if** the "任务交给主 Agent" setting
  is on; otherwise she says she has noted it.

## Limitations / roadmap

- Current tools do not touch the desktop or filesystem. Real computer use should be a
  separate, permissioned capability, not implicit in the pet.
- The agent is not a long-lived planner; each run is independent. Cross-run goals and
  cancellations would need a small queue.
- Delegation currently delivers a single message to the most recent live root Agent.
  A dedicated pet session (so the main chat stays clean) is the next step.
- For an open-source distribution, the model is whatever the host provides
  (`ctx.llm`). A per-user model selection can be added to the plugin Config.

## Permissions

The request carries a permission level and workspace root; the Host re-validates both
before any tool runs. The model never gets a tool it is not allowed to call.

| Level | Allowed tools |
| --- | --- |
| 0 | say, act, remember, remind, delegate, finish |
| 1 | + list_dir, read_file (inside workspace) |
| 2 | + write_file (inside workspace) |
| 3 | + run_command (workspace cwd, 30s timeout, output caps) |

Paths are resolved relative to the workspace and rejected when they escape it. If no
workspace is configured, file/command tools are unavailable even at level 1–3.

## Model selection

The client stores `modelSelection: { provider, model }` in the local soul state and
sends it with chat/brain/reflect/agent requests. The Host uses it when both fields are
present, otherwise falls back to `agentDefaultModel.currentSelection()`. The settings
panel lists providers/models via `GET /fatfish-pet/models`.

