<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p class="text-gray-400 text-sm mt-1">Welcome back, Iryna 👋</p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-3 gap-6 mb-8">
      <!-- Balance -->
      <div class="bg-indigo-600 rounded-2xl p-6 text-white">
        <p class="text-indigo-200 text-sm mb-2">Total Balance</p>
        <p class="text-3xl font-bold">{{ formatAmount(transactionStore.balance) }}</p>
      </div>

      <!-- Income -->
      <div class="bg-white rounded-2xl p-6">
        <p class="text-gray-400 text-sm mb-2">Total Income</p>
        <p class="text-3xl font-bold text-green-500">{{ formatAmount(transactionStore.totalIncome) }}</p>
      </div>

      <!-- Expense -->
      <div class="bg-white rounded-2xl p-6">
        <p class="text-gray-400 text-sm mb-2">Total Expenses</p>
        <p class="text-3xl font-bold text-red-400">{{ formatAmount(transactionStore.totalExpense) }}</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="mb-8">
      <ExpenseChart />
    </div>

    <!-- Recent transactions -->
    <div class="bg-white rounded-2xl p-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
      <div class="space-y-3">
        <div
          v-for="transaction in transactionStore.items"
          :key="transaction.id"
          class="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
              {{ categoryStore.items.find(c => c.id === transaction.categoryId)?.icon }}
            </div>
            <div>
              <p class="text-sm font-medium text-gray-800">{{ transaction.description }}</p>
              <p class="text-xs text-gray-400">{{ transaction.date }}</p>
            </div>
          </div>
          <p
            class="font-semibold"
            :class="transaction.type === 'income' ? 'text-green-500' : 'text-red-400'"
          >
            {{ transaction.type === 'income' ? '+' : '-' }}
            {{ formatAmount(transaction.amount) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactions'
import { useCategoryStore } from '@/stores/categories'
import { useCurrency } from '@/composables/useCurrency'
import ExpenseChart from '@/components/shared/ExpenseChart.vue'

const { formatAmount } = useCurrency()
const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
</script>
