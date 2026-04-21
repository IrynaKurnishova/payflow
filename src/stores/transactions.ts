import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Transaction } from '@/types'

export const useTransactionStore = defineStore('transactions', () => {
  const items = ref<Transaction[]>([
    {
      id: '1',
      amount: 3500,
      type: 'income',
      categoryId: '5',
      description: 'Salary',
      date: '2026-04-01',
    },
    {
      id: '2',
      amount: 120,
      type: 'expense',
      categoryId: '1',
      description: 'Groceries',
      date: '2026-04-05',
    },
    {
      id: '3',
      amount: 45,
      type: 'expense',
      categoryId: '2',
      description: 'Metro pass',
      date: '2026-04-07',
    },
  ])

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
