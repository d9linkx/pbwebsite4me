"use client";
import { useRouter } from "next/navigation";
import { AuthScreen } from "@/components/AuthScreen";
import { useAppStore } from "@/stores/appStore";
import { User } from "@/types";
import { toast } from "sonner";

export default function AuthPage() {
  const router = useRouter();
  const { setUser } = useAppStore();

  const handleLogin = (user: User) => {
    console.log("Login successful:", user);

    // Store user in global state
    setUser(user);

    // Store in localStorage for persistence
    localStorage.setItem("prawnbox_user", JSON.stringify(user));

    toast.success("Welcome to Prawnbox!");

    // Redirect to dashboard
    router.push("/");
  };

  return (
    <div className="min-h-screen">
      <AuthScreen onLogin={handleLogin} />
    </div>
  );
}
