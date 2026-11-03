# FatFish Pet v1.3.0

## 版本

- DSH 插件版：`@local/fatfish-pet` 1.3.0
- 独立桌面版：Electron 31 透明全屏覆盖层 + 本地模型配置

## 主要内容

- Live2D 分件桌宠、透明覆盖、点击穿透、全屏游动、托盘与全局热键。
- 人格引擎：OCEAN、心情/压力/需要、关系、评价权重、记忆、反思。
- 聊天、语音、白饭小游戏、设置面板、主题适配。
- Agent：工作区读写、命令执行（分级授权）、`web_search` / `web_fetch` 联网搜索与引用。
- Agent 高级参数：最大步数、搜索条数、网页正文上限、单步超时、回答长度、温度、联网开关。
- 长回答只进聊天记录，不在桌宠上方显示超长气泡。
- 息屏/锁屏/无操作自动沉睡；插件使用 visibility + idle，独立版使用 Electron powerMonitor。
- 独立版便携包：`standalone/dist/FatFish-portable.zip`
  SHA256 `371EB8550771EE6C64760B89116251841265CE4777B58F5B115F8FA7A5E54770`

## 已知限制

- 插件版网页工具依赖 DSH 的 `web` provider；独立版需另外接入搜索/抓取 provider。
- 无法读取 DSH 会话 token 遥测。
- 角色与 Live2D 素材来自 Coopanion（AGPL-3.0）及角色原设/二创；再分发前请确认角色授权，详见 `live2d/NOTICE.md`。
- Agent 是单任务、受限步数的受控 Agent，不是后台无限自治进程。

## 安装

- 插件：将本目录作为本地 DSH bundle 启用，或参考 README。
- 独立版：解压便携包，运行 `FatFish.exe`；或执行 `standalone/install.ps1 -Force`。
