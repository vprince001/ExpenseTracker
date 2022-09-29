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
    } else {
      console.log('No Data Available')
    }
  })
  return expenses
}

export const updateExpense = (id, expenseData) => {
  const db = getDatabase()
  set(ref(db, 'expenses/' + id), expenseData)
}

export const updateExpenses = (categoryId, categoryData, expenses) => {
  expenses.forEach(async expense => {
    const { id: expenseId, ...rest} = expense
    if (categoryId === rest.category.id) {
      const updatedExpenseData = { ...rest, category: { ...categoryData, id: categoryId } }
      await updateExpense(expenseId, updatedExpenseData)
    }
  })
}

export const deleteExpense = (id) => {
  const db = getDatabase()
  remove(ref(db, 'expenses/' + id))
}

export const addCategory = async (categoryData) => {
  const response = await axios.post(
    DB_BASE_URL + '/categories.json',
    categoryData
  )
  const categoryId = response.data.name
  return categoryId
}

export const fetchCategories = async () => {
  const response = await axios.get(DB_BASE_URL + '/categories.json')

  const categories = []

  for (const key in response.data) {
    const categoryObj = {
      id: key,
      description: response.data[key].description,
      image: response.data[key].image,
    }
    categories.push(categoryObj)
  }

  return categories
}

export const updateCategory = (id, categoryData) => {
  return axios.put(DB_BASE_URL + `/categories/${id}.json`, categoryData)
}

export const deleteCategory = (id) => {
  return axios.delete(DB_BASE_URL + `/categories/${id}.json`)
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
