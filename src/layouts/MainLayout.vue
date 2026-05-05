<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-800">

    <!-- Overlay (mobile only) -->
    <Transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/50 z-20 lg:hidden"
        @click="closeSidebar"
      />
    </Transition>

    <!-- Sidebar -->
    <Transition name="slide">
      <aside
        v-show="isSidebarOpen || true"
        class="fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col
               transition-transform duration-300
               -translate-x-full lg:translate-x-0"
        :class="{ 'translate-x-0': isSidebarOpen }"
      >
        <!-- Logo -->
        <div class="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold text-indigo-600">💸 PayFlow</h1>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Personal Finance</p>
          </div>
          <!-- Close button (mobile only) -->
          <button
            class="lg:hidden text-gray-400 hover:text-gray-600 text-xl"
            @click="closeSidebar"
          >
            ✕
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            :class="{ 'bg-indigo-50 text-indigo-600 font-medium': route.path === item.path }"
            @click="closeSidebar"
          >
            <span class="text-lg">{{ item.icon }}</span>
            <span class="text-sm">{{ item.name }}</span>
          </RouterLink>
        </nav>

        <!-- Bottom -->
        <div class="p-4 border-t border-gray-100 dark:border-gray-800">
          <p class="text-xs text-gray-400 text-center">v1.0.0</p>
        </div>
      </aside>
    </Transition>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0">

      <!-- Mobile header -->
      <header class="lg:hidden bg-white dark:bg-gray-900 shadow-sm px-4 py-3 flex items-center gap-3">
        <button
          class="text-gray-600 dark:text-gray-400 text-2xl"
          @click="isSidebarOpen = true"
        >
          ☰
        </button>
        <h1 class="text-lg font-bold text-indigo-600">💸 PayFlow</h1>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-auto bg-gray-100 dark:bg-gray-800">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" :key="$route.path" />
          </Transition>
        </RouterView>
      </main>
    </div>
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import ToastContainer from '@/components/ui/ToastContainer.vue'

const route = useRoute();
const isSidebarOpen = ref(false);

const navItems = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Transactions', path: '/transactions', icon: '💳' },
  { name: 'Categories', path: '/categories', icon: '🗂️' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
];

const closeSidebar = () => {
  isSidebarOpen.value = false
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
