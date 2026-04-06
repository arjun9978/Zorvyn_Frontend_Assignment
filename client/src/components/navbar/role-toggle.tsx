import { useRole, UserRole } from "@/context/role-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShieldCheck, Eye } from "lucide-react";

export const RoleToggle = () => {
  const { role, setRole } = useRole();

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as UserRole);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={role} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[100px] sm:w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors text-sm">
          <div className="flex items-center gap-1 sm:gap-2">
            {role === "ADMIN" ? (
              <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
            <SelectValue placeholder="Select role" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ADMIN">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Admin</span>
            </div>
          </SelectItem>
          <SelectItem value="VIEWER">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Viewer</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
