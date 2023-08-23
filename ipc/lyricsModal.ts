const path = require("path");

const { BrowserWindow } = require('electron');
let win

function createLyricModal() {
    win = new BrowserWindow({
        width: 1200,
        height: 100,
        frame: false,
        webPreferences: {
            webSecurity: false,
            devTools: true,
            preload: path.join(__dirname, "./preload.ts"),
        },
        center: true,
        alwaysOnTop: true
    });
    if (process.env.NODE_ENV === "development") {
        win.loadURL("http://localhost:5173/lyric");
    } else {
        win.loadFile("./dist/index.html");
    }
}

function closeLyricModal() {
    if (win) {
        win.close()
    }
    win = undefined
}

module.exports = {
    createLyricModal, closeLyricModal
}
