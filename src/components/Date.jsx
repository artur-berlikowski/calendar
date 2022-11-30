const Date = (props) => {
  let { id, year, month, week, day, mute, highlight } = props

  return (
    <td
      id={id} className={`border-0 text-center align-middle ${mute ? 'text-muted' : ''}`}
      style={{ height: '15,83%', background: `${highlight ? 'rgba(0,0,0,0.1)' : ''}`, cursor: 'pointer' }}
    >
      {day}
    </td>
  )
}

export default Date