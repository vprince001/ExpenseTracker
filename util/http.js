import axios from 'axios'
import { AUTHENTICATION_API_KEY } from '@env'
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  push,
  remove,
} from 'firebase/database'
import {generateDatabaseId} from "./helperFunctions";

export const addExpense = (expenseData, databaseId) => {
  const db = getDatabase()
  const newExpenseId = push(child(ref(db), `${databaseId}/expenses`)).key

  set(ref(db, `${databaseId}/expenses/` + newExpenseId), expenseData)
  return newExpenseId
}

export const fetchExpenses = async (databaseId) => {
  const expenses = []
  const dbRef = ref(getDatabase())
  const databaseRef = child(dbRef, `${databaseId}`)
  await get(databaseRef).then((snapshot) => {
    if(snapshot.exists()) {
      const data = snapshot.val()
      const snapshotExpenses = data.expenses
      for (const key in snapshotExpenses) {
        const snapshotExpense = snapshotExpenses[key]
        const expenseObj = {
          id: key,
          description: snapshotExpense.description,
          amount: snapshotExpense.amount,
          category: snapshotExpense.category,
          date: snapshotExpense.date,
        }
        expenses.push(expenseObj)
      }
    }
  })
  return expenses
}

export const updateExpense = (id, expenseData, databaseId) => {
  set(ref(getDatabase(), `${databaseId}/expenses/` + id), expenseData)
}

export const updateExpenses = (categoryId, categoryData, expenses, databaseId) => {
  expenses.forEach((expense) => {
    const { id: expenseId, ...rest } = expense
    if (categoryId === rest.category.id) {
      const updatedExpenseData = {
        ...rest,
        category: { ...categoryData, id: categoryId },
      }
      updateExpense(expenseId, updatedExpenseData, databaseId)
    }
  })
}

export const deleteExpense = (id, databaseId) => {
  remove(ref(getDatabase(), `${databaseId}/expenses/` + id))
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

export const addAppData = (appData) => {
  const db = getDatabase()
  const newAppDataId = push(child(ref(db), 'appData')).key

  set(ref(db, 'appData/' + newAppDataId), appData)
  return newAppDataId
}

export const fetchAppData = async () => {
  let appData = {}
  const dbRef = ref(getDatabase())
  const appDataRef = child(dbRef, 'appData')

  await get(appDataRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      const key = Object.keys(data)[0]
      appData = { ...data[key], id: key }
    }
  })
  return appData
}

export const updateAppData = (id, appData) => {
  set(ref(getDatabase(), 'appData/' + id), appData)
}

export const addDefaultDb = (db, userKey) => {
  const defaultDatabaseId = generateDatabaseId().toString()
  const newDatabaseId = push(child(ref(db), `users/${userKey}/databases`)).key
  set(ref(db, `users/${userKey}/databases/` + newDatabaseId), defaultDatabaseId)
  return defaultDatabaseId
}

export const addUser = (email) => {
  const db = getDatabase()
  const newUserKey = push(child(ref(db), 'users')).key
  set(ref(db, 'users/' + newUserKey), {email})
  return addDefaultDb(db, newUserKey)
}

export const createUser = async (email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${AUTHENTICATION_API_KEY}`

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  }).catch(error => {
    if (error.response) {
      // Request made and server responded
      console.log('error data', error.response.data);
      console.log('error status', error.response.status);
      console.log('error headers', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('error request', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('error message', error.message);
    }
  })

  return {token: response.data.idToken, defaultDatabaseId: addUser(email)}
}

const getDefaultDatabaseId = async (email) => {
  const dbRef = ref(getDatabase())
  const usersRef = child(dbRef, 'users')
  let defaultDBId = ''

  await get(usersRef).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val()
      Object.values(users).forEach(user => {
        if(user.email === email) {
          defaultDBId = Object.values(user.databases)[0]
        }
      })
    }
  })
  return defaultDBId
}

export const login = async (email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${AUTHENTICATION_API_KEY}`

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  })

  return {token: response.data.idToken, defaultDatabaseId: await getDefaultDatabaseId(email)}
}
