import axios from 'axios'
import { DB_BASE_URL } from '@env'

export const addExpense = async (expenseData) => {
  const response = await axios.post(DB_BASE_URL + '/expenses.json', expenseData)
  const expenseId = response.data.name
  return expenseId
}

export const fetchExpenses = async () => {
  const response = await axios.get(DB_BASE_URL + '/expenses.json')

  const expenses = []

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      description: response.data[key].description,
      amount: response.data[key].amount,
      category: response.data[key].category,
      date: response.data[key].date,
    }
    expenses.push(expenseObj)
  }

  return expenses
}

export const updateExpense = (id, expenseData) => {
  return axios.put(DB_BASE_URL + `/expenses/${id}.json`, expenseData)
}

export const deleteExpense = (id) => {
  return axios.delete(DB_BASE_URL + `/expenses/${id}.json`)
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
