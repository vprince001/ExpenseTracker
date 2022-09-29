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

export const addExpense = async (expenseData) => {
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

export const addCategory = async (categoryData) => {
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

export const addUserData = async (userData) => {
  const response = await axios.post(DB_BASE_URL + '/userData.json', userData)
  const userId = response.data.name
  return userId
}

export const fetchUserData = async () => {
  const response = await axios.get(DB_BASE_URL + '/userData.json')

  let userData = response.data
  if (response.data) {
    const key = Object.keys(response.data)[0]
    userData = {...response.data[key], id: key}
  }

  return userData
}

export const updateUserData = (id, userData) => {
  return axios.put(DB_BASE_URL + `/userData/${id}.json`, userData)
}
