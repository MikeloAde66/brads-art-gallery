import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-6 text-center text-neutral-100">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Order Confirmed</p>
      <h1 className="mt-3 font-serif text-3xl">Thank you for your order</h1>
      <p className="mt-4 max-w-md text-sm text-neutral-400">
        Your print is being prepared for fulfillment. A confirmation email from Stripe is on its way,
        and FinerWorks will begin production shortly.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-neutral-700 px-6 py-2.5 text-xs uppercase tracking-wide text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white"
      >
        Back to the Gallery
      </Link>
    </div>
  );
}
