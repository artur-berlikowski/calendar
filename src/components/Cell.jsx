const Cell = (props) => {
  let { parentCallback, year, month, week, day, value, mute, highlight, isWeek, isLast, isCurrent, isNext } = props

  const handleOnClick = (e) => {
    e.preventDefault()
    parentCallback({ year, month, week, day, mute, highlight, isWeek, isLast, isCurrent, isNext })
  }

  return (
    <td
      className={`border-0 text-center align-middle ${mute ? 'text-muted' : ''}`}
      style={{ height: '15,83%', background: `${highlight ? 'rgba(0,0,0,0.1)' : ''}`, cursor: 'pointer' }}
      onClick={handleOnClick}
    >
      {!isWeek ? day : week}
    </td>
  )
}

export default Cell