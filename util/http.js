import axios from 'axios'
import { DB_BASE_URL } from '@env'
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  push,
  remove,
} from 'firebase/database'

export const addExpense = (expenseData) => {
  const db = getDatabase()
  const newExpenseId = push(child(ref(db), 'expenses')).key

  set(ref(db, 'expenses/' + newExpenseId), expenseData)
  return newExpenseId
}

export const fetchExpenses = async () => {
  const expenses = []
  const dbRef = ref(getDatabase())
  const expensesRef = child(dbRef, 'expenses')

  await get(expensesRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      for (const key in data) {
        const expenseObj = {
          id: key,
          description: data[key].description,
          amount: data[key].amount,
          category: data[key].category,
          date: data[key].date,
        }
        expenses.push(expenseObj)
      }
    }
  })
  return expenses
}

export const updateExpense = (id, expenseData) => {
  set(ref(getDatabase(), 'expenses/' + id), expenseData)
}

export const updateExpenses = (categoryId, categoryData, expenses) => {
  expenses.forEach((expense) => {
    const { id: expenseId, ...rest } = expense
    if (categoryId === rest.category.id) {
      const updatedExpenseData = {
        ...rest,
        category: { ...categoryData, id: categoryId },
      }
      updateExpense(expenseId, updatedExpenseData)
    }
  })
}

export const deleteExpense = (id) => {
  remove(ref(getDatabase(), 'expenses/' + id))
}

export const addCategory = (categoryData) => {
  const db = getDatabase()
  const newCategoryId = push(child(ref(db), 'categories')).key

  set(ref(db, 'categories/' + newCategoryId), categoryData)
  return newCategoryId
}

export const fetchCategories = async () => {
  const categories = []
  const dbRef = ref(getDatabase())
  const categoriesRef = child(dbRef, 'categories')

  await get(categoriesRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      for (const key in data) {
        const categoriesObj = {
          id: key,
          description: data[key].description,
          image: data[key].image,
        }
        categories.push(categoriesObj)
      }
    }
  })
  return categories
}

export const updateCategory = (id, categoryData) => {
  set(ref(getDatabase(), 'categories/' + id), categoryData)
}

export const deleteCategory = (id) => {
  remove(ref(getDatabase(), 'categories/' + id))
}

export const addUserData = (userData) => {
  const db = getDatabase()
  const newUserDataId = push(child(ref(db), 'userData')).key

  set(ref(db, 'userData/' + newUserDataId), userData)
  return newUserDataId
}

export const fetchUserData = async () => {
  let userData = {}
  const dbRef = ref(getDatabase())
  const userDataRef = child(dbRef, 'userData')

  await get(userDataRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      const key = Object.keys(data)[0]
      userData = { ...data[key], id: key }
    }
  })
  return userData
}

export const updateUserData = (id, userData) => {
  set(ref(getDatabase(), 'userData/' + id), userData)
}
