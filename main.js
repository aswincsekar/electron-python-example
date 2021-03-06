const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')

let mainWindow = null
const createWindow = () => {
    mainWindow = new BrowserWindow({width:800, height:600})
    mainWindow.loadURL(require('url').format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashed: true
    }))
    mainWindow.webContents.openDevTools()
    mainWindow.on('closed', ()=>{
        mainWindow = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})
app.on('activate', () => {
    if(mainWindow === null){
        createWindow()
    }
})

let pyPort = null
let pyProc = null

const selectPort = () => {
    pyPort = 4242
    return pyPort
}

const createPyProc = () => {
    let port = '' + selectPort()
    let script = path.join(__dirname, 'pycalc', 'api.py')
    pyProc = require('child_process').spawn('python', [script, port])
    if (pyProc != null){
    console.log('child process started')}
}

const exitPyProc = () => {
    pyProc.kill()
    pyProc = null
    pyPort = null
}

app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)