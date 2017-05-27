const { ipcRenderer } = require('electron')

function startNotificationListening() {

    ipcRenderer.addListener('alert:meeting', (event, meeting) => {

        if (window.Notification.permission === 'granted') {

            createNotification(meeting)

        } else if (window.Notification.permission !== 'denied') {

            window.Notification.requestPermission(function (permission) {
                if (permission === 'granted') {
                    createNotification(meeting)
                }
            })
        }
    })
}

function createNotification(meeting) {
    let bodyText = `Don't be late.`
    bodyText += meeting.location ? `Its in ` + meeting.location : ''

    new window.Notification(`Meeting ${meeting.summary}`, { body: bodyText })
}

export { startNotificationListening }
