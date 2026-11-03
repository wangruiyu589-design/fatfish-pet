# 测试报告 / Test Report — 大肥鱼桌宠

| 项目 | 值 |
| --- | --- |
| 版本 / build | 0.1.0，`build=13:11:32`（本轮修复后为最新构建；以 `/fatfish-pet/health` 为准） |
| 测试日期 | 2026-11-03 |
| 环境 | Windows，DSH 桌面版 Web GUI，`http://127.0.0.1:62352`，视口 1266×745，DPR 2 |
| 模型 | 默认 `deepseek-account / deepseek-flash`；可用模型目录由 `/fatfish-pet/models` 返回 |
| 插件 | `@local/fatfish-pet`，profile `desktop`，Live2D rig `live` |
| 测试方式 | 命令行 HTTP 探测 + 心跳采样 + 源码断言 + 人工页面观察 |

---

## 1. 测试范围

1. 构建/语法完整性
2. Host 接口（health / models / brain / reflect / agent / chat / client-state）
3. Client 启动与 Live2D 挂载
4. 表情/动作触发稳定性（本轮重点）
5. 台词—表情—动作一致性
6. 右侧动作面板性格化
7. AI 模型选择
8. Agent 权限分级（0/1/2/3）
9. Agent 工具循环
10. 人格/记忆/设置持久化
11. 开源文件与许可证
12. 安全与隐私边界

---

## 2. 结果总览

| # | 测试项 | 结果 | 说明 |
| --- | --- | --- | --- |
| 1 | `node --check` 全部源码 | PASS | index.js、client.template.js、client.js、live2d-entry.js、live2d-bundle.js、body.js、figure.js |
| 2 | 构建 `node build.mjs` | PASS | 生成 `client.js` 约 908 KB（含内联 rig、CSS、头像） |
| 3 | `GET /fatfish-pet/health` | PASS | `ok: true, ai: true`，`client.live = "live"`，build 时间持续刷新 |
| 4 | `GET /fatfish-pet/models` | PASS | 返回 2 个 provider 及模型；`current` 正确 |
| 5 | 页面心跳 | PASS | frame 递增，mode/brain/zoom 字段可读 |
| 6 | 动作稳定性采样（40 s） | PASS | 20 次采样全部 `mode=idle`，`mode_switches=0`，未再出现乱跳动作 |
| 7 | 表情触发条件 | PASS（本轮修复） | 气泡期间锁定台词表情；舞台表情 9–16 s 才随机一次；闲置动作不再和表情抢时序 |
| 8 | 台词—表情匹配 | PASS | 每句台词先经过 `styleSpeech`（意图 + 性格 + 心情）再出脸，气泡与表情同寿 |
| 9 | 性格化动作面板 | PASS（代码断言 + 人工观察） | 9 动作 × 5 性格均有脸/手势/台词表 |
| 10 | 摸头/尾巴按性格 | PASS | 5 性格各自的 `PERSONA_SHY` / `PERSONA_TAIL` |
| 11 | 模型选择 | PASS | 设置面板可选 provider/model；请求携带 `modelSelection` |
| 12 | 权限 0（聊天） | PASS | 读文件请求被拒，改为 delegate；不再谎称“看完了” |
| 13 | 权限 1（只读） | PASS | 执行 `read_file`，返回工具状态 + 台词 |
| 14 | 权限 2（读写） | 部分验证 | 代码路径存在；自动写文件未做端到端实测 |
| 15 | 权限 3（执行命令） | 部分验证 | 代码路径 + 30 s 超时/输出上限；未自动触发真实命令测试 |
| 16 | Agent 工具循环 | PASS（P0/P1 路径） | 单次 6 步上限；工具结果回喂；结束有兜底台词 |
| 17 | 人格反思 `/reflect` | PASS（早前实测） | 返回 traitDeltas / beliefs / selfNarrative |
| 18 | 即时反应 `/brain` | PASS（早前实测 + 心跳计数） | 心跳 `brain` 持续增长 |
| 19 | localStorage 持久化 | PASS（人工） | 刷新后性格/好感/设置保留 |
| 20 | 开源文件 | PASS | LICENSE (AGPL-3.0)、NOTICE、ATTRIBUTION、ARCHITECTURE、AGENT、CONTRIBUTING |
| 21 | 生产构建无调试接口 | PASS | 未发现 dev 桥接/调试路由 |
| 22 | 独立安装包 | NOT DONE | 当前是 DSH 插件；独立 Electron 宿主是下一阶段 |

