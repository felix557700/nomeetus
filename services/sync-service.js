const googleCalendar = require('./googlecalendar')
const {webContents, BrowserWindow} = require('electron')

var schedule = require('node-schedule')

// sync interval once in 3 min
const SYNC_INTERVAL = 3 * 60 * 1000

module.exports = class SyncService {

    constructor() {
        this.meetingToNotify = null
    }

    async getMeetings() {
        const currentDate = new Date()

        const meetings = await googleCalendar.getMeetingsForDate(currentDate)

        return meetings
    }

    async tick() {
        try {
            console.log('Sync: tick')

            let meetings = await this.getMeetings()

            if (!meetings || meetings.length === 0) {
                return
            }

            this.notifyAboutMeeting(meetings[0])

        } catch (e) {
            console.error(e, e.stack)

        } finally {
            this.timeout = setTimeout(this.tick.bind(this), SYNC_INTERVAL)
        }
    }

    async start() {
        if (this.timeout) this.stop()

        console.log('Sync: Start')
        this.tick()
    }

    stop() {
        clearTimeout(this.timeout)
    }

    notifyAboutMeeting(meeting) {
        
        let contents = webContents.getAllWebContents()

        let calendarWebContent = contents.filter(w => w.browserWindowOptions && w.browserWindowOptions.windowPosition === 'trayCenter')[0]

        if (!calendarWebContent) {
            return
        }
        
        if (this.checkIfMeetingsAreSame(this.meetingToNotify, meeting)) {
            return
        }

        if (this.job3MinBefore) {
            this.job3MinBefore.cancel()
        }

        this.calendarWebContent = calendarWebContent
        this.meetingToNotify = meeting

        let meetingStartTime = new Date(meeting.start.dateTime)

        this.scheduleMeetingNotification(meetingStartTime)
    }

    scheduleMeetingNotification(startTime) {
        let startJob3MinBefore = new Date(
            startTime.getFullYear(),
            startTime.getMonth(),
            startTime.getDate(),
            startTime.getHours(),
            startTime.getMinutes() - 3
        )

        let startJobOnTime = new Date(
            startTime.getFullYear(),
            startTime.getMonth(),
            startTime.getDate(),
            startTime.getHours(),
            startTime.getMinutes()
        )

        this.job3MinBefore = schedule.scheduleJob(startJob3MinBefore, () => {
            // Send notification for next meeting to renderer
            this.calendarWebContent.send('alert:meeting', this.meetingToNotify)

            this.job3MinBefore = null
        })


        this.justInTimeCronJob = schedule.scheduleJob(startJobOnTime, () => {
            this.meetingToNotify = null
            this.justInTimeCronJob = null

            // pop up alert window
            let alertWindow = new BrowserWindow({
                alwaysOnTop: true,
                backgroundColor: '#f6f6f6',
                width: 500,
                height: 300,
                useContentSize: true
            })

            alertWindow.loadURL(`file://${__dirname}/alert-window.html`)

            alertWindow.on('closed', function() {
                alertWindow = null
            })
        })
    }

    checkIfMeetingsAreSame(meetingOne, meetingTwo) {
        return !!meetingOne
            && !!meetingTwo
            && meetingOne.summary === meetingTwo.summary
            && meetingOne.start.dateTime === meetingTwo.start.dateTime
    }
}