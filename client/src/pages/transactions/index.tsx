import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import PageLayout from "@/components/page-layout";
import AddTransactionDrawer from "@/components/transaction/add-transaction-drawer";
import TransactionTable from "@/components/transaction/transaction-table";
import ImportTransactionModal from "@/components/transaction/import-transaction-modal";
import { useRole } from "@/context/role-provider";

export default function Transactions() {
  const { t } = useTranslation();
  const { isAdmin } = useRole();

  return (
    <PageLayout
      title={t("transactions.title")}
      subtitle={t("transactions.subtitle")}
      addMarginTop
      rightAction={
        isAdmin ? (
          <div className="flex items-center gap-2">
            <ImportTransactionModal />
            <AddTransactionDrawer />
          </div>
        ) : null
      }
    >
      <Card className="border-0 shadow-none">
        <CardContent className="pt-2">
          <TransactionTable pageSize={20} />
        </CardContent>
      </Card>
    </PageLayout>
  );
}