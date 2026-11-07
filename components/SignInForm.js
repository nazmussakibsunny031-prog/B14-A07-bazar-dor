"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toasted = useRef(false);

  useEffect(() => {
    if (params.get("reason") === "protected" && !toasted.current) {
      toasted.current = true;
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    }
  }, [params]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দুটোই দিন";
      setError(msg);
      toast.error(msg);
      return;
    }
    setLoading(true);
    const { error: err } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (err) {
      const msg = "ইমেইল বা পাসওয়ার্ড ঠিক নয়";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirect && redirect.startsWith("/") ? redirect : "/");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <h1 className="text-center text-3xl font-extrabold">সাইন ইন</h1>
      <p className="mt-1 text-center text-sm text-muted">বাজারের দাম, তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4 rounded-2xl bg-white/90 p-6 ring-1 ring-black/5">
        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-semibold">ইমেইল</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input w-full border-black/10 bg-page/60" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-xs font-semibold">পাসওয়ার্ড</label>
          <input id="password" name="password" type="password" autoComplete="current-password" placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full border-black/10 bg-page/60" />
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-up">{error}</p>}
        <button type="submit" disabled={loading} className="btn w-full border-0 bg-brand text-white hover:bg-brand-dark">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>
        <div className="divider my-1 text-xs text-muted">অথবা</div>
        <SocialButtons callbackURL={redirect && redirect.startsWith("/") ? redirect : "/"} />
        <p className="text-center text-sm text-muted">
          অ্যাকাউন্ট নেই? <Link href="/signup" className="font-semibold text-brand">সাইন আপ করুন</Link>
        </p>
      </form>
      <p className="mt-4 text-center text-xs text-muted"><Link href="/" className="hover:text-brand">← হোম পেজে ফিরে যান</Link></p>
    </div>
  );
}
