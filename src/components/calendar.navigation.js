import Inferno from 'inferno'
import Component from 'inferno-component'

import { extendObservable } from 'mobx'
import infernoMobx from "inferno-mobx"

let observer = infernoMobx.observer

const CalendarNavigation = observer(
    class CalendarNavigation extends Component {
        constructor(props) {
            super(props)

            this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }

        prevMonth() {
            this.props.store.changeDateToDisplay(new Date(
                this.props.store.date.dateToDisplay.getFullYear(),
                this.props.store.date.dateToDisplay.getMonth() - 1,
                this.props.store.date.dateToDisplay.getDate()
            ))
        }

        nextMonth() {
            this.props.store.changeDateToDisplay(new Date(
                this.props.store.date.dateToDisplay.getFullYear(),
                this.props.store.date.dateToDisplay.getMonth() + 1,
                this.props.store.date.dateToDisplay.getDate()
            ))
        }

        render() {

            let dateToDisplay = this.props.store.date.dateToDisplay

            return (
                <header>
                    <svg viewBox="0 0 50 80" width="20px" height="20px" class="left" onClick={ _ => this.prevMonth() }>
                        <path fill="none" stroke="#FFF" d="M45.63 75.8L.375 38.087 45.63.375" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <h3 style="display: inline-block; user-select: none">
                        <div>{ dateToDisplay.getFullYear() }</div>
                        <div style="display: block; width: 100px">{ this.months[dateToDisplay.getMonth()] }</div>
                    </h3>

                    <svg viewBox="0 0 50 80" width="20px" height="20px" class="right" onClick={ _ => this.nextMonth() }>
                        <path fill="none" stroke="#FFF" d="M.375.375L45.63 38.087.375 75.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </header>
            )
        }
    }
)

export { CalendarNavigation }