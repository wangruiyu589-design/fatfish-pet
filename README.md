# 大肥鱼桌宠 · Big Fish Pet

蓝发鲸鱼女仆「大肥鱼」的 DeepSeek Harness Web UI 桌宠。她现在有了 **Live2D 式的分件骨骼**：会眨眼、呼吸、摇鲸尾、甩头发、看你鼠标、做表情和动作；还可用当前 DeepSeek 模型陪你聊天、记得你、被你摸头、拖来拖去。

> 角色原设 **溟月（上善无形）**，DeepSeek 女仆二创 **ZipZipPipe**。当前 Live2D rig 源自 **Pal-AI-Lab/Coopanion**（AGPL-3.0），详见 [live2d/NOTICE.md](live2d/NOTICE.md) 与 [art/whale/ATTRIBUTION.md](art/whale/ATTRIBUTION.md)。这是本机个人集成，若要再分发请先处理角色与 AGPL 授权。

## 现在有什么

- **Live2D 式身体**：26 个分件、弹簧头发 / 裙摆 / 鲸尾 / 鲸鳍 / 呆毛、眨眼、呼吸、视线跟随、鼠标悬停、口型、粒子（爱心、眼泪、Zzz、音符）。默认 DeepSeek 蓝女仆配色。
- **表情与动作**：23 种表情（眨眼、兴奋、慌张、嘟嘴、得意、担心、认真、害怕、哭、满足等）；动作面板换成了真正有区别的 9 个：挥手、鞠躬、跳舞、送心心、害羞、打哈欠、生气、坐下、东张西望。去掉了「转圈 / 跳一下 / 扑腾 / 蹦高」几个除了高度几乎一样的动作；送心心会真的冒爱心，害羞会先脸红再发抖，打哈欠会犯困，生气会跺脚。做动作前会先转向你的鼠标方向，不再固定朝一边演。
- **保底形象**：WebGL 不可用 / rig 加载失败时，自动退回 8 张透明精灵图，不会变成空白。
- **自然走动（运动驱动）**：移动不是把立绘整体平移过去，而是让 Live2D 身体自己走：真实步频、身体起伏、手臂摆动、头发裙摆鲸尾的惯性；偶尔小跑冲刺（带刹车打滑），跑完有小概率来个前空翻；还会自己停下东张西望、原地坐下打盹。聊天时她会走到聊天面板旁边，被拎起来、甩出去、落地都有物理反应。整个页面都是她的地面，拖到哪都行。
- **抢白饭小游戏（新）**：点「投喂」后，光标处会冒出一个冒热气的饭团碗，白饭会跟着光标跑。她先是眼睛冒星星「白饭！！」，然后真的追着跑：够不到时伸手去够、跳起来抓，跑太急会绊倒——摔得轻就马上爬起来继续追，摔得重会趴一会儿再慢慢坐起来哭，点她可以哄（吹吹）；一直逗她 16 秒抓不到，她会生气「不追了！你根本在耍我！」，接下来十几秒不理你、也不让摸。真抓到就「抢到啦！啊呜——」加饱腹/心情/羁绊，还会冒爱心。**玩的时候随时右键就可以把白饭收走**；如果她正在追，收走会把她惹毛。
- **性格 / 好感度 / 脾气（新）**：第一次打开会让你选她的性格底色（温柔体贴 / 傲娇嘴硬 / 元气活泼 / 冷淡高冷 / 病娇潜质），也可以再用一句话自由微调（这句会写进她的人设，影响聊天语气）。初始好感度 **60**，触摸、投喂、陪玩、聊天、接受帮忙都会涨，冷落、收走白饭、拒绝帮忙会掉。低于 60 会变冷、话变少、偶尔「……」，低于 45 会自己从桌面消失（快捷键和召唤按钮都叫不出来，只能等她自己回来）；高于 80 会黏人、靠近鼠标、并在你连续打字干活时探头问「要帮忙吗？」——答应后她会直接打开聊天，用当前模型给你可执行的下一步建议。
- **人格引擎（新，不只是三条数值）**：
  - **大五人格（OCEAN）**：开放性、尽责性、外向性、宜人性、情绪敏感度，由初始性格模板 + 自定义描述生成；每次「反思」只允许小幅漂移（±3），所以性格是慢慢变的，不会因为一次事件就变个人。
  - **连续心情**：愉悦度（-100~100）、唤醒度、紧张度会随事件起伏，并按自己的基线慢慢回落；饿、累、被忽略、被夸都会改变心情。心情会直接换表情、影响随机动作、生气阈值和聊天语气。
  - **需要与关系**：归属感 / 自主 / 胜任三个需要，以及信任 / 怨气 / 安全感三条关系轴；缺归属会想被关注，缺胜任会想帮忙，怨气高会别扭带刺。
  - **用户模型**：会记住你对她的响应速度、关心程度、常在的时段，作为预测式行为（要不要主动搭话、要不要帮忙）的依据。
  - **可学习的事件评价层**：每种事件（摸头、投喂、收白饭、陪玩、帮忙、忽略、被摔）都有一个「敏感度权重」，会随经历在线更新——同一件事反复发生，她的反应会越来越像“这个人专属的她”。
  - **反思（深度模型回路）**：每积累约 12 个事件或约 45 分钟，她会调用宿主的预训练模型做一次人格反思：综合 OCEAN、心情、需要、关系、用户模型和最近事件，输出小幅人格漂移、自我认知、几条信念；设置面板里也有「让她想想」按钮手动触发。聊天时这些状态会一起进入 system prompt，所以聊久了语气真的会变。
