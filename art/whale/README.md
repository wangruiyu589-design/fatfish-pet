# 大肥鱼精灵资源

由 `build_whale_sprites.py` 从用户提供的 8 张白底同人图生成。

## 文件

- `sprite-sheet.webp`：3×3 透明精灵表，每格 512×512；插件显示时缩放到 196px。
- `avatar.webp`：聊天头像，160×160。
- `tiles/*.png`：每格单独导出，方便检查。
- `source/`：用户提供的原图（RGB，带白色背景）。
- `contact.png`：QA 对照图（棋盘格上检查透明边）。
- `ATTRIBUTION.md`：角色与素材署名。

## 精灵格顺序

| 索引 | 位置 | key | 用途 |
| --- | --- | --- | --- |
| 0 | 左上 | `default` | 默认 / 生气 / 得意 / 晕 |
| 1 | 中上 | `happy` | 开心 / 被摸头 |
| 2 | 右上 | `love` | 喜欢 |
| 3 | 左中 | `curious` | 疑惑 / 难过 |
| 4 | 中中 | `thinking` | 思考 / 偷吃 Token |
| 5 | 右中 | `pill` | 困倦 / 惊讶 |
| 6 | 左下 | `hungry` | 饥饿（抱白饭） |
| 7 | 中下 | `blush` | 害羞 |
| 8 | 右下 | — | 空 |

## 重新生成

```powershell
# 需要 rembg + onnxruntime + opencv（仅构建时）
$py = "C:\Users\ASUS\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe"
$env:PYTHONPATH = "<rembg 安装目录>;<opencv 安装目录>"
& $py build_whale_sprites.py
```

模型 `isnet-anime` 由 rembg 在首次运行时下载到用户缓存；运行时插件不需要它。

## 许可

角色图片的版权与二创署名见 `ATTRIBUTION.md`；不要把这些图片当作可自由商用的官方素材。
