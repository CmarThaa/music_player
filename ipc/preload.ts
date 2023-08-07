const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    closeAll: () => ipcRenderer.send('closeAll'),
    fileSelect: (e) => ipcRenderer.send('fileSelect', e),
    storeSet: (key, value) => ipcRenderer.send('storeSet', key, value),
    storeGet: name => ipcRenderer.invoke('storeGet', name),
    // 下&一首
    onNextPlay: (callback) => ipcRenderer.on('onNextPlay', callback),
    onPrevPlay: (callback) => ipcRenderer.on('onPrevPlay', callback),
})