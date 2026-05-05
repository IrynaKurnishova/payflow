import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { UIState } from '@/types';

export const useUIStore = defineStore('ui', () => {
  const theme = ref<UIState['theme']>('light');
  const currency = ref<UIState['currency']>('EUR');

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  };

  const setCurrency = (newCurrency: UIState['currency']) => {
    currency.value = newCurrency
  };

  return { theme, currency, toggleTheme, setCurrency }
})
