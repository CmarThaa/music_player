const { BrowserWindow } = require("electron");

function createView(url) {
  const view = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      webSecurity: false,
      devTools: true,
      contextIsolation: true,
    },
    center: true,
  });

  view.loadURL(url);

  const content = view.webContents;
  content.setWindowOpenHandler((details) => {
    view.loadURL(details.url);
    return { action: "deny" };
  });
}

module.exports = {
  createView,
};
