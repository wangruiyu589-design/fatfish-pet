# 大肥鱼 / 鲸鱼女仆 · 形象与素材来源

本插件里的角色图片由用户在本会话中提供，用作本机 DSH 桌面宠物插件的形象。原始角色与二创署名如下（来自 Pal-AI-Lab/Coopanion 公开的 `web/whale` 形象包与 B 站「大肥鱼」系列）：

- **角色原设**：溟月（上善无形）
- **DeepSeek 女仆二创**：ZipZipPipe
- **Live2D 式分件 / 配色 / 服装实现参考**：Pal-AI-Lab/Coopanion（AGPL-3.0）
  - https://github.com/Pal-AI-Lab/Coopanion
- **参考视频**：B 站 Pal AI Lab《【全动态Live2D】⚡大肥鱼桌宠！？⚡》BV1E6aq6pEpz
  - https://www.bilibili.com/video/BV1E6aq6pEpz

本项目**没有**复制 Coopanion 的代码或贴图。角色图片仅在本机 `art/whale/source/` 中作为用户提供的参考素材使用；`art/whale/sprite-sheet.webp` 和 `avatar.webp` 是对这些用户提供图片做的抠图 / 精灵化产物，用于个人本地插件。

如果你要把此插件公开发布或商用，请先获得角色原设 / 二创作者及图片版权方的许可，并遵守 Coopanion 的 AGPL-3.0（如果参考或复用其实现）。插件的 UI / 代码可以按你的需要另行授权。

## 素材处理

`art/whale/build_whale_sprites.py` 使用 rembg 的 `isnet-anime` 模型对用户提供的白底图做前景抠图，手动裁掉字幕 / 对话框 / 签名，然后合成 3×3 透明 WebP 精灵表；头像取自默认姿势的头部区域。处理后的图像不包含文字或水印。
