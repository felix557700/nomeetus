const remote = require('electron').remote
const main = remote.require('./main.js')

main.openAuthWindow()

setTimeout(() => {

    let notification;

    if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        notification = new Notification('You have a meeting', {
            body: 'Don\'t be late.'
        })
    }
    else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                notification = new Notification('You have a meeting.')
            }
        })
    }

    notification.onclick = function () {
        console.log('notification clicked')
    }
}, 3000)
