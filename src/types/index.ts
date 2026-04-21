export type TransactionType = 'income' | 'expense'

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export interface Transaction {
  id: string
  amount: number
  type: TransactionType
  categoryId: string
  description: string
  date: string
}

export interface UIState {
  theme: 'light' | 'dark'
  currency: 'EUR' | 'USD' | 'CHF'
}
