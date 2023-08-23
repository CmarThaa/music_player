const { app, BrowserWindow, ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();
const path = require("path");
const {
  unregisterAll,
  registerGlobalShortCut,
} = require("./elcConfig/keyboard.ts");
const { createLyricModal, closeLyricModal } = require("./ipc/lyricsModal.ts");
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

  mainWin.setBackgroundColor("hsl(230, 100%, 50%)");
  mainWin.setBackgroundColor("rgb(255, 145, 145)");
  mainWin.setBackgroundColor("#ff00a3");
  mainWin.setBackgroundColor("blueviolet");

  ipcMain.on("closeAll", (event, title) => {
    mainWin.close();
  });
  ipcMain.on("fileSelect", (event, domEvent) => {
    console.log(domEvent);
  });
  ipcMain.on("storeSet", (event, key, value) => {
    try {
      store.set(key, value);
    } catch (error) {
      console.log("sotre set error -- : ", error);
    }
  });
  ipcMain.handle("storeGet", (event, name) => {
    const file = store.get(name);
    return file;
  });

  ipcMain.on("openLyricModal", () => {
    createLyricModal();
  });
  ipcMain.on("closeLyricModal", () => {
    closeLyricModal();
  });

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
