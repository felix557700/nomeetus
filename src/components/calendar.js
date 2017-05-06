import Inferno from 'inferno'
import Component from 'inferno-component'
import { extendObservable } from 'mobx'
import infernoMobx from "inferno-mobx"

import { CalendarNavigation } from './calendar.navigation'
import { CalendarData } from './calendar.data'

let observer = infernoMobx.observer

const Calendar = observer(
    class Calendar extends Component {
        constructor() {
            super();

            extendObservable(this, {
                currentDate : new Date()
            })
        }

        onButtonClickHandler(monthDifference) {
            this.currentDate = new Date(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth() + monthDifference,
                this.currentDate.getDate()
            )
        }

        render() {
            return (
                <div class="calendar-container">

                    <CalendarNavigation onNavigationButtonClick={ this.onButtonClickHandler.bind(this) }/>

                    <CalendarData date={ this.currentDate } />

                </div>
            )
        }
    }
)

export { Calendar }