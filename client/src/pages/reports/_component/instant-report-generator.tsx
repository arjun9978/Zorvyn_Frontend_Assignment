import { Button } from "@/components/ui/button";
import { Download, FileText, Loader } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, subDays, subMonths, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { toast } from "sonner";
import { getMockTransactions, addReportDownload } from "@/lib/mock-data";

const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === "true";

const InstantReportGenerator = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  const [isGenerating, setIsGenerating] = useState(false);

  const getPeriodLabel = (period: string): string => {
    switch (period) {
      case "last7days":
        return "Last 7 Days";
      case "last30days":
        return "Last 30 Days";
      case "lastMonth":
        return "Last Month";
      case "thisMonth":
        return "This Month";
      case "thisYear":
        return "This Year";
      default:
        return "Last 30 Days";
    }
  };

  const getDateRange = (period: string) => {
    const now = new Date();
    let from: Date;
    let to: Date = now;

    switch (period) {
      case "last7days":
        from = subDays(now, 7);
        break;
      case "last30days":
        from = subDays(now, 30);
        break;
      case "lastMonth":
        from = startOfMonth(subMonths(now, 1));
        to = endOfMonth(subMonths(now, 1));
        break;
      case "thisMonth":
        from = startOfMonth(now);
        break;
      case "thisYear":
        from = startOfYear(now);
        to = endOfYear(now);
        break;
      default:
        from = subDays(now, 30);
    }

    return {
      from: from.toISOString(),
      to: to.toISOString(),
    };
  };

  const generateMockPDF = (from: string, to: string) => {
    // Get mock transactions for the period
    const allTransactions = getMockTransactions();
    const fromDate = new Date(from).getTime();
    const toDate = new Date(to).getTime();
    
    const filteredTransactions = allTransactions.filter(t => {
      const tDate = new Date(t.date).getTime();
      return tDate >= fromDate && tDate <= toDate;
    });

    // Calculate summary
    const totalIncome = filteredTransactions
      .filter(t => t.type === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpense = filteredTransactions
      .filter(t => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);

    // Create a simple HTML representation
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Financial Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    h1 { color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px; }
    .summary { background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .summary-item { margin: 10px 0; font-size: 16px; }
    .summary-item strong { display: inline-block; width: 150px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #0066cc; color: white; }
    .income { color: green; }
    .expense { color: red; }
    .period { color: #666; font-size: 14px; margin: 10px 0; }
  </style>
</head>
<body>
  <h1>Financial Report (Demo Mode)</h1>
  <p class="period">Period: ${format(new Date(from), 'MMM dd, yyyy')} - ${format(new Date(to), 'MMM dd, yyyy')}</p>
  
  <div class="summary">
    <h2>Summary</h2>
    <div class="summary-item"><strong>Total Income:</strong> <span class="income">$${totalIncome.toFixed(2)}</span></div>
    <div class="summary-item"><strong>Total Expenses:</strong> <span class="expense">$${totalExpense.toFixed(2)}</span></div>
    <div class="summary-item"><strong>Net Balance:</strong> <span>${(totalIncome - totalExpense).toFixed(2)}</span></div>
    <div class="summary-item"><strong>Transactions:</strong> ${filteredTransactions.length}</div>
  </div>

  <h2>Transaction Details</h2>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Title</th>
        <th>Category</th>
        <th>Type</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      ${filteredTransactions.map(t => `
        <tr>
          <td>${format(new Date(t.date), 'MMM dd, yyyy')}</td>
          <td>${t.title}</td>
          <td style="text-transform: capitalize">${t.category}</td>
          <td class="${t.type.toLowerCase()}">${t.type}</td>
          <td>$${t.amount.toFixed(2)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
    <p>This is a demo report generated in mock mode with simulated data.</p>
    <p>Generated on: ${format(new Date(), 'MMM dd, yyyy HH:mm:ss')}</p>
  </div>
</body>
</html>
    `;

    // Create a blob and download it as HTML (browser can print to PDF)
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `financial-report-${format(new Date(from), 'yyyy-MM-dd')}-to-${format(new Date(to), 'yyyy-MM-dd')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const { from, to } = getDateRange(selectedPeriod);
      
      if (MOCK_MODE) {
        // Generate mock PDF
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        generateMockPDF(from, to);
        
        // Add download record to reports history
        const periodLabel = `${getPeriodLabel(selectedPeriod)} (${format(new Date(from), 'MMM dd')} - ${format(new Date(to), 'MMM dd, yyyy')})`;
        addReportDownload(periodLabel, from, to);
        
        toast.success('Report downloaded successfully! (Open the HTML file and use browser Print > Save as PDF)');
      } else {
        // Original backend PDF generation code would go here
        toast.error('Backend PDF generation not available in mock mode');
      }
    } catch (error: any) {
      console.error('Error generating report:', error);
      toast.error(error.message || 'Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full space-y-4 px-4 py-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <FileText className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold mb-1">Generate Instant Report</h3>
          <p className="text-sm text-muted-foreground">
            Download a comprehensive financial report for any time period instantly
            {MOCK_MODE && <span className="text-yellow-600 font-medium"> (Demo Mode - HTML format)</span>}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-2 block">Select Period</label>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="w-full text-white"
        >
          {isGenerating ? (
            <>
              <Loader className="h-4 w-4 animate-spin mr-2" />
              Generating Report...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download Report {MOCK_MODE && '(HTML)'}
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          {MOCK_MODE 
            ? "Report downloads as HTML. Open it and use browser's Print > Save as PDF"
            : "Report includes income, expenses, top categories, and AI-powered insights"
          }
        </p>
      </div>
    </div>
  );
};

export default InstantReportGenerator;
