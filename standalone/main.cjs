// Electron main for the standalone FatFish desktop pet.
// Full-screen transparent overlay + normal setup window + tray + global hotkey.
const path = require('node:path');
const fs = require('node:fs');
const { app, BrowserWindow, Tray, Menu, globalShortcut, nativeImage, screen, ipcMain, powerMonitor } = require('electron');

app.setName('大肥鱼');
app.setAppUserModelId('FatFish.Pet');
const singleInstance = app.requestSingleInstanceLock();
if (!singleInstance) { app.quit(); }

const APP_DIR = __dirname;
const ROOT = path.resolve(__dirname, '..');
const BOOT_LOG = path.join(APP_DIR, 'main-boot.log');
function bootLog(message) {
  try { fs.appendFileSync(BOOT_LOG, new Date().toISOString() + ' ' + message + '\n'); } catch { /* ignore */ }
}
bootLog('main start');

let setupWindow = null;
let overlayWindow = null;
let tray = null;
let serverInfo = null;
let quitting = false;

const captureArg = process.argv.find((arg) => arg.startsWith('--capture='));
const capturePath = captureArg ? captureArg.slice('--capture='.length) : '';
const forceSetup = process.argv.includes('--setup');

function iconPath() {
  const file = path.join(ROOT, 'icon.png');
  return fs.existsSync(file) ? file : undefined;
}

function attachCapture(window, targetPath) {
  if (!targetPath) return;
  window.webContents.once('did-finish-load', () => {
    setTimeout(async () => {
      try {
        const image = await window.webContents.capturePage();
        fs.writeFileSync(path.resolve(APP_DIR, targetPath), image.toPNG());
        bootLog('captured ' + targetPath);
        console.log('CAPTURED ' + path.resolve(APP_DIR, targetPath));
      } catch (error) { bootLog('capture failed ' + (error && error.message)); }
      app.quit();
    }, 4500);
  });
}

