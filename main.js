const electron = require('electron')
const googleCalendar = require('./googlecalendar')

const {app, BrowserWindow} = electron

app.on('ready',  function () {
    let mainWindow = new BrowserWindow({
        title: 'Nomeetus',
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

module.exports.openAuthWindow = function() {
    googleCalendar.authorize()
        // .then(data => console.log(data))
        // .catch(_ => console.log('auth error'))
}