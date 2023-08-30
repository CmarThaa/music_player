const { contextBridge, ipcRenderer } = require("electron");

let messagePort;
contextBridge.exposeInMainWorld("electronAPI", {
  closeAll: () => ipcRenderer.send("closeAll"),
  fileSelect: (e) => ipcRenderer.send("fileSelect", e),
  storeSet: (key, value) => ipcRenderer.send("storeSet", key, value),
  storeGet: (name) => ipcRenderer.invoke("storeGet", name),
  // 下一首
  onNextPlay: (callback) => ipcRenderer.on("onNextPlay", callback),
  onPrevPlay: (callback) => ipcRenderer.on("onPrevPlay", callback),

  // 打开桌面歌词
  openLyricModal: () => ipcRenderer.send("openLyricModal"),
  closeLyricModal: () => ipcRenderer.send("closeLyricModal"),
  closeLyricModalByModal: (fn) => ipcRenderer.on("closeLyricModalByModal", fn),
  postMessage: (msg) => messagePort.postMessage(msg),
  openView: (url) => ipcRenderer.send("openView", url),
});

ipcRenderer.on("port", (e) => {
  messagePort = e.ports[0];
  // contextBridge.exposeInMainWorld('electronMessagePort', {
  //     postMessage: (msg) => port.postMessage(msg),
  //     onmessage: port.onmessage
  // })
});
