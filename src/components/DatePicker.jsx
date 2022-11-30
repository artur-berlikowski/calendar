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
    if (selection.year > 1970) {
      if (selection.month > 0) {
        setSelection({
          ...selection,
          month: selection.month - 1
        })
      } else {
        setSelection({
          ...selection,
          year: selection.year - 1,
          month: 11
        })
      }
    }
  }

  const handleMonthNext = () => {
    if (selection.month < 11) {
      setSelection({
        ...selection,
        month: selection.month + 1
      })
    } else {
      setSelection({
        ...selection,
        year: selection.year + 1,
        month: 0
      })
    }
  }

  const generateDatesArray = async (year, month) => {
    let daysInCurrentMonth = new Date(month === 12 ? year + 1 : year, month === 12 ? 1 : month + 1, 0).getDate()
    let daysInLastMonth = new Date(month === 0 ? year - 1 : year, month === 0 ? 12 : month, 0).getDate()
    let startsOn = new Date(year, month, 1).getDay()
    let rows = []
    let count = 0

    for (let row = 0; row < 6; row++) {
      let notStarted = count < startsOn - 1
      let lastMonth = month === 0 ? 11 : month - 1
      let newRow = [{
        value: getWeekByDate(new Date(notStarted && lastMonth === 11 ? year - 1 : year, notStarted ? lastMonth : month, notStarted ? daysInLastMonth - (startsOn - 2) : count + 1)),
        isWeek: true,
        isLast: false,
        isNext: false
      }]

      for (let col = 0; col < 7; col++) {
        let nextMonth = count - daysInCurrentMonth - (startsOn - 2) > 0
        let dayInNextMonth = count - daysInCurrentMonth - (startsOn - 2)
        let isLast = count < startsOn - 1
        newRow.push({
          value: isLast ? daysInLastMonth - (startsOn - 2 - count) : nextMonth ? dayInNextMonth : count - (startsOn - 2),
          isWeek: false,
          isLast: isLast,
          isNext: nextMonth
        })
        count++
      }
      rows.push(newRow)
    }
    return rows
  }

  const getWeekByDate = (date) => {
    let start = new Date(date.getFullYear(), 0, 1)
    let days = Math.floor((date - start) / (24 * 60 * 60 * 1000))

    return Math.ceil(days / 7)
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