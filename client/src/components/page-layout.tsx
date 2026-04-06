import { cn } from "@/lib/utils";
import PageHeader from "./page-header";

interface PropsType {
  children: React.ReactNode;
  className?: string
  title?: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  showHeader?: boolean;
  addMarginTop?: boolean;
  renderPageHeader?: React.ReactNode
}

const PageLayout = ({ children, className,
  title,
  subtitle,
  rightAction,
  showHeader = true,
  addMarginTop = false,
  renderPageHeader,
 }: PropsType) => {
  return (
    <div>
      {showHeader && (
        <PageHeader 
          title={title} 
          subtitle={subtitle} 
          rightAction={rightAction} 
          renderPageHeader={renderPageHeader}
        />
      )}
    <div className={cn("w-full pt-8 px-4 sm:px-6 lg:px-20 relative z-20",
      addMarginTop && "-mt-20",
      className)}>
      {children}
    </div>
    </div>
  );
};

export default PageLayout;