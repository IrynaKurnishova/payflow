<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Settings</h1>
      <p class="text-gray-400 text-sm mt-1">Customize your experience</p>
    </div>

    <div class="max-w-lg space-y-4">

      <!-- Theme -->
      <div class="bg-white rounded-2xl p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-800">Dark Mode</p>
            <p class="text-sm text-gray-400 mt-1">Switch between light and dark theme</p>
          </div>
          <button
            class="relative w-12 h-6 rounded-full transition-colors"
            :class="uiStore.theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'"
            @click="uiStore.toggleTheme"
          >
            <span
              class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform"
              :class="uiStore.theme === 'dark' ? 'translate-x-6' : 'translate-x-0'"
            />
          </button>
        </div>
      </div>

      <!-- Currency -->
      <div class="bg-white rounded-2xl p-6">
        <p class="font-medium text-gray-800 mb-3">Currency</p>
        <div class="space-y-2">
          <label
            v-for="c in currencies"
            :key="c.value"
            class="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input
              type="radio"
              :value="c.value"
              v-model="uiStore.currency"
              class="accent-indigo-600"
            />
            <span class="text-sm text-gray-700">{{ c.label }}</span>
          </label>
        </div>
      </div>

      <!-- About -->
      <div class="bg-white rounded-2xl p-6">
        <p class="font-medium text-gray-800 mb-3">About</p>
        <div class="space-y-2 text-sm text-gray-400">
          <p>Version 1.0.0</p>
          <p>Built with Vue 3 + TypeScript + Pinia</p>
          <p>💸 PayFlow — Personal Finance Dashboard</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()

const currencies = [
  { value: 'EUR', label: '€ Euro' },
  { value: 'USD', label: '$ Dollar' },
  { value: 'CHF', label: '₣ Swiss Franc' },
]
</script>
