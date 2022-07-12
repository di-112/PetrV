const {
  app, BrowserWindow, ipcMain, Notification, Menu, Tray,
} = require('electron')
const reload = require('electron-reload')
const path = require('path')
const { shell } = require('electron')
const { server } = require('./backend')

const isDev = !app.isPackaged

server.listen(5500, () => {
  console.log(`Server started on ${5500} port`)
})

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'PetrV',
    titleBarStyle: 'customButtonsOnHover',
    icon: './src/assets/images/logo.png',
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
  reload(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  })
}

ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Notifiation', body: message }).show()
})

ipcMain.on('close', (_, message) => {
  new Notification({ title: 'Notifiation', body: message }).show()
})

Menu.setApplicationMenu(null)

let tray = null

app.whenReady().then(async () => {
  const win = await createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  win.setTitle('PetrV')

  if (isDev) {
    win.webContents.openDevTools()
  }

  win.webContents.on('new-window', (e, url) => {
    e.preventDefault()
    shell.openExternal(url)
  })

  tray = new Tray('./src/assets/images/logo.png')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Задачи',
      click: () => {
        win.show()
        win.webContents.send('tasks')
      },
    },
    {
      label: 'Планы',
      click: () => {
        win.show()
        win.webContents.send('plans')
      },
    },
    {
      label: 'Итоги',
      click: () => {
        win.show()
        win.webContents.send('summary')
      },
    },
    {
      label: 'Настройки',
      click: () => {
        win.show()
        win.webContents.send('settings')
      },
    },
  ])

  tray.on('balloon-click', () => {
    console.log('data')
  })

  tray.on('click', () => {
    win.show()
  })

  tray.setContextMenu(contextMenu)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    tray.destroy()
  }
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
