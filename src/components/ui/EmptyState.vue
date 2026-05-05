<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="text-6xl mb-4">{{ icon }}</div>
    <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title }}</h3>
    <p class="text-gray-400 text-sm max-w-xs mb-6">{{ description }}</p>
    <button
      v-if="actionLabel"
      class="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
  actionLabel?: string
}>();

defineEmits<{
  action: []
}>();
</script>
