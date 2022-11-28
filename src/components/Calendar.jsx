//React
import {
  useEffect,
  useState
} from 'react'

//Bootstrap
import {
  Container
} from 'react-bootstrap'

//Components
import DatePicker from './DatePicker'

const Calendar = (props) => {
  let { locale } = props

  const getCurrentWeek = () => {
    let date = new Date()
    let start = new Date(date.getFullYear(), 0, 1)
    let days = Math.floor((date - start) / (24 * 60 * 60 * 1000))

    return Math.ceil(days / 7)
  }

  const [today, setToday] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    week: getCurrentWeek(),
    day: new Date().getDate(),
    time: new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
    localeDateString: new Date().toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  })

  const [selection, setSelection] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    week: getCurrentWeek(),
    date: new Date().getDate()
  })

  useEffect(() => {
    const time = setInterval(() => {
      setToday({
        ...today,
        time: new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
      })
    }, 1000)

    return () => clearInterval(time)
  }, [])

  return (
    <Container fluid id="calendar" className="d-flex flex-column justify-content-start align-items-start w-100 h-100 m-0 p-2">
      <Container fluid className="d-flex flex-row justify-content-between fw-bold mb-2">
        <div id="current_week">{today.week}</div>
        <div id="today" className="text-capitalize">{today.localeDateString}</div>
        <div id="time">{today.time}</div>
      </Container>
      <DatePicker {...{ locale, selection, setSelection }} />
    </Container>
  )
}

export default Calendar