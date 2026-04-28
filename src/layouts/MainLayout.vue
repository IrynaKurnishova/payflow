<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col">
      <!-- Logo -->
      <div class="p-6 border-b border-gray-100">
        <h1 class="text-xl font-bold text-indigo-600">💸 PayFlow</h1>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Personal Finance</p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          :class="{ 'bg-indigo-50 text-indigo-600 font-medium': route.path === item.path }"
        >
          <span class="text-lg">{{ item.icon }}</span>
          <span class="text-sm">{{ item.name }}</span>
        </RouterLink>
      </nav>

      <!-- Bottom -->
      <div class="p-4 border-t border-gray-100">
        <p class="text-xs text-gray-400 text-center">v1.0.0</p>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 bg-gray-100 dark:bg-gray-800 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Transactions', path: '/transactions', icon: '💳' },
  { name: 'Categories', path: '/categories', icon: '🗂️' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
]
</script>
