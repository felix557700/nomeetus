const electron = require('electron')

const {app, BrowserWindow} = electron

app.on('ready',  function () {
    let mainWindow =  new BrowserWindow({
        useContentSize: true,
        width: 400,
        height: 300,
        backgroundColor: 'white',
        webPreferences: {
            experimentalFeatures: true
        }
    })
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    // mainWindow.webContents.openDevTools()
})