---

## 3. 本轮修复：动作/表情乱套

### 根因

1. `say()` 对每一句台词都自动调用 `runAction()`，每次开口都会切换一次身体动作；
2. 闲置循环（每 26 s）与 `maybeMoodMotion()`（每 30 s tick）两套调度同时动作；
3. 舞台表情每 3.6–7.2 s 随机换一次脸，频率过高；
4. 事件表情（悬停/闲置/生气）可以在气泡显示期间覆盖台词脸；
5. Agent/反馈兜底在 delegate 后仍说“看完了”，语义错误。

### 修复

- 台词只负责脸，不再隐式触发动作；手势只由明确交互（摸头/动作面板/帮厨）显式请求；
- 闲置循环只说话，不再执行动作；动作统一由 `maybeMoodMotion` 调度（22 s 冷却，气泡/动作期间跳过）；
- 舞台表情 9–16 s 才换一次，气泡期间保持当前脸；
- `flashEmotion()` 在气泡期间默认忽略非强制来源；
- 低心情摔倒概率从 30% 降到 12%，跑动需距离 >200 px；
- Agent 兜底台词按“delegate / 读到内容 / 普通成功 / 失败”分别生成。

### 验证证据

40 秒心跳采样：

```
idle/17 idle/17 idle/17 idle/17 idle/17 idle/17 idle/17 idle/17 idle/17 idle/17
idle/17 idle/17 idle/17 idle/17 idle/17 idle/17 idle/17 idle/17 idle/17 idle/17
mode_switches=0 distinct=idle
```

---

## 4. 接口测试明细

### 4.1 `GET /fatfish-pet/models`

```json
{"ok":true,"providers":[
 {"id":"deepseek-official","name":"DeepSeek","models":[
   {"id":"deepseek-flash","name":"DeepSeek-V4.1-Flash"},
   {"id":"deepseek-v4-pro","name":"DeepSeek-V4-Pro"}]},
 {"id":"deepseek-account","name":"DeepSeek Account","models":[ ... ]}],
 "current":{"provider":"deepseek-account","model":"deepseek-flash","usable":true}}
```

### 4.2 Agent 权限 0（只能聊天）

请求：读工作区 `package.json`。实测响应（修复后）：

```json
{"ok":true,"permission":0,"workspace":true,
 "actions":[{"kind":"say","text":"哼，文件在 E:\\deepseek_make 里躺着，可我这权限……目前还碰不了它，别笑我。","emotion":"shy"}],
 "steps":[{"thought":"权限只有0，不能假装读到","tool":"say","args":{...}}]}
```

判定：PASS。没有执行文件工具，没有谎称已读；模型也可以选择 delegate，并在 delegate 前说明原因。

### 4.3 Agent 权限 1（只读）

```json
{"ok":true,"permission":1,"workspace":true,
 "actions":[
   {"kind":"tool","text":"读取 fatfish-pet/package.json"},
   {"kind":"say","text":"看完了，我记下了。","emotion":"content","action":"nod"}
 ],
 "steps":[{"thought":"先读这个文件。","tool":"read_file","args":{"path":"fatfish-pet/package.json","maxBytes":2000}}]}
```

判定：PASS。宿主执行了 `read_file`，返回工具状态 + 台词。

### 4.4 权限矩阵（代码路径）

