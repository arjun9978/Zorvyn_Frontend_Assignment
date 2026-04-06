import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "ADMIN" | "VIEWER";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAdmin: boolean;
  isViewer: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = "fintrack_user_role";

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const stored = localStorage.getItem(ROLE_STORAGE_KEY);
    return (stored as UserRole) || "ADMIN"; // Default to ADMIN
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem(ROLE_STORAGE_KEY, newRole);
  };

  const isAdmin = role === "ADMIN";
  const isViewer = role === "VIEWER";

  useEffect(() => {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole, isAdmin, isViewer }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return context;
};
