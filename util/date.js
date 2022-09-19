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

const ShortMonthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
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

export const sortShortMonthNames = (shortMonthNames) => {
  return shortMonthNames.sort((a, b) => {
    return ShortMonthNames.indexOf(a) > ShortMonthNames.indexOf(b)
  })
}
