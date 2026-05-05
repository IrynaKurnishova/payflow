<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Transactions</h1>
        <p class="text-gray-400 text-sm mt-1">{{ transactionStore.items.length }} total</p>
      </div>
      <div class="flex gap-3">
        <button
          class="bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          @click="exportToCSV"
        >
          ↓ Export CSV
        </button>
        <button
          class="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          @click="showForm = !showForm"
        >
          + Add Transaction
        </button>
      </div>
    </div>

    <!-- Form -->
    <div v-if="showForm" class="bg-white rounded-2xl p-6 mb-6 shadow-sm">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">
        {{ editingId ? 'Edit Transaction' : 'New Transaction' }}
      </h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Description</label>
          <input
            v-model="form.description"
            type="text"
            placeholder="e.g. Grocery shopping"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Amount (€)</label>
          <input
            v-model.number="form.amount"
            type="number"
            placeholder="0.00"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Type</label>
          <select
            v-model="form.type"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Category</label>
          <select
            v-model="form.categoryId"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
          >
            <option value="" disabled>Select category</option>
            <option
              v-for="cat in categoryStore.items"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.icon }} {{ cat.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Date</label>
          <input
            v-model="form.date"
            type="date"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>
      </div>
      <div class="flex gap-3 mt-4">
        <button
          class="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          @click="submitForm"
        >
          {{ editingId ? 'Update' : 'Save' }}
        </button>
        <button
          class="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          @click="showForm = false"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Filter -->
    <div class="flex gap-2 mb-4">
      <button
        v-for="f in ['all', 'income', 'expense']"
        :key="f"
        class="px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize"
        :class="filter === f ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'"
        @click="filter = f as typeof filter"
      >
        {{ f }}
      </button>
    </div>

    <!-- Search -->
    <div class="relative mb-6">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      <input
        v-model="search"
        type="text"
        placeholder="Search transactions..."
        class="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
      />
      <button
        v-if="search"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        @click="search = ''"
      >
        ✕
      </button>
    </div>

    <!-- Transactions list -->
    <div class="bg-white rounded-2xl overflow-hidden">
      <EmptyState
        v-if="filteredTransactions.length === 0"
        icon="🔍"
        :title="search ? 'Nothing found' : 'No transactions yet'"
        :description="search
        ? `No transactions matching '${search}'`
        : filter === 'all' ? 'Add your first transaction to get started' : `No ${filter} transactions found`"
        :action-label="!search && filter === 'all' ? '+ Add Transaction' : undefined"
        @action="showForm = true"
      />
      <template v-else>
        <div
          v-for="transaction in filteredTransactions"
          :key="transaction.id"
          class="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
              {{ categoryStore.items.find(c => c.id === transaction.categoryId)?.icon }}
            </div>
            <div>
              <p class="text-sm font-medium text-gray-800">{{ transaction.description }}</p>
              <p class="text-xs text-gray-400">{{ transaction.date }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <p
              class="font-semibold"
              :class="transaction.type === 'income' ? 'text-green-500' : 'text-red-400'"
            >
              {{ transaction.type === 'income' ? '+' : '-' }}€{{ transaction.amount }}
            </p>
            <div class="flex items-center gap-2">
              <button
                class="text-gray-300 hover:text-indigo-400 transition-colors text-lg"
                @click="startEdit(transaction)"
              >
                ✏️
              </button>
              <button
                class="text-gray-300 hover:text-red-400 transition-colors text-lg"
                @click="transactionStore.removeTransaction(transaction.id); show('Transaction deleted', 'error')"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTransactionStore } from '@/stores/transactions';
import { useCategoryStore } from '@/stores/categories';
import type { Transaction } from '@/types';
import { useExport } from '@/composables/useExport';
import { useToast } from '@/composables/useToast';
import EmptyState from '@/components/ui/EmptyState.vue';

const { show } = useToast();
const { exportToCSV } = useExport();
const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();

const filter = ref<'all' | 'income' | 'expense'>('all');

const search = ref('');
const showForm = ref(false);
const form = ref({
  description: '',
  amount: 0,
  type: 'expense' as Transaction['type'],
  categoryId: '',
  date: new Date().toISOString().split('T')[0],
});

const filteredTransactions = computed(() => {
  let result = transactionStore.items

  if (filter.value !== 'all') {
    result = result.filter(t => t.type === filter.value)
  }

  if (search.value.trim()) {
    const query = search.value.toLowerCase()
    result = result.filter(t =>
      t.description.toLowerCase().includes(query) ||
      categoryStore.items.find(c => c.id === t.categoryId)?.name.toLowerCase().includes(query)
    )
  }

  return result
});

const editingId = ref<string | null>(null)

const startEdit = (transaction: Transaction) => {
  editingId.value = transaction.id
  form.value = {
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    categoryId: transaction.categoryId,
    date: transaction.date,
  }
  showForm.value = true
};

const submitForm = () => {
  if (!form.value.description || !form.value.amount || !form.value.categoryId || !form.value.date) return

  if (editingId.value) {
    transactionStore.updateTransaction(editingId.value, {
      description: form.value.description,
      amount: form.value.amount,
      type: form.value.type,
      categoryId: form.value.categoryId,
      date: form.value.date,
    })
    editingId.value = null
    show('Transaction updated! ✏️', 'info')
  } else {
    transactionStore.addTransaction({
      id: Date.now().toString(),
      description: form.value.description,
      amount: form.value.amount,
      type: form.value.type,
      categoryId: form.value.categoryId,
      date: form.value.date,
    })
    show('Transaction added successfully! 🎉')
  }

  form.value = {
    description: '',
    amount: 0,
    type: 'expense',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
  }
  showForm.value = false
};
</script>
