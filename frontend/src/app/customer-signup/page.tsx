"use client";

import AccountSignupForm from "@/components/AccountSignupForm";
import { signupCustomer } from "@/lib/api";

export default function CustomerSignupPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <AccountSignupForm
        title="Customer Sign Up"
        redirectTo="/"
        onSubmit={(values) => signupCustomer(values)}
      />
    </div>
  );
}
