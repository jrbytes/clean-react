import React from 'react'

import Styles from './styles.scss'

type Props = {
  date: Date
  className?: string
}

const Calendar: React.FC<Props> = ({ date, className }) => (
  <time className={[Styles.calendarWrap, className].join(' ')}>
    <span aria-label="day" className={Styles.day}>
      {date.getDate().toString().padStart(2, '0')}
    </span>
    <span aria-label="month" className={Styles.month}>
      {date.toLocaleString('pt-BR', { month: 'short' }).substring(0, 3)}
    </span>
    <span aria-label="year" className={Styles.year}>
      {date.getFullYear()}
    </span>
  </time>
)

export default Calendar
