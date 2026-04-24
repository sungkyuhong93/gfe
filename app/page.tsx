import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen px-gutter-mobile py-20 tablet:px-gutter-tablet">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-semibold text-ink-primary">Components</h1>
        <p className="mt-2 text-base text-ink-secondary">
          Interview practice builds.
        </p>
        <div className="mt-8">
          <Link
            href="/testimonial-card"
            className="text-base font-medium text-ink-brand hover:text-ink-primary-hover"
          >
            Testimonial card →
          </Link>
        </div>
      </div>
    </main>
  );
}