- **AI 即时反应 + Agent 回路（新）**：
  - 接入宿主的当前模型做「反应导演」：关键事件（摸头、投喂、抢到白饭、被收走白饭、接受/拒绝帮忙、被摔、被长时间忽略）以及安静时的后台时刻，会带着她当前的人格/心情/关系/用户印象去请求模型，返回结构化的 **emotion / action / intent / line / moodDelta / relationDelta / memory / agentMessage**，再由页面执行——她的表情、动作、台词和下一步行为都由模型即时给出，而不是固定台词表。
  - 当模型认为这件事需要主 Agent 知道（例如“主人忙了很久没理我”“我帮不上忙很不安”“主人把白饭收走了”），会通过 `/fatfish-pet/feedback` 把 feed 队列投递给当前活跃的主 Agent 会话；Agent 收到后按自己的流程处理（回复、执行任务、调整行为都可）。
  - 同时注册了 Agent 工具 **`pet_feedback`**：Agent 可以主动拉取她最近的反馈和页面状态，回答宠物相关问题时不用猜。
  - 成本与频率：即时反应有 20 秒节流，转移给 Agent 有 4 分钟节流；宿主端也有速率限制。设置里有 **「AI 即时反应」** 和 **「反馈给 Agent」** 两个开关，默认开启，可随时关掉；页面会显示「即时反应 N 次 / 交给 Agent N 次」。
  - 隐私：只发送她自己的性格/心情/关系/事件类型，不发送页面正文、聊天记录或文件内容；模型与 Agent 通讯都在本机 loopback。
