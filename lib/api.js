import { LOCAL_PRODUCTS, CATEGORIES } from "./data";
import { bnToNum } from "./format";

const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchJson(path) {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, {
        signal: AbortSignal.timeout(4000),
        next: { revalidate: 300 },
      });
      if (!res.ok) continue;
      return await res.json();
    } catch {
      // try the next base URL
    }
  }
  return null;
}

const unwrap = (json) => {
  if (!json) return null;
  if (Array.isArray(json)) return json;
  for (const key of ["data", "products", "items", "result", "categories"]) {
    if (Array.isArray(json[key])) return json[key];
  }
  return null;
}

// Map whatever the API returns to the shape the UI needs.
function normalizeProduct(p, index) {
  const name = p.name_bn || p.nameBn || p.name || p.title;
  const price = bnToNum(p.price ?? p.currentPrice ?? p.todayPrice ?? p.avgPrice);
  if (!name || !price) return null;
  const category = (typeof p.category === "object" ? p.category?.slug : p.category) || p.categorySlug || "";
  const local = LOCAL_PRODUCTS.find((l) => l.name === name);
  return {
    id: p.id ?? p._id ?? index + 1,
    slug: String(p.slug ?? p.id ?? p._id ?? index + 1),
    name,
    category: CATEGORIES.some((c) => c.slug === category) ? String(category) : local?.category || String(category),
    emoji: p.emoji || p.icon || local?.emoji || "🛒",
    unit: String(p.unit || local?.unit || "কেজি").replace(/^প্রতি\s*/, ""),
    price,
    change: bnToNum(p.change ?? p.changePercent ?? p.percentChange ?? local?.change ?? 0),
    description: p.description || p.summary || local?.description || "",
  };
}

export async function getProducts() {
  const json = await fetchJson("/products");
  const list = unwrap(json);
  if (list?.length) {
    const mapped = list.map(normalizeProduct).filter(Boolean);
    if (mapped.length >= 6) return mapped;
  }
  return LOCAL_PRODUCTS;
}

export async function getCategories() {
  return CATEGORIES;
}

export async function getProductBySlug(slug) {
  const all = await getProducts();
  return all.find((p) => p.slug === slug || String(p.id) === slug) || null;
}
