import Inferno from 'inferno'
import Component from 'inferno-component'

import {Loader} from './loader'

import {extendObservable} from 'mobx'
import infernoMobx from "inferno-mobx"

let observer = infernoMobx.observer

const MeetingList = observer(
    class MeetingList extends Component {
        constructor(props) {
            super(props)
        }

        getFormattedTime(dateTime) {
            let placeholder = new Date(dateTime)
            let hours = placeholder.getHours()
            let minutes = placeholder.getMinutes()

            if (minutes < 10) {
                minutes = `0${minutes}`
            }

            return `${hours}:${minutes}`
        }

        render() {

            let meetingList = this.props.store.meetingList

            if (!meetingList) {

                return <Loader />

            } else if (meetingList.length === 0) {

                return (
                    <div class="meeting-wrapper">
                        <div class="no-meetings-today"> No meetings for you! </div>
                    </div>
                )

            } else {

                return (
                    <div class="meeting-wrapper">
                        {
                            meetingList.map(meeting => {
                                return (
                                    <div class="meeting-item">
                                        <div class="meeting-data">
                                            { this.getFormattedTime(meeting.start.dateTime) }
                                        </div>
                                        <div className="meeting-summary">
                                            { meeting.summary }
                                        </div>
                                        <div style="grid-column: 1 / span 2;justify-self: end; color: #999;">{ meeting.location }</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        }
    }
)

export { MeetingList }