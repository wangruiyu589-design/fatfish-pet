# Builds the portable folder, a ZIP release, and a SHA256 file.
# Run from the standalone directory: powershell -ExecutionPolicy Bypass -File build-release.ps1
$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $here
try {
  & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $here "package-portable.ps1")
  $dist = Join-Path $here "dist\FatFish"
  $release = Join-Path $here "dist"
  $zip = Join-Path $release "FatFish-portable.zip"
  if (Test-Path $zip) { Remove-Item $zip -Force }
  Compress-Archive -Path (Join-Path $dist "*") -DestinationPath $zip -CompressionLevel Optimal
  $hash = (Get-FileHash $zip -Algorithm SHA256).Hash
  Set-Content -Path ($zip + ".sha256") -Value ($hash + "  FatFish-portable.zip") -Encoding ASCII
  Write-Host "Release: $zip"
  Write-Host "SHA256: $hash"
} finally { Pop-Location }
