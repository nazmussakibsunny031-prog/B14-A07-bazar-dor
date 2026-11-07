import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryList from "@/components/CategoryList";
import { getCategories, getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = (await getCategories()).find((c) => c.slug === slug);
  return { title: cat ? `${cat.name} — বাজার দর` : "পেজ পাওয়া যায়নি — বাজার দর" };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = (await getProducts()).filter((p) => p.category === slug);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <div className="flex items-center gap-4 rounded-2xl bg-white/80 p-5 ring-1 ring-black/5">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-page text-3xl" aria-hidden="true">{category.emoji}</span>
        <div>
          <h1 className="text-2xl font-extrabold">{category.name}</h1>
          <p className="text-sm text-muted">প্রতি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white/80 p-10 text-center ring-1 ring-black/5">
          <p className="text-5xl" aria-hidden="true">🧺</p>
          <h2 className="mt-3 text-xl font-bold">এই ক্যাটাগরিতে এখন কোনো পণ্য নেই</h2>
          <Link href="/" className="btn mt-5 border-0 bg-brand text-white hover:bg-brand-dark">হোম পেজে ফিরে যান</Link>
        </div>
      ) : (
        <>
          <p className="mt-6 text-xs text-muted">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
          <CategoryList products={products} />
        </>
      )}
    </div>
  );
}
