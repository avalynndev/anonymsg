"use client";

import { AuthView } from "@daveyplate/better-auth-ui";

export default function AuthPage() {
  return (
    <main className="flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <AuthView view="SIGN_UP" />
      </div>
    </main>
  );
}
