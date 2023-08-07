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
