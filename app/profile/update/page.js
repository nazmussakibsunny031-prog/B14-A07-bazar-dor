"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session?.user?.name]);

  async function onSubmit(e) {
    e.preventDefault();
    const value = name.trim();
    if (!value) return toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: value });
    setLoading(false);
    if (error) return toast.error("তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 pt-10">
      <h1 className="text-2xl font-extrabold">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-sm text-muted">আপনার নাম পরিবর্তন করুন।</p>

      {isPending ? (
        <div className="skeleton mt-6 h-44 w-full rounded-2xl" />
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl bg-white/90 p-6 ring-1 ring-black/5">
          <div>
            <label htmlFor="name" className="mb-1 block text-xs font-semibold">নাম</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম" className="input w-full border-black/10 bg-page/60" />
          </div>
          <button type="submit" disabled={loading} className="btn w-full border-0 bg-brand text-white hover:bg-brand-dark">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
          </button>
          <p className="text-center text-xs text-muted"><Link href="/profile" className="hover:text-brand">← প্রোফাইলে ফিরে যান</Link></p>
        </form>
      )}
    </div>
  );
}
