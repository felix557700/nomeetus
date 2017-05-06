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

            extendObservable(this, {
                currentDate: new Date()
            })
        }

        prevMonth() {
            this.props.onNavigationButtonClick(-1)

            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1)
        }

        nextMonth() {
            this.props.onNavigationButtonClick(+1)

            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
        }

        render() {
            return (
                <header>
                    <svg viewBox="0 0 50 80" width="20px" height="20px" class="left" onClick={ _ => this.prevMonth() }>
                        <path fill="none" stroke="#FFF" d="M45.63 75.8L.375 38.087 45.63.375" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <h3 style="display: inline-block; user-select: none">
                        <div>{ this.currentDate.getFullYear() }</div>
                        <div style="display: block; width: 100px">{ this.months[this.currentDate.getMonth()] }</div>
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