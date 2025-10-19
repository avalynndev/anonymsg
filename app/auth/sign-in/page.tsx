"use client";

import { PageLayout } from "@/components/layout";
import { AuthView } from "@daveyplate/better-auth-ui";

export default function AuthPage() {
  return (
    <PageLayout>
      <main className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AuthView view="SIGN_IN" />
        </div>
      </main>
    </PageLayout>
  );
}
