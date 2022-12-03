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

  const handleYearBack = () => {
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

  const handleMonthBack = () => {
    let { year, month, week, day } = selection

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
    let { year, month, week, day } = selection

    if (year > 1970) {
      if (month < 11) {
        month++
      } else {
        year++
        month = 0
      }
      week = getWeekByDate(new Date(year, month, 1))
      day = 1

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
    let daysInLastMonth = new Date(year, month, 0).getDate()
    let startsOn = new Date(year, month, 0).getDay()
    let rows = []
    let count = 0

    for (let row = 0; row < 6; row++) {
      let notStarted = count < startsOn
      let lastMonth = month === 0 ? 11 : month - 1
      let newRow = [{
        year: selection.year,
        month: selection.month,
        week: getWeekByDate(new Date(notStarted && lastMonth === 11 ? year - 1 : year, notStarted ? lastMonth : month, notStarted ? daysInLastMonth - (startsOn - 2) : count + 1)),
        day: selection.day,
        isWeek: true,
        isLast: false,
        isNext: false,
        isCurrent: false
      }]

      for (let col = 0; col < 7; col++) {
        let dayInNextMonth = count - (daysInCurrentMonth) - startsOn
        let isLast = count < startsOn
        let isNext = count > startsOn + daysInCurrentMonth - 1
        let day = (isLast ? (daysInLastMonth - (startsOn - count)) : isNext ? dayInNextMonth : (count - startsOn)) + 1
        let newYear = isLast && month === 0 ? year - 1 : isNext && month === 11 ? year + 1 : year
        let newMonth = (month) => {
          if (isLast) {
            if (month === 0) return 11
            else return month - 1
          }
          if (isNext) {
            if (month === 11) return 0
            else return month + 1
          }
          return month
        }
        newRow.push({
          year: newYear,
          month: newMonth(month),
          week: getWeekByDate(new Date(year, month, day)),
          day: day,
          value: day + 1,
          isWeek: false,
          isLast: isLast,
          isNext: isNext,
          isCurrent: !isLast && !isNext
        })
        count++
      }
      rows.push(newRow)
    }
    return rows
  }

  const getWeekByDate = (date) => {
    var dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7)
  }

  return (
    <Container fluid className="d-flex flex-column flex-fill justify-content-start align-items-center m-0 p-0">
      <Container fluid className="d-flex flex-row justify-content-between align-items-center m-0 px-0 py-1">
        <img src={arrowLeft} className="me-3" style={{ cursor: 'pointer' }} onClick={handleYearBack} />
        <div id="selected_month" className="text-capitalize">{selection.year}</div>
        <img src={arrowRight} className="ms-3" style={{ cursor: 'pointer' }} onClick={handleYearNext} />
      </Container>
      <Container fluid className="d-flex flex-row justify-content-between align-items-center m-0 px-0 py-1">
        <img src={arrowLeft} className="me-3" style={{ cursor: 'pointer' }} onClick={handleMonthBack} />
        <div id="selected_month" className="text-capitalize">{new Date(selection.year, selection.month, selection.day).toLocaleDateString(locale, { month: 'long' })}</div>
        <img src={arrowRight} className="ms-3" style={{ cursor: 'pointer' }} onClick={handleMonthNext} />
      </Container>
      <Container className="d-flex flex-column justify-content-start align-items-center flex-fill">
        <Dates {...{ locale, selection, setSelection, data }} />
      </Container>
    </Container>
  )
}

export default DatePicker