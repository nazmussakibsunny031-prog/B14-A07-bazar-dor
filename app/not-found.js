import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-6xl" aria-hidden="true">🛒</p>
      <h1 className="mt-4 text-3xl font-extrabold">৪০৪ — পেজটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-sm text-muted">আপনি যে ঠিকানা বা ক্যাটাগরি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।</p>
      <Link href="/" className="btn mt-6 border-0 bg-brand text-white hover:bg-brand-dark">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
