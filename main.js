const {
  app, BrowserWindow, ipcMain, Notification,
} = require('electron')
const path = require('path')

const isDev = !app.isPackaged

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'PETR_V',
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  ipcMain.on('testClose', () => win.close())

  await win.loadFile(`${__dirname}/dist/index.html`)
  return win
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  })
}

ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Notifiation', body: message }).show()
})

ipcMain.on('close', _ => {
  new Notification({ title: 'Notifiation', body: message }).show()
})

app.whenReady().then(async () => {
  const win = await createWindow()

  win.menuBarVisible = false
  win.title = 'PETR_V'
})
