"use client";

import AccountSignupForm from "@/components/AccountSignupForm";
import { signupDirector } from "@/lib/api";

export default function DirectorSignupPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <AccountSignupForm
        title="Director Sign Up"
        redirectTo="/login"
        onSubmit={(values) => signupDirector(values)}
      />
    </div>
  );
}
