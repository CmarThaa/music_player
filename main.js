const { app, BrowserWindow, ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();
const path = require("path");
const {
  unregisterAll,
  registerGlobalShortCut,
} = require("./elcConfig/keyboard.ts");
let mainWin = null;
const createWindow = () => {
  mainWin = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    webPreferences: {
      webSecurity: false,
      devTools: true,
      preload: path.join(__dirname, "/ipc/preload.ts"),
    },
  });

  ipcMain.on("closeAll", (event, title) => {
    mainWin.close();
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

  console.log("vite env", process.env.NODE_ENV);

  if (process.env.NODE_ENV === "development") {
    mainWin.loadURL("http://localhost:5173/");
  } else {
    mainWin.loadFile("./dist/index.html");
  }
};

if (require("electron-squirrel-startup")) app.quit();

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  registerGlobalShortCut(mainWin);
});

app.on("will-quit", () => {
  unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
