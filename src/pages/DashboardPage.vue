<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p class="text-gray-400 text-sm mt-1">Welcome back, Iryna 👋</p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <!-- Balance -->
      <div class="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
        <div class="flex items-center justify-between mb-4">
          <p class="text-indigo-200 text-sm font-medium">Total Balance</p>
          <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
            💰
          </div>
        </div>
        <p class="text-3xl font-bold tracking-tight">{{ formatAmount(transactionStore.balance) }}</p>
        <p class="text-indigo-200 text-xs mt-2">Updated just now</p>
      </div>

      <!-- Income -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <p class="text-gray-400 text-sm font-medium">Total Income</p>
          <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl">
            📈
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800 tracking-tight">{{ formatAmount(transactionStore.totalIncome) }}</p>
        <div class="flex items-center gap-1 mt-2">
          <span class="text-green-500 text-xs font-medium">↑ Income</span>
          <span class="text-gray-400 text-xs">this month</span>
        </div>
      </div>

      <!-- Expense -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <p class="text-gray-400 text-sm font-medium">Total Expenses</p>
          <div class="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-xl">
            📉
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800 tracking-tight">{{ formatAmount(transactionStore.totalExpense) }}</p>
        <div class="flex items-center gap-1 mt-2">
          <span class="text-red-400 text-xs font-medium">↓ Expenses</span>
          <span class="text-gray-400 text-xs">this month</span>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="mb-8">
      <ExpenseChart />
    </div>

    <!-- Monthly Chart -->
    <div class="mb-8">
      <MonthlyChart />
    </div>

    <!-- Recent transactions -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <h2 class="text-lg font-semibold text-gray-800">Recent Transactions</h2>
        <RouterLink
          to="/transactions"
          class="text-sm text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
        >
          View all →
        </RouterLink>
      </div>
      <div>
        <div
          v-for="transaction in transactionStore.items.slice(0, 5)"
          :key="transaction.id"
          class="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              :style="{ backgroundColor: (categoryStore.items.find(c => c.id === transaction.categoryId)?.color ?? '#6366f1') + '20' }"
            >
              {{ categoryStore.items.find(c => c.id === transaction.categoryId)?.icon }}
            </div>
            <div>
              <p class="text-sm font-medium text-gray-800">{{ transaction.description }}</p>
              <p class="text-xs text-gray-400">{{ transaction.date }}</p>
            </div>
          </div>
          <div
            class="text-sm font-semibold px-3 py-1 rounded-lg"
            :class="transaction.type === 'income'
          ? 'text-green-600 bg-green-50'
          : 'text-red-500 bg-red-50'"
          >
            {{ transaction.type === 'income' ? '+' : '-' }}{{ formatAmount(transaction.amount) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactions';
import { useCategoryStore } from '@/stores/categories';
import { useCurrency } from '@/composables/useCurrency';
import ExpenseChart from '@/components/shared/ExpenseChart.vue';
import MonthlyChart from '@/components/shared/MonthlyChart.vue'

const { formatAmount } = useCurrency();
const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();
</script>
