import Inferno from 'inferno'
import { extendObservable } from 'mobx'

import { meetingStore } from './MeetingStore'

class DateStore {

    constructor() {
        extendObservable(this, {
            date: {
                currentDate: new Date(),
                dateToDisplay: new Date()
            }
        })

        meetingStore.changeDate(new Date())
    }

    changeDateToDisplay (newDate) {
        this.date.dateToDisplay = newDate

        meetingStore.changeDate(newDate)
    }
}

const dateStore = new DateStore()

export { dateStore }