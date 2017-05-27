import Inferno from 'inferno'

import { Calendar } from './components/calendar'
import { startNotificationListening } from './components/notification'

Inferno.render(<Calendar />, document.getElementById('calendar-app'))

startNotificationListening()