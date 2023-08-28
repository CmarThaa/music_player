const { contextBridge, ipcRenderer } = require("electron");
ipcRenderer.on("port", async (e) => {
  const [port] = e.ports;

  let messageHandler;
  port.onmessage = (event) => {
    messageHandler(event.data);
  };
  contextBridge.exposeInMainWorld("electronAPI", {
    // getPort: () => port,
    onmessage: (callback) => (messageHandler = callback),
    // 打开桌面歌词
    openLyricModal: () => ipcRenderer.send("openLyricModal"),
    closeLyricModal: () => ipcRenderer.send("closeLyricModal"),
  });
});