- **生气模式（新）**：被收走白饭、被疯狂戳、被冷落或被拒绝帮忙都会让她生气一段时间。生气时会换好几张臭脸、不吃投喂、不让摸，还会**在你的页面上贴黄色便利贴挡住文字、发出不满的哼声**；哄好了才收工。病娇性格被长期忽略后可能「黑化」，最坏会用一个全屏的「桌面锁」挡住你，说「对不起」或「我喜欢你」才让开（也有 90 秒自动放行和「冷静一下」按钮，绝不会真的锁死系统）。
- **缩放**：鼠标悬停在她身上滚轮可以放大/缩小，右键菜单里也有「放大一点 / 缩小一点 / 恢复大小」，大小会记住。
- **聊天**：双击她 / 悬停按钮 / 右键菜单打开。人设是嘴硬心软的鲸鱼女仆；会记住最近 20 句对话、你的称呼和最近发生的事，刷新后还在。
- **模型桥接**：当前默认模型，通过 Host 的 `/fatfish-pet/chat` SSE 流式回答；失败时自动切到本地台词引擎。
- **语音（实验）**：设置里可开「念出来」（浏览器 TTS）；当前环境支持 Web Speech Recognition 时，输入框旁会出现语音按钮，说完自动发送。
- **养成**：饱腹 / 精力 / 心情 / 羁绊；投喂白饭、玩鲸尾、打盹、摸摸都会影响状态。
- **键鼠交互**：悬停、单击摸头、双击聊天、拖动、甩出、右键菜单、快捷按钮、动作面板、滚轮缩放；`Alt+Shift+F` / `Alt+Shift+C`，聚焦后的 `Enter` / 方向键。说话气泡不会再被悬停选项框盖住。
- **藏起来也能找回来**：右键「藏起来」后，页面右下角会留下一个「召唤大肥鱼」小胶囊按钮，点它或按 `Alt+Shift+F` 就能叫她回来；刷新页面也会自动出现。
- **不挡事**：只有她、按钮和聊天面板接收点击，其余区域穿透。

## 和参考项目的关系

研究过：

- B 站 **Pal AI Lab《【全动态Live2D】⚡大肥鱼桌宠！？⚡》**（BV1E6aq6pEpz）及其后续「大肥鱼」系列。
- GitHub **Pal-AI-Lab/Coopanion** 的 `cortico-world-desktop-pet`：透明置顶 Electron 桌宠、Live2D 式分件 rig、8 套配色 / 3 套服装、气泡、屏幕边行走、戳/摸/拎/甩、ASR + TTS、`pet_say` / `pet_ask` / `pet_move_to` / `pet_act` 等 Agent 工具、独立短会话记忆、状态气泡。
- `feiyu-chat-companion`：基于前台窗口标题的主动搭话、独立短会话、隐私开关。

**这次的 Live2D rig 复用了 Coopanion 的 `web/whale` 分件模型、`web/kit/body.js` 与 `web/kit/rig.js`**（AGPL-3.0），并将其打包进本插件；同时保留我们自己写的 React 浮层、聊天、养成、记忆、TTS/ASR 和精灵保底。参考视频与本插件的关系、署名和许可见 `live2d/NOTICE.md`。

## 使用

已通过 Plugin Manager 安装到 `desktop` profile（`@local/fatfish-pet`，enabled）。**如果页面还是旧形象，刷新一次页面**，让新的 Client bundle 和 Live2D rig 生效。

- 模型：跟随 Harness 当前默认模型；切换默认模型后，下一次对话立刻使用。
- 数据：名字、称呼、四项状态、位置、开关、声音开关和最近 20 句聊天保存在 `localStorage` 的 `dsh.fatfish-pet.state.v1`；「清空对话」会清掉持久化聊天。
- 模型桥接只发送你输入的文字、最近对话和宠物状态，不读取会话内容或工作区文件。
- 接口只接受同源请求；GUI 保持在 `127.0.0.1` / loopback 时最安全。
- 卸载：设置 → 插件 → 禁用 / 移除「大肥鱼桌宠」；或用 Plugin Manager 管理这个本地 bundle。

## 快捷键

| 快捷键 | 作用 |
| --- | --- |
| `Alt+Shift+F` | 显示 / 隐藏大肥鱼 |
| `Alt+Shift+C` | 打开 / 关闭聊天 |
| `Enter` / `Space`（她聚焦时） | 摸摸头 |
| 方向键（她聚焦时） | 挪一小步 |
| `Esc` | 关闭菜单 / 设置 / 聊天 |
| `Enter`（聊天输入框） | 发送 |

## 结构与构建

