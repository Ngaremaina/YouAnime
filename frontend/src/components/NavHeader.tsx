import Link from "next/link";

import { getCurrentDirector } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

const navLinkClass =
  "rounded-md px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground";

export default async function NavHeader() {
  const director = await getCurrentDirector();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-3">
        <Link href="/" className="mr-4 text-lg font-bold tracking-tight text-accent">
          YouAnime
        </Link>
        <Link href="/" className={navLinkClass}>
          Home
        </Link>
        <Link href="/movies" className={navLinkClass}>
          Movies
        </Link>
        <Link href="/series" className={navLinkClass}>
          Series
        </Link>
        {director && (
          <Link href="/add-animation" className={navLinkClass}>
            Add Animation
          </Link>
        )}

        <div className="ml-auto flex items-center gap-1">
          {director ? (
            <>
              <span className="hidden text-sm text-muted sm:inline">
                {director.first_name} {director.last_name}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/director-signup" className={navLinkClass}>
                Director Sign Up
              </Link>
              <Link href="/customer-signup" className={navLinkClass}>
                Customer Sign Up
              </Link>
              <Link
                href="/login"
                className="rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
