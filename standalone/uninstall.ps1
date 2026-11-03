param([switch]$KeepConfig)
$ErrorActionPreference = "SilentlyContinue"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$config = Join-Path $here "resources\app\standalone\config.json"
$backup = ""
if ($KeepConfig -and (Test-Path $config)) { $backup = Get-Content -Raw $config }
Get-Process FatFish -ErrorAction SilentlyContinue | Stop-Process -Force
$desktopLink = Join-Path ([Environment]::GetFolderPath("Desktop")) "大肥鱼.lnk"
Remove-Item $desktopLink -Force -ErrorAction SilentlyContinue
Remove-Item (Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\大肥鱼") -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run" -Name "FatFishPet" -Force -ErrorAction SilentlyContinue
if ($backup) {
  $tmp = Join-Path $env:TEMP "fatfish-config-backup.json"
  Set-Content -Path $tmp -Value $backup -Encoding UTF8
  Write-Host "Config backed up at $tmp"
}
Start-Sleep -Milliseconds 400
$target = $here
Set-Location $env:TEMP
Remove-Item $target -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "FatFish uninstalled."
