"use client";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons({ callbackURL = "/" }) {
  async function social(provider, label) {
    const { error } = await authClient.signIn.social({ provider, callbackURL });
    if (error) toast.error(`${label} দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।`);
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button type="button" onClick={() => social("google", "Google")} className="btn btn-sm border-black/10 bg-white sm:btn-md">
        <span aria-hidden="true" className="font-bold text-blue-600">G</span> Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" onClick={() => social("github", "GitHub")} className="btn btn-sm border-black/10 bg-white sm:btn-md">
        <span aria-hidden="true">🐙</span> GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