```
fatfish-pet/
  package.json              # dsh.bundle.patch + dsh.client
  cordis.patch.yml          # 插入 fatfish-pet 行
  index.js                  # Host：/fatfish-pet 路由 + 素材服务 + ctx.llm SSE 桥 + 人设
  HOST.md                   # Host / Client 线协议
  client.js                 # 构建产物（Client half）
  live2d-bundle.js          # esbuild 产出的 Live2D rig IIFE
  live2d/                   # DeepSeek maid 的 model.json + tex/ + feat/ + AGPL 许可
  live2d-src/               # 打包进 live2d-bundle.js 的 rig/body 源码（AGPL）
  src/client.template.js    # Client 源码
  src/ui.css                # 宠物 UI / 精灵 / 表情 / 聊天样式
  art/whale/                # 精灵保底、头像、构建脚本、署名
  build.mjs                 # 内联精灵表/rig 和 CSS，产出 client.js
  icon.png                  # 插件图标
  locale/{zh,en}.json       # 插件显示名与描述
```

修改 `src/client.template.js`、`src/ui.css` 或 `art/whale/` 后：

```powershell
node build.mjs
```

修改 `live2d-src/` 后，用 esbuild 重新打包 rig：

```powershell
node_modules\.bin\esbuild src/live2d-entry.js --bundle --format=iife --global-name=FatFishLive2D --minify --target=chrome110 --outfile=live2d-bundle.js
```

让新的 Client bundle 进到页面里通常需要重新 enable 一次 bundle（或刷新/重启）：

```powershell
dsh plugin --profile desktop disable @local/fatfish-pet
dsh plugin --profile desktop enable @local/fatfish-pet
```

## 验证情况

- 语法：`index.js`、`client.template.js`、`live2d-bundle.js`（Node 求值导出检查）、生成的 `client.js` 均通过。
- Host：`GET /fatfish-pet/health` 200 且 `ai: true`；`POST /fatfish-pet/chat` 已跑通 `meta → delta* → done`，人设能输出 `[emo:...][act:...]` 和 `shy` 等表情。
- 素材：`/fatfish-pet/assets/live2d/model.json`、`tex/hair_back.png` 均 200；Live2D rig 已在页面中报告 `client.live = "live"`（scheme `deepseek-maid`），说明 WebGL 分件身体成功挂载，不是精灵保底。
- 运动驱动：Live2D 身体挂在整屏地面上，由 kit 的步态系统自己走/跑。页面心跳可看到 `mode=walk → run → sit → idle` 的切换，同一个心跳采样里 `x` 会随步态连续变化（例如 x=605 walk → x=280 run），说明位置来自身体运动而不是 DOM 匀速滑行。
- 与页面协作：聊天/菜单/打盹时自动关掉自由游动并走到聊天面板旁；关闭后恢复自主行动；点击会叫停当前动作并唤醒打盹的她。
- 抢白饭小游戏：实测页面心跳能读到 `rice=chase bowl=1 mode=crouch`（她正跳起来抓举高的白饭），随后出现「抢到啦！啊呜——」并回到 `rice=off`；动作面板和右键菜单都已换成新版。
- 缩放：心跳里 `zoom=1.20` 说明滚轮/菜单缩放确实把立绘放大到了 1.2 倍；大小写入 localStorage。
- 摔倒/生气：白饭追不到 16 秒会进入 `angry`（转头不理人），摔得重时先 `tumble` 趴地再坐下哭；点她可以哄。临时验证接口已移除。
- 人格反思：直接 `POST /fatfish-pet/reflect` 用一组低好感 + 被忽略的快照做验证，返回了 `traitDeltas {E:-1,A:-1,N:+1}`、`beliefs`「被冷落时，我会有点不安」、`selfNarrative`「我嘴上不说，但被忽略时还是希望被多看一眼。」，说明反思回路与自由文本人设都真的通了。
- AI 即时反应：`POST /fatfish-pet/brain` 用“被忽略两小时”的上下文验证，模型返回了 `{emotion:"pout", action:"sit", intent:"sulk", line:"你忙你的，我不吵你了。", memory:"又被晾着了，这已经是第三次。"}`，页面心跳随后出现 `brain=1`，说明模型给出的反应真的被页面执行了。
- Agent 回路：`POST /fatfish-pet/feedback` 实测返回 `delivered:true`，消息已进入当前活跃 Agent 会话；`pet_feedback` 工具已在 Agent 工具列表中注册并成功调用（返回最近反馈 + 页面心跳）。
- 说明：宿主模型在这里充当“预训练的性格网络”（定期反思 + 即时反应导演），浏览器里另有一层会在线更新的事件评价权重；没有在浏览器里做反向传播训练（那需要长期数据和 GPU，插件做不到），但性格漂移、心情动力学、需要与关系、用户模型都是持续保存、会真实影响行为和聊天语气的。
- 视觉：本机可以用 Windows 截图 + PrintWindow 做验证，已确认立绘、白饭、动作、缩放都正常渲染；页面被遮挡时 Chromium 会暂停动画帧，切回页面即恢复。

