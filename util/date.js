const MonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const getFormattedDate = (date) => {
  let day = date.getDate()
  day = day < 10 ? '0' + day : day

  const monthName = MonthNames[date.getMonth()]

  return `${monthName} ${day}, ${date.getFullYear()}`
}

export const getShortMonthName = (date) => {
  const monthNumber = new Date(date).getMonth()
  const monthName = MonthNames[monthNumber]
  return monthName.substring(0, 3)
}
