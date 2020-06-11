const {app, BrowserWindow } = require('electron');
const url = require('url')
const path = require('path')
const { listen } = require('./ipc')

let mainWindow = null;


app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences: { webSecurity: false, nodeIntegration: true, enableRemoteModule: true } });
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    mainWindow.openDevTools();
    listen() // 监听渲染线程
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
