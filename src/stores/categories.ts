import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/types'

const STORAGE_KEY = 'payflow_categories'

const defaultCategories: Category[] = [
  { id: '1', name: 'Food', icon: '🍔', color: '#f97316' },
  { id: '2', name: 'Transport', icon: '🚗', color: '#3b82f6' },
  { id: '3', name: 'Shopping', icon: '🛍️', color: '#a855f7' },
  { id: '4', name: 'Health', icon: '💊', color: '#22c55e' },
  { id: '5', name: 'Salary', icon: '💰', color: '#eab308' },
]

function loadFromStorage(): Category[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : defaultCategories
}

export const useCategoryStore = defineStore('categories', () => {
  const items = ref<Category[]>(loadFromStorage())

  watch(items, (newItems) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
  }, { deep: true })

  function addCategory(category: Category) {
    items.value.push(category)
  }

  function removeCategory(id: string) {
    items.value = items.value.filter(c => c.id !== id)
  }

  return { items, addCategory, removeCategory }
})
