import { useState } from "react";
import { UserNav } from "./user-nav";
import LogoutDialog from "./logout-dialog";
import { useTypedSelector } from "@/app/hook";
import { LanguageSelector } from "./language-selector";
import { RoleToggle } from "./role-toggle";

const Navbar = () => {
  const { user } = useTypedSelector((state) => state.auth);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  return (
    <>
      <header className="w-full px-4 py-3 pb-3 lg:px-20 bg-[var(--secondary-dark-color)] text-white">
        <div className="w-full flex h-14 items-center">
          <div className="w-full flex items-center justify-end">
            {/* Right side - User actions */}
            <div className="flex items-center space-x-3">
              <RoleToggle />
              <LanguageSelector />
              <UserNav
                userName={user?.name || ""}
                profilePicture={user?.profilePicture || ""}
                onLogout={() => setIsLogoutDialogOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        setIsOpen={setIsLogoutDialogOpen}
      />
    </>
  );
};

export default Navbar;