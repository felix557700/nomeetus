import Inferno from 'inferno'
import Component from 'inferno-component'
import { extendObservable } from 'mobx'
import infernoMobx from "inferno-mobx"

import { CalendarNavigation } from './calendar.navigation'
import { CalendarData } from './calendar.data'
import { MeetingList } from './meeting-list'
import { dateStore } from './stores/DateStore'

let observer = infernoMobx.observer

const Calendar = observer(
    class Calendar extends Component {
        constructor() {
            super();

            this.store = dateStore
        }

        render() {
            return (
                <div class="calendar-container">

                    <CalendarNavigation store={ this.store }/>

                    <CalendarData store={ this.store }/>

                    <MeetingList/>

                </div>
            )
        }
    }
)

export { Calendar }