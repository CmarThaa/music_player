const { app, BrowserWindow, ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();
const path = require("path");
const {
  unregisterAll,
  registerGlobalShortCut,
} = require("./elcConfig/keyboard.ts");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 1000,
    frame: false,
    webPreferences: {
      webSecurity: false,
      devTools: true,
      preload: path.join(__dirname, "/ipc/preload.ts"),
    },
  });

  ipcMain.on("closeAll", (event, title) => {
    const webContents = event.sender;
    // const win = BrowserWindow.fromWebContents(webContents);
    win.close();
  });
  ipcMain.on("fileSelect", (event, domEvent) => {
    console.log(domEvent);
  });
  ipcMain.on("storeSet", (event, key, value) => {
    try {
      console.log(value);
      store.set(key, value);
    } catch (error) {
      console.log("sotre set error -- : ", error);
    }
  });
  ipcMain.handle("storeGet", (event, name) => {
    const file = store.get(name);
    return file;
  });

  //   win.loadFile("./dist/index.html");
  win.loadURL("http://localhost:5173/");
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  registerGlobalShortCut();
});

app.on("will-quit", () => {
  unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
