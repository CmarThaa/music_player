const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    closeAll: () => ipcRenderer.send('closeAll'),
    fileSelect: (e) => ipcRenderer.send('fileSelect', e),
    storeSet: (key, value) => ipcRenderer.send('storeSet', key, value),
    storeGet: name => ipcRenderer.invoke('storeGet', name)
})