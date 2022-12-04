//Bootstrap
import {
  Table
} from 'react-bootstrap'

//Component
import Cell from './Cell'

const Dates = (props) => {
  let { locale, selection, setSelection, dates } = props

  const handleOnSelect = (dates) => {
    let { year, month, week, day } = dates

    setSelection({
      ...selection,
      year: year,
      month: month,
      week: week,
      day: day
    })
  }

  const getDayNames = () => {
    let days = [1, 2, 3, 4, 5, 6, 7].map(day => {
      return new Date(2017, 4, day).toLocaleDateString(locale, { weekday: 'short' })
    })
    return days
  }

  return (
    <Table className="h-100">
      <thead className="border-0">
        <tr>
          <th className="border-0" style={{ width: '12.5%', height: '5%' }}></th>
          {
            getDayNames().map((day, index) => {
              return <th key={index} className="text-center text-capitalize border-0" style={{ width: '12.5%' }}>{day}</th>
            })
          }
        </tr>
      </thead>
      <tbody className="border-0">
        {
          dates && dates.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {
                  row.map((entry, index) => {
                    let { year, month, week, day, isWeek, isLast, isNext, isCurrent } = entry

                    let mute = isLast || isNext
                    let highlight = isWeek || !isLast && !isNext && day === selection.day

                    return <Cell key={index} parentCallback={handleOnSelect} {...{ year, month, week, day, mute, highlight, isWeek, isLast, isCurrent, isNext }} />
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

export default Dates