| 权限 | 工具 | 实测 |
| --- | --- | --- |
| 0 | say/act/remember/remind/delegate/finish | PASS |
| 1 | + list_dir/read_file | PASS |
| 2 | + write_file | 代码就绪；未自动触发写文件 |
| 3 | + run_command（30 s 超时，输出截断） | 代码就绪；未自动触发命令 |

路径越界、未配置工作区、内容 >200 KB 会被宿主拒绝。

---

## 5. 表情与动作测试

| 场景 | 期望 | 实测 |
| --- | --- | --- |
| 说难过台词 | 表情 sad/cry 持续到气泡关闭 | PASS（气泡与脸同寿） |
| 说完台词回到心情 | 回到当前 mood stage 表情池 | PASS（舞台控制器接管） |
| 阶段变化 | 旧阶段脸不再出现 | PASS（stageFace 池随阶段切换） |
| 生气 | 表情按阶段轮换 + 哼声 | PASS（确定性轮换） |
| 摸头（不同性格） | 各性格不同脸/手势/台词 | PASS（代码表；人工观察傲娇/元气） |
| 摸尾巴（不同性格） | 慌张/生气/独占等差异 | PASS（代码表） |
| 动作面板 9 按钮 | 每个都是性格化脸/手势/台词 | PASS（代码断言 `PERSONA_ACTIONS`） |
| 空闲 40 s | 不出现动作乱跳 | PASS（0 次 mode 切换） |
| 心情低落 | 慢走/坐下/偶尔摔倒后自己起来 | 代码就绪；摔倒恢复由 2.5 s 定时器驱动 |
| 摔倒被点 | 被安慰后起身，心情回升 | 代码就绪；未自动实测 |

---

## 6. 已知问题与限制

1. **独立软件尚未完成**：目前是 DSH 插件，需要宿主 Harness 才能运行；独立 Electron 宿主/安装器/托盘/置顶窗口是下一阶段目标。
2. **权限 3 未做真实命令端到端测试**：结构、超时、输出上限已实现，但本次没有让模型真的执行命令（避免动到本机文件）。
3. **写文件无备份/撤销**：公开版本前应加 git 状态检查或备份目录。
4. **权限为同源本地信任**：Host 按请求参数校验，但本机同源页面理论上可伪造权限；不是对抗恶意本地进程的安全边界。
5. **提醒只在页面打开期间有效**：关闭页面后定时器消失。
6. **模型选择未做存在性校验**：下拉来自真实目录；手改 localStorage 填错模型会调用失败。
7. **Agent 单次 6 步、无长期任务队列**：复杂任务会中途停；重复任务需要重新触发。
8. **Live2D 资产 AGPL**：分发必须保持 AGPL-3.0-or-later 并保留 NOTICE/ATTRIBUTION。
9. **动作/表情仍依赖现有 rig 单元**：更丰富的性格动作需要新增动画 clip。

---

## 7. 复现命令

```powershell
# 语法
node --check index.js
node --check src/client.template.js

# 构建
node build.mjs

# 健康
Invoke-WebRequest http://127.0.0.1:62352/fatfish-pet/health

# 模型
Invoke-WebRequest http://127.0.0.1:62352/fatfish-pet/models

# Agent 权限 0
# POST /fatfish-pet/agent { goal, permission:0, workspace:"E:\deepseek_make" }
```

---

## 8. 下一轮测试计划

1. 真实 API Key 下的 chat/brain/reflect/agent 联测；
2. 快捷键 / 托盘 / 开机自启在真实桌面会话逐项验收；
3. 断网 / 模型不可用 / 超时 / 429 降级；
4. 长时间（2 h）表情、动作、记忆稳定性；
5. 多显示器 / DPI 缩放 / 遮挡；
6. 命令注入、超长输出、符号链接越界等安全测试；
7. 安装器快捷方式 / 卸载 / 升级保留配置验证；
8. 干净机器完整安装流程。

## 9. 独立桌面版（本轮新增）

