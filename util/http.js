import axios from 'axios'
import {DB_BASE_URL} from '@env'

export const storeExpense = (expenseData) => {
    axios.post(`${DB_BASE_URL}/expenses.json`, expenseData)
}