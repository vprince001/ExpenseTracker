import { getFormattedDate } from './date'

export const getDateExpenseLookup = (expenses) => {
  return expenses.reduce((prevExpense, currExpense) => {
    const date = getFormattedDate(new Date(currExpense.date))
    const existingItems = prevExpense[date] ? prevExpense[date] : []
    return { ...prevExpense, [date]: [...existingItems, currExpense] }
  }, {})
}

export const sortDescending = (sectionListData) => {
  const sortedSectionListData = sectionListData.sort((a, b) => {
    const firstTitle = parseInt(a.title.substring(0, 2))
    const secondTitle = parseInt(b.title.substring(0, 2))
    return secondTitle - firstTitle
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
