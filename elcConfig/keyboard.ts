const { globalShortcut } = require("electron");
function registerGlobalShortCut() {
    const ret = globalShortcut.register('CommandOrControl+e', () => {
        console.log('asodhoqhwpo');
    })
    if (!ret) {
        console.log('keyboard register error');
    }
}

function unregisterAll() {
    globalShortcut.unregisterAll()
}

exports = {
    registerGlobalShortCut, unregisterAll
}
