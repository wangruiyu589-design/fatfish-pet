// Preload bridge for the standalone FatFish host.
const { contextBridge, ipcRenderer } = require('electron');

const windowKind = process.argv.find((arg) => arg.startsWith('--fatfish-window='))?.split('=')[1] || 'overlay';

contextBridge.exposeInMainWorld('fatfishPet', {
  windowKind,
  setClickThrough(value) { ipcRenderer.send('fatfish:click-through', !!value); },
  finishSetup() { ipcRenderer.send('fatfish:finish-setup'); },
  openSetup() { ipcRenderer.send('fatfish:open-setup'); },
  hideOverlay() { ipcRenderer.send('fatfish:hide-overlay'); },
  quit() { ipcRenderer.send('fatfish:quit'); },
  ready() { ipcRenderer.send('fatfish:overlay-ready'); },
  onSystemSleep(callback) {
    const listener = () => { try { callback(); } catch { /* ignore */ } };
    ipcRenderer.on('fatfish:system-sleep', listener);
    return () => ipcRenderer.removeListener('fatfish:system-sleep', listener);
  },
  onSystemWake(callback) {
    const listener = () => { try { callback(); } catch { /* ignore */ } };
    ipcRenderer.on('fatfish:system-wake', listener);
    return () => ipcRenderer.removeListener('fatfish:system-wake', listener);
  },
});
