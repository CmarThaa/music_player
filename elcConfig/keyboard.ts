const { globalShortcut } = require("electron");
function registerGlobalShortCut(mainWin) {
    globalShortcut.register('Alt+Right', () => {
        mainWin.webContents.send('onNextPlay')
    })
    globalShortcut.register('Alt+Left', () => {
        mainWin.webContents.send('onPrevPlay')
    })
    globalShortcut.register('Alt+Space', () => {
        mainWin.webContents.send('onMusicStatusToggle')
    })
}

function unregisterAll() {
    globalShortcut.unregisterAll()
}

module.exports = {
    registerGlobalShortCut, unregisterAll
}
