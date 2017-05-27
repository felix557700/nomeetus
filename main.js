const electron = require('electron')
const googleCalendar = require('./services/googlecalendar')
const SyncService = require('./services/sync-service')

const {app, BrowserWindow} = electron

const menubar = require('menubar')
const path = require('path')

const mb = menubar({
    alwaysOnTop: true,
    showDockIcon: false,
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

    if (process.env.NODE_ENV === 'development') {
        mb.on('after-show', () => {
            mb.window.openDevTools({ detach: true })
        })

        mb.on('after-close', function () {
            console.log('after closed')
        })
    }

    let syncService = new SyncService()
    syncService.start()
})

// Disable error dialogs by overriding it
const dialog = electron.dialog
dialog.showErrorBox = function(title, content) {
    console.log(`${title}\n${content}`)
}

module.exports.openAuthWindow = function() {
    googleCalendar.authorize()
        // .then(data => console.log(data))
        // .catch(_ => console.log('auth error'))
}

module.exports.getMeetingListFromMain = function (date) {
    return googleCalendar.getMeetingsForDate(date)
}