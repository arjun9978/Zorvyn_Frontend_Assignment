import { DataTable } from "@/components/data-table";
import { transactionColumns } from "./column";
import { _TRANSACTION_TYPE, _TransactionType } from "@/constant";
import { useState, useMemo } from "react";
import useDebouncedSearch from "@/hooks/use-debounce-search";
import {
  useBulkDeleteTransactionMutation,
  useGetAllTransactionsQuery,
} from "@/features/transaction/transactionAPI";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import useEditTransactionDrawer from "@/hooks/use-edit-transaction-drawer";
import { useRole } from "@/context/role-provider";

type FilterType = {
  type?: _TransactionType | undefined;  
  recurringStatus?: "RECURRING" | "NON_RECURRING" | undefined;
  pageNumber?: number;
  pageSize?: number;
};

const TransactionTable = (props: {
  pageSize?: number;
  isShowPagination?: boolean;
}) => {
  const { t } = useTranslation();
  const { isAdmin } = useRole();
  const { onOpenDrawer } = useEditTransactionDrawer();
  const [filter, setFilter] = useState<FilterType>({
    type: undefined,
    recurringStatus: undefined,
    pageNumber: 1,
    pageSize: props.pageSize || 10,
  });

  const { debouncedTerm, setSearchTerm } = useDebouncedSearch("", {
    delay: 500,
  });

  const [bulkDeleteTransaction, { isLoading: isBulkDeleting }] =
    useBulkDeleteTransactionMutation();

  const { data, isFetching } = useGetAllTransactionsQuery({
    keyword: debouncedTerm,
    type: filter.type,
    recurringStatus: filter.recurringStatus,
    pageNumber: filter.pageNumber,
    pageSize: filter.pageSize,
  });

  const transactions = data?.transations || [];
  const pagination = {
    totalItems: data?.pagination?.totalCount || 0,
    totalPages: data?.pagination?.totalPages || 0,
    pageNumber: filter.pageNumber,
    pageSize: filter.pageSize,
  };

  const handleSearch = (value: string) => {
    console.log(debouncedTerm);
    setSearchTerm(value);
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    const { type, frequently } = filters;
    setFilter((prev) => ({
      ...prev,
      type: type as _TransactionType,
      recurringStatus: frequently as "RECURRING" | "NON_RECURRING",
    }));
  };

  const handlePageChange = (pageNumber: number) => {
    setFilter((prev) => ({ ...prev, pageNumber }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setFilter((prev) => ({ ...prev, pageSize }));
  };

  const handleBulkDelete = (transactionIds: string[]) => {
    bulkDeleteTransaction(transactionIds)
      .unwrap()
      .then(() => {
        toast.success(t("transactions.deleted_successfully"));
      })
      .catch((error) => {
        toast.error(error.data?.message || "Failed to delete transactions");
      });
  };

  const handleBulkEdit = (transactionIds: string[]) => {
    if (transactionIds.length === 1) {
      onOpenDrawer(transactionIds[0]);
    }
  };

  // Filter out select column for viewers (no bulk actions available)
  const filteredColumns = useMemo(() => {
    if (!isAdmin) {
      return transactionColumns.filter(col => col.id !== "select");
    }
    return transactionColumns;
  }, [isAdmin]);

  return (
    <DataTable
      data={transactions} //transactions
      columns={filteredColumns}
      searchPlaceholder={t("transactions.search_placeholder")}
      isLoading={isFetching}
      isBulkDeleting={isBulkDeleting}
      isShowPagination={props.isShowPagination}
      pagination={pagination}
      filters={[
        {
          key: "type",
          label: t("transactions.all_types"),
          options: [
            { value: _TRANSACTION_TYPE.INCOME, label: t("dashboard.income") },
            { value: _TRANSACTION_TYPE.EXPENSE, label: t("dashboard.expenses") },
          ],
        },
        {
          key: "frequently",
          label: t("transactions.frequently"),
          options: [
            { value: "RECURRING", label: t("transactions.recurring") },
            { value: "NON_RECURRING", label: t("transactions.non_recurring") },
          ],
        },
      ]}
      onSearch={handleSearch}
      onPageChange={(pageNumber) => handlePageChange(pageNumber)}
      onPageSizeChange={(pageSize) => handlePageSizeChange(pageSize)}
      onFilterChange={(filters) => handleFilterChange(filters)}
      onBulkDelete={isAdmin ? handleBulkDelete : undefined}
      onBulkEdit={isAdmin ? handleBulkEdit : undefined}
    />
  );
};
export default TransactionTable;