function createOverlay() {
  if (overlayWindow && !overlayWindow.isDestroyed()) { overlayWindow.show(); overlayWindow.focus(); return; }
  const display = screen.getPrimaryDisplay();
  const bounds = display.bounds;
  overlayWindow = new BrowserWindow({
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
    frame: false,
    transparent: true,
    resizable: false,
    movable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    hasShadow: false,
    fullscreenable: true,
    title: '大肥鱼',
    icon: iconPath(),
    show: false,
    webPreferences: {
      preload: path.join(APP_DIR, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      backgroundThrottling: false,
      additionalArguments: ['--fatfish-window=overlay'],
    },
  });
  overlayWindow.setAlwaysOnTop(true, 'floating');
  overlayWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  overlayWindow.setIgnoreMouseEvents(true, { forward: true });
  overlayWindow.loadURL(serverInfo.url + '/app');
  overlayWindow.once('ready-to-show', () => overlayWindow.showInactive());
  overlayWindow.on('closed', () => { overlayWindow = null; });
  overlayWindow.on('minimize', () => {
    setTimeout(() => {
      if (!overlayWindow || overlayWindow.isDestroyed()) return;
      overlayWindow.restore();
      overlayWindow.showInactive();
      overlayWindow.setAlwaysOnTop(true, 'floating');
    }, 120);
  });
  bootLog('overlay created ' + bounds.width + 'x' + bounds.height);
  attachCapture(overlayWindow, capturePath);
}

function createSetup() {
  if (setupWindow && !setupWindow.isDestroyed()) { setupWindow.show(); setupWindow.focus(); return; }
  setupWindow = new BrowserWindow({
    width: 980,
    height: 860,
    minWidth: 760,
    minHeight: 620,
    center: true,
    title: '大肥鱼 · 设置',
    backgroundColor: '#eef3ff',
    autoHideMenuBar: true,
    show: false,
    icon: iconPath(),
    webPreferences: {
      preload: path.join(APP_DIR, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      additionalArguments: ['--fatfish-window=setup'],
    },
  });
  setupWindow.loadURL(serverInfo.url + '/setup');
  setupWindow.once('ready-to-show', () => setupWindow.show());
  setupWindow.on('closed', () => { setupWindow = null; });
  attachCapture(setupWindow, capturePath);
}

function createTray() {
  try {
    const icon = iconPath() ? nativeImage.createFromPath(iconPath()).resize({ width: 18, height: 18 }) : nativeImage.createEmpty();
    tray = new Tray(icon);
    tray.setToolTip('大肥鱼');
    tray.setContextMenu(Menu.buildFromTemplate([
      { label: '显示 / 隐藏桌宠', click: () => { if (overlayWindow) { overlayWindow.isVisible() ? overlayWindow.hide() : (overlayWindow.show(), overlayWindow.focus()); } else { createOverlay(); } } },
      { label: '模型与设置', click: () => createSetup() },
      { type: 'separator' },
      { label: '退出', click: () => { quitting = true; app.quit(); } },
    ]));
    tray.on('click', () => { if (overlayWindow) { overlayWindow.isVisible() ? overlayWindow.hide() : (overlayWindow.show(), overlayWindow.focus()); } });
  } catch (error) { bootLog('tray failed ' + (error && error.message)); }
}

function registerIpc() {
  ipcMain.on('fatfish:click-through', (_event, value) => {
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.setIgnoreMouseEvents(!!value, { forward: true });
    }
  });
  ipcMain.on('fatfish:finish-setup', () => {
    if (setupWindow && !setupWindow.isDestroyed()) setupWindow.close();
    if (overlayWindow && !overlayWindow.isDestroyed()) { overlayWindow.show(); overlayWindow.focus(); }
    else createOverlay();
  });
  ipcMain.on('fatfish:open-setup', () => createSetup());
  ipcMain.on('fatfish:hide-overlay', () => { if (overlayWindow) overlayWindow.hide(); });
  ipcMain.on('fatfish:quit', () => { quitting = true; app.quit(); });
  ipcMain.on('fatfish:overlay-ready', () => bootLog('overlay renderer ready'));
}

function sendToOverlay(channel) {
  if (!overlayWindow || overlayWindow.isDestroyed()) return;
  try { overlayWindow.webContents.send(channel); } catch { /* ignore */ }
}

app.whenReady().then(async () => {
  bootLog('app ready');
  registerIpc();
  try {
    powerMonitor.on('lock-screen', () => sendToOverlay('fatfish:system-sleep'));
    powerMonitor.on('suspend', () => sendToOverlay('fatfish:system-sleep'));
    powerMonitor.on('unlock-screen', () => sendToOverlay('fatfish:system-wake'));
    powerMonitor.on('resume', () => sendToOverlay('fatfish:system-wake'));
  } catch { /* powerMonitor unavailable */ }
  const { startServer, loadConfig } = await import('./server.js');
  bootLog('server module imported');
  const preferredPort = Number(process.env.FATFISH_PORT) || 47821;
  try { serverInfo = await startServer(preferredPort); }
  catch { serverInfo = await startServer(0); bootLog('fixed port busy, using ' + serverInfo.port); }
  bootLog('server started ' + serverInfo.url);
  const cfg = loadConfig();
  const shouldSetup = forceSetup || !cfg.apiKey;
  if (shouldSetup) createSetup(); else createOverlay();
  createTray();
  globalShortcut.register('Alt+Shift+F', () => {
    if (!overlayWindow) { createOverlay(); return; }
    if (overlayWindow.isVisible()) overlayWindow.hide();
    else { overlayWindow.show(); overlayWindow.focus(); }
  });
  app.on('activate', () => { if (!overlayWindow && !setupWindow) createSetup(); });
});

app.on('second-instance', () => {
  if (overlayWindow) { overlayWindow.show(); overlayWindow.focus(); }
  else if (setupWindow) { setupWindow.show(); setupWindow.focus(); }
});
app.on('before-quit', () => { quitting = true; });
app.on('window-all-closed', (event) => { if (!quitting) event.preventDefault(); });
app.on('will-quit', () => { try { globalShortcut.unregisterAll(); } catch { /* ignore */ } });
