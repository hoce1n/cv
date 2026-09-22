import Link from "next/link";
import { AdminLoginForm } from "@/components/admin-login-form";

export default function LoginPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background px-5 py-10 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(28,25,23,0.08) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative mx-auto flex min-h-[calc(100dvh-5rem)] max-w-md flex-col justify-center">
        <AdminLoginForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className="underline decoration-border underline-offset-4 hover:text-foreground">
            Back to CV Studio
          </Link>
        </p>
      </div>
    </main>
  );
}
