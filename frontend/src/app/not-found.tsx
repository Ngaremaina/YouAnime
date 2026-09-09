import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-24 text-center">
      <h1 className="text-2xl font-bold">Not found</h1>
      <p className="text-muted">We couldn&apos;t find what you were looking for.</p>
      <Link href="/" className="text-accent underline">
        Back to home
      </Link>
    </div>
  );
}
