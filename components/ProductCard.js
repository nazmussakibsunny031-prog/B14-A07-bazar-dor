import Link from "next/link";
import { formatPercent, formatPrice } from "@/lib/format";

export function ChangeBadge({ change }) {
  // Figma: price rise is red (bad for buyers), fall is green.
  if (change > 0)
    return <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-up">▲ {formatPercent(change)}%</span>;
  if (change < 0)
    return <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-down">▼ {formatPercent(change)}%</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">— {formatPercent(0)}%</span>;
}

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5 transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-page text-2xl">{product.emoji}</div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold">{product.name}</h3>
          <p className="text-xs text-muted">প্রতি {product.unit}</p>
        </div>
      </div>
      <p className="mt-4 text-[11px] text-muted">আজকের দাম</p>
      <div className="mt-0.5 flex items-center justify-between gap-2">
        <p className="text-xl font-extrabold">
          {formatPrice(product.price)} <span className="text-sm font-medium text-muted">টাকা</span>
        </p>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
