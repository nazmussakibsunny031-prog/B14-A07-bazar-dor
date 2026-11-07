import { notFound } from "next/navigation";
import Link from "next/link";
import { ChangeBadge } from "@/components/ProductCard";
import { getCategories, getProductBySlug } from "@/lib/api";
import { buildMarketPrices } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name} — বাজার দর` : "পেজ পাওয়া যায়নি — বাজার দর" };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = (await getCategories()).find((c) => c.slug === product.category);
  const rows = buildMarketPrices(product);
  const min = Math.min(...rows.map((r) => r.min));
  const max = Math.max(...rows.map((r) => r.max));
  const avg = rows.reduce((sum, r) => sum + r.price, 0) / rows.length;

  const stats = [
    { label: "সর্বনিম্ন দাম", value: min },
    { label: "সর্বোচ্চ দাম", value: max },
    { label: "গড় দাম", value: avg },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <nav aria-label="breadcrumb" className="text-xs text-muted">
        <Link href="/" className="hover:text-brand">হোম</Link>
        {category && (
          <>
            {" / "}
            <Link href={`/category/${category.slug}`} className="hover:text-brand">{category.name}</Link>
          </>
        )}
        {" / "}
        <span className="text-ink">{product.name}</span>
      </nav>

      <section className="mt-4 flex flex-col gap-5 rounded-2xl bg-white/80 p-5 ring-1 ring-black/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-page text-4xl" aria-hidden="true">{product.emoji}</span>
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">{product.name}</h1>
            <p className="mt-1 text-sm text-muted">{product.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              {category && <span className="rounded-full bg-green-50 px-2.5 py-1 font-semibold text-brand">{category.name}</span>}
              <span className="rounded-full bg-page px-2.5 py-1 font-medium">প্রতি {product.unit}</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-page p-4 text-center sm:min-w-40">
          <p className="text-[11px] text-muted">বাজারভিত্তিক আজকের দাম</p>
          <p className="mt-1 text-2xl font-extrabold">{formatPrice(product.price)} <span className="text-sm font-medium text-muted">টাকা</span></p>
          <p className="text-xs text-muted">প্রতি {product.unit}</p>
          <div className="mt-2"><ChangeBadge change={product.change} /></div>
        </div>
      </section>

      <section className="mt-6" aria-labelledby="price-summary">
        <h2 id="price-summary" className="text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/80 p-4 ring-1 ring-black/5">
              <p className="text-xs text-muted">{s.label}</p>
              <p className="mt-1 text-xl font-extrabold">{formatPrice(s.value)} <span className="text-sm font-medium text-muted">টাকা</span></p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6" aria-labelledby="market-prices">
        <h2 id="market-prices" className="text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl bg-white ring-1 ring-black/10">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-page text-xs text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">বাজার</th>
                <th className="px-4 py-3 font-semibold">এলাকা</th>
                <th className="px-4 py-3 text-right font-semibold">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-semibold">সর্বোচ্চ</th>
                <th className="px-4 py-3 text-right font-semibold">দাম</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.market} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium">{r.market}</td>
                  <td className="px-4 py-3 text-muted">{r.area}</td>
                  <td className="px-4 py-3 text-right">{formatPrice(r.min)} টাকা</td>
                  <td className="px-4 py-3 text-right">{formatPrice(r.max)} টাকা</td>
                  <td className="px-4 py-3 text-right font-bold">{formatPrice(r.price)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
