import {
  format,
  isFuture,
  isThisWeek,
  isThisYear,
  isToday,
  isYesterday,
} from 'date-fns'
import { useMemo } from 'react'

type MessageItemProps = {
  timestamp: string
}

const classNames = 'text-xs text-gray-500 text-center block my-4'

const ChatTimestamp = ({ timestamp }: MessageItemProps) => {
  const date = useMemo(() => new Date(timestamp), [timestamp])

  if (isNaN(date.getTime())) {
    return null // Invalid date
  }

  if (isFuture(date)) {
    return (
      <span className={classNames}>{format(date, 'yyyy-MM-dd HH:mm')}</span>
    )
  }

  if (isToday(date)) {
    return (
      <span className={classNames}>
        <strong>Today</strong> {format(date, 'HH:mm')}
      </span>
    )
  }

  if (isYesterday(date)) {
    return (
      <span className={classNames}>
        <strong>Yesterday</strong> {format(date, 'HH:mm')}
      </span>
    )
  }

  if (isThisWeek(date)) {
    return <span className={classNames}>{format(date, 'EEEE HH:mm')}</span>
  }

  if (isThisYear(date)) {
    return <span className={classNames}>{format(date, 'MMM dd HH:mm')}</span>
  }

  return <span className={classNames}>{format(date, 'yyyy-MM-dd HH:mm')}</span>
}

export default ChatTimestamp
