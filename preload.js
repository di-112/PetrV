const { ipcRenderer, contextBridge } = require('electron')

/* document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('plans', () => {
    console.log('window.location.pathname: ', window.location.pathname)
  })

  ipcRenderer.on('tasks', () => {
    console.log('/: ', window.history)
  })
}) */

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message)
    },
  },
  close() {
    ipcRenderer.send('testClose')
  },
  on(event, callback) {
    ipcRenderer.on(event, callback)
  },
  batteryApi: {

  },
  filesApi: {

  },
})
