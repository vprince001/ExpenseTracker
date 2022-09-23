import { getFormattedDate, getShortMonthName } from './date'

export const getCategoryExpenseLookup = (expenses) => {
  return expenses.reduce((lookup, currExpense) => {
    const categoryName = currExpense.category.description
    const existingItems = lookup[categoryName]
      ? lookup[categoryName]
      : []
    return { ...lookup, [categoryName]: [...existingItems, currExpense] }
  }, {})
}

export const getMonthExpenseLookup = (expenses) => {
  return expenses.reduce((lookup, currExpense) => {
    const shortMonthName = getShortMonthName(currExpense.date)
    const existingItems = lookup[shortMonthName]
      ? lookup[shortMonthName]
      : []
    return { ...lookup, [shortMonthName]: [...existingItems, currExpense] }
  }, {})
}

export const getDateExpenseLookup = (expenses) => {
  return expenses.reduce((lookup, currExpense) => {
    const date = getFormattedDate(new Date(currExpense.date))
    const existingItems = lookup[date] ? lookup[date] : []
    return { ...lookup, [date]: [...existingItems, currExpense] }
  }, {})
}

export const sortDescending = (sectionListData) => {
  const sortedSectionListData = sectionListData.sort((a, b) => {
    const startingIndexOfA = a.title.indexOf(',') - 2
    const startingIndexOfB = a.title.indexOf(',') - 2

    const firstTitleDate = parseInt(
      a.title.substring(startingIndexOfA, startingIndexOfA + 2)
    )
    const secondTitleDate = parseInt(
      b.title.substring(startingIndexOfB, startingIndexOfB + 2)
    )
    return secondTitleDate - firstTitleDate
  })
  return sortedSectionListData
}

export const getDateSectionExpenses = (dateExpenselookup) => {
  const sectionListData = []

  for (const date in dateExpenselookup) {
    const expenses = dateExpenselookup[date]
    const sum = expenses
      .reduce((sum, currExpense) => {
        return sum + currExpense.amount
      }, 0)
      .toFixed(2)

    sectionListData.push({ title: date, sum, data: expenses })
  }
  return sectionListData
}
