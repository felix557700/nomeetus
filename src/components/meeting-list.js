import Inferno from 'inferno'
import Component from 'inferno-component'

import { extendObservable } from 'mobx'
import infernoMobx from "inferno-mobx"

let observer = infernoMobx.observer

const {ipcRenderer} = require('electron')

const MeetingList = observer(
    class MeetingList extends Component {
        constructor(props) {
            super(props)

            extendObservable(this, {
                meetingList: []
            })

            ipcRenderer.addListener('ipc:message:meetings:reply', this.getList.bind(this))
            setTimeout(_ => {ipcRenderer.send('ipc:message:meetings:get', 'ping')}, 1000)
        }

        getList(event, arg) {
            this.meetingList = arg
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

                return (
                <div class="meeting-wrapper">
                    {
                        this.meetingList.map(meeting => {
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
)

export { MeetingList }