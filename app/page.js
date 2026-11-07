import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";

function Section({ id, title, subtitle, icon, iconClass, products }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-4 px-4 pt-10">
      <h2 className="flex items-center gap-2 text-lg font-bold sm:text-xl">
        {icon && <span className={`text-sm ${iconClass}`} aria-hidden="true">{icon}</span>}
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-xs text-muted sm:text-sm">{subtitle}</p>}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const products = await getProducts();
  const risers = [...products].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <>
      <Hero />
      <Section title="আজ দাম বেড়েছে" icon="▲" iconClass="text-up" products={risers} />
      <Section title="আজ দাম কমেছে" icon="▼" iconClass="text-down" products={fallers} />
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBn(products.length)}টি পণ্যের আজকের দাম`}
        products={products}
      />
    </>
  );
}
