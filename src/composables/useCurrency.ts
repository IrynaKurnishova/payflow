import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'

export function useCurrency() {
  const uiStore = useUIStore()

  const currencySymbol = computed(() => {
    const symbols: Record<string, string> = {
      EUR: '€',
      USD: '$',
      CHF: '₣',
    }
    return symbols[uiStore.currency] ?? '€'
  })

  function formatAmount(amount: number): string {
    return `${currencySymbol.value}${amount.toFixed(2)}`
  }

  return { currencySymbol, formatAmount }
}