## 下一步可以创新什么

1. **桌面级透明置顶窗口**：Electron 独立宿主、多显示器、任务栏覆盖、全局热键、托盘；Web UI 只能做页面内浮层（当前）。
2. **让 Agent 指挥宠物**：给 DSH coding agent 注册 `pet_say` / `pet_move_to` / `pet_act` / `pet_status`，让她播报“正在读文件 / 等你审批 / 测试挂了 / 写完了”，成为编程过程的情绪界面。
3. **只读上下文的主动陪伴**：不读正文，只订阅 DSH 的 turn/tool/approval 生命周期；在你卡住、测试失败或连续专注太久时递白饭/提醒休息。
4. **独立人格记忆**：关系里程碑、她自己的日记、白饭账本，与主会话解耦；可导出/迁移。
5. **语音全链路**：流式 ASR + 情感 TTS + 唤醒词 + 打断，并把 `talk()` 接到音节口型。
6. **玩法**：接 Token 小游戏、白饭互动、桌面赛跑/弹珠、换装与配色系统（Coopanion 有 8 套配色/3 套服装可借鉴）、可导入形象包。
7. **屏幕感知（强隐私开关）**：用户明确授权后截图给视觉模型，让她真的“看见”你在做什么。

### Agent 怎么用

右键桌宠 →「让她想想办法」，或点聊天右上角 ✨；也可以直接在聊天里发「帮我… / /agent …」。她会先思考，再把结果写进聊天记录；文件读写/命令需要先在设置里提高 Agent 权限并填写工作区。权限 0 只给建议、记忆和提醒；1 可联网搜索/抓网页并读工作区；2 可写；3 可执行命令。网页回答会附来源链接，Agent 长回答只进聊天记录，不再用大气泡挡桌面。设置 → Agent 高级参数里可以调最大步数、搜索条数、网页正文上限、超时、回答长度、模型温度和联网开关。只有开启「任务交给主 Agent」时才会转交任务。

### AI 模型与 Agent 权限

设置面板里可以配置：

- **AI 模型**：选择 Harness 中已注册的 provider/model（默认跟随 Harness 默认模型）；宠物聊天、即时反应、人格反思和 Agent 都用它。
- **Agent 权限**（由宿主按请求强制检查）：
  | 等级 | 能力 |
  | --- | --- |
  | 0 · 只能聊天 | 对话、表情、动作、记忆、提醒；不能读文件 |
  | 1 · 只读工作区 | 加上 list_dir / read_file，只能读配置的工作区 |
  | 2 · 读写工作区 | 加上 write_file，只能写工作区 |
  | 3 · 完全授权 | 加上 run_command，可在工作区根目录执行命令 |
- **工作区**：文件与命令工具的根目录；未填写时文件工具不可用。路径越界会被宿主拒绝。

安全设计：权限与工作区参数随每次 Agent 请求发送，宿主在 `handleAgent` / `runAgentTool` 里再次校验，不依赖模型自觉；命令有 30 秒超时和输出上限；默认权限是 0。

