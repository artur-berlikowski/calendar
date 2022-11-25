//React
import {
  useState,
  useEffect
} from 'react'

//Bootstrap
import {
  Container,
  Table
} from 'react-bootstrap'

//Images
import arrowLeft from '../assets/image/arrow_left.png'
import arrowRight from '../assets/image/arrow_right.png'

const DatePicker = (props) => {
  let { locale } = props

  const [selection, setSelection] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate()
  })

  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      let data = await generateDatesArray(selection.year, selection.month)
      setData(data)
    }

    getData()
  }, [selection])

  const Dates = () => {
    return (
      <Table className="h-100">
        <thead className="border-0 m-0 p-0">
          <tr>
            <th className="border-0" style={{ width: '12.5%', height: '5%' }}></th>
            {
              getDayNames().map((day, index) => {
                return <th key={index} className="text-center text-capitalize border-0" style={{ width: '12.5%' }}>{day}</th>
              })
            }
          </tr>
        </thead>
        <tbody className="border border-0 m-0 p-0">
          {
            data && data.map((row, rowIndex) => {
              return (
                <tr key={rowIndex} className="m-0 p-0">
                  {
                    row.map((entry, colIndex) => {
                      return (
                        <td
                          className={`
                          border-0 
                            text-center
                            align-middle
                            ${entry.isLast || entry.isNext ? 'text-muted' : ''}
                            ${!entry.isLast && !entry.isNext && entry.value === selection.date ? 'rounded-1' : ''}
                            `}
                          style={{
                            height: '15,83%',
                            background: `${entry.isWeek ? 'rgba(0,0,0,0.1)' : !entry.isLast && !entry.isNext && entry.value === selection.date ? 'rgba(0,0,0,0.1)' : ''}`,
                          }}
                          key={colIndex}
                        >
                          {entry.value}
                        </td>)
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }

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
    let daysInCurrentMonth = new Date(year, month + 1, 0).getDate()
    let daysInLastMonth = new Date(month === 0 ? year - 1 : year, month === 0 ? 12 : month, 0).getDate()
    let startsOn = new Date(year, month, 1).getDay()
    let rows = []
    let count = 0

    for (let row = 0; row < 6; row++) {
      let notStarted = count < startsOn - 1
      let lastMonth = month - 1
      let newRow = [{
        value: getWeekFromDate(new Date(year, notStarted ? lastMonth : month, notStarted ? daysInLastMonth - (startsOn - 2) : count - (startsOn - 2))),
        isWeek: true,
        isLast: false,
        isNext: false
      }]

      for (let col = 0; col < 7; col++) {
        let nextMonth = count - daysInCurrentMonth - (startsOn - 2) > 0
        let dayInNextMonth = count - daysInCurrentMonth - (startsOn - 2)
        newRow.push({
          value: count < startsOn - 1 ? daysInLastMonth - (startsOn - 2 - count) : nextMonth ? dayInNextMonth : count - (startsOn - 2),
          isWeek: false,
          isLast: count < startsOn - 1,
          isNext: nextMonth
        })
        count++
      }
      rows.push(newRow)
    }
    return rows
  }

  const getWeekFromDate = (date) => {
    let start = new Date(date.getFullYear(), 0, 1)
    let days = Math.floor((date - start) / (24 * 60 * 60 * 1000))

    return Math.ceil(days / 7)
  }

  const getDayNames = () => {
    let days = [1, 2, 3, 4, 5, 6, 7].map(day => {
      return new Date(2017, 4, day).toLocaleDateString(locale, { weekday: 'short' })
    })
    return days
  }

  return (
    <Container fluid className="d-flex flex-column flex-fill justify-content-start align-items-center">
      <Container fluid className="d-flex flex-row justify-content-center align-items-center m-0 px-2 py-1">
        <img src={arrowLeft} className="me-3" style={{ cursor: 'pointer' }} onClick={handleYearBack} />
        <div id="selected_month" className="text-capitalize">{selection.year}</div>
        <img src={arrowRight} className="ms-3" style={{ cursor: 'pointer' }} onClick={handleYearNext} />
      </Container>
      <Container fluid className="d-flex flex-row justify-content-center align-items-center m-0 px-2 py-1">
        <img src={arrowLeft} className="me-3" style={{ cursor: 'pointer' }} onClick={handleMonthBack} />
        <div id="selected_month" className="text-capitalize">{new Date(selection.year, selection.month, selection.date).toLocaleDateString(locale, { month: 'long' })}</div>
        <img src={arrowRight} className="ms-3" style={{ cursor: 'pointer' }} onClick={handleMonthNext} />
      </Container>
      <Container className="d-flex flex-column justify-content-start align-items-center flex-fill">
        <Dates />
      </Container>
    </Container>
  )
}

export default DatePicker