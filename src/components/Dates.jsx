//Bootstrap
import {
  Table
} from 'react-bootstrap'

const Dates = (props) => {
  let { locale, selection, setSelection, data } = props

  const handleMakeSelection = (e) => {
    let id = e.target.id
    let isLast = id.search('last') !== -1
    let isNext = id.search('next') !== -1
    let isCurrent = id.search('current') !== -1

    if (isCurrent) {
      setSelection({
        ...selection,
        day: parseInt(id.replace('current_', ''))
      })
    } else if (isLast) {
      setSelection({
        ...selection,
        year: selection.month === 0 ? selection.year - 1 : selection.year,
        month: selection.month === 0 ? 11 : selection.month - 1,
        day: parseInt(id.replace('last_', ''))
      })
    } else if (isNext) {
      setSelection({
        ...selection,
        year: selection.month === 11 ? selection.year + 1 : selection.year,
        month: selection.month === 11 ? 0 : selection.month + 1,
        day: parseInt(id.replace('next_', ''))
      })
    }
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
          data && data.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {
                  row.map((entry, colIndex) => {
                    return (
                      <td
                        id={`${(entry.isLast ? 'last_' : '') + (entry.isNext ? 'next_' : '') + (!entry.isLast && !entry.isNext ? 'current_' : '') + entry.value}`}
                        className={`
                          border-0 
                            text-center
                            align-middle
                            ${entry.isLast || entry.isNext ? 'text-muted' : ''}
                            `}
                        style={{
                          height: '15,83%',
                          background: `${entry.isWeek ? 'rgba(0,0,0,0.1)' : !entry.isLast && !entry.isNext && entry.value === selection.day ? 'rgba(0,0,0,0.1)' : ''}`,
                          cursor: 'pointer'
                        }}
                        key={colIndex}
                        onClick={handleMakeSelection}
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

export default Dates