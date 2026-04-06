import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import PageLayout from "@/components/page-layout";
import ReportTable from "./_component/report-table";
import InstantReportGenerator from "./_component/instant-report-generator";


export default function Reports() {
  const { t } = useTranslation();
 
  return (
    <PageLayout
      title={t("reports.title")}
      subtitle={t("reports.subtitle")}
      addMarginTop
    >
      {/* Instant Report Generator */}
      <Card className="border shadow-none mb-6">
        <CardContent className="p-0">
          <InstantReportGenerator />
        </CardContent>
      </Card>

      {/* Report History */}
      <Card className="border shadow-none">
        <CardHeader>
          <CardTitle>Report History</CardTitle>
        </CardHeader>
        <CardContent>
          <ReportTable />
        </CardContent>
      </Card>
    </PageLayout>
  );
}