# 大肥鱼 · 独立桌面版 / Standalone Desktop

A standalone Electron host for the FatFish desktop pet. It does **not** require DSH or a
development server: it starts its own local HTTP host, loads the pet UI in a full-screen
transparent always-on-top overlay (with click-through outside interactive UI), and talks
directly to any OpenAI-compatible model endpoint configured by the user.

## What works

- Full-screen frameless transparent overlay: she can roam the whole primary display
- Click-through when the pointer is not over her, the dock, chat, settings or menus
- Frosted top-right dock with 模型设置 / 隐藏 / 退出
- Redesigned first-run setup (presets, key masking, connection test, workspace)
- Tray icon + `Alt+Shift+F` show/hide
- First-run setup page: API Base URL / API Key / model / workspace
- Live2D rig and all pet UI/behaviors (same client bundle as the plugin)
- Local endpoints: health, models, chat, brain, reflect, agent, config
- Pet Agent with permission levels 0–3 (chat only → read → write → run commands),
  enforced by this host before any tool runs
- State persists in the browser profile (localStorage)

## Requirements

- Windows 10/11 (other platforms untested)
- Node.js 18+ for development; packaged builds bundle Electron
- An OpenAI-compatible chat API key (DeepSeek, OpenAI, local Ollama, etc.)

## Install / run (development)

```powershell
cd standalone
pnpm install          # if pnpm policy blocks electron/esbuild postinstall:
                      # node node_modules/electron/install.js
pnpm build:boot       # builds renderer/boot.js (React + client shim)
pnpm start            # opens the pet window
```

If Electron cannot be downloaded in your network, set a mirror first:

```powershell
$env:ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
node node_modules/electron/install.js
```

The first launch opens `/setup`; enter the API Base URL (`https://api.deepseek.com/v1`),
API key, model, and optionally a workspace. The key is stored only in
`standalone/config.json`.

## 安装 / 发布 / Install & release

便携包：

```powershell
powershell -ExecutionPolicy Bypass -File build-release.ps1
# 产物: dist/FatFish-portable.zip + .sha256
```

安装到当前用户（无需管理员，保留旧配置）：

```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
# 可选: -InstallDir "D:\Apps\FatFish" -AutoStart
```

卸载：开始菜单里的「卸载大肥鱼」，或运行安装目录下的 `uninstall.ps1`。

## Browser-only run (no Electron)

```powershell
node server.js
# open http://127.0.0.1:8231/app  (or /setup)
```

This is useful for debugging the UI, but does not give a transparent desktop window.

## 怎么使用 Agent

1. 右键桌宠，点「让她想想办法」，会弹出一个任务输入框；
2. 输入你想让她做的事，或点「看看工作区 / 帮我理思路 / 提醒我休息」快捷建议；
3. 她会先思考，然后在聊天记录里给出结果，重要进度会用 toast 提示；
4. 文件/命令能力需要先在设置里开启 Agent 权限并填写工作区；
5. 任务超出能力且已开启「任务交给主 Agent」时，她会转交；否则会直接说明限制。

示例：

| 权限 | 可以这样问 |
| --- | --- |
| 0 · 只能聊天 | 「25 分钟后提醒我休息」「帮我理一下明天的优先级」 |
| 1 · 只读 | 「看看工作区 package.json 的项目名和版本」 |
| 2 · 读写 | 「把刚才的总结写到 notes/today.md」 |
| 3 · 完全授权 | 「在工作区跑一下 npm test，把失败的用例告诉我」 |

截图：[任务输入框](shot-agent-ask.png)

## Permission matrix

| Level | Agent can |
| --- | --- |
| 0 · 只能聊天 | talk, emote, act, remember, remind, delegate |
| 1 · 只读 | + list/read files inside the configured workspace |
| 2 · 读写 | + write files inside the workspace |
| 3 · 完全授权 | + execute commands with the workspace as cwd (30 s timeout) |

Paths are resolved inside the workspace and rejected when they escape. Nothing runs
unless the user raises the level in the pet settings (or config), and level 3 is a real
shell execution with your OS account privileges — treat it as full trust.

## Packaging (next step)

- Ship `standalone/` + `client.js` + `live2d/` + a bundled Electron runtime.
- Replace the placeholder tray/branding icon.
- Add code signing and an installer (electron-builder / NSIS) for public distribution.
- Keep AGPL-3.0-or-later and the Live2D NOTICE/ATTRIBUTION files.

## Known limitations

- Window position is fixed to bottom-right; custom drag/resize is not implemented yet.
- No tray autostart option yet.
- Reminders run only while the page is open.
- The standalone host currently supports one OpenAI-compatible provider at a time.

## 验证情况（2026-11-03）

界面截图：[设置页](shot-setup-new.png) · [全屏桌宠与控制条](shot-overlay-final.png) · [聊天面板](shot-overlay-chat.png) · [Agent 任务框](shot-agent-ask.png) · [沉睡状态](shot-deep-sleep.png)

- **全屏覆盖层**：Electron 窗口 `1280×752` CSS（整块屏幕），桌面截图可见 DSH 窗口在桌宠/控制条后面正常显示；
- **点击穿透**：在空白区域进行 OS 级点击会落到 Windows 任务栏（触发了显示桌面），证明非交互区域不拦截鼠标；
- **首启流程**：设置页填写后保存，窗口自动切换为桌宠 overlay，`/app` 加载 Live2D；
- **新 UI**：设置页双栏玻璃卡、预设/测试连接/工作区；聊天面板 420px 玻璃卡；顶部控制条；人格选择弹窗重做；
- 自动化测试仍为 **13/13 PASS**；

- 本地服务：health / models / config / app / setup / client.js / boot.js 均 200；
- Electron 窗口：便携包安装到临时目录后，通过交互式计划任务启动 `FatFish.exe`，成功截图主界面；
- 人格选择 + 持久化：CDP 驱动点击「傲娇嘴硬」→ 保存；localStorage 记录 `configured=true, persona=tsundere`；重启应用后弹窗不再出现，状态保留；
- 聊天闭环：在 Electron 窗口内打开聊天、输入并发送消息，mock 模型回复显示在对话框（`你好呀，我是本地测试模型。`）；
- 安装器：复制安装、保留旧 config、桌面/开始菜单快捷方式、HKCU 开机自启均已实测；
- 权限：`node test-standalone.mjs` 13/13 PASS（chat SSE、brain、reflect、agent、权限 1/2/3、路径穿越、无工作区）；
- 便携发布包：`dist/FatFish-portable.zip`，SHA256 `DE257CFE494D3FBCF8F8F601DC68E91A49FE12EBF147C4CC59C412AEC755C9A7`；
- 关键修复：补齐 `decayMood`、固定端口 47821 保证 localStorage 跨重启、安装器兼容 BOM 配置、单实例锁；
- 仍需人工：真实 API Key 聊天、托盘/快捷键逐项确认、代码签名与干净机器安装。

