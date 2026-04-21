import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/types'

export const useCategoryStore = defineStore('categories', () => {
  const items = ref<Category[]>([
    { id: '1', name: 'Food', icon: '🍔', color: '#f97316' },
    { id: '2', name: 'Transport', icon: '🚗', color: '#3b82f6' },
    { id: '3', name: 'Shopping', icon: '🛍️', color: '#a855f7' },
    { id: '4', name: 'Health', icon: '💊', color: '#22c55e' },
    { id: '5', name: 'Salary', icon: '💰', color: '#eab308' },
  ])

  function addCategory(category: Category) {
    items.value.push(category)
  }

  function removeCategory(id: string) {
    items.value = items.value.filter(c => c.id !== id)
  }

  return { items, addCategory, removeCategory }
})
