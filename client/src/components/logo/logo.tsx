import { PROTECTED_ROUTES } from "@/routes/common/routePath"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface LogoProps {
  url?: string;
  showText?: boolean;
}

const Logo = ({ url, showText = true }: LogoProps) => {
  return (
    <Link to={url || PROTECTED_ROUTES.OVERVIEW} className="flex items-center gap-2">
      <img 
        src="/assets/finensure-logo.png" 
        alt="FinEnsure Logo" 
        className="h-7 w-7 object-contain flex-shrink-0"
      />
      <span className={cn(
        "font-semibold text-lg whitespace-nowrap transition-all duration-300",
        !showText && "hidden"
      )}>FinEnsure</span>
    </Link>
  )
}

export default Logo