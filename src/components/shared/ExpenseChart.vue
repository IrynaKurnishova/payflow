<template>
  <div class="bg-white rounded-2xl p-6">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Expenses by Category</h2>
    <div class="max-w-xs mx-auto">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTransactionStore } from '@/stores/transactions';
import { useCategoryStore } from '@/stores/categories';

ChartJS.register(ArcElement, Tooltip, Legend);

const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();

const chartData = computed(() => {
  const expensesByCategory: Record<string, number> = {}

  transactionStore.items
    .filter(t => t.type === 'expense')
    .forEach(t => {
      expensesByCategory[t.categoryId] = (expensesByCategory[t.categoryId] ?? 0) + t.amount
    })

  const labels = Object.keys(expensesByCategory).map(id => {
    const cat = categoryStore.items.find(c => c.id === id)
    return `${cat?.icon} ${cat?.name}`
  })

  const data = Object.values(expensesByCategory)
  const colors = Object.keys(expensesByCategory).map(id => {
    return categoryStore.items.find(c => c.id === id)?.color ?? '#6366f1'
  })

  return {
    labels,
    datasets: [{
      data,
      backgroundColor: colors,
      borderWidth: 0,
    }]
  }
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    }
  },
  cutout: '70%',
};
</script>
