//Bootstrap
import {
  Table
} from 'react-bootstrap'

const Dates = (props) => {
  let { locale, selection, data } = props

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

export default Dates