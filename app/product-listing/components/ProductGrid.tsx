export type InventoryVariant = {
  product_id: string;
  sku: string;
  color: string;
  size: string;
  list_price: number;
  sale_price: number | null;
  stock: number;
};

export type Product = {
  product_id: string;
  name: string;
  description: string;
  category: string;
  collection: string;
  created_at: string;
};

export type ProductWithVariants = Product & {
  variants: InventoryVariant[];
};

export type ProductWithVariantsAndRating = ProductWithVariants & {
  reviewCount: number;
  averageRating: number; // 0 when no reviews
};

export function ProductGrid({ products }: { products: ProductWithVariantsAndRating[] }) {
  return (
    <div className="mt-10">
      <div className="text-sm text-ink-secondary">
        Products: <span className="text-ink-primary">{products.length}</span>
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
        {products.map((p) => (
          <li key={p.product_id} className="rounded-[8px] border border-line-primary bg-surface p-4">
            <div className="text-sm font-semibold text-ink-primary">{p.name}</div>
            <div className="mt-1 text-xs text-ink-muted">
              {p.collection} · {p.category} · variants: {p.variants.length} · rating:{" "}
              {p.averageRating.toFixed(1)} ({p.reviewCount})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}