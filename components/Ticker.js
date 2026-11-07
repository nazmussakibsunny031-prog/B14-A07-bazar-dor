import { formatPercent, formatPrice } from "@/lib/format";

export default function Ticker({ products }) {
  const items = products.slice(0, 16);
  const row = (suffix) =>
    items.map((p) => (
      <span key={`${p.id}-${suffix}`} className="flex items-center gap-1.5 whitespace-nowrap px-4 text-xs sm:text-sm">
        <span aria-hidden="true">{p.emoji}</span>
        <span className="font-semibold">{p.name}</span>
        <span className="text-muted">
          {formatPrice(p.price)} টাকা/{p.unit}
        </span>
        {p.change > 0 && <span className="font-semibold text-up">▲ {formatPercent(p.change)}%</span>}
        {p.change < 0 && <span className="font-semibold text-down">▼ {formatPercent(p.change)}%</span>}
        {p.change === 0 && <span className="font-semibold text-gray-400">— ০.০%</span>}
      </span>
    ));

  return (
    <div className="ticker overflow-hidden border-b border-black/5 bg-white py-2" aria-label="আজকের দামের তালিকা">
      <div className="ticker-track flex" aria-hidden="true">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
