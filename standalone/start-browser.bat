@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Starting FatFish standalone host...
start "FatFish host" /min node server.js
timeout /t 2 >nul
start "" msedge --app=http://127.0.0.1:8231/app --window-size=560,560
