const path = require("path");

const { BrowserWindow } = require('electron');
let win

function createLyricModal(port) {
    if (win === undefined) {
        win = new BrowserWindow({
            width: 1200,
            height: 120,
            frame: false,
            transparent: true,
            webPreferences: {
                webSecurity: false,
                devTools: true,
                contextIsolation: true,
                preload: path.join(__dirname, "./preloadModal.js"),
            },
            center: true,
            alwaysOnTop: true
        });
        if (process.env.NODE_ENV === "development") {
            win.loadURL("http://localhost:5173/lyric.html");
        } else {
            win.loadFile("./dist/lyric.html");
        }
        win.webContents.postMessage("port", null, [port]);
    }
}

function closeLyricModal() {
    if (win) {
        win.close()
    }
    win = undefined
}

module.exports = {
    createLyricModal, closeLyricModal, lyricWin: win
}