| 测试项 | 结果 | 说明 |
| --- | --- | --- |
| 全屏透明覆盖层 | PASS | Electron 窗口 1280×752 CSS 覆盖主屏；桌面截图可见底层窗口正常显示 |
| 点击穿透 | PASS | OS 级点击空白区域落到 Windows 任务栏（触发显示桌面），非交互区域不拦截鼠标 |
| 顶部控制条 | PASS | 模型设置 / 隐藏 / 退出 显示与点击逻辑就绪 |
| 首启设置 → 桌宠 | PASS | CDP 填写保存后 setup 窗口关闭，overlay `/app` 加载 Live2D |
| 新版设置页 | PASS | 双栏玻璃卡、预设、Key 显隐、测试连接、工作区折叠 |
| 新版聊天面板 | PASS | 420px 玻璃面板，消息/输入/发送重设计 |
| Electron 安装包启动 | PASS | 临时安装 + 交互式计划任务启动 FatFish.exe，capturePage 成功 |
| 人格选择 / 持久化 | PASS | CDP 保存人格；重启后 localStorage 中 configured/persona 保留 |
| 聊天闭环（mock 模型） | PASS | Electron 内输入消息，对话显示模型回复 |
| 安装器 / 快捷方式 / 自启 | PASS | 桌面与开始菜单快捷方式、HKCU Run 均实测 |
| 升级保留配置 | PASS | 重复 install 后 config.json 内容保留 |
| 权限工具 | PASS 13/13 | chat SSE / brain / reflect / agent / 权限 1-3 / 路径穿越 / 无工作区 |
| 发布包 | PASS | dist/FatFish-portable.zip，SHA256 9FD659...4E74 |
| 真实 API Key 聊天 | 未验证 | 测试使用 mock LLM；需用户真实 key |
| 托盘 / 快捷键 | 代码就绪 | 未在真实桌面会话逐项验收 |

## 10. 本轮修复的缺陷

1. 独立版从固定 560×560 窗口改为**全屏透明覆盖层**，桌宠可在整屏移动；
2. 增加不拦截桌面的点击穿透逻辑：指针不在宠物/面板/控制条上时自动 `setIgnoreMouseEvents`；
3. 全屏重做设置页（双栏玻璃卡、预设、测试连接）、聊天面板（420px）、顶部控制条、人格弹窗；
4. 增加 Show Desktop 最小化后的自动恢复，避免按 Win+D 后宠物消失；
5. 补齐缺失的 `decayMood()`、固定端口 47821、BOM 配置兼容、单实例、升级保留配置。

## 11. 本轮体验修复

| 项 | 修复 |
| --- | --- |
| 设置无法关闭 | 设置面板增加右上角 X 关闭按钮，底部保留取消/保存 |
| 设置超出窗口 | 改为 420px 宽、top 74px、max-height calc(100vh - 86px)，内部滚动，头部与底部操作栏 sticky |
| 心情掉太快 | 心情衰减 12%/45s 改为 5%/90s；被忽略 10min 后每 2.5min 扣心情改为 25min 后每 8min；单次忽略扣分降低；AI 反应负向 moodDelta 减半 |
| 面板字体/对比度 | 强调色固定钴蓝，表面从页面底色派生，用户气泡实心蓝底白字，设置/聊天/菜单字体层级统一 |

发布包：SHA256 371EB8550771EE6C64760B89116251841265CE4777B58F5B115F8FA7A5E54770

## 12. Agent 可用性

