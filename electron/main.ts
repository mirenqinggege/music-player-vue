import {app, BrowserWindow, Menu, ipcMain, globalShortcut} from 'electron'
import {join} from 'path'
import request from '../src/util/request.js'
import Accelerator = Electron.Accelerator

Menu.setApplicationMenu(null)

async function createWindow() {
  const config: Electron.BrowserWindowConstructorOptions = {
    frame: false,
    show: false,
    width: 1400,
    minWidth: 1400,
    minHeight: 670,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js')
    }
  }
  const browserWindow: BrowserWindow = new BrowserWindow(config)
  browserWindow.on('ready-to-show', () => {
    browserWindow.show()
    browserWindow.webContents.toggleDevTools()
    globalShortcut.register(<Accelerator>"F12", () => {
      browserWindow.webContents.toggleDevTools()
    })
  })
  return browserWindow
}

app.whenReady().then(async () => {
  const window = await createWindow()
  return window.loadURL(process.env.VITE_DEV_SERVER_URL)
}).then(() => {
  console.log('success')
})

ipcMain.handle('exit', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('request', async (event, args) => request(...args))
