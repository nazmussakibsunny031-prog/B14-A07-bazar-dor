"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { formatBanglaDate } from "@/lib/format";

export default function Navbar({ categories }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [today, setToday] = useState("");

  useEffect(() => setToday(formatBanglaDate()), []);

  const user = session?.user;

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="বাজার দর - হোম">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand">
            <Image src="/assets/logo-icon.png" alt="" width={22} height={22} className="brightness-0 invert" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-extrabold">বাজার দর</span>
            <span className="block min-h-4 text-[11px] text-muted">{today}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-9 w-28 rounded-full" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-black/5" aria-label="প্রোফাইল মেনু">
                <Avatar user={user} size={32} />
                <span className="hidden text-sm font-medium sm:block">{user.name?.split(" ")[0]}</span>
                <span className="text-xs text-muted">▾</span>
              </button>
              <div tabIndex={0} className="dropdown-content z-30 mt-2 w-64 rounded-xl bg-white p-3 shadow-lg ring-1 ring-black/5">
                <p className="text-sm font-bold">{user.name}</p>
                <p className="truncate text-xs text-muted">{user.email}</p>
                <div className="my-2 h-px bg-black/5" />
                <Link href="/profile" className="block rounded-lg px-2 py-1.5 text-sm hover:bg-page">আমার প্রোফাইল</Link>
                <button onClick={handleSignOut} className="mt-1 block w-full rounded-lg px-2 py-1.5 text-left text-sm text-up hover:bg-red-50">
                  সাইন আউট
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-sm border-0 bg-brand text-white hover:bg-brand-dark sm:btn-md">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      <nav aria-label="ক্যাটাগরি" className="mx-auto max-w-6xl overflow-x-auto px-4 pb-2">
        <ul className="flex min-w-max items-center gap-1 text-sm">
          {categories.map((c) => {
            const href = `/category/${c.slug}`;
            const active = pathname === href;
            return (
              <li key={c.slug}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition ${
                    active ? "bg-brand text-white" : "text-ink hover:bg-page"
                  }`}
                >
                  <span aria-hidden="true">{c.emoji}</span>
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export function Avatar({ user, size = 40 }) {
  const initials = (user?.name || "?").trim().charAt(0).toUpperCase();
  if (user?.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={user.image} alt="" width={size} height={size} className="rounded-full object-cover" style={{ width: size, height: size }} />;
  }
  return (
    <span className="grid place-items-center rounded-full bg-brand font-bold text-white" style={{ width: size, height: size, fontSize: size / 2.4 }}>
      {initials}
    </span>
  );
}
