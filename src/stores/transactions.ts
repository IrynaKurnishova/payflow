import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Transaction } from '@/types'

const STORAGE_KEY = 'payflow_transactions'

function loadFromStorage(): Transaction[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : [
    {
      id: '1',
      amount: 3500,
      type: 'income',
      categoryId: '5',
      description: 'Salary',
      date: '2026-05-01',
    },
    {
      id: '2',
      amount: 120,
      type: 'expense',
      categoryId: '1',
      description: 'Groceries',
      date: '2026-05-03',
    },
    {
      id: '3',
      amount: 45,
      type: 'expense',
      categoryId: '2',
      description: 'Metro pass',
      date: '2026-05-04',
    },
  ]
}

export const useTransactionStore = defineStore('transactions', () => {
  const items = ref<Transaction[]>(loadFromStorage())

  // автоматически сохраняем в localStorage при каждом изменении
  watch(items, (newItems) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
  }, { deep: true })

  const totalIncome = computed(() =>
    items.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  )

  const totalExpense = computed(() =>
    items.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  )

  const balance = computed(() => totalIncome.value - totalExpense.value)

  function addTransaction(transaction: Transaction) {
    items.value.push(transaction)
  }

  function removeTransaction(id: string) {
    items.value = items.value.filter(t => t.id !== id)
  }

  return { items, totalIncome, totalExpense, balance, addTransaction, removeTransaction }
})
