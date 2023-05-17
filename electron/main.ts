import {app, BrowserWindow, globalShortcut, ipcMain, Menu, session} from 'electron'
import {join} from 'path'
import request from '../src/util/request.js'
import {existsSync} from 'fs'


Menu.setApplicationMenu(null)

let mainWin: BrowserWindow

async function createWindow() {
  const config: Electron.BrowserWindowConstructorOptions = {
    frame: false,
    show: false,
    width: 1020,
    minWidth: 1020,
    minHeight: 670,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js')
    }
  }
  const browserWindow: BrowserWindow = new BrowserWindow(config)
  const path = '/home/zkh/project/devtools-6.4.5/packages/shell-chrome'
  if (!app.isPackaged && existsSync(path)) {
    session.defaultSession.loadExtension(path, {allowFileAccess: true}).then()
  }
  browserWindow.on('ready-to-show', () => {
    browserWindow.show()
  })
  return browserWindow
}

app.on('browser-window-blur', () => {
  if (globalShortcut.isRegistered('F12')) {
    globalShortcut.unregister('F12')
  }
})

app.on('browser-window-focus', () => {
  if (!globalShortcut.isRegistered('F12')) {
    globalShortcut.register('F12', () => {
      mainWin?.webContents.openDevTools()
    })
  }
})

app.on('window-all-closed', () => {
  if (globalShortcut.isRegistered('F12')) {
    globalShortcut.unregister('F12')
  }
})
app.whenReady().then(async () => {
  mainWin = await createWindow()
  if (app.isPackaged) {
    return mainWin.loadFile(join(__dirname, '../dist/index.html'))
  }
  return mainWin.loadURL(process.env.VITE_DEV_SERVER_URL)
}).then(() => {
  console.log('success')
})

ipcMain.handle('minimize', async () => {
  mainWin.minimize()
})

ipcMain.handle('maximize', async () => {
  if (mainWin.isMaximized()) {
    mainWin.restore()
  } else {
    mainWin.maximize()
  }
})

ipcMain.handle('exit', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('request', (event, args) => new Promise((resolve) => {
  const promise: Promise<any> = request(...args)
  promise.then((data) => {
    resolve(data)
  })
  promise.catch(err => {
    resolve(err)
  })
}))
