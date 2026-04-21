<script setup lang="ts">
import { ref } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import type { Category } from '@/types'

const categoryStore = useCategoryStore()

const showForm = ref(false)
const form = ref({
  name: '',
  icon: '📦',
  color: '#6366f1',
})

function submitForm() {
  if (!form.value.name) return

  const newCategory: Category = {
    id: Date.now().toString(),
    ...form.value,
  }

  categoryStore.addCategory(newCategory)
  form.value = { name: '', icon: '📦', color: '#6366f1' }
  showForm.value = false
}
</script>

<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Categories</h1>
        <p class="text-gray-400 text-sm mt-1">{{ categoryStore.items.length }} total</p>
      </div>
      <button
        class="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
        @click="showForm = !showForm"
      >
        + Add Category
      </button>
    </div>

    <!-- Form -->
    <div v-if="showForm" class="bg-white rounded-2xl p-6 mb-6 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">New Category</h2>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g. Entertainment"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Icon (emoji)</label>
          <input
            v-model="form.icon"
            type="text"
            placeholder="📦"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Color</label>
          <input
            v-model="form.color"
            type="color"
            class="w-full h-10 border border-gray-200 rounded-xl px-2 py-1 focus:outline-none focus:border-indigo-400"
          />
        </div>
      </div>
      <div class="flex gap-3 mt-4">
        <button
          class="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          @click="submitForm"
        >
          Save
        </button>
        <button
          class="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          @click="showForm = false"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Categories grid -->
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="category in categoryStore.items"
        :key="category.id"
        class="bg-white rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            :style="{ backgroundColor: category.color + '20' }"
          >
            {{ category.icon }}
          </div>
          <div>
            <p class="font-medium text-gray-800">{{ category.name }}</p>
            <div
              class="w-3 h-3 rounded-full mt-1"
              :style="{ backgroundColor: category.color }"
            />
          </div>
        </div>
        <button
          class="text-gray-300 hover:text-red-400 transition-colors"
          @click="categoryStore.removeCategory(category.id)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>
