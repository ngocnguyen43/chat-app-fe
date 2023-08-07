export function unixTimestampToDateWithHour(unixTimestamp: number) {
  const dateObj = new Date(unixTimestamp * 1000)
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  const hours = String(dateObj.getHours()).padStart(2, '0')

  return `${year}-${month}-${day}-${hours}`
}
export function formatTime(unixTimestamp: number) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dateObj = new Date(unixTimestamp * 1000)
  const dayOfWeek = daysOfWeek[dateObj.getDay()]
  const hours = dateObj.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12
  return `${dayOfWeek}, ${formattedHour} ${ampm}`
}
export function formatAgo(unixTimestamp: number) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = currentTime - unixTimestamp;

  if (timeDifference < 60) {
    return `${timeDifference}s`;
  } else if (timeDifference < 3600) {
    const minutesAgo = Math.floor(timeDifference / 60);
    return `${minutesAgo}m`;
  } else if (timeDifference < 86400) {
    const hoursAgo = Math.floor(timeDifference / 3600);
    return `${hoursAgo}h`;
  } else {
    const daysAgo = Math.floor(timeDifference / 86400);
    return `${daysAgo}d`;
  }
}