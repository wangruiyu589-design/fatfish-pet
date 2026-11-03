@echo off
chcp 65001 >nul
set ELECTRON_RUN_AS_NODE=
cd /d "%~dp0"
if exist "node_modules\electron\dist\electron.exe" (
  start "" "node_modules\electron\dist\electron.exe" .
) else (
  echo Electron runtime is not installed yet.
  echo Run:  pnpm install
  echo Then re-run start.bat.
  pause
)
