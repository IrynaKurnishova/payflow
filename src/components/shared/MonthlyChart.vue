<template>
  <div class="bg-white rounded-2xl p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-800">Monthly Overview</h2>
      <span class="text-sm text-gray-400">
        {{ new Date().toLocaleString('en', { month: 'long', year: 'numeric' }) }}
      </span>
    </div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { useTransactionStore } from '@/stores/transactions'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const transactionStore = useTransactionStore()

const chartData = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const labels: string[] = []
  const incomeData: number[] = []
  const expenseData: number[] = []

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    labels.push(String(day))

    const dayTransactions = transactionStore.items.filter(t => t.date === dateStr)

    incomeData.push(
      dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
    )

    expenseData.push(
      dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    )
  }

  return {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: '#22c55e',
        backgroundColor: '#22c55e20',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: 'Expenses',
        data: expenseData,
        borderColor: '#f43f5e',
        backgroundColor: '#f43f5e20',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f1f5f9',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}
</script>
