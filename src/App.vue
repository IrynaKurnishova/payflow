<script setup lang="ts">
import { watch } from 'vue'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()

watch(() => uiStore.theme, (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <RouterView />
  </div>
</template>
