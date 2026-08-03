const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  write: (file,content) => ipcRenderer.send('write', file,content),
  exec: (shell,callback) => ipcRenderer.send('exec', shell,callback),
  onLog: (callback) => ipcRenderer.on('log', (_event, value) => callback(value)),
  onLogC: (callback) => ipcRenderer.on('logc', (_event, value) => callback(value))
})