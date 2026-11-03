# Builds a portable Windows folder: dist/FatFish with its own Electron runtime.
# Run from the standalone directory (requires node_modules/electron/dist to exist).
$ErrorActionPreference = "Stop"
$standalone = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $standalone
$electronDist = Join-Path $standalone "node_modules\electron\dist"
if (-not (Test-Path $electronDist)) {
  throw "Electron runtime missing. Run: node node_modules/electron/install.js"
}
$out = Join-Path $standalone "dist\FatFish"
if (Test-Path $out) { Remove-Item $out -Recurse -Force }
New-Item -ItemType Directory -Force -Path $out | Out-Null
Copy-Item -Path (Join-Path $electronDist "*") -Destination $out -Recurse -Force
$appDir = Join-Path $out "resources\app"
New-Item -ItemType Directory -Force -Path $appDir | Out-Null
# App payload: standalone files keep their layout (server.js resolves parent as ROOT).
$destStandalone = Join-Path $appDir "standalone"
New-Item -ItemType Directory -Force -Path $destStandalone | Out-Null
Get-ChildItem -Path $standalone -Force | Where-Object { $_.Name -notin @("node_modules", "dist", "config.json", "electron.log", "server.log", "server.err.log", "shot.png", "shot-electron.png", "dom.txt") } | ForEach-Object { Copy-Item -Path $_.FullName -Destination $destStandalone -Recurse -Force }
# Root-level shared assets in the app payload.
Copy-Item -Path (Join-Path $root "client.js") -Destination $appDir -Force
Copy-Item -Path (Join-Path $root "live2d") -Destination $appDir -Recurse -Force
Copy-Item -Path (Join-Path $root "icon.png") -Destination $appDir -Force
foreach ($name in @("NOTICE.md", "ATTRIBUTION.md")) {
  $source = Join-Path $root $name
  if (Test-Path $source) { Copy-Item $source (Join-Path $appDir $name) -Force }
}
# Point resources/app at the standalone main via a tiny entry package.
$entry = @{
  name = "fatfish-pet"
  version = "1.3.0"
  private = $true
  type = "module"
  main = "standalone/main.cjs"
  license = "AGPL-3.0-or-later"
} | ConvertTo-Json -Depth 4
Set-Content -Path (Join-Path $appDir "package.json") -Value $entry -Encoding UTF8
# Rename the launcher; Electron resolves resources relative to the executable.
Rename-Item (Join-Path $out "electron.exe") "FatFish.exe" -Force
Copy-Item -Path (Join-Path $standalone "start-portable.bat") -Destination $out -Force
Write-Host "Portable build: $out\FatFish.exe"

