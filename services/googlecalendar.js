const fs = require('fs')
const Promise = require('bluebird')
const readFile = Promise.promisify(require("fs").readFile)
const readline = require('readline')
const google = require('googleapis')
const googleAuth = require('google-auth-library')
const electron = require('electron')
const {BrowserWindow} = electron

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

// at ~/.credentials/calendar-nodejs-quickstart.json
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/'
const TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json'

function authorizeUser(credentials) {
    var clientSecret = credentials.installed.client_secret
    var clientId = credentials.installed.client_id
    var redirectUrl = credentials.installed.redirect_uris[0]
    var auth = new googleAuth()
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)

    return new Promise(async function(resolve, reject) {
        let token = await readTokenFromFile()

        if (!token) {
            // there is no token
            let code = await getNewAuthCode(oauth2Client)

            oauth2Client.getToken(code, function(error, token) {
                if (error) {
                    reject(error)
                    return
                }

                storeToken(token)
                oauth2Client.credentials = token
                resolve(oauth2Client)
            })
        }

        oauth2Client.credentials = JSON.parse(token)
        resolve(oauth2Client)
    })
}

function readTokenFromFile() {
    return new Promise((resolve, reject) => {
        readFile(TOKEN_PATH)
            .then(token => resolve(token))
            .catch(error => resolve())
    })
}

function getNewAuthCode(oauth2Client) {

    return new Promise((resolve, reject) => {

        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        })

        let authWindow = new BrowserWindow({
            alwaysOnTop: true,
            width: 450,
            height: 500,
            useContentSize: true
        })

        authWindow.loadURL(authUrl)

        authWindow.on('closed', function() {
            authWindow = null
            reject(new Error('User closed the window'))
        })

        authWindow.on('page-title-updated', function() {
            setImmediate(() => {
                const title = authWindow.getTitle()

                if (title.startsWith('Denied')) {
                    let code = title.split(/[ =]/)[2]
                    reject(new Error(code))

                    authWindow.removeAllListeners('closed')
                    authWindow.close()
                } else if (title.startsWith('Success')) {
                    let code = title.split(/[ =]/)[2]
                    resolve(code)

                    authWindow.removeAllListeners('closed')
                    authWindow.close()
                }
            })
        })
    })
}

function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR)
    } catch (error) {
        if (error.code !== 'EEXIST') {
            throw error
        }
    }
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token))
    console.log('Token stored to ' + TOKEN_PATH)
}

function listEvents(auth) {
    var calendar = google.calendar('v3')

    calendar.events.list({
        auth: auth,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10, //TODO: list only 10 events
        singleEvents: true,
        orderBy: 'startTime'
    }, function(error, response) {
        if (error) {
            console.log('The API returned an error: ' + error)
            return
        }
        var events = response.items
        if (events.length === 0) {
            // console.log('No upcoming events found.')
        } else {
            // console.log('Upcoming 10 events:', events)
        }
    })
}

async function calendarApiGetMeetings(credentials, date) {
    let clientSecret = credentials.installed.client_secret
    let clientId = credentials.installed.client_id
    let redirectUrl = credentials.installed.redirect_uris[0]
    let auth = new googleAuth()
    let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)

    let token = await readTokenFromFile()

    if (!token) {
        // there is no token
    }

    oauth2Client.credentials = JSON.parse(token)

    return new Promise((resolve, reject) => {
        let calendar = google.calendar('v3')

        calendar.events.list({
            auth: oauth2Client,
            calendarId: 'primary',
            timeMin: (new Date(date)).toISOString(),
            timeMax: (new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)).toISOString(),
            singleEvents: true,
            orderBy: 'startTime'
        }, null, function(error, response) {
            if (error) {
                console.log('The API returned an error: ' + error)
                resolve([])
                return
            }
            var events = response.items
            if (events.length === 0) {
                resolve([])
            } else {
                resolve(events)
            }
        })
    })

}

module.exports.authorize = async function () {
    readFile('client_secret.json')
        .then(content => authorizeUser(JSON.parse(content)))
        .then(authClient => listEvents(authClient))
        .catch(error => console.log('Error loading client secret file: ' + error))
}

module.exports.getMeetingsForDate = async function (date) {
    let secret = await readFile('client_secret.json')
    let meetings = await calendarApiGetMeetings(JSON.parse(secret), date)

    return meetings
}