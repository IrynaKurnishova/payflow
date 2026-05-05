import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string
  message: string
  type: ToastType
}

const toasts = ref<Toast[]>([]);

export const useToast = () => {
  const show = (message: string, type: ToastType = 'success') => {
    const id = Date.now().toString()
    toasts.value.push({ id, message, type })

    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
  };

  const remove = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  };

  return { toasts, show, remove }
}
