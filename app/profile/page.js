"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Avatar } from "@/components/Navbar";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pt-10">
      <h1 className="text-2xl font-extrabold">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      {isPending || !user ? (
        <div className="skeleton mt-6 h-40 w-full rounded-2xl" />
      ) : (
        <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-white/90 p-5 ring-1 ring-black/5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar user={user} size={64} />
            <div className="min-w-0">
              <p className="text-lg font-bold">{user.name}</p>
              <p className="truncate text-sm text-muted">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/profile/update" className="btn btn-sm border-0 bg-brand text-white hover:bg-brand-dark sm:btn-md">
              তথ্য আপডেট করুন
            </Link>
            <button onClick={handleSignOut} className="btn btn-sm btn-outline border-up text-up hover:border-up hover:bg-up hover:text-white sm:btn-md">
              সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
