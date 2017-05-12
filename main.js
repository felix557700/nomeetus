const electron = require('electron')
const googleCalendar = require('./googlecalendar')

const {app, BrowserWindow} = electron

const menubar = require('menubar')
const path = require('path')

const mb = menubar({
    alwaysOnTop: process.env.NODE_ENV === 'development',
    showDockIcon: process.env.NODE_ENV === 'development',
    icon: path.join(__dirname, 'icons/IconTemplate.png'),
    width: 320,
    height: 650,
    y: 20,
    transparent: true,
    hasShadow: false,
    resizable: true,
    frame: false,
    showOnAllWorkspaces: true,
    useContentSize: true,
    tooltip: 'Nomeetus',
    webPreferences: {
        experimentalFeatures: true
    }
})

mb.on('ready', function ready () {
    console.log('app is ready')
    // your app code here

    if (process.env.NODE_ENV === 'development') {
        mb.on('after-show', () => {
            mb.window.openDevTools({ detach: true })
        })

        mb.on('after-close', function () {
            console.log('after closed')
        })
    }
})

const ipcMain = electron.ipcMain

ipcMain.on('ipc:message:meetings:get', async function (event, arg) {
    console.log(arg, event.sender.send)
    event.sender.send('ipc:message:meetings:reply', await googleCalendar.getMeetings())
})

module.exports.openAuthWindow = function() {
    googleCalendar.authorize()
        // .then(data => console.log(data))
        // .catch(_ => console.log('auth error'))
}