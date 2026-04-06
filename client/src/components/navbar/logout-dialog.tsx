import { Dialog, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogContent,DialogDescription } from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { useAppDispatch } from "@/app/hook";
import { logout } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LogoutDialogProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const LogoutDialog = ({ isOpen, setIsOpen }: LogoutDialogProps) => {
    const { t, i18n } = useTranslation();
    const [isPending, startTransition] = useTransition();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
      startTransition(() => {
        setIsOpen(false);
        dispatch(logout());
        i18n.changeLanguage('en'); // Reset to English on logout
        navigate("/login"); // Redirect to demo login page
      });
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("common.logout_confirm_title")}</DialogTitle>
            <DialogDescription>
              {t("common.logout_confirm_desc")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="text-white !bg-red-500" disabled={isPending} type="button" onClick={handleLogout}>
              {isPending && <Loader className="animate-spin" />}
              {t("common.yes")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}

export default LogoutDialog