import Inferno from 'inferno'
import { extendObservable } from 'mobx'

const remote = require('electron').remote
const main = remote.require('./main.js')

class MeetingStore {

    constructor() {
        extendObservable(this, {
            currentDate: null,
            meetingList: null
        })
    }

    getMeetingList() {

        if (!this.meetingList) {
            this.meetingList = main.getMeetingListFromMain(this.currentDate)
        }

        return this.meetingList
    }

    syncMeetingList() {
        this.meetingList = main.getMeetingListFromMain(this.currentDate)
    }

    async changeDate(newDate) {
        this.currentDate = newDate
        console.log('date changed')

        this.meetingList = await main.getMeetingListFromMain(newDate)
    }

}


const meetingStore = new MeetingStore()

export {meetingStore}