| 测试项 | 结果 | 说明 |
| --- | --- | --- |
| 右键入口 | PASS | 「让她想想办法」打开任务输入框（420px，窗口内，带权限提示和快捷建议） |
| 权限 1 实际执行 | PASS | 请求读取 fatfish-pet/package.json，返回 tool 状态 + 实际内容摘要「@local/fatfish-pet / 1.3.0 ...」 |
| allowDelegate=false | PASS | 工具列表不再提供 delegate，避免无效转交 |
| 结果可见性 | PASS | Agent 的 say 会进入聊天记录并显示气泡；工具进度 toast |
| 聊天自动路由 / ✨ 按钮 | PASS | 「帮我…」开头或 `/agent` 会在 Agent 模式开启时转给 Agent；普通聊天不劫持 |
| 工作区为空警告 | PASS | 权限>0 但工作区为空时，设置页明确提示文件/命令不可用 |
| 旧版“没反应”根因 | 已修 | 旧入口使用固定泛化目标、默认权限 0、delegate 关闭；现在改为可输入目标并真实执行允许的工具 |

发布包：SHA256 371EB8550771EE6C64760B89116251841265CE4777B58F5B115F8FA7A5E54770

## 13. Agent 协议修复（API 调用层）

| 问题 | 修复 |
| --- | --- |
| 模型一次输出两个 JSON，旧解析用 first { 到 last }，必然 JSON.parse 失败 | 改为括号配对扫描，只取第一个完整 JSON 对象 |
| 失败后把原始 JSON 当聊天内容显示 | 去掉协议文本；无自然语言时重试一次；仍失败给友好提示，不再泄漏 JSON |
| 工具执行后模型只给自然语言，旧逻辑判失败 | 工具结果作为新的 user turn 回传；自然语言视为最终回答 |
| 6 步用尽后直接复述最后一个文件内容 | 增加一次 final synthesis 调用，把工具结果转成自然语言回答 |
| delegate 关闭仍被模型调用 | 工具列表隐藏 delegate，宿主拒绝 delegate_disabled |

实测：

- “看看工作区 fatfish-pet 目录” → 执行 list_dir + read_file，返回可读总结；
- “告诉我今天用了多少 token” → 执行目录查找后，用自然语言说明“没有用量数据来源，去服务商后台看”，不再输出 JSON；
- 独立版测试 13/13 PASS；
- 发布包 SHA256 371EB8550771EE6C64760B89116251841265CE4777B58F5B115F8FA7A5E54770。

## 14. 网页 Agent 与长回答

| 项 | 结果 |
| --- | --- |
| web_search / web_fetch | PASS：通过宿主 ctx.web 的 search/fetch provider 联网 |
| 实网测试 | PASS：搜索 Python 最新稳定版，打开 python.org 两个官方页面，回答中给出 2 个来源链接 |
| 来源引用 | PASS：回答包含可点击 URL，不再只给模糊结论 |
| 权限 | 网页工具在 Agent 权限 >= 1 时开放；0 仍只能聊天/记忆/提醒 |
| 回答展示 | Agent 长回答只写入聊天记录，不再用模型上方大气泡覆盖桌面；气泡只保留「我想想」等短反馈 |
| 回答长度 | say 工具上限从 80 提到 1200 字符，聊天消息上限 2000，保留完整来源 |

发布包：SHA256 371EB8550771EE6C64760B89116251841265CE4777B58F5B115F8FA7A5E54770
## 15. 可调参数与息屏沉睡

| 项 | 结果 |
| --- | --- |
| Agent 高级参数 | PASS：最大步数、搜索条数、网页正文上限、单步超时、回答长度、模型温度、联网开关均可从设置修改 |
| 参数生效 | PASS：maxSteps=2 时 steps=2；web=false 时工具列表不含 web_search/web_fetch；回答长度 300 生效 |
| 息屏沉睡 | PASS：模拟 visibility hidden 后根节点出现 ffish-deep-sleep，Agent 请求中断、界面收起、桌宠进入睡眠姿态 |
| 独立版锁屏 | PASS（代码级）：powerMonitor lock-screen/suspend → system-sleep，unlock/resume → system-wake |
| 无操作休眠 | PASS：可设 0-120 分钟，0 关闭；任意输入/解锁唤醒 |

发布包：SHA256 371EB8550771EE6C64760B89116251841265CE4777B58F5B115F8FA7A5E54770
