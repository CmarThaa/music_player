const path = require("path");

const { BrowserWindow } = require('electron');
let win

function createLyricModal() {
    if (win === undefined) {
        win = new BrowserWindow({
            width: 1200,
            height: 100,
            frame: false,
            transparent: true,
            webPreferences: {
                webSecurity: false,
                devTools: true,
                preload: path.join(__dirname, "./preload.ts"),
            },
            center: true,
            alwaysOnTop: true
        });
        if (process.env.NODE_ENV === "development") {
            win.loadURL("http://localhost:5173/lyric.html");
        } else {
            win.loadFile("./dist/lyric.html");
        }
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
