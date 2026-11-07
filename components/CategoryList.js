"use client";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { bnToNum } from "@/lib/format";

export default function CategoryList({ products }) {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    const list = [...products];
    // Numeric sort (works even if prices arrive as Bengali strings like "১,৮৫০").
    if (sort === "asc") list.sort((a, b) => bnToNum(a.price) - bnToNum(b.price));
    if (sort === "desc") list.sort((a, b) => bnToNum(b.price) - bnToNum(a.price));
    return list;
  }, [products, sort]);

  return (
    <>
      <div className="mt-4 flex items-center justify-end gap-2 rounded-2xl bg-white/80 p-3 ring-1 ring-black/5">
        <label htmlFor="sort" className="text-sm text-muted">সাজান:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-sm w-auto min-w-40 border-black/10 bg-white"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
