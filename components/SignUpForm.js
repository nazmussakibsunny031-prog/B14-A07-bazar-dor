"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fail(msg) {
    setError(msg);
    toast.error(msg);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    if (!name || !email || !password) return fail("সব ঘর পূরণ করুন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মেলেনি");

    setLoading(true);
    const { error: err } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    if (err) return fail(err.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  }

  const field = "input w-full border-black/10 bg-page/60";
  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <h1 className="text-center text-3xl font-extrabold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-1 text-center text-sm text-muted">বিনামূল্যে সাইন আপ করে সব পণ্যের বিস্তারিত দাম দেখুন।</p>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4 rounded-2xl bg-white/90 p-6 ring-1 ring-black/5">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs font-semibold">নাম</label>
          <input id="name" name="name" autoComplete="name" placeholder="আপনার নাম" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-semibold">ইমেইল</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-xs font-semibold">পাসওয়ার্ড</label>
          <input id="password" name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" className={field} />
        </div>
        <div>
          <label htmlFor="confirm" className="mb-1 block text-xs font-semibold">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input id="confirm" name="confirm" type="password" autoComplete="new-password" placeholder="আবার লিখুন" className={field} />
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-up">{error}</p>}
        <button type="submit" disabled={loading} className="btn w-full border-0 bg-brand text-white hover:bg-brand-dark">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
        <div className="divider my-1 text-xs text-muted">অথবা</div>
        <SocialButtons callbackURL="/" />
        <p className="text-center text-sm text-muted">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="font-semibold text-brand">সাইন ইন করুন</Link>
        </p>
      </form>
      <p className="mt-4 text-center text-xs text-muted"><Link href="/" className="hover:text-brand">← হোম পেজে ফিরে যান</Link></p>
    </div>
  );
}
