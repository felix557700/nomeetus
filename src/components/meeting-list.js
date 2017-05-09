import Inferno from 'inferno'
import Component from 'inferno-component'

import { extendObservable } from 'mobx'
import infernoMobx from "inferno-mobx"

let observer = infernoMobx.observer

const MeetingList = observer(
    class MeetingList extends Component {
        constructor(props) {
            super(props)
        }

        render() {

            let meetingList = []

            return (
                <div class="meeting-wrapper">
                    <div class="meeting-item">12:00 Meeting</div>
                    <div class="meeting-item">12:00 Meeting</div>
                    <div class="meeting-item">12:00 Meeting</div>
                    <div class="meeting-item">12:00 Meeting</div>
                    <div class="meeting-item">12:00 Meeting</div>
                    <div class="meeting-item">12:00 Meeting</div>
                    <div class="meeting-item">12:00 Meeting</div>
                    <div class="meeting-item">12:00 Meeting</div>
                    <div class="meeting-item">12:00 Meeting</div>
                    <div class="meeting-item">12:00 Meeting</div>
                </div>
            )
        }
    }
)

export { MeetingList }