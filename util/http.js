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

  set(ref(db, `databases/${databaseId}/expenses/` + newExpenseId), expenseData)
  return newExpenseId
}

export const fetchExpenses = async (databaseId) => {
  let expenses = []
  const dbRef = ref(getDatabase())
  const databaseRef = child(dbRef, `databases/${databaseId}/expenses`)
  await get(databaseRef).then((snapshot) => {
    if(snapshot.exists()) {
      expenses = Object.entries(snapshot.val()).map(snapshotExpense => {
        const [key, expense] = snapshotExpense
        return {
          id: key,
          description: expense.description,
          amount: expense.amount,
          categoryId: expense.categoryId,
          date: expense.date,
        }
      })
    }
  })
  return expenses
}

export const updateExpense = (id, expenseData, databaseId) => {
  set(ref(getDatabase(), `databases/${databaseId}/expenses/` + id), expenseData)
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
  remove(ref(getDatabase(), `databases/${databaseId}/expenses/` + id))
}

export const addCategory = (categoryData, databaseId) => {
  const db = getDatabase()
  const newCategoryKey = push(child(ref(db), `databases/${databaseId}/categories`)).key

  set(ref(db, `databases/${databaseId}/categories/` + newCategoryKey), categoryData)
  return newCategoryKey
}

export const fetchCategories = async databaseId => {
  let categories = []
  const dbRef = ref(getDatabase())
  const databaseRef = child(dbRef, `databases/${databaseId}/categories`)

  await get(databaseRef).then((snapshot) => {
    if (snapshot.exists()) {
      categories = Object.entries(snapshot.val()).map(snapshotCategory => {
        const [key, category] = snapshotCategory
        return {
          id: key,
          description: category.description,
          image: category.image,
        }
      })
    }
  })
  return categories
}

export const updateCategory = (id, categoryData, databaseId) => {
  set(ref(getDatabase(), `databases/${databaseId}/categories/` + id), categoryData)
}

export const deleteCategory = (id, databaseId) => {
  remove(ref(getDatabase(), `databases/${databaseId}/categories/` + id))
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
  const newDatabaseKey = push(child(ref(db), `users/${userKey}/databases`)).key
  set(ref(db, `users/${userKey}/databases/` + newDatabaseKey), defaultDatabaseId)
  return defaultDatabaseId
}

export const addUser = email => {
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

  await get(usersRef).then(snapshot => {
    if (snapshot.exists()) {
      Object.values(snapshot.val()).forEach(user => {
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
