import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { Loader, Trash2 } from "lucide-react";
import { useUpdateUserMutation, useDeleteAccountMutation } from "@/features/user/userAPI";
import { logout, updateCredentials } from "@/features/auth/authSlice";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .optional(),
  profilePicture: z.string(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  country: z.string().optional(),
  language: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Austria",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Poland",
  "Czech Republic",
  "Portugal",
  "Greece",
  "Ireland",
  "India",
  "China",
  "Japan",
  "South Korea",
  "Singapore",
  "Malaysia",
  "Thailand",
  "Indonesia",
  "Philippines",
  "Vietnam",
  "Brazil",
  "Mexico",
  "Argentina",
  "Chile",
  "Colombia",
  "Peru",
  "South Africa",
  "Nigeria",
  "Egypt",
  "Kenya",
  "Morocco",
  "Saudi Arabia",
  "United Arab Emirates",
  "Turkey",
  "Russia",
  "Ukraine",
  "New Zealand",
  "Israel",
  "Pakistan",
  "Bangladesh",
];

export function AccountForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useTypedSelector((state) => state.auth);

  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [updateUserMutation, { isLoading }] = useUpdateUserMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: user?.name || "",
      profilePicture: user?.profilePicture || "",
      gender: user?.gender || undefined,
      country: user?.country || undefined,
      language: user?.language || undefined,
    },
  });

  const onSubmit = (values: AccountFormValues) => {
    console.log(values);
    if (isLoading) return;

    const formData = new FormData();
    formData.append("name", values.name || "");
    if (values.gender) formData.append("gender", values.gender);
    if (values.country) formData.append("country", values.country);
    if (values.language) formData.append("language", values.language);
    if (file) formData.append("profilePicture", file);

    updateUserMutation(formData)
      .unwrap()
      .then((response) => {
        dispatch(
          updateCredentials({
            user: {
              profilePicture: response.data.profilePicture,
              name: response.data.name,
              gender: response.data.gender,
              country: response.data.country,
              language: response.data.language,
            },
          })
        );
        toast.success("Account updated successfully");
      })
      .catch((error) => {
        toast.error(error.data.message || "Failed to update account");
      });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setAvatarUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
  ];

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount().unwrap();
      toast.success("Account deleted successfully");
      dispatch(logout());
      navigate("/login"); // Redirect to demo login page
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to delete account");
    }
  };

  return (
    <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-start space-y-4">
          <FormLabel>{t("settings.profile_picture")}</FormLabel>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={avatarUrl || user?.profilePicture || ""}
                className="!object-cover !object-center"
              />
              <AvatarFallback className="text-2xl">
                {form.watch("name")?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="max-w-[250px]"
              />
              <p className="text-xs text-muted-foreground">
                {t("settings.profile_picture_hint")}
              </p>
            </div>
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("settings.name_placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>{t("settings.email")}</FormLabel>
          <FormControl>
            <Input value={user?.email || ""} disabled className="bg-muted" />
          </FormControl>
        </FormItem>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.gender")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("settings.gender_placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">{t("settings.male")}</SelectItem>
                  <SelectItem value="female">{t("settings.female")}</SelectItem>
                  <SelectItem value="other">{t("settings.other")}</SelectItem>
                  <SelectItem value="prefer_not_to_say">
                    {t("settings.prefer_not_to_say")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.country")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("settings.country_placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("settings.language")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("settings.language_placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        {lang.flag} {lang.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading && <Loader className="h-4 w-4 animate-spin" />}
          {t("settings.update_account")}
        </Button>
      </form>
    </Form>

    {/* Delete Account Section */}
    <Card className="border-destructive mt-8">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <Trash2 className="h-5 w-5" />
          Delete Account
        </CardTitle>
        <CardDescription>
          Once you delete your account, there is no going back. All your data including transactions, reports, and settings will be permanently deleted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeleting}>
              {isDeleting && <Loader className="h-4 w-4 animate-spin mr-2" />}
              Delete My Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers including:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>All your transactions</li>
                  <li>All your reports and report settings</li>
                  <li>Your profile information</li>
                  <li>All associated data</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Yes, delete my account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  </>
  );
}