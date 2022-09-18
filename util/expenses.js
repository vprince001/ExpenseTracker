import { getFormattedDate, getShortMonthName } from './date'

export const getMonthExpenseLookup = (expenses) => {
  return expenses.reduce((prevExpense, currExpense) => {
    const shortMonthName = getShortMonthName(currExpense.date)
    const existingItems = prevExpense[shortMonthName] ? prevExpense[shortMonthName] : []
    return { ...prevExpense, [shortMonthName]: [...existingItems, currExpense] }
  }, {})
}

export const getDateExpenseLookup = (expenses) => {
  return expenses.reduce((prevExpense, currExpense) => {
    const date = getFormattedDate(new Date(currExpense.date))
    const existingItems = prevExpense[date] ? prevExpense[date] : []
    return { ...prevExpense, [date]: [...existingItems, currExpense] }
  }, {})
}

export const sortDescending = (sectionListData) => {
  const sortedSectionListData = sectionListData.sort((a, b) => {
    const startingIndexOfA = a.title.indexOf(',') - 2
    const startingIndexOfB = a.title.indexOf(',') - 2

    const firstTitleDate = parseInt(a.title.substring(startingIndexOfA, startingIndexOfA + 2))
    const secondTitleDate = parseInt(b.title.substring(startingIndexOfB, startingIndexOfB + 2))
    return secondTitleDate - firstTitleDate
  })
  return sortedSectionListData
}

export const getDateSectionExpenses = (dateExpenselookup) => {
  const sectionListData = []
  for (const date in dateExpenselookup) {
    sectionListData.push({ title: date, data: dateExpenselookup[date] })
  }
  return sectionListData
}
