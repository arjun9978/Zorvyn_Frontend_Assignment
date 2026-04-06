import { Fragment, ReactNode } from "react";
import Aurora from "./auth/aurora";

interface PageHeaderProps {
    title?: string;
    subtitle?: string;
    rightAction?: ReactNode;
    renderPageHeader?: ReactNode
  }
  
const PageHeader = ({ title, subtitle, rightAction,renderPageHeader }: PageHeaderProps) => {
    return (
      <div className="w-full pb-20 pt-4 px-4 sm:px-6 lg:px-20 bg-[#1a1e2a] text-white relative overflow-hidden">
        {/* Aurora effect in background */}
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-0">
          <Aurora 
            colorStops={['#5227FF', '#7cff67', '#5227FF']}
            amplitude={1.0}
            blend={0.5}
            speed={1.2}
          />
        </div>
        
        <div className="w-full relative z-10">
          {renderPageHeader 
          ? <Fragment>{renderPageHeader}</Fragment> 
          : (
            <div className="w-full flex flex-col gap-3 items-start justify-start lg:items-center lg:flex-row lg:justify-between">
              {(title || subtitle) && (
                <div className="space-y-1">
                  {title && <h2 className="text-2xl lg:text-4xl font-medium">{title}</h2>}
                  {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
                </div>
              )}
              {rightAction && rightAction}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default PageHeader