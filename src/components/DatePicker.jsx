//React
import {
  useState,
  useEffect
} from 'react'

//Bootstrap
import {
  Container
} from 'react-bootstrap'

//Components
import Dates from './Dates'

//Images
import arrowLeft from '../assets/image/arrow_left.png'
import arrowRight from '../assets/image/arrow_right.png'

const DatePicker = (props) => {
  let { locale, selection, setSelection } = props

  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      let data = await generateDatesArray(selection.year, selection.month)
      setData(data)
    }

    getData()
  }, [selection])

  const handleYearLast = () => {
    if (selection.year > 1970) {
      setSelection({
        ...selection,
        year: selection.year - 1
      })
    }
  }

  const handleYearNext = () => {
    setSelection({
      ...selection,
      year: selection.year + 1
    })
  }

  const handleMonthLast = () => {
    let { year, month, week } = selection

    if (year >= 1970) {
      let lastDayOfLastMonth = new Date(year, month, 0).getDate()
      if (month > 0) {
        month--
      } else {
        year--
        month = 11
      }
      week = getWeekByDate(new Date(year, month, lastDayOfLastMonth))

      setSelection({
        ...selection,
        year: year,
        month: month,
        week: week,
        day: lastDayOfLastMonth
      })
    }
  }

  const handleMonthNext = () => {
    let { year, month } = selection

    if (year > 1970) {
      if (month < 11) {
        month++
      } else {
        year++
        month = 0
      }

      let day = 1
      let week = getWeekByDate(new Date(year, month, day))

      setSelection({
        ...selection,
        year: year,
        month: month,
        week: week,
        day: day
      })
    }
  }

  const generateDatesArray = async (year, month) => {
    let daysInCurrentMonth = new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, 0).getDate()
    let lastMonth = month === 0 ? 11 : month - 1
    let nextMonth = month === 11 ? 0 : month + 1
    let daysInLastMonth = new Date(year, month, 0).getDate()
    let startsOn = new Date(year, month, 0).getDay()
    let rows = []
    let count = 0

    for (let row = 0; row < 6; row++) {
      let notStarted = count < startsOn
      let newRow = [{
        year: year,
        month: month,
        week: getWeekByDate(new Date(notStarted && lastMonth === 11 ? year - 1 : year, notStarted ? lastMonth : month, notStarted ? daysInLastMonth - (startsOn - 2) : count + 1)),
        day: 1,
        isWeek: true,
        isLast: false,
        isNext: false,
        isCurrent: false
      }]

      for (let col = 0; col < 7; col++) {
        let dayInNextMonth = count - daysInCurrentMonth - startsOn
        let isLast = count < startsOn
        let isNext = count > startsOn + daysInCurrentMonth - 1
        let isCurrent = !isLast && !isNext
        let newYear = isLast && month === 0 ? year - 1 : isNext && month === 11 ? year + 1 : year
        let newMonth = isLast ? lastMonth : isNext ? nextMonth : month
        let newDay = (isLast ? daysInLastMonth - (startsOn - count) : isNext ? dayInNextMonth : (count - startsOn)) + 1
        let newWeek = getWeekByDate(new Date(newYear, newMonth, newDay))

        newRow.push({
          year: newYear,
          month: newMonth,
          week: newWeek,
          day: newDay,
          isWeek: false,
          isLast: isLast,
          isNext: isNext,
          isCurrent: isCurrent
        })
        count++
      }
      rows.push(newRow)
    }
    return rows
  }

  const getWeekByDate = (date) => {
    var day = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - day);
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7)
  }

  return (
    <Container fluid className="d-flex flex-column flex-fill justify-content-start align-items-center g-0">
      <Container fluid className="d-flex flex-row justify-content-between align-items-center g-0 py-1">
        <img src={arrowLeft} style={{ cursor: 'pointer' }} onClick={handleYearLast} />
        <div className="text-capitalize">{selection.year}</div>
        <img src={arrowRight} style={{ cursor: 'pointer' }} onClick={handleYearNext} />
      </Container>
      <Container fluid className="d-flex flex-row justify-content-between align-items-center g-0 py-1">
        <img src={arrowLeft} style={{ cursor: 'pointer' }} onClick={handleMonthLast} />
        <div className="text-capitalize">{new Date(selection.year, selection.month, selection.day).toLocaleDateString(locale, { month: 'long' })}</div>
        <img src={arrowRight} style={{ cursor: 'pointer' }} onClick={handleMonthNext} />
      </Container>
      <Container className="d-flex flex-column justify-content-start align-items-center flex-fill">
        <Dates {...{ locale, selection, setSelection, data }} />
      </Container>
    </Container>
  )
}

export default DatePicker