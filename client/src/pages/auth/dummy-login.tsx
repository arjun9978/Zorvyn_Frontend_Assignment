import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useAppDispatch } from "@/app/hook";
import { setCredentials } from "@/features/auth/authSlice";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import Logo from "@/components/logo/logo";
import AuthMeshGradient from "@/components/auth/auth-mesh-gradient";
import { setCurrentUser } from "@/lib/mock-data";
import { FeatureCarousel } from "@/components/auth/feature-carousel";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type FormValues = z.infer<typeof schema>;

const DummyLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const username = values.name.toLowerCase().trim();
    
    // Set current user in mock data system
    setCurrentUser(username);
    
    // Create dummy user data
    const dummyUser = {
      user: {
        id: "demo-user-" + username,
        name: values.name,
        email: `${username.replace(/\s+/g, '')}@demo.com`,
        profilePicture: null,
        gender: null,
        country: null,
        language: "en",
      },
      accessToken: "dummy-token-" + Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
      reportSetting: {
        userId: "demo-user-" + username,
        frequency: "MONTHLY",
        email: `${username.replace(/\s+/g, '')}@demo.com`,
        isEnabled: false,
        nextReportDate: null,
        lastSentDate: null,
      },
    };

    // Store in Redux
    dispatch(setCredentials(dummyUser));
    
    toast.success(`Welcome back, ${values.name}!`);
    
    setTimeout(() => {
      navigate(PROTECTED_ROUTES.OVERVIEW);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background p-4">
      {/* Logo at top-left (no link) */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <div className="flex items-center gap-2">
          <img 
            src="/assets/finensure-logo.png" 
            alt="FinEnsure Logo" 
            className="h-7 w-7 object-contain"
          />
          <span className="font-semibold text-lg">FinEnsure</span>
        </div>
      </div>

      {/* Centered card with form and carousel */}
      <div className="w-full max-w-6xl bg-card backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50 overflow-hidden relative mx-auto" style={{ marginTop: 'max(5rem, 10vh)' }}>
        {/* Animated blue mesh gradient */}
        <AuthMeshGradient />
        
        <div className="flex flex-col lg:flex-row relative z-10">
          {/* Left side - Login form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Welcome to FinEnsure</h1>
                <p className="text-muted-foreground">
                  Enter your name to continue to the dashboard
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Eg: Arjun" 
                            {...field}
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                  >
                    Continue to Dashboard
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Note: This is a demo version with simulated data for the assignment</p>
                <p className="mt-1">Your data is saved locally per username (case-insensitive)</p>
              </div>
            </div>
          </div>

          {/* Vertical divider line */}
          <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          {/* Right side - Feature carousel */}
          <div className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center relative overflow-hidden">
            <FeatureCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyLogin;
