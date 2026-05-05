import { useTransactionStore } from '@/stores/transactions';
import { useCategoryStore } from '@/stores/categories';

export const useExport = () => {
  const transactionStore = useTransactionStore();
  const categoryStore = useCategoryStore();

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];

    const rows = transactionStore.items.map(t => {
      const category = categoryStore.items.find(c => c.id === t.categoryId)
      return [
        t.date,
        t.description,
        category?.name ?? 'Unknown',
        t.type,
        t.amount.toString(),
      ]
    });

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a')
    link.href = url
    link.download = `payflow-transactions-${new Date().toISOString().split('T')[0]}.csv`
    link.click();

    URL.revokeObjectURL(url);
  }

  return { exportToCSV }
}
