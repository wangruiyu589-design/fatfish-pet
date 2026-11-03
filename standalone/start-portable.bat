@echo off
chcp 65001 >nul
set ELECTRON_RUN_AS_NODE=
cd /d "%~dp0"
start "" "FatFish.exe"
