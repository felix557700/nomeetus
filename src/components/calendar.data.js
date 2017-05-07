import Inferno from 'inferno'
import Component from 'inferno-component'

import { extendObservable } from 'mobx'
import infernoMobx from "inferno-mobx"

import { modulo } from './util/util'

let observer = infernoMobx.observer

const CalendarData = observer(
    class CalendarData extends Component {
        constructor(props) {
            super(props)

            this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            this.dayOfWeeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            this.noOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        }

        initCalendarData(dateToDisplay) {
            let monthToDisplay = dateToDisplay.getMonth()
            let yearToDisplay = dateToDisplay.getFullYear()

            // Because of February
            if (monthToDisplay === 1) {
                this.noOfDaysInMonth[1] = ((yearToDisplay % 4 === 0 && yearToDisplay % 100 !== 0) || yearToDisplay % 400 === 0) ? 29 : 28
            }

            this.dateMatrix = this.generateDateMatrix(yearToDisplay, monthToDisplay)
        }

        generateDateMatrix(year, month) {
            let firstDay = new Date(year, month, 1)
            let firstDayPosition = modulo(firstDay.getDay() - 1, 7)  // Sunday is fucking = 0

            let dateMatrix = new Array(6)
            for (let i = 0; i < 6; i++) {
                dateMatrix[i] = new Array(7)
            }

            for (let i = firstDayPosition - 1; i > -1; i--) {
                dateMatrix[0][i] = this.noOfDaysInMonth[modulo(month - 1, 12)] - (firstDayPosition - i - 1)
            }

            let counter = 1, lastWeek, lastDay

            this.currentMonthStart = { weekIndex: 0, dayIndex: firstDayPosition }

            for (let j = firstDayPosition; j < 7; j++) {
                dateMatrix[0][j] = counter++
            }

            populateCurrentMonth:
                for (let i = 1; i < 6; i++) {
                    for (let j = 0; j < 7; j++) {
                        dateMatrix[i][j] = counter++
                        if (counter > this.noOfDaysInMonth[month]) {
                            lastWeek = i
                            lastDay = j
                            break populateCurrentMonth
                        }
                    }
                }

            this.currentMonthEnd = {weekIndex: lastWeek, dayIndex: lastDay}

            counter = 1

            for (let j = lastDay + 1; j < 7; j++) {
                dateMatrix[lastWeek][j] = counter++
            }

            return dateMatrix
        }

        onDayClick(day, event) {

            let monthDifference = 0

            if (event.currentTarget.className.includes('prev-month')) {
                monthDifference = -1
            }

            if (event.currentTarget.className.includes('next-month')) {
                monthDifference = +1
            }

            this.props.store.changeDateToDisplay(new Date(
                this.props.store.date.dateToDisplay.getFullYear(),
                this.props.store.date.dateToDisplay.getMonth() + monthDifference,
                day
            ))
        }

        render() {

            let dateToDisplay = this.props.store.date.dateToDisplay
            let currentDate = this.props.store.date.currentDate

            this.initCalendarData(dateToDisplay)

            return (
                <div class="calendar">
                    <div class="days-of-week">
                        { this.dayOfWeeks.map(dayLabel => <div>{ dayLabel }</div>) }
                    </div>

                    <div class="days">
                        {
                            this.dateMatrix.map((week, weekIndex) => {
                                return week.map((day, dayIndex) => {
                                    let className = 'prev-month'

                                    if (weekIndex === this.currentMonthStart.weekIndex && dayIndex < this.currentMonthStart.dayIndex) {
                                        className = 'prev-month'
                                    } else if (weekIndex === this.currentMonthEnd.weekIndex && dayIndex > this.currentMonthEnd.dayIndex) {
                                        className = 'next-month'
                                    } else if (day === currentDate.getDate() && currentDate.getMonth() === dateToDisplay.getMonth() && currentDate.getFullYear() === dateToDisplay.getFullYear()) {
                                        className = 'current-day'
                                    } else {
                                        className = ''
                                    }

                                    if (day === dateToDisplay.getDate() && !className.includes('prev-month') && !className.includes('next-month')) {
                                        className += ' ' + 'selected-day'
                                    }

                                    return (
                                        <div class={ className } onClick={ this.onDayClick.bind(this, day) }>
                                            <span>{ day }</span>
                                        </div>
                                    )
                                })
                            })
                        }
                    </div>
                </div>
            )
        }
    }
)

export { CalendarData }