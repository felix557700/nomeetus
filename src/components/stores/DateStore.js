import Inferno from 'inferno'
import { extendObservable } from 'mobx'

class DateStore {

    constructor() {
        extendObservable(this, {
            date: {
                currentDate: new Date(),
                dateToDisplay: new Date()
            }
        })
    }

    changeDateToDisplay (newDate) {
        this.date.dateToDisplay = newDate
    }
}

const dateStore = new DateStore()

export { dateStore }