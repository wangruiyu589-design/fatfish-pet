<#
  FatFish installer (portable-friendly, no admin required).
  Usage:
    powershell -ExecutionPolicy Bypass -File install.ps1
    powershell -ExecutionPolicy Bypass -File install.ps1 -InstallDir "D:\Apps\FatFish" -AutoStart
    powershell -ExecutionPolicy Bypass -File install.ps1 -NoShortcuts   # for tests
#>
param(
  [string]$InstallDir = (Join-Path $env:LOCALAPPDATA "FatFish"),
  [switch]$AutoStart,
  [switch]$NoShortcuts,
  [switch]$Force
)
$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$source = Join-Path $here "dist\FatFish"
if (-not (Test-Path (Join-Path $source "FatFish.exe"))) {
  throw "dist\FatFish not found. Run: powershell -File package-portable.ps1"
}
if ((Test-Path $InstallDir) -and -not $Force) {
  $answer = Read-Host "Install dir exists: $InstallDir. Overwrite? (y/N)"
  if ($answer -notin @("y", "Y", "yes", "YES")) { Write-Host "Cancelled."; exit 0 }
}
$savedConfig = $null
$existingConfigPath = Join-Path $InstallDir "resources\app\standalone\config.json"
if (Test-Path $existingConfigPath) { $savedConfig = Get-Content -Raw $existingConfigPath }
if (Test-Path $InstallDir) { Remove-Item $InstallDir -Recurse -Force }
New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
Copy-Item -Path (Join-Path $source "*") -Destination $InstallDir -Recurse -Force
if ($savedConfig) { Set-Content -Path $existingConfigPath -Value $savedConfig -Encoding UTF8 }
$exe = Join-Path $InstallDir "FatFish.exe"
if (-not $NoShortcuts) {
  $shell = New-Object -ComObject WScript.Shell
  $desktop = [Environment]::GetFolderPath("Desktop")
  $desktopLink = Join-Path $desktop "大肥鱼.lnk"
  $shortcut = $shell.CreateShortcut($desktopLink)
  $shortcut.TargetPath = $exe
  $shortcut.WorkingDirectory = $InstallDir
  $shortcut.IconLocation = $exe
  $shortcut.Description = "大肥鱼桌面宠物"
  $shortcut.Save()
  $startMenu = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\大肥鱼"
  New-Item -ItemType Directory -Force -Path $startMenu | Out-Null
  $menuLink = Join-Path $startMenu "大肥鱼.lnk"
  $shortcut = $shell.CreateShortcut($menuLink)
  $shortcut.TargetPath = $exe
  $shortcut.WorkingDirectory = $InstallDir
  $shortcut.IconLocation = $exe
  $shortcut.Description = "大肥鱼桌面宠物"
  $shortcut.Save()
  $uninstallLink = Join-Path $startMenu "卸载大肥鱼.lnk"
  $uninstall = $shell.CreateShortcut($uninstallLink)
  $uninstall.TargetPath = "powershell.exe"
  $uninstall.Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$InstallDir\uninstall.ps1`""
  $uninstall.WorkingDirectory = $InstallDir
  $uninstall.Save()
}
Copy-Item (Join-Path $here "uninstall.ps1") (Join-Path $InstallDir "uninstall.ps1") -Force
Set-Content -Path (Join-Path $InstallDir "install-location.txt") -Value $InstallDir -Encoding UTF8
if ($AutoStart) {
  $runKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
  New-Item -Path $runKey -Force | Out-Null
  Set-ItemProperty -Path $runKey -Name "FatFishPet" -Value "`"$exe`""
}
Write-Host ""
Write-Host "Installed: $exe"
Write-Host "First launch opens the model setup page. Enter your API base URL, key and model."
if (-not $NoShortcuts) { Write-Host "Shortcuts: Desktop + Start Menu (大肥鱼)" }
if ($AutoStart) { Write-Host "Auto start: enabled for current user" }
