const { app, BrowserWindow, ipcMain, Notification, BrowserView } = require('electron')
const path = require("path");

const isDev = !app.isPackaged;

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
    })

    await win.loadFile(__dirname + '/dist/index.html')
    return win
}


if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}


ipcMain.on('notify', (_, message) => {
    new Notification({title: 'Notifiation', body: message}).show();
})

app.whenReady().then(async () => {
    const win = await createWindow()
})