## 独立桌面版（standalone/）

不依赖 DSH 的 Electron 桌面宿主，位于 `standalone/`。**全屏透明覆盖层**：桌宠可以在整块屏幕上自由走动，鼠标移出她/面板/右上角控制条时自动点击穿透，不会挡住桌面操作：

- 透明、无边框、置顶的小窗口（默认 560×560，右下角）；
- 托盘图标、`Alt+Shift+F` 显示/隐藏；
- 首次启动进入设置页：API Base URL、API Key、模型、工作区；
- 自带本地 HTTP 服务：health / models / chat / brain / reflect / agent / config；
- 支持任意 OpenAI Chat Completions 兼容接口（DeepSeek、OpenAI、本地 Ollama 等）；
- Agent 权限 0~3 由本地宿主强制校验（0 只能聊天，3 可执行工作区命令）。

启动：

```powershell
cd standalone
pnpm install
pnpm build:boot
pnpm start
```

打便携包：`powershell -File package-portable.ps1`，产物在 `standalone/dist/FatFish/FatFish.exe`。

详细说明与验证见 [standalone/README.md](standalone/README.md)。

发布包：`standalone/dist/FatFish-portable.zip`（SHA256 `DE257CFE494D3FBCF8F8F601DC68E91A49FE12EBF147C4CC59C412AEC755C9A7`）。

## 开源与二次开发

本项目按 **AGPL-3.0-or-later** 发布，完整文本见 [LICENSE](LICENSE)。主要原因：Live2D 身体与场景来自 Coopanion（AGPL-3.0），与其组合分发需要保持同一许可证；请保留 `live2d/NOTICE.md` 与 `art/whale/ATTRIBUTION.md` 的署名。

### 目录

```
index.js              Host 插件：HTTP 路由、模型调用、agent 循环
src/client.template.js  Client 源码，构建为 client.js
src/live2d-entry.js     rig 适配层
live2d-src/            Coopanion 派生的身体/物理/rig 源码（AGPL）
live2d/                构建后的模型、贴图与 NOTICE
art/whale/             立绘/头像与署名
docs/ARCHITECTURE.md   架构、数据流、扩展点
docs/AGENT.md          Agent 协议、工具与边界
docs/TEST-REPORT.md    最新测试报告与已知问题
```

### 从源码安装（DSH）

```powershell
cd fatfish-pet
node --check index.js
node build.mjs
plugin_manager  # 或 dsh plugin，把 @local/fatfish-pet 安装到 desktop profile
```

### 二次发行前请检查

1. 把 `package.json` 的 `name` 改成你自己的公开包名，并补上真实的 repository 地址；
2. 不要携带任何本地状态、聊天记录、API key、调试路由或开发桥接接口；
3. 保留 `LICENSE`、`live2d/NOTICE.md`、`art/whale/ATTRIBUTION.md`；
4. 如果替换立绘/模型，确认新素材的许可证与商用/再分发条款；
5. 明确告知用户：模型由宿主 Harness 提供，插件本身不保存远端密钥；所有网络请求走本机 loopback。

### 隐私

- 人格、关系、聊天与记忆保存在浏览器 `localStorage`，不写服务器数据库；
- 发给模型的是宠物自己的状态和事件标签，不包含页面正文、文件内容、剪贴板；
- 所有 HTTP 接口仅监听本机并由 Host 注入，带同源检查和速率限制。

### 路线图（欢迎 PR）

- 独立桌面宿主（Electron 透明置顶、多显示器、全局热键、托盘）；
- 每用户/每宠物独立模型选择与本地模型支持；
- 长期记忆导出/导入、关系里程碑与可她自己的日记；
- 语音全链路（流式 ASR + 情感 TTS + 口型）；
- 更完整的 Agent：独立宠物会话、可取消任务队列、只读的 DSH turn/tool 生命周期订阅；
- 换装/配色、形象包导入、跨设备同步（可选、端到端加密）。
