//React
import {
  useEffect,
  useState
} from 'react'

//Bootstrap
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'

//Components
import DatePicker from './DatePicker'

const Calendar = (props) => {
  let { locale } = props

  const [currentWeek, setCurrentWeek] = useState()
  const [currentDate, setCurrentDate] = useState()
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }))
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString(locale, { month: 'long' }))
  const [selection, setSelection] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  })

  useEffect(() => {
    setCurrentWeek(getCurrentWeek())
    setCurrentDate(getCurrentDate())

    const time = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }))
    }, 1000)

    return () => clearInterval(time)
  }, [])

  const handlePreviousMonth = () => {

  }

  const handleNextMonth = () => {

  }

  const getCurrentWeek = () => {
    let date = new Date()
    let start = new Date(date.getFullYear(), 0, 1)
    let days = Math.floor((date - start) / (24 * 60 * 60 * 1000))

    return Math.ceil(days / 7)
  }

  const getCurrentDate = () => {
    let options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    let date = new Date()

    return date.toLocaleDateString(locale, options)
  }

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate()
  }

  const Dates = () => {
    let today = new Date()
    let date = new Date(today.getFullYear(), 11, 31)
    let maxDays = getDaysInMonth(selection.year, selection.month)
    let startsOn = new Date(selection.year, selection.month, 1).getDay()
    let dayNames = getDayNames(locale, 'short')

    return (
      <Container className="d-flex flex-column justify-content-even flex-fill p-2">
        <Row>
          <Col></Col>
          {
            dayNames.map((day) => {
              return <Col className="text-capitalize">{day}</Col>
            })
          }
        </Row>
      </Container>
    )
  }

  return (
    <Container fluid id="calendar" className="d-flex flex-column justify-content-start align-items-start w-100 h-100 m-0 p-2">
      <Container fluid className="d-flex flex-row justify-content-between fw-bold g-0">
        <div id="current_week">{currentWeek}</div>
        <div id="today" className="text-capitalize">{currentDate}</div>
        <div id="time">{currentTime}</div>
      </Container>
      <DatePicker {...{ locale }} />
    </Container>
  )
}

export